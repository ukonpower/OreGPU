import { Mat4 } from "./Mat4";
import { Vec3 } from "./Vec3";

export class Mat3 {

	public elm: number[] = [];

	constructor() {

		this.identity();

	}

	public get isMat3() {

		return true;

	}

	public identity() {

		this.elm = [
			1, 0, 0,
			0, 1, 0,
			0, 0, 1,
		];

		return this;

	}

	public set( a: number = 0, b: number = 0, c: number = 0, d: number = 0, e: number = 0, f: number = 0, g: number = 0, h: number = 0, i: number = 0 ) {

		this.elm = [
			a, d, g,
			b, e, h,
			c, f, i
		];

		return this;

	}

	public clone() {

		return new Mat3().copy( this );

	}

	public copy( mat: Mat3 ): Mat3

	public copy( mat: Mat4 ): Mat3

	public copy( mat: Mat3 | Mat4 ): Mat3 {

		if ( 'isMat3' in mat ) {

			this.elm = mat.elm.slice();

		}

		if ( 'isMat4' in mat ) {

			this.set(
				mat.elm[ 0 ], mat.elm[ 4 ], mat.elm[ 8 ],
				mat.elm[ 1 ], mat.elm[ 5 ], mat.elm[ 9 ],
				mat.elm[ 2 ], mat.elm[ 6 ], mat.elm[ 10 ]
			);

		}

		return this;

	}

	public inverse() {

		let a11 = this.elm[ 0 ];
		let a12 = this.elm[ 3 ];
		let a13 = this.elm[ 6 ];
		let a21 = this.elm[ 1 ];
		let a22 = this.elm[ 4 ];
		let a23 = this.elm[ 7 ];
		let a31 = this.elm[ 2 ];
		let a32 = this.elm[ 5 ];
		let a33 = this.elm[ 8 ];

		let det = a11 * a22 * a33 + a12 * a23 * a31 + a13 * a21 * a32 -
			a13 * a22 * a31 - a12 * a21 * a33 - a11 * a23 * a32;

		if ( det == 0 ) {

			return this.set( 0, 0, 0, 0, 0, 0, 0, 0, 0 );

		}

		let detInv = 1.0 / det;

		this.elm[ 0 ] = ( a22 * a33 - a23 * a32 ) * detInv;
		this.elm[ 3 ] = - ( a12 * a33 - a13 * a32 ) * detInv;
		this.elm[ 6 ] = ( a12 * a23 - a13 * a22 ) * detInv;
		this.elm[ 1 ] = - ( a21 * a33 - a23 * a31 ) * detInv;
		this.elm[ 4 ] = ( a11 * a33 - a13 * a31 ) * detInv;
		this.elm[ 7 ] = - ( a11 * a23 - a13 * a21 ) * detInv;
		this.elm[ 2 ] = ( a21 * a32 - a22 * a31 ) * detInv;
		this.elm[ 5 ] = - ( a11 * a32 - a12 * a31 ) * detInv;
		this.elm[ 8 ] = ( a11 * a22 - a12 * a21 ) * detInv;

		return this;

	}

	public transpose() {

		let a = this.elm.slice();

		this.elm[ 0 ] = a[ 0 ];
		this.elm[ 3 ] = a[ 1 ];
		this.elm[ 6 ] = a[ 2 ];
		this.elm[ 1 ] = a[ 3 ];
		this.elm[ 4 ] = a[ 4 ];
		this.elm[ 7 ] = a[ 5 ];
		this.elm[ 2 ] = a[ 6 ];
		this.elm[ 5 ] = a[ 7 ];
		this.elm[ 8 ] = a[ 8 ];

		return this;

	}

	protected mul( elm2: number[] ) {

		let dist = new Array( 9 );

		for ( let i = 0; i < 3; i ++ ) {

			for ( let j = 0; j < 3; j ++ ) {

				let sum = 0;

				for ( let k = 0; k < 3; k ++ ) {

					sum += this.elm[ k * 3 + j ] * elm2[ k + i * 3 ];

				}

				dist[ j + i * 3 ] = sum;

			}

		}

		this.elm = dist;

	}

	public multiply( m: Mat3 ) {

		this.mul( m.elm );

		return this;

	}

	public multiplyScaler( a: number ) {

		for ( let i = 0; i < this.elm.length; i ++ ) {

			this.elm[ i ] *= a;

		}

		return this;

	}

}
