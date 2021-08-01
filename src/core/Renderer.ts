import sampleVert from './shaders/sample.vert.wgsl';
import sampleFrag from './shaders/sample.frag.wgsl';

export class Renderer {

	private canvas: HTMLCanvasElement;

	private adapter: GPUAdapter | null = null;
	private device: GPUDevice | null = null;

	private context: GPUPresentationContext | null = null

	private pipeline: GPURenderPipeline | null = null;

	constructor( canvas: HTMLCanvasElement ) {

		this.canvas = canvas;

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

		this.pipeline = this.device.createRenderPipeline( {
			vertex: {
				module: this.device.createShaderModule( {
					code: sampleVert
				} ),
				entryPoint: 'main'
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
				topology: "triangle-list"
			}
		} );

		this.render();

	}

	private render() {

		if ( ! ( this.context && this.device && this.adapter ) ) {

			return;

		}

		let commandEncoder = this.device.createCommandEncoder();
		let textureView = this.context.getCurrentTexture().createView();

		let renderPassDescripter: GPURenderPassDescriptor = {
			colorAttachments: [
				{
					view: textureView,
					loadValue: { r: 0.0, g: 0.0, b: 0.0, a: 1.0 },
					storeOp: 'store' as GPUStoreOp,
				  },
			]
		};

		let passEncoder = commandEncoder.beginRenderPass( renderPassDescripter );

		if ( this.pipeline ) {

			passEncoder.setPipeline( this.pipeline );
			passEncoder.draw( 3, 1, 0, 0 );
			passEncoder.endPass();

			this.device.queue.submit(
				[ commandEncoder.finish() ]
			);

		}

		requestAnimationFrame( this.render.bind( this ) );

	}

}
