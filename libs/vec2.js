/**
 * Derivated from gl-matrix.js - Brandon Jones, Colin MacKenzie IV
 */

/* Copyright (c) 2012, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation 
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

var vec2 = function(){
    vec2.create = function(){
        return [0,0];
    };

    /**
     * Creates a new this initialized with values from an existing vector
     *
     * @param {this} a vector to clone
     * @returns {this} a new 2D vector
     */
    vec2.clone = function(a) {
        var out = new Array(2);
        out[0] = a[0];
        out[1] = a[1];
        return out;
    };

    /**
     * Creates a new this initialized with the given values
     *
     * @param {Number} x X component
     * @param {Number} y Y component
     * @returns {this} a new 2D vector
     */
    vec2.fromValues = function(x, y) {
        var out = new Array(2);
        out[0] = x;
        out[1] = y;
        return out;
    };

    /**
     * Copy the values from one this to another
     *
     * @param {this} out the receiving vector
     * @param {this} a the source vector
     * @returns {this} out
     */
    vec2.copy = function(out, a) {
        out[0] = a[0];
        out[1] = a[1];
        return out;
    };

    /**
     * Set the components of a this to the given values
     *
     * @param {this} out the receiving vector
     * @param {Number} x X component
     * @param {Number} y Y component
     * @returns {this} out
     */
    vec2.set = function(out, x, y) {
        out[0] = x;
        out[1] = y;
        return out;
    };

    /**
     * Adds two this's
     *
     * @param {this} out the receiving vector
     * @param {this} a the first operand
     * @param {this} b the second operand
     * @returns {this} out
     */
    vec2.add = function(out, a, b) {
        out[0] = a[0] + b[0];
        out[1] = a[1] + b[1];
        return out;
    };

    /**
     * Subtracts two this's
     *
     * @param {this} out the receiving vector
     * @param {this} a the first operand
     * @param {this} b the second operand
     * @returns {this} out
     */
    vec2.sub = vec2.subtract = function(out, a, b) {
        out[0] = a[0] - b[0];
        out[1] = a[1] - b[1];
        return out;
    };

    /**
     * Multiplies two this's
     *
     * @param {this} out the receiving vector
     * @param {this} a the first operand
     * @param {this} b the second operand
     * @returns {this} out
     */
    vec2.mul = vec2.multiply = function(out, a, b) {
        out[0] = a[0] * b[0];
        out[1] = a[1] * b[1];
        return out;
    };

    /**
     * Divides two this's
     *
     * @param {this} out the receiving vector
     * @param {this} a the first operand
     * @param {this} b the second operand
     * @returns {this} out
     */
    vec2.div = vec2.divide = function(out, a, b) {
        out[0] = a[0] / b[0];
        out[1] = a[1] / b[1];
        return out;
    };

    /**
     * Returns the minimum of two this's
     *
     * @param {this} out the receiving vector
     * @param {this} a the first operand
     * @param {this} b the second operand
     * @returns {this} out
     */
    vec2.min = function(out, a, b) {
        out[0] = Math.min(a[0], b[0]);
        out[1] = Math.min(a[1], b[1]);
        return out;
    };

    /**
     * Returns the maximum of two this's
     *
     * @param {this} out the receiving vector
     * @param {this} a the first operand
     * @param {this} b the second operand
     * @returns {this} out
     */
    vec2.max = function(out, a, b) {
        out[0] = Math.max(a[0], b[0]);
        out[1] = Math.max(a[1], b[1]);
        return out;
    };

    /**
     * Scales a this by a scalar number
     *
     * @param {this} out the receiving vector
     * @param {this} a the vector to scale
     * @param {this} b amount to scale the vector by
     * @returns {this} out
     */
    vec2.scale = function(out, a, b) {
        out[0] = a[0] * b;
        out[1] = a[1] * b;
        return out;
    };

    /**
     * Calculates the euclidian distance between two this's
     *
     * @param {this} a the first operand
     * @param {this} b the second operand
     * @returns {Number} distance between a and b
     */
    vec2.dist = vec2.distance = function(a, b) {
        var x = b[0] - a[0],
            y = b[1] - a[1];
        return Math.sqrt(x*x + y*y);
    };

    /**
     * Calculates the squared euclidian distance between two this's
     *
     * @param {this} a the first operand
     * @param {this} b the second operand
     * @returns {Number} squared distance between a and b
     */
    vec2.sqrDist = vec2.squaredDistance = function(a, b) {
        var x = b[0] - a[0],
            y = b[1] - a[1];
        return x*x + y*y;
    };

    /**
     * Caclulates the length of a this
     *
     * @param {this} a vector to calculate length of
     * @returns {Number} length of a
     */
    vec2.len = vec2.length = function (a) {
        var x = a[0],
            y = a[1];
        return Math.sqrt(x*x + y*y);
    };

    /**
     * Caclulates the squared length of a this
     *
     * @param {this} a vector to calculate squared length of
     * @returns {Number} squared length of a
     */
    vec2.sqrLen = vec2.squaredLength = function (a) {
        var x = a[0],
            y = a[1];
        return x*x + y*y;
    };

    /**
     * Negates the components of a this
     *
     * @param {this} out the receiving vector
     * @param {this} a vector to negate
     * @returns {this} out
     */
    vec2.negate = function(out, a) {
        out[0] = -a[0];
        out[1] = -a[1];
        return out;
    };

    /**
     * Normalize a this
     *
     * @param {this} out the receiving vector
     * @param {this} a vector to normalize
     * @returns {this} out
     */
    vec2.normalize = function(out, a) {
        var x = a[0],
            y = a[1];
        var len = x*x + y*y;
        if (len > 0) {
            //TODO: evaluate use of glm_invsqrt here?
            len = 1 / Math.sqrt(len);
            out[0] = a[0] * len;
            out[1] = a[1] * len;
        }
        return out;
    };

    /**
     * Caclulates the dot product of two this's
     *
     * @param {this} a the first operand
     * @param {this} b the second operand
     * @returns {Number} dot product of a and b
     */
    vec2.dot = function (a, b) {
        return a[0] * b[0] + a[1] * b[1];
    };

    /**
     * Computes the cross product of two this's
     * Note that the cross product must by definition produce a 3D vector
     *
     * @param {vec3} out the receiving vector
     * @param {this} a the first operand
     * @param {this} b the second operand
     * @returns {vec3} out
     */
    vec2.cross = function(out, a, b) {
        var z = a[0] * b[1] - a[1] * b[0];
        out[0] = out[1] = 0;
        out[2] = z;
        return out;
    };

    /**
     * Performs a linear interpolation between two this's
     *
     * @param {vec3} out the receiving vector
     * @param {this} a the first operand
     * @param {this} b the second operand
     * @param {Number} t interpolation amount between the two inputs
     * @returns {this} out
     */
    vec2.lerp = function (out, a, b, t) {
        var ax = a[0],
            ay = a[1];
        out[0] = ax + t * (b[0] - ax);
        out[1] = ay + t * (b[1] - ay);
        return out;
    };

    /**
     * Transforms the this with a mat2
     *
     * @param {this} out the receiving vector
     * @param {this} a the vector to transform
     * @param {mat2} m matrix to transform with
     * @returns {this} out
     */
    vec2.transformMat2 = function(out, a, m) {
        var x = a[0],
            y = a[1];
        out[0] = x * m[0] + y * m[1];
        out[1] = x * m[2] + y * m[3];
        return out;
    };

    vec2.str = function (a) {
        return 'this(' + a[0] + ', ' + a[1] + ')';
    };
}

vec2();