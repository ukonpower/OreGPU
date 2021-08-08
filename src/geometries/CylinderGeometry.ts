import { Geometry } from './Geometry';
import { Vec3 } from '../math/Vec3';

export class CylinderGeometry extends Geometry {

	constructor( radiusTop: number = 0.5, radiusBottom: number = 0.5, height: number = 1, radSegments: number = 10, heightSegments: number = 1 ) {

		let p: number[] = [];
		let u: number[] = [];
		let n: number[] = [];
		let index: number[] = [];

		for ( let i = 0; i <= heightSegments + 2; i ++ ) {

			for ( let j = 0; j < radSegments; j ++ ) {

				let theta = Math.PI * 2.0 / radSegments * j;

				if ( i <= heightSegments ) {

					//side
					let w = i / heightSegments;
					let radius = ( 1.0 - w ) * radiusBottom + w * radiusTop;

					let x = Math.cos( theta ) * radius;
					let y = - ( height / 2 ) + ( height / heightSegments ) * i;
					let z = Math.sin( theta ) * radius;

					p.push( x, y, z );

					u.push(
						j / radSegments,
						i / heightSegments
					);

					let normal = new Vec3( Math.cos( theta ), 0, Math.sin( theta ) ).normalize();

					n.push(
						normal.x,
						normal.y,
						normal.z
					);

					if ( i < heightSegments ) {

						index.push(
							i * radSegments + j,
							( i + 1 ) * radSegments + ( j + 1 ) % radSegments,
							i * radSegments + ( j + 1 ) % radSegments,

							i * radSegments + j,
							( i + 1 ) * radSegments + j,
							( i + 1 ) * radSegments + ( j + 1 ) % radSegments,

						);

					}

				} else {

					//bottom, top

					let side = i - heightSegments - 1;

					let radius = side ? radiusTop : radiusBottom;

					let x = Math.cos( theta ) * radius;
					let y = - ( height / 2 ) + height * ( side );
					let z = Math.sin( theta ) * radius;

					p.push( x, y, z );

					u.push(
						( x + radius ) * 0.5 / radius,
						( z + radius ) * 0.5 / radius,
					);

					n.push( 0, - 1 + side * 2, 0 );

					let offset = radSegments * ( heightSegments + ( side + 1 ) );

					if ( j <= radSegments - 2 ) {

						if ( side == 0 ) {

							index.push(
								offset, offset + j, offset + j + 1,
							);

						} else {

							index.push(
								offset, offset + j + 1, offset + j
							);

						}

					}

				}

			}

			super( p, u, n, index );

		}

	}

}
