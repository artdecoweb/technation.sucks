function l(a){var b=0;return function(){return b<a.length?{done:!1,value:a[b++]}:{done:!0}}}function t(a){var b="undefined"!=typeof Symbol&&Symbol.iterator&&a[Symbol.iterator];return b?b.call(a):{next:l(a)}}function aa(a){for(var b,c=[];!(b=a.next()).done;)c.push(b.value);return c}var ba="function"==typeof Object.create?Object.create:function(a){function b(){}b.prototype=a;return new b},v;
if("function"==typeof Object.setPrototypeOf)v=Object.setPrototypeOf;else{var w;a:{var ca={F:!0},x={};try{x.__proto__=ca;w=x.F;break a}catch(a){}w=!1}v=w?function(a,b){a.__proto__=b;if(a.__proto__!==b)throw new TypeError(a+" is not extensible");return a}:null}var z=v;
function A(a,b){a.prototype=ba(b.prototype);a.prototype.constructor=a;if(z)z(a,b);else for(var c in b)if("prototype"!=c)if(Object.defineProperties){var f=Object.getOwnPropertyDescriptor(b,c);f&&Object.defineProperty(a,c,f)}else a[c]=b[c];a.M=b.prototype}var B="undefined"!=typeof window&&window===this?this:"undefined"!=typeof global&&null!=global?global:this,C="function"==typeof Object.defineProperties?Object.defineProperty:function(a,b,c){a!=Array.prototype&&a!=Object.prototype&&(a[b]=c.value)};
function D(a,b){if(b){var c=B;a=a.split(".");for(var f=0;f<a.length-1;f++){var g=a[f];g in c||(c[g]={});c=c[g]}a=a[a.length-1];f=c[a];b=b(f);b!=f&&null!=b&&C(c,a,{configurable:!0,writable:!0,value:b})}}
D("Promise",function(a){function b(e){this.b=0;this.i=void 0;this.a=[];var d=this.c();try{e(d.resolve,d.reject)}catch(k){d.reject(k)}}function c(){this.a=null}function f(e){return e instanceof b?e:new b(function(d){d(e)})}if(a)return a;c.prototype.b=function(e){if(null==this.a){this.a=[];var d=this;this.c(function(){d.i()})}this.a.push(e)};var g=B.setTimeout;c.prototype.c=function(e){g(e,0)};c.prototype.i=function(){for(;this.a&&this.a.length;){var e=this.a;this.a=[];for(var d=0;d<e.length;++d){var k=
e[d];e[d]=null;try{k()}catch(m){this.g(m)}}}this.a=null};c.prototype.g=function(e){this.c(function(){throw e;})};b.prototype.c=function(){function e(m){return function(n){k||(k=!0,m.call(d,n))}}var d=this,k=!1;return{resolve:e(this.I),reject:e(this.g)}};b.prototype.I=function(e){if(e===this)this.g(new TypeError("A Promise cannot resolve to itself"));else if(e instanceof b)this.J(e);else{a:switch(typeof e){case "object":var d=null!=e;break a;case "function":d=!0;break a;default:d=!1}d?this.v(e):this.j(e)}};
b.prototype.v=function(e){var d=void 0;try{d=e.then}catch(k){this.g(k);return}"function"==typeof d?this.K(d,e):this.j(e)};b.prototype.g=function(e){this.l(2,e)};b.prototype.j=function(e){this.l(1,e)};b.prototype.l=function(e,d){if(0!=this.b)throw Error("Cannot settle("+e+", "+d+"): Promise already settled in state"+this.b);this.b=e;this.i=d;this.s()};b.prototype.s=function(){if(null!=this.a){for(var e=0;e<this.a.length;++e)h.b(this.a[e]);this.a=null}};var h=new c;b.prototype.J=function(e){var d=this.c();
e.u(d.resolve,d.reject)};b.prototype.K=function(e,d){var k=this.c();try{e.call(d,k.resolve,k.reject)}catch(m){k.reject(m)}};b.prototype.then=function(e,d){function k(p,r){return"function"==typeof p?function(u){try{m(p(u))}catch(y){n(y)}}:r}var m,n,q=new b(function(p,r){m=p;n=r});this.u(k(e,m),k(d,n));return q};b.prototype.catch=function(e){return this.then(void 0,e)};b.prototype.u=function(e,d){function k(){switch(m.b){case 1:e(m.i);break;case 2:d(m.i);break;default:throw Error("Unexpected state: "+
m.b);}}var m=this;null==this.a?h.b(k):this.a.push(k)};b.resolve=f;b.reject=function(e){return new b(function(d,k){k(e)})};b.race=function(e){return new b(function(d,k){for(var m=t(e),n=m.next();!n.done;n=m.next())f(n.value).u(d,k)})};b.all=function(e){var d=t(e),k=d.next();return k.done?f([]):new b(function(m,n){function q(u){return function(y){p[u]=y;r--;0==r&&m(p)}}var p=[],r=0;do p.push(void 0),r++,f(k.value).u(q(p.length-1),n),k=d.next();while(!k.done)})};return b});
function E(){E=function(){};B.Symbol||(B.Symbol=da)}function F(a,b){this.a=a;C(this,"description",{configurable:!0,writable:!0,value:b})}F.prototype.toString=function(){return this.a};var da=function(){function a(c){if(this instanceof a)throw new TypeError("Symbol is not a constructor");return new F("jscomp_symbol_"+(c||"")+"_"+b++,c)}var b=0;return a}();
function G(){E();var a=B.Symbol.iterator;a||(a=B.Symbol.iterator=B.Symbol("Symbol.iterator"));"function"!=typeof Array.prototype[a]&&C(Array.prototype,a,{configurable:!0,writable:!0,value:function(){return ea(l(this))}});G=function(){}}function ea(a){G();a={next:a};a[B.Symbol.iterator]=function(){return this};return a}function H(){this.j=!1;this.c=null;this.l=void 0;this.b=1;this.g=this.i=0;this.v=this.a=null}function I(a){if(a.j)throw new TypeError("Generator is already running");a.j=!0}
H.prototype.s=function(a){this.l=a};function J(a,b){a.a={A:b,B:!0};a.b=a.i||a.g}H.prototype.return=function(a){this.a={return:a};this.b=this.g};function K(a,b,c){a.b=c;return{value:b}}H.prototype.o=function(a){this.b=a};function fa(a){this.a=new H;this.b=a}function ha(a,b){I(a.a);var c=a.a.c;if(c)return L(a,"return"in c?c["return"]:function(f){return{value:f,done:!0}},b,a.a.return);a.a.return(b);return M(a)}
function L(a,b,c,f){try{var g=b.call(a.a.c,c);if(!(g instanceof Object))throw new TypeError("Iterator result "+g+" is not an object");if(!g.done)return a.a.j=!1,g;var h=g.value}catch(e){return a.a.c=null,J(a.a,e),M(a)}a.a.c=null;f.call(a.a,h);return M(a)}function M(a){for(;a.a.b;)try{var b=a.b(a.a);if(b)return a.a.j=!1,{value:b.value,done:!1}}catch(c){a.a.l=void 0,J(a.a,c)}a.a.j=!1;if(a.a.a){b=a.a.a;a.a.a=null;if(b.B)throw b.A;return{value:b.return,done:!0}}return{value:void 0,done:!0}}
function ia(a){this.next=function(b){I(a.a);a.a.c?b=L(a,a.a.c.next,b,a.a.s):(a.a.s(b),b=M(a));return b};this.throw=function(b){I(a.a);a.a.c?b=L(a,a.a.c["throw"],b,a.a.s):(J(a.a,b),b=M(a));return b};this.return=function(b){return ha(a,b)};G();this[Symbol.iterator]=function(){return this}}function ja(a){function b(f){return a.next(f)}function c(f){return a.throw(f)}return new Promise(function(f,g){function h(e){e.done?f(e.value):Promise.resolve(e.value).then(b,c).then(h,g)}h(a.next())})}
function ka(a,b){G();a instanceof String&&(a+="");var c=0,f={next:function(){if(c<a.length){var g=c++;return{value:b(g,a[g]),done:!1}}f.next=function(){return{done:!0,value:void 0}};return f.next()}};f[Symbol.iterator]=function(){return f};return f}D("Array.prototype.values",function(a){return a?a:function(){return ka(this,function(b,c){return c})}});var N=preact,O=N.h,P=N.Component,la=N.render;function Q(a,b){var c=this.props,f=c.name,g=a.value;if(this.context.values[f]!=b.values[f])return!0;if(c.value!=g){if(b.onChange)b.onChange(a.name,g);return!1}};function R(){var a=P.call(this)||this;a.props=a.props;return a}A(R,P);R.prototype.shouldComponentUpdate=function(a,b,c){return Q.call(this,a,c)};R.prototype.componentDidMount=function(){var a=this.props,b=t(a.children).next().value;a=a.name;var c=this.context.onChange;b&&c(a,b.trim())};
R.prototype.render=function(a){var b=a.name,c=a.children,f=this.context,g=f.onChange,h=void 0===f.values?{}:f.values;return O("textarea",{required:a.required,name:b,placeholder:a.placeholder,"aria-describedby":f.m,className:"form-control",id:f.id,onChange:function(e){g(b,e.currentTarget.value)},rows:void 0===a.rows?3:a.rows},b in h?h[b]:c)};function S(){var a=P.call(this)||this;a.props=a.props;return a}A(S,P);S.prototype.shouldComponentUpdate=function(a,b,c){return Q.call(this,a,c)};S.prototype.componentDidMount=function(){var a=this.props,b=a.value;a=a.name;var c=this.context.onChange;void 0!==b&&c&&c(a,b)};
S.prototype.render=function(a){var b=Object.assign({},a),c=a.required,f=a.name,g=a.placeholder,h=void 0===a.type?"text":a.type,e=a.file;a=a.value;b=(delete b.required,delete b.name,delete b.placeholder,delete b.type,delete b.file,delete b.value,b);var d=this.context,k=d.onChange,m=void 0===d.values?{}:d.values;return O("input",Object.assign({},b,{required:c,name:f,placeholder:g,className:"form-control"+(e?"-file":""),value:f in m?m[f]:a,type:h,"aria-describedby":d.m,id:d.id,onChange:function(n){k(f,
n.currentTarget.value)}}))};function ma(a,b){return b=b||{},new Promise(function(c,f){function g(){return{ok:2==(h.status/100|0),statusText:h.statusText,status:h.status,url:h.responseURL,text:function(){return Promise.resolve(h.responseText)},json:function(){return Promise.resolve(JSON.parse(h.responseText))},blob:function(){return Promise.resolve(new Blob([h.response]))},clone:g,headers:{keys:function(){return e},entries:function(){return d},get:function(n){return k[n.toLowerCase()]},has:function(n){return n.toLowerCase()in
k}}}}var h=new XMLHttpRequest,e=[],d=[],k={},m;for(m in h.open(b.method||"get",a,!0),h.onload=function(){h.getAllResponseHeaders().replace(/^(.*?):[^\S\n]*([\s\S]*?)$/gm,function(n,q,p){e.push(q=q.toLowerCase());d.push([q,p]);k[q]=k[q]?k[q]+","+p:p});c(g())},h.onerror=f,h.withCredentials="include"==b.credentials,b.headers)h.setRequestHeader(m,b.headers[m]);h.send(b.body||null)})};function T(){var a=P.call(this)||this;a.props=a.props;a.state={formLoading:!1,error:null,success:null};return a}A(T,P);
T.prototype.a=function(a){var b=this,c,f,g,h,e;return ja(new ia(new fa(function(d){switch(d.b){case 1:a.preventDefault();if(!b.props.path)return b.setState({error:"Path is not set in the properties of the form."}),d.return(!1);b.setState({error:null,success:null});c=new FormData(a.target);b.setState({formLoading:!0});d.i=2;d.g=3;return K(d,ma(b.props.path,{method:"POST",body:c}),5);case 5:return f=d.l,K(d,f.json(),6);case 6:g=d.l,(h=g.error)?b.setState({error:h}):b.setState({success:1});case 3:d.v=
[d.a];d.i=0;d.g=0;b.setState({formLoading:!1});var k=d.v.splice(0)[0];(k=d.a=d.a||k)?k.B?d.b=d.i||d.g:void 0!=k.o&&d.g<k.o?(d.b=k.o,d.a=null):d.b=d.g:d.b=4;break;case 2:d.i=0;k=d.a.A;d.a=null;e=k;b.setState({error:e});d.o(3);break;case 4:if(!b.props.submitFinish){d.o(7);break}return K(d,b.props.submitFinish(f),7);case 7:return d.return(!1)}})))};function U(){var a=P.call(this)||this;a.state={values:{}};a.props=a.props;return a}A(U,P);U.prototype.getChildContext=function(){return{values:this.state.values,onChange:this.onChange.bind(this)}};U.prototype.onChange=function(a,b){var c={};this.setState({values:Object.assign({},this.state.values,(c[a]=b,c))});if(this.props.onChange)this.props.onChange(this.state.values)};
U.prototype.render=function(a){var b=Object.assign({},a),c=a.children,f=a.formRef;a=a.onSubmit;b=(delete b.children,delete b.formRef,delete b.onSubmit,delete b.onChange,b);return O("form",Object.assign({},b,{ref:f,onSubmit:a}),c)};function V(){var a=P.call(this)||this;a.id="i"+Math.floor(1E5*Math.random());a.m="h"+a.id;a.props=a.props;return a}A(V,P);V.prototype.getChildContext=function(){return{id:this.id,m:this.m}};
V.prototype.render=function(a){var b=a.children,c=a.label;a=a.help;return O("div",{className:"form-group"},c&&O("label",{htmlFor:this.id},c),b,a&&O("small",{id:this.m,dangerouslySetInnerHTML:{__html:a},className:"form-text text-muted"}))};
function na(a){var b=a.loading,c=a.confirmText,f=void 0===a.loadingText?c:a.loadingText;a=["btn","btn-"+((void 0===a.outline?0:a.outline)?"outline-":"")+(void 0===a.type?"primary":a.type),a.className].filter(Boolean);return O("button",{className:a.join(" "),type:"submit",disabled:b},b&&O("span",{className:"spinner-border spinner-border-sm"+(f?" mr-2":""),role:"status","aria-hidden":"true"}),b?f:c)};function W(a){var b=a.linkedin_user;a=a.github_user;var c;if(b)var f=b.profilePicture;else a&&(f=a.avatar_url);b?c=b.firstName+" "+b.lastName:a&&(c=a.name||a.login);return{D:f,name:c}};function X(){return T.apply(this,arguments)||this}A(X,T);
X.prototype.render=function(a){var b=this,c=Object.assign({},a),f=a.onChange;a=a.f;c=(delete c.onChange,delete c.f,c);var g=this.state,h=g.formLoading,e=g.error;g=g.success;var d=W(a),k=d.D;d=d.name;return O(U,Object.assign({},c,{onSubmit:this.a.bind(this),onChange:function(m){b.setState({error:null,success:null});f&&f(m)}}),k&&O(S,{value:k,type:"hidden",name:"photo"}),O(S,{value:a.csrf,type:"hidden",name:"csrf"}),O(V,{label:"Name*",help:"This will appear on the website"},O(S,{value:d,name:"name"})),
O(V,{help:a.github_user?"GitHub username":"Please sign in with GitHub",label:"GitHub"},O(S,{value:a.github_user?a.github_user.html_url:null,name:"github",disabled:!0})),O(V,{label:"Comment*",help:"Please enter your opinion"},O(R,{required:!0,name:"comment"},"I think you're right/wrong because...")),O(na,{loading:h,type:"warning",confirmText:"Submit Data"}),e&&"Error: "+e,g&&"Comment has been submitted!")};function Y(a){var b=void 0===b?{}:b;var c=window.top,f=c.outerHeight,g=c.screenY,h=[];h.push("width=500","left="+(c.outerWidth/2+c.screenX-250));h.push("top="+(f/2+g-305-50),"height=610");c=Object.keys(b).map(function(e){return e+"="+b[e]});h.push.apply(h,c instanceof Array?c:aa(t(c)));window.open(a,"Sign In",h.join(","))};function oa(a){a=void 0===a?"":a;var b=document.head,c=document.createElement("style");c.type="text/css";c.styleSheet?c.styleSheet.cssText=a:c.appendChild(document.createTextNode(a));b.appendChild(c)};oa(".LinkedInButton {\n  background: #0077B5;\n  display: inline-table;\n  border-radius: 3px;\n  font-family: Helvetica Neue,Helvetica,Arial,sans-serif;\n  text-decoration: none;\n  color: white !important;\n  cursor: pointer;\n}\n.LinkedInButton .LinkedInIn {\n  font-family: 'Myriad Pro', 'Gill Sans', 'Gill Sans MT', Calibri, sans-serif;\n  padding-left: 6px;\n  padding-right: 5px;\n  border-right: 1px solid #0369A0;\n  border-radius: 3px;\n  font-weight: 600;\n  background: #0077B5;\n  display: table-cell;\n  vertical-align: middle;\n}\n.LinkedInButton .LinkedInText {\n  padding-left: .5em;\n  padding-right: .5em;\n  font-size: smaller;\n  display: table-cell;\n  vertical-align: middle;\n}");function pa(a){var b=void 0===a.size?"medium":a.size,c=a.host,f=void 0===a.w?"/linkedin":a.w,g;"medium"==b?g=1.5:"large"==b&&(g=2);return O("a",{onClick:function(h){h.preventDefault();Y(""+c+f);return!1},onMouseOver:function(h){h.currentTarget.style.background="#0369A0"},onMouseOut:function(h){h.currentTarget.style.background="#0077B5"},className:"LinkedInButton"},O("div",{style:"font-size:"+g+"rem;",className:"LinkedInIn"},"in"),O("div",{className:"LinkedInText"},"Sign In With LinkedIn"))};function qa(a){return O("svg",Object.assign({},a,{role:"img",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"}),O("title",{},"GitHub icon"),O("path",{d:"M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"}))}
;oa(".GitHubButton {\n  background: #dfdfdf;\n  display: inline-table;\n  border-radius: 3px;\n  font-family: Helvetica Neue,Helvetica,Arial,sans-serif;\n  text-decoration: none;\n  color: black !important;\n  cursor: pointer;\n}\n.GitHubButton .GitHubLogo {\n  padding: 0px 6px 0px 5px;\n  border-right: 1px solid #bcbcbc;\n  border-radius: 3px;\n  font-weight: 600;\n  background: rgb(223, 223, 223);\n  display: table-cell;\n  vertical-align: middle;\n}\n.GitHubButton .GitHubText {\n  padding-left: .5em;\n  padding-right: .5em;\n  font-size: smaller;\n  display: table-cell;\n  vertical-align: middle;\n}");function ra(a){var b=void 0===a.size?"medium":a.size,c=a.host,f=void 0===a.w?"/github":a.w,g;"medium"==b?g=1.5:"large"==b&&(g=2);return O("a",{onClick:function(h){h.preventDefault();Y(""+c+f);return!1},onMouseOver:function(h){h.currentTarget.style.background="#bcbcbc"},onMouseOut:function(h){h.currentTarget.style.background="#DFDFDF"},className:"GitHubButton"},O("div",{style:"height:"+g+"rem;font-size:"+g+"rem",className:"GitHubLogo"},O(qa,{height:"100%",style:"margin-top:-4px"})),O("div",{className:"GitHubText"},
"Sign In With GitHub"))};function sa(a,b,c){function f(){var m=[],n=[],q={},p;d.getAllResponseHeaders().replace(/^(.*?):[^\S\n]*([\s\S]*?)$/gm,function(r,u,y){m.push(u=u.toLowerCase());n.push([u,y]);p=q[u];q[u]=p?p+","+y:y});return{ok:2==(d.status/100|0),status:d.status,statusText:d.statusText,url:d.responseURL,clone:f,text:function(){return d.responseText},json:function(){return JSON.parse(d.responseText)},blob:function(){return new Blob([d.response])},headers:{keys:function(){return m},entries:function(){return n},get:function(r){return q[r.toLowerCase()]},
has:function(r){return r.toLowerCase()in q}}}}c=void 0===c?{}:c;var g=void 0===c.headers?{}:c.headers,h=c.credentials,e=void 0===c.body?null:c.body,d=new XMLHttpRequest;d.open(void 0===c.method?"get":c.method,a,!0);for(var k in g)d.setRequestHeader(k,g[k]);d.withCredentials="include"==h;d.onload=function(){b(null,f())};d.onerror=function(){b("Could not load the resource at "+a+".")};d.send(e)};function ta(a,b,c){var f=new FormData;f.append("csrf",b);sa(a+"/signout",function(g,h){if(g)return c(g.message);g=h.json().error;c(g)},{method:"POST",headers:{L:"application/json"},body:f,credentials:"include"})}
function ua(a){var b=a.f,c=void 0===a.C?function(){}:a.C,f=a.host;a=b.github_user;var g=b.csrf;if(!b.linkedin_user&&!a)return null;b=W(b);a=b.name;return O("div",{},O("img",{src:b.D,width:"50"}),"Hello, ",a,"!"," ",O("a",{onClick:function(h){h.preventDefault();ta(f,g,function(e){e?alert("Could not sign out: "+e+". Please refresh the page and try again. Alternatively, clear your cookies."):c()});return!1},href:"#"},"Sign Out"))};function Z(){var a=P.call(this)||this;a.state={loading:!0,error:null,f:{}};a.a=a.b.bind(a);window.addEventListener("message",a.a,!1);return a}A(Z,P);Z.prototype.componentDidMount=function(){this.f()};Z.prototype.f=function(){var a=this;this.setState({loading:!0});sa(this.props.host+"/auth",function(b,c){a.setState({loading:!1});if(b)return a.setState({error:b});b=c.json();a.setState({f:b})},{credentials:"include"})};Z.prototype.b=function(a){a.origin==this.props.host&&"signedin"==a.data&&this.f()};
Z.prototype.componentWillUnmount=function(){window.removeEventListener("message",this.a)};Z.prototype.render=function(){var a=this;return O("div",{},O(va,{error:this.state.error,loading:this.state.loading,f:this.state.f,host:this.props.host,H:function(){a.setState({f:{}})}}),O(X,{path:this.props.host+"/comment",f:this.state.f}))};
function va(a){var b=a.error,c=a.loading,f=a.f,g=a.H;a=a.host;return b?O("div",{},"Error: ",b):c?O("div",{},"Loading..."):O("div",{},!(f.linkedin_user||f.github_user)&&O("span",{style:"display:block"},"To display the profile image and validate your GitHub profile, sign in. No advanced permissions are required other than default ones (no email). Your public LinkedIn ID remains unknown. You will not be able to delete/edit your comment as a guest.",O("a",{href:"https://www.technation.sucks/privacy-policy.html"},
"Privacy Policy")),O(ua,{f:f,C:g,host:a}),!f.linkedin_user&&O(pa,{host:a}),!f.linkedin_user&&" ",!f.github_user&&O(ra,{host:a}))}window.comments=function(a){var b=void 0===a.G?"preact":a.G;la(O(Z,{host:void 0===a.host?"https://api.technation.sucks":a.host}),document.getElementById(b))};

//# sourceMappingURL=comments.js.map