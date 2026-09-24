<!--

@license Apache-2.0

Copyright (c) 2026 The Stdlib Authors.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

-->


<details>
  <summary>
    About stdlib...
  </summary>
  <p>We believe in a future in which the web is a preferred environment for numerical computation. To help realize this future, we've built stdlib. stdlib is a standard library, with an emphasis on numerical and scientific computation, written in JavaScript (and C) for execution in browsers and in Node.js.</p>
  <p>The library is fully decomposable, being architected in such a way that you can swap out and mix and match APIs and functionality to cater to your exact preferences and use cases.</p>
  <p>When you use stdlib, you can be absolutely certain that you are using the most thorough, rigorous, well-written, studied, documented, tested, measured, and high-quality code out there.</p>
  <p>To join us in bringing numerical computing to the web, get started by checking us out on <a href="https://github.com/stdlib-js/stdlib">GitHub</a>, and please consider <a href="https://opencollective.com/stdlib">financially supporting stdlib</a>. We greatly appreciate your continued support!</p>
</details>

# sinqi

[![NPM version][npm-image]][npm-url] [![Build Status][test-image]][test-url] [![Coverage Status][coverage-image]][coverage-url] <!-- [![dependencies][dependencies-image]][dependencies-url] -->

> Initialize a workspace array for performing a quarter-wave sine transform on a one-dimensional ndarray.

<section class="intro">

</section>

<!-- /.intro -->

<section class="installation">

## Installation

```bash
npm install @stdlib/fft-base-fftpack-ndarray-generic-sinqi
```

Alternatively,

-   To load the package in a website via a `script` tag without installation and bundlers, use the [ES Module][es-module] available on the [`esm`][esm-url] branch (see [README][esm-readme]).
-   If you are using Deno, visit the [`deno`][deno-url] branch (see [README][deno-readme] for usage intructions).
-   For use in Observable, or in browser/node environments, use the [Universal Module Definition (UMD)][umd] build available on the [`umd`][umd-url] branch (see [README][umd-readme]).

The [branches.md][branches-url] file summarizes the available branches and displays a diagram illustrating their relationships.

To view installation and usage instructions specific to each branch build, be sure to explicitly navigate to the respective README files on each branch, as linked to above.

</section>

<section class="usage">

## Usage

```javascript
var sinqi = require( '@stdlib/fft-base-fftpack-ndarray-generic-sinqi' );
```

#### sinqi( arrays )

Initializes a workspace array for performing a quarter-wave sine transform on a one-dimensional ndarray.

```javascript
var Float64Vector = require( '@stdlib/ndarray-vector-float64' );
var scalar2ndarray = require( '@stdlib/ndarray-from-scalar' );
var Slice = require( '@stdlib/slice-ctor' );
var slice = require( '@stdlib/ndarray-slice' );

var N = 8;
var len = scalar2ndarray( N, {
    'dtype': 'int32'
});

var w = new Float64Vector( ( 3*N ) + 34 );

var out = sinqi( [ w, len ] );
// returns <ndarray>

var bool = ( out === w );
// returns true

var cosineTable = slice( w, new Slice( 0, N ) );
// returns <ndarray>[ ~0.98, ~0.92, ~0.83, ~0.7, ~0.56, ~0.38, ~0.2, ~0.0 ]

var twiddleFactors = slice( w, new Slice( 2*N, 3*N ) );
// returns <ndarray>[ ~0.707, ~0.707, 0, 0, 0, 0, 0, 0 ]

var factors = slice( w, new Slice( 3*N, ( 3*N ) + 4 ) );
// returns <ndarray>[ 8, 2, 2, 4 ]
```

The function has the following parameters:

-   **arrays**: array-like object containing the following ndarrays:

    -   a one-dimensional input ndarray.
    -   a zero-dimensional ndarray containing the length of the sequence to transform.

</section>

<!-- /.usage -->

<section class="notes">

## Notes

-   Let `N` equal the length of the sequence to transform. The input ndarray is divided into four sections:

    ```text
            size = N              N                   N          2+ceil(log2(N)/2)
                ↓                 ↓                   ↓                  ↓
        | cosine table | scratch / workspace | twiddle factors | radix factor table |
                ↑                 ↑                   ↑                  ↑
    i = 0      ...     N         ...        2N       ...      3N        ...
    ```

    -   **cosine table**: a table of precomputed cosine coefficients used by quarter-wave sine transforms.
    -   **scratch/workspace**: used as a scratch space when performing transforms. This section is not updated during initialization.
    -   **twiddle factors**: a table of reusable complex-exponential constants stored as cosine/sine pairs.
    -   **radix factor table**: a table containing the sequence length `N`, the number of factors into which `N` was decomposed, and the individual integer radix factors.

