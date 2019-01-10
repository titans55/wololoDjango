/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */

/**
* @class WebGLStencilManager
* @constructor
* @private
*/
PIXI.WebGLStencilManager = function()
***REMOVED***
    this.stencilStack = [];
    this.reverse = true;
    this.count = 0;
***REMOVED***;

/**
* Sets the drawing context to the one given in parameter.
* 
* @method setContext 
* @param gl ***REMOVED***WebGLContext***REMOVED*** the current WebGL drawing context
*/
PIXI.WebGLStencilManager.prototype.setContext = function(gl)
***REMOVED***
    this.gl = gl;
***REMOVED***;

/**
* Applies the Mask and adds it to the current filter stack.
* 
* @method pushMask
* @param graphics ***REMOVED***Graphics***REMOVED***
* @param webGLData ***REMOVED***Array***REMOVED***
* @param renderSession ***REMOVED***Object***REMOVED***
*/
PIXI.WebGLStencilManager.prototype.pushStencil = function(graphics, webGLData, renderSession)
***REMOVED***
    var gl = this.gl;
    this.bindGraphics(graphics, webGLData, renderSession);

    if(this.stencilStack.length === 0)
    ***REMOVED***
        gl.enable(gl.STENCIL_TEST);
        gl.clear(gl.STENCIL_BUFFER_BIT);
        this.reverse = true;
        this.count = 0;
    ***REMOVED***

    this.stencilStack.push(webGLData);

    var level = this.count;

    gl.colorMask(false, false, false, false);

    gl.stencilFunc(gl.ALWAYS,0,0xFF);
    gl.stencilOp(gl.KEEP,gl.KEEP,gl.INVERT);

    // draw the triangle strip!

    if(webGLData.mode === 1)
    ***REMOVED***
        gl.drawElements(gl.TRIANGLE_FAN,  webGLData.indices.length - 4, gl.UNSIGNED_SHORT, 0 );
       
        if(this.reverse)
        ***REMOVED***
            gl.stencilFunc(gl.EQUAL, 0xFF - level, 0xFF);
            gl.stencilOp(gl.KEEP,gl.KEEP,gl.DECR);
        ***REMOVED***
        else
        ***REMOVED***
            gl.stencilFunc(gl.EQUAL,level, 0xFF);
            gl.stencilOp(gl.KEEP,gl.KEEP,gl.INCR);
        ***REMOVED***

        // draw a quad to increment..
        gl.drawElements(gl.TRIANGLE_FAN, 4, gl.UNSIGNED_SHORT, ( webGLData.indices.length - 4 ) * 2 );
               
        if(this.reverse)
        ***REMOVED***
            gl.stencilFunc(gl.EQUAL,0xFF-(level+1), 0xFF);
        ***REMOVED***
        else
        ***REMOVED***
            gl.stencilFunc(gl.EQUAL,level+1, 0xFF);
        ***REMOVED***

        this.reverse = !this.reverse;
    ***REMOVED***
    else
    ***REMOVED***
        if(!this.reverse)
        ***REMOVED***
            gl.stencilFunc(gl.EQUAL, 0xFF - level, 0xFF);
            gl.stencilOp(gl.KEEP,gl.KEEP,gl.DECR);
        ***REMOVED***
        else
        ***REMOVED***
            gl.stencilFunc(gl.EQUAL,level, 0xFF);
            gl.stencilOp(gl.KEEP,gl.KEEP,gl.INCR);
        ***REMOVED***

        gl.drawElements(gl.TRIANGLE_STRIP,  webGLData.indices.length, gl.UNSIGNED_SHORT, 0 );

        if(!this.reverse)
        ***REMOVED***
            gl.stencilFunc(gl.EQUAL,0xFF-(level+1), 0xFF);
        ***REMOVED***
        else
        ***REMOVED***
            gl.stencilFunc(gl.EQUAL,level+1, 0xFF);
        ***REMOVED***
    ***REMOVED***

    gl.colorMask(true, true, true, true);
    gl.stencilOp(gl.KEEP,gl.KEEP,gl.KEEP);

    this.count++;
***REMOVED***;

/**
 * TODO this does not belong here!
 * 
 * @method bindGraphics
 * @param graphics ***REMOVED***Graphics***REMOVED***
 * @param webGLData ***REMOVED***Array***REMOVED***
 * @param renderSession ***REMOVED***Object***REMOVED***
 */
