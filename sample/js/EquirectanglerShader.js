//https://github.com/spite/THREE.CubemapToEquirectangular

THREE.EquirectanglarShader = {

	uniforms: {
		"map": { type: "t", value: null }
	},

	vertexShader: [
				"varying vec2 vUv;",
				"void main()  {",
					"vUv = vec2( 1.- uv.x, uv.y );",
					"gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",
				"}"
	].join("\n"),

	fragmentShader: [

				"uniform samplerCube map;",
				"varying vec2 vUv;",
				"#define M_PI 3.1415926535897932384626433832795",
				"void main()  {",
					"vec2 uv = vUv;",
					"float longitude = uv.x * 2. * M_PI - M_PI + M_PI / 2.;",
					"float latitude = uv.y * M_PI;",
					"vec3 dir = vec3(",
						"- sin( longitude ) * sin( latitude ),",
						"cos( latitude ),",
						"- cos( longitude ) * sin( latitude )",
					");",
					"normalize( dir );",
					"gl_FragColor = vec4( textureCube( map, dir ).rgb, 1. );",
				"}"

	].join("\n")

};
