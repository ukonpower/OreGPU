import sampleVert from './shaders/sample.vert.wgsl';
import sampleFrag from './shaders/sample.frag.wgsl';
import { Mat4 } from '../math/Mat4';
import { Vec3 } from '../math/Vec3';
import { Geometry } from '../geometries/Geometry';
import { CubeGeometry } from '../geometries/CubeGeometry';
import { SphereGeometry } from '../geometries/SphereGeometry';
import { Mat3 } from '../math/Mat3';
import { GLTFLoader } from '../loaders/GLTFLoader';

export class Renderer {

	private canvas: HTMLCanvasElement;

	private adapter: GPUAdapter | null = null;
	private device: GPUDevice | null = null;

	private context: GPUPresentationContext | null = null

	private pipeline: GPURenderPipeline | null = null;
	private depthTexture: GPUTexture| null = null;

	private renderPassDescripter: GPURenderPassDescriptor | null = null;

	private projectionMatrix: Mat4;
	private viewMatrix: Mat4;

	private verticesBuffer: GPUBuffer | null = null;
	private indexBuffer: GPUBuffer | null = null;

	private uniformBuffer: GPUBuffer | null = null;
	private uniformBindGroup: GPUBindGroup | null = null;

	private time: number = 0;

	private geo: Geometry | null = null;

	constructor( canvas: HTMLCanvasElement ) {

		this.canvas = canvas;

		// matrix
		this.projectionMatrix = new Mat4().perspective( 50, this.canvas.clientWidth / this.canvas.clientHeight, 0.1, 1000 );
		this.viewMatrix = new Mat4().lookAt( new Vec3( 0.0, 0.8, 1.7 ), new Vec3( 0, 0.4, 0 ), new Vec3( 0, 1, 0 ) );

		this.geo = new CubeGeometry();

		this.init();

	}

	private async init() {

		this.adapter = await navigator.gpu.requestAdapter();

		if ( this.adapter == null ) {

			return;

		}

		this.device = await this.adapter.requestDevice();

		if ( this.device == null ) {

			return;

		}

		this.context = this.canvas.getContext( 'webgpu' ) as unknown as GPUPresentationContext;

		if ( this.context == null ) {

			return;

		}

		let presentationFormat = this.context.getPreferredFormat( this.adapter );

		let size = [
			this.canvas.clientWidth * window.devicePixelRatio,
			this.canvas.clientHeight * window.devicePixelRatio,
		];

		this.context.configure( {
			device: this.device,
			format: presentationFormat,
			size: size
		} );

		// geometry

		let loader = new GLTFLoader();
		let gltf = await loader.load( "./assets/models/bunny.gltf" );

		console.log( );

		let bunny = gltf[ 'bun_zipper_res2' ];

		this.geo = new Geometry( bunny.position.array, [], bunny.normal.array, bunny.indices.array );

		console.log( this.geo );

		this.verticesBuffer = this.device.createBuffer( {
			size: this.geo.allAttributes.byteLength,
			usage: GPUBufferUsage.VERTEX,
			mappedAtCreation: true
		} );

		new Float32Array( this.verticesBuffer.getMappedRange() ).set( this.geo.allAttributes );
		this.verticesBuffer.unmap();

		this.indexBuffer = this.device.createBuffer( {
			size: this.geo.index.byteLength,
			usage: GPUBufferUsage.INDEX,
			mappedAtCreation: true,
		} );

		new Uint16Array( this.indexBuffer.getMappedRange() ).set( this.geo.index );
		this.indexBuffer.unmap();

		// renderpipeline

		this.pipeline = this.device.createRenderPipeline( {
			vertex: {
				module: this.device.createShaderModule( {
					code: sampleVert
				} ),
				entryPoint: 'main',
				buffers: [
					{
						arrayStride: 8 * 4,
						attributes: [
							{
								shaderLocation: 0,
								offset: 0,
								format: 'float32x3' as GPUVertexFormat,
							},
							{
								shaderLocation: 1,
								offset: Float32Array.BYTES_PER_ELEMENT * 3,
								format: 'float32x2' as GPUVertexFormat,
							},
							{
								shaderLocation: 2,
								offset: Float32Array.BYTES_PER_ELEMENT * 5,
								format: 'float32x3' as GPUVertexFormat,
							}
						]
					}
				],
			},
			fragment: {
				module: this.device.createShaderModule( {
					code: sampleFrag
				} ),
				entryPoint: 'main',
				targets: [
					{
						format: presentationFormat
					}
				]
			},
			primitive: {
				topology: "triangle-list",
				cullMode: 'none'
			},
			depthStencil: {
				depthWriteEnabled: true,
				depthCompare: 'less',
				format: 'depth24plus'
			}
		} );

		this.depthTexture = this.device.createTexture( {
			size: size,
			format: 'depth24plus',
			usage: GPUTextureUsage.RENDER_ATTACHMENT
		} );

		// uniforms

		this.uniformBuffer = this.device.createBuffer( {
			size: ( ( 4 * 4 ) * 2 + 12 * 1 ) * Float32Array.BYTES_PER_ELEMENT,
			usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST
		} );

		this.uniformBindGroup = this.device.createBindGroup( {
			layout: this.pipeline.getBindGroupLayout( 0 ),
			entries: [
				{
					binding: 0,
					resource: {
						buffer: this.uniformBuffer
					}
				}
			]
		} );

		this.render();

	}

