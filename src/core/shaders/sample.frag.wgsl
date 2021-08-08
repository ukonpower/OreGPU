[[stage(fragment)]]
fn main([[location(0)]] col: vec3<f32>, [[location(1)]] normal: vec3<f32>) -> [[location(0)]] vec4<f32> {

	var s: f32 = dot( normalize(normal), normalize( vec3<f32>( 1.0, 1.0, 11.0  ) ) );
	var c: vec3<f32> = vec3<f32>( max( 0.0, s ) + 0.0);
	return vec4<f32>(c, 1.0);
}