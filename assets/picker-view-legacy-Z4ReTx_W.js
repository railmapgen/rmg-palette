System.register(["./chakra-legacy-S6iHddlO.js","./index-legacy-eqhK73Lv.js","./react-legacy-KN5lAqTZ.js","./pantone-input-legacy-PZnLErl6.js","./use-palette-legacy-Xmxn_CtF.js","./pantone-checker-legacy-GuVCcVh2.js"],(function(e,n){"use strict";var t,o,a,l,s,i,r,c,u,d,p,m,h,g,v,C,f,x,j,y,b,S,E,L,A,I,P,w,_,D,k,F;return{setters:[e=>{t=e.H,o=e.F,a=e.ap,l=e.K,s=e.W,i=e.g,r=e.ac,c=e.D,u=e.aq},e=>{d=e.u,p=e.Y,m=e.M,h=e.a,g=e.W,v=e.l,C=e.m,f=e.b,x=e.r,j=e.E,y=e.g,b=e.h,S=e.Z,E=e._},e=>{L=e.l,A=e.r,I=e.p},e=>{P=e.u,w=e.P,_=e.R,D=e.i},e=>{k=e.u},e=>{F=e.P}],execute:function(){e("default",(function(){const[e]=I(),n=e.get("parentId"),o=e.get("parentComponent"),a=f(),{isDataLoading:l}=d((e=>e.app)),[s,i]=A.useState(),[r,c]=A.useState(),u=A.useRef();return A.useEffect((()=>{const e=new BroadcastChannel(H+n);return u.current=e,x.event(j.APP_CLIP_VIEW_OPENED,{parentComponent:o}),e.onmessage=n=>{const{event:t,data:o}=n.data;console.log(`[${e.name}] Received event from parent component:`,t),"OPEN"===t&&(i(crypto.randomUUID()),c(o))},console.log(`[${e.name}] App clip connection established, parentComponent=${o}`),e.postMessage({event:"LOADED"}),()=>{e.close()}}),[]),t.jsxs(y,{children:[l&&t.jsx(b,{isIndeterminate:!0}),t.jsx($,{defaultTheme:r,sessionId:s,onSubmit:(e,n)=>{var t,l;console.log(`[${null===(t=u.current)||void 0===t?void 0:t.name}] Emitting SELECT event, theme:`,e),null===(l=u.current)||void 0===l||l.postMessage({event:"SELECT",data:e}),a(S({theme:e,displayName:n})),x.event(j.APP_CLIP_VIEW_SELECT,{parentComponent:o,theme:e})},onClose:()=>{var e,n;console.log(`[${null===(e=u.current)||void 0===e?void 0:e.name}] Emitting CLOSE event`),null===(n=u.current)||void 0===n||n.postMessage({event:"CLOSE"}),x.event(j.APP_CLIP_VIEW_CLOSED,{parentComponent:o})},onClearHistory:()=>{a(E()),x.event(j.CLEAR_HISTORY,{})}})]})}));const n=e=>{const n=(e=>{const n=e.toUpperCase().split("");return 2===n.length?n.map((e=>((e.codePointAt(0)||0)+127397).toString(16).toUpperCase())):5===n.length?["1F3F4",...n.map((e=>((e.codePointAt(0)||0)+917536).toString(16).toUpperCase())),"E007F"]:[]})(e);return String.fromCodePoint(...n.map((e=>parseInt(e,16))))};function O(e){const{defaultValueId:o,onChange:a}=e,{i18n:l}=L(),s=P(),{cityList:i}=d((e=>e.app)),r=o?i.find((e=>e.id===o)):void 0,c=i.slice().map((e=>({...e,value:s(e.name)}))).sort(((e,n)=>"other"===e.id?1:"other"===n.id?-1:e.value.localeCompare(n.value,l.languages[0])));return t.jsx(p,{data:c,displayHandler:e=>{const o="TW"===e.country&&["zh-Hans","zh-CN"].includes(l.languages[0]);return t.jsxs(t.Fragment,{children:[t.jsx("span",{className:"flag-emoji",children:o?"🏴":n(e.country)}),t.jsx("span",{children:s(e.name)})]})},filter:(e,n)=>{const t=e.toLocaleLowerCase();return n.id.toLocaleLowerCase().includes(t)||Object.values(n.name).some((e=>e.toLowerCase().includes(t)))},value:r&&s(r.name),onChange:e=>null==a?void 0:a(e.id)})}function V(e){const{city:n,defaultValueId:o,onChange:a,onSubmit:l}=e,s=P(),i=k(n),r=o?i.find((e=>e.id===o)):void 0,c=i.map((e=>({...e,value:s(e.name)})));return t.jsx(p,{data:c,displayHandler:e=>t.jsx(h,{name:s(e.name),fg:e.fg||m.white,bg:e.colour}),filter:(e,n)=>{const t=e.toLocaleLowerCase();return n.id.toLocaleLowerCase().includes(t)||Object.values(n.name).some((e=>e.toLocaleLowerCase().includes(t)))},value:r&&s(r.name),onChange:e=>null==a?void 0:a(e.id,e.colour,e.fg||m.white,e.pantone),InputPropsByState:e=>({onKeyDown:({key:n})=>!e&&"Enter"===n&&(null==l?void 0:l())})})}const z=e=>!!e.match(/^#[0-9a-fA-F]{6}$/),R={flexDirection:"column",flex:1,mx:2,overflowX:"hidden",overflowY:"auto","& .chakra-badge":{fontSize:"1em",width:"fit-content",alignSelf:"center",m:1},"& > section:first-of-type":{p:1},"& > section:last-of-type":{w:"100%","& > div:last-of-type":{px:2},"& .rmg-section__header button":{ml:"auto"}}};function $(e){const{defaultTheme:n,sessionId:p,onSubmit:f,onClose:x,onClearHistory:j}=e,{t:y}=L(),{recentlyUsed:b,pantoneReady:S}=d((e=>e.app)),[E,I]=A.useState(null==n?void 0:n[0]),[P,k]=A.useState(null==n?void 0:n[1]),[$,H]=A.useState((null==n?void 0:n[2])||"#AAAAAA"),[T,W]=A.useState((null==n?void 0:n[3])||m.white),[N,U]=A.useState(""),[B,M]=A.useState("color"),Y=()=>{U(""),M((e=>"pantone"===e?"color":e))};A.useEffect((()=>{p&&n&&(I(n[0]),k(n[1]),H(n[2]),W(n[3]),Y())}),[p,null==n?void 0:n.toString()]);const K=[{label:y("Select"),value:"color"},{label:y("RGB"),value:"text"},{label:y("Pantone®"),value:"pantone",disabled:!S}],q=[{label:y("Black"),value:m.black},{label:y("White"),value:m.white}],G=E&&P&&$&&T&&z($),X=()=>{G&&(null==f||f([E,P,$,T],`${E} - ${P}`))},Z=[{type:"custom",label:y("City"),component:t.jsx(O,{defaultValueId:E,onChange:e=>{I(e),k(void 0),H("#AAAAAA"),W(m.white)}})},{type:"custom",label:y("Line"),component:t.jsx(V,{city:E,defaultValueId:P,onChange:(e,n,t,o)=>{k(e),H(n),W(t),o&&U(o)},onSubmit:X})}],J=[{type:"custom",label:y("Input mode"),component:t.jsx(g,{selections:K,defaultValue:B,onChange:e=>M(e)})},{type:"custom",label:y("Pantone® code"),component:t.jsx(w,{value:N,onChange:(e,n)=>{I("other"),k("other"),H(n),U(e)}}),hidden:"pantone"!==B},{type:"input",label:y("Background colour"),variant:"pantone"===B?"color":B,value:$,placeholder:"#F3D03E",validator:z,onChange:e=>{I("other"),k("other"),H(e),Y()},isDisabled:"pantone"===B},{type:"custom",label:y("Foreground colour"),component:t.jsx(g,{selections:q,defaultValue:T,onChange:e=>{I("other"),k("other"),W(e)}})}];return t.jsxs(t.Fragment,{children:[t.jsxs(o,{sx:R,children:[t.jsx(h,{name:y("Example"),fg:T,bg:$}),t.jsxs(v,{children:[t.jsx(F,{hidden:!0}),t.jsx(_,{fields:Z}),t.jsx(_,{fields:J})]}),t.jsxs("section",{children:[t.jsxs(C,{children:[t.jsx(a,{as:"h5",size:"xs",children:y("Recently used")}),t.jsx(l,{variant:"ghost",size:"xs",onClick:j,children:y("Clear")})]}),t.jsx(s,{children:b.map((({theme:e,displayName:n})=>t.jsx(i,{children:t.jsx(r,{size:"xs","aria-label":y("Apply"),title:n,mt:"0.45px",color:e[3],bg:e[2],icon:t.jsx(D,{}),onClick:()=>(e=>{I(e[0]),k(e[1]),H(e[2]),W(e[3]),Y()})(e)})},e.join("-"))))})]})]}),t.jsx(c,{}),t.jsxs(u,{p:2,justifyContent:"flex-end",children:[t.jsx(l,{size:"sm",onClick:x,children:y("Cancel")}),t.jsx(l,{size:"sm",colorScheme:"primary",onClick:X,isDisabled:!G,children:y("Confirm")})]})]})}const H="rmg-palette-bridge--"}}}));
