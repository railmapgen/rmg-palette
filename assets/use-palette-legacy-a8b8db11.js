!function(){function t(t,n){return function(t){if(Array.isArray(t))return t}(t)||function(t,r){var n=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=n){var e,u,o,i,a=[],c=!0,l=!1;try{if(o=(n=n.call(t)).next,0===r){if(Object(n)!==n)return;c=!1}else for(;!(c=(e=o.call(n)).done)&&(a.push(e.value),a.length!==r);c=!0);}catch(t){l=!0,u=t}finally{try{if(!c&&null!=n.return&&(i=n.return(),Object(i)!==i))return}finally{if(l)throw u}}return a}}(t,n)||function(t,n){if(!t)return;if("string"==typeof t)return r(t,n);var e=Object.prototype.toString.call(t).slice(8,-1);"Object"===e&&t.constructor&&(e=t.constructor.name);if("Map"===e||"Set"===e)return Array.from(t);if("Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e))return r(t,n)}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function r(t,r){(null==r||r>t.length)&&(r=t.length);for(var n=0,e=new Array(r);n<r;n++)e[n]=t[n];return e}System.register(["./index-legacy-5af855de.js","./react-legacy-a512c684.js"],(function(r,n){"use strict";var e,u;return{setters:[function(t){e=t.a0},function(t){u=t.r}],execute:function(){r("u",(function(r){var n=t(u.useState([]),2),o=n[0],i=n[1];return u.useEffect((function(){if(r){var t=new AbortController;return e(r,t.signal).then((function(t){return i(t)})).catch((function(){return i([])})),function(){t.abort()}}i([])}),[r]),o}))}}}))}();