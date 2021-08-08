export class Geometry {

	public position: Float32Array;
	public uv: Float32Array;
	public normal: Float32Array;
	public allAttributes: Float32Array;

	public index: Uint16Array;

	public verticesCount: number;
	public indexCount: number;

	public arrays: {
		position: number[],
		uv: number[],
		normal: number[],
		index: number[]
	}

	constructor(
		position: number[],
		uv: number[],
		normal: number[],
		index: number[]
	) {

		this.position = new Float32Array( position );
		this.uv = new Float32Array( uv );
		this.normal = new Float32Array( normal );
		this.index = new Uint16Array( index );

		this.arrays = {
			position,
			uv,
			normal,
			index
		};

		this.verticesCount = this.position.length / 3;
		this.indexCount = this.index.length;

		let all: number[] = [];

		for ( let i = 0; i < this.verticesCount; i ++ ) {

			all.push( position[ i * 3 + 0 ] || 0, position[ i * 3 + 1 ] || 0, position[ i * 3 + 2 ] || 0 );
			all.push( uv[ i * 2 + 0 ] || 0, uv[ i * 2 + 1 ] || 0 );
			all.push( normal[ i * 3 + 0 ] || 0, normal[ i * 3 + 1 ] || 0, normal[ i * 3 + 2 ] || 0 );

		}

		this.allAttributes = new Float32Array( all );

	}

}
