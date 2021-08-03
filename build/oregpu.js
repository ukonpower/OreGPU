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

    var sampleVert = "[[block]] struct Uniforms {\r\n  mvMatrix : mat4x4<f32>;\r\n  projectionMatrix : mat4x4<f32>;\r\n};\r\n[[binding(0), group(0)]] var<uniform> uniforms : Uniforms;\r\n\r\nstruct VertexOutput {\r\n  [[builtin(position)]] Position : vec4<f32>;\r\n  [[location(0)]] col : vec3<f32>;\r\n};\r\n\r\n[[stage(vertex)]]\r\nfn main([[location(0)]] position : vec3<f32> ) -> VertexOutput {\r\n\r\n\tvar output: VertexOutput;\r\n\r\n\tvar mvPosition: vec4<f32> = uniforms.mvMatrix * vec4<f32>( position, 1.0 );\r\n\toutput.Position = uniforms.projectionMatrix * mvPosition;\r\n\toutput.col = position + vec3<f32>( 0.0, 0.0, 1.0 );\r\n\r\n\treturn output;\r\n}\r\n";

    var sampleFrag = "[[stage(fragment)]]\r\nfn main([[location(0)]] col: vec3<f32>) -> [[location(0)]] vec4<f32> {\r\n\treturn vec4<f32>(col, 1.0);\r\n}";

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
            if (position) {
                this.multiply(new Mat4().makePosition(position));
            }
            if (rotation) {
                this.multiply(new Mat4().makeRotation(rotation));
            }
            if (scale) {
                this.multiply(new Mat4().makeScale(scale));
            }
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

    var Renderer = /** @class */ (function () {
        function Renderer(canvas) {
            this.adapter = null;
            this.device = null;
            this.context = null;
            this.pipeline = null;
            this.renderPassDescripter = null;
            this.verticesBuffer = null;
            this.uniformBuffer = null;
            this.uniformBindGroup = null;
            this.time = 0;
            this.canvas = canvas;
            // matrix
            this.projectionMatrix = new Mat4().perspective(50, this.canvas.clientWidth / this.canvas.clientHeight, 0.1, 1000);
            this.viewMatrix = new Mat4().makeTransform(new Vec3(0.0, 0.0, -5.0));
            this.init();
        }
        Renderer.prototype.init = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _a, _b, presentationFormat, size, cubeArray;
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
                            cubeArray = new Float32Array([
                                -1, 1, 0, 1,
                                1, 1, 0, 1,
                                1, -1, 0, 1,
                                1, -1, 0, 1,
                                -1, -1, 0, 1,
                                -1, 1, 0, 1,
                            ]);
                            this.verticesBuffer = this.device.createBuffer({
                                size: cubeArray.byteLength,
                                usage: GPUBufferUsage.VERTEX,
                                mappedAtCreation: true
                            });
                            new Float32Array(this.verticesBuffer.getMappedRange()).set(cubeArray);
                            this.verticesBuffer.unmap();
                            // renderpipeline
                            this.pipeline = this.device.createRenderPipeline({
                                vertex: {
                                    module: this.device.createShaderModule({
                                        code: sampleVert
                                    }),
                                    entryPoint: 'main',
                                    buffers: [
                                        {
                                            arrayStride: 4 * 4,
                                            attributes: [{
                                                    shaderLocation: 0,
                                                    offset: 0,
                                                    format: 'float32x4',
                                                }]
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
                            });
                            // uniforms
                            this.uniformBuffer = this.device.createBuffer({
                                size: 4 * 16 * 2,
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
                var modelMatrix = new Mat4().makeRotation(new Vec3(0.0, this.time * 0.1, 0.0));
                var mvMatrix = this.viewMatrix.clone().multiply(modelMatrix);
                var uniformData = new Float32Array(new Array().concat(mvMatrix.elm, this.projectionMatrix.elm));
                this.device.queue.writeBuffer(this.uniformBuffer, 0, uniformData.buffer, uniformData.byteOffset, uniformData.byteLength);
            }
            var commandEncoder = this.device.createCommandEncoder();
            var textureView = this.context.getCurrentTexture().createView();
            this.renderPassDescripter = {
                colorAttachments: [
                    {
                        view: textureView,
                        loadValue: { r: 0.0, g: 0.0, b: 0.0, a: 1.0 },
                        storeOp: 'store',
                    },
                ]
            };
            var passEncoder = commandEncoder.beginRenderPass(this.renderPassDescripter);
            if (this.pipeline) {
                passEncoder.setPipeline(this.pipeline);
                if (this.uniformBindGroup) {
                    passEncoder.setBindGroup(0, this.uniformBindGroup);
                }
                if (this.verticesBuffer) {
                    passEncoder.setVertexBuffer(0, this.verticesBuffer);
                }
                passEncoder.draw(6, 1, 0, 0);
                passEncoder.endPass();
                this.device.queue.submit([commandEncoder.finish()]);
            }
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
