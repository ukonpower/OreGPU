(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.OREGPU = {}));
}(this, (function (exports) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    var sampleVert = "[[block]] struct Uniforms {\r\n  mvMatrix : mat4x4<f32>;\r\n  projectionMatrix : mat4x4<f32>;\r\n  normalMatrix:  mat3x3<f32>;\r\n};\r\n[[binding(0), group(0)]] var<uniform> uniforms : Uniforms;\r\n\r\nstruct VertexOutput {\r\n  [[builtin(position)]] Position : vec4<f32>;\r\n  [[location(0)]] col : vec3<f32>;\r\n  [[location(1)]] normal : vec3<f32>;\r\n};\r\n\r\n[[stage(vertex)]]\r\nfn main([[location(0)]] position : vec3<f32>, [[location(1)]] uv : vec2<f32>, [[location(2)]] normal : vec3<f32> ) -> VertexOutput {\r\n\r\n\tvar output: VertexOutput;\r\n\r\n\tvar mvPosition: vec4<f32> = uniforms.mvMatrix * vec4<f32>( position, 1.0 );\r\n\toutput.Position = uniforms.projectionMatrix * mvPosition;\r\n\toutput.col = position + vec3<f32>( 0.0, 0.0, 1.0 );\r\n\toutput.normal = normalize(normal * uniforms.normalMatrix);\r\n\r\n\treturn output;\r\n}\r\n";

    var sampleFrag = "[[stage(fragment)]]\r\nfn main([[location(0)]] col: vec3<f32>, [[location(1)]] normal: vec3<f32>) -> [[location(0)]] vec4<f32> {\r\n\r\n\tvar s: f32 = dot( normalize(normal), normalize( vec3<f32>( 1.0, 1.0, 11.0  ) ) );\r\n\tvar c: vec3<f32> = vec3<f32>( max( 0.0, s ) + 0.0);\r\n\treturn vec4<f32>(c, 1.0);\r\n}";

    var Vec3 = /** @class */ (function () {
        function Vec3(x, y, z) {
            this.x = x || 0;
            this.y = y || 0;
            this.z = z || 0;
        }
        Object.defineProperty(Vec3.prototype, "isVec3", {
            get: function () {
                return true;
            },
            enumerable: false,
            configurable: true
        });
        Vec3.prototype.set = function (x, y, z) {
            this.x = x;
            this.y = y;
            this.z = z;
            return this;
        };
        Vec3.prototype.add = function (a) {
            if (a.isVec3) {
                this.x += a.x;
                this.y += a.y;
                this.z += a.z;
            }
            else if (typeof (a) == 'number') {
                this.x += a;
                this.y += a;
                this.z += a;
            }
            return this;
        };
        Vec3.prototype.sub = function (a) {
            if (a.isVec3) {
                this.x -= a.x;
                this.y -= a.y;
                this.z -= a.z;
            }
            else if (typeof (a) == 'number') {
                this.x -= a;
                this.y -= a;
                this.z -= a;
            }
            return this;
        };
        Vec3.prototype.multiply = function (a) {
            this.x *= a;
            this.y *= a;
            this.z *= a;
            return this;
        };
        Vec3.prototype.divide = function (a) {
            this.x /= a;
            this.y /= a;
            this.z /= a;
            return this;
        };
        Vec3.prototype.length = function () {
            return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
        };
        Vec3.prototype.normalize = function () {
            return this.divide(this.length() || 1);
        };
        Vec3.prototype.cross = function (v) {
            var ax = this.x, ay = this.y, az = this.z;
            var bx = v.x, by = v.y, bz = v.z;
            this.x = ay * bz - az * by;
            this.y = az * bx - ax * bz;
            this.z = ax * by - ay * bx;
            return this;
        };
        Vec3.prototype.dot = function (v) {
            return this.x * v.x + this.y * v.y + this.z * v.z;
        };
        Vec3.prototype.copy = function (a) {
            this.x = a.x;
            this.y = a.y;
            this.z = a.z || 0;
            return this;
        };
        Vec3.prototype.clone = function () {
            return new Vec3(this.x, this.y, this.z);
        };
        return Vec3;
    }());

    var Mat4 = /** @class */ (function () {
        function Mat4() {
            this.elm = [];
            this.identity();
        }
        Object.defineProperty(Mat4.prototype, "isMat4", {
            get: function () {
                return true;
            },
            enumerable: false,
            configurable: true
        });
        Mat4.prototype.identity = function () {
            this.elm = [
                1, 0, 0, 0,
                0, 1, 0, 0,
                0, 0, 1, 0,
                0, 0, 0, 1,
            ];
            return this;
        };
        Mat4.prototype.clone = function () {
            return new Mat4().copy(this);
        };
        Mat4.prototype.copy = function (mat) {
            this.elm = mat.elm.slice();
            return this;
        };
        Mat4.prototype.inverse = function () {
            var a = this.elm[0], b = this.elm[1], c = this.elm[2], d = this.elm[3], e = this.elm[4], f = this.elm[5], g = this.elm[6], h = this.elm[7], i = this.elm[8], j = this.elm[9], k = this.elm[10], l = this.elm[11], m = this.elm[12], n = this.elm[13], o = this.elm[14], p = this.elm[15], q = a * f - b * e, r = a * g - c * e, s = a * h - d * e, t = b * g - c * f, u = b * h - d * f, v = c * h - d * g, w = i * n - j * m, x = i * o - k * m, y = i * p - l * m, z = j * o - k * n, A = j * p - l * n, B = k * p - l * o, ivd = 1 / (q * B - r * A + s * z + t * y - u * x + v * w);
            this.elm[0] = (f * B - g * A + h * z) * ivd;
            this.elm[1] = (-b * B + c * A - d * z) * ivd;
            this.elm[2] = (n * v - o * u + p * t) * ivd;
            this.elm[3] = (-j * v + k * u - l * t) * ivd;
            this.elm[4] = (-e * B + g * y - h * x) * ivd;
            this.elm[5] = (a * B - c * y + d * x) * ivd;
            this.elm[6] = (-m * v + o * s - p * r) * ivd;
            this.elm[7] = (i * v - k * s + l * r) * ivd;
            this.elm[8] = (e * A - f * y + h * w) * ivd;
            this.elm[9] = (-a * A + b * y - d * w) * ivd;
            this.elm[10] = (m * u - n * s + p * q) * ivd;
            this.elm[11] = (-i * u + j * s - l * q) * ivd;
            this.elm[12] = (-e * z + f * x - g * w) * ivd;
            this.elm[13] = (a * z - b * x + c * w) * ivd;
            this.elm[14] = (-m * t + n * r - o * q) * ivd;
            this.elm[15] = (i * t - j * r + k * q) * ivd;
            return this;
        };
        Mat4.prototype.mul = function (elm2) {
            var dist = new Array(16);
            for (var i = 0; i < 4; i++) {
                for (var j = 0; j < 4; j++) {
                    var sum = 0;
                    for (var k = 0; k < 4; k++) {
                        sum += this.elm[k * 4 + j] * elm2[k + i * 4];
                    }
                    dist[j + i * 4] = sum;
                }
            }
            this.elm = dist;
        };
        Mat4.prototype.multiply = function (m) {
            this.mul(m.elm);
            return this;
        };
        Mat4.prototype.multiplyScaler = function (a) {
            for (var i = 0; i < this.elm.length; i++) {
                this.elm[i] *= a;
            }
            return this;
        };
        Mat4.prototype.makePosition = function (position) {
            this.elm = [
                1, 0, 0, 0,
                0, 1, 0, 0,
                0, 0, 1, 0,
                position.x, position.y, position.z, 1
            ];
            return this;
        };
        Mat4.prototype.makeRotation = function (rotation) {
            var m = new Mat4();
            var c = Math.cos(rotation.x), s = Math.sin(rotation.x);
            m.mul([
                1, 0, 0, 0,
                0, c, s, 0,
                0, -s, c, 0,
                0, 0, 0, 1
            ]);
            c = Math.cos(rotation.y), s = Math.sin(rotation.y);
            m.mul([
                c, 0, -s, 0,
                0, 1, 0, 0,
                s, 0, c, 0,
                0, 0, 0, 1
            ]);
            c = Math.cos(rotation.z), s = Math.sin(rotation.z);
            m.mul([
                c, s, 0, 0,
                -s, c, 0, 0,
                0, 0, 1, 0,
                0, 0, 0, 1
            ]);
            this.elm = m.elm;
            return this;
        };
        Mat4.prototype.makeScale = function (scale) {
            this.elm = [
                scale.x, 0, 0, 0,
                0, scale.y, 0, 0,
                0, 0, scale.z, 0,
                0, 0, 0, 1
            ];
            return this;
        };
        Mat4.prototype.makeTransform = function (position, rotation, scale) {
            this.identity();
            this.multiply(new Mat4().makePosition(position || new Vec3(0.0, 0.0, 0.0)));
            this.multiply(new Mat4().makeRotation(rotation || new Vec3(0.0, 0.0, 0.0)));
            this.multiply(new Mat4().makeScale(scale || new Vec3(1.0, 1.0, 1.0)));
            return this;
        };
        Mat4.prototype.perspective = function (fov, aspect, near, far) {
            var r = 1 / Math.tan(fov * Math.PI / 360);
            var d = far - near;
            this.elm = [
                r / aspect, 0, 0, 0,
                0, r, 0, 0,
                0, 0, -(far + near) / d, -1,
                0, 0, -(far * near * 2) / d, 0
            ];
            return this;
        };
        Mat4.prototype.lookAt = function (eye, target, up) {
            var zAxis = eye.clone().sub(target).normalize();
            var xAxis = up.clone().cross(zAxis).normalize();
            var yAxis = zAxis.clone().cross(xAxis).normalize();
            this.elm = [
                xAxis.x, yAxis.x, zAxis.x, 0,
                xAxis.y, yAxis.y, zAxis.y, 0,
                xAxis.z, yAxis.z, zAxis.z, 0,
                -eye.dot(xAxis),
                -eye.dot(yAxis),
                -eye.dot(zAxis),
                1,
            ];
            return this;
        };
        return Mat4;
    }());

    var Geometry = /** @class */ (function () {
        function Geometry(position, uv, normal, index) {
            this.position = new Float32Array(position);
            this.uv = new Float32Array(uv);
            this.normal = new Float32Array(normal);
            this.index = new Uint16Array(index);
            this.arrays = {
                position: position,
                uv: uv,
                normal: normal,
                index: index
            };
            this.verticesCount = this.position.length / 3;
            this.indexCount = this.index.length;
            var all = [];
            for (var i = 0; i < this.verticesCount; i++) {
                all.push(position[i * 3 + 0], position[i * 3 + 1], position[i * 3 + 2]);
                all.push(uv[i * 2 + 0], uv[i * 2 + 1]);
                all.push(normal[i * 3 + 0], normal[i * 3 + 1], normal[i * 3 + 2]);
            }
            this.allAttributes = new Float32Array(all);
        }
        return Geometry;
    }());

    var CubeGeometry = /** @class */ (function (_super) {
        __extends(CubeGeometry, _super);
        function CubeGeometry(width, height, depth) {
            if (width === void 0) { width = 1; }
            if (height === void 0) { height = 1; }
            if (depth === void 0) { depth = 1; }
            var _this = this;
            var hx = width / 2;
            var hy = height / 2;
            var hz = depth / 2;
            var p = [
                -hx, hy, hz,
                hx, hy, hz,
                -hx, -hy, hz,
                hx, -hy, hz,
                hx, hy, -hz,
                -hx, hy, -hz,
                hx, -hy, -hz,
                -hx, -hy, -hz,
                hx, hy, hz,
                hx, hy, -hz,
                hx, -hy, hz,
                hx, -hy, -hz,
                -hx, hy, -hz,
                -hx, hy, hz,
                -hx, -hy, -hz,
                -hx, -hy, hz,
                hx, hy, -hz,
                hx, hy, hz,
                -hx, hy, -hz,
                -hx, hy, hz,
                -hx, -hy, -hz,
                -hx, -hy, hz,
                hx, -hy, -hz,
                hx, -hy, hz,
            ];
            var n = [
                0, 0, 1,
                0, 0, 1,
                0, 0, 1,
                0, 0, 1,
                0, 0, -1,
                0, 0, -1,
                0, 0, -1,
                0, 0, -1,
                1, 0, 0,
                1, 0, 0,
                1, 0, 0,
                1, 0, 0,
                -1, 0, 0,
                -1, 0, 0,
                -1, 0, 0,
                -1, 0, 0,
                0, 1, 0,
                0, 1, 0,
                0, 1, 0,
                0, 1, 0,
                0, -1, 0,
                0, -1, 0,
                0, -1, 0,
                0, -1, 0,
            ];
            var u = [];
            var index = [];
            for (var i = 0; i < 6; i++) {
                u.push(0, 1, 1, 1, 0, 0, 1, 0);
                var offset = 4 * i;
                index.push(0 + offset, 2 + offset, 1 + offset, 1 + offset, 2 + offset, 3 + offset);
            }
            _this = _super.call(this, p, u, n, index) || this;
            return _this;
        }
        return CubeGeometry;
    }(Geometry));

    var Mat3 = /** @class */ (function () {
        function Mat3() {
            this.elm = [];
            this.identity();
        }
        Object.defineProperty(Mat3.prototype, "isMat3", {
            get: function () {
                return true;
            },
            enumerable: false,
            configurable: true
        });
        Mat3.prototype.identity = function () {
            this.elm = [
                1, 0, 0,
                0, 1, 0,
                0, 0, 1,
            ];
            return this;
        };
        Mat3.prototype.set = function (a, b, c, d, e, f, g, h, i) {
            if (a === void 0) { a = 0; }
            if (b === void 0) { b = 0; }
            if (c === void 0) { c = 0; }
            if (d === void 0) { d = 0; }
            if (e === void 0) { e = 0; }
            if (f === void 0) { f = 0; }
            if (g === void 0) { g = 0; }
            if (h === void 0) { h = 0; }
            if (i === void 0) { i = 0; }
            this.elm = [
                a, d, g,
                b, e, h,
                c, f, i
            ];
            return this;
        };
        Mat3.prototype.clone = function () {
            return new Mat3().copy(this);
        };
        Mat3.prototype.copy = function (mat) {
            if ('isMat3' in mat) {
                this.elm = mat.elm.slice();
            }
            if ('isMat4' in mat) {
                this.set(mat.elm[0], mat.elm[4], mat.elm[8], mat.elm[1], mat.elm[5], mat.elm[9], mat.elm[2], mat.elm[6], mat.elm[10]);
            }
            return this;
        };
        Mat3.prototype.inverse = function () {
            var a11 = this.elm[0];
            var a12 = this.elm[3];
            var a13 = this.elm[6];
            var a21 = this.elm[1];
            var a22 = this.elm[4];
            var a23 = this.elm[7];
            var a31 = this.elm[2];
            var a32 = this.elm[5];
            var a33 = this.elm[8];
            var det = a11 * a22 * a33 + a12 * a23 * a31 + a13 * a21 * a32 -
                a13 * a22 * a31 - a12 * a21 * a33 - a11 * a23 * a32;
            if (det == 0) {
                return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0);
            }
            var detInv = 1.0 / det;
            this.elm[0] = (a22 * a33 - a23 * a32) * detInv;
            this.elm[3] = -(a12 * a33 - a13 * a32) * detInv;
            this.elm[6] = (a12 * a23 - a13 * a22) * detInv;
            this.elm[1] = -(a21 * a33 - a23 * a31) * detInv;
            this.elm[4] = (a11 * a33 - a13 * a31) * detInv;
            this.elm[7] = -(a11 * a23 - a13 * a21) * detInv;
            this.elm[2] = (a21 * a32 - a22 * a31) * detInv;
            this.elm[5] = -(a11 * a32 - a12 * a31) * detInv;
            this.elm[8] = (a11 * a22 - a12 * a21) * detInv;
            return this;
        };
        Mat3.prototype.transpose = function () {
            var a = this.elm.slice();
            this.elm[0] = a[0];
            this.elm[3] = a[1];
            this.elm[6] = a[2];
            this.elm[1] = a[3];
            this.elm[4] = a[4];
            this.elm[7] = a[5];
            this.elm[2] = a[6];
            this.elm[5] = a[7];
            this.elm[8] = a[8];
            return this;
        };
        Mat3.prototype.mul = function (elm2) {
            var dist = new Array(9);
            for (var i = 0; i < 3; i++) {
                for (var j = 0; j < 3; j++) {
                    var sum = 0;
                    for (var k = 0; k < 3; k++) {
                        sum += this.elm[k * 3 + j] * elm2[k + i * 3];
                    }
                    dist[j + i * 3] = sum;
                }
            }
            this.elm = dist;
        };
        Mat3.prototype.multiply = function (m) {
            this.mul(m.elm);
            return this;
        };
        Mat3.prototype.multiplyScaler = function (a) {
            for (var i = 0; i < this.elm.length; i++) {
                this.elm[i] *= a;
            }
            return this;
        };
        Mat3.prototype.makePosition = function (position) {
            this.elm = [
                1, 0, 0, 0,
                0, 1, 0, 0,
                0, 0, 1, 0,
                position.x, position.y, position.z, 1
            ];
            return this;
        };
        Mat3.prototype.makeRotation = function (rotation) {
            var m = new Mat3();
            var c = Math.cos(rotation.x), s = Math.sin(rotation.x);
            m.mul([
                1, 0, 0, 0,
                0, c, s, 0,
                0, -s, c, 0,
                0, 0, 0, 1
            ]);
            c = Math.cos(rotation.y), s = Math.sin(rotation.y);
            m.mul([
                c, 0, -s, 0,
                0, 1, 0, 0,
                s, 0, c, 0,
                0, 0, 0, 1
            ]);
            c = Math.cos(rotation.z), s = Math.sin(rotation.z);
            m.mul([
                c, s, 0, 0,
                -s, c, 0, 0,
                0, 0, 1, 0,
                0, 0, 0, 1
            ]);
            this.elm = m.elm;
            return this;
        };
        Mat3.prototype.makeScale = function (scale) {
            this.elm = [
                scale.x, 0, 0, 0,
                0, scale.y, 0, 0,
                0, 0, scale.z, 0,
                0, 0, 0, 1
            ];
            return this;
        };
        Mat3.prototype.makeTransform = function (position, rotation, scale) {
            this.identity();
            if (position) {
                this.multiply(new Mat3().makePosition(position));
            }
            if (rotation) {
                this.multiply(new Mat3().makeRotation(rotation));
            }
            if (scale) {
                this.multiply(new Mat3().makeScale(scale));
            }
            return this;
        };
        Mat3.prototype.perspective = function (fov, aspect, near, far) {
            var r = 1 / Math.tan(fov * Math.PI / 360);
            var d = far - near;
            this.elm = [
                r / aspect, 0, 0, 0,
                0, r, 0, 0,
                0, 0, -(far + near) / d, -1,
                0, 0, -(far * near * 2) / d, 0
            ];
            return this;
        };
        Mat3.prototype.lookAt = function (eye, target, up) {
            var zAxis = eye.clone().sub(target).normalize();
            var xAxis = up.clone().cross(zAxis).normalize();
            var yAxis = zAxis.clone().cross(xAxis).normalize();
            this.elm = [
                xAxis.x, yAxis.x, zAxis.x, 0,
                xAxis.y, yAxis.y, zAxis.y, 0,
                xAxis.z, yAxis.z, zAxis.z, 0,
                -eye.dot(xAxis),
                -eye.dot(yAxis),
                -eye.dot(zAxis),
                1,
            ];
            return this;
        };
        return Mat3;
    }());

    var Renderer = /** @class */ (function () {
        function Renderer(canvas) {
            this.adapter = null;
            this.device = null;
            this.context = null;
            this.pipeline = null;
            this.depthTexture = null;
            this.renderPassDescripter = null;
            this.verticesBuffer = null;
            this.indexBuffer = null;
            this.uniformBuffer = null;
            this.uniformBindGroup = null;
            this.time = 0;
            this.canvas = canvas;
            // matrix
            this.projectionMatrix = new Mat4().perspective(90, this.canvas.clientWidth / this.canvas.clientHeight, 0.1, 1000);
            this.viewMatrix = new Mat4().lookAt(new Vec3(1.0, 1.0, 2.0), new Vec3(0, 0, 0), new Vec3(0, 1, 0));
            this.geo = new CubeGeometry();
            this.init();
        }
        Renderer.prototype.init = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _a, _b, presentationFormat, size;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _a = this;
                            return [4 /*yield*/, navigator.gpu.requestAdapter()];
                        case 1:
                            _a.adapter = _c.sent();
                            if (this.adapter == null) {
                                return [2 /*return*/];
                            }
                            _b = this;
                            return [4 /*yield*/, this.adapter.requestDevice()];
                        case 2:
                            _b.device = _c.sent();
                            if (this.device == null) {
                                return [2 /*return*/];
                            }
                            this.context = this.canvas.getContext('webgpu');
                            if (this.context == null) {
                                return [2 /*return*/];
                            }
                            presentationFormat = this.context.getPreferredFormat(this.adapter);
                            size = [
                                this.canvas.clientWidth * window.devicePixelRatio,
                                this.canvas.clientHeight * window.devicePixelRatio,
                            ];
                            this.context.configure({
                                device: this.device,
                                format: presentationFormat,
                                size: size
                            });
                            // geometry
                            this.verticesBuffer = this.device.createBuffer({
                                size: this.geo.allAttributes.byteLength,
                                usage: GPUBufferUsage.VERTEX,
                                mappedAtCreation: true
                            });
                            new Float32Array(this.verticesBuffer.getMappedRange()).set(this.geo.allAttributes);
                            this.verticesBuffer.unmap();
                            this.indexBuffer = this.device.createBuffer({
                                size: this.geo.index.byteLength,
                                usage: GPUBufferUsage.INDEX,
                                mappedAtCreation: true,
                            });
                            new Uint16Array(this.indexBuffer.getMappedRange()).set(this.geo.index);
                            this.indexBuffer.unmap();
                            // renderpipeline
                            this.pipeline = this.device.createRenderPipeline({
                                vertex: {
                                    module: this.device.createShaderModule({
                                        code: sampleVert
                                    }),
                                    entryPoint: 'main',
                                    buffers: [
                                        {
                                            arrayStride: 8 * 4,
                                            attributes: [
                                                {
                                                    shaderLocation: 0,
                                                    offset: 0,
                                                    format: 'float32x3',
                                                },
                                                {
                                                    shaderLocation: 1,
                                                    offset: Float32Array.BYTES_PER_ELEMENT * 3,
                                                    format: 'float32x2',
                                                },
                                                {
                                                    shaderLocation: 2,
                                                    offset: Float32Array.BYTES_PER_ELEMENT * 5,
                                                    format: 'float32x3',
                                                }
                                            ]
                                        }
                                    ],
                                },
                                fragment: {
                                    module: this.device.createShaderModule({
                                        code: sampleFrag
                                    }),
                                    entryPoint: 'main',
                                    targets: [
                                        {
                                            format: presentationFormat
                                        }
                                    ]
                                },
                                primitive: {
                                    topology: "triangle-list",
                                    cullMode: 'none'
                                },
                                depthStencil: {
                                    depthWriteEnabled: true,
                                    depthCompare: 'less',
                                    format: 'depth24plus'
                                }
                            });
                            this.depthTexture = this.device.createTexture({
                                size: size,
                                format: 'depth24plus',
                                usage: GPUTextureUsage.RENDER_ATTACHMENT
                            });
                            // uniforms
                            this.uniformBuffer = this.device.createBuffer({
                                size: ((4 * 4) * 2 + 12 * 1) * Float32Array.BYTES_PER_ELEMENT,
                                usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST
                            });
                            this.uniformBindGroup = this.device.createBindGroup({
                                layout: this.pipeline.getBindGroupLayout(0),
                                entries: [
                                    {
                                        binding: 0,
                                        resource: {
                                            buffer: this.uniformBuffer
                                        }
                                    }
                                ]
                            });
                            this.render();
                            return [2 /*return*/];
                    }
                });
            });
        };
        Renderer.prototype.render = function () {
            this.time += 0.16;
            if (!(this.context && this.device && this.adapter)) {
                return;
            }
            // set uniforms
            if (this.uniformBuffer) {
                var modelMatrix = new Mat4().makeTransform(new Vec3(), new Vec3(this.time * 0.1, this.time * 0.2, 0));
                var mvMatrix = this.viewMatrix.clone().multiply(modelMatrix);
                var normalMatrix = new Mat3().copy(mvMatrix);
                normalMatrix.inverse().transpose();
                var e = [
                    normalMatrix.elm[0], normalMatrix.elm[3], normalMatrix.elm[6], 0,
                    normalMatrix.elm[1], normalMatrix.elm[4], normalMatrix.elm[7], 0,
                    normalMatrix.elm[2], normalMatrix.elm[5], normalMatrix.elm[8], 0,
                ];
                var uniformData = new Float32Array(new Array().concat(mvMatrix.elm, this.projectionMatrix.elm, e));
                this.device.queue.writeBuffer(this.uniformBuffer, 0, uniformData.buffer, uniformData.byteOffset, uniformData.byteLength);
            }
            var commandEncoder = this.device.createCommandEncoder();
            var textureView = this.context.getCurrentTexture().createView();
            if (!(this.pipeline && this.depthTexture))
                return;
            this.renderPassDescripter = {
                colorAttachments: [
                    {
                        view: textureView,
                        loadValue: { r: 0.0, g: 0.0, b: 0.0, a: 1.0 },
                        storeOp: 'store',
                    },
                ],
                depthStencilAttachment: {
                    view: this.depthTexture.createView(),
                    depthLoadValue: 1.0,
                    depthStoreOp: 'store',
                    stencilLoadValue: 0.0,
                    stencilStoreOp: 'store'
                }
            };
            var passEncoder = commandEncoder.beginRenderPass(this.renderPassDescripter);
            passEncoder.setPipeline(this.pipeline);
            if (this.uniformBindGroup) {
                passEncoder.setBindGroup(0, this.uniformBindGroup);
            }
            if (this.verticesBuffer && this.indexBuffer) {
                passEncoder.setVertexBuffer(0, this.verticesBuffer);
                passEncoder.setIndexBuffer(this.indexBuffer, 'uint16');
            }
            passEncoder.drawIndexed(this.geo.indexCount);
            passEncoder.endPass();
            this.device.queue.submit([commandEncoder.finish()]);
            requestAnimationFrame(this.render.bind(this));
        };
        return Renderer;
    }());

    var Vec2 = /** @class */ (function () {
        function Vec2(x, y, z) {
            this.x = x || 0;
            this.y = y || 0;
        }
        Object.defineProperty(Vec2.prototype, "isVec2", {
            get: function () {
                return true;
            },
            enumerable: false,
            configurable: true
        });
        Vec2.prototype.set = function (x, y) {
            this.x = x;
            this.y = y;
            return this;
        };
        Vec2.prototype.add = function (a) {
            if (a.isVec2) {
                this.x += a.x;
                this.y += a.y;
            }
            else if (typeof (a) == 'number') {
                this.x += a;
                this.y += a;
            }
            return this;
        };
        Vec2.prototype.sub = function (a) {
            if (a.isVec2) {
                this.x -= a.x;
                this.y -= a.y;
            }
            else if (typeof (a) == 'number') {
                this.x -= a;
                this.y -= a;
            }
            return this;
        };
        Vec2.prototype.multiply = function (a) {
            this.x *= a.x | a;
            this.y *= a.y | a;
            return this;
        };
        Vec2.prototype.divide = function (a) {
            this.x /= a.x | a;
            this.y /= a.y | a;
            return this;
        };
        Vec2.prototype.copy = function (a) {
            this.x = a.x;
            this.y = a.y;
            return this;
        };
        Vec2.prototype.clone = function () {
            return new Vec2(this.x, this.y);
        };
        return Vec2;
    }());

    exports.Mat4 = Mat4;
    exports.Renderer = Renderer;
    exports.Vec2 = Vec2;
    exports.Vec3 = Vec3;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
