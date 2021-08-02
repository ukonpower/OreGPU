import sampleVert from './shaders/sample.vert.wgsl';
import sampleFrag from './shaders/sample.frag.wgsl';
import { Mat4 } from '../math/Mat4';
import { Vec3 } from '../math/Vec3';

export class Renderer {

	private canvas: HTMLCanvasElement;

	private adapter: GPUAdapter | null = null;
	private device: GPUDevice | null = null;

	private context: GPUPresentationContext | null = null

	private pipeline: GPURenderPipeline | null = null;

	private renderPassDescripter: GPURenderPassDescriptor | null = null;

	private projectionMatrix: Mat4;
	private viewMatrix: Mat4;

	private verticesBuffer: GPUBuffer | null = null;

	constructor( canvas: HTMLCanvasElement ) {

		this.canvas = canvas;

		// matrix
		this.projectionMatrix = new Mat4().perspective( 50, this.canvas.clientWidth / this.canvas.clientHeight, 0.1, 1000 );
		this.viewMatrix = new Mat4().makeTransform( new Vec3( 0.0, 0.0, - 5.0 ) );

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

		let cubeArray = new Float32Array( [
			- 1, 1, 0, 1,
			1, 1, 0, 1,
			1, - 1, 0, 1,

			1, - 1, 0, 1,
			- 1, - 1, 0, 1,
			- 1, 1, 0, 1,
		] );

		this.verticesBuffer = this.device.createBuffer( {
			size: cubeArray.byteLength,
			usage: GPUBufferUsage.VERTEX,
			mappedAtCreation: true
		} );

		new Float32Array( this.verticesBuffer.getMappedRange() ).set( cubeArray );
		this.verticesBuffer.unmap();

		// renderpipeline

		this.pipeline = this.device.createRenderPipeline( {
			vertex: {
				module: this.device.createShaderModule( {
					code: sampleVert
				} ),
				entryPoint: 'main',
				buffers: [
					{
						arrayStride: 4 * 4,
						attributes: [ {
							shaderLocation: 0,
							offset: 0,
							format: 'float32x4' as GPUVertexFormat,
						} ]
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
				cullMode: 'front'
			},
		} );

		this.render();

	}

	private render() {

		if ( ! ( this.context && this.device && this.adapter ) ) {

			return;

		}

		let commandEncoder = this.device.createCommandEncoder();
		let textureView = this.context.getCurrentTexture().createView();

		this.renderPassDescripter = {
			colorAttachments: [
				{
					view: textureView,
					loadValue: { r: 0.0, g: 0.0, b: 0.0, a: 1.0 },
					storeOp: 'store' as GPUStoreOp,
				  },
			]
		};


		let passEncoder = commandEncoder.beginRenderPass( this.renderPassDescripter );

		if ( this.pipeline ) {

			passEncoder.setPipeline( this.pipeline );

			if ( this.verticesBuffer ) {

				passEncoder.setVertexBuffer( 0, this.verticesBuffer );

			}

			passEncoder.draw( 6, 1, 0, 0 );

			passEncoder.endPass();

			this.device.queue.submit(
				[ commandEncoder.finish() ]
			);

		}

		requestAnimationFrame( this.render.bind( this ) );

	}

}
