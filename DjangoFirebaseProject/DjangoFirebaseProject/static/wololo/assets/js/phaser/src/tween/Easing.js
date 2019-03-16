/* jshint curly: false */

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      ***REMOVED***@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License***REMOVED***
*/

/**
* A collection of easing methods defining ease-in and ease-out curves.
*
* @class Phaser.Easing
*/
Phaser.Easing = ***REMOVED***

    /**
    * Linear easing.
    *
    * @class Phaser.Easing.Linear
    */
    Linear: ***REMOVED***

        /**
        * Linear Easing (no variation).
        *
        * @method Phaser.Easing.Linear#None
        * @param ***REMOVED***number***REMOVED*** k - The value to be tweened.
        * @returns ***REMOVED***number***REMOVED*** k.
        */
        None: function ( k ) ***REMOVED***

            return k;

        ***REMOVED***

    ***REMOVED***,

    /**
    * Quadratic easing.
    *
    * @class Phaser.Easing.Quadratic
    */
    Quadratic: ***REMOVED***

        /**
        * Ease-in.
        *
        * @method Phaser.Easing.Quadratic#In
        * @param ***REMOVED***number***REMOVED*** k - The value to be tweened.
        * @returns ***REMOVED***number***REMOVED*** k^2.
        */
        In: function ( k ) ***REMOVED***

            return k * k;

        ***REMOVED***,

        /**
        * Ease-out.
        *
        * @method Phaser.Easing.Quadratic#Out
        * @param ***REMOVED***number***REMOVED*** k - The value to be tweened.
        * @returns ***REMOVED***number***REMOVED*** k* (2-k).
        */
        Out: function ( k ) ***REMOVED***

            return k * ( 2 - k );

        ***REMOVED***,

        /**
        * Ease-in/out.
        *
        * @method Phaser.Easing.Quadratic#InOut
        * @param ***REMOVED***number***REMOVED*** k - The value to be tweened.
        * @returns ***REMOVED***number***REMOVED*** The tweened value.
        */
        InOut: function ( k ) ***REMOVED***

            if ( ( k *= 2 ) < 1 ) return 0.5 * k * k;
            return - 0.5 * ( --k * ( k - 2 ) - 1 );

        ***REMOVED***

    ***REMOVED***,

    /**
    * Cubic easing.
    *
    * @class Phaser.Easing.Cubic
    */
    Cubic: ***REMOVED***

        /**
        * Cubic ease-in.
        *
        * @method Phaser.Easing.Cubic#In
        * @param ***REMOVED***number***REMOVED*** k - The value to be tweened.
        * @returns ***REMOVED***number***REMOVED*** The tweened value.
        */
        In: function ( k ) ***REMOVED***

            return k * k * k;

        ***REMOVED***,

        /**
        * Cubic ease-out.
        *
        * @method Phaser.Easing.Cubic#Out
        * @param ***REMOVED***number***REMOVED*** k - The value to be tweened.
        * @returns ***REMOVED***number***REMOVED*** The tweened value.
        */
        Out: function ( k ) ***REMOVED***

            return --k * k * k + 1;

        ***REMOVED***,

        /**
        * Cubic ease-in/out.
        *
        * @method Phaser.Easing.Cubic#InOut
        * @param ***REMOVED***number***REMOVED*** k - The value to be tweened.
        * @returns ***REMOVED***number***REMOVED*** The tweened value.
        */
        InOut: function ( k ) ***REMOVED***

            if ( ( k *= 2 ) < 1 ) return 0.5 * k * k * k;
            return 0.5 * ( ( k -= 2 ) * k * k + 2 );

        ***REMOVED***

    ***REMOVED***,

    /**
    * Quartic easing.
    *
    * @class Phaser.Easing.Quartic
    */
    Quartic: ***REMOVED***

        /**
        * Quartic ease-in.
        *
        * @method Phaser.Easing.Quartic#In
        * @param ***REMOVED***number***REMOVED*** k - The value to be tweened.
        * @returns ***REMOVED***number***REMOVED*** The tweened value.
        */
        In: function ( k ) ***REMOVED***

            return k * k * k * k;

        ***REMOVED***,

        /**
        * Quartic ease-out.
        *
        * @method Phaser.Easing.Quartic#Out
        * @param ***REMOVED***number***REMOVED*** k - The value to be tweened.
        * @returns ***REMOVED***number***REMOVED*** The tweened value.
        */
        Out: function ( k ) ***REMOVED***

            return 1 - ( --k * k * k * k );

        ***REMOVED***,

        /**
        * Quartic ease-in/out.
        *
        * @method Phaser.Easing.Quartic#InOut
        * @param ***REMOVED***number***REMOVED*** k - The value to be tweened.
        * @returns ***REMOVED***number***REMOVED*** The tweened value.
        */
        InOut: function ( k ) ***REMOVED***

            if ( ( k *= 2 ) < 1) return 0.5 * k * k * k * k;
            return - 0.5 * ( ( k -= 2 ) * k * k * k - 2 );

        ***REMOVED***

    ***REMOVED***,

    /**
    * Quintic easing.
    *
    * @class Phaser.Easing.Quintic
    */
    Quintic: ***REMOVED***

        /**
        * Quintic ease-in.
        *
        * @method Phaser.Easing.Quintic#In
        * @param ***REMOVED***number***REMOVED*** k - The value to be tweened.
        * @returns ***REMOVED***number***REMOVED*** The tweened value.
        */
        In: function ( k ) ***REMOVED***

            return k * k * k * k * k;

        ***REMOVED***,

        /**
        * Quintic ease-out.
        *
        * @method Phaser.Easing.Quintic#Out
        * @param ***REMOVED***number***REMOVED*** k - The value to be tweened.
        * @returns ***REMOVED***number***REMOVED*** The tweened value.
        */
        Out: function ( k ) ***REMOVED***

            return --k * k * k * k * k + 1;

        ***REMOVED***,

        /**
        * Quintic ease-in/out.
        *
        * @method Phaser.Easing.Quintic#InOut
        * @param ***REMOVED***number***REMOVED*** k - The value to be tweened.
        * @returns ***REMOVED***number***REMOVED*** The tweened value.
        */
        InOut: function ( k ) ***REMOVED***

            if ( ( k *= 2 ) < 1 ) return 0.5 * k * k * k * k * k;
            return 0.5 * ( ( k -= 2 ) * k * k * k * k + 2 );

        ***REMOVED***

    ***REMOVED***,

    /**
    * Sinusoidal easing.
    *
    * @class Phaser.Easing.Sinusoidal
    */
    Sinusoidal: ***REMOVED***

        /**
        * Sinusoidal ease-in.
        *
        * @method Phaser.Easing.Sinusoidal#In
        * @param ***REMOVED***number***REMOVED*** k - The value to be tweened.
        * @returns ***REMOVED***number***REMOVED*** The tweened value.
        */
        In: function ( k ) ***REMOVED***

            if (k === 0) return 0;
            if (k === 1) return 1;
            return 1 - Math.cos( k * Math.PI / 2 );

        ***REMOVED***,

        /**
        * Sinusoidal ease-out.
        *
        * @method Phaser.Easing.Sinusoidal#Out
        * @param ***REMOVED***number***REMOVED*** k - The value to be tweened.
        * @returns ***REMOVED***number***REMOVED*** The tweened value.
        */
        Out: function ( k ) ***REMOVED***

            if (k === 0) return 0;
            if (k === 1) return 1;
            return Math.sin( k * Math.PI / 2 );

        ***REMOVED***,

        /**
        * Sinusoidal ease-in/out.
        *
        * @method Phaser.Easing.Sinusoidal#InOut
        * @param ***REMOVED***number***REMOVED*** k - The value to be tweened.
        * @returns ***REMOVED***number***REMOVED*** The tweened value.
        */
        InOut: function ( k ) ***REMOVED***

            if (k === 0) return 0;
            if (k === 1) return 1;
            return 0.5 * ( 1 - Math.cos( Math.PI * k ) );

        ***REMOVED***

    ***REMOVED***,

    /**
    * Exponential easing.
    *
    * @class Phaser.Easing.Exponential
    */
    Exponential: ***REMOVED***

        /**
        * Exponential ease-in.
        *
        * @method Phaser.Easing.Exponential#In
        * @param ***REMOVED***number***REMOVED*** k - The value to be tweened.
        * @returns ***REMOVED***number***REMOVED*** The tweened value.
        */
        In: function ( k ) ***REMOVED***

            return k === 0 ? 0 : Math.pow( 1024, k - 1 );

        ***REMOVED***,

        /**
        * Exponential ease-out.
        *
        * @method Phaser.Easing.Exponential#Out
        * @param ***REMOVED***number***REMOVED*** k - The value to be tweened.
        * @returns ***REMOVED***number***REMOVED*** The tweened value.
        */
        Out: function ( k ) ***REMOVED***

            return k === 1 ? 1 : 1 - Math.pow( 2, - 10 * k );

        ***REMOVED***,

        /**
        * Exponential ease-in/out.
        *
        * @method Phaser.Easing.Exponential#InOut
        * @param ***REMOVED***number***REMOVED*** k - The value to be tweened.
        * @returns ***REMOVED***number***REMOVED*** The tweened value.
        */
        InOut: function ( k ) ***REMOVED***

            if ( k === 0 ) return 0;
            if ( k === 1 ) return 1;
            if ( ( k *= 2 ) < 1 ) return 0.5 * Math.pow( 1024, k - 1 );
            return 0.5 * ( - Math.pow( 2, - 10 * ( k - 1 ) ) + 2 );

        ***REMOVED***

    ***REMOVED***,

    /**
    * Circular easing.
    *
    * @class Phaser.Easing.Circular
    */
    Circular: ***REMOVED***

        /**
        * Circular ease-in.
        *
        * @method Phaser.Easing.Circular#In
        * @param ***REMOVED***number***REMOVED*** k - The value to be tweened.
        * @returns ***REMOVED***number***REMOVED*** The tweened value.
        */
        In: function ( k ) ***REMOVED***

            return 1 - Math.sqrt( 1 - k * k );

        ***REMOVED***,

        /**
        * Circular ease-out.
        *
        * @method Phaser.Easing.Circular#Out
        * @param ***REMOVED***number***REMOVED*** k - The value to be tweened.
        * @returns ***REMOVED***number***REMOVED*** The tweened value.
        */
        Out: function ( k ) ***REMOVED***

            return Math.sqrt( 1 - ( --k * k ) );

        ***REMOVED***,

        /**
        * Circular ease-in/out.
        *
        * @method Phaser.Easing.Circular#InOut
        * @param ***REMOVED***number***REMOVED*** k - The value to be tweened.
        * @returns ***REMOVED***number***REMOVED*** The tweened value.
        */
        InOut: function ( k ) ***REMOVED***

            if ( ( k *= 2 ) < 1) return - 0.5 * ( Math.sqrt( 1 - k * k) - 1);
            return 0.5 * ( Math.sqrt( 1 - ( k -= 2) * k) + 1);

        ***REMOVED***

    ***REMOVED***,

    /**
    * Elastic easing.
    *
    * @class Phaser.Easing.Elastic
    */
    Elastic: ***REMOVED***

        /**
        * Elastic ease-in.
        *
        * @method Phaser.Easing.Elastic#In
        * @param ***REMOVED***number***REMOVED*** k - The value to be tweened.
        * @returns ***REMOVED***number***REMOVED*** The tweened value.
        */
        In: function ( k ) ***REMOVED***

            var s, a = 0.1, p = 0.4;
            if ( k === 0 ) return 0;
            if ( k === 1 ) return 1;
            if ( !a || a < 1 ) ***REMOVED*** a = 1; s = p / 4; ***REMOVED***
            else s = p * Math.asin( 1 / a ) / ( 2 * Math.PI );
            return - ( a * Math.pow( 2, 10 * ( k -= 1 ) ) * Math.sin( ( k - s ) * ( 2 * Math.PI ) / p ) );

        ***REMOVED***,

        /**
        * Elastic ease-out.
        *
        * @method Phaser.Easing.Elastic#Out
        * @param ***REMOVED***number***REMOVED*** k - The value to be tweened.
        * @returns ***REMOVED***number***REMOVED*** The tweened value.
        */
        Out: function ( k ) ***REMOVED***

            var s, a = 0.1, p = 0.4;
            if ( k === 0 ) return 0;
            if ( k === 1 ) return 1;
            if ( !a || a < 1 ) ***REMOVED*** a = 1; s = p / 4; ***REMOVED***
            else s = p * Math.asin( 1 / a ) / ( 2 * Math.PI );
            return ( a * Math.pow( 2, - 10 * k) * Math.sin( ( k - s ) * ( 2 * Math.PI ) / p ) + 1 );

        ***REMOVED***,

        /**
        * Elastic ease-in/out.
        *
        * @method Phaser.Easing.Elastic#InOut
        * @param ***REMOVED***number***REMOVED*** k - The value to be tweened.
        * @returns ***REMOVED***number***REMOVED*** The tweened value.
        */
        InOut: function ( k ) ***REMOVED***

            var s, a = 0.1, p = 0.4;
            if ( k === 0 ) return 0;
            if ( k === 1 ) return 1;
            if ( !a || a < 1 ) ***REMOVED*** a = 1; s = p / 4; ***REMOVED***
            else s = p * Math.asin( 1 / a ) / ( 2 * Math.PI );
            if ( ( k *= 2 ) < 1 ) return - 0.5 * ( a * Math.pow( 2, 10 * ( k -= 1 ) ) * Math.sin( ( k - s ) * ( 2 * Math.PI ) / p ) );
            return a * Math.pow( 2, -10 * ( k -= 1 ) ) * Math.sin( ( k - s ) * ( 2 * Math.PI ) / p ) * 0.5 + 1;

        ***REMOVED***

    ***REMOVED***,

    /**
    * Back easing.
    *
    * @class Phaser.Easing.Back
    */
    Back: ***REMOVED***

        /**
        * Back ease-in.
        *
        * @method Phaser.Easing.Back#In
        * @param ***REMOVED***number***REMOVED*** k - The value to be tweened.
        * @returns ***REMOVED***number***REMOVED*** The tweened value.
        */
        In: function ( k ) ***REMOVED***

            var s = 1.70158;
            return k * k * ( ( s + 1 ) * k - s );

        ***REMOVED***,

        /**
        * Back ease-out.
        *
        * @method Phaser.Easing.Back#Out
        * @param ***REMOVED***number***REMOVED*** k - The value to be tweened.
        * @returns ***REMOVED***number***REMOVED*** The tweened value.
        */
        Out: function ( k ) ***REMOVED***

            var s = 1.70158;
            return --k * k * ( ( s + 1 ) * k + s ) + 1;

        ***REMOVED***,

        /**
        * Back ease-in/out.
        *
        * @method Phaser.Easing.Back#InOut
        * @param ***REMOVED***number***REMOVED*** k - The value to be tweened.
        * @returns ***REMOVED***number***REMOVED*** The tweened value.
        */
        InOut: function ( k ) ***REMOVED***

            var s = 1.70158 * 1.525;
            if ( ( k *= 2 ) < 1 ) return 0.5 * ( k * k * ( ( s + 1 ) * k - s ) );
            return 0.5 * ( ( k -= 2 ) * k * ( ( s + 1 ) * k + s ) + 2 );

        ***REMOVED***

    ***REMOVED***,

    /**
    * Bounce easing.
    *
    * @class Phaser.Easing.Bounce
    */
    Bounce: ***REMOVED***

        /**
        * Bounce ease-in.
        *
        * @method Phaser.Easing.Bounce#In
        * @param ***REMOVED***number***REMOVED*** k - The value to be tweened.
        * @returns ***REMOVED***number***REMOVED*** The tweened value.
        */
        In: function ( k ) ***REMOVED***

            return 1 - Phaser.Easing.Bounce.Out( 1 - k );

        ***REMOVED***,

        /**
        * Bounce ease-out.
        *
        * @method Phaser.Easing.Bounce#Out
        * @param ***REMOVED***number***REMOVED*** k - The value to be tweened.
        * @returns ***REMOVED***number***REMOVED*** The tweened value.
        */
        Out: function ( k ) ***REMOVED***

            if ( k < ( 1 / 2.75 ) ) ***REMOVED***

                return 7.5625 * k * k;

            ***REMOVED*** else if ( k < ( 2 / 2.75 ) ) ***REMOVED***

                return 7.5625 * ( k -= ( 1.5 / 2.75 ) ) * k + 0.75;

            ***REMOVED*** else if ( k < ( 2.5 / 2.75 ) ) ***REMOVED***

                return 7.5625 * ( k -= ( 2.25 / 2.75 ) ) * k + 0.9375;

            ***REMOVED*** else ***REMOVED***

                return 7.5625 * ( k -= ( 2.625 / 2.75 ) ) * k + 0.984375;

            ***REMOVED***

        ***REMOVED***,

        /**
        * Bounce ease-in/out.
        *
        * @method Phaser.Easing.Bounce#InOut
        * @param ***REMOVED***number***REMOVED*** k - The value to be tweened.
        * @returns ***REMOVED***number***REMOVED*** The tweened value.
        */
        InOut: function ( k ) ***REMOVED***

            if ( k < 0.5 ) return Phaser.Easing.Bounce.In( k * 2 ) * 0.5;
            return Phaser.Easing.Bounce.Out( k * 2 - 1 ) * 0.5 + 0.5;

        ***REMOVED***

    ***REMOVED***

***REMOVED***;

Phaser.Easing.Default = Phaser.Easing.Linear.None;
Phaser.Easing.Power0 = Phaser.Easing.Linear.None;
Phaser.Easing.Power1 = Phaser.Easing.Quadratic.Out;
Phaser.Easing.Power2 = Phaser.Easing.Cubic.Out;
Phaser.Easing.Power3 = Phaser.Easing.Quartic.Out;
Phaser.Easing.Power4 = Phaser.Easing.Quintic.Out;
