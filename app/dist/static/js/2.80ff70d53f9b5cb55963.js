webpackJsonp([2,8],{154:function(t,e,n){var i=n(11)(n(505),n(458),null,null);t.exports=i.exports},155:function(t,e,n){var i=n(11)(n(509),n(478),null,null);t.exports=i.exports},379:function(t,e,n){var i=n(11)(n(506),n(485),null,null);t.exports=i.exports},380:function(t,e,n){var i=n(12),r=n(7),o=n(144),a=n(381),s=n(25).f;t.exports=function(t){var e=r.Symbol||(r.Symbol=o?{}:i.Symbol||{});"_"==t.charAt(0)||t in e||s(e,t,{value:a.f(t)})}},381:function(t,e,n){e.f=n(8)},382:function(t,e,n){"use strict";(function(t,i){var r=n(388),o=n.n(r),a=n(76),s=n.n(a);e.a={props:{api:{type:String,required:!0},active:{type:Boolean,default:!0},idkey:{type:String,default:"id"},order:{type:String,default:""},subject:String,queryView:Boolean,queryCondition:Object},data:function(){return{paging:{total:0},params:t.pagingParams(),data:[]}},computed:{delApi:function(){var t=this.api.split("/");return t[t.length-1]="delete",t.join("/")}},methods:{handlePagingChange:function(e){this.params=t.pagingParams(e),this.load(!0)},load:function(e){var n=this,r=this.params;this.order&&s()(r,{order:this.order});var a=this.queryView?{view:!0}:{},l=this.queryCondition;"object"===("undefined"==typeof l?"undefined":o()(l))&&s()(a,l);var c="获取"+this.subject+"数据",u=function(t){n.data=t.data,n.paging.total=t.total};u.notips=e,i.post(t.getApi(this.api,r),a).then(t.resolvedCallback(c,u))},editRow:function(t){this.$emit("edit",t)},delRow:function(t){this.$emit("del",t),this.delConfirm(t[this.idkey])},delConfirm:function(t){var e=this;this.$confirm("确定删除"+this.subject+"?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){e.removeRow(t)}).catch(function(){e.$message.info("取消删除")})},removeRow:function(e){var n=this;i.get(t.getApi(this.delApi+"/"+e)).then(t.resolvedCallback("删除",function(){return n.load(!0)}))}},watch:{active:function(){this.active&&this.load()}},mounted:function(){this.active&&this.$store.state.user.userId&&this.load()}}}).call(e,n(5),n(16))},383:function(t,e,n){var i=n(149),r=n(78).concat("length","prototype");e.f=Object.getOwnPropertyNames||function(t){return i(t,r)}},386:function(t,e,n){t.exports={default:n(389),__esModule:!0}},387:function(t,e,n){t.exports={default:n(390),__esModule:!0}},388:function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}e.__esModule=!0;var r=n(387),o=i(r),a=n(386),s=i(a),l="function"==typeof s.default&&"symbol"==typeof o.default?function(t){return typeof t}:function(t){return t&&"function"==typeof s.default&&t.constructor===s.default&&t!==s.default.prototype?"symbol":typeof t};e.default="function"==typeof s.default&&"symbol"===l(o.default)?function(t){return"undefined"==typeof t?"undefined":l(t)}:function(t){return t&&"function"==typeof s.default&&t.constructor===s.default&&t!==s.default.prototype?"symbol":"undefined"==typeof t?"undefined":l(t)}},389:function(t,e,n){n(398),n(397),n(399),n(400),t.exports=n(7).Symbol},390:function(t,e,n){n(81),n(82),t.exports=n(381).f("iterator")},391:function(t,e,n){var i=n(73),r=n(145),o=n(143);t.exports=function(t){var e=i(t),n=r.f;if(n)for(var a,s=n(t),l=o.f,c=0;s.length>c;)l.call(t,a=s[c++])&&e.push(a);return e}},392:function(t,e,n){var i=n(77);t.exports=Array.isArray||function(t){return"Array"==i(t)}},393:function(t,e,n){var i=n(73),r=n(37);t.exports=function(t,e){for(var n,o=r(t),a=i(o),s=a.length,l=0;s>l;)if(o[n=a[l++]]===e)return n}},394:function(t,e,n){var i=n(75)("meta"),r=n(42),o=n(24),a=n(25).f,s=0,l=Object.isExtensible||function(){return!0},c=!n(40)(function(){return l(Object.preventExtensions({}))}),u=function(t){a(t,i,{value:{i:"O"+ ++s,w:{}}})},f=function(t,e){if(!r(t))return"symbol"==typeof t?t:("string"==typeof t?"S":"P")+t;if(!o(t,i)){if(!l(t))return"F";if(!e)return"E";u(t)}return t[i].i},p=function(t,e){if(!o(t,i)){if(!l(t))return!0;if(!e)return!1;u(t)}return t[i].w},d=function(t){return c&&g.NEED&&l(t)&&!o(t,i)&&u(t),t},g=t.exports={KEY:i,NEED:!1,fastKey:f,getWeak:p,onFreeze:d}},395:function(t,e,n){var i=n(143),r=n(74),o=n(37),a=n(146),s=n(24),l=n(147),c=Object.getOwnPropertyDescriptor;e.f=n(17)?c:function(t,e){if(t=o(t),e=a(e,!0),l)try{return c(t,e)}catch(t){}if(s(t,e))return r(!i.f.call(t,e),t[e])}},396:function(t,e,n){var i=n(37),r=n(383).f,o={}.toString,a="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[],s=function(t){try{return r(t)}catch(t){return a.slice()}};t.exports.f=function(t){return a&&"[object Window]"==o.call(t)?s(t):r(i(t))}},397:function(t,e){},398:function(t,e,n){"use strict";var i=n(12),r=n(24),o=n(17),a=n(41),s=n(150),l=n(394).KEY,c=n(40),u=n(80),f=n(79),p=n(75),d=n(8),g=n(381),b=n(380),h=n(393),v=n(391),m=n(392),y=n(26),A=n(37),x=n(146),_=n(74),w=n(148),C=n(396),k=n(395),B=n(25),S=n(73),O=k.f,j=B.f,P=C.f,E=i.Symbol,M=i.JSON,T=M&&M.stringify,D="prototype",F=d("_hidden"),$=d("toPrimitive"),R={}.propertyIsEnumerable,q=u("symbol-registry"),N=u("symbols"),I=u("op-symbols"),L=Object[D],z="function"==typeof E,Y=i.QObject,J=!Y||!Y[D]||!Y[D].findChild,W=o&&c(function(){return 7!=w(j({},"a",{get:function(){return j(this,"a",{value:7}).a}})).a})?function(t,e,n){var i=O(L,e);i&&delete L[e],j(t,e,n),i&&t!==L&&j(L,e,i)}:j,K=function(t){var e=N[t]=w(E[D]);return e._k=t,e},Q=z&&"symbol"==typeof E.iterator?function(t){return"symbol"==typeof t}:function(t){return t instanceof E},V=function(t,e,n){return t===L&&V(I,e,n),y(t),e=x(e,!0),y(n),r(N,e)?(n.enumerable?(r(t,F)&&t[F][e]&&(t[F][e]=!1),n=w(n,{enumerable:_(0,!1)})):(r(t,F)||j(t,F,_(1,{})),t[F][e]=!0),W(t,e,n)):j(t,e,n)},G=function(t,e){y(t);for(var n,i=v(e=A(e)),r=0,o=i.length;o>r;)V(t,n=i[r++],e[n]);return t},H=function(t,e){return void 0===e?w(t):G(w(t),e)},U=function(t){var e=R.call(this,t=x(t,!0));return!(this===L&&r(N,t)&&!r(I,t))&&(!(e||!r(this,t)||!r(N,t)||r(this,F)&&this[F][t])||e)},Z=function(t,e){if(t=A(t),e=x(e,!0),t!==L||!r(N,e)||r(I,e)){var n=O(t,e);return!n||!r(N,e)||r(t,F)&&t[F][e]||(n.enumerable=!0),n}},X=function(t){for(var e,n=P(A(t)),i=[],o=0;n.length>o;)r(N,e=n[o++])||e==F||e==l||i.push(e);return i},tt=function(t){for(var e,n=t===L,i=P(n?I:A(t)),o=[],a=0;i.length>a;)!r(N,e=i[a++])||n&&!r(L,e)||o.push(N[e]);return o};z||(E=function(){if(this instanceof E)throw TypeError("Symbol is not a constructor!");var t=p(arguments.length>0?arguments[0]:void 0),e=function(n){this===L&&e.call(I,n),r(this,F)&&r(this[F],t)&&(this[F][t]=!1),W(this,t,_(1,n))};return o&&J&&W(L,t,{configurable:!0,set:e}),K(t)},s(E[D],"toString",function(){return this._k}),k.f=Z,B.f=V,n(383).f=C.f=X,n(143).f=U,n(145).f=tt,o&&!n(144)&&s(L,"propertyIsEnumerable",U,!0),g.f=function(t){return K(d(t))}),a(a.G+a.W+a.F*!z,{Symbol:E});for(var et="hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","),nt=0;et.length>nt;)d(et[nt++]);for(var et=S(d.store),nt=0;et.length>nt;)b(et[nt++]);a(a.S+a.F*!z,"Symbol",{for:function(t){return r(q,t+="")?q[t]:q[t]=E(t)},keyFor:function(t){if(Q(t))return h(q,t);throw TypeError(t+" is not a symbol!")},useSetter:function(){J=!0},useSimple:function(){J=!1}}),a(a.S+a.F*!z,"Object",{create:H,defineProperty:V,defineProperties:G,getOwnPropertyDescriptor:Z,getOwnPropertyNames:X,getOwnPropertySymbols:tt}),M&&a(a.S+a.F*(!z||c(function(){var t=E();return"[null]"!=T([t])||"{}"!=T({a:t})||"{}"!=T(Object(t))})),"JSON",{stringify:function(t){if(void 0!==t&&!Q(t)){for(var e,n,i=[t],r=1;arguments.length>r;)i.push(arguments[r++]);return e=i[1],"function"==typeof e&&(n=e),!n&&m(e)||(e=function(t,e){if(n&&(e=n.call(this,t,e)),!Q(e))return e}),i[1]=e,T.apply(M,i)}}}),E[D][$]||n(18)(E[D],$,E[D].valueOf),f(E,"Symbol"),f(Math,"Math",!0),f(i.JSON,"JSON",!0)},399:function(t,e,n){n(380)("asyncIterator")},400:function(t,e,n){n(380)("observable")},420:function(t,e,n){e=t.exports=n(373)(),e.push([t.i,".clock{text-align:center}.clock .clock-inner{margin:30px auto;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-flow:row nowrap;flex-flow:row nowrap;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;width:400px;font-size:30px;font-weight:400;color:#000}.clock .clock-inner li{-webkit-box-flex:1;-ms-flex:1;flex:1;list-style:none}.clock .clock-inner li i{display:inline-block;padding:10px 5px;background:#000;color:#eee;border-radius:5px;font-style:normal}","",{version:3,sources:["/./src/views/sign/Clock.vue"],names:[],mappings:"AACA,OACE,iBAAmB,CACpB,AACD,oBACI,iBAAkB,AAClB,oBAAqB,AACrB,oBAAqB,AACrB,aAAc,AACd,8BAA+B,AAC/B,6BAA8B,AAC1B,yBAA0B,AACtB,qBAAsB,AAC9B,yBAA0B,AACtB,sBAAuB,AACnB,8BAA+B,AACvC,YAAa,AACb,eAAgB,AAChB,gBAAoB,AACpB,UAAY,CACf,AACD,uBACM,mBAAoB,AAChB,WAAY,AACR,OAAQ,AAChB,eAAiB,CACtB,AACD,yBACQ,qBAAsB,AACtB,iBAAkB,AAClB,gBAAiB,AACjB,WAAY,AACZ,kBAAmB,AACnB,iBAAmB,CAC1B",file:"Clock.vue",sourcesContent:["\n.clock {\n  text-align: center;\n}\n.clock .clock-inner {\n    margin: 30px auto;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n        -ms-flex-flow: row nowrap;\n            flex-flow: row nowrap;\n    -webkit-box-pack: justify;\n        -ms-flex-pack: justify;\n            justify-content: space-between;\n    width: 400px;\n    font-size: 30px;\n    font-weight: normal;\n    color: #000;\n}\n.clock .clock-inner li {\n      -webkit-box-flex: 1;\n          -ms-flex: 1;\n              flex: 1;\n      list-style: none;\n}\n.clock .clock-inner li i {\n        display: inline-block;\n        padding: 10px 5px;\n        background: #000;\n        color: #eee;\n        border-radius: 5px;\n        font-style: normal;\n}\n"],sourceRoot:"webpack://"}])},431:function(t,e,n){var i=n(420);"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);n(374)("8a6c3e86",i,!0)},450:function(t,e,n){n(431);var i=n(11)(n(504),n(467),null,null);t.exports=i.exports},451:function(t,e,n){var i=n(11)(n(507),n(472),null,null);t.exports=i.exports},452:function(t,e,n){var i=n(11)(n(508),n(465),null,null);t.exports=i.exports},458:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"sign-list-page"},[n("h1",{staticClass:"text-center"},[t._v("全部签到记录")]),t._v(" "),n("sign-table",{ref:"table",attrs:{api:"duty/get",subject:"签到","query-view":!0}})],1)},staticRenderFns:[]}},465:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"sign-table"},[n("el-table",{attrs:{border:"",stripe:"",data:t.data}},[n("el-table-column",{attrs:{type:"index",label:"序号",width:"70"}}),t._v(" "),n("el-table-column",{attrs:{prop:"userName",label:"用户名"}}),t._v(" "),n("el-table-column",{attrs:{prop:"depName",label:"部门"}}),t._v(" "),n("el-table-column",{attrs:{prop:"signIn",label:"上午上班时间"}}),t._v(" "),n("el-table-column",{attrs:{prop:"signOut",label:"上午下班时间"}}),t._v(" "),n("el-table-column",{attrs:{prop:"signIn2",label:"下午上班时间"}}),t._v(" "),n("el-table-column",{attrs:{prop:"signOut2",label:"下午下班时间"}}),t._v(" "),n("el-table-column",{attrs:{prop:"meno",label:"备注"}}),t._v(" "),n("el-table-column",{attrs:{label:"操作",width:"120"},scopedSlots:t._u([["default",function(e){return[n("el-button",{attrs:{plain:"",size:"small",type:"danger"},on:{click:function(n){t.delRow(e.row)}}},[t._v("删除")])]}]])})],1),t._v(" "),n("div",{staticClass:"paging mt10 clearfix"},[n("ex-pagination",{attrs:{paging:t.paging},on:{"paging-change":t.handlePagingChange}})],1)],1)},staticRenderFns:[]}},467:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"clock"},[n("ul",{staticClass:"clock-inner"},[n("li",{staticClass:"date"},[n("i",[t._v(t._s(t.y))]),t._v("-"),n("i",[t._v(t._s(t.m))]),t._v("-"),n("i",[t._v(t._s(t.d))])]),t._v(" "),n("li",{staticClass:"time"},[n("i",[t._v(t._s(t.h))]),t._v(":"),n("i",[t._v(t._s(t.i))]),t._v(":"),n("i",[t._v(t._s(t.s))])])])])},staticRenderFns:[]}},472:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"sign-table"},[n("el-table",{attrs:{border:"",stripe:"",data:t.data}},[n("el-table-column",{attrs:{type:"index",label:"序号",width:"70"}}),t._v(" "),n("el-table-column",{attrs:{prop:"sign_in",label:"上午上班时间"}}),t._v(" "),n("el-table-column",{attrs:{prop:"sign_out",label:"上午下班时间"}}),t._v(" "),n("el-table-column",{attrs:{prop:"sign_in2",label:"下午上班时间"}}),t._v(" "),n("el-table-column",{attrs:{prop:"sign_out2",label:"下午下班时间"}})],1),t._v(" "),n("div",{staticClass:"paging mt10 clearfix"},[n("ex-pagination",{attrs:{paging:t.paging},on:{"paging-change":t.handlePagingChange}})],1)],1)},staticRenderFns:[]}},478:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"sign-page"},[n("div",{staticClass:"text-center"},[n("clock"),t._v(" "),n("el-button",{attrs:{size:"large",type:"success"},on:{click:t.sign}},[t._v("打卡")])],1)])},staticRenderFns:[]}},485:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"sign-list-page"},[n("h1",{staticClass:"text-center"},[t._v("我的签到记录")]),t._v(" "),n("my-sign-table",{ref:"table",attrs:{api:"duty/get",subject:"签到","query-view":!1,"query-condition":{user_id:t.user.userId}}})],1)},staticRenderFns:[]}},504:function(t,e,n){"use strict";(function(t,i){Object.defineProperty(e,"__esModule",{value:!0});var r=n(39),o=n.n(r),a=n(38);e.default={name:"Clock",data:function(){return{now:new Date,timer:null}},computed:o()({},n.i(a.b)(["servertime"]),{y:function(){return this.now.getFullYear()},m:function(){return t.d2(this.now.getMonth()+1)},d:function(){return t.d2(this.now.getDate())},h:function(){return t.d2(this.now.getHours())},i:function(){return t.d2(this.now.getMinutes())},s:function(){return t.d2(this.now.getSeconds())}}),methods:o()({},n.i(a.a)(["setServertime"]),{clockStart:function(){var e=this;t.log(this.servertime),this.now=this.servertime;var n=function t(){e.now=new Date(e.now.getTime()+1e3),e.timer=setTimeout(t,1e3)};n()},clockStop:function(){clearTimeout(this.timer)},getServerTime:function(e){var n=this;i.get(t.getApi("home/time")).then(t.resolvedCallback("",function(t){n.setServertime(t.data.servertime),e&&setTimeout(e,1e3)}))}}),created:function(){var t=this;this.getServerTime(function(){t.clockStart()})}}}).call(e,n(5),n(16))},505:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0});var i=n(39),r=n.n(i),o=n(38),a=n(452),s=n.n(a);e.default={name:"SignListPage",computed:r()({},n.i(o.b)(["user"])),components:{SignTable:s.a},created:function(){t.checkLogin(this)}}}).call(e,n(5))},506:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0});var i=n(39),r=n.n(i),o=n(38),a=n(451),s=n.n(a);e.default={name:"SignListPage",computed:r()({},n.i(o.b)(["user"])),components:{MySignTable:s.a},created:function(){t.checkLogin(this)}}}).call(e,n(5))},507:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(382);e.default={name:"MySignTable",mixins:[i.a]}},508:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(382);e.default={name:"SignTable",mixins:[i.a]}},509:function(t,e,n){"use strict";(function(t,i){Object.defineProperty(e,"__esModule",{value:!0});var r=n(39),o=n.n(r),a=n(38),s=n(450),l=n.n(s);e.default={name:"SignPage",data:function(){return{beDuty:!1}},computed:o()({},n.i(a.b)(["user"])),methods:{onduty:function(){this.duty("on")},offduty:function(){this.duty("off")},checkLogin:function(){var t=!0;return this.user.userId||(this.$message.warning("请先登录.."),t=!1),t},duty:function(e){var n=this;if(this.checkLogin()){var r="on"===e?"signin":"signout";t.get(i.getApi("duty/"+r)).then(i.resolvedCallback(this.beDuty?"下班打卡":"上班打卡",function(t){i.warn(t),n.beDuty=!0}))}},sign:function(){var e=this;this.checkLogin()&&t.get(i.getApi("duty/smartsign")).then(function(t){t.ok?e.$message.success(t.msg+"成功!"):e.$message.error(""+t.msg)})}},components:{Clock:l.a},created:function(){var e=this;i.checkLogin(this),this.checkLogin()&&t.get(i.getApi("duty/checksigned")).then(i.resolvedCallback("",function(t){e.beDuty=t.data.signed}))}}}).call(e,n(16),n(5))}});
//# sourceMappingURL=2.80ff70d53f9b5cb55963.js.map