	private render() {

		this.time += 0.16;

		if ( ! ( this.context && this.device && this.adapter ) ) {

			return;

		}

		// set uniforms

		if ( this.uniformBuffer ) {

			let modelMatrix = new Mat4().makeTransform( new Vec3(), new Vec3( 0.0, this.time * 0.1, 0, ) );
			let mvMatrix = this.viewMatrix.clone().multiply( modelMatrix );

			let normalMatrix = new Mat3().copy( mvMatrix );

			normalMatrix.inverse().transpose();

			let e = [
				normalMatrix.elm[ 0 ], normalMatrix.elm[ 3 ], normalMatrix.elm[ 6 ], 0,
				normalMatrix.elm[ 1 ], normalMatrix.elm[ 4 ], normalMatrix.elm[ 7 ], 0,
				normalMatrix.elm[ 2 ], normalMatrix.elm[ 5 ], normalMatrix.elm[ 8 ], 0,
			];


			let uniformData = new Float32Array( new Array<number>().concat( mvMatrix.elm, this.projectionMatrix.elm, e ) );

			this.device.queue.writeBuffer( this.uniformBuffer, 0, uniformData.buffer, uniformData.byteOffset, uniformData.byteLength );

		}

		let commandEncoder = this.device.createCommandEncoder();
		let textureView = this.context.getCurrentTexture().createView();

		if ( ! ( this.pipeline && this.depthTexture ) ) return;

		this.renderPassDescripter = {
			colorAttachments: [
				{
					view: textureView,
					loadValue: { r: 0.0, g: 0.0, b: 0.0, a: 1.0 },
					storeOp: 'store' as GPUStoreOp,
				},
			],
			depthStencilAttachment: {
				view: this.depthTexture.createView(),
				depthLoadValue: 1.0,
				depthStoreOp: 'store',
				stencilLoadValue: 0.0,
				stencilStoreOp: 'store'
			}
		};

		let passEncoder = commandEncoder.beginRenderPass( this.renderPassDescripter );

		passEncoder.setPipeline( this.pipeline );

		if ( this.uniformBindGroup ) {

			passEncoder.setBindGroup( 0, this.uniformBindGroup );

		}

		if ( this.geo && this.verticesBuffer && this.indexBuffer ) {

			passEncoder.setVertexBuffer( 0, this.verticesBuffer );
			passEncoder.setIndexBuffer( this.indexBuffer, 'uint16' );
			passEncoder.drawIndexed( this.geo.indexCount );

		}


		passEncoder.endPass();

		this.device.queue.submit(
			[ commandEncoder.finish() ]
		);


		requestAnimationFrame( this.render.bind( this ) );

	}

}
