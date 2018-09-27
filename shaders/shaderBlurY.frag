#version 120

uniform sampler2DRect tex0;

uniform float blurAmnt;
uniform bool atenuateLastPass;

vec2 texCoordVarying;

void main()
{

	texCoordVarying = gl_FragCoord.xy;
	
    vec4 color = vec4( vec3(0.0), 1.0);
	
	color += 1.0 * texture2DRect(tex0, texCoordVarying + vec2(0.0, blurAmnt * 4.0));
	color += 2.0 * texture2DRect(tex0, texCoordVarying + vec2(0.0, blurAmnt * 3.0));
	color += 3.0 * texture2DRect(tex0, texCoordVarying + vec2(0.0, blurAmnt * 2.0));
	color += 4.0 * texture2DRect(tex0, texCoordVarying + vec2(0.0, blurAmnt * 1.0));
    
	color += 5.0 * texture2DRect(tex0, texCoordVarying + vec2(0.0, blurAmnt));
	
	color += 4.0 * texture2DRect(tex0, texCoordVarying + vec2(0.0, blurAmnt * -1.0));
	color += 3.0 * texture2DRect(tex0, texCoordVarying + vec2(0.0, blurAmnt * -2.0));
	color += 2.0 * texture2DRect(tex0, texCoordVarying + vec2(0.0, blurAmnt * -3.0));
	color += 1.0 * texture2DRect(tex0, texCoordVarying + vec2(0.0, blurAmnt * -4.0));

    color /= 25.0;
    if(atenuateLastPass){
        color.rgb *=.99;
    }
    
    gl_FragColor = color;
}
