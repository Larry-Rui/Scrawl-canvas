/*! scrawl 2014-08-03 */
var scrawl=function(a){"use strict";return a.getImagesByClass=function(b,c){if(b){var d,e=[],f=document.getElementsByClassName(b);if(f.length>0){for(var g=f.length;g>0;g--)d=a.newImage({element:f[g-1],removeImageFromDOM:c||!0}),e.push(d.name);return e}}return console.log('my.getImagesByClass() failed to find any <img> elements of class="'+b+'" on the page'),!1},a.getImageById=function(b,c){if(b){var d=a.newImage({element:document.getElementById(b),removeImageFromDOM:c||!0});return d.name}return console.log('my.getImagesByClass() failed to find any <img> elements of class="'+classtag+'" on the page'),!1},a.newPattern=function(b){return new a.Pattern(b)},a.newPicture=function(b){return new a.Picture(b)},a.newImage=function(b){return new a.ScrawlImage(b)},a.workimg={v1:a.newVector()},a.newAnimSheet=function(b){return new a.AnimSheet(b)},a.pushUnique(a.sectionlist,"image"),a.pushUnique(a.sectionlist,"img"),a.pushUnique(a.nameslist,"imagenames"),a.pushUnique(a.nameslist,"animnames"),a.pushUnique(a.sectionlist,"anim"),a.Sprite.prototype.convertToPicture=function(b){b=a.safeObject(b);var c,d,e;return d=a.cell[a.group[this.group].cell],e=a.context[a.group[this.group].cell],c=a.prepareConvert(d,e,this),b.name=b.name||this.name+"_picture",b.group=b.group||this.group,b.convert&&a.deleteSprite([this.name]),a.doConvert(c,b)},a.Group.prototype.convertToSprite=function(b){b=a.safeObject(b);var c,d,e;return this.sprites.length>0?(d=a.cell[this.cell],e=a.context[this.cell],c=a.prepareConvert(d,e,this),b.name=b.name||this.name+"_sprite",b.group=b.group||this.name,b.convert&&a.deleteSprite(this.sprites),a.doConvert(c,b)):!1},a.prepareConvert=function(a,b,c){var d,e,f,g=a.actualWidth,h=0,i=a.actualHeight,j=0;a.clear(),c.stamp(),d=b.getImageData(0,0,a.actualWidth,a.actualHeight),e=d.data;for(var k=0,l=a.actualHeight;l>k;k++)for(var m=0,n=a.actualWidth;n>m;m++)f=4*(k*a.actualWidth+m)+3,e[f]>0&&(i=i>k?k:i,j=k>j?k:j,g=g>m?m:g,h=m>h?m:h);return d=b.getImageData(g,i,h-g+1,j-i+1),a.clear(),d},a.doConvert=function(b,c){return a.cv.width=b.width,a.cv.height=b.height,a.cvx.putImageData(b,0,0),c.element=a.cv.toDataURL(),c.width=b.width,c.height=b.height,b=new a.ScrawlImage(c),c.source=b.name,a.newPicture(c)},a.Pattern=function(b){return b=a.safeObject(b),a.Base.call(this,b),a.Base.prototype.set.call(this,b),this.repeat=b.repeat||"repeat",this.cell=b.cell||a.pad[a.currentPad].current,this.setImage(b.source||b.imageData||a.image[b.image]||a.cell[b.canvas]||!1,b.callback),this},a.Pattern.prototype=Object.create(a.Base.prototype),a.Pattern.prototype.type="Pattern",a.Pattern.prototype.classname="designnames",a.d.Pattern={repeat:"repeat",cell:"",image:"",source:"",canvas:""},a.mergeInto(a.d.Pattern,a.d.Base),a.Pattern.prototype.set=function(b){return a.Base.prototype.set.call(this,b),this.setImage(),this},a.Pattern.prototype.setImage=function(b,c){if(a.isa(b,"str")){var d=new Image,e=this;d.id=this.name,d.onload=function(b){try{var c=a.newImage({name:e.name,element:d});a.design[e.name]=e,a.design[e.name].image=c.name,a.design[e.name].source=d.src,a.pushUnique(a.designnames,e.name),a.design[e.name].makeDesign(),a.isa(b,"fn")&&b()}catch(f){return console.log("Pattern "+[e.name]+" - setImage() #1 failed - "+f.name+" error: "+f.message),e}},d.src=b}else if(a.isa(b,"obj")){if("ScrawlImage"===b.type)try{this.image=b.name,a.design[this.name]=this,a.pushUnique(a.designnames,this.name),this.makeDesign(),a.isa(c,"fn")&&c()}catch(f){return console.log("Pattern "+[this.name]+" - setImage() #2 failed - "+f.name+" error: "+f.message),e}else if("Cell"===b.type)try{this.canvas=b.name,a.design[this.name]=this,a.pushUnique(a.designnames,this.name),this.makeDesign(),a.isa(c,"fn")&&c()}catch(f){return console.log("Pattern "+[this.name]+" - setImage() #3 failed - "+f.name+" error: "+f.message),e}}else console.log("Pattern "+[this.name]+" - setImage() #4 failed - source not a string or an object",b);return this},a.Pattern.prototype.getData=function(){return a.xt(a.dsn[this.name])?a.dsn[this.name]:"rgba(0,0,0,0)"},a.Pattern.prototype.makeDesign=function(){var b=a.context[this.cell],c=a.xt(a.img[this.image])?a.img[this.image]:a.object[this.image];return this.image?c&&(a.dsn[this.name]=b.createPattern(c,this.repeat)):this.canvas&&(a.dsn[this.name]=b.createPattern(a.canvas[this.canvas],this.repeat)),this},a.Pattern.prototype.remove=function(){return delete a.dsn[this.name],delete a.design[this.name],a.removeItem(a.designnames,this.name),!0},a.Pattern.prototype.update=function(){return this.makeDesign(),this},a.Picture=function(b){if(a.isa(b,"obj")&&a.xt(b.url))return this.importImage(b);b=a.safeObject(b),a.Sprite.call(this,b),a.Position.prototype.set.call(this,b);var c,d,e,f,g;return this.source=b.source||!1,this.imageType=this.sourceImage(b.source)||!1,this.source&&("img"===this.imageType||"video"===this.imageType?(c=a.image[this.source],d=c.width,e=c.height,f=0,g=0):"canvas"===this.imageType?(c=a.cell[this.source],d=c.sourceWidth,e=c.sourceHeight,f=c.source.x,g=c.source.y):"animation"===this.imageType&&(c=a.anim[this.get("animSheet")].getData(),d=c.copyWidth,e=c.copyHeight,f=c.copyX,g=c.copyY),this.width=b.width||d,this.height=b.height||e,this.copyX=b.copyX||f,this.copyY=b.copyY||g,this.copyWidth=b.copyWidth||d,this.copyHeight=b.copyHeight||e),this.filters=a.safeObject(b.filters),this.filterKeys=Object.keys(this.filters),this.checkSum=0,this.calculateFilters=!1,this.registerInLibrary(),a.pushUnique(a.group[this.group].sprites,this.name),a.isa(b.callback,"fn")&&b.callback.call(this),this},a.Picture.prototype=Object.create(a.Sprite.prototype),a.Picture.prototype.type="Picture",a.Picture.prototype.classname="spritenames",a.d.Picture={source:"",imageData:"",imageDataChannel:"alpha",animSheet:"",imageType:"",checkHitUsingImageData:!1,copyX:0,copyY:0,copyWidth:0,copyHeight:0,filters:{},filterKeys:[],checkSum:0,calculateFilters:!1},a.mergeInto(a.d.Picture,a.d.Sprite),a.Picture.prototype.get=function(b){return a.contains(a.animKeys,b)?a.anim[this.animSheet].get(b):a.Sprite.prototype.get.call(this,b)},a.Picture.prototype.set=function(b){return a.Sprite.prototype.set.call(this,b),a.xt(this.animSheet)&&a.anim[this.animSheet].set(b),this},a.Picture.prototype.setDelta=function(b){return a.Sprite.prototype.setDelta.call(this,b),b=a.safeObject(b),a.xt(b.copyX)&&(this.copyX+=b.copyX),a.xt(b.copyY)&&(this.copyY+=b.copyY),a.xt(b.copyWidth)&&(this.copyWidth+=b.copyWidth),a.xt(b.copyHeight)&&(this.copyHeight+=b.copyHeight),this},a.Picture.prototype.importImage=function(b){if(b=a.safeObject(b),!a.xt(b.url))return console.log("Picture.importImage() failed - no url supplied"),!1;var c=new Image;c.id=b.name||"image"+Math.floor(1e8*Math.random()),c.crossOrigin="Anonymous",c.onload=function(){a.newImage({name:c.id,element:c});return delete b.url,b.source=c.id,console.log("Picture.importImage() - <"+c.id+"> loaded"),a.newPicture(b)},c.onerror=function(){return console.log("Picture.importImage() failed - <"+c.id+"> failed to load"),!1},c.src=b.url},a.Picture.prototype.clone=function(b){var c=a.Sprite.prototype.clone.call(this,b);return b=a.safeObject(b),b.keepCopyDimensions||c.fitToImageSize(),c},a.Picture.prototype.fitToImageSize=function(){if("img"===this.imageType){var b=a.image[this.source];this.set({copyWidth:b.get("width"),copyHeight:b.get("height"),copyX:0,copyY:0})}return this},a.Picture.prototype.sourceImage=function(){var b;return this.get("animSheet")&&a.contains(a.imagenames,this.source)?"animation":a.contains(a.imagenames,this.source)?(b=a.xt(a.img[this.source])?a.img[this.source]:a.object[this.source],a.isa(b,"video")?"video":"img"):a.contains(a.cellnames,this.source)?"canvas":!1},a.Picture.prototype.clip=function(a){var b=this.prepareStamp();return a.save(),this.rotateCell(a),a.beginPath(),a.rect(b.x,b.y,this.width*this.scale,this.height*this.scale),a.clip(),this},a.Picture.prototype.clear=function(a){var b=this.prepareStamp();return this.rotateCell(a),a.clearRect(b.x,b.y,this.width*this.scale,this.height*this.scale),this},a.Picture.prototype.clearWithBackground=function(b,c){var d=this.prepareStamp(),e=this.width*this.scale,f=this.height*this.scale;return this.rotateCell(b),b.fillStyle=a.cell[c].backgroundColor,b.strokeStyle=a.cell[c].backgroundColor,b.globalAlpha=1,b.strokeRect(d.x,d.y,e,f),b.fillRect(d.x,d.y,e,f),b.fillStyle=a.ctx[c].fillStyle,b.strokeStyle=a.ctx[c].strokeStyle,b.globalAlpha=a.ctx[c].globalAlpha,this},a.Picture.prototype.draw=function(b,c){var d=this.prepareStamp();return this.rotateCell(b),a.cell[c].setEngine(this),b.strokeRect(d.x,d.y,this.width*this.scale,this.height*this.scale),this},a.Picture.prototype.fill=function(b,c){var d,e=this.getImage();return e.image&&(d=this.prepareStamp(),this.rotateCell(b),a.cell[c].setEngine(this),b.drawImage(e.image,e.copyX,e.copyY,e.copyWidth,e.copyHeight,d.x,d.y,this.width*this.scale,this.height*this.scale)),this},a.Picture.prototype.drawFill=function(b,c){var d,e,f,g=this.getImage();return g.image&&(d=this.prepareStamp(),e=this.width*this.scale,f=this.height*this.scale,this.rotateCell(b),a.cell[c].setEngine(this),b.strokeRect(d.x,d.y,e,f),this.clearShadow(b,c),b.drawImage(g.image,g.copyX,g.copyY,g.copyWidth,g.copyHeight,d.x,d.y,e,f)),this},a.Picture.prototype.fillDraw=function(b,c){var d,e,f,g=this.getImage();return g.image&&(d=this.prepareStamp(),e=this.width*this.scale,f=this.height*this.scale,this.rotateCell(b),a.cell[c].setEngine(this),b.drawImage(g.image,g.copyX,g.copyY,g.copyWidth,g.copyHeight,d.x,d.y,e,f),this.clearShadow(b,c),b.strokeRect(d.x,d.y,e,f)),this},a.Picture.prototype.sinkInto=function(b,c){var d,e,f,g=this.getImage();return g.image&&(d=this.prepareStamp(),e=this.width*this.scale,f=this.height*this.scale,this.rotateCell(b),a.cell[c].setEngine(this),b.drawImage(g.image,g.copyX,g.copyY,g.copyWidth,g.copyHeight,d.x,d.y,e,f),b.strokeRect(d.x,d.y,e,f)),this},a.Picture.prototype.floatOver=function(b,c){var d,e,f,g=this.getImage();return g.image&&(d=this.prepareStamp(),e=this.width*this.scale,f=this.height*this.scale,this.rotateCell(b),a.cell[c].setEngine(this),b.strokeRect(d.x,d.y,e,f),b.drawImage(g.image,g.copyX,g.copyY,g.copyWidth,g.copyHeight,d.x,d.y,e,f)),this},a.Picture.prototype.getImageData=function(b){b=a.xt(b)?b:"data";var c,d=this.getImage();return d.image&&("animation"===this.imageType?(c=a.image[this.source],a.cv.width=c.get("width"),a.cv.height=c.get("height"),a.cvx.drawImage(d.image,0,0)):(a.cv.width=this.copyWidth,a.cv.height=this.copyHeight,a.cvx.drawImage(d.image,this.copyX,this.copyY,this.copyWidth,this.copyHeight,0,0,this.copyWidth,this.copyHeight)),this.imageData=this.name+"_"+b,a.imageData[this.imageData]=a.cvx.getImageData(0,0,a.cv.width,a.cv.height)),this},a.Picture.prototype.getImageDataValue=function(b){b=a.safeObject(b);var c,d,e,f,g,h,i,j=a.workimg.v1.set({x:b.x||0,y:b.y||0}),k=a.imageData[this.get("imageData")],l=this.get("imageDataChannel");if(this.resetWork(),j.vectorSubtract(this.work.start).scalarDivide(this.scale).rotate(-this.roll),j.x=this.flipReverse?-j.x:j.x,j.y=this.flipUpend?-j.y:j.y,j.vectorAdd(this.getPivotOffsetVector(this.handle)),"animation"===this.imageType&&a.image[this.source]?(e=a.anim[this.get("animSheet")].getData(),f=this.width/e.copyWidth,g=this.height/e.copyHeight,c=Math.round(j.x/f+e.copyX),d=Math.round(j.y/g+e.copyY)):(f=this.width/this.copyWidth,g=this.height/this.copyHeight,c=Math.round(j.x/f),d=Math.round(j.y/g)),h=!1,i=4*(d*k.width+c),a.isBetween(c,0,k.width-1,!0)&&a.isBetween(d,0,k.height-1,!0))switch(b.channel||l){case"red":h=a.xt(k.data[i])?k.data[i]:!1;break;case"blue":h=a.xt(k.data[i+1])?k.data[i+1]:!1;break;case"green":h=a.xt(k.data[i+2])?k.data[i+2]:!1;break;case"alpha":h=a.xt(k.data[i+3])?k.data[i+3]:!1;break;case"color":h=a.xta([k.data[i],k.data[i+1],k.data[i+2],k.data[i+3]])?"rgba("+k.data[i]+","+k.data[i+1]+","+k.data[i+2]+","+k.data[i+3]+")":!1;break;default:h=!1}return h},a.Picture.prototype.getImage=function(){var b,c,d,e={};switch(e.copyX=this.copyX,e.copyY=this.copyY,e.copyWidth=this.copyWidth,e.copyHeight=this.copyHeight,this.imageType){case"canvas":e.image=a.isa(a.canvas[this.source],"canvas")?a.canvas[this.source]:!1;break;case"animation":e=a.anim[this.animSheet].getData(),this.copyX=e.copyX,this.copyY=e.copyY,this.copyWidth=e.copyWidth,this.copyHeight=e.copyHeight,d=a.xt(a.img[this.source])?a.img[this.source]:a.object[this.source],e.image=a.isa(d,"img")?d:!1;break;default:d=a.xt(a.img[this.source])?a.img[this.source]:a.object[this.source],e.image=a.isa(d,"img")||a.isa(d,"video")?d:!1}if(this.filterKeys=Object.keys(this.filters),this.filterKeys.length>0){if(this.calculateCheckSum(),this.calculateFilters){c=a.image[this.source],a.cv.width=c.width,a.cv.height=c.height,a.cvx.drawImage(e.image,0,0),b=a.cvx.getImageData(this.copyX,this.copyY,this.copyWidth,this.copyHeight);for(var f=0,g=this.filterKeys.length;g>f;f++)a.xt(a.filter[this.filterKeys[f]])&&(this.filters[this.filterKeys[f]].use=b,this.filters[this.filterKeys[f]].save=!1,b=a.filter[this.filterKeys[f]](this.filters[this.filterKeys[f]],a.image[this.source]));b=c.getImageDataUrl(b,!0),c.makeImage(b,this.name+"_brush",this.copyWidth,this.copyHeight)}e.copyX=0,e.copyY=0,b=a.f.querySelector("#"+this.name+"_brush"),e.image=a.isa(b,"img")?b:!1,e.image&&(this.calculateFilters=!1)}return e},a.Picture.prototype.calculateCheckSum=function(){var a=(this.copyX*this.copyX||1)*(this.copyY*this.copyY||1)*(this.copyWidth*this.copyWidth||1)*(this.copyHeight*this.copyHeight||1),b=Object.keys(this.filters);if(this.checkSum!==a&&(this.calculateFilters=!0,this.checkSum=a),this.filterKeys.length!==b.length&&(this.calculateFilters=!0),this.calculateFilters)return!1;for(var c=0,d=b.length;d>c;c++)if(this.filterKeys[c]!==b[c])return this.calculateFilters=!0,!1;return!0},a.Picture.prototype.checkHit=function(b){b=a.safeObject(b);for(var c,d,e=a.xt(b.tests)?[].concat(b.tests):[b.x||!1,b.y||!1],f=a.isa(b.test,"num")?b.test:0,g=0,h=e.length;h>g&&(d=a.Sprite.prototype.checkHit.call(this,{tests:[e[g],e[g+1]]}),this.checkHitUsingImageData&&d&&(d.x=parseInt(d.x,10),d.y=parseInt(d.y,10),c=this.getImageDataValue(d),d="color"===this.get("imageDataChannel")?"rgba(0,0,0,0)"===c?!1:d:c>f?d:!1),!d);g+=2);return d?d:!1},a.ScrawlImage=function(b){b=a.safeObject(b);var c,d,e=a.isa(b.removeImageFromDOM,"bool")?b.removeImageFromDOM:!0;return a.xt(b.element)?(b.name=b.name||b.element.getAttribute("id")||b.element.getAttribute("name")||"",a.Base.call(this,b),this.width=b.width||parseFloat(b.element.offsetWidth)||b.element.width||(a.xta([b.element.style,b.element.style.width])?parseFloat(b.element.style.width):0),this.height=b.height||parseFloat(b.element.offsetHeight)||b.element.height||(a.xta([b.element.style,b.element.style.height])?parseFloat(b.element.style.height):0),a.isa(b.element,"img")?(e?d=b.element:(d=b.element.cloneNode(),b.name=d.id,a.Base.call(this,b),d.id=this.name),a.f.appendChild(d),this.elementType="img"):a.isa(b.element,"video")?(d=b.element,this.elementType="video"):(c=b.element,d=this.makeImage(c,this.name,this.width,this.height),this.elementType="img"),a.object[this.name]=d,a.pushUnique(a.objectnames,this.name),a.image[this.name]=this,a.pushUnique(a.imagenames,this.name),a.isa(b.fn,"fn")&&b.fn.call(this),this):!1},a.ScrawlImage.prototype=Object.create(a.Base.prototype),a.ScrawlImage.prototype.type="ScrawlImage",a.ScrawlImage.prototype.classname="imagenames",a.d.ScrawlImage={width:0,height:0,elementType:""},a.mergeInto(a.d.ScrawlImage,a.d.Base),a.ScrawlImage.prototype.makeImage=function(b,c,d,e){var f=document.createElement("img"),g=a.f.querySelector("#"+c);return f.width=d||b.width,f.height=e||b.height,f.src=b,g&&a.f.removeChild(g),a.f.appendChild(f),f.id=c,f},a.ScrawlImage.prototype.getImageDataUrl=function(b,c){var d;return c=a.xt(c)?c:!1,a.cv.width=c?b.width:this.width,a.cv.height=c?b.height:this.height,c?a.cvx.putImageData(b,0,0):a.cvx.drawImage(b,0,0),d=a.cv.toDataURL("image/png")},a.ScrawlImage.prototype.getImageData=function(b){b=a.xt(b)?b:!1;var c,d;return a.isa(b,"bool")?(c=b?a.object[this.name]:a.img[this.name]||a.object[this.name],a.cv.width=this.width,a.cv.height=this.height,a.cvx.drawImage(c,0,0),d=a.cvx.getImageData(0,0,this.width,this.height)):b},a.ScrawlImage.prototype.clone=function(b){b=a.safeObject(b),b.element=a.xt(a.img[this.name])?a.img[this.name]:a.object[this.name];var c=a.Base.prototype.clone.call(this,b);return c},a.prepareFilterSection(),a.ScrawlImage.prototype.filter=function(b,c){return a.xta([a.filter,a.filter[b]])?a.filter[b](c,this):!1},a.AnimSheet=function(b){return b=a.safeObject(b),a.Base.call(this,b),this.frames=a.xt(b.frames)?[].concat(b.frames):[],this.currentFrame=b.currentFrame||0,this.speed=a.isa(b.speed,"num")?b.speed:1,this.loop=a.isa(b.loop,"str")?b.loop:"end",this.running=a.isa(b.running,"str")?b.running:"complete",this.lastCalled=a.xt(b.lastCalled)?b.lastCalled:Date.now(),a.anim[this.name]=this,a.pushUnique(a.animnames,this.name),this},a.AnimSheet.prototype=Object.create(a.Base.prototype),a.AnimSheet.prototype.type="AnimSheet",a.AnimSheet.prototype.classname="animnames",a.d.AnimSheet={frames:[],currentFrame:0,speed:1,loop:"end",running:"complete",lastCalled:0},a.animKeys=Object.keys(a.d.AnimSheet),a.mergeInto(a.d.AnimSheet,a.d.Scrawl),a.AnimSheet.prototype.set=function(b){b=a.safeObject(b);var c="pause"===this.loop?!0:!1;if(a.Base.prototype.set.call(this,b),a.xt(b.running))switch(b.running){case"forward":this.running="forward",c||(this.currentFrame=0);break;case"backward":this.running="backward",c||(this.currentFrame=this.frames.length-1);break;default:this.running="complete",this.currentFrame=0}return this},a.AnimSheet.prototype.getData=function(){if(this.speed>0){var a=this.frames[this.currentFrame].d/this.speed,b=this.lastCalled+a<Date.now()?!0:!1;switch(this.running){case"complete":this.lastCalled=Date.now();break;case"forward":if(b){switch(this.loop){case"pause":break;case"end":this.running=this.currentFrame+1>=this.frames.length?"complete":this.running,this.currentFrame=this.currentFrame+1>=this.frames.length?this.currentFrame:this.currentFrame+1;break;case"loop":this.currentFrame=this.currentFrame+1>=this.frames.length?0:this.currentFrame+1;break;case"reverse":this.running=this.currentFrame+1>=this.frames.length?"backward":"forward",this.currentFrame=this.currentFrame+1>=this.frames.length?this.currentFrame:this.currentFrame+1}this.lastCalled=Date.now()}break;case"backward":if(b){switch(this.loop){case"pause":break;case"end":this.running=this.currentFrame-1<=0?"complete":this.running,this.currentFrame=this.currentFrame-1<=0?this.currentFrame:this.currentFrame-1;break;case"loop":this.currentFrame=this.currentFrame-1<=0?this.frames.length-1:this.currentFrame-1;break;case"reverse":this.running=this.currentFrame-1<=0?"forward":"backward",this.currentFrame=this.currentFrame-1<=0?this.currentFrame:this.currentFrame-1}this.lastCalled=Date.now()}}}return{copyX:this.frames[this.currentFrame].x,copyY:this.frames[this.currentFrame].y,copyWidth:this.frames[this.currentFrame].w,copyHeight:this.frames[this.currentFrame].h}},a}(scrawl);