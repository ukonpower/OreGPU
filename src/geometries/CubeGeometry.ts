import { Geometry } from './Geometry';

export class CubeGeometry extends Geometry {

	constructor( width: number = 1, height: number = 1, depth: number = 1 ) {

		let hx = width / 2;
		let hy = height / 2;
		let hz = depth / 2;

		let p = [
			- hx, hy, hz,
			hx, hy, hz,
			- hx, - hy, hz,
			hx, - hy, hz,

			hx, hy, - hz,
			- hx, hy, - hz,
			hx, - hy, - hz,
			- hx, - hy, - hz,

			hx, hy, hz,
			hx, hy, - hz,
			hx, - hy, hz,
			hx, - hy, - hz,

			- hx, hy, - hz,
			- hx, hy, hz,
			- hx, - hy, - hz,
			- hx, - hy, hz,

			hx, hy, - hz,
			hx, hy, hz,
			- hx, hy, - hz,
			- hx, hy, hz,

			- hx, - hy, - hz,
			- hx, - hy, hz,
			hx, - hy, - hz,
			hx, - hy, hz,

		];

		let n = [
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
			0, 0, - 1,
			0, 0, - 1,
			0, 0, - 1,
			0, 0, - 1,
			1, 0, 0,
			1, 0, 0,
			1, 0, 0,
			1, 0, 0,
			- 1, 0, 0,
			- 1, 0, 0,
			- 1, 0, 0,
			- 1, 0, 0,
			0, 1, 0,
			0, 1, 0,
			0, 1, 0,
			0, 1, 0,
			0, - 1, 0,
			0, - 1, 0,
			0, - 1, 0,
			0, - 1, 0,
		];

		let u = [];
		let index = [];

		for ( let i = 0; i < 6; i ++ ) {

			u.push(
				0, 1,
				1, 1,
				0, 0,
				1, 0
			);

			let offset = 4 * i;

			index.push(
				0 + offset, 2 + offset, 1 + offset, 1 + offset, 2 + offset, 3 + offset
			);

		}

		super( p, u, n, index );

	}

}
