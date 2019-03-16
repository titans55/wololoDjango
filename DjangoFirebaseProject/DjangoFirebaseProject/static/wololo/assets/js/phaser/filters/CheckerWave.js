/**
* Original shader from http://glsl.heroku.com/e#12260.0
* Tweaked, uniforms added and converted to Phaser/PIXI by Richard Davey
*/
Phaser.Filter.CheckerWave = function (game) ***REMOVED***

    Phaser.Filter.call(this, game);

    this.uniforms.alpha = ***REMOVED*** type: '1f', value: 1.0 ***REMOVED***;
    this.uniforms.vrp = ***REMOVED*** type: '3f', value: ***REMOVED*** x: 0.0, y: -5.0, z: 0.0 ***REMOVED******REMOVED***;
    this.uniforms.color1 = ***REMOVED*** type: '3f', value: ***REMOVED*** x: 0, y: 1, z: 1 ***REMOVED******REMOVED***;
    this.uniforms.color2 = ***REMOVED*** type: '3f', value: ***REMOVED*** x: 1, y: 1, z: 1 ***REMOVED******REMOVED***;

    this.fragmentSrc = [

        "precision mediump float;",
        "uniform vec2      resolution;",
        "uniform float     time;",
        "uniform float     alpha;",
        "uniform vec3      vrp;",
        "uniform vec3      color1;",
        "uniform vec3      color2;",

        "// Scene Start",

        "// Floor",
        "vec2 obj0(in vec3 p) ***REMOVED***",
            "// obj deformation",
            "p.y=p.y+sin(sqrt(p.x*p.x+p.z*p.z)-time*4.0)*0.5;",
            "//plane",
            "return vec2(p.y+3.0,0);",
        "***REMOVED***",

        "// Floor Color (checkerboard)",
        "vec3 obj0_c(in vec3 p) ***REMOVED***",
            "if (fract(p.x*.5)>.5)",
                "if (fract(p.z*.5)>.5)",
                    "return color1;",
                "else",
                    "return color2;",
            "else",
                "if (fract(p.z*.5)>.5)",
                    "return color2;",
                "else",
                    "return color1;",
        "***REMOVED***",

        "// Scene End",

        "void main(void) ***REMOVED***",
            "vec2 vPos=-1.0+2.0*gl_FragCoord.xy/resolution.xy;",

            "// Camera animation",
            "vec3 vuv=vec3(0,2,sin(time*0.1));//Change camere up vector here",
            "vec3 prp=vec3(-sin(time*0.6)*8.0,0,cos(time*0.4)*8.0); //Change camera path position here",

            "// Camera setup",
            "vec3 vpn=normalize(vrp-prp);",
            "vec3 u=normalize(cross(vuv,vpn));",
            "vec3 v=cross(vpn,u);",
            "vec3 vcv=(prp+vpn);",
            "vec3 scrCoord=vcv+vPos.x*u*resolution.x/resolution.y+vPos.y*v;",
            "vec3 scp=normalize(scrCoord-prp);",

            "// Raymarching",
            "const vec3 e=vec3(0.1,0,0);",
            "const float maxd=80.0; //Max depth",

            "vec2 s=vec2(0.1,0.0);",
            "vec3 c,p,n;",

            "float f=1.0;",

            "for (int i=0;i<156;i++) ***REMOVED***",
                "if (abs(s.x)<.01||f>maxd) break;",
                "f+=s.x;",
                "p=prp+scp*f;",
                "s=obj0(p);",
            "***REMOVED***",

            "if (f<maxd) ***REMOVED***",
                "if (s.y==0.0)",
                "c=obj0_c(p);",
                "n=normalize(",
                    "vec3(s.x-obj0(p-e.xyy).x,",
                    "s.x-obj0(p-e.yxy).x,",
                    "s.x-obj0(p-e.yyx).x));",
                "float b=dot(n,normalize(prp-p));",
                "vec4 color = vec4(( b * c + pow(b, 8.0)) * (1.0 - f *  .02), 1.0); //simple phong LightPosition=CameraPosition",
                "color.a = alpha;",
                "gl_FragColor=color;",
            "***REMOVED***",
            "else gl_FragColor=vec4(0,0,0.1,alpha); //background color",
        "***REMOVED***"

    ];

***REMOVED***;

Phaser.Filter.CheckerWave.prototype = Object.create(Phaser.Filter.prototype);
Phaser.Filter.CheckerWave.prototype.constructor = Phaser.Filter.CheckerWave;

Phaser.Filter.CheckerWave.prototype.init = function (width, height) ***REMOVED***

    this.setResolution(width, height);

***REMOVED***;

Phaser.Filter.CheckerWave.prototype.setColor1 = function (red, green, blue) ***REMOVED***

    this.uniforms.color1.value.x = red;
    this.uniforms.color1.value.y = green;
    this.uniforms.color1.value.z = blue;

***REMOVED***;

Phaser.Filter.CheckerWave.prototype.setColor2 = function (red, green, blue) ***REMOVED***

    this.uniforms.color2.value.x = red;
    this.uniforms.color2.value.y = green;
    this.uniforms.color2.value.z = blue;

***REMOVED***;

Object.defineProperty(Phaser.Filter.CheckerWave.prototype, 'alpha', ***REMOVED***

    get: function() ***REMOVED***
        return this.uniforms.alpha.value;
    ***REMOVED***,

    set: function(value) ***REMOVED***
        this.uniforms.alpha.value = value;
    ***REMOVED***

***REMOVED***);

Object.defineProperty(Phaser.Filter.CheckerWave.prototype, 'cameraX', ***REMOVED***

    get: function() ***REMOVED***
        return this.uniforms.vrp.value.x;
    ***REMOVED***,

    set: function(value) ***REMOVED***
        this.uniforms.vrp.value.x = value;
    ***REMOVED***

***REMOVED***);

Object.defineProperty(Phaser.Filter.CheckerWave.prototype, 'cameraY', ***REMOVED***

    get: function() ***REMOVED***
        return this.uniforms.vrp.value.y;
    ***REMOVED***,

    set: function(value) ***REMOVED***
        this.uniforms.vrp.value.y = value;
    ***REMOVED***

***REMOVED***);

Object.defineProperty(Phaser.Filter.CheckerWave.prototype, 'cameraZ', ***REMOVED***

    get: function() ***REMOVED***
        return this.uniforms.vrp.value.z;
    ***REMOVED***,

    set: function(value) ***REMOVED***
        this.uniforms.vrp.value.z = value;
    ***REMOVED***

***REMOVED***);
