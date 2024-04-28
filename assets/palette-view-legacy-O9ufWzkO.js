System.register(["./chakra-legacy-d6DHdpZA.js","./index-legacy-lAiOjJQ3.js","./react-legacy-YX5Z9y-r.js","./pantone-input-legacy-X3t8OYcd.js","./ag-grid-react-legacy-jhXO2tT3.js","./use-palette-legacy-p0u2jHMr.js","./line-detail-card-legacy-cbR6pA74.js","./ag-grid-community-legacy-cAJgdTXk.js"],(function(e,a){"use strict";var t,n,l,i,s,r,o,c,d,u,p,g,m,h,f,x,j,y,v,C,b,w,D,R,A,I,L,k,E,S,T,z;return{setters:[e=>{t=e.an,n=e.L,l=e.H,i=e.B,s=e.aq,r=e.K,o=e.ar,c=e.D,d=e.F},e=>{u=e.u,p=e.s,g=e.R,m=e.r,h=e.E,f=e.a,x=e.M,j=e.b,y=e.c,v=e.d,C=e.e,b=e.f,w=e.g,D=e.h},e=>{R=e.l,A=e.u,I=e.o,L=e.r},e=>{k=e.u,E=e.R},e=>{S=e.m},e=>{T=e.u},e=>{z=e.L},null],execute:function(){e("default",(function(){const{isDataLoading:e}=u((e=>e.app));return l.jsxs(w,{children:[e&&l.jsx(D,{isIndeterminate:!0}),l.jsx(H,{}),l.jsxs(d,{flex:1,overflow:"hidden",position:"relative",children:[l.jsx(N,{}),l.jsx(O,{})]})]})}));var a=function(e){var a=e.children,s=t().colorMode,r=n("RmgAgGrid");return l.jsx(i,{className:"light"===s?"ag-theme-alpine":"ag-theme-alpine-dark",sx:r,children:a})};function H(){const{t:e,i18n:a}=R(),t=k(),n=A(),{countryList:i,selectedCountry:o}=u((e=>e.app)),c=i.map((e=>[e.id,t(e.name)])).sort(((e,t)=>e[1].localeCompare(t[1],a.languages[0]))).reduce(((e,a)=>"UN"===a[0]?e:{...e,[a[0]]:a[1]}),{"":e("Please select...")}),d=[{type:"select",label:e("Country/Region"),value:o,options:c,disabledOptions:[""],onChange:e=>n(p(e))}];return l.jsxs(g,{children:[l.jsx(E,{fields:d}),l.jsx(s,{ml:"auto",children:l.jsx(r,{variant:"solid",size:"sm",colorScheme:"primary",onClick:()=>{m.openApp({appId:"rmg-palette-upload"}),m.event(h.ADD_CITY,{})},children:e("Add a city")})})]})}function M(e){const{city:a}=e,t=T(a),n=k();return l.jsx(s,{flexWrap:"wrap",sx:{"& .chakra-badge":{mb:1}},children:t.map((e=>l.jsx(f,{name:n(e.name),fg:e.fg||x.white,bg:e.colour},e.id)))})}function N(){const{t:e,i18n:t}=R(),n=k(),i=j();I();const{cityList:s,selectedCountry:r,sidePanelCity:o}=u((e=>e.app)),c=s.filter((e=>e.country===r)),d=L.useRef(null);L.useEffect((()=>{var e;o||null===(e=d.current)||void 0===e||null===(e=e.api)||void 0===e||e.deselectAll()}),[o]);const p=L.useCallback((({api:e})=>{const a=e.getSelectedRows().map((e=>e.id));1===a.length?i(y(a[0])):i(v())}),[]),g=L.useMemo((()=>[{headerName:e("City"),field:"name",valueFormatter:({value:e})=>n(e),comparator:(e,a)=>n(e).localeCompare(n(a),t.languages[0]),sortable:!0,sort:"asc",wrapText:!0,filter:!0},{headerName:e("Lines"),field:"id",cellRenderer:({value:e})=>l.jsx(M,{city:e}),flex:1,autoHeight:!0,resizable:!1}]),[t.language]),m=L.useMemo((()=>({resizable:!0})),[]);return l.jsx(a,{children:l.jsx(S.AgGridReact,{ref:d,rowData:c,columnDefs:g,defaultColDef:m,getRowId:({data:e})=>e.id,headerHeight:36,rowHeight:36,suppressCellFocus:!0,suppressRowVirtualisation:!0,rowSelection:"single",debug:!1,onSelectionChanged:p})})}const F=410;function O(){var e,a;const{t:t}=R(),n=A(),{sidePanelCity:i,cityList:d}=u((e=>e.app)),p=T(i),g=k()(null!==(e=null===(a=d.find((e=>e.id===i)))||void 0===a?void 0:a.name)&&void 0!==e?e:{});return l.jsxs(C,{isOpen:!!i,width:F,header:"Dummy header",children:[l.jsx(b,{onClose:()=>{n(v())},children:g}),l.jsx(o,{spacing:.5,px:2,flex:1,overflowY:"auto",children:p.map((e=>{var a;const t={...e,nameEntity:Object.entries(e.name),fg:null!==(a=e.fg)&&void 0!==a?a:x.white};return l.jsx(z,{lineDetail:t,editable:!1},e.id)}))}),l.jsx(c,{}),l.jsx(s,{p:1,children:l.jsx(r,{size:"sm",ml:"auto",onClick:async()=>{m.closeApp("rmg-palette-upload"),setTimeout((()=>{m.openApp({appId:"rmg-palette-upload",hash:"/new?city"+i})}),200),m.event(h.EDIT_CITY,{city:i})},children:t("Edit")})})]})}}}}));
