
struct VertexOutput {
  [[builtin(position)]] Position : vec4<f32>;
  [[location(0)]] col : vec3<f32>;
};

[[stage(vertex)]]
fn main([[location(0)]] position : vec3<f32> ) -> VertexOutput {

	var output: VertexOutput;
	output.Position = vec4<f32>( position * 0.5, 1.0 );
	output.col = position + vec3<f32>( 0.0, 0.0, 1.0 );

	return output;
}
