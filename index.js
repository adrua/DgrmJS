!function(){"use strict";const t=(t,n)=>t.querySelector(`[data-key="${n}"]`);function n(t,n){t.style.transform=`translate(${n.x}px, ${n.y}px)`}const e=(t,...n)=>t?.classList.add(...n),i=(t,n)=>t?.classList.remove(n),o=(t,n)=>t?.classList.contains(n);function a(t,n,o,a){n.styles||(n.styles=[]);const s=n.styles.findIndex((t=>t.startsWith(o)));s>-1&&(i(t,n.styles[s]),n.styles.splice(s,1)),n.styles.push(a),e(t,a)}const s=(t,n,e,i)=>t.addEventListener(n,e,{passive:!0,once:i}),c=(t,n,e,i)=>t?.removeEventListener(n,e,{capture:i});function r(t,n,e){t.querySelectorAll(n).forEach((t=>{t.onclick=e}))}const d=(t,n)=>t.currentTarget.getAttribute(n);function l(t,n){const e=document.createElementNS("http://www.w3.org/2000/svg",t);return n&&(e.innerHTML=n),e}function h(t){let n,e=0;for(const i of t.getElementsByTagName("tspan"))for(const t of p(i.getBBox())){const i=Math.abs(t.x)+Math.abs(t.y);e<i&&(n=t,e=i)}return n}const p=t=>[{x:t.x,y:t.y},{x:t.right,y:t.y},{x:t.x,y:t.bottom},{x:t.right,y:t.bottom}];function u(t,n,e){return e<=t?t:t+Math.ceil((e-t)/n)*n}function f(t,n){let e=t.pop();for(;e;)n(e),e=t.pop()}function v(t,n){t.x+=n,t.y+=n}const g=t=>JSON.parse(JSON.stringify(t));const m=Symbol("movementX"),w=Symbol("movementY"),x=Symbol("Canvas");function y(t,n,e,i,o,a,r,d,l){let h,p=!1,u=!1;function f(t){u&&(p||(o(t),u))&&(b(i,e.scale,t),p=!0,a(t))}function v(t){p?r(t):d(t),w(!0)}function g(t){n.contains(t.target)||(w(),l())}function m(){w(),l()}function w(n){c(h,"pointercancel",v),c(h,"pointerup",v),c(h,"pointermove",f),n||(c(t,"pointerdown",g),c(t,"wheel",m)),h=null,p=!1,u=!1}return s(n,"pointerdown",(function(n){!n[$]&&n.isPrimary&&(n[$]=!0,h=n.target,h.setPointerCapture(n.pointerId),s(h,"pointercancel",v,!0),s(h,"pointerup",v,!0),s(h,"pointermove",f),s(t,"wheel",m,!0),s(t,"pointerdown",g),u=!0)})),w}function b(t,n,e){t.x+=e[m]/n,t.y+=e[w]/n}function k(t){return M(t)[0]}function M(t){return document.elementsFromPoint(t.clientX,t.clientY).sort(((t,n)=>{const e=t.getAttribute("data-evt-index"),i=n.getAttribute("data-evt-index");return e===i?0:e>i?-1:1}))}const $=Symbol("processed"),z=Symbol("routeed"),H=(t,n,e)=>({x:(n-t.position.x)/t.scale,y:(e-t.position.y)/t.scale});function L(t,n){const e=n/2;function i(t){const i=Math.round(t/n)*n;return t-i>0?i+e:i-e}t.x=i(t.x),t.y=i(t.y)}function V(t){return{x:t.clientX,y:t.clientY}}function E(t,n){return{id:t.pointerId,pos:V(t),shift:{x:n.position.x-t.clientX,y:n.position.y-t.clientY}}}let B;function S(t){t&&!B?(B=document.createElement("div"),B.style.cssText="z-index: 2; position: fixed; left: 0; top: 0; width:100%; height:100%; background: #fff; opacity: 0",B.innerHTML="<style>@keyframes blnk{0%{opacity:0}50%{opacity:.7}100%{opacity:0}}.blnk{animation:blnk 1.6s linear infinite}</style>",B.classList.add("blnk"),document.body.append(B)):t||(B.remove(),B=null)}function C(t){document.getElementById("diagram").style.pointerEvents=t?"none":"unset",document.getElementById("tip").style.display=t?"unset":"none"}const D="https://dgrm.boyko.tech/api";const T=Symbol("path"),A=Symbol("shape");function P(t){for(;t.firstChild;)(t.firstChild[A]||t.firstChild[T]).del();t[x].move(0,0,1)}function O(t){const n={v:"1.1",s:[]},e=[...t.children];for(const t of e)if(t[A])n.s.push(t[A].data);else{const i=t=>t.shape?{s:e.indexOf(t.shape.shapeEl),k:t.shape.connectorKey}:{p:t.data},o=t[T].data,a={type:0,s:i(o.s),e:i(o.e)};o.styles&&(a.c=o.styles),n.s.push(a)}return n}function U(t,n,e){if("1.1"!==e.v)return alert("Wrong format"),!1;P(t);const i=new Map;function o(e){let o=i.get(e);return o||(o=n[e.type].create(e),t.append(o),i.set(e,o)),o}for(const i of e.s)switch(i.type){case 0:{const a=t=>{return t.p?{data:t.p}:{shape:{shapeEl:(n=t.s,o(e.s[n])),connectorKey:t.k}};var n};t.append(n[0].create({styles:i.c,s:a(i.s),e:a(i.e)}));break}default:o(i)}return!0}class N extends HTMLElement{constructor(t){super(),this.i=t}connectedCallback(){const t=this.i[T].data.styles,n=t=>this.i[T].data.styles?.includes(t)?'class="actv"':"",o=this.attachShadow({mode:"closed"});o.innerHTML=`<style>.ln{display:flex}.ln>*{height:24px;padding:10px;fill-opacity:.3;stroke-opacity:.3}[data-cmd]{cursor:pointer}.actv{fill-opacity:1;stroke-opacity:1}</style><ap-shape-edit id="edit" edit-btn="true"><div class="ln"><svg data-cmd data-cmd-arg="arw-s" ${n("arw-s")} viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M7.828 11H20v2H7.828l5.364 5.364-1.414 1.414L4 12l7.778-7.778 1.414 1.414z" fill="rgb(52,71,103)"/></svg> <svg data-cmd data-cmd-arg="arw-e" ${n("arw-e")} viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z" fill="rgb(52,71,103)"/></svg> <svg data-cmd data-cmd-arg="dash" ${n("dash")} viewBox="0 0 24 24" width="24" height="24"><path d="M 2,11 L 20,11" stroke="rgb(52,71,103)" style="stroke-dasharray:4,3;stroke-width:3"></path></svg></div></ap-shape-edit>`,s(o.getElementById("edit"),"cmd",(t=>{switch(t.detail.cmd){case"style":a(this.i,this.i[T].data,"cl-",t.detail.arg);break;case"del":this.i[T].del();break;case"copy":this.i[T].copy()}})),r(o,"[data-cmd]",(n=>{const o=d(n,"data-cmd-arg"),a=t.indexOf(o);a>-1?(i(this.i,o),t.splice(a,1),i(n.currentTarget,"actv")):(e(this.i,o),t.push(o),e(n.currentTarget,"actv"))}))}}customElements.define("ap-path-settings",N);const R='<svg data-cmd="del" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M17 6h5v2h-2v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8H2V6h5V3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3zm1 2H6v12h12V8zm-9 3h2v6H9v-6zm4 0h2v6h-2v-6zM9 4v2h6V4H9z" fill="rgb(52,71,103)"/></svg>',j='<svg data-cmd="copy" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M7 6V3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-3v3c0 .552-.45 1-1.007 1H4.007A1.001 1.001 0 0 1 3 21l.003-14c0-.552.45-1 1.007-1H7zM5.003 8L5 20h10V8H5.003zM9 6h8v10h2V4H9v2z" fill="rgb(52,71,103)"/></svg>';function F(t,n,e){const i=new Z;return s(i,"cmd",(t=>{switch(t.detail.cmd){case"style":a(e,e[A].data,"cl-",t.detail.arg);break;case"del":e[A].del();break;case"copy":e[A].copy()}})),J(t,n,i)}let I;function J(t,n,e){function i(t,n){I.style.left=`${t}px`,I.style.top=window.scrollY+n-I.getBoundingClientRect().height+"px"}return I=document.createElement("div"),I.style.cssText="position: fixed; box-shadow: 0px 0px 58px 2px rgb(34 60 80 / 20%); border-radius: 16px; background-color: rgba(255,255,255, .9);",I.append(e),document.body.append(I),i(t,n),{position:i,del:()=>{I.remove(),I=null}}}class Z extends HTMLElement{connectedCallback(){const t=this.attachShadow({mode:"closed"});t.innerHTML=`<style>.ln{display:flex}.ln>*{height:24px;padding:10px;cursor:pointer}#prop{padding-bottom:10px}.crcl{width:25px;height:25px;border-radius:50%}</style><div id="pnl"><div id="clr" style="display:none"><div class="ln"><div data-cmd="style" data-cmd-arg="cl-red"><div class="crcl" style="background:#e74c3c"></div></div><div data-cmd="style" data-cmd-arg="cl-orange"><div class="crcl" style="background:#f60"></div></div><div data-cmd="style" data-cmd-arg="cl-green"><div class="crcl" style="background:#19bc9b"></div></div></div><div class="ln"><div data-cmd="style" data-cmd-arg="cl-blue"><div class="crcl" style="background:#1aaee5"></div></div><div data-cmd="style" data-cmd-arg="cl-dblue"><div class="crcl" style="background:#1d809f"></div></div><div data-cmd="style" data-cmd-arg="cl-dgray"><div class="crcl" style="background:#495057"></div></div></div></div><div id="prop" style="display:none"><slot id="slot"></slot></div></div><div class="ln"><svg data-toggle="clr" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M19.228 18.732l1.768-1.768 1.767 1.768a2.5 2.5 0 1 1-3.535 0zM8.878 1.08l11.314 11.313a1 1 0 0 1 0 1.415l-8.485 8.485a1 1 0 0 1-1.414 0l-8.485-8.485a1 1 0 0 1 0-1.415l7.778-7.778-2.122-2.121L8.88 1.08zM11 6.03L3.929 13.1 11 20.173l7.071-7.071L11 6.029z" fill="rgb(52,71,103)"/></svg> <svg data-toggle="prop" ${this.getAttribute("edit-btn")?"":'style="display: none;"'} viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M12.9 6.858l4.242 4.243L7.242 21H3v-4.243l9.9-9.9zm1.414-1.414l2.121-2.122a1 1 0 0 1 1.414 0l2.829 2.829a1 1 0 0 1 0 1.414l-2.122 2.121-4.242-4.242z" fill="rgb(52,71,103)"/></svg> ${j} ${R}</div>`;{const n=t.getElementById("pnl");function e(t){I.style.top=`${I.getBoundingClientRect().top+window.scrollY+t*n.getBoundingClientRect().height}px`}let i;r(t,"[data-toggle]",(n=>{i&&(e(1),K(i,!1));const o=t.getElementById(d(n,"data-toggle"));i!==o?(K(o,!0),e(-1),i=o):i=null}))}r(t,"[data-cmd]",(t=>{this.dispatchEvent(new CustomEvent("cmd",{detail:{cmd:d(t,"data-cmd"),arg:d(t,"data-cmd-arg")}}))}))}}function K(t,n){t.style.display=n?"unset":"none"}function G(n,a){const r=l("g",'<path data-key="outer" d="M0 0" stroke="transparent" stroke-width="20" fill="none"/><path data-key="path" class="path" d="M0 0" stroke="#495057" stroke-width="1.8" fill="none" style="pointer-events:none"/><path data-key="selected" d="M0 0" stroke="transparent" stroke-width="10" fill="none" style="pointer-events:none"/><g data-key="start"><circle data-evt-index="1" class="path-end" r="10" stroke-width="0" fill="transparent"/><path class="path" d="M-7 7 l 7 -7 l -7 -7" stroke="#495057" stroke-width="1.8" fill="none" style="pointer-events:none"></path></g><g data-key="end"><circle data-evt-index="1" class="path-end" r="10" stroke-width="0" fill="transparent"/><path class="path" d="M-7 7 l 7 -7 l -7 -7" stroke="#495057" stroke-width="1.8" fill="none" style="pointer-events:none"></path></g>');e(r,"shpath"),a.s.el=t(r,"start"),a.e.el=t(r,"end"),a.styles=a.styles??["arw-e"];const d=nt(r,"path","outer","selected");function h(){if(!a.s.shape||!a.e.shape){const t=function(t,n){const e=Math.atan2(n.y-t.y,n.x-t.x);return et(e,-.8,.8)?"left":et(e,.8,2.4)?"top":et(e,2.4,3.2)||et(e,-3.2,-2.4)?"right":"bottom"}(a.s.data.position,a.e.data.position);a.e.shape||(a.e.data.dir=t),a.s.shape||(a.s.data.dir=Q(t))}const t=function(t){let n=.5*Math.hypot(t.s.data.position.x-t.e.data.position.x,t.s.data.position.y-t.e.data.position.y);function e(t){return"right"===t.dir||"left"===t.dir?"right"===t.dir?t.position.x+n:t.position.x-n:t.position.x}function i(t){return"right"===t.dir||"left"===t.dir?t.position.y:"bottom"===t.dir?t.position.y+n:t.position.y-n}return n=n>70?70:n<15?15:n,`M ${t.s.data.position.x} ${t.s.data.position.y} C ${e(t.s.data)} ${i(t.s.data)}, ${e(t.e.data)} ${i(t.e.data)}, ${t.e.data.position.x} ${t.e.data.position.y}`}(a);d.forEach((n=>n.setAttribute("d",t))),Y(a.s),Y(a.e)}function p(t){X(t.shape)?.pathDel(r)}function u(t){t.shape&&(t.data=X(t.shape).pathAdd(t.shape.connectorKey,r))}let f,v,g;function m(){i(r,"select"),q(a.s,1),q(a.e,1),f?.del(),f=null,v&&(v(),v=null,r.style.pointerEvents="unset")}const w=y(n.ownerSVGElement,r,n[x].data,{get x(){return a[g]?.data.position.x},set x(t){g&&(a[g].data.position.x=t)},get y(){return a[g]?.data.position.y},set y(t){g&&(a[g].data.position.y=t)}},(t=>{m(),g=a.e.el.contains(t.target)?"e":a.s.el.contains(t.target)?"s":null,g&&(a[g].shape&&(a[g].shape.shapeEl!==a["s"===g?"e":"s"].shape?.shapeEl&&p(a[g]),a[g].shape=null,a[g].data={dir:a[g].data.dir,position:H(n[x].data,t.clientX,t.clientY)}),r.style.pointerEvents="none",v=function(t){let n=null;function a(t){const a=k(t);if(n!==a){o(a,"hovertrack")&&e(a,"hover");let t=!1;o(a?.parentElement,"hovertrack")&&(e(a.parentElement,"hover"),t=!0),i(n,"hover"),n?.parentElement===a?.parentElement&&t||i(n?.parentElement,"hover"),n=a}}return s(t,"pointermove",a),function(){c(t,"pointermove",a),i(n,"hover"),i(n?.parentElement,"hover"),n=null}}(r.parentElement))}),(t=>{g?h():function(t,n,e,i){const o=n=>b(n,t.scale,i);_(n.s,o),_(n.e,o),n.s.shape||n.e.shape||e()}(n[x].data,a,h,t)}),(t=>{if(g){const e=k(t),i=e?.getAttribute("data-connect");i?(a[g].shape={shapeEl:e.parentElement,connectorKey:i},u(a[g])):L(a[g].data.position,n[x].data.cell),h()}else!function(t,n,e){const i=n=>L(n,t.cell);_(n.s,i),_(n.e,i),n.s.shape&&n.e.shape||e()}(n[x].data,a,h);m()}),(function(t){o(r,"select")&&f||(!o(r,"select")||f?(e(r,"select"),q(a.s,2),q(a.e,2)):f=J(t.clientX-10,t.clientY-10,new N(r)))}),m);return r[T]={draw:h,pointerCapture:t=>a.e.el.dispatchEvent(new PointerEvent("pointerdown",t)),del:function(){f?.del(),f=null,w(),p(a.s),p(a.e),r.remove()},data:a,copy:function(){m();const t=G(n,tt(a,n[x].data.cell));return n.append(t),t}},a.styles&&e(r,...a.styles),u(a.s),u(a.e),h(),r}function _(t,n){t.shape?(n(X(t.shape).data.position),X(t.shape).drawPosition()):n(t.data.position)}customElements.define("ap-shape-edit",Z);const X=t=>t?.shapeEl[A];function Y(t){t.el.style.transform=`translate(${t.data.position.x}px, ${t.data.position.y}px) rotate(${W(t.data.dir)}deg)`}function q(t,n){t.el.firstElementChild.setAttribute("data-evt-index",n.toString())}const W=t=>"right"===t?180:"left"===t?0:"bottom"===t?270:90,Q=t=>"left"===t?"right":"right"===t?"left":"top"===t?"bottom":"top";function tt(t,n){const e=g(t);function i(t){v(t.data.position,n),delete t.shape,delete t.el}return i(e.s),i(e.e),e}const nt=(n,...e)=>e.map((e=>t(n,e))),et=(t,n,e)=>n<=t&&t<=e;class it extends HTMLElement{constructor(t){super(),this.o=t}connectedCallback(){const t=this.attachShadow({mode:"closed"});t.innerHTML=`<style>.ln{display:flex}.ln>*{height:24px;padding:10px}[data-cmd]{cursor:pointer}</style><div class="ln">${j} ${R}</div>`,r(t,"[data-cmd]",(t=>this.o(d(t,"data-cmd"))))}}customElements.define("ap-grp-settings",it);const ot="highlight-s",at="highlight-e",st="highlight";function ct(t){i(t,ot),i(t,at)}const rt=t=>e(t,st),dt=(t,n,e,i,o)=>t.x<=i&&i<=t.x+n&&t.y<=o&&o<=t.y+e;function lt(t,n,e){const i=function(t,n){let e=0;return{s:t.split("\n").map(((t,i)=>(e=i,`<tspan x="${n}" dy="${0===i?.41:1}em" ${0===t.length?'visibility="hidden"':""}>${0===t.length?".":function(t){return t.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}(t).replaceAll(" ","&nbsp;")}</tspan>`))).join(""),c:e}}(e||"",t.x?.baseVal[0]?.value??0);t.innerHTML=i.s,t.y.baseVal[0].newValueSpecifiedUnits(t.y.baseVal[0].SVG_LENGTHTYPE_EMS,i.c>0?n-i.c/2:n)}function ht(n,a,s,c,r,d,h){const p=l("g",`${s}\n\t\t${Object.entries(r).map((t=>`<circle data-key="${t[0]}" data-connect="${t[1].dir}" class="hovertrack" data-evt-index="2" r="10" cx="0" cy="0" style="transform:translate(${t[1].position.x}px,${t[1].position.y}px)"/>`)).join()}`),u={el:t(p,"text"),vMid:0};lt(u.el,u.vMid,a.title);const f=function(t,n,a,s,c,r,d,h){let p,u;function f(){p?.dispose(),p=null,u?.del(),u=null}function m(t){a.title=t,r()}const w=h??F,b=function(t,n,a,s,c,r){e(n,"hovertrack");const d=g(s),l=new Set;function h(){n.style.transform=`translate(${a.position.x}px, ${a.position.y}px)`;for(const t in s)d[t].position={x:s[t].position.x+a.position.x,y:s[t].position.y+a.position.y};for(const t of l)t[T].draw()}function p(t){t&&o(n,"highlight")&&r(),i(n,"select"),i(n,"highlight")}const u=y(t.ownerSVGElement,n,t[x].data,a.position,(e=>{p(!0);const i=e.target.getAttribute("data-connect");if(i){u();const o=G(t,{s:{shape:{shapeEl:n,connectorKey:i}},e:{data:{dir:Q(d[i].dir),position:H(t[x].data,e.clientX,e.clientY)}}});n.parentNode.append(o),o[T].pointerCapture(e),l.add(o)}}),h,(n=>{L(a.position,t[x].data.cell),h()}),(t=>{if(!o(n,"highlight"))return o(n,"select")&&!o(n,"highlight")?(i(n,"select"),e(n,"highlight"),void c()):void e(n,"select")}),(()=>p(!0)));return n[A]={pathAdd:function(t,n){return l.add(n),d[t]},pathDel:function(t){l.delete(t)},drawPosition:h,data:a},{drawPosition:h,del:()=>{u();for(const t of l)t[T].del()},unSelect:p}}(t,n,a,s,(()=>{p=function(t,n,e,i,o){let a=l("foreignObject");const s=document.createElement("textarea"),c=()=>function(t,n,e,i,o){const a=t.getBBox(),s=a.width+20;n.width.baseVal.value=s+2*i+2,n.x.baseVal.value=a.x-i-("center"===o?10:"right"===o?20:0),n.height.baseVal.value=a.height+2*i+3,n.y.baseVal.value=a.y-i,e.style.width=`${s}px`,e.style.height=`${a.height}px`}(t,a,s,d,r.textAlign);s.value=e||"",s.oninput=function(){lt(t,n,s.value),i(s.value),c()},s.onblur=function(){o(s.value)},s.onpointerdown=function(t){t.stopImmediatePropagation()},a.appendChild(s),t.parentElement.appendChild(a);const r=getComputedStyle(s),d=parseInt(r.paddingLeft)+parseInt(r.borderWidth);return c(),s.focus(),{dispose:()=>{a.remove(),a=null},draw:c}}(c.el,c.vMid,a.title,m,m);const t=n.getBoundingClientRect();u=w(t.left+10,t.top+10,n)}),f);a.styles&&e(n,...a.styles);return n[A].del=function(){f(),b.del(),n.remove()},n[A].copy=function(){b.unSelect(),f();const n=g(a);v(n.position,t[x].data.cell);const e=d(t,n);return t.append(e),e},{draw:()=>{if(b.drawPosition(),u){const t=n.getBoundingClientRect();u.position(t.left+10,t.top+10)}p&&p.draw()}}}(n,p,a,r,u,(()=>d(u.el)),c,h);return{el:p,cons:r,draw:f.draw}}function pt(e,i){const o=ht(e,i,'<circle data-key="outer" data-evt-no data-evt-index="2" r="72" fill="transparent" stroke-width="0"/><circle data-key="main" r="48" fill="#ff6600" stroke="#fff" stroke-width="1"/><text data-key="text" x="0" y="0" text-anchor="middle" style="pointer-events:none" fill="#fff"> </text>',pt,{right:{dir:"right",position:{x:48,y:0}},left:{dir:"left",position:{x:-48,y:0}},bottom:{dir:"bottom",position:{x:0,y:48}},top:{dir:"top",position:{x:0,y:-48}}},(t=>{const n=function(t,n,e){const i=h(t);return u(n,e,Math.sqrt(i.x**2+i.y**2))}(t,48,24);n!==i.r&&(i.r=n,a())}));function a(){o.cons.right.position.x=i.r,o.cons.left.position.x=-i.r,o.cons.bottom.position.y=i.r,o.cons.top.position.y=-i.r;for(const e in o.cons)n(t(o.el,e),o.cons[e].position);ut(o.el,"outer",i.r+24),ut(o.el,"main",i.r),o.draw()}return i.r&&48!==i.r?a():o.draw(),o.el}function ut(n,e,i){t(n,e).r.baseVal.value=i}const ft=(t,n,e)=>J(t,n,new vt(e));class vt extends HTMLElement{constructor(t){super(),this.u=t}connectedCallback(){const t=this.attachShadow({mode:"closed"});t.innerHTML='<style>.ln{display:flex}.ln>*{height:24px;padding:10px;fill-opacity:.3;stroke-opacity:.3}[data-cmd]{cursor:pointer}.ta-1 [data-cmd-arg="1"],.ta-2 [data-cmd-arg="2"],.ta-3 [data-cmd-arg="3"]{fill-opacity:1;stroke-opacity:1}</style><ap-shape-edit id="edit" edit-btn="true"><div class="ln"><svg data-cmd data-cmd-arg="1" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M3 4h18v2H3V4zm0 15h14v2H3v-2zm0-5h18v2H3v-2zm0-5h14v2H3V9z" fill="rgb(52,71,103)"/></svg> <svg data-cmd data-cmd-arg="2" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M3 4h18v2H3V4zm2 15h14v2H5v-2zm-2-5h18v2H3v-2zm2-5h14v2H5V9z" fill="rgb(52,71,103)"/></svg> <svg data-cmd data-cmd-arg="3" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M3 4h18v2H3V4zm4 15h14v2H7v-2zm-4-5h18v2H3v-2zm4-5h14v2H7V9z" fill="rgb(52,71,103)"/></svg></div></ap-shape-edit>';const n=this.u[A].data,o=t.getElementById("edit");e(o,`ta-${n.a}`),s(o,"cmd",(t=>{switch(t.detail.cmd){case"style":a(this.u,n,"cl-",t.detail.arg);break;case"del":this.u[A].del();break;case"copy":this.u[A].copy()}})),r(t,"[data-cmd]",(t=>{const a=Number.parseInt(d(t,"data-cmd-arg"));if(a===n.a)return;const s=n.a;n.a=a,this.u[A].draw(),i(o,`ta-${s}`),e(o,`ta-${n.a}`)}))}}function gt(o,a){a.w=a.w??96,a.h=a.h??48,a.a=a.a??(a.t?1:2);const s=`\n\t\t<rect data-key="outer" data-evt-no data-evt-index="2" width="144" height="96" x="-72" y="-48" fill="transparent" stroke="transparent" stroke-width="0" />\n\t\t<rect data-key="main" width="96" height="48" x="-48" y="-24" rx="15" ry="15" fill="#1aaee5" stroke="#fff" stroke-width="1" />\n\t\t<text data-key="text" y="0" x="${wt(a)}" style="pointer-events: none;" fill="#fff">&nbsp;</text>`,c=ht(o,a,s,gt,{right:{dir:"right",position:{x:48,y:0}},left:{dir:"left",position:{x:-48,y:0}},bottom:{dir:"bottom",position:{x:0,y:24}},top:{dir:"top",position:{x:0,y:-24}}},(t=>{const n=t.getBBox(),e=u(96,48,n.width+(a.t?6:0)),i=u(48,48,n.height);a.w===e&&a.h===i||(a.w=e,a.h=i,l())}),a.t?ft:F);e(c.el,a.t?"shtxt":"shrect");let r=a.w,d=a.a;function l(o){const s=a.w/-2,l=a.h/-2;c.cons.right.position.x=-s,c.cons.left.position.x=s,c.cons.bottom.position.y=-l,c.cons.bottom.position.x=0,c.cons.top.position.y=l,c.cons.top.position.x=0;for(const e in c.cons)n(t(c.el,e),c.cons[e].position);if(mt(c.el,"main",a.w,a.h,s,l),mt(c.el,"outer",a.w+48,a.h+48,s-24,l-24),o||d!==a.a||r!==a.w){let n,o;switch(a.a){case 1:n=s+8,o=(a.w-r)/2;break;case 2:n=0,o=0;break;case 3:n=-s-8,o=(a.w-r)/-2}const l=t(c.el,"text");l.x.baseVal[0].value=n,l.querySelectorAll("tspan").forEach((t=>{t.x.baseVal[0].value=n})),a.position.x+=o,i(c.el,`ta-${d}`),e(c.el,`ta-${a.a}`),d=a.a,r=a.w}c.draw()}return e(c.el,`ta-${a.a}`),96!==a.w||48!==a.h?l(!0):c.draw(),c.el[A].draw=l,c.el}function mt(n,e,i,o,a,s){const c=t(n,e);c.width.baseVal.value=i,c.height.baseVal.value=o,c.x.baseVal.value=a,c.y.baseVal.value=s}customElements.define("ap-rect-txt-settings",vt);const wt=t=>1===t.a?-40:2===t.a?0:40;function xt(i,o){const a=ht(i,o,'<path data-key="outer" data-evt-no data-evt-index="2" d="M-72 0 L0 -72 L72 0 L0 72 Z" stroke-width="0" fill="transparent"/><path data-key="border" d="M-39 0 L0 -39 L39 0 L0 39 Z" stroke-width="20" stroke="#fff" fill="transparent" stroke-linejoin="round"/><path data-key="main" d="M-39 0 L0 -39 L39 0 L0 39 Z" stroke-width="18" stroke-linejoin="round" stroke="#1D809F" fill="#1D809F"/><text data-key="text" x="0" y="0" text-anchor="middle" style="pointer-events:none" fill="#fff"> </text>',xt,{right:{dir:"right",position:{x:48,y:0}},left:{dir:"left",position:{x:-48,y:0}},bottom:{dir:"bottom",position:{x:0,y:48}},top:{dir:"top",position:{x:0,y:-48}}},(t=>{const n=u(96,48,function(t){const n=h(t);return 2*(Math.abs(n.x)+Math.abs(n.y))}(t)-20);n!==o.w&&(o.w=n,s())}));function s(){const e=bt(o.w,0);a.cons.right.position.x=e.r.x,a.cons.left.position.x=e.l.x,a.cons.bottom.position.y=e.b.y,a.cons.top.position.y=e.t.y;for(const e in a.cons)n(t(a.el,e),a.cons[e].position);const i=bt(o.w,9);yt(a.el,"main",i),yt(a.el,"border",i),yt(a.el,"outer",bt(o.w,-24)),a.draw()}return e(a.el,"shrhomb"),o.w&&96!==o.w?s():a.draw(),a.el}function yt(n,e,i){t(n,e).setAttribute("d",`M${i.l.x} ${i.l.y} L${i.t.x} ${i.t.y} L${i.r.x} ${i.r.y} L${i.b.x} ${i.b.y} Z`)}function bt(t,n){const e=t/2,i=n-e,o=e-n;return{l:{x:i,y:0},t:{x:0,y:i},r:{x:o,y:0},b:{x:0,y:o}}}async function kt(t,n,e){return function(t,n,e){let i,o;const a=Mt(t,n);if(a)i=new DataView(t,0,a.byteOffset-8),o=new DataView(t,a.byteOffset+a.byteLength+4);else{const n=t.byteLength-12;i=new DataView(t,0,n),o=new DataView(t,n)}const s=new DataView(new ArrayBuffer(8));return s.setUint32(0,e.length),s.setUint32(4,n),new Blob([i,s,e,new Uint32Array([0]),o],{type:"image/png"})}(await t.arrayBuffer(),$t(n),e)}function Mt(t,n){const e=new DataView(t,8);let i,o=0,a=e.getUint32(4);for(;1229278788!==a;){if(i=e.getUint32(o),a===n)return new DataView(t,o+16,i);o=o+12+i,a=e.getUint32(o+4)}return null}function $t(t){return new DataView((new TextEncoder).encode(t).buffer).getUint32(0)}function zt(t,n,e){const i=t.getBoundingClientRect(),o=t.ownerSVGElement.cloneNode(!0);o.style.backgroundImage=null,o.querySelectorAll(".select, .highlight").forEach((t=>t.classList.remove("select","highlight")));const a=o.getElementsByTagName("foreignObject");for(;a[0];)a[0].parentNode.removeChild(a[0]);const s=t[x].data,c=o.children[1],r=1/s.scale;c.style.transform=`matrix(1, 0, 0, 1, ${r*(s.position.x+15*s.scale-i.x)}, ${r*(s.position.y+15*s.scale-i.y)})`,function(t,n,e,i){const o=new Image;o.width=n.width*e*window.devicePixelRatio,o.height=n.height*e*window.devicePixelRatio,o.onload=function(){const t=document.createElement("canvas");t.width=o.width,t.height=o.height,t.style.width=`${o.width}px`,t.style.height=`${o.height}px`;const e=t.getContext("2d");e.imageSmoothingEnabled=!1,e.drawImage(o,n.x,n.y,n.width,n.height,0,0,o.width,o.height),URL.revokeObjectURL(o.src),t.toBlob(i,"image/png")},t.width.baseVal.newValueSpecifiedUnits(SVGLength.SVG_LENGTHTYPE_PX,o.width),t.height.baseVal.newValueSpecifiedUnits(SVGLength.SVG_LENGTHTYPE_PX,o.height),o.src=URL.createObjectURL(new Blob([(new XMLSerializer).serializeToString(t)],{type:"image/svg+xml;charset=utf-8"}))}(o,{x:0,y:0,height:i.height/s.scale+30,width:i.width/s.scale+30},3,(async t=>e(await kt(t,"dgRm",(new TextEncoder).encode(n)))))}async function Ht(t){const n=await async function(t,n){return Mt(await t.arrayBuffer(),$t(n))}(t,"dgRm");return n?(new TextDecoder).decode(n):null}function Lt(t,n){"showSaveFilePicker"in window?async function(t){try{const n=await(await window.showSaveFilePicker({types:[{description:"PNG Image",accept:{"image/png":[".png"]}}]})).createWritable();await n.write(t),await n.close()}catch{alert("File not saved")}}(t):function(t,n){const e=document.createElement("a");e.download=n,e.href=URL.createObjectURL(t),e.click(),URL.revokeObjectURL(e.href),e.remove()}(t,n)}class Vt extends HTMLElement{connectedCallback(){const t=this.attachShadow({mode:"closed"});t.innerHTML='<style>.menu{position:fixed;top:15px;left:15px;cursor:pointer}#options{position:fixed;padding:15px;box-shadow:0 0 58px 2px rgb(34 60 80 / 20%);border-radius:16px;background-color:rgba(255,255,255,.9);top:0;left:0;z-index:1}#options a,#options div{color:#0d6efd;cursor:pointer;margin:10px 0;display:flex;align-items:center;line-height:25px;text-decoration:none}#options a svg,#options div svg{margin-right:10px}</style><svg id="menu" class="menu" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M3 4h18v2H3V4zm0 7h18v2H3v-2zm0 7h18v2H3v-2z" fill="rgb(52,71,103)"/></svg><div id="options" style="visibility:hidden"><div id="menu2" style="margin:0 0 15px"><svg viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M3 4h18v2H3V4zm0 7h18v2H3v-2zm0 7h18v2H3v-2z" fill="rgb(52,71,103)"/></svg></div><div id="new"><svg viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M9 2.003V2h10.998C20.55 2 21 2.455 21 2.992v18.016a.993.993 0 0 1-.993.992H3.993A1 1 0 0 1 3 20.993V8l6-5.997zM5.83 8H9V4.83L5.83 8zM11 4v5a1 1 0 0 1-1 1H5v10h14V4h-8z" fill="rgb(52,71,103)"/></svg>New diagram</div><div id="open"><svg viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M3 21a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h7.414l2 2H20a1 1 0 0 1 1 1v3h-2V7h-7.414l-2-2H4v11.998L5.5 11h17l-2.31 9.243a1 1 0 0 1-.97.757H3zm16.938-8H7.062l-1.5 6h12.876l1.5-6z" fill="rgb(52,71,103)"/></svg>Open diagram image</div><div id="save"><svg viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M3 19h18v2H3v-2zm10-5.828L19.071 7.1l1.414 1.414L12 17 3.515 8.515 4.929 7.1 11 13.17V2h2v11.172z" fill="rgb(52,71,103)"/></svg>Save diagram image</div><div id="link"><svg viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M13.06 8.11l1.415 1.415a7 7 0 0 1 0 9.9l-.354.353a7 7 0 0 1-9.9-9.9l1.415 1.415a5 5 0 1 0 7.071 7.071l.354-.354a5 5 0 0 0 0-7.07l-1.415-1.415 1.415-1.414zm6.718 6.011l-1.414-1.414a5 5 0 1 0-7.071-7.071l-.354.354a5 5 0 0 0 0 7.07l1.415 1.415-1.415 1.414-1.414-1.414a7 7 0 0 1 0-9.9l.354-.353a7 7 0 0 1 9.9 9.9z" fill="rgb(52,71,103)"/></svg>Copy link to diagram</div><a href="/donate.html" target="_blank" style="margin-bottom:0"><svg viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0H24V24H0z"/><path d="M12.001 4.529c2.349-2.109 5.979-2.039 8.242.228 2.262 2.268 2.34 5.88.236 8.236l-8.48 8.492-8.478-8.492c-2.104-2.356-2.025-5.974.236-8.236 2.265-2.264 5.888-2.34 8.244-.228zm6.826 1.641c-1.5-1.502-3.92-1.563-5.49-.153l-1.335 1.198-1.336-1.197c-1.575-1.412-3.99-1.35-5.494.154-1.49 1.49-1.565 3.875-.192 5.451L12 18.654l7.02-7.03c1.374-1.577 1.299-3.959-.193-5.454z" fill="rgb(255,66,77)"/></svg>Donate</a></div>';const n=t.getElementById("options");function e(){n.style.visibility="visible"===n.style.visibility?"hidden":"visible"}function i(n,i){t.getElementById(n).onclick=t=>{S(!0),i(),e(),S(!1)}}t.getElementById("menu").onclick=e,t.getElementById("menu2").onclick=e,i("new",(()=>{P(this.g),C(!0)})),i("save",(()=>{const t=O(this.g);0!==t.s.length?zt(this.g,JSON.stringify(t),(t=>Lt(t,"dgrm.png"))):St()})),i("open",(()=>function(t,n){const e=document.createElement("input");e.type="file",e.multiple=!1,e.accept=t,e.onchange=async function(){n(e.files?.length?e.files[0]:null)},e.click(),e.remove()}(".png",(async t=>await Et(this.g,this.m,t))))),i("link",(async()=>{const t=O(this.g);if(0===t.s.length)return void St();const n=function(){const t=new Uint8Array(4);window.crypto.getRandomValues(t);const n=new Date;return`${n.getUTCFullYear()}${(n.getUTCMonth()+1).toString().padStart(2,"0")}${Array.from(t,(t=>t.toString(16).padStart(2,"0"))).join("")}`}(),e=new URL(window.location.href);e.searchParams.set("k",n),await navigator.clipboard.writeText(e.toString()),await async function(t,n){return await fetch(`${D}/${t}`,{method:"POST",headers:{"Content-Type":"application/json;charset=utf-8"},body:JSON.stringify(n)})}(n,t),alert("Link to diagram copied to clipboard")}))}init(t,n){this.g=t,this.m=n,document.body.addEventListener("dragover",(t=>{t.preventDefault()})),document.body.addEventListener("drop",(async t=>{t.preventDefault(),1===t.dataTransfer?.items?.length&&"file"===t.dataTransfer.items[0].kind&&"image/png"===t.dataTransfer.items[0].type?await Et(this.g,this.m,t.dataTransfer.items[0].getAsFile()):Bt()}))}}async function Et(t,n,e){const i=await Ht(e);i?U(t,n,JSON.parse(i))&&C(!1):Bt()}customElements.define("ap-menu",Vt);const Bt=()=>alert("File cannot be read. Use the exact image file you got from the application."),St=()=>alert("Diagram is empty");class Ct extends HTMLElement{connectedCallback(){const t=this.attachShadow({mode:"closed"});t.innerHTML='<style>.menu{overflow-x:auto;padding:0;position:fixed;top:50%;left:5px;transform:translateY(-50%);box-shadow:0 0 58px 2px rgba(34,60,80,.2);border-radius:16px;background-color:rgba(255,255,255,.9)}.content{white-space:nowrap;display:flex;flex-direction:column}[data-cmd]{cursor:pointer}.menu svg{padding:10px}.stroke{stroke:#344767;stroke-width:2px;fill:transparent}.menu .big{width:62px;min-width:62px}@media only screen and (max-width:700px){.menu{width:100%;border-radius:0;bottom:0;display:flex;flex-direction:column;top:unset;left:unset;transform:unset}.content{align-self:center;flex-direction:row}}</style><div id="menu" class="menu" style="touch-action:none"><div class="content"><svg class="stroke" data-cmd="shapeAdd" data-cmd-arg="1" viewBox="0 0 24 24" width="24" height="24"><circle r="9" cx="12" cy="12"></circle></svg> <svg class="stroke" data-cmd="shapeAdd" data-cmd-arg="4" viewBox="0 0 24 24" width="24" height="24"><path d="M2 12 L12 2 L22 12 L12 22 Z" stroke-linejoin="round"></path></svg> <svg class="stroke" data-cmd="shapeAdd" data-cmd-arg="2" viewBox="0 0 24 24" width="24" height="24"><rect x="2" y="4" width="20" height="16" rx="3" ry="3"></rect></svg> <svg data-cmd="shapeAdd" data-cmd-arg="0" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M13 8v8a3 3 0 0 1-3 3H7.83a3.001 3.001 0 1 1 0-2H10a1 1 0 0 0 1-1V8a3 3 0 0 1 3-3h3V2l5 4-5 4V7h-3a1 1 0 0 0-1 1z" fill="rgba(52,71,103,1)"/></svg> <svg data-cmd="shapeAdd" data-cmd-arg="3" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M13 6v15h-2V6H5V4h14v2z" fill="rgba(52,71,103,1)"/></svg></div></div>';const n=t.getElementById("menu");n.querySelectorAll('[data-cmd="shapeAdd"]').forEach((t=>s(t,"pointerdown",this))),s(n,"pointerleave",this),s(n,"pointerup",this),s(n,"pointermove",this)}init(t,n){this.g=t,this.m=n}handleEvent(t){switch(t.type){case"pointermove":if(!this.M){const n=document.elementFromPoint(t.clientX,t.clientY);if(n===this.$)return;this.H===this.$&&this.g.ownerSVGElement.setPointerCapture(t.pointerId),this.$=n}break;case"pointerleave":this.M=!0,null!=this.L&&this.V(t),this.B();break;case"pointerdown":this.L=parseInt(t.currentTarget.getAttribute("data-cmd-arg")),this.H=document.elementFromPoint(t.clientX,t.clientY),this.$=this.H,this.M=null;break;case"pointerup":this.B()}}V(t){C(!1);const n=H(this.g[x].data,t.clientX,t.clientY),e=0===this.L?{s:{data:{dir:"right",position:{x:n.x-24,y:n.y}}},e:{data:{dir:"right",position:{x:n.x+24,y:n.y}}}}:{type:this.L,position:{x:n.x,y:n.y},title:"Title"},i=this.m[this.L].create(e);this.g.append(i),i.dispatchEvent(new PointerEvent("pointerdown",t))}B(){this.L=null,this.H=null,this.$=null}}customElements.define("ap-menu-shape",Ct);const Dt=document.getElementById("canvas");Dt[x]={data:{position:{x:0,y:0},scale:1,cell:24}};const Tt=function(t){return{0:{create:n=>G(t,n)},1:{create:n=>pt(t,n)},2:{create:n=>gt(t,n)},3:{create:n=>(n.t=!0,gt(t,n))},4:{create:n=>xt(t,n)}}}(Dt);!function(t){let n,e,i;function o(t){t.isPrimary&&t.isTrusted&&(n&&Math.abs(n.x-t.clientX)<3&&Math.abs(n.y-t.clientY)<3?t.stopImmediatePropagation():(n=null,void 0===t.movementX?(t[m]=e?t.clientX-e:0,t[w]=i?t.clientY-i:0,e=t.clientX,i=t.clientY):(t[m]=t.movementX,t[w]=t.movementY)))}t.addEventListener("pointerdown",(a=>{n={x:a.clientX,y:a.clientY},e=null,i=null,t.addEventListener("pointermove",o,{capture:!0,passive:!0}),t.addEventListener("pointerup",(n=>{c(t,"pointermove",o,!0)}),{capture:!0,once:!0,passive:!0})}),{capture:!0,passive:!0})}(Dt.ownerSVGElement),Dt.ownerSVGElement.addEventListener("pointerdown",(t=>{if(!t.isPrimary||t[z]||!t.isTrusted)return;t.stopImmediatePropagation();const n=new PointerEvent("pointerdown",t);n[z]=!0,function(t){return M(t).find((t=>!t.hasAttribute("data-evt-no")))}(t).dispatchEvent(n)}),{capture:!0,passive:!0}),function(t){const o=t.ownerSVGElement;let a,r,d,h,p,u;function v(t){if(t[$]||!h)return void m();t[$]=!0,d&&(d.remove(),d=null);const n=t.clientX-r.x,e=t.clientY-r.y;h.width.baseVal.value=Math.abs(n),h.height.baseVal.value=Math.abs(e),n<0&&(p.x=t.clientX),e<0&&(p.y=t.clientY),h.style.transform=`translate(${p.x}px, ${p.y}px)`}function g(n){if(h){const o=n=>dt(H(t[x].data,p.x,p.y),h.width.baseVal.value/t[x].data.scale,h.height.baseVal.value/t[x].data.scale,n.x,n.y),a={shapes:[],shapesPaths:[],pathEnds:[],pathEndsPaths:[]},r=t=>o(t[A].data.position);function d(t,n,i){return!n.shape&&o(n.data.position)?(a.pathEnds.push(n),e(t,i),1):n.shape&&r(n.shape.shapeEl)?2:0}for(const l of t.children)if(l[A])r(l)&&(rt(l),a.shapes.push(l));else if(l[T]){const v=d(l,l[T].data.s,ot),g=d(l,l[T].data.e,at);1!==v&&1!==g||a.pathEndsPaths.push(l),2!==v&&2!==g||a.shapesPaths.push(l)}u=function(t,n){const o=t.ownerSVGElement;let a,r=!1,d=!1;const l=()=>{a?.del(),a=null};function h(t){l(),d=n.shapes?.some((n=>n.contains(t.target)))||n.pathEnds?.some((n=>n.el.contains(t.target))),d||t.target===o?(d&&t.stopImmediatePropagation(),o.setPointerCapture(t.pointerId),s(o,"pointerup",u,!0),s(o,"pointermove",v)):g()}function p(t){n.shapes?.forEach((n=>{t(n[A].data.position),n[A].drawPosition()})),n.pathEnds?.forEach((n=>t(n.data.position))),n.pathEndsPaths?.forEach((t=>t[T].draw()))}function u(i){if(r)p((n=>L(n,t[x].data.cell)));else{if(!d)return void g();a=J(i.clientX-10,i.clientY-10,new it((i=>{switch(i){case"del":f(n.shapes,(t=>t[A].del())),f(n.pathEndsPaths,(t=>t[T].del())),g();break;case"copy":l(),n=function(t,n){const i={shapes:[],shapesPaths:[],pathEnds:[],pathEndsPaths:[]};function o(t){const n=t[A].copy();return rt(n),i.shapes.push(n),n}function a(t,e){const i=n.shapes.indexOf(t.shape?.shapeEl);return i>-1?(e.shape={shapeEl:o(t.shape.shapeEl),connectorKey:t.shape.connectorKey},n.shapes.splice(i,1),!0):n.pathEnds?.some((n=>n.el===t.el))}function s(t){e(t,ot),e(t,at)}function c(t,n,o){return n.shape?2:(i.pathEnds.push(n),e(t,o),1)}return n.shapesPaths?.forEach((e=>{const o=tt(e[T].data,t[x].data.cell);if(a(e[T].data.s,o.s)&&a(e[T].data.e,o.e)){const n=G(t,o),e=c(n,n[T].data.s,ot),a=c(n,n[T].data.e,at);1!==e&&1!==a||i.pathEndsPaths.push(n),2!==e&&2!==a||i.shapesPaths.push(n),t.append(n)}!function(t,n){const e=t.indexOf(n);e>-1&&t.splice(e,1)}(n.pathEndsPaths,e),ct(e)})),n.shapes?.forEach((t=>o(t))),n.pathEndsPaths?.forEach((t=>{ct(t);const n=t[T].copy();s(n),i.pathEndsPaths.push(n),i.pathEnds.push(n[T].data.s,n[T].data.e)})),i}(t,n)}})))}g(!0)}function v(n){d?(r=!0,p((e=>b(e,t[x].data.scale,n)))):g(!0)}function g(t){c(o,"pointerup",u),c(o,"pointermove",v),r=!1,d=!1,t||(c(o,"pointerdown",h,!0),l(),f(n.shapes,(t=>i(t,st))),f(n.pathEndsPaths,(t=>ct(t))),n.pathEnds=null,n.shapesPaths=null)}return o.addEventListener("pointerdown",h,{passive:!0,capture:!0}),g}(t,a)}m()}function m(){clearTimeout(a),a=null,d?.remove(),d=null,h?.remove(),h=null,c(o,"pointermove",v),c(o,"wheel",m),c(o,"pointerup",g)}s(o,"pointerdown",(t=>{!t[$]&&t.isPrimary?(s(o,"pointermove",v),s(o,"wheel",m,!0),s(o,"pointerup",g,!0),a=setTimeout((i=>{u&&(u(),u=null),d=l("circle"),e(d,"ative-elem"),d.style.cssText="r:10px; fill: rgb(108 187 247 / 51%)",n(d,{x:t.clientX,y:t.clientY}),o.append(d),r={x:t.clientX,y:t.clientY},p={x:t.clientX,y:t.clientY},h=l("rect"),h.style.cssText="rx:10px; fill: rgb(108 187 247 / 51%)",n(h,p),o.append(h)}),500)):m()}))}(Dt),function(t){const n=t[x].data,e=function(t,n){let e;function i(n){e!==n&&(e=n,t.style.backgroundImage=`radial-gradient(rgb(73 80 87 / ${n}) 1px, transparent 0)`)}return i(.7),t.style.backgroundSize=`${n.cell}px ${n.cell}px`,function(){const e=n.cell*n.scale;n.scale<.5?i(0):n.scale<=.9?i(.3):i(.7),t.style.backgroundSize=`${e}px ${e}px`,t.style.backgroundPosition=`${n.position.x}px ${n.position.y}px`}}(t.ownerSVGElement,n);function i(){t.style.transform=`matrix(${n.scale}, 0, 0, ${n.scale}, ${n.position.x}, ${n.position.y})`,e()}function o(t,e){if(t<.25||t>4)return;const o=t/n.scale;n.scale=t,n.position.x=o*(n.position.x-e.x)+e.x,n.position.y=o*(n.position.y-e.y)+e.y,i()}!function(t,n,e,i){let o,a,r,d;function l(n){r=null,d=null,o?.id===n.pointerId&&(o=null),a?.id===n.pointerId&&(a=null),o||a||(c(t,"pointermove",h),c(t,"pointercancel",l),c(t,"pointerup",l))}function h(t){if(t[$])return;if(o&&!a||!o&&a)return n.position.x=t.clientX+(o||a).shift.x,n.position.y=t.clientY+(o||a).shift.y,void i();if(!a||!o||a?.id!==t.pointerId&&o?.id!==t.pointerId)return;const s=Math.hypot(o.pos.x-a.pos.x,o.pos.y-a.pos.y),c={x:(o.pos.x+a.pos.x)/2,y:(o.pos.y+a.pos.y)/2};r&&(n.position.x=n.position.x+c.x-d.x,n.position.y=n.position.y+c.y-d.y,e(n.scale/r*s,c)),r=s,d=c,o.id===t.pointerId&&(o=E(t,n)),a.id===t.pointerId&&(a=E(t,n))}s(t,"pointerdown",(e=>{e[$]||!o&&!e.isPrimary||o&&a||(t.setPointerCapture(e.pointerId),o||(s(t,"pointermove",h),s(t,"pointercancel",l),s(t,"pointerup",l)),o?a||(a=E(e,n)):o=E(e,n))}))}(t.ownerSVGElement,n,o,i),t.ownerSVGElement.addEventListener("wheel",(t=>{t.preventDefault();const e=t.deltaY||t.deltaX,i=Math.abs(e)<50?.05:.25;o(n.scale+(e<0?i:-i),V(t))})),t[x].move=function(t,e,o){n.position.x=t,n.position.y=e,n.scale=o,i()}}(Dt),document.getElementById("menu").init(Dt,Tt),document.getElementById("menu-shape").init(Dt,Tt);let At=new URL(window.location.href);At.searchParams.get("k")?(S(!0),async function(t){return(await fetch(`${D}/${t}`)).json()}(At.searchParams.get("k")).then((t=>{At.searchParams.delete("k"),U(Dt,Tt,t)&&C(!1),history.replaceState(null,null,At),S(!1),At=null}))):At=null}();
