uniform sampler2D colorTexture;

varying vec2 vUv;

void main()
{
    // float edgeDistance = vUv.x;
    float edgeDistance = min(min(min(vUv.x, 1.0 - vUv.x), vUv.y), 1.0 - vUv.y);
    float edgeAlpha = edgeDistance * 4.0;

    float centerDistance = length(vUv - 0.5);
    float centerAlpha = (1.0 - centerDistance * 1.85);

    float alpha = min(centerAlpha, edgeAlpha);
    // float alpha = centerAlpha;
    
    alpha = smoothstep(0.0, 1.0, alpha);

    vec4 color = texture2D(colorTexture, vUv);
    gl_FragColor = vec4(color.rgb, alpha);
    gl_FragColor = linearToOutputTexel( gl_FragColor );
}