[[stage(fragment)]]
fn main([[location(0)]] col: vec3<f32>, [[location(1)]] normal: vec3<f32>) -> [[location(0)]] vec4<f32> {

	var s: f32 = dot( normalize(normal), vec3<f32>( 1.0, 1.0, 1.0 ) );
	var c: vec3<f32> = vec3<f32>( max( 0.0,s ) + 0.4);
	return vec4<f32>((normal * 0.5 + 0.5), 1.0);
}