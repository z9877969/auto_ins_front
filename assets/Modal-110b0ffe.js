import{a as J,g as Q,s as z,_ as h,ae,r as d,u as Z,e as Y,j as w,f as q,h as ee,i as te,o as D,v as ne,k as le,q as Ee}from"./index-55700721.js";import{T as ye,r as Re,g as ce,P as Pe}from"./Portal-214960b8.js";import{e as ke,u as de}from"./useSlotProps-1d4a118d.js";function ue(...e){return e.reduce((t,o)=>o==null?t:function(...s){t.apply(this,s),o.apply(this,s)},()=>{})}function Te(e){const t=e.documentElement.clientWidth;return Math.abs(window.innerWidth-t)}const Ce=e=>{let t;return e<1?t=5.11916*e**2:t=4.5*Math.log(e+1)+2,(t/100).toFixed(2)},fe=Ce;function Se(e){return J("MuiPaper",e)}Q("MuiPaper",["root","rounded","outlined","elevation","elevation0","elevation1","elevation2","elevation3","elevation4","elevation5","elevation6","elevation7","elevation8","elevation9","elevation10","elevation11","elevation12","elevation13","elevation14","elevation15","elevation16","elevation17","elevation18","elevation19","elevation20","elevation21","elevation22","elevation23","elevation24"]);const Me=["className","component","elevation","square","variant"],Ne=e=>{const{square:t,elevation:o,variant:n,classes:s}=e,r={root:["root",n,!t&&"rounded",n==="elevation"&&`elevation${o}`]};return ee(r,Se,s)},Ie=z("div",{name:"MuiPaper",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:o}=e;return[t.root,t[o.variant],!o.square&&t.rounded,o.variant==="elevation"&&t[`elevation${o.elevation}`]]}})(({theme:e,ownerState:t})=>{var o;return h({backgroundColor:(e.vars||e).palette.background.paper,color:(e.vars||e).palette.text.primary,transition:e.transitions.create("box-shadow")},!t.square&&{borderRadius:e.shape.borderRadius},t.variant==="outlined"&&{border:`1px solid ${(e.vars||e).palette.divider}`},t.variant==="elevation"&&h({boxShadow:(e.vars||e).shadows[t.elevation]},!e.vars&&e.palette.mode==="dark"&&{backgroundImage:`linear-gradient(${ae("#fff",fe(t.elevation))}, ${ae("#fff",fe(t.elevation))})`},e.vars&&{backgroundImage:(o=e.vars.overlays)==null?void 0:o[t.elevation]}))}),we=d.forwardRef(function(t,o){const n=Z({props:t,name:"MuiPaper"}),{className:s,component:r="div",elevation:i=1,square:l=!1,variant:u="elevation"}=n,b=Y(n,Me),v=h({},n,{component:r,elevation:i,square:l,variant:u}),m=Ne(v);return w.jsx(Ie,h({as:r,ownerState:v,className:q(m.root,s),ref:o},b))}),pt=we,Fe=["input","select","textarea","a[href]","button","[tabindex]","audio[controls]","video[controls]",'[contenteditable]:not([contenteditable="false"])'].join(",");function Ae(e){const t=parseInt(e.getAttribute("tabindex")||"",10);return Number.isNaN(t)?e.contentEditable==="true"||(e.nodeName==="AUDIO"||e.nodeName==="VIDEO"||e.nodeName==="DETAILS")&&e.getAttribute("tabindex")===null?0:e.tabIndex:t}function Be(e){if(e.tagName!=="INPUT"||e.type!=="radio"||!e.name)return!1;const t=n=>e.ownerDocument.querySelector(`input[type="radio"]${n}`);let o=t(`[name="${e.name}"]:checked`);return o||(o=t(`[name="${e.name}"]`)),o!==e}function $e(e){return!(e.disabled||e.tagName==="INPUT"&&e.type==="hidden"||Be(e))}function Oe(e){const t=[],o=[];return Array.from(e.querySelectorAll(Fe)).forEach((n,s)=>{const r=Ae(n);r===-1||!$e(n)||(r===0?t.push(n):o.push({documentOrder:s,tabIndex:r,node:n}))}),o.sort((n,s)=>n.tabIndex===s.tabIndex?n.documentOrder-s.documentOrder:n.tabIndex-s.tabIndex).map(n=>n.node).concat(t)}function Le(){return!0}function De(e){const{children:t,disableAutoFocus:o=!1,disableEnforceFocus:n=!1,disableRestoreFocus:s=!1,getTabbable:r=Oe,isEnabled:i=Le,open:l}=e,u=d.useRef(!1),b=d.useRef(null),v=d.useRef(null),m=d.useRef(null),P=d.useRef(null),y=d.useRef(!1),c=d.useRef(null),F=te(t.ref,c),T=d.useRef(null);d.useEffect(()=>{!l||!c.current||(y.current=!o)},[o,l]),d.useEffect(()=>{if(!l||!c.current)return;const a=D(c.current);return c.current.contains(a.activeElement)||(c.current.hasAttribute("tabIndex")||c.current.setAttribute("tabIndex","-1"),y.current&&c.current.focus()),()=>{s||(m.current&&m.current.focus&&(u.current=!0,m.current.focus()),m.current=null)}},[l]),d.useEffect(()=>{if(!l||!c.current)return;const a=D(c.current),x=R=>{T.current=R,!(n||!i()||R.key!=="Tab")&&a.activeElement===c.current&&R.shiftKey&&(u.current=!0,v.current&&v.current.focus())},E=()=>{const R=c.current;if(R===null)return;if(!a.hasFocus()||!i()||u.current){u.current=!1;return}if(R.contains(a.activeElement)||n&&a.activeElement!==b.current&&a.activeElement!==v.current)return;if(a.activeElement!==P.current)P.current=null;else if(P.current!==null)return;if(!y.current)return;let M=[];if((a.activeElement===b.current||a.activeElement===v.current)&&(M=r(c.current)),M.length>0){var $,N;const L=!!(($=T.current)!=null&&$.shiftKey&&((N=T.current)==null?void 0:N.key)==="Tab"),O=M[0],A=M[M.length-1];typeof O!="string"&&typeof A!="string"&&(L?A.focus():O.focus())}else R.focus()};a.addEventListener("focusin",E),a.addEventListener("keydown",x,!0);const k=setInterval(()=>{a.activeElement&&a.activeElement.tagName==="BODY"&&E()},50);return()=>{clearInterval(k),a.removeEventListener("focusin",E),a.removeEventListener("keydown",x,!0)}},[o,n,s,i,l,r]);const C=a=>{m.current===null&&(m.current=a.relatedTarget),y.current=!0,P.current=a.target;const x=t.props.onFocus;x&&x(a)},S=a=>{m.current===null&&(m.current=a.relatedTarget),y.current=!0};return w.jsxs(d.Fragment,{children:[w.jsx("div",{tabIndex:l?0:-1,onFocus:S,ref:b,"data-testid":"sentinelStart"}),d.cloneElement(t,{ref:F,onFocus:C}),w.jsx("div",{tabIndex:l?0:-1,onFocus:S,ref:v,"data-testid":"sentinelEnd"})]})}function _e(e){const t=D(e);return t.body===e?ne(e).innerWidth>t.documentElement.clientWidth:e.scrollHeight>e.clientHeight}function U(e,t){t?e.setAttribute("aria-hidden","true"):e.removeAttribute("aria-hidden")}function pe(e){return parseInt(ne(e).getComputedStyle(e).paddingRight,10)||0}function je(e){const o=["TEMPLATE","SCRIPT","STYLE","LINK","MAP","META","NOSCRIPT","PICTURE","COL","COLGROUP","PARAM","SLOT","SOURCE","TRACK"].indexOf(e.tagName)!==-1,n=e.tagName==="INPUT"&&e.getAttribute("type")==="hidden";return o||n}function ve(e,t,o,n,s){const r=[t,o,...n];[].forEach.call(e.children,i=>{const l=r.indexOf(i)===-1,u=!je(i);l&&u&&U(i,s)})}function X(e,t){let o=-1;return e.some((n,s)=>t(n)?(o=s,!0):!1),o}function He(e,t){const o=[],n=e.container;if(!t.disableScrollLock){if(_e(n)){const i=Te(D(n));o.push({value:n.style.paddingRight,property:"padding-right",el:n}),n.style.paddingRight=`${pe(n)+i}px`;const l=D(n).querySelectorAll(".mui-fixed");[].forEach.call(l,u=>{o.push({value:u.style.paddingRight,property:"padding-right",el:u}),u.style.paddingRight=`${pe(u)+i}px`})}let r;if(n.parentNode instanceof DocumentFragment)r=D(n).body;else{const i=n.parentElement,l=ne(n);r=(i==null?void 0:i.nodeName)==="HTML"&&l.getComputedStyle(i).overflowY==="scroll"?i:n}o.push({value:r.style.overflow,property:"overflow",el:r},{value:r.style.overflowX,property:"overflow-x",el:r},{value:r.style.overflowY,property:"overflow-y",el:r}),r.style.overflow="hidden"}return()=>{o.forEach(({value:r,el:i,property:l})=>{r?i.style.setProperty(l,r):i.style.removeProperty(l)})}}function Ue(e){const t=[];return[].forEach.call(e.children,o=>{o.getAttribute("aria-hidden")==="true"&&t.push(o)}),t}class Ke{constructor(){this.containers=void 0,this.modals=void 0,this.modals=[],this.containers=[]}add(t,o){let n=this.modals.indexOf(t);if(n!==-1)return n;n=this.modals.length,this.modals.push(t),t.modalRef&&U(t.modalRef,!1);const s=Ue(o);ve(o,t.mount,t.modalRef,s,!0);const r=X(this.containers,i=>i.container===o);return r!==-1?(this.containers[r].modals.push(t),n):(this.containers.push({modals:[t],container:o,restore:null,hiddenSiblings:s}),n)}mount(t,o){const n=X(this.containers,r=>r.modals.indexOf(t)!==-1),s=this.containers[n];s.restore||(s.restore=He(s,o))}remove(t,o=!0){const n=this.modals.indexOf(t);if(n===-1)return n;const s=X(this.containers,i=>i.modals.indexOf(t)!==-1),r=this.containers[s];if(r.modals.splice(r.modals.indexOf(t),1),this.modals.splice(n,1),r.modals.length===0)r.restore&&r.restore(),t.modalRef&&U(t.modalRef,o),ve(r.container,t.mount,t.modalRef,r.hiddenSiblings,!1),this.containers.splice(s,1);else{const i=r.modals[r.modals.length-1];i.modalRef&&U(i.modalRef,!1)}return n}isTopModal(t){return this.modals.length>0&&this.modals[this.modals.length-1]===t}}function We(e){return typeof e=="function"?e():e}function qe(e){return e?e.props.hasOwnProperty("in"):!1}const ze=new Ke;function Ye(e){const{container:t,disableEscapeKeyDown:o=!1,disableScrollLock:n=!1,manager:s=ze,closeAfterTransition:r=!1,onTransitionEnter:i,onTransitionExited:l,children:u,onClose:b,open:v,rootRef:m}=e,P=d.useRef({}),y=d.useRef(null),c=d.useRef(null),F=te(c,m),[T,C]=d.useState(!v),S=qe(u);let a=!0;(e["aria-hidden"]==="false"||e["aria-hidden"]===!1)&&(a=!1);const x=()=>D(y.current),E=()=>(P.current.modalRef=c.current,P.current.mount=y.current,P.current),k=()=>{s.mount(E(),{disableScrollLock:n}),c.current&&(c.current.scrollTop=0)},R=le(()=>{const f=We(t)||x().body;s.add(E(),f),c.current&&k()}),M=d.useCallback(()=>s.isTopModal(E()),[s]),$=le(f=>{y.current=f,f&&(v&&M()?k():c.current&&U(c.current,a))}),N=d.useCallback(()=>{s.remove(E(),a)},[a,s]);d.useEffect(()=>()=>{N()},[N]),d.useEffect(()=>{v?R():(!S||!r)&&N()},[v,N,S,r,R]);const L=f=>g=>{var B;(B=f.onKeyDown)==null||B.call(f,g),!(g.key!=="Escape"||!M())&&(o||(g.stopPropagation(),b&&b(g,"escapeKeyDown")))},O=f=>g=>{var B;(B=f.onClick)==null||B.call(f,g),g.target===g.currentTarget&&b&&b(g,"backdropClick")};return{getRootProps:(f={})=>{const g=ke(e);delete g.onTransitionEnter,delete g.onTransitionExited;const B=h({},g,f);return h({role:"presentation"},B,{onKeyDown:L(B),ref:F})},getBackdropProps:(f={})=>{const g=f;return h({"aria-hidden":!0},g,{onClick:O(g),open:v})},getTransitionProps:()=>{const f=()=>{C(!1),i&&i()},g=()=>{C(!0),l&&l(),r&&N()};return{onEnter:ue(f,u==null?void 0:u.props.onEnter),onExited:ue(g,u==null?void 0:u.props.onExited)}},rootRef:F,portalRef:$,isTopModal:M,exited:T,hasTransition:S}}const Ge=["addEndListener","appear","children","easing","in","onEnter","onEntered","onEntering","onExit","onExited","onExiting","style","timeout","TransitionComponent"],Ve={entering:{opacity:1},entered:{opacity:1}},Xe=d.forwardRef(function(t,o){const n=Ee(),s={enter:n.transitions.duration.enteringScreen,exit:n.transitions.duration.leavingScreen},{addEndListener:r,appear:i=!0,children:l,easing:u,in:b,onEnter:v,onEntered:m,onEntering:P,onExit:y,onExited:c,onExiting:F,style:T,timeout:C=s,TransitionComponent:S=ye}=t,a=Y(t,Ge),x=d.useRef(null),E=te(x,l.ref,o),k=p=>I=>{if(p){const f=x.current;I===void 0?p(f):p(f,I)}},R=k(P),M=k((p,I)=>{Re(p);const f=ce({style:T,timeout:C,easing:u},{mode:"enter"});p.style.webkitTransition=n.transitions.create("opacity",f),p.style.transition=n.transitions.create("opacity",f),v&&v(p,I)}),$=k(m),N=k(F),L=k(p=>{const I=ce({style:T,timeout:C,easing:u},{mode:"exit"});p.style.webkitTransition=n.transitions.create("opacity",I),p.style.transition=n.transitions.create("opacity",I),y&&y(p)}),O=k(c),A=p=>{r&&r(x.current,p)};return w.jsx(S,h({appear:i,in:b,nodeRef:x,onEnter:M,onEntered:$,onEntering:R,onExit:L,onExited:O,onExiting:N,addEndListener:A,timeout:C},a,{children:(p,I)=>d.cloneElement(l,h({style:h({opacity:0,visibility:p==="exited"&&!b?"hidden":void 0},Ve[p],T,l.props.style),ref:E},I))}))}),Je=Xe;function Qe(e){return J("MuiBackdrop",e)}Q("MuiBackdrop",["root","invisible"]);const Ze=["children","className","component","components","componentsProps","invisible","open","slotProps","slots","TransitionComponent","transitionDuration"],et=e=>{const{classes:t,invisible:o}=e;return ee({root:["root",o&&"invisible"]},Qe,t)},tt=z("div",{name:"MuiBackdrop",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:o}=e;return[t.root,o.invisible&&t.invisible]}})(({ownerState:e})=>h({position:"fixed",display:"flex",alignItems:"center",justifyContent:"center",right:0,bottom:0,top:0,left:0,backgroundColor:"rgba(0, 0, 0, 0.5)",WebkitTapHighlightColor:"transparent"},e.invisible&&{backgroundColor:"transparent"})),nt=d.forwardRef(function(t,o){var n,s,r;const i=Z({props:t,name:"MuiBackdrop"}),{children:l,className:u,component:b="div",components:v={},componentsProps:m={},invisible:P=!1,open:y,slotProps:c={},slots:F={},TransitionComponent:T=Je,transitionDuration:C}=i,S=Y(i,Ze),a=h({},i,{component:b,invisible:P}),x=et(a),E=(n=c.root)!=null?n:m.root;return w.jsx(T,h({in:y,timeout:C},S,{children:w.jsx(tt,h({"aria-hidden":!0},E,{as:(s=(r=F.root)!=null?r:v.Root)!=null?s:b,className:q(x.root,u,E==null?void 0:E.className),ownerState:h({},a,E==null?void 0:E.ownerState),classes:x,ref:o,children:l}))}))}),ot=nt;function rt(e){return J("MuiModal",e)}Q("MuiModal",["root","hidden","backdrop"]);const st=["BackdropComponent","BackdropProps","classes","className","closeAfterTransition","children","container","component","components","componentsProps","disableAutoFocus","disableEnforceFocus","disableEscapeKeyDown","disablePortal","disableRestoreFocus","disableScrollLock","hideBackdrop","keepMounted","onBackdropClick","onClose","onTransitionEnter","onTransitionExited","open","slotProps","slots","theme"],it=e=>{const{open:t,exited:o,classes:n}=e;return ee({root:["root",!t&&o&&"hidden"],backdrop:["backdrop"]},rt,n)},at=z("div",{name:"MuiModal",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:o}=e;return[t.root,!o.open&&o.exited&&t.hidden]}})(({theme:e,ownerState:t})=>h({position:"fixed",zIndex:(e.vars||e).zIndex.modal,right:0,bottom:0,top:0,left:0},!t.open&&t.exited&&{visibility:"hidden"})),lt=z(ot,{name:"MuiModal",slot:"Backdrop",overridesResolver:(e,t)=>t.backdrop})({zIndex:-1}),ct=d.forwardRef(function(t,o){var n,s,r,i,l,u;const b=Z({name:"MuiModal",props:t}),{BackdropComponent:v=lt,BackdropProps:m,className:P,closeAfterTransition:y=!1,children:c,container:F,component:T,components:C={},componentsProps:S={},disableAutoFocus:a=!1,disableEnforceFocus:x=!1,disableEscapeKeyDown:E=!1,disablePortal:k=!1,disableRestoreFocus:R=!1,disableScrollLock:M=!1,hideBackdrop:$=!1,keepMounted:N=!1,onBackdropClick:L,open:O,slotProps:A,slots:p}=b,I=Y(b,st),f=h({},b,{closeAfterTransition:y,disableAutoFocus:a,disableEnforceFocus:x,disableEscapeKeyDown:E,disablePortal:k,disableRestoreFocus:R,disableScrollLock:M,hideBackdrop:$,keepMounted:N}),{getRootProps:g,getBackdropProps:B,getTransitionProps:he,portalRef:be,isTopModal:me,exited:oe,hasTransition:re}=Ye(h({},f,{rootRef:o})),H=h({},f,{exited:oe}),_=it(H),K={};if(c.props.tabIndex===void 0&&(K.tabIndex="-1"),re){const{onEnter:j,onExited:W}=he();K.onEnter=j,K.onExited=W}const se=(n=(s=p==null?void 0:p.root)!=null?s:C.Root)!=null?n:at,ie=(r=(i=p==null?void 0:p.backdrop)!=null?i:C.Backdrop)!=null?r:v,G=(l=A==null?void 0:A.root)!=null?l:S.root,V=(u=A==null?void 0:A.backdrop)!=null?u:S.backdrop,ge=de({elementType:se,externalSlotProps:G,externalForwardedProps:I,getSlotProps:g,additionalProps:{ref:o,as:T},ownerState:H,className:q(P,G==null?void 0:G.className,_==null?void 0:_.root,!H.open&&H.exited&&(_==null?void 0:_.hidden))}),xe=de({elementType:ie,externalSlotProps:V,additionalProps:m,getSlotProps:j=>B(h({},j,{onClick:W=>{L&&L(W),j!=null&&j.onClick&&j.onClick(W)}})),className:q(V==null?void 0:V.className,m==null?void 0:m.className,_==null?void 0:_.backdrop),ownerState:H});return!N&&!O&&(!re||oe)?null:w.jsx(Pe,{ref:be,container:F,disablePortal:k,children:w.jsxs(se,h({},ge,{children:[!$&&v?w.jsx(ie,h({},xe)):null,w.jsx(De,{disableEnforceFocus:x,disableAutoFocus:a,disableRestoreFocus:R,isEnabled:me,open:O,children:d.cloneElement(c,K)})]}))})}),vt=ct;export{ot as B,Je as F,vt as M,pt as P,Te as g};