-   In general, an input ndarray should have `3N + 34` indexed elements (as `log2(N)/2 ≤ 32` for all `2^64`). During initialization, only the sections for storing the cosine coefficients, twiddle factors, and the factorization of `N` are updated.

-   The radix factor table is comprised as follows:

    ```text
    | sequence_length | number_of_factors | integer_factors |
    ```

-   If provided an empty one-dimensional input ndarray, the function returns the input ndarray unchanged.

</section>

<!-- /.notes -->

<section class="examples">

## Examples

<!-- eslint no-undef: "error" -->

```javascript
var Float64Vector = require( '@stdlib/ndarray-vector-float64' );
var scalar2ndarray = require( '@stdlib/ndarray-from-scalar' );
var ndarray2array = require( '@stdlib/ndarray-to-array' );
var sinqi = require( '@stdlib/fft-base-fftpack-ndarray-generic-sinqi' );

var N = 8;

var w = new Float64Vector( ( 3*N ) + 34 );
console.log( ndarray2array( w ) );

var len = scalar2ndarray( N, {
    'dtype': 'int32'
});

var out = sinqi( [ w, len ] );
console.log( ndarray2array( out ) );
```

</section>

<!-- /.examples -->

<!-- Section for related `stdlib` packages. Do not manually edit this section, as it is automatically populated. -->

<section class="related">

</section>

<!-- /.related -->

<!-- Section for all links. Make sure to keep an empty line after the `section` element and another before the `/section` close. -->


<section class="main-repo" >

* * *

## Notice

This package is part of [stdlib][stdlib], a standard library for JavaScript and Node.js, with an emphasis on numerical and scientific computing. The library provides a collection of robust, high performance libraries for mathematics, statistics, streams, utilities, and more.

For more information on the project, filing bug reports and feature requests, and guidance on how to develop [stdlib][stdlib], see the main project [repository][stdlib].

#### Community

[![Chat][chat-image]][chat-url]

---

## License

See [LICENSE][stdlib-license].


## Copyright

Copyright &copy; 2016-2026. The Stdlib [Authors][stdlib-authors].

</section>

<!-- /.stdlib -->

<!-- Section for all links. Make sure to keep an empty line after the `section` element and another before the `/section` close. -->

<section class="links">

[npm-image]: http://img.shields.io/npm/v/@stdlib/fft-base-fftpack-ndarray-generic-sinqi.svg
[npm-url]: https://npmjs.org/package/@stdlib/fft-base-fftpack-ndarray-generic-sinqi

[test-image]: https://github.com/stdlib-js/fft-base-fftpack-ndarray-generic-sinqi/actions/workflows/test.yml/badge.svg?branch=main
[test-url]: https://github.com/stdlib-js/fft-base-fftpack-ndarray-generic-sinqi/actions/workflows/test.yml?query=branch:main

[coverage-image]: https://img.shields.io/codecov/c/github/stdlib-js/fft-base-fftpack-ndarray-generic-sinqi/main.svg
[coverage-url]: https://codecov.io/github/stdlib-js/fft-base-fftpack-ndarray-generic-sinqi?branch=main

<!--

[dependencies-image]: https://img.shields.io/david/stdlib-js/fft-base-fftpack-ndarray-generic-sinqi.svg
[dependencies-url]: https://david-dm.org/stdlib-js/fft-base-fftpack-ndarray-generic-sinqi/main

-->

[chat-image]: https://img.shields.io/badge/zulip-join_chat-brightgreen.svg
[chat-url]: https://stdlib.zulipchat.com

[stdlib]: https://github.com/stdlib-js/stdlib

[stdlib-authors]: https://github.com/stdlib-js/stdlib/graphs/contributors

[umd]: https://github.com/umdjs/umd
[es-module]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules

[deno-url]: https://github.com/stdlib-js/fft-base-fftpack-ndarray-generic-sinqi/tree/deno
[deno-readme]: https://github.com/stdlib-js/fft-base-fftpack-ndarray-generic-sinqi/blob/deno/README.md
[umd-url]: https://github.com/stdlib-js/fft-base-fftpack-ndarray-generic-sinqi/tree/umd
[umd-readme]: https://github.com/stdlib-js/fft-base-fftpack-ndarray-generic-sinqi/blob/umd/README.md
[esm-url]: https://github.com/stdlib-js/fft-base-fftpack-ndarray-generic-sinqi/tree/esm
[esm-readme]: https://github.com/stdlib-js/fft-base-fftpack-ndarray-generic-sinqi/blob/esm/README.md
[branches-url]: https://github.com/stdlib-js/fft-base-fftpack-ndarray-generic-sinqi/blob/main/branches.md

[stdlib-license]: https://raw.githubusercontent.com/stdlib-js/fft-base-fftpack-ndarray-generic-sinqi/main/LICENSE

</section>

<!-- /.links -->
