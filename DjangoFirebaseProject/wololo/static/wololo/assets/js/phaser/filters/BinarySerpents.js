/**
* Original shader by Trisomie21 (https://www.shadertoy.com/view/MslGRH)
* Tweaked, uniforms added and converted to Phaser/PIXI by Richard Davey
*/
Phaser.Filter.BinarySerpents = function (game) ***REMOVED***

    Phaser.Filter.call(this, game);

    this.uniforms.march = ***REMOVED*** type: '1i', value: 100 ***REMOVED***;
    this.uniforms.maxDistance = ***REMOVED*** type: '1f', value: 5.0 ***REMOVED***;
    this.uniforms.fog = ***REMOVED*** type: '1f', value: 5.0 ***REMOVED***;

    this.fragmentSrc = [

        "precision mediump float;",
        "uniform vec3      resolution;",
        "uniform float     time;",
        "uniform int       march;",
        "uniform float     maxDistance;",
        "uniform float     fog;",

        "// With tweaks by PauloFalcao and Richard Davey",

        "float Texture3D(vec3 n, float res) ***REMOVED***",
            "n = floor(n*res+.5);",
            "return fract(sin((n.x+n.y*1e5+n.z*1e7)*1e-4)*1e5);",
        "***REMOVED***",

        "float map( vec3 p ) ***REMOVED***",
            "p.x+=sin(p.z*4.0+time*4.0)*0.1*cos(time*0.1);",
            "p = mod(p,vec3(1.0, 1.0, 1.0))-0.5;",
            "return length(p.xy)-.1;",
        "***REMOVED***",

        "void main( void )",
        "***REMOVED***",
            "vec2 pos = (gl_FragCoord.xy*2.0 - resolution.xy) / resolution.y;",
            "vec3 camPos = vec3(cos(time*0.3), sin(time*0.3), 1.5);",
            "vec3 camTarget = vec3(0.0, 0.0, 0.0);",

            "vec3 camDir = normalize(camTarget-camPos);",
            "vec3 camUp  = normalize(vec3(0.0, 1.0, 0.0));",
            "vec3 camSide = cross(camDir, camUp);",
            "float focus = 2.0;",

            "vec3 rayDir = normalize(camSide*pos.x + camUp*pos.y + camDir*focus);",
            "vec3 ray = camPos;",
            "float d = 0.0, total_d = 0.0;",
            "const int MAX_MARCH = 100;",
            "float c = 1.0;",

            "for (int i=0; i < MAX_MARCH; ++i) ***REMOVED***",
                "if (i < march) ***REMOVED***",
                    "d = map(ray);",
                    "total_d += d;",
                    "ray += rayDir * d;",
                    "if(abs(d)<0.001) ***REMOVED*** break; ***REMOVED***",
                    "if(total_d>maxDistance) ***REMOVED*** c = 0.; total_d=maxDistance; break; ***REMOVED***",
                "***REMOVED***",
            "***REMOVED***",

            "vec4 result = vec4( vec3(c*.4 , c*.6, c) * (fog - total_d) / fog, 1.0 );",

            "ray.z -= 5.+time*.5;",
            "float r = Texture3D(ray, 33.);",
            "gl_FragColor = result * (step(r, .3) + r * .2 + .1);",
        "***REMOVED***"
    ];

***REMOVED***;

Phaser.Filter.BinarySerpents.prototype = Object.create(Phaser.Filter.prototype);
Phaser.Filter.BinarySerpents.prototype.constructor = Phaser.Filter.BinarySerpents;

Phaser.Filter.BinarySerpents.prototype.init = function (width, height, march, maxDistance) ***REMOVED***

    if (typeof march === 'undefined') ***REMOVED*** march = 100; ***REMOVED***
    if (typeof maxDistance === 'undefined') ***REMOVED*** maxDistance = 5.0; ***REMOVED***

    this.setResolution(width, height);
    this.uniforms.march.value = march;
    this.uniforms.maxDistance.value = maxDistance;

***REMOVED***;

Object.defineProperty(Phaser.Filter.BinarySerpents.prototype, 'fog', ***REMOVED***

    get: function() ***REMOVED***
        return this.uniforms.fog.value;
    ***REMOVED***,

    set: function(value) ***REMOVED***
        this.uniforms.fog.value = value;
    ***REMOVED***

***REMOVED***);
