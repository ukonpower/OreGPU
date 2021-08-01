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

    var sampleVert = "\r\nstruct VertexOutput {\r\n  [[builtin(position)]] Position : vec4<f32>;\r\n  [[location(0)]] col : vec3<f32>;\r\n};\r\n\r\n[[stage(vertex)]]\r\nfn main([[builtin(vertex_index)]] VertexIndex : u32) -> VertexOutput {\r\n\tvar pos = array<vec2<f32>, 3>(\r\n\tvec2<f32>(0.0, 0.5),\r\n\tvec2<f32>(-0.5, -0.5),\r\n\tvec2<f32>(0.5, -0.5));\r\n\r\n\tvar col = array<vec3<f32>, 3>(\r\n\t\tvec3<f32>(1.0, 0.0, 0.0),\r\n\t\tvec3<f32>(0.0, 1.0, 0.0),\r\n\t\tvec3<f32>(0.0, 0.0, 1.0)\r\n\t);\r\n\r\n\tvar output: VertexOutput;\r\n\toutput.Position = vec4<f32>( pos[VertexIndex], 0.0, 1.0 );\r\n\toutput.col = col[VertexIndex];\r\n\r\n\treturn output;\r\n}\r\n";

    var sampleFrag = "[[stage(fragment)]]\r\nfn main([[location(0)]] col: vec3<f32>) -> [[location(0)]] vec4<f32> {\r\n\treturn vec4<f32>(col, 1.0);\r\n}";

    var Renderer = /** @class */ (function () {
        function Renderer(canvas) {
            this.adapter = null;
            this.device = null;
            this.context = null;
            this.pipeline = null;
            this.canvas = canvas;
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
                            this.pipeline = this.device.createRenderPipeline({
                                vertex: {
                                    module: this.device.createShaderModule({
                                        code: sampleVert
                                    }),
                                    entryPoint: 'main'
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
                                    topology: "triangle-list"
                                }
                            });
                            this.render();
                            return [2 /*return*/];
                    }
                });
            });
        };
        Renderer.prototype.render = function () {
            if (!(this.context && this.device && this.adapter)) {
                return;
            }
            var commandEncoder = this.device.createCommandEncoder();
            var textureView = this.context.getCurrentTexture().createView();
            var renderPassDescripter = {
                colorAttachments: [
                    {
                        view: textureView,
                        loadValue: { r: 0.0, g: 0.0, b: 0.0, a: 1.0 },
                        storeOp: 'store',
                    },
                ]
            };
            var passEncoder = commandEncoder.beginRenderPass(renderPassDescripter);
            if (this.pipeline) {
                passEncoder.setPipeline(this.pipeline);
                passEncoder.draw(3, 1, 0, 0);
                passEncoder.endPass();
                this.device.queue.submit([commandEncoder.finish()]);
            }
            requestAnimationFrame(this.render.bind(this));
        };
        return Renderer;
    }());

    exports.Renderer = Renderer;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