PIXI.WebGLStencilManager.prototype.bindGraphics = function(graphics, webGLData, renderSession)
***REMOVED***
    //if(this._currentGraphics === graphics)return;
    this._currentGraphics = graphics;

    var gl = this.gl;

     // bind the graphics object..
    var projection = renderSession.projection,
        offset = renderSession.offset,
        shader;// = renderSession.shaderManager.primitiveShader;

    if(webGLData.mode === 1)
    ***REMOVED***
        shader = renderSession.shaderManager.complexPrimitiveShader;

        renderSession.shaderManager.setShader( shader );

        gl.uniform1f(shader.flipY, renderSession.flipY);
       
        gl.uniformMatrix3fv(shader.translationMatrix, false, graphics.worldTransform.toArray(true));

        gl.uniform2f(shader.projectionVector, projection.x, -projection.y);
        gl.uniform2f(shader.offsetVector, -offset.x, -offset.y);

        gl.uniform3fv(shader.tintColor, PIXI.hex2rgb(graphics.tint));
        gl.uniform3fv(shader.color, webGLData.color);

        gl.uniform1f(shader.alpha, graphics.worldAlpha * webGLData.alpha);

        gl.bindBuffer(gl.ARRAY_BUFFER, webGLData.buffer);

        gl.vertexAttribPointer(shader.aVertexPosition, 2, gl.FLOAT, false, 4 * 2, 0);


        // now do the rest..
        // set the index buffer!
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, webGLData.indexBuffer);
    ***REMOVED***
    else
    ***REMOVED***
        //renderSession.shaderManager.activatePrimitiveShader();
        shader = renderSession.shaderManager.primitiveShader;
        renderSession.shaderManager.setShader( shader );

        gl.uniformMatrix3fv(shader.translationMatrix, false, graphics.worldTransform.toArray(true));

        gl.uniform1f(shader.flipY, renderSession.flipY);
        gl.uniform2f(shader.projectionVector, projection.x, -projection.y);
        gl.uniform2f(shader.offsetVector, -offset.x, -offset.y);

        gl.uniform3fv(shader.tintColor, PIXI.hex2rgb(graphics.tint));

        gl.uniform1f(shader.alpha, graphics.worldAlpha);
        
        gl.bindBuffer(gl.ARRAY_BUFFER, webGLData.buffer);

        gl.vertexAttribPointer(shader.aVertexPosition, 2, gl.FLOAT, false, 4 * 6, 0);
        gl.vertexAttribPointer(shader.colorAttribute, 4, gl.FLOAT, false,4 * 6, 2 * 4);

        // set the index buffer!
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, webGLData.indexBuffer);
    ***REMOVED***
***REMOVED***;

/**
 * @method popStencil
 * @param graphics ***REMOVED***Graphics***REMOVED***
 * @param webGLData ***REMOVED***Array***REMOVED***
 * @param renderSession ***REMOVED***Object***REMOVED***
 */
PIXI.WebGLStencilManager.prototype.popStencil = function(graphics, webGLData, renderSession)
***REMOVED***
	var gl = this.gl;
    this.stencilStack.pop();
   
    this.count--;

    if(this.stencilStack.length === 0)
    ***REMOVED***
        // the stack is empty!
        gl.disable(gl.STENCIL_TEST);

    ***REMOVED***
    else
    ***REMOVED***

        var level = this.count;

        this.bindGraphics(graphics, webGLData, renderSession);

        gl.colorMask(false, false, false, false);
    
        if(webGLData.mode === 1)
        ***REMOVED***
            this.reverse = !this.reverse;

            if(this.reverse)
            ***REMOVED***
                gl.stencilFunc(gl.EQUAL, 0xFF - (level+1), 0xFF);
                gl.stencilOp(gl.KEEP,gl.KEEP,gl.INCR);
            ***REMOVED***
            else
            ***REMOVED***
                gl.stencilFunc(gl.EQUAL,level+1, 0xFF);
                gl.stencilOp(gl.KEEP,gl.KEEP,gl.DECR);
            ***REMOVED***

            // draw a quad to increment..
            gl.drawElements(gl.TRIANGLE_FAN, 4, gl.UNSIGNED_SHORT, ( webGLData.indices.length - 4 ) * 2 );
            
            gl.stencilFunc(gl.ALWAYS,0,0xFF);
            gl.stencilOp(gl.KEEP,gl.KEEP,gl.INVERT);

            // draw the triangle strip!
            gl.drawElements(gl.TRIANGLE_FAN,  webGLData.indices.length - 4, gl.UNSIGNED_SHORT, 0 );
           
            if(!this.reverse)
            ***REMOVED***
                gl.stencilFunc(gl.EQUAL,0xFF-(level), 0xFF);
            ***REMOVED***
            else
            ***REMOVED***
                gl.stencilFunc(gl.EQUAL,level, 0xFF);
            ***REMOVED***

        ***REMOVED***
        else
        ***REMOVED***
          //  console.log("<<>>")
            if(!this.reverse)
            ***REMOVED***
                gl.stencilFunc(gl.EQUAL, 0xFF - (level+1), 0xFF);
                gl.stencilOp(gl.KEEP,gl.KEEP,gl.INCR);
            ***REMOVED***
            else
            ***REMOVED***
                gl.stencilFunc(gl.EQUAL,level+1, 0xFF);
                gl.stencilOp(gl.KEEP,gl.KEEP,gl.DECR);
            ***REMOVED***

            gl.drawElements(gl.TRIANGLE_STRIP,  webGLData.indices.length, gl.UNSIGNED_SHORT, 0 );

            if(!this.reverse)
            ***REMOVED***
                gl.stencilFunc(gl.EQUAL,0xFF-(level), 0xFF);
            ***REMOVED***
            else
            ***REMOVED***
                gl.stencilFunc(gl.EQUAL,level, 0xFF);
            ***REMOVED***
        ***REMOVED***

        gl.colorMask(true, true, true, true);
        gl.stencilOp(gl.KEEP,gl.KEEP,gl.KEEP);


    ***REMOVED***
***REMOVED***;

/**
* Destroys the mask stack.
* 
* @method destroy
*/
PIXI.WebGLStencilManager.prototype.destroy = function()
***REMOVED***
    this.stencilStack = null;
    this.gl = null;
***REMOVED***;
