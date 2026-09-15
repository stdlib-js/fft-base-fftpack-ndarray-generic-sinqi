/** @license Apache-2.0 */

'use strict';

/**
* Initialize a workspace array for performing a quarter-wave sine transform on a one-dimensional ndarray.
*
* @module @stdlib/fft-base-fftpack-ndarray-generic-sinqi
*
* @example
* var Float64Vector = require( '@stdlib/ndarray-vector-float64' );
* var scalar2ndarray = require( '@stdlib/ndarray-from-scalar' );
* var Slice = require( '@stdlib/slice-ctor' );
* var slice = require( '@stdlib/ndarray-slice' );
* var sinqi = require( '@stdlib/fft-base-fftpack-ndarray-generic-sinqi' );
*
* var N = 8;
* var len = scalar2ndarray( N, {
*     'dtype': 'int32'
* });
*
* var w = new Float64Vector( ( 3*N ) + 34 );
*
* var out = sinqi( [ w, len ] );
* // returns <ndarray>
*
* var bool = ( out === w );
* // returns true
*
* var cosineTable = slice( w, new Slice( 0, N ) );
* // returns <ndarray>[ ~0.98, ~0.92, ~0.83, ~0.7, ~0.56, ~0.38, ~0.2, ~0.0 ]
*
* var twiddleFactors = slice( w, new Slice( 2*N, 3*N ) );
* // returns <ndarray>[ ~0.707, ~0.707, 0, 0, 0, 0, 0, 0 ]
*
* var factors = slice( w, new Slice( 3*N, ( 3*N ) + 4 ) );
* // returns <ndarray>[ 8, 2, 2, 4 ]
*/

// MODULES //

var main = require( './main.js' );


// EXPORTS //

module.exports = main;
