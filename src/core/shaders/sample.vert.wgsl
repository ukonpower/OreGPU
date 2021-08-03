[[block]] struct Uniforms {
  mvMatrix : mat4x4<f32>;
  projectionMatrix : mat4x4<f32>;
};
[[binding(0), group(0)]] var<uniform> uniforms : Uniforms;

struct VertexOutput {
  [[builtin(position)]] Position : vec4<f32>;
  [[location(0)]] col : vec3<f32>;
};

[[stage(vertex)]]
fn main([[location(0)]] position : vec3<f32> ) -> VertexOutput {

	var output: VertexOutput;

	var mvPosition: vec4<f32> = uniforms.mvMatrix * vec4<f32>( position, 1.0 );
	output.Position = uniforms.projectionMatrix * mvPosition;
	output.col = position + vec3<f32>( 0.0, 0.0, 1.0 );

	return output;
}
