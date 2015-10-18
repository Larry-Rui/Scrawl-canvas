/*! scrawl-canvas 2015-10-18 */
if(window.scrawl&&window.scrawl.work.extensions&&!window.scrawl.contains(window.scrawl.work.extensions,"frame"))var scrawl=function(a){"use strict";return a.newFramePoint=function(b){return new a.FramePoint(b)},a.makeFramePoint=function(b){return new a.FramePoint(b)},a.newFrame=function(b){return new a.Frame(b)},a.makeFrame=function(b){return new a.Frame(b)},a.FramePoint=function(b){var c=a.xtGet,d=a.makeVector;a.Base.call(this,b),b=a.safeObject(b),this.host=c(b.host,!1),this.data=c(b.data,!1),this.reference=c(b.reference,!1),this.lock=c(b.lock,!1),this.lockCorner=c(b.lockCorner,!1),this.pivot=c(b.pivot,!1),this.path=c(b.path,!1),this.pathPlace=c(b.pathPlace,!1),this.deltaPathPlace=c(b.deltaPathPlace,!1),this.pathSpeedConstant=c(b.pathSpeedConstant,!1),this.lockX=c(b.lockX,!1),this.lockY=c(b.lockY,!1),this.local=d({name:this.name+"_local"}),this.setReference(),this.setLocal()},a.FramePoint.prototype=Object.create(a.Base.prototype),a.FramePoint.prototype.type="FramePoint",a.work.d.FramePoint={host:!1,data:!1,reference:!1,pivot:!1,lock:!1,lockCorner:!1,local:{x:0,y:0,z:0},path:!1,pathPlace:!1,deltaPathPlace:!1,pathSpeedConstant:!1,lockX:!1,lockY:!1},a.mergeInto(a.work.d.FramePoint,a.work.d.Base),a.FramePoint.prototype.get=function(){return a.Base.get.call(this,items)},a.FramePoint.prototype.set=function(b){var c=a.xtGet;return this.host=c(b.host,this.host),this.data=c(b.data,this.data),this.pivot=c(b.pivot,this.pivot),this.path=c(b.path,this.path),this.lock=c(b.lock,this.lock),this.lockCorner=c(b.lockCorner,this.lockCorner),this.pathPlace=c(b.pathPlace,this.pathPlace),this.deltaPathPlace=c(b.deltaPathPlace,this.deltaPathPlace),this.pathSpeedConstant=c(b.pathSpeedConstant,this.pathSpeedConstant),this.lockX=c(b.lockX,this.lockX),this.lockY=c(b.lockY,this.lockY),this.setReference(),this.setLocal(),this},a.FramePoint.prototype.setReference=function(){return this.reference=this.data?"data":this.lock?"lock":this.path&&a.contains(a.entitynames,this.path)?"entity":this.pivot?a.contains(a.entitynames,this.pivot)?"entity":a.contains(a.cellnames,this.pivot)?"cell":a.contains(a.pointnames,this.pivot)?"point":a.stack&&a.contains(a.stacknames,this.pivot)?"stack":a.pad&&a.contains(a.padnames,this.pivot)?"pad":a.element&&a.contains(a.elementnames,this.pivot)?"element":a.particle&&a.contains(a.particlenames,this.pivot)?"particle":!1:!1,this},a.FramePoint.prototype.setLocal=function(){var b,c,d,e=this.local;if(this.changed=!1,b=e.x,c=e.y,"data"===this.reference)this.setLocalFromData();else if(this.lock)d=a.element[this.lock][this.lockCorner],e.x=d.x,e.y=d.y;else if(this.path)this.setLocalFromPath();else if(this.pivot){switch(this.reference){case"point":d=a.point[this.pivot].local;break;case"particle":d=a.particle[this.pivot].place;break;default:d=a[this.reference][this.pivot].currentStart}e.x=d.x,e.y=d.y}return(b!=this.local.x||c!=this.local.y)&&(this.changed=!0),this},a.FramePoint.prototype.setLocalFromData=function(){var b=a.cell[a.group[a.entity[this.host].group].cell],c=this.local,d=this.data,e=this.setLocalFromDataString;return Array.isArray(this.data)&&(c.x=d[0].toFixed?d[0]:e(d[0],b.actualWidth),c.y=d[1].toFixed?d[1]:e(d[1],b.actualHeight)),this},a.FramePoint.prototype.setLocalFromDataString=function(a,b){switch(a){case"top":case"left":return 0;case"right":case"bottom":return b;case"center":return b/2;default:return parseFloat(a)/100*b}},a.FramePoint.prototype.setLocalFromPath=function(){var b,c=a.entity[this.path],d=this.local;return c&&"Path"===c.type&&(b=c.getPerimeterPosition(this.pathPlace,this.pathSpeedConstant,!1),d.x=this.lockX?d.x:b.x,d.y=this.lockY?d.y:b.y,this.deltaPathPlace&&(this.pathPlace+=this.deltaPathPlace,this.pathPlace>1?this.pathPlace-=1:this.pathPlace<0&&(this.pathPlace+=1))),this},a.Frame=function(b){var c=a.makeVector,d=a.xtGet;return a.Base.call(this,b),b=a.safeObject(b),this.cornersDataArrayOrder=a.xtGet(b.cornersDataArrayOrder,["tlx","tly","trx","try","brx","bry","blx","bly"]),this.topLeft=!1,this.topRight=!1,this.bottomRight=!1,this.bottomLeft=!1,this.width=1,this.height=1,this.localWidth=1,this.localHeight=1,this.referencePoint=c(),this.source=d(b.source,!1),this.sourceType=!1,this.copy={x:d(b.copyX,0),y:d(b.copyY,0),w:d(b.copyWidth,"100%"),h:d(b.copyHeight,"100%")},this.currentCopy={flag:!1},this.cell=document.createElement("canvas"),this.engine=this.cell.getContext("2d"),this.interferenceLoops=d(b.interferenceLoops,2),this.interferenceFactor=d(b.interferenceFactor,1.03),this.method=d(b.method,"fill"),this.visibility=d(b.visibility,!0),this.order=d(b.order,0),this.globalAlpha=d(b.globalAlpha,1),this.globalCompositeOperation=d(b.globalCompositeOperation,"source-over"),this.lineWidth=d(b.lineWidth,0),this.lineCap=d(b.lineCap,"butt"),this.lineJoin=d(b.lineJoin,"miter"),this.lineDash=d(b.lineDash,[]),this.lineDashOffset=d(b.lineDashOffset,0),this.miterLimit=d(b.miterLimit,10),this.strokeStyle=d(b.strokeStyle,"#000000"),this.shadowOffsetX=d(b.shadowOffsetX,0),this.shadowOffsetY=d(b.shadowOffsetY,0),this.shadowBlur=d(b.shadowBlur,0),this.shadowColor=d(b.shadowColor,"#000000"),this.group=a.Entity.prototype.getGroup.call(this,b),a.Entity.prototype.registerInLibrary.call(this,b),a.pushUnique(a.group[this.group].entitys,this.name),this.lockElementAttributes={},this.setLockElementAttributes(b),this.lockFrameTo=!1,b.lockFrameTo&&(this.lockFrameTo=b.lockFrameTo,this.lockOn(b)),this.setCorners(b),this.setEngine(this),this.filtersEntityInit(b),this.maxDimensions={top:0,bottom:0,left:0,right:0,flag:!0},this.redraw=!0,this},a.Frame.prototype=Object.create(a.Base.prototype),a.Frame.prototype.type="Frame",a.Frame.prototype.classname="entitynames",a.work.d.Frame={topLeft:!1,topRight:!1,bottomRight:!1,bottomLeft:!1,width:1,height:1,localWidth:1,localHeight:1,referencePoint:!1,currentFrame:!1,method:"fill",visibility:!0,order:0,lockFrameTo:!1,lockElementAttributes:!1,globalAlpha:1,globalCompositeOperation:"source-over",lineWidth:0,lineCap:"butt",lineJoin:"miter",lineDash:[],lineDashOffset:0,miterLimit:10,strokeStyle:"#000000",shadowOffsetX:0,shadowOffsetY:0,shadowBlur:0,shadowColor:"#000000",source:!1,sourceType:!1,cell:!1,engine:!1,filters:[],filterOnStroke:!1,pivot:!1,path:!1,mouseIndex:"mouse",flipReverse:!1,flipUpend:!1,lockX:!1,lockY:!1,group:!1,redraw:!1,interferenceLoops:2,interferenceFactor:1.03,maxDimensions:{top:0,bottom:0,left:0,right:0,flag:!0}},a.mergeInto(a.work.d.Frame,a.work.d.Base),a.Frame.prototype.collisionsEntityRegisterInLibrary=function(b){return a.Entity.prototype.collisionsEntityRegisterInLibrary.call(this,b)},a.Frame.prototype.set=function(b){var c,d=a.safeObject,e=this.copy,f=a.xtGet;return a.Base.prototype.set.call(this,b),b=d(b),b.lockFrameTo?(this.lockOn(b),this.lockFrameTo=b.lockFrameTo):this.lockFrameTo&&(this.setLockElementAttributes(b),c=f(d(a.element)[this.lockFrameTo],d(a.stack)[this.lockFrameTo],d(a.pad)[this.lockFrameTo]),c&&c.set(this.lockElementAttributes)),a.xt(b.copyX,b.copyY,b.copyWidth,b.copyHeight)&&(e.x=f(b.copyX,e.x),e.y=f(b.copyY,e.y),e.w=f(b.copyWidth,e.w),e.h=f(b.copyHeight,e.h),this.currentCopy.flag=!1),this.setCorners(b),this.setEngine(b),this},a.Frame.prototype.clone=function(b){var c,d=a.Base.prototype.clone.call(this,b),e=a.xtGet,f=this.copy;return d.lockFrameTo&&(c=a.mergeOver(this.lockElementAttributes,a.safeObject(b)),a.element[d.lockFrameTo].set(c)),d.copy={x:e(b.copyX,f.x),y:e(b.copyY,f.y),w:e(b.copyWidth,f.w),h:e(b.copyHeight,f.h)},d.currentCopy={flag:!1},d.redraw=!0,d},a.Frame.prototype.setCorners=function(b){var c,d,e,f,g,h,i,j,k;for(b=a.safeObject(b),d=["topLeft","topRight","bottomRight","bottomLeft"],e=["tlx","trx","brx","blx"],f=["tly","try","bry","bly"],i=a.makeFramePoint,j=a.xtGet,k=this.cornersDataArrayOrder,c=0;4>c;c++)h={},g=d[c],this[g]||(this[g]=i({name:this.name+"_"+g,host:this.name})),b.cornersData&&Array.isArray(b.cornersData)?(h.data=[j(b.cornersData[k.indexOf(e[c])],this[g].local.x,0),j(b.cornersData[k.indexOf(f[c])],this[g].local.y,0)],this[g].set(h)):b.lockFrameTo?(h.lock=b.lockFrameTo,h.lockCorner=g,this[g].set(h)):(h.path=j(b[g+"Path"],this[g].path),h.pathPlace=j(b[g+"PathPlace"],this[g].pathPlace),h.deltaPathPlace=j(b[g+"DeltaPathPlace"],this[g].deltaPathPlace),h.pathSpeedConstant=j(b[g+"PathSpeedConstant"],this[g].pathSpeedConstant),h.pivot=j(b[g+"Pivot"],this[g].pivot),h.lockX=j(b[g+"LockX"],this[g].lockX),h.lockY=j(b[g+"LockY"],this[g].lockY),this[g].set(h));return this},a.Frame.prototype.checkCorners=function(){var a,b,c=["topLeft","topRight","bottomRight","bottomLeft"],d=!1;for(a=0;4>a;a++)b=c[a],(this.lockFrameTo||this.pivot||this.path||this[b].pivot||this[b].path)&&this[b].setLocal(),this[b].changed&&(d=!0);return d},a.Frame.prototype.setEngine=function(b){var c,d,e=this.engine;return b.lineWidth&&(e.lineWidth=b.lineWidth),b.lineCap&&(e.lineCap=b.lineCap),b.lineJoin&&(e.lineJoin=b.lineJoin),b.lineDash&&(e.mozDash=b.lineDash,e.lineDash=b.lineDash,e.setLineDash&&e.setLineDash(b.lineDash)),b.lineDashOffset&&(e.mozDashOffset=b.lineDashOffset,e.lineDashOffset=b.lineDashOffset),b.miterLimit&&(e.miterLimit=b.miterLimit),b.shadowOffsetX&&(e.shadowOffsetX=b.shadowOffsetX),b.shadowOffsetY&&(e.shadowOffsetY=b.shadowOffsetY),b.shadowBlur&&(e.shadowBlur=b.shadowBlur),b.shadowColor&&(e.shadowColor=b.shadowColor),b.strokeStyle&&(c=a.design[b.strokeStyle],a.xt(c)?(a.contains(["Gradient","RadialGradient","Pattern"],c.type)&&c.update(this.name,a.group[this.group].cell),d=c.getData()):d=b.strokeStyle,this.engine.strokeStyle=d),this},a.Frame.prototype.setDestinationEngine=function(b,c){var d,e,f=a.ctx[c];return f.lineWidth!=this.lineWidth&&(b.lineWidth=this.lineWidth,f.lineWidth=this.lineWidth),f.lineCap!=this.lineCap&&(b.lineCap=this.lineCap,f.lineCap=this.lineCap),f.lineJoin!=this.lineJoin&&(b.lineJoin=this.lineJoin,f.lineJoin=this.lineJoin),f.lineDash!=this.lineDash&&(b.mozDash=this.lineDash,b.lineDash=this.lineDash,b.setLineDash&&b.setLineDash(this.lineDash),f.lineDash=this.lineDash),f.lineDashOffset!=this.lineDashOffset&&(b.mozDashOffset=this.lineDashOffset,b.lineDashOffset=this.lineDashOffset,f.lineDashOffset=this.lineDashOffset),f.miterLimit!=this.miterLimit&&(b.miterLimit=this.miterLimit,f.miterLimit=this.miterLimit),f.shadowOffsetX!=this.shadowOffsetX&&(b.shadowOffsetX=this.shadowOffsetX,f.shadowOffsetX=this.shadowOffsetX),f.shadowOffsetY!=this.shadowOffsetY&&(b.shadowOffsetY=this.shadowOffsetY,f.shadowOffsetY=this.shadowOffsetY),f.shadowBlur!=this.shadowBlur&&(b.shadowBlur=this.shadowBlur,f.shadowBlur=this.shadowBlur),f.shadowColor!=this.shadowColor&&(b.shadowColor=this.shadowColor,f.shadowColor=this.shadowColor),f.strokeStyle!=this.strokeStyle&&(a.xt(a.design[this.strokeStyle])?(d=a.design[this.strokeStyle],a.contains(["Gradient","RadialGradient","Pattern"],d.type)&&d.update(this.name,a.group[this.group].cell),e=d.getData()):e=this.strokeStyle,b.strokeStyle=e,f.strokeStyle=this.strokeStyle),this},a.Frame.prototype.lockOn=function(b){var c,d,e,f,g,h=a.safeObject,i=this.lockFrameTo,j=a.xtGet(h(a.stack)[i],h(a.pad)[i],h(a.element)[i],!1),k=["topLeft","topRight","bottomRight","bottomLeft"];if(j||(d=a.pad[a.cell[a.group[this.group].cell].pad].group,d&&(e=a.stack[d],f=document.createElement("div"),f.id=i,document.body.appendChild(f),j=e.addElementById(i),j.set({translateZ:e.get("translateZ")-2}),this.currentFrame=j)),j){if(!j.topLeft)for(j.addCornerTrackers(),g=0;4>g;g++)c=k[g],this[c].local&&(this[c].local=j[c]);this.setLockElementAttributes(b),j.set(this.lockElementAttributes)}},a.Frame.prototype.lockElementAttributesList=["start","startX","startY","handle","handleX","handleY","deltaStart","deltaStartX","deltaStartY","deltaHandle","deltaHandleX","deltaHandleY","width","height","scale","deltaScale","deltaRoll","deltaPitch","deltaYaw","roll","pitch","yaw","includeCornerTrackers","pivot","path","pathPlace","deltaPathPlace","pathSpeedConstant","translate","translateX","translateY","translateZ","mouseIndex","cursor"],a.Frame.prototype.setLockElementAttributes=function(b){var c,d,e,f=Object.keys(b),g=this.lockElementAttributesList,h=a.contains,i=this.lockElementAttributes;for(d=0,e=f.length;e>d;d++)c=f[d],h(g,c)&&(i[c]=b[c]);return this},a.Frame.prototype.forceStamp=function(a,b,c){var d=this.visibility;return this.visibility=!0,this.stamp(a,c),this.visibility=d,this},a.Frame.prototype.stamp=function(b,c,d){var e,f,g,h;return this.visibility&&(e=d?d:a.group[this.group].cell,f=e.name,g=a.context[f],h=b?b:this.method,this.redrawCanvas(),this[h](g,f,e),this.stampFilter(g,f,e)),this},a.Frame.prototype.filtersEntityInit=function(b){a.Entity.prototype.filtersEntityInit.call(this,b)},a.Frame.prototype.stampFilter=function(b,c,d){a.Entity.prototype.stampFilter.call(this,b,c,d)},a.Frame.prototype.stampFilterDefault=function(b,c,d,e){return a.Entity.prototype.stampFilterDefault.call(this,b,c,d,e)},a.Frame.prototype.stampFilterDimensionsActions=a.Entity.prototype.stampFilterDimensionsActions,a.Frame.prototype.redrawCanvas=function(){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W=(a.xtGet,this.redraw||this.checkCorners());if(this.redraw=!1,W){if(V=a.xta,this.checkCorners(),b=this.topLeft,c=this.topRight,d=this.bottomRight,e=this.bottomLeft,V(b,c,d,e)&&(f=b.local,g=c.local,h=d.local,i=e.local,V(f,g,h,i)&&(j=f.x,k=f.y,l=g.x,m=g.y,n=h.x,o=h.y,p=i.x,q=i.y,r=Math.min,s=Math.max,t=Math.ceil,u=Math.floor,v=r.apply(Math,[j,l,n,p]),w=r.apply(Math,[k,m,o,q]),x=s.apply(Math,[j,l,n,p]),y=s.apply(Math,[k,m,o,q]),z=x-v||1,A=y-w||1,B=s.apply(Math,[z,A]),C=t(B),D=u(B),E=a.xtGet(a.asset[this.source],a.canvas[this.source],!1),Q=a.work.cv,R=a.work.cvx,S=this.getPosition,T=this.interferenceFactor,U=this.cell,this.width=z,this.localWidth=z,this.height=A,this.localHeight=A,this.referencePoint.x=v,this.referencePoint.y=w,E&&a.contains(["fill","drawFill","fillDraw","sinkInto","floatOver"],this.method)))){for(P=this.currentCopy,P.flag||this.updateCurrentCopy(E),U.width=t(z),U.height=t(A),Q.width=C,Q.height=C,R.drawImage(E,P.x,P.y,P.w,P.h,0,0,D,D),F=0;D>=F;F++)M=F/D,G=S(j,p,M)-v,H=S(k,q,M)-w,I=S(l,n,M)-v,J=S(m,o,M)-w,K=this.getLength(G,H,I,J),L=this.getAngle(G,H,I,J),this.setEasel(G,H,L),this.engine.drawImage(Q,0,F,D,1,0,0,K,1),this.resetEasel();for(N=t(z),O=t(A),F=0;F<this.interferenceLoops;F++)N=t(N*T),O=t(O*T),Q.width=N,Q.height=O,R.drawImage(U,0,0,U.width,U.height,0,0,N,O),this.engine.drawImage(Q,0,0,N,O,0,0,U.width,U.height);this.redraw=!1}this.maxDimensions.flag=!0}return this},a.Frame.prototype.updateCurrentCopy=function(b){var c,d,e,f,g=this.copy,h=this.currentCopy,i=this.numberConvert,j=a.xtGet;b&&(c=j(b.actualWidth,b.width),d=j(b.actualHeight,b.height),h.x=g.x.substring?i(g.x,c):g.x,h.y=g.y.substring?i(g.y,d):g.y,h.w=g.w.substring?i(g.w,c):g.w,h.h=g.h.substring?i(g.h,d):g.h,h.x=h.x<0?0:h.x,h.y=h.y<0?0:h.y,h.w=h.w<1?1:h.w,h.h=h.h<1?1:h.h,e=c-h.x,f=d-h.y,h.w=h.w>e?e:h.w,h.h=h.h>f?f:h.h,h.flag=!0)},a.Frame.prototype.getPosition=function(a,b,c){return(b-a)*c+a},a.Frame.prototype.getLength=function(a,b,c,d){return Math.sqrt(Math.pow(a-c,2)+Math.pow(b-d,2))},a.Frame.prototype.getAngle=function(a,b,c,d){return Math.atan2(b-d,a-c)},a.Frame.prototype.setEasel=function(a,b,c){var d=Math.cos(c),e=Math.sin(c);this.engine.setTransform(-d,-e,e,-d,a,b)},a.Frame.prototype.resetEasel=function(){this.engine.setTransform(1,0,0,1,0,0)},a.Frame.prototype.correctCoordinates=a.Position.prototype.correctCoordinates,a.Frame.prototype.pickupEntity=function(b){var c=this.currentFrame;return c&&(c.pickupEntity(b),this.oldPivot=this.pivot,this.pivot="mouse",a.group[this.group].resort=!0),this},a.Frame.prototype.dropEntity=function(b){var c=this.currentFrame;return c&&(c.dropEntity(b),this.pivot=this.oldPivot,delete this.oldPivot,a.group[this.group].resort=!0),this},a.Frame.prototype.clearShadow=function(a,b,c){return(this.shadowOffsetX||this.shadowOffsetY||this.shadowBlur)&&c.clearShadow(),this},a.Frame.prototype.prepareStamp=function(a,b,c){this.setDestinationEngine(a,b,c),a.setTransform(1,0,0,1,0,0)},a.Frame.prototype.drawPath=function(b){var c=this.topLeft.local,d=this.topRight.local,e=this.bottomRight.local,f=this.bottomLeft.local;return a.xta(c,d,e,f)&&(b.beginPath(),b.moveTo(c.x,c.y),b.lineTo(d.x,d.y),b.lineTo(e.x,e.y),b.lineTo(f.x,f.y),b.closePath()),this},a.Frame.prototype.drawImage=function(a){var b=this.referencePoint;return a.drawImage(this.cell,b.x,b.y),this},a.Frame.prototype.clip=function(a,b,c){return this.prepareStamp(a,b,c),this.drawPath(a,b,c),a.clip(),this},a.Frame.prototype.clear=function(b,c,d){var e=a.ctx[c];return this.prepareStamp(b,c,d),this.drawPath(b,c,d),b.globalCompositeOperation="destination-out",b.fillStyle="#000000",b.strokeStyle="#000000",b.fill(),b.stroke(),b.fillStyle=e.get("fillStyle"),b.strokeStyle=e.get("strokeStyle"),b.globalCompositeOperation=e.get("globalCompositeOperation"),this},a.Frame.prototype.clearWithBackground=function(b,c,d){var e=a.ctx[c],f=a.cell[c].get("backgroundColor");return this.prepareStamp(b,c,d),this.drawPath(b,c,d),b.globalCompositeOperation="destination-out",b.fillStyle=f,b.strokeStyle=f,b.fill(),b.stroke(),b.fillStyle=e.get("fillStyle"),b.strokeStyle=e.get("strokeStyle"),b.globalCompositeOperation=e.get("globalCompositeOperation"),this},a.Frame.prototype.draw=function(a,b,c){return this.prepareStamp(a,b,c),this.drawPath(a,b,c),a.stroke(),this},a.Frame.prototype.fill=function(a,b,c){return this.prepareStamp(a,b,c),this.drawImage(a,b,c),this},a.Frame.prototype.drawFill=function(a,b,c){return this.prepareStamp(a,b,c),this.drawPath(a,b,c),a.stroke(),this.clearShadow(a,b,c),this.drawImage(a,b,c),this},a.Frame.prototype.fillDraw=function(a,b,c){return this.prepareStamp(a,b,c),this.drawImage(a,b,c),this.drawPath(a,b,c),this.clearShadow(a,b,c),a.stroke(),this},a.Frame.prototype.sinkInto=function(a,b,c){return this.prepareStamp(a,b,c),this.drawImage(a,b,c),this.drawPath(a,b,c),a.stroke(),this},a.Frame.prototype.floatOver=function(a,b,c){return this.prepareStamp(a,b,c),this.drawPath(a,b,c),a.stroke(),this.drawImage(a,b,c),this},a.Frame.prototype.none=function(a,b,c){return this.prepareStamp(a,b,c),this.drawPath(a,b,c),this},a.Frame.prototype.checkHit=function(b){b=a.safeObject(b);var c,d,e=a.xt(b.tests)?b.tests:[b.x||!1,b.y||!1],f=!1,g=a.work.cvx;for(g.setTransform(1,0,0,1,0,0),this.drawPath(g),c=0,d=e.length;d>c;c+=2)if(f=g.isPointInPath(e[c],e[c+1])){b.x=e[c],b.y=e[c+1];break}return f?b:!1},a.Frame.prototype.getMaxDimensions=function(b){var c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u=Math.min,v=Math.max,w=Math.floor,x=Math.ceil,y=a.isBetween;return c=this.topLeft,d=this.topRight,e=this.bottomRight,f=this.bottomLeft,b=b&&"Cell"===b.type?b:a.cell[a.group[this.group].cell],a.xta(c,d,e,f)?(g=c.local,h=d.local,i=e.local,j=f.local,o=this.lineWidth/2+1,l=w(u.apply(Math,[g.x,h.x,i.x,j.x])-o),k=w(u.apply(Math,[g.y,h.y,i.y,j.y])-o),n=x(v.apply(Math,[g.x,h.x,i.x,j.x])+o),m=x(v.apply(Math,[g.y,h.y,i.y,j.y])+o)):(p=a.safeObject(b.pasteData),l=w(p.x||0),k=w(p.y||0),n=x(p.x+p.w||1),m=x(p.y+p.h||1)),q=b.actualWidth,r=b.actualHeight,s=q/2,t=r/2,y(k,0,r,!0)||(k=k>t?r:0),y(m,0,r,!0)||(m=m>t?r:0),y(l,0,q,!0)||(l=l>s?q:0),y(n,0,q,!0)||(n=n>s?q:0),this.maxDimensions.top=k,this.maxDimensions.bottom=m,this.maxDimensions.left=l,this.maxDimensions.right=n,this.maxDimensions.flag=!1,this.maxDimensions},a.Entity.prototype.stampFilterActions&&(a.Frame.prototype.stampFilterActions=a.Entity.prototype.stampFilterActions),a}(scrawl);