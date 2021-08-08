import { Geometry } from './Geometry';

export class PlaneGeometry extends Geometry {

	constructor( width: number = 1, height: number = 1, widthSegments: number = 1, heightSegments: number = 1 ) {

		let hx = width / 2;
		let hy = height / 2;

		let p: number[] = [];
		let uv: number[] = [];
		let n: number[] = [];
		let index: number[] = [];

		for ( let i = 0; i <= heightSegments; i ++ ) {

			for ( let j = 0; j <= widthSegments; j ++ ) {

				let x = ( j / widthSegments );
				let y = ( i / widthSegments );

				p.push(
					- hx + width * x,
					- hy + height * y,
					0
				);

				uv.push( x, y );

				if ( i > 0 && j > 0 ) {

					let n = ( widthSegments + 1 );
					let ru = n * i + j;
					let lb = n * ( i - 1 ) + j - 1;

					index.push(
						ru, n * i + j - 1, lb,
						ru, lb, n * ( i - 1 ) + j,
					);

				}

				n.push( 0, 0, 1 );

			}

		}

		super( p, uv, n, index );


	}

}
