import { Geometry } from './Geometry';
import { Vec3 } from '../math/Vec3';

export class SphereGeometry extends Geometry {

	constructor( radius: number = 0.5, widthSegments: number = 20, heightSegments: number = 10 ) {

		let p: number[] = [];
		let u: number[] = [];
		let n: number[] = [];
		let index: number[] = [];

		for ( let i = 0; i <= heightSegments; i ++ ) {

			let thetaI = i / heightSegments * Math.PI;

			let segments = ( i != 0 && i != heightSegments ) ? widthSegments : widthSegments;

			for ( let j = 0; j < segments; j ++ ) {

				// pos

				let thetaJ = j / segments * Math.PI * 2.0;
				let widthRadius = Math.sin( thetaI ) * radius;

				let x = Math.cos( thetaJ ) * widthRadius;
				let y = - Math.cos( thetaI ) * radius;
				let z = Math.sin( thetaJ ) * widthRadius;

				p.push( x, y, z );

				// uv

				u.push(
					j / segments,
					i / heightSegments
				);

				//normal

				let normal = new Vec3( x, y, z ).normalize();

				n.push( normal.x, normal.y, normal.z );

				// index

				index.push(
					i * widthSegments + j,
					( i + 1 ) * widthSegments + ( j + 1 ) % widthSegments,
					i * widthSegments + ( j + 1 ) % widthSegments,

					i * widthSegments + j,
					( i + 1 ) * widthSegments + j,
					( i + 1 ) * widthSegments + ( j + 1 ) % widthSegments,

				);

			}

		}

		super( p, u, n, index );


	}

}
