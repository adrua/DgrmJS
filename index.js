!function(){"use strict";function t(t,e){if(!t)return null;let n;for(const i of t)e&&!e(i)||(n=i);return n}function e(t,e){if(!t)return!1;for(const n of t)if(!e||e(n))return!0;return!1}function n(t,e){if(!t.stateHas(e)){const n=t.stateGet();t.update({state:n.add(e)})}}function i(t,e){if(t.stateHas(e)){const s=t.stateGet();t.update({state:(n=s,i=e,n.delete(i),n)})}var n,i}function s(t){const e=t.shape.positionGet(),n=t.innerPosition;return{templateKey:"connect-end",position:{x:e.x+n.x,y:e.y+n.y},postionIsIntoCanvas:!0,rotate:"out"===t.connectorType?"right"===t.dir?0:"left"===t.dir?180:"bottom"===t.dir?90:270:"right"===t.dir?180:"left"===t.dir?0:"bottom"===t.dir?270:90}}class o{constructor(t){this.t=t}add(t,e){const i=this.t.append("path",{templateKey:"path",start:{position:o.o(t),dir:t.dir},end:{position:o.o(e),dir:e.dir?e.dir:o.h(t.dir)}});i.start=t,i.end=e,n(e,"connected"),o.l(t.shape,i),o.l(e.shape,i)}replaceEnd(s,a){const h=t(s.shape.connectedPaths,(t=>t.end===s));h.update({end:{position:o.o(a),dir:a.dir?a.dir:s.dir}}),h.end=a,s.shape!==a.shape&&(h.start.shape!==s.shape&&s.shape.connectedPaths.delete(h),o.l(a.shape,h)),e(s.shape.connectedPaths,(t=>t.start===s||t.end===s))||i(s,"connected"),n(a,"connected")}updatePosition(t){if(!e(t.connectedPaths))return;const n=t.positionGet();for(const e of t.connectedPaths)e.update({start:e.start.shape===t?{position:{x:n.x+e.start.innerPosition.x,y:n.y+e.start.innerPosition.y}}:null,end:e.end.shape===t?{position:{x:n.x+e.end.innerPosition.x,y:n.y+e.end.innerPosition.y}}:null})}deleteByShape(t){if(e(t.connectedPaths))for(const e of t.connectedPaths)e.end.shape.connectedPaths.delete(e),i(e.end,"connected"),e.start.shape.connectedPaths.delete(e),i(e.start,"connected"),e.end.shape.connectable&&this.t.delete(e.end.shape),this.t.delete(e)}startConnectorGet(e){return t(e.shape.connectedPaths,(t=>t.end===e)).start}static l(t,e){t.connectedPaths||(t.connectedPaths=new Set),t.connectedPaths.add(e)}static o(t){const e=t.shape.positionGet();return{x:e.x+t.innerPosition.x,y:e.y+t.innerPosition.y}}static h(t){switch(t){case"bottom":return"top";case"top":return"bottom";case"left":return"right";case"right":return"left"}}}class a extends EventTarget{constructor(t,e){super(),this.t=t.on("pointermove",this).on("pointerdown",this).on("pointerup",this).on("pointerenter",this).on("pointerleave",this),this.p=e}on(t,e){return this.addEventListener(t,e),this}shapeAdd(t){return this.t.append("shape",t)}shapeDel(t){this.p.deleteByShape(t),this.t.delete(t)}shapeConnect(t){this.p.add(t.start.shape.connectors.get(t.start.connector),t.end.shape.connectors.get(t.end.connector))}handleEvent(t){switch(t.type){case"pointermove":this.u&&(n(this.u,"disabled"),this.u.update({position:{x:this.v.x+t.detail.clientX,y:this.v.y+t.detail.clientY}}),this.p.updatePosition(this.u));break;case"pointerdown":switch(t.detail.target.type){case"canvas":case"shape":this.shapeSetMoving(t.detail.target,{x:t.detail.clientX,y:t.detail.clientY});break;case"connector":this.g(t)}break;case"pointerup":"connector"===t.detail.target.type&&this.m(t),this.k(),this.H();break;case"pointerenter":this.u&&this.u.connectable&&("connector"===t.detail.target.type||"shape"===t.detail.target.type)&&this.M(t.detail.target);break;case"pointerleave":this.H()}}g(t){switch(t.detail.target.connectorType){case"out":{const e=this.shapeAdd(s(t.detail.target));this.shapeSetMoving(e,{x:t.detail.clientX,y:t.detail.clientY}),this.p.add(t.detail.target,e.defaultInConnector);break}case"in":if(t.detail.target.stateGet().has("connected")){if(!this.V("disconnect",{start:this.p.startConnectorGet(t.detail.target),end:t.detail.target}))return;const e=this.shapeAdd(s(t.detail.target));this.shapeSetMoving(e,{x:t.detail.clientX,y:t.detail.clientY}),this.p.replaceEnd(t.detail.target,e.defaultInConnector)}}}m(t){this.u&&this.u.connectable&&"in"===t.detail.target.connectorType&&this.V("connect",{start:this.p.startConnectorGet(this.u.defaultInConnector),end:t.detail.target})&&(this.p.replaceEnd(this.u.defaultInConnector,t.detail.target),this.shapeDel(this.u))}C(t){t!==this._&&(this.V("select",{target:t}),this._&&i(this._,"selected"),t&&n(t,"selected"),this._=t)}shapeSetMoving(t,e){this.u=t;const n=this.u.positionGet();this.v={x:n.x-e.x,y:n.y-e.y},this.C(this.u)}k(){this.u&&i(this.u,"disabled"),this.v=null,this.u=null}M(t){this.$=t,n(t,"hovered"),"connector"===t.type&&n(t.shape,"hovered")}H(){this.$&&(i(this.$,"hovered"),"connector"===this.$.type&&i(this.$.shape,"hovered"),this.$=null)}V(t,e){return this.dispatchEvent(new CustomEvent(t,{cancelable:!0,detail:e}))}}class h{constructor({svgEl:t,start:e,end:n}){this.svgEl=t,this.S=e,this.L=n,this.type="path",this.D()}update(t){t.start&&Object.assign(this.S,t.start),t.end&&Object.assign(this.L,t.end),this.D()}D(){this.svgEl.setAttribute("d",h.O(70,this.S,this.L))}static O(t,e,n){return`M ${e.position.x} ${e.position.y} C ${h.T(e.dir,e.position.x,t)} ${h.G(e.dir,e.position.y,t)}, ${h.T(n.dir,n.position.x,t)} ${h.G(n.dir,n.position.y,t)}, ${n.position.x} ${n.position.y}`}static T(t,e,n){return"right"===t||"left"===t?"right"===t?e+n:e-n:e}static G(t,e,n){return"right"===t||"left"===t?e:"bottom"===t?e+n:e-n}}function r(t,e,n){let i=function(t,e){for(const n of t)if(!e||e(n))return n;return null}(t.transform.baseVal,(t=>t.type===e));return i||(i=(t.ownerSVGElement||n).createSVGTransform(),t.transform.baseVal.appendItem(i)),i}function c(t,e,n){r(t,SVGTransform.SVG_TRANSFORM_TRANSLATE,n).setTranslate(e.x,e.y)}function d(t){const e=r(t,SVGTransform.SVG_TRANSFORM_TRANSLATE).matrix;return{x:e.e,y:e.f}}function l(t,e,n){t.innerHTML=function(t,e,n){return t.split("\n").map(((t,i)=>`<tspan x="${e}" dy="${0===i?".4em":`${n}px`}" ${0===t.length?'visibility="hidden"':""}>${0===t.length?".":function(t){return t.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}(t).replaceAll(" ","&nbsp;")}</tspan>`)).join("")}(e,t.x?.baseVal[0]?.value??0,n.lineHeight),null!=n.verticalMiddle&&(t.y.baseVal[0].value=n.verticalMiddle-t.getBBox().height/2)}class p{constructor({svgEl:t,type:e=null,connectable:n=null,defaultInConnector:i=null}){this.B=new Set,this.svgEl=t,this.type=e||"shape",this.connectable=n,this.defaultInConnector=i,this.connectors=new Map}on(t,e){return this.svgEl.addEventListener(t,e),this}stateHas(t){return this.B.has(t)}stateGet(){return new Set(this.B)}positionGet(){return d(this.svgEl)}update(t){t.position&&c(this.svgEl,t.position),t.rotate&&function(t,e,n){r(t,SVGTransform.SVG_TRANSFORM_ROTATE,n).setRotate(e,0,0)}(this.svgEl,t.rotate),t.props&&p.A(this.svgEl,t.props),t.state&&(this.B=t.state,this.B.has("selected")?this.svgEl.classList.add("selected"):this.svgEl.classList.remove("selected"),this.B.has("hovered")?this.svgEl.classList.add("hover"):this.svgEl.classList.remove("hover"),this.B.has("disabled")?this.svgEl.style.pointerEvents="none":this.svgEl.style.pointerEvents="auto")}static A(t,e){Object.keys(e).forEach((n=>{const i="root"===n?t:t.querySelector(`[data-key='${n}'`);Object.keys(e[n]).forEach((t=>{if("textContent"===t)s=i,o=e[n][t]?.toString(),l(s,o,u(s));else i.setAttribute(t,e[n][t].toString());var s,o}))}))}}function u(t){return{lineHeight:parseInt(t.getAttribute("data-line-height")),verticalMiddle:t.hasAttribute("data-vertical-middle")?parseInt(t.getAttribute("data-vertical-middle")):null}}class v extends EventTarget{constructor(t,e){super(),this.I=e,this.R=t,this.R.addEventListener("pointermove",this),this.R.addEventListener("pointerdown",this),this.R.addEventListener("pointerup",this),this.U=new WeakMap,this.j=t.querySelector('[data-key="canvas"]'),this.U.set(this.j,new p({svgEl:this.j,type:"canvas"}))}append(t,e){switch(t){case"shape":return this.I({svgCanvas:this.j,svgElemToPresenterObj:this.U,listener:this,createParams:e});case"path":return function({svgCanvas:t,createParams:e}){const n=t.ownerSVGElement.getElementsByTagName("defs")[0].querySelector(`[data-templ='${e.templateKey}']`).cloneNode(!0);return t.append(n),new h({svgEl:n,start:e.start,end:e.end})}({svgCanvas:this.j,createParams:e})}}delete(t){this.U.delete(t.svgEl),t.svgEl.remove()}on(t,e){return this.addEventListener(t,e),this}handleEvent(t){switch(t.stopPropagation(),t.type){case"pointermove":this.P(t),this.V(t,"pointermove",null);break;case"pointerdown":this.V(t,t.type,t.target.hasAttribute("data-no-click")?document.elementsFromPoint(t.clientX,t.clientY)[1]:t.currentTarget);break;case"pointerup":{const e=document.elementsFromPoint(t.clientX,t.clientY);this.V(t,t.type,e[0].hasAttribute("data-no-click")?e[1]:e[0]);break}}}P(t){const e=document.elementFromPoint(t.clientX,t.clientY);e!==this.N&&(this.N&&this.V(t,"pointerleave",this.N),e&&this.V(t,"pointerenter",e),this.N=e)}V(t,e,n){let i=null;n&&(i=this.U.get(n===this.R||n.ownerSVGElement!==this.R?this.j:n),i||(i=this.U.get(n.closest("[data-connect]"))),i||(i=this.U.get(n.closest("[data-templ]")))),this.dispatchEvent(new CustomEvent(e,{detail:{target:i,clientX:t.clientX,clientY:t.clientY}}))}}class f{constructor({svgEl:t,connectorType:e,shape:n,key:i,innerPosition:s,dir:o}){this.F=t,this.B=new Set,this.type="connector",this.connectorType=e,this.shape=n,this.key=i,this.innerPosition=s,this.dir=o}stateHas(t){return this.B.has(t)}stateGet(){return new Set(this.B)}update(t){this.B=t.state,this.B.has("connected")?this.F.classList.add("connected"):this.F.classList.remove("connected"),this.B.has("hovered")?this.F.classList.add("hover"):this.F.classList.remove("hover")}}function g(t,e){return new f({svgEl:t,connectorType:"in"===t.getAttribute("data-connect")?"in":"out",shape:e,key:t.getAttribute("data-key"),innerPosition:m(t),dir:t.getAttribute("data-connect-dir")})}function m(t){if(!t.getAttribute("data-connect-point"))return null;const e=t.getAttribute("data-connect-point").split(",");return{x:parseFloat(e[0]),y:parseFloat(e[1])}}function w(t,e){if(!t||0===t.size)return null;const n={s:[]},i=new Map;for(const e of t)e[1].position=e[0].positionGet(),i.set(e[0],n.s.push(e[1])-1);return e&&e.length>0&&(n.c=e.map((t=>({s:{i:i.get(t.start.shape),c:t.start.key},e:{i:i.get(t.end.shape),c:t.end.key}})))),JSON.stringify(n)}function x(t,e,n,i,s){const o=t.getBBox(),a=o.width+20;e.width.baseVal.value=a+2*i+2,e.x.baseVal.value=o.x-i-("center"===s?10:0),e.height.baseVal.value=o.height+2*i+3,e.y.baseVal.value=o.y-i,n.style.width=`${a}px`,n.style.height=`${o.height}px`}class y{constructor(t,e){this.X=t,this.X.svgEl.addEventListener("click",this),this.K=Object.assign({},e),this.svgEl=this.X.svgEl,this.type=this.X.type,this.connectable=this.X.connectable,this.defaultInConnector=this.X.defaultInConnector,this.connectors=this.X.connectors}stateHas(t){return this.X.stateHas(t)}stateGet(){return this.X.stateGet()}positionGet(){return this.X.positionGet()}on(t,e){return this.X.on(t,e),this}update(t){t.position&&(this.Y=!1),t.props&&(this.K=Object.assign({},t.props)),t.state&&(t.state.has("selected")&&!this.stateGet().has("selected")&&(this.Y=!0,this.J()),this.q(),this.W()),this.X.update(t)}handleEvent(t){t.target.hasAttribute("data-no-click")||(t.stopPropagation(),this.Y||(this.Z(t),this.tt(t)),this.Y=!1)}J(){this.svgEl.querySelectorAll("[data-text-for]").forEach((t=>{this.K[t.getAttribute("data-text-for")]?.textContent||t.classList.add("empty")}))}Z(t){if(this.et)return;let e;switch(t.target.tagName){case"tspan":e=this.svgEl.querySelector(`[data-text-for=${t.target.parentElement.getAttribute("data-key")}]`);break;case"text":e=this.svgEl.querySelector(`[data-text-for=${t.target.getAttribute("data-key")}]`);break;default:t.target.getAttribute("data-text-for")&&(e=t.target)}if(e){e.classList.remove("empty");const t=e.getAttribute("data-text-for"),n=this.svgEl.querySelector(`[data-key=${t}]`);this.et=function(t,e,n,i,s){const o=document.createElementNS("http://www.w3.org/2000/svg","foreignObject"),a=document.createElement("textarea");a.style.caretColor=t.getAttribute("fill"),a.value=n,a.oninput=function(){l(t,a.value,e),x(t,o,a,r,h.textAlign),i(a.value)},a.onblur=function(){s(a.value)},a.onpointerdown=function(t){t.stopImmediatePropagation()},o.appendChild(a),t.parentElement.appendChild(o);const h=getComputedStyle(a),r=parseInt(h.padding)+parseInt(h.borderWidth);return x(t,o,a,r,h.textAlign),a.focus(),o}(n,u(n),this.K[t]?.textContent.toString(),(e=>{this.K[t]||(this.K[t]={}),this.K[t].textContent=e,this.svgEl.dispatchEvent(new CustomEvent("update",{detail:{target:this,props:this.K}}))}),(t=>{this.W(),t?e.classList.remove("empty"):e.classList.add("empty")}))}}W(){if(!this.et)return;const t=this.et;this.et=null,t.remove()}tt(t){if(this.nt)return;const e=this.svgEl.getBoundingClientRect(),n=document.createElement("div");n.classList.add("pop-set"),n.style.position="fixed",n.style.top=e.top-35+"px",n.style.left=`${e.left+10}px`,n.innerHTML='<style>.pop-set{position:fixed;padding:10px;box-shadow:0 0 58px 2px rgb(34 60 80 / 20%);border-radius:16px;background-color:rgba(255,255,255,.9)}</style><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M17 6h5v2h-2v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8H2V6h5V3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3zm1 2H6v12h12V8zm-9 3h2v6H9v-6zm4 0h2v6h-2v-6zM9 4v2h6V4H9z" fill="rgba(52,71,103,1)"/></svg>',n.onclick=t=>{this.q(),this.svgEl.dispatchEvent(new CustomEvent("del",{detail:{target:this,props:this.K}}))},document.body.append(n),this.nt=n}q(){if(!this.nt)return;const t=this.nt;this.nt=null,t.remove()}}async function b(t,e,n){return function(t,e,n){let i,s;const o=k(t,e);if(o)i=new DataView(t,0,o.byteOffset-8),s=new DataView(t,o.byteOffset+o.byteLength+4);else{const e=t.byteLength-12;i=new DataView(t,0,e),s=new DataView(t,e)}const a=new DataView(new ArrayBuffer(8));return a.setUint32(0,n.length),a.setUint32(4,e),new Blob([i,a,n,new Uint32Array([0]),s],{type:"image/png"})}(await t.arrayBuffer(),E(e),n)}function k(t,e){const n=new DataView(t,8);let i,s=0,o=n.getUint32(4);for(;1229278788!==o;){if(i=n.getUint32(s),o===e)return new DataView(t,s+16,i);s=s+12+i,o=n.getUint32(s+4)}return null}function E(t){return new DataView((new TextEncoder).encode(t).buffer).getUint32(0)}function H(t,e){const n=t.cloneNode(!0);n.querySelectorAll(".selected").forEach((t=>t.classList.remove("selected")));const i=function(t,e){let n;for(const i of t.querySelectorAll(e)){n||(n={top:1/0,left:1/0,bottom:-1/0,right:-1/0});const t=i.getBoundingClientRect();t.top<n.top&&(n.top=t.top),t.left<n.left&&(n.left=t.left),t.right>n.right&&(n.right=t.right),t.bottom>n.bottom&&(n.bottom=t.bottom)}return n?{x:n.left,y:n.top,height:n.bottom-n.top,width:n.right-n.left}:null}(t,'[data-key="canvas"]'),s=n.querySelector('[data-key="canvas"]'),o=d(s);c(s,{x:-1*i.x+o.x+15,y:-1*i.y+o.y+15}),function(t,e,n,i){const s=new Image;s.width=e.width*n*window.devicePixelRatio,s.height=e.height*n*window.devicePixelRatio,s.onload=function(){const t=document.createElement("canvas");t.width=s.width,t.height=s.height,t.style.width=`${s.width}px`,t.style.height=`${s.height}px`;const n=t.getContext("2d");n.imageSmoothingEnabled=!1,n.drawImage(s,e.x,e.y,e.width,e.height,0,0,s.width,s.height),URL.revokeObjectURL(s.src),t.toBlob(i,"image/png")},t.width.baseVal.newValueSpecifiedUnits(SVGLength.SVG_LENGTHTYPE_PX,s.width),t.height.baseVal.newValueSpecifiedUnits(SVGLength.SVG_LENGTHTYPE_PX,s.height),s.src=URL.createObjectURL(new Blob([(new XMLSerializer).serializeToString(t)],{type:"image/svg+xml;charset=utf-8"}))}(n,{x:0,y:0,height:i.height+30,width:i.width+30},3,(async function(t){const n=document.createElement("a");n.download="dgrm.png",n.href=URL.createObjectURL(e?await b(t,"dgRm",(new TextEncoder).encode(e)):t),n.click(),URL.revokeObjectURL(n.href)}))}async function z(t){const e=await async function(t,e){return k(await t.arrayBuffer(),E(e))}(t,"dgRm");return e?(new TextDecoder).decode(e):null}class M extends HTMLElement{connectedCallback(){const t=this.attachShadow({mode:"closed"});t.innerHTML='<style>.menu{overflow-x:auto;padding:0;position:fixed;bottom:15px;left:50%;transform:translateX(-50%);box-shadow:0 0 58px 2px rgba(34,60,80,.2);border-radius:16px;background-color:rgba(255,255,255,.9)}.content{white-space:nowrap;display:flex}[data-cmd]{cursor:pointer}.menu svg{height:42px;display:inline-block;padding:15px 10px;stroke:#344767;stroke-width:2px;fill:#fff;width:42px;min-width:42px}.menu .big{width:62px;min-width:62px}@media only screen and (max-width:700px){.menu{width:100%;border-radius:0;bottom:0;display:flex;flex-direction:column}.content{align-self:center}}</style><div id="menu" class="menu" style="touch-action:none"><div class="content"><svg data-cmd="shapeAdd" data-cmd-arg="circle" style="padding-left:20px"><circle r="20" cx="21" cy="21"></circle></svg> <svg data-cmd="shapeAdd" data-cmd-arg="rect" class="big"><rect x="1" y="1" width="60" height="40" rx="15" ry="15"></rect></svg> <svg data-cmd="shapeAdd" data-cmd-arg="rhomb" class="big"><g transform="translate(1,1)"><path d="M0 20 L30 0 L60 20 L30 40 Z" stroke-width="2" stroke-linejoin="round"></path></g></svg> <svg data-cmd="shapeAdd" data-cmd-arg="text"><text x="5" y="40" font-size="52px" fill="#344767" stroke-width="0">T</text></svg></div></div>';const e=t.getElementById("menu");e.querySelectorAll('[data-cmd="shapeAdd"]').forEach((t=>t.addEventListener("pointerdown",this))),e.addEventListener("pointerleave",this),e.addEventListener("pointerup",this),e.addEventListener("pointermove",this)}on(t,e){return this.addEventListener(t,e),this}handleEvent(t){switch(t.type){case"pointerdown":this.it=!1,this.st=!1,this.ot=t.currentTarget.getAttribute("data-cmd-arg"),this.at=document.elementFromPoint(t.clientX,t.clientY),this.N=this.at;break;case"pointerup":this.it=!1,this.st=!1,this.ot=null;break;case"pointermove":this.ht(t),!this.it&&this.st&&this.rt("shapeMove",{clientX:t.clientX,clientY:t.clientY});break;case"pointerleave":this.it=!0,this.ct(t)}}ht(t){if(!this.ot)return;const e=document.elementFromPoint(t.clientX,t.clientY);e!==this.N&&(this.at===this.N&&this.ct(t),this.N=e)}ct(t){this.ot&&(this.rt("shapeDragOut",{shape:this.ot,clientX:t.clientX,clientY:t.clientY}),this.ot=null,this.st=!0)}rt(t,e){this.dispatchEvent(new CustomEvent(t,{bubbles:!0,composed:!0,detail:e}))}}customElements.define("ap-menu-shape",M);class V extends HTMLElement{connectedCallback(){const t=this.attachShadow({mode:"closed"});t.innerHTML='<style>.menu{position:fixed;top:15px;left:15px;cursor:pointer}.options{position:fixed;padding:15px;box-shadow:0 0 58px 2px rgb(34 60 80 / 20%);border-radius:16px;background-color:rgba(255,255,255,.9);top:0;left:0}.options a,.options div{color:#0d6efd;cursor:pointer;margin:10px 0;display:flex;align-items:center;line-height:25px;text-decoration:none}.options a svg,.options div svg{margin-right:10px}</style><svg class="menu" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M3 4h18v2H3V4zm0 7h18v2H3v-2zm0 7h18v2H3v-2z" fill="rgba(52,71,103,1)"/></svg><div class="options" style="visibility:hidden"><svg class="menu" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M3 4h18v2H3V4zm0 7h18v2H3v-2zm0 7h18v2H3v-2z" fill="rgba(52,71,103,1)"/></svg><div data-cmd="dgrmNew" style="padding-top:30px"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M9 2.003V2h10.998C20.55 2 21 2.455 21 2.992v18.016a.993.993 0 0 1-.993.992H3.993A1 1 0 0 1 3 20.993V8l6-5.997zM5.83 8H9V4.83L5.83 8zM11 4v5a1 1 0 0 1-1 1H5v10h14V4h-8z" fill="rgba(52,71,103,1)"/></svg>New diagram</div><div data-cmd="dgrmOpen"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M3 21a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h7.414l2 2H20a1 1 0 0 1 1 1v3h-2V7h-7.414l-2-2H4v11.998L5.5 11h17l-2.31 9.243a1 1 0 0 1-.97.757H3zm16.938-8H7.062l-1.5 6h12.876l1.5-6z" fill="rgba(52,71,103,1)"/></svg>Open diagram image</div><div data-cmd="dgrmSave"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M3 19h18v2H3v-2zm10-5.828L19.071 7.1l1.414 1.414L12 17 3.515 8.515 4.929 7.1 11 13.17V2h2v11.172z" fill="rgba(52,71,103,1)"/></svg>Save diagram image</div><div data-cmd="dgrmGenerateLink"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M13.06 8.11l1.415 1.415a7 7 0 0 1 0 9.9l-.354.353a7 7 0 0 1-9.9-9.9l1.415 1.415a5 5 0 1 0 7.071 7.071l.354-.354a5 5 0 0 0 0-7.07l-1.415-1.415 1.415-1.414zm6.718 6.011l-1.414-1.414a5 5 0 1 0-7.071-7.071l-.354.354a5 5 0 0 0 0 7.07l1.415 1.415-1.415 1.414-1.414-1.414a7 7 0 0 1 0-9.9l.354-.353a7 7 0 0 1 9.9 9.9z" fill="rgba(52,71,103,1)"/></svg>Copy link to diagram</div><a href="https://www.patreon.com/dgrm" target="_blank"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0H24V24H0z"/><path d="M12.001 4.529c2.349-2.109 5.979-2.039 8.242.228 2.262 2.268 2.34 5.88.236 8.236l-8.48 8.492-8.478-8.492c-2.104-2.356-2.025-5.974.236-8.236 2.265-2.264 5.888-2.34 8.244-.228zm6.826 1.641c-1.5-1.502-3.92-1.563-5.49-.153l-1.335 1.198-1.336-1.197c-1.575-1.412-3.99-1.35-5.494.154-1.49 1.49-1.565 3.875-.192 5.451L12 18.654l7.02-7.03c1.374-1.577 1.299-3.959-.193-5.454z" fill="rgba(255,66,77,1)"/></svg>Donate</a></div>',t.querySelectorAll("svg").forEach((t=>t.addEventListener("click",this))),t.querySelectorAll("[data-cmd]").forEach((t=>t.addEventListener("click",this))),this.dt=t.querySelector(".options")}on(t,e){return this.addEventListener(t,e),this}handleEvent(t){this.lt(),"menu"!==t.currentTarget.className&&this.dispatchEvent(new CustomEvent(t.currentTarget.getAttribute("data-cmd"),{bubbles:!0,composed:!0}))}lt(){this.dt.style.visibility="visible"===this.dt.style.visibility?"hidden":"visible"}}customElements.define("ap-file-options",V);const C=document.getElementById("tip");document.getElementById("file-options").on("dgrmNew",R).on("dgrmGenerateLink",(async function(){if(!S.size)return void alert("Nothing to save");const t=new URL(window.location.href);t.hash=encodeURIComponent(w(S,T)),await navigator.clipboard.writeText(t.toString()),alert("Link to diagram copied to clipboard")})).on("dgrmSave",(function(){if(!S.size)return void alert("Nothing to save");H(_,w(S,T))})).on("dgrmOpen",(function(){!function(t){const e=document.createElement("input");e.type="file",e.multiple=!1,e.accept=".png",e.onchange=async function(){e.files?.length&&t(await z(e.files[0]))},e.click()}((t=>{t?j(t):alert(U)}))})),document.getElementById("menu-shape").on("shapeDragOut",(function(t){const e=_.querySelector(`[data-templ='${t.detail.shape}']`).getAttribute("data-center").split(",");L={x:parseFloat(e[0]),y:parseFloat(e[1])},D=G({templateKey:t.detail.shape,position:{x:t.detail.clientX-L.x,y:t.detail.clientY-L.y},detail:"Title"}),$.shapeSetMoving(D,{x:t.detail.clientX,y:t.detail.clientY});const n=D.positionGet();O={x:t.detail.clientX-L.x-n.x,y:t.detail.clientY-L.y-n.y}})).on("shapeMove",(function(t){D.update({position:{x:t.detail.clientX-L.x-O.x,y:t.detail.clientY-L.y-O.y}})}));const _=document.getElementById("diagram"),$=function(t,e){const n=new v(t,(function(t){let n=function(t,e){const n=t.ownerSVGElement.getElementsByTagName("defs")[0].querySelector(`[data-templ='${e.templateKey}']`).cloneNode(!0);t.append(n);const i=new p({svgEl:n});if(!e.postionIsIntoCanvas){const n=d(t);e.position.x-=n.x,e.position.y-=n.y}return i.update(e),i}(t.svgCanvas,t.createParams);return e&&(n=e(n,t)),t.svgElemToPresenterObj.set(n.svgEl,n),function(t,e,n){n.connectable="true"===n.svgEl.getAttribute("data-connectable"),m(n.svgEl)&&(n.defaultInConnector=g(n.svgEl,n)),n.svgEl.addEventListener("pointerdown",t),n.svgEl.querySelectorAll("[data-connect]").forEach((i=>{const s=g(i,n);i.addEventListener("pointerdown",t),e.set(i,s),n.connectors.set(s.key,s)})),e.set(n.svgEl,n)}(t.listener,t.svgElemToPresenterObj,n),n}));return new a(n,new o(n))}(_,(function(t,e){return new y(t,e.createParams.props).on("update",A).on("del",I)})).on("connect",(function(t){T.push(t.detail)})).on("disconnect",(function(t){T.splice(T.findIndex((e=>{return n=e,i=t.detail,n.start.shape===i.start.shape&&n.start.key===i.start.key&&n.end.shape===i.end.shape&&n.end.key===i.end.key;var n,i})),1)})),S=new Map;let L,D,O,T=[];function G(t){C&&C.remove(),t.props={text:{textContent:t.detail}};const e=$.shapeAdd(t);return S.set(e,{templateKey:t.templateKey,detail:t.detail}),e}function B(t){S.delete(t),T=T.filter((e=>e.start.shape!==t&&e.end.shape!==t)),$.shapeDel(t)}function A(t){S.get(t.detail.target).detail=t.detail.props.text.textContent}function I(t){B(t.detail.target)}function R(){C&&C.remove(),S.forEach(((t,e)=>B(e)))}const U="File cannot be read. Use the exact image file you got from the application.";function j(t){R(),P(t)}function P(t){const e=JSON.parse(t);if(e.s&&e.s.length>0){const t=[];for(const n of e.s)t.push(G(n));if(e.c&&e.c.length>0)for(const n of e.c)$.shapeConnect({start:{shape:t[n.s.i],connector:n.s.c},end:{shape:t[n.e.i],connector:n.e.c}}),T.push({start:{type:"connector",key:n.s.c,shape:t[n.s.i]},end:{type:"connector",key:n.e.c,shape:t[n.e.i]}})}}_.addEventListener("dragover",(t=>{t.preventDefault()})),_.addEventListener("drop",(async t=>{if(t.preventDefault(),1!==t.dataTransfer?.items?.length||"file"!==t.dataTransfer.items[0].kind||"image/png"!==t.dataTransfer.items[0].type)return void alert(U);const e=await z(t.dataTransfer.items[0].getAsFile());e?j(e):alert(U)})),window.location.hash&&(P(decodeURIComponent(window.location.hash.substring(1))),history.replaceState(null,null," "))}();
