function aa(a){var b=0;return function(){return b<a.length?{done:!1,value:a[b++]}:{done:!0}}}function k(a){var b="undefined"!=typeof Symbol&&Symbol.iterator&&a[Symbol.iterator];return b?b.call(a):{next:aa(a)}}function t(a){if(!(a instanceof Array)){a=k(a);for(var b,c=[];!(b=a.next()).done;)c.push(b.value);a=c}return a}var ba="function"==typeof Object.create?Object.create:function(a){function b(){}b.prototype=a;return new b},v;
if("function"==typeof Object.setPrototypeOf)v=Object.setPrototypeOf;else{var w;a:{var ca={J:!0},da={};try{da.__proto__=ca;w=da.J;break a}catch(a){}w=!1}v=w?function(a,b){a.__proto__=b;if(a.__proto__!==b)throw new TypeError(a+" is not extensible");return a}:null}var ea=v;
function y(a,b){a.prototype=ba(b.prototype);a.prototype.constructor=a;if(ea)ea(a,b);else for(var c in b)if("prototype"!=c)if(Object.defineProperties){var d=Object.getOwnPropertyDescriptor(b,c);d&&Object.defineProperty(a,c,d)}else a[c]=b[c];a.R=b.prototype}var z="undefined"!=typeof window&&window===this?this:"undefined"!=typeof global&&null!=global?global:this,A="function"==typeof Object.defineProperties?Object.defineProperty:function(a,b,c){a!=Array.prototype&&a!=Object.prototype&&(a[b]=c.value)};
function B(a,b){if(b){var c=z;a=a.split(".");for(var d=0;d<a.length-1;d++){var f=a[d];f in c||(c[f]={});c=c[f]}a=a[a.length-1];d=c[a];b=b(d);b!=d&&null!=b&&A(c,a,{configurable:!0,writable:!0,value:b})}}
B("Promise",function(a){function b(g){this.b=0;this.i=void 0;this.a=[];var e=this.f();try{g(e.resolve,e.reject)}catch(l){e.reject(l)}}function c(){this.a=null}function d(g){return g instanceof b?g:new b(function(e){e(g)})}if(a)return a;c.prototype.b=function(g){if(null==this.a){this.a=[];var e=this;this.f(function(){e.i()})}this.a.push(g)};var f=z.setTimeout;c.prototype.f=function(g){f(g,0)};c.prototype.i=function(){for(;this.a&&this.a.length;){var g=this.a;this.a=[];for(var e=0;e<g.length;++e){var l=
g[e];g[e]=null;try{l()}catch(m){this.g(m)}}}this.a=null};c.prototype.g=function(g){this.f(function(){throw g;})};b.prototype.f=function(){function g(m){return function(n){l||(l=!0,m.call(e,n))}}var e=this,l=!1;return{resolve:g(this.M),reject:g(this.g)}};b.prototype.M=function(g){if(g===this)this.g(new TypeError("A Promise cannot resolve to itself"));else if(g instanceof b)this.N(g);else{a:switch(typeof g){case "object":var e=null!=g;break a;case "function":e=!0;break a;default:e=!1}e?this.w(g):this.j(g)}};
b.prototype.w=function(g){var e=void 0;try{e=g.then}catch(l){this.g(l);return}"function"==typeof e?this.O(e,g):this.j(g)};b.prototype.g=function(g){this.m(2,g)};b.prototype.j=function(g){this.m(1,g)};b.prototype.m=function(g,e){if(0!=this.b)throw Error("Cannot settle("+g+", "+e+"): Promise already settled in state"+this.b);this.b=g;this.i=e;this.v()};b.prototype.v=function(){if(null!=this.a){for(var g=0;g<this.a.length;++g)h.b(this.a[g]);this.a=null}};var h=new c;b.prototype.N=function(g){var e=this.f();
g.A(e.resolve,e.reject)};b.prototype.O=function(g,e){var l=this.f();try{g.call(e,l.resolve,l.reject)}catch(m){l.reject(m)}};b.prototype.then=function(g,e){function l(p,r){return"function"==typeof p?function(u){try{m(p(u))}catch(x){n(x)}}:r}var m,n,q=new b(function(p,r){m=p;n=r});this.A(l(g,m),l(e,n));return q};b.prototype.catch=function(g){return this.then(void 0,g)};b.prototype.A=function(g,e){function l(){switch(m.b){case 1:g(m.i);break;case 2:e(m.i);break;default:throw Error("Unexpected state: "+
m.b);}}var m=this;null==this.a?h.b(l):this.a.push(l)};b.resolve=d;b.reject=function(g){return new b(function(e,l){l(g)})};b.race=function(g){return new b(function(e,l){for(var m=k(g),n=m.next();!n.done;n=m.next())d(n.value).A(e,l)})};b.all=function(g){var e=k(g),l=e.next();return l.done?d([]):new b(function(m,n){function q(u){return function(x){p[u]=x;r--;0==r&&m(p)}}var p=[],r=0;do p.push(void 0),r++,d(l.value).A(q(p.length-1),n),l=e.next();while(!l.done)})};return b});
function fa(){fa=function(){};z.Symbol||(z.Symbol=ha)}function ia(a,b){this.a=a;A(this,"description",{configurable:!0,writable:!0,value:b})}ia.prototype.toString=function(){return this.a};var ha=function(){function a(c){if(this instanceof a)throw new TypeError("Symbol is not a constructor");return new ia("jscomp_symbol_"+(c||"")+"_"+b++,c)}var b=0;return a}();
function C(){fa();var a=z.Symbol.iterator;a||(a=z.Symbol.iterator=z.Symbol("Symbol.iterator"));"function"!=typeof Array.prototype[a]&&A(Array.prototype,a,{configurable:!0,writable:!0,value:function(){return ja(aa(this))}});C=function(){}}function ja(a){C();a={next:a};a[z.Symbol.iterator]=function(){return this};return a}function D(){this.m=!1;this.i=null;this.f=void 0;this.a=1;this.g=this.j=0;this.w=this.b=null}function E(a){if(a.m)throw new TypeError("Generator is already running");a.m=!0}
D.prototype.v=function(a){this.f=a};function F(a,b){a.b={D:b,F:!0};a.a=a.j||a.g}D.prototype.return=function(a){this.b={return:a};this.a=this.g};function G(a,b,c){a.a=c;return{value:b}}D.prototype.o=function(a){this.a=a};function H(a,b){a.j=2;void 0!=b&&(a.g=b)}function I(a){a.j=0;var b=a.b.D;a.b=null;return b}function ka(a,b){var c=a.w.splice(0)[0];(c=a.b=a.b||c)?c.F?a.a=a.j||a.g:void 0!=c.o&&a.g<c.o?(a.a=c.o,a.b=null):a.a=a.g:a.a=b}function la(a){this.a=new D;this.b=a}
function ma(a,b){E(a.a);var c=a.a.i;if(c)return J(a,"return"in c?c["return"]:function(d){return{value:d,done:!0}},b,a.a.return);a.a.return(b);return K(a)}function J(a,b,c,d){try{var f=b.call(a.a.i,c);if(!(f instanceof Object))throw new TypeError("Iterator result "+f+" is not an object");if(!f.done)return a.a.m=!1,f;var h=f.value}catch(g){return a.a.i=null,F(a.a,g),K(a)}a.a.i=null;d.call(a.a,h);return K(a)}
function K(a){for(;a.a.a;)try{var b=a.b(a.a);if(b)return a.a.m=!1,{value:b.value,done:!1}}catch(c){a.a.f=void 0,F(a.a,c)}a.a.m=!1;if(a.a.b){b=a.a.b;a.a.b=null;if(b.F)throw b.D;return{value:b.return,done:!0}}return{value:void 0,done:!0}}
function na(a){this.next=function(b){E(a.a);a.a.i?b=J(a,a.a.i.next,b,a.a.v):(a.a.v(b),b=K(a));return b};this.throw=function(b){E(a.a);a.a.i?b=J(a,a.a.i["throw"],b,a.a.v):(F(a.a,b),b=K(a));return b};this.return=function(b){return ma(a,b)};C();this[Symbol.iterator]=function(){return this}}function oa(a){function b(d){return a.next(d)}function c(d){return a.throw(d)}return new Promise(function(d,f){function h(g){g.done?d(g.value):Promise.resolve(g.value).then(b,c).then(h,f)}h(a.next())})}
function L(a){return oa(new na(new la(a)))}function pa(a,b){C();a instanceof String&&(a+="");var c=0,d={next:function(){if(c<a.length){var f=c++;return{value:b(f,a[f]),done:!1}}d.next=function(){return{done:!0,value:void 0}};return d.next()}};d[Symbol.iterator]=function(){return d};return d}B("Array.prototype.values",function(a){return a?a:function(){return pa(this,function(b,c){return c})}});
B("Object.entries",function(a){return a?a:function(b){var c=[],d;for(d in b)Object.prototype.hasOwnProperty.call(b,d)&&c.push([d,b[d]]);return c}});
B("String.prototype.startsWith",function(a){return a?a:function(b,c){if(null==this)throw new TypeError("The 'this' value for String.prototype.startsWith must not be null or undefined");if(b instanceof RegExp)throw new TypeError("First argument to String.prototype.startsWith must not be a regular expression");var d=this.length,f=b.length;c=Math.max(0,Math.min(c|0,this.length));for(var h=0;h<f&&c<d;)if(this[c++]!=b[h++])return!1;return h>=f}});var M=preact,N=M.h,O=M.Component,qa=M.render;function ra(a){var b=a.help,c=a.l,d=a.valid,f="text-muted";a.invalid?f="invalid-feedback":d&&(f="valid-feedback");a="form-text "+f;return"string"!=typeof b?N("small",{id:c,className:a},b):N("small",{id:c,className:a,dangerouslySetInnerHTML:{__html:b}})};function sa(a,b){var c=this.props,d=c.name,f=a.value;if(this.context.values[d]!=b.values[d])return!0;if(c.value!=f){if(b.onChange)b.onChange(a.name,f);return!1}}function ta(a){var b=[];a=Object.entries(a).reduce(function(c,d){var f=k(d);d=f.next().value;f=f.next().value;if("col"==d||d.startsWith("col-"))return b.push(d),c;c[d]=f;return c},{});return{s:b,I:a}};function P(){var a=O.call(this)||this;a.id="i"+Math.floor(1E5*Math.random());a.l="h"+a.id;a.props=a.props;return a}y(P,O);P.prototype.getChildContext=function(){return{id:this.id,l:this.l}};
P.prototype.render=function(a){var b=Object.assign({},a),c=a.children,d=a.label,f=a.help,h=a.details,g=a.className,e=a["form-row"],l=void 0===a.row?e:a.row;a=a.labelClassName;b=(delete b.children,delete b.label,delete b.help,delete b.details,delete b.className,delete b["form-row"],delete b.row,delete b.labelClassName,b);g=["form-group",g,l?(e?"form-":"")+"row":null].filter(Boolean).join(" ")||void 0;e=ta(b).s;a=[l?"col-form-label":null,a].concat(t(e)).filter(Boolean).join(" ")||void 0;d=d?N("label",
{className:a,htmlFor:this.id},d):null;f=N(ra,{help:f,l:this.l});return h?N("details",{className:g},N("summary",{},d),c,l?N("div",{className:"col-12"},f):f):N("div",{className:g},d,c,l?N("div",{className:"col-12"},f):f)};function Q(){var a=O.call(this)||this;a.props=a.props;return a}y(Q,O);Q.prototype.shouldComponentUpdate=function(a,b,c){return sa.call(this,a,c)};Q.prototype.componentDidMount=function(){var a=this.props,b=a.value;a=a.name;var c=this.context.onChange;c&&void 0!==b&&c(a,b)};
Q.prototype.render=function(a){var b=Object.assign({},a),c=a.options,d=a.name,f=a.value,h=a.required,g=a.className;a=a.defaultText;var e=(delete b.options,delete b.name,delete b.value,delete b.required,delete b.className,delete b.defaultText,b),l=this.context,m=l.onChange;b=l.l;var n=l.id;l=void 0===l.values?{}:l.values;l=d in l?l[d]:f;e=ta(e).s;g=["custom-select",g].filter(Boolean).join(" ");c=N("select",{name:d,value:void 0!==l?l:"",className:g,required:h,id:n,"aria-describedby":b,onChange:function(q){m(d,
q.currentTarget.value)}},N("option",{value:""},a),c.map(function(q){var p=q.value;return N("option",{key:p,value:p,selected:p==f},q.title)}));return e.length?N("div",{className:e.join(" ")},c):c};function R(){var a=O.call(this)||this;a.props=a.props;return a}y(R,O);R.prototype.shouldComponentUpdate=function(a,b,c){return sa.call(this,a,c)};R.prototype.componentDidMount=function(){var a=this.props,b=k(a.children).next().value;a=a.name;var c=this.context.onChange;b&&c(a,b.trim())};
R.prototype.render=function(a){var b=a.name,c=a.children,d=this.context,f=d.onChange,h=void 0===d.values?{}:d.values;return N("textarea",{required:a.required,name:b,placeholder:a.placeholder,"aria-describedby":d.l,className:"form-control",id:d.id,onChange:function(g){f(b,g.currentTarget.value)},rows:void 0===a.rows?3:a.rows},b in h?h[b]:c)};function S(){var a=O.call(this)||this;a.props=a.props;return a}y(S,O);S.prototype.shouldComponentUpdate=function(a,b,c){return sa.call(this,a,c)};S.prototype.componentDidMount=function(){var a=this.props,b=a.value;a=a.name;var c=this.context.onChange;void 0!==b&&c&&c(a,b)};S.prototype.onChange=function(a){this.context.onChange(this.props.name,a)};
S.prototype.render=function(a){var b=this,c=Object.assign({},a),d=a.required,f=a.name,h=a.placeholder,g=void 0===a.type?"text":a.type,e=a.file,l=a.value,m=a.className,n=a.invalid,q=a.valid;a=a.help;c=(delete c.required,delete c.name,delete c.placeholder,delete c.type,delete c.file,delete c.value,delete c.className,delete c.invalid,delete c.valid,delete c.help,c);var p=ta(c);c=p.s;p=p.I;m=["form-control"+(e?"-file":""),m,n?"is-invalid":null,q?"is-valid":null].filter(Boolean).join(" ");var r=this.context;
e=r.l;var u=void 0===r.values?{}:r.values;d=N("input",Object.assign({},p,{required:d,name:f,placeholder:h,className:m,value:f in u?u[f]:l,type:g,"aria-describedby":e,id:r.id,onChange:function(x){b.onChange(x.currentTarget.value)}}));return c.length?(n=a?N(ra,{help:a,l:e,valid:q,invalid:n}):null,N("div",{className:c.join(" ")},d,n)):d};function ua(a,b){return b=b||{},new Promise(function(c,d){function f(){return{ok:2==(h.status/100|0),statusText:h.statusText,status:h.status,url:h.responseURL,text:function(){return Promise.resolve(h.responseText)},json:function(){return Promise.resolve(JSON.parse(h.responseText))},blob:function(){return Promise.resolve(new Blob([h.response]))},clone:f,headers:{keys:function(){return g},entries:function(){return e},get:function(n){return l[n.toLowerCase()]},has:function(n){return n.toLowerCase()in
l}}}}var h=new XMLHttpRequest,g=[],e=[],l={},m;for(m in h.open(b.method||"get",a,!0),h.onload=function(){h.getAllResponseHeaders().replace(/^(.*?):[^\S\n]*([\s\S]*?)$/gm,function(n,q,p){g.push(q=q.toLowerCase());e.push([q,p]);l[q]=l[q]?l[q]+","+p:p});c(f())},h.onerror=d,h.withCredentials="include"==b.credentials,b.headers)h.setRequestHeader(m,b.headers[m]);h.send(b.body||null)})};function T(){var a=O.call(this)||this;a.props=a.props;a.state={formLoading:!1,error:null,success:null};a.a={};return a}y(T,O);
T.prototype.b=function(a){var b=this,c,d,f,h,g;return L(function(e){switch(e.a){case 1:a.preventDefault();if(!b.props.path)return b.setState({error:"Path is not set in the properties of the form."}),e.return(!1);b.setState({error:null,success:null});c=new FormData(a.target);b.setState({formLoading:!0});H(e,3);return G(e,ua(b.props.path,Object.assign({},{method:"POST",body:c},b.a)),5);case 5:return d=e.f,G(e,d.json(),6);case 6:f=e.f,(h=f.error)?b.setState({error:h}):b.setState({success:1});case 3:e.w=
[e.b];e.j=0;e.g=0;b.setState({formLoading:!1});ka(e,4);break;case 2:g=I(e);b.setState({error:g});e.o(3);break;case 4:if(!b.props.submitFinish){e.o(7);break}return G(e,b.props.submitFinish(d),7);case 7:return e.return(!1)}})};function U(){var a=O.call(this)||this;a.state={values:{}};a.props=a.props;return a}y(U,O);U.prototype.getChildContext=function(){return{values:this.state.values,onChange:this.onChange.bind(this)}};U.prototype.onChange=function(a,b){var c={};this.setState({values:Object.assign({},this.state.values,(c[a]=b,c))});if(this.props.onChange)this.props.onChange(this.state.values)};
U.prototype.render=function(a){var b=Object.assign({},a),c=a.children,d=a.formRef;a=a.onSubmit;b=(delete b.children,delete b.formRef,delete b.onSubmit,delete b.onChange,b);return N("form",Object.assign({},b,{ref:d,onSubmit:a}),c)};
function va(a){var b=a.loading,c=a.confirmText,d=void 0===a.loadingText?c:a.loadingText;a=["btn","btn-"+((void 0===a.outline?0:a.outline)?"outline-":"")+(void 0===a.type?"primary":a.type),a.className].filter(Boolean);return N("button",{className:a.join(" "),type:"submit",disabled:b},b&&N("span",{className:"spinner-border spinner-border-sm"+(d?" mr-2":""),role:"status","aria-hidden":"true"}),b?d:c)};function wa(a){var b=a.linkedin_user;a=a.github_user;var c;if(b)var d=b.profilePicture;else a&&(d=a.avatar_url);b?c=b.firstName+" "+b.lastName:a&&(c=a.name||a.login);return{H:d,name:c}};function V(){return O.apply(this,arguments)||this}y(V,O);V.prototype.componentDidMount=function(){var a=this,b,c,d,f,h,g;return L(function(e){switch(e.a){case 1:return a.setState({loading:!0}),H(e,3),G(e,ua(a.props.host+"/captcha"),5);case 5:return b=e.f,G(e,b.json(),6);case 6:c=e.f,d=c.error,f=c.data,h=c.hash,d?a.setState({error:d}):a.setState({data:f,hash:h});case 3:e.w=[e.b];e.j=0;e.g=0;a.setState({loading:!1});ka(e,0);break;case 2:g=I(e),a.setState({error:g}),e.o(3)}})};
V.prototype.render=function(a){var b=Object.assign({},a),c=a.invalid;a=a.valid;var d=(delete b.invalid,delete b.valid,b),f=this.state;b=f.data;f=f.hash;if(!b)return null;d=xa(d).s;c=[c?"is-invalid":null,a?"is-valid":null].concat(t(d)).filter(Boolean).join(" ");return N("div",{className:c},N("span",{dangerouslySetInnerHTML:{__html:b}}),N("input",{value:f,type:"hidden",name:"captcha"}))};
function xa(a){var b=[];a=Object.entries(a).reduce(function(c,d){var f=k(d);d=f.next().value;f=f.next().value;if("col"==d||d.startsWith("col-"))return b.push(d),c;c[d]=f;return c},{});return{s:b,I:a}};function ya(a){var b=a.c;return b.github_user||b.linkedin_user?null:N(P,{"form-row":!0,"col-md-2":!0,label:"Captcha",help:"Sign in to skip."},N(V,{host:a.host,"col-sm-4":!0,"col-md-3":!0,"col-lg-2":!0}),N(S,{"col-sm-4":!0,"col-md-3":!0,name:"captcha-answer"}))};var za=[{name:"Afghanistan",code:"AF"},{name:"\u00c5land Islands",code:"AX"},{name:"Albania",code:"AL"},{name:"Algeria",code:"DZ"},{name:"American Samoa",code:"AS"},{name:"Andorra",code:"AD"},{name:"Angola",code:"AO"},{name:"Anguilla",code:"AI"},{name:"Antarctica",code:"AQ"},{name:"Antigua and Barbuda",code:"AG"},{name:"Argentina",code:"AR"},{name:"Armenia",code:"AM"},{name:"Aruba",code:"AW"},{name:"Australia",code:"AU"},{name:"Austria",code:"AT"},{name:"Azerbaijan",code:"AZ"},{name:"Bahamas",code:"BS"},
{name:"Bahrain",code:"BH"},{name:"Bangladesh",code:"BD"},{name:"Barbados",code:"BB"},{name:"Belarus",code:"BY"},{name:"Belgium",code:"BE"},{name:"Belize",code:"BZ"},{name:"Benin",code:"BJ"},{name:"Bermuda",code:"BM"},{name:"Bhutan",code:"BT"},{name:"Bolivia",code:"BO"},{name:"Bosnia and Herzegovina",code:"BA"},{name:"Botswana",code:"BW"},{name:"Bouvet Island",code:"BV"},{name:"Brazil",code:"BR"},{name:"British Indian Ocean Territory",code:"IO"},{name:"Brunei Darussalam",code:"BN"},{name:"Bulgaria",
code:"BG"},{name:"Burkina Faso",code:"BF"},{name:"Burundi",code:"BI"},{name:"Cambodia",code:"KH"},{name:"Cameroon",code:"CM"},{name:"Canada",code:"CA"},{name:"Cape Verde",code:"CV"},{name:"Cayman Islands",code:"KY"},{name:"Central African Republic",code:"CF"},{name:"Chad",code:"TD"},{name:"Chile",code:"CL"},{name:"China",code:"CN"},{name:"Christmas Island",code:"CX"},{name:"Cocos (Keeling) Islands",code:"CC"},{name:"Colombia",code:"CO"},{name:"Comoros",code:"KM"},{name:"Congo",code:"CG"},{name:"Congo, The Democratic Republic of the",
code:"CD"},{name:"Cook Islands",code:"CK"},{name:"Costa Rica",code:"CR"},{name:"Cote D'Ivoire",code:"CI"},{name:"Croatia",code:"HR"},{name:"Cuba",code:"CU"},{name:"Cyprus",code:"CY"},{name:"Czech Republic",code:"CZ"},{name:"Denmark",code:"DK"},{name:"Djibouti",code:"DJ"},{name:"Dominica",code:"DM"},{name:"Dominican Republic",code:"DO"},{name:"Ecuador",code:"EC"},{name:"Egypt",code:"EG"},{name:"El Salvador",code:"SV"},{name:"Equatorial Guinea",code:"GQ"},{name:"Eritrea",code:"ER"},{name:"Estonia",
code:"EE"},{name:"Ethiopia",code:"ET"},{name:"Falkland Islands (Malvinas)",code:"FK"},{name:"Faroe Islands",code:"FO"},{name:"Fiji",code:"FJ"},{name:"Finland",code:"FI"},{name:"France",code:"FR"},{name:"French Guiana",code:"GF"},{name:"French Polynesia",code:"PF"},{name:"French Southern Territories",code:"TF"},{name:"Gabon",code:"GA"},{name:"Gambia",code:"GM"},{name:"Georgia",code:"GE"},{name:"Germany",code:"DE"},{name:"Ghana",code:"GH"},{name:"Gibraltar",code:"GI"},{name:"Greece",code:"GR"},{name:"Greenland",
code:"GL"},{name:"Grenada",code:"GD"},{name:"Guadeloupe",code:"GP"},{name:"Guam",code:"GU"},{name:"Guatemala",code:"GT"},{name:"Guernsey",code:"GG"},{name:"Guinea",code:"GN"},{name:"Guinea-Bissau",code:"GW"},{name:"Guyana",code:"GY"},{name:"Haiti",code:"HT"},{name:"Heard Island and Mcdonald Islands",code:"HM"},{name:"Holy See (Vatican City State)",code:"VA"},{name:"Honduras",code:"HN"},{name:"Hong Kong",code:"HK"},{name:"Hungary",code:"HU"},{name:"Iceland",code:"IS"},{name:"India",code:"IN"},{name:"Indonesia",
code:"ID"},{name:"Iran, Islamic Republic Of",code:"IR"},{name:"Iraq",code:"IQ"},{name:"Ireland",code:"IE"},{name:"Isle of Man",code:"IM"},{name:"Israel",code:"IL"},{name:"Italy",code:"IT"},{name:"Jamaica",code:"JM"},{name:"Japan",code:"JP"},{name:"Jersey",code:"JE"},{name:"Jordan",code:"JO"},{name:"Kazakhstan",code:"KZ"},{name:"Kenya",code:"KE"},{name:"Kiribati",code:"KI"},{name:"Democratic People's Republic of Korea",code:"KP"},{name:"Korea, Republic of",code:"KR"},{name:"Kosovo",code:"XK"},{name:"Kuwait",
code:"KW"},{name:"Kyrgyzstan",code:"KG"},{name:"Lao People's Democratic Republic",code:"LA"},{name:"Latvia",code:"LV"},{name:"Lebanon",code:"LB"},{name:"Lesotho",code:"LS"},{name:"Liberia",code:"LR"},{name:"Libyan Arab Jamahiriya",code:"LY"},{name:"Liechtenstein",code:"LI"},{name:"Lithuania",code:"LT"},{name:"Luxembourg",code:"LU"},{name:"Macao",code:"MO"},{name:"Macedonia, The Former Yugoslav Republic of",code:"MK"},{name:"Madagascar",code:"MG"},{name:"Malawi",code:"MW"},{name:"Malaysia",code:"MY"},
{name:"Maldives",code:"MV"},{name:"Mali",code:"ML"},{name:"Malta",code:"MT"},{name:"Marshall Islands",code:"MH"},{name:"Martinique",code:"MQ"},{name:"Mauritania",code:"MR"},{name:"Mauritius",code:"MU"},{name:"Mayotte",code:"YT"},{name:"Mexico",code:"MX"},{name:"Micronesia, Federated States of",code:"FM"},{name:"Moldova, Republic of",code:"MD"},{name:"Monaco",code:"MC"},{name:"Mongolia",code:"MN"},{name:"Montenegro",code:"ME"},{name:"Montserrat",code:"MS"},{name:"Morocco",code:"MA"},{name:"Mozambique",
code:"MZ"},{name:"Myanmar",code:"MM"},{name:"Namibia",code:"NA"},{name:"Nauru",code:"NR"},{name:"Nepal",code:"NP"},{name:"Netherlands",code:"NL"},{name:"Netherlands Antilles",code:"AN"},{name:"New Caledonia",code:"NC"},{name:"New Zealand",code:"NZ"},{name:"Nicaragua",code:"NI"},{name:"Niger",code:"NE"},{name:"Nigeria",code:"NG"},{name:"Niue",code:"NU"},{name:"Norfolk Island",code:"NF"},{name:"Northern Mariana Islands",code:"MP"},{name:"Norway",code:"NO"},{name:"Oman",code:"OM"},{name:"Pakistan",code:"PK"},
{name:"Palau",code:"PW"},{name:"Palestinian Territory, Occupied",code:"PS"},{name:"Panama",code:"PA"},{name:"Papua New Guinea",code:"PG"},{name:"Paraguay",code:"PY"},{name:"Peru",code:"PE"},{name:"Philippines",code:"PH"},{name:"Pitcairn",code:"PN"},{name:"Poland",code:"PL"},{name:"Portugal",code:"PT"},{name:"Puerto Rico",code:"PR"},{name:"Qatar",code:"QA"},{name:"Reunion",code:"RE"},{name:"Romania",code:"RO"},{name:"Russian Federation",code:"RU"},{name:"Rwanda",code:"RW"},{name:"Saint Helena",code:"SH"},
{name:"Saint Kitts and Nevis",code:"KN"},{name:"Saint Lucia",code:"LC"},{name:"Saint Pierre and Miquelon",code:"PM"},{name:"Saint Vincent and the Grenadines",code:"VC"},{name:"Samoa",code:"WS"},{name:"San Marino",code:"SM"},{name:"Sao Tome and Principe",code:"ST"},{name:"Saudi Arabia",code:"SA"},{name:"Senegal",code:"SN"},{name:"Serbia",code:"RS"},{name:"Seychelles",code:"SC"},{name:"Sierra Leone",code:"SL"},{name:"Singapore",code:"SG"},{name:"Slovakia",code:"SK"},{name:"Slovenia",code:"SI"},{name:"Solomon Islands",
code:"SB"},{name:"Somalia",code:"SO"},{name:"South Africa",code:"ZA"},{name:"South Georgia and the South Sandwich Islands",code:"GS"},{name:"Spain",code:"ES"},{name:"Sri Lanka",code:"LK"},{name:"Sudan",code:"SD"},{name:"Suriname",code:"SR"},{name:"Svalbard and Jan Mayen",code:"SJ"},{name:"Swaziland",code:"SZ"},{name:"Sweden",code:"SE"},{name:"Switzerland",code:"CH"},{name:"Syrian Arab Republic",code:"SY"},{name:"Taiwan",code:"TW"},{name:"Tajikistan",code:"TJ"},{name:"Tanzania, United Republic of",
code:"TZ"},{name:"Thailand",code:"TH"},{name:"Timor-Leste",code:"TL"},{name:"Togo",code:"TG"},{name:"Tokelau",code:"TK"},{name:"Tonga",code:"TO"},{name:"Trinidad and Tobago",code:"TT"},{name:"Tunisia",code:"TN"},{name:"Turkey",code:"TR"},{name:"Turkmenistan",code:"TM"},{name:"Turks and Caicos Islands",code:"TC"},{name:"Tuvalu",code:"TV"},{name:"Uganda",code:"UG"},{name:"Ukraine",code:"UA"},{name:"United Arab Emirates",code:"AE"},{name:"United Kingdom",code:"GB"},{name:"United States",code:"US"},{name:"United States Minor Outlying Islands",
code:"UM"},{name:"Uruguay",code:"UY"},{name:"Uzbekistan",code:"UZ"},{name:"Vanuatu",code:"VU"},{name:"Venezuela",code:"VE"},{name:"Viet Nam",code:"VN"},{name:"Virgin Islands, British",code:"VG"},{name:"Virgin Islands, U.S.",code:"VI"},{name:"Wallis and Futuna",code:"WF"},{name:"Western Sahara",code:"EH"},{name:"Yemen",code:"YE"},{name:"Zambia",code:"ZM"},{name:"Zimbabwe",code:"ZW"}];function W(){var a=T.call(this)||this;a.a={credentials:"include"};a.state.C=void 0;return a}y(W,T);W.prototype.componentWillMount=function(){var a=this,b,c,d;return L(function(f){switch(f.a){case 1:return H(f),G(f,fetch("https://freegeoip.app/json/",{}),4);case 4:return b=f.f,G(f,b.json(),5);case 5:c=f.f;(d=c.country_code)&&a.setState({C:d});f.a=0;f.j=0;break;case 2:I(f),f.a=0}})};
W.prototype.render=function(a){var b=this,c=Object.assign({},a),d=a.onChange,f=a.host;a=a.c;c=(delete c.onChange,delete c.host,delete c.c,c);var h=this.state,g=h.formLoading,e=h.error;h=h.success;var l=wa(a),m=l.H;l=l.name;return N(U,Object.assign({},c,{onSubmit:this.b.bind(this),onChange:function(n){b.setState({error:null,success:null});d&&d(n)}}),m&&N(S,{value:m,type:"hidden",name:"photo"}),N(S,{value:a.csrf,type:"hidden",name:"csrf"}),N(P,{"form-row":!0,"col-2":!0,label:"Name*",help:"This will appear on the website"},
N(S,{value:l,"col-10":!0,name:"name"})),N(P,{label:"Country",help:"Where are you from?","form-row":!0,"col-2":!0},N(Q,{value:this.state.C,"col-10":!0,name:"country_code",options:za.map(function(n){return{value:n.code,title:n.name}}),defaultText:"select country"})),N(P,{help:a.github_user?"GitHub username, sign out to remove":"Please sign in with GitHub","form-row":!0,"col-2":!0,label:"GitHub"},N(S,{value:a.github_user?a.github_user.html_url:null,"col-10":!0,name:"github",disabled:!0})),N(P,{"form-row":!0,
"col-2":!0,label:"Comment*",help:"Please enter your opinion"},N("div",{className:"col-10"},N(R,{required:!0,name:"comment"},"I think you're right/wrong because..."))),N(ya,{host:f,c:a}),N(va,{loading:g,type:"warning",confirmText:"Submit Data"}),e&&"Error: "+e,h&&"Comment has been submitted!")};function X(a,b,c){function d(){var m=[],n=[],q={},p;e.getAllResponseHeaders().replace(/^(.*?):[^\S\n]*([\s\S]*?)$/gm,function(r,u,x){m.push(u=u.toLowerCase());n.push([u,x]);p=q[u];q[u]=p?p+","+x:x});return{ok:2==(e.status/100|0),status:e.status,statusText:e.statusText,url:e.responseURL,clone:d,text:function(){return e.responseText},json:function(){return JSON.parse(e.responseText)},blob:function(){return new Blob([e.response])},headers:{keys:function(){return m},entries:function(){return n},get:function(r){return q[r.toLowerCase()]},
has:function(r){return r.toLowerCase()in q}}}}c=void 0===c?{}:c;var f=void 0===c.headers?{}:c.headers,h=c.credentials,g=void 0===c.body?null:c.body,e=new XMLHttpRequest;e.open(void 0===c.method?"get":c.method,a,!0);for(var l in f)e.setRequestHeader(l,f[l]);e.withCredentials="include"==h;e.onload=function(){b(null,d())};e.onerror=function(){b("Could not load the resource at "+a+".")};e.send(g)};function Y(){var a=O.call(this)||this;a.state={loading:!0,error:null,c:{}};a.a=a.b.bind(a);window.addEventListener("message",a.a,!1);return a}y(Y,O);Y.prototype.componentDidMount=function(){this.c()};Y.prototype.c=function(){var a=this;this.setState({loading:!0});X(this.props.host+"/auth",function(b,c){a.setState({loading:!1});if(b)return a.setState({error:b});b=c.json();a.setState({c:b})},{credentials:"include"})};Y.prototype.b=function(a){a.origin==this.props.host&&"signedin"==a.data&&this.c()};
Y.prototype.componentWillUnmount=function(){window.removeEventListener("message",this.a)};function Aa(a){var b=void 0===b?{}:b;var c=window.top,d=c.outerHeight,f=c.screenY,h=[];h.push("width=500","left="+(c.outerWidth/2+c.screenX-250));h.push("top="+(d/2+f-305-50),"height=610");c=Object.keys(b).map(function(g){return g+"="+b[g]});h.push.apply(h,t(c));window.open(a,"Sign In",h.join(","))};function Ba(a){a=void 0===a?"":a;var b=document.head,c=document.createElement("style");c.type="text/css";c.styleSheet?c.styleSheet.cssText=a:c.appendChild(document.createTextNode(a));b.appendChild(c)};Ba(".LinkedInButton {\n  background: #0077B5;\n  display: inline-table;\n  border-radius: 3px;\n  font-family: Helvetica Neue,Helvetica,Arial,sans-serif;\n  text-decoration: none;\n  color: white !important;\n  cursor: pointer;\n}\n.LinkedInButton .LinkedInIn {\n  font-family: 'Myriad Pro', 'Gill Sans', 'Gill Sans MT', Calibri, sans-serif;\n  padding-left: 6px;\n  padding-right: 5px;\n  border-right: 1px solid #0369A0;\n  border-radius: 3px;\n  font-weight: 600;\n  background: #0077B5;\n  display: table-cell;\n  vertical-align: middle;\n}\n.LinkedInButton .LinkedInText {\n  padding-left: .5em;\n  padding-right: .5em;\n  font-size: smaller;\n  display: table-cell;\n  vertical-align: middle;\n}");function Ca(a){var b=void 0===a.size?"medium":a.size,c=a.host,d=void 0===a.B?"/linkedin":a.B,f;"medium"==b?f=1.5:"large"==b&&(f=2);return N("a",{onClick:function(h){h.preventDefault();Aa(""+c+d);return!1},onMouseOver:function(h){h.currentTarget.style.background="#0369A0"},onMouseOut:function(h){h.currentTarget.style.background="#0077B5"},className:"LinkedInButton"},N("div",{style:"font-size:"+f+"rem;",className:"LinkedInIn"},"in"),N("div",{className:"LinkedInText"},"Sign In With LinkedIn"))};function Da(a){return N("svg",Object.assign({},a,{role:"img",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"}),N("title",{},"GitHub icon"),N("path",{d:"M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"}))}
;Ba(".GitHubButton {\n  background: #dfdfdf;\n  display: inline-table;\n  border-radius: 3px;\n  font-family: Helvetica Neue,Helvetica,Arial,sans-serif;\n  text-decoration: none;\n  color: black !important;\n  cursor: pointer;\n}\n.GitHubButton .GitHubLogo {\n  padding: 0px 6px 0px 5px;\n  border-right: 1px solid #bcbcbc;\n  border-radius: 3px;\n  font-weight: 600;\n  background: rgb(223, 223, 223);\n  display: table-cell;\n  vertical-align: middle;\n}\n.GitHubButton .GitHubText {\n  padding-left: .5em;\n  padding-right: .5em;\n  font-size: smaller;\n  display: table-cell;\n  vertical-align: middle;\n}");function Ea(a){var b=void 0===a.size?"medium":a.size,c=a.host,d=void 0===a.B?"/github":a.B,f;"medium"==b?f=1.5:"large"==b&&(f=2);return N("a",{onClick:function(h){h.preventDefault();Aa(""+c+d);return!1},onMouseOver:function(h){h.currentTarget.style.background="#bcbcbc"},onMouseOut:function(h){h.currentTarget.style.background="#DFDFDF"},className:"GitHubButton"},N("div",{style:"height:"+f+"rem;font-size:"+f+"rem",className:"GitHubLogo"},N(Da,{height:"100%",style:"margin-top:-4px"})),N("div",{className:"GitHubText"},
"Sign In With GitHub"))};function Fa(a,b,c){var d=new FormData;d.append("csrf",b);X(a+"/signout",function(f,h){if(f)return c(f);f=h.json().error;c(f)},{method:"POST",headers:{P:"application/json"},body:d,credentials:"include"})}
function Ga(a){var b=a.c,c=void 0===a.G?function(){}:a.G,d=a.host;a=b.github_user;var f=b.csrf;if(!b.linkedin_user&&!a)return null;b=wa(b);a=b.name;return N("div",{},N("img",{src:b.H,width:"50"}),"Hello, ",a,"!"," ",N("a",{onClick:function(h){h.preventDefault();Fa(d,f,function(g){g?alert("Could not sign out: "+g+". Please refresh the page and try again. Alternatively, clear your cookies."):c()});return!1},href:"#"},"Sign Out"))};function Ha(a){var b=a.error,c=a.loading,d=a.c,f=a.L;a=a.host;return b?N("div",{},"Error: ",b):c?N("div",{},"Loading..."):N("div",{},!(d.linkedin_user||d.github_user)&&N("span",{style:"display:block"},"To display the profile image and validate your GitHub profile, sign in. No advanced permissions are required other than default ones (no email). Your public LinkedIn ID remains unknown. You will not be able to delete/edit your comment as a guest. ",N("a",{href:"/privacy-policy.html"},"Privacy Policy")),
N(Ga,{c:d,G:f,host:a}),!d.linkedin_user&&N(Ca,{host:a}),!d.linkedin_user&&" ",!d.github_user&&N(Ea,{host:a}))};function Z(){var a=O.call(this)||this;a.state={u:[],page:0,csrf:null};return a}y(Z,O);Z.prototype.componentDidMount=function(){this.fetch()};Z.prototype.fetch=function(a){var b=this;this.setState({loading:!0});X(this.props.host+"/json-comments"+(a?"?id="+a:""),function(c,d){b.setState({loading:!1});if(c)return b.setState({error:c});c=d.json();d=c.csrf;b.setState({u:[].concat(t(c.comments),t(b.state.u)),csrf:d})},{credentials:"include"})};
Z.prototype.render=function(){var a=this,b=this.state,c=b.error,d=b.loading,f=b.u,h=b.csrf;return c?N("div",{},"Error loading list: ",c):d?N("div",{},"Loading list..."):N("div",{className:"CommentsList"},f.map(function(g){return N(Ia,{key:g._id,comment:g,csrf:h,host:a.props.host,K:function(e){a.setState({u:a.state.u.filter(function(l){return l._id!=e})})}})}))};function Ja(a){return(a=a.github_user)?N("span",{}," (",N("a",{href:a.html_url},a.login),")"):null}
function Ia(a){var b=a.comment,c=b._id,d=b.country,f=b.isAuthor,h=b.photo,g=b.comment,e=b.date,l=b.github_user,m=a.K,n=a.csrf,q=a.host;return N("div",{className:"comment"},N("strong",{},b.name||"Anonymous"),N(Ja,{github_user:l}),d?" from "+d:""," ","on ",N("em",{},(new Date(e)).toLocaleString())," ",f&&N("a",{onClick:function(p){p.preventDefault();confirm("Are you sure you want to delete comment?")&&X(q+"/remove-comment?csrf="+n+"&id="+c,function(r,u){if(r)return alert(r);(r=u.json().error)?alert(r):
u&&m(c)},{credentials:"include"});return!1},href:"#"},"Remove"),N("div",{style:"display:table;",className:"CommentBlock"},h&&N("div",{style:"display:table-cell"},N("img",{src:h,style:"padding-right:.5rem; border-radius:1.75rem;width:3.5rem"})),N("div",{style:"display:table-cell"},g)))};function Ka(){var a=Y.call(this)||this;a.list=null;return a}y(Ka,Y);
Ka.prototype.render=function(){var a=this;return N("div",{},N(Ha,{error:this.state.error,loading:this.state.loading,c:this.state.c,host:this.props.host,L:function(){a.setState({c:{}})}}),N(W,{host:this.props.host,path:this.props.host+"/comment",c:this.state.c,submitFinish:function(b){var c,d,f;return L(function(h){if(1==h.a)return G(h,b.json(),2);c=h.f;d=c.error;f=c.id;!d&&f&&a.list&&a.list.fetch(f);h.a=0})}}),N(Z,{host:this.props.host,ref:function(b){a.list=b}}))};
window.comments=function(a){var b=void 0===a.container?"preact":a.container;qa(N(Ka,{host:void 0===a.host?"https://api.technation.sucks":a.host}),document.getElementById(b))};

//# sourceMappingURL=comments.js.map