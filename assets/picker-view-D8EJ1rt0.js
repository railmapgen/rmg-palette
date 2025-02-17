import{j as e,p as V,B as z,g as W,G as I,f as R,e as G,F as Y,t as K,D as X,L as q}from"./mantine-8JTekVFe.js";import{l as M,r as f,o as J}from"./react-BFtFWddK.js";import{u as O,a1 as Q,M as S,f as N,i as T,j as Z,a2 as ee,a3 as te,a4 as ne,a5 as oe,r as w,E as A,a6 as se,c as ae,C as k,a0 as le,b as re,a7 as ce}from"./index-CDWPZH1e.js";import{u as U}from"./use-translated-name-BhARIcv6.js";import{u as ie}from"./use-palette-CgQ-_Q9M.js";import{a as ue,P as de}from"./pantone-input-DmQpXvGB.js";const pe="_body_jalou_1",B={body:pe,"custom-input-group":"_custom-input-group_jalou_8"},Ce=C=>{const t=C.toUpperCase().split("");return t.length===2?t.map(s=>((s.codePointAt(0)||0)+127397).toString(16).toUpperCase()):t.length===5?["1F3F4",...t.map(s=>((s.codePointAt(0)||0)+917536).toString(16).toUpperCase()),"E007F"]:[]},me=C=>{const t=Ce(C);return String.fromCodePoint(...t.map(s=>parseInt(s,16)))};function ge(C){const{defaultValueId:t,onChange:s}=C,{t:j,i18n:g}=M(),{translateName:i}=U(),{countryList:v,cityList:h}=O(n=>n.app),p=h.reduce((n,l)=>({...n,[l.id]:l}),{}),a=v.reduce((n,l)=>({...n,[l.id]:l}),{}),d=t&&t in p?t:null,x=({option:n})=>{const l=p[n.value];return l&&e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"flag-emoji",children:me(Q(l.country))}),e.jsx("span",{children:i(l.name)})]})},o=({options:n,search:l})=>{const c=l.toLocaleLowerCase();return n.filter(u=>{var y,L;const b=p[u.value];return b&&(b.id.toLocaleLowerCase().includes(c)||Object.values(b.name).some(E=>E.toLocaleLowerCase().includes(c))||b.country.toLocaleLowerCase().includes(c)||Object.values((L=(y=a[b.country])==null?void 0:y.name)!=null?L:{}).some(E=>E.toLocaleLowerCase().includes(c)))})},m=h.map(n=>({value:n.id,label:i(n.name)})).sort((n,l)=>n.value==="other"?1:l.value==="other"?-1:n.label.localeCompare(l.label,g.languages[0]));return e.jsx(V,{label:j("City"),data:m,value:d,onChange:n=>n&&(s==null?void 0:s(n)),renderOption:x,searchable:!0,filter:o})}function he(C){const{city:t,defaultValueId:s,onChange:j,onSubmit:g}=C,{t:i}=M(),{translateName:v}=U(),[h,p]=f.useState(!1),a=ie(t),d=a.reduce((c,u)=>({...c,[u.id]:u}),{}),x=s&&s in d?s:null,o=c=>{if(c){const u=d[c];j==null||j(u.id,u.colour,u.fg||S.white,u.pantone)}},m=({option:c})=>{const u=d[c.value];return u&&e.jsx(z,{size:"lg",radius:"sm",color:u.colour,style:{color:u.fg||S.white},children:v(u.name)})},n=({options:c,search:u})=>{const b=u.toLocaleLowerCase();return c.filter(y=>{const L=d[y.value];return L&&(L.id.toLocaleLowerCase().includes(b)||Object.values(L.name).some(E=>E.toLocaleLowerCase().includes(b)))})},l=a.map(c=>({value:c.id,label:v(c.name)}));return e.jsx(V,{label:i("Line"),data:l,value:x,onChange:o,renderOption:m,searchable:!0,filter:n,onDropdownOpen:()=>p(!0),onDropdownClose:()=>p(!1),onKeyDown:({key:c})=>!h&&c==="Enter"&&(g==null?void 0:g()),disabled:!t})}function je({onApply:C}){const{t}=M(),s=N(),{recentlyUsed:j}=O(a=>a.app),[g,i]=f.useState(!1),v=t(g?"Remove":"Apply"),h=a=>{s(oe(a)),w.event(A.REMOVE_HISTORY_ITEM,{})},p=()=>{s(se()),w.event(A.CLEAR_HISTORY,{})};return e.jsxs(T,{w:"100%",children:[e.jsxs(Z,{children:[e.jsx(W,{order:2,size:"h4",children:t("Recently used")}),e.jsx(I,{gap:"xs",ml:"auto",children:g?e.jsxs(e.Fragment,{children:[e.jsx(R,{variant:"default",size:"xs",onClick:p,children:t("Clear all")}),e.jsx(R,{size:"xs",onClick:()=>i(!1),children:t("Done")})]}):e.jsx(R,{variant:"default",size:"xs",onClick:()=>i(!0),children:t("Clear")})})]}),e.jsx(ee,{children:e.jsx(I,{gap:"xs",p:"xs",children:j.map(({theme:a,displayName:d},x)=>e.jsx(te,{bg:a[2],fg:a[3],"aria-label":v+" "+d,title:v+" "+d,onClick:()=>g?h(x):C(a),children:g?e.jsx(ne,{}):"Aa"},a.join("-")))})})]})}const xe=C=>!!C.match(/^#[0-9a-fA-F]{6}$/);function fe(C){const{defaultTheme:t,sessionId:s,onSubmit:j,onClose:g}=C,{t:i}=M(),{pantoneReady:v}=O(r=>r.app),[h,p]=f.useState(t==null?void 0:t[0]),[a,d]=f.useState(t==null?void 0:t[1]),[x,o]=f.useState((t==null?void 0:t[2])||"#AAAAAA"),[m,n]=f.useState((t==null?void 0:t[3])||S.white),[l,c]=f.useState(""),[u,b]=f.useState("rgb"),y=()=>{c(""),b(r=>r==="pantone"?"rgb":r)};f.useEffect(()=>{s&&t&&(p(t[0]),d(t[1]),o(t[2]),n(t[3]),y())},[s,t==null?void 0:t.toString()]);const L=[{label:i("RGB"),value:"rgb"},{label:i("Pantone®"),value:"pantone",disabled:!v}],E=[{label:i("Black"),value:S.black},{label:i("White"),value:S.white}],_=h&&a&&x&&m&&xe(x),F=()=>{if(_){const r="".concat(h," - ").concat(a),P=x.toLowerCase();j==null||j([h,a,P,m],r)}},$=r=>{p(r[0]),d(r[1]),o(r[2]),n(r[3]),y()};return e.jsxs(e.Fragment,{children:[e.jsx(ae,{children:e.jsxs(G,{className:B.body,children:[e.jsx(Y,{children:e.jsx(z,{size:"xl",radius:"sm",color:x,style:{color:m},children:i("Example")})}),e.jsxs(I,{w:"100%",grow:!0,children:[e.jsx(ge,{defaultValueId:h,onChange:r=>{p(r),d(void 0),o("#AAAAAA"),n(S.white)}}),e.jsx(he,{city:h,defaultValueId:a,onChange:(r,P,H,D)=>{d(r),o(P),n(H),D&&c(D)},onSubmit:F})]}),e.jsx(ue,{display:"none"}),e.jsxs(I,{w:"100%",className:B["custom-input-group"],children:[e.jsx(k,{size:"sm",label:i("Input mode"),data:L,value:u,onChange:r=>b(r)}),u==="pantone"&&e.jsx(de,{value:l,onChange:(r,P)=>{p("other"),d("other"),o(P),c(r)}}),u!=="pantone"&&e.jsx(K,{label:i("Background colour"),value:x,onChange:r=>{p("other"),d("other"),o(r),y()}}),e.jsx(k,{size:"sm",label:i("Foreground colour"),data:E,value:m,onChange:r=>{p("other"),d("other"),n(r)}})]}),e.jsx(je,{onApply:$})]})}),e.jsx(X,{}),e.jsx(le,{children:e.jsxs(I,{ml:"auto",gap:"sm",children:[e.jsx(R,{variant:"default",size:"sm",onClick:g,children:i("Cancel")}),e.jsx(R,{variant:"filled",size:"sm",onClick:F,disabled:!_,children:i("Confirm")})]})})]})}const ve="rmg-palette-bridge--";function Ie(){const[C]=J(),t=C.get("parentId"),s=C.get("parentComponent"),j=N(),{isDataLoading:g}=O(o=>o.app),[i,v]=f.useState(),[h,p]=f.useState(),a=f.useRef(null);f.useEffect(()=>{const o=new BroadcastChannel(ve+t);return a.current=o,w.event(A.APP_CLIP_VIEW_OPENED,{parentComponent:s}),o.onmessage=m=>{const{event:n,data:l}=m.data;console.log("[".concat(o.name,"] Received event from parent component:"),n),n==="OPEN"&&(v(crypto.randomUUID()),p(l))},console.log("[".concat(o.name,"] App clip connection established, parentComponent=").concat(s)),o.postMessage({event:"LOADED"}),()=>{o.close()}},[]);const d=(o,m)=>{var n,l;console.log("[".concat((n=a.current)==null?void 0:n.name,"] Emitting SELECT event, theme:"),o),(l=a.current)==null||l.postMessage({event:"SELECT",data:o}),j(ce({theme:o,displayName:m})),w.event(A.APP_CLIP_VIEW_SELECT,{parentComponent:s,theme:o})},x=()=>{var o,m;console.log("[".concat((o=a.current)==null?void 0:o.name,"] Emitting CLOSE event")),(m=a.current)==null||m.postMessage({event:"CLOSE"}),w.event(A.APP_CLIP_VIEW_CLOSED,{parentComponent:s})};return e.jsxs(re,{children:[e.jsx(q,{visible:g}),e.jsx(fe,{defaultTheme:h,sessionId:i,onSubmit:d,onClose:x})]})}export{Ie as default};
