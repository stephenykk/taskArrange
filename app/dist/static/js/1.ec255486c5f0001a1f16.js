webpackJsonp([1,8],{157:function(t,e,n){n(432);var r=n(11)(n(511),n(470),"data-v-40bf57fe",null);t.exports=r.exports},158:function(t,e,n){var r=n(11)(n(514),n(461),null,null);t.exports=r.exports},159:function(t,e,n){n(440);var r=n(11)(n(518),n(487),"data-v-f15dbae0",null);t.exports=r.exports},380:function(t,e,n){var r=n(12),a=n(7),s=n(144),i=n(381),o=n(25).f;t.exports=function(t){var e=a.Symbol||(a.Symbol=s?{}:r.Symbol||{});"_"==t.charAt(0)||t in e||o(e,t,{value:i.f(t)})}},381:function(t,e,n){e.f=n(8)},382:function(t,e,n){"use strict";(function(t,r){var a=n(388),s=n.n(a),i=n(76),o=n.n(i);e.a={props:{api:{type:String,required:!0},active:{type:Boolean,default:!0},idkey:{type:String,default:"id"},order:{type:String,default:""},subject:String,queryView:Boolean,queryCondition:Object},data:function(){return{paging:{total:0},params:t.pagingParams(),data:[]}},computed:{delApi:function(){var t=this.api.split("/");return t[t.length-1]="delete",t.join("/")}},methods:{handlePagingChange:function(e){this.params=t.pagingParams(e),this.load(!0)},load:function(e){var n=this,a=this.params;this.order&&o()(a,{order:this.order});var i=this.queryView?{view:!0}:{},u=this.queryCondition;"object"===("undefined"==typeof u?"undefined":s()(u))&&o()(i,u);var l="获取"+this.subject+"数据",c=function(t){n.data=t.data,n.paging.total=t.total};c.notips=e,r.post(t.getApi(this.api,a),i).then(t.resolvedCallback(l,c))},editRow:function(t){this.$emit("edit",t)},delRow:function(t){this.$emit("del",t),this.delConfirm(t[this.idkey])},delConfirm:function(t){var e=this;this.$confirm("确定删除"+this.subject+"?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){e.removeRow(t)}).catch(function(){e.$message.info("取消删除")})},removeRow:function(e){var n=this;r.get(t.getApi(this.delApi+"/"+e)).then(t.resolvedCallback("删除",function(){return n.load(!0)}))}},watch:{active:function(){this.active&&this.load()}},mounted:function(){this.active&&this.$store.state.user.userId&&this.load()}}}).call(e,n(5),n(16))},383:function(t,e,n){var r=n(149),a=n(78).concat("length","prototype");e.f=Object.getOwnPropertyNames||function(t){return r(t,a)}},384:function(t,e,n){"use strict";(function(t,n){e.a={props:{saveApi:String,editApi:String,idkey:{type:String,default:"id"},current:{type:Object,default:function(){return{}}}},data:function(){return{rules:{}}},computed:{id:function(){return this.current[this.idkey]},isEdit:function(){return!!this.current[this.idkey]}},methods:{save:function(){var e=this,r=t.compact(t.extend({},this.current));if(this.preSave)try{r=this.preSave(r)}catch(t){return void this.$message.error(t.message)}var a=(this.isEdit?"修改":"新增")+this.subject,s=this.isEdit?this.editApi:this.saveApi;this.isEdit&&delete r[this.idkey],n.post(t.getApi(s),r).then(t.resolvedCallback(a,function(){e.postSave(),e.$emit("save-done")}))},postSave:function(){this.hide&&"function"==typeof this.hide&&this.hide()}}}}).call(e,n(5),n(16))},385:function(t,e,n){"use strict";e.a={props:["subject"],data:function(){return{visible:!1}},methods:{show:function(){this.visible=!0},hide:function(){this.visible=!1}}}},386:function(t,e,n){t.exports={default:n(389),__esModule:!0}},387:function(t,e,n){t.exports={default:n(390),__esModule:!0}},388:function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}e.__esModule=!0;var a=n(387),s=r(a),i=n(386),o=r(i),u="function"==typeof o.default&&"symbol"==typeof s.default?function(t){return typeof t}:function(t){return t&&"function"==typeof o.default&&t.constructor===o.default&&t!==o.default.prototype?"symbol":typeof t};e.default="function"==typeof o.default&&"symbol"===u(s.default)?function(t){return"undefined"==typeof t?"undefined":u(t)}:function(t){return t&&"function"==typeof o.default&&t.constructor===o.default&&t!==o.default.prototype?"symbol":"undefined"==typeof t?"undefined":u(t)}},389:function(t,e,n){n(398),n(397),n(399),n(400),t.exports=n(7).Symbol},390:function(t,e,n){n(81),n(82),t.exports=n(381).f("iterator")},391:function(t,e,n){var r=n(73),a=n(145),s=n(143);t.exports=function(t){var e=r(t),n=a.f;if(n)for(var i,o=n(t),u=s.f,l=0;o.length>l;)u.call(t,i=o[l++])&&e.push(i);return e}},392:function(t,e,n){var r=n(77);t.exports=Array.isArray||function(t){return"Array"==r(t)}},393:function(t,e,n){var r=n(73),a=n(37);t.exports=function(t,e){for(var n,s=a(t),i=r(s),o=i.length,u=0;o>u;)if(s[n=i[u++]]===e)return n}},394:function(t,e,n){var r=n(75)("meta"),a=n(42),s=n(24),i=n(25).f,o=0,u=Object.isExtensible||function(){return!0},l=!n(40)(function(){return u(Object.preventExtensions({}))}),c=function(t){i(t,r,{value:{i:"O"+ ++o,w:{}}})},f=function(t,e){if(!a(t))return"symbol"==typeof t?t:("string"==typeof t?"S":"P")+t;if(!s(t,r)){if(!u(t))return"F";if(!e)return"E";c(t)}return t[r].i},d=function(t,e){if(!s(t,r)){if(!u(t))return!0;if(!e)return!1;c(t)}return t[r].w},p=function(t){return l&&v.NEED&&u(t)&&!s(t,r)&&c(t),t},v=t.exports={KEY:r,NEED:!1,fastKey:f,getWeak:d,onFreeze:p}},395:function(t,e,n){var r=n(143),a=n(74),s=n(37),i=n(146),o=n(24),u=n(147),l=Object.getOwnPropertyDescriptor;e.f=n(17)?l:function(t,e){if(t=s(t),e=i(e,!0),u)try{return l(t,e)}catch(t){}if(o(t,e))return a(!r.f.call(t,e),t[e])}},396:function(t,e,n){var r=n(37),a=n(383).f,s={}.toString,i="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[],o=function(t){try{return a(t)}catch(t){return i.slice()}};t.exports.f=function(t){return i&&"[object Window]"==s.call(t)?o(t):a(r(t))}},397:function(t,e){},398:function(t,e,n){"use strict";var r=n(12),a=n(24),s=n(17),i=n(41),o=n(150),u=n(394).KEY,l=n(40),c=n(80),f=n(79),d=n(75),p=n(8),v=n(381),h=n(380),m=n(393),b=n(391),y=n(392),g=n(26),k=n(37),_=n(146),x=n(74),w=n(148),A=n(396),S=n(395),T=n(25),C=n(73),E=S.f,O=T.f,j=A.f,M=r.Symbol,q=r.JSON,$=q&&q.stringify,P="prototype",F=p("_hidden"),N=p("toPrimitive"),B={}.propertyIsEnumerable,R=c("symbol-registry"),I=c("symbols"),D=c("op-symbols"),z=Object[P],W="function"==typeof M,J=r.QObject,K=!J||!J[P]||!J[P].findChild,H=s&&l(function(){return 7!=w(O({},"a",{get:function(){return O(this,"a",{value:7}).a}})).a})?function(t,e,n){var r=E(z,e);r&&delete z[e],O(t,e,n),r&&t!==z&&O(z,e,r)}:O,V=function(t){var e=I[t]=w(M[P]);return e._k=t,e},Y=W&&"symbol"==typeof M.iterator?function(t){return"symbol"==typeof t}:function(t){return t instanceof M},U=function(t,e,n){return t===z&&U(D,e,n),g(t),e=_(e,!0),g(n),a(I,e)?(n.enumerable?(a(t,F)&&t[F][e]&&(t[F][e]=!1),n=w(n,{enumerable:x(0,!1)})):(a(t,F)||O(t,F,x(1,{})),t[F][e]=!0),H(t,e,n)):O(t,e,n)},G=function(t,e){g(t);for(var n,r=b(e=k(e)),a=0,s=r.length;s>a;)U(t,n=r[a++],e[n]);return t},L=function(t,e){return void 0===e?w(t):G(w(t),e)},Q=function(t){var e=B.call(this,t=_(t,!0));return!(this===z&&a(I,t)&&!a(D,t))&&(!(e||!a(this,t)||!a(I,t)||a(this,F)&&this[F][t])||e)},X=function(t,e){if(t=k(t),e=_(e,!0),t!==z||!a(I,e)||a(D,e)){var n=E(t,e);return!n||!a(I,e)||a(t,F)&&t[F][e]||(n.enumerable=!0),n}},Z=function(t){for(var e,n=j(k(t)),r=[],s=0;n.length>s;)a(I,e=n[s++])||e==F||e==u||r.push(e);return r},tt=function(t){for(var e,n=t===z,r=j(n?D:k(t)),s=[],i=0;r.length>i;)!a(I,e=r[i++])||n&&!a(z,e)||s.push(I[e]);return s};W||(M=function(){if(this instanceof M)throw TypeError("Symbol is not a constructor!");var t=d(arguments.length>0?arguments[0]:void 0),e=function(n){this===z&&e.call(D,n),a(this,F)&&a(this[F],t)&&(this[F][t]=!1),H(this,t,x(1,n))};return s&&K&&H(z,t,{configurable:!0,set:e}),V(t)},o(M[P],"toString",function(){return this._k}),S.f=X,T.f=U,n(383).f=A.f=Z,n(143).f=Q,n(145).f=tt,s&&!n(144)&&o(z,"propertyIsEnumerable",Q,!0),v.f=function(t){return V(p(t))}),i(i.G+i.W+i.F*!W,{Symbol:M});for(var et="hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","),nt=0;et.length>nt;)p(et[nt++]);for(var et=C(p.store),nt=0;et.length>nt;)h(et[nt++]);i(i.S+i.F*!W,"Symbol",{for:function(t){return a(R,t+="")?R[t]:R[t]=M(t)},keyFor:function(t){if(Y(t))return m(R,t);throw TypeError(t+" is not a symbol!")},useSetter:function(){K=!0},useSimple:function(){K=!1}}),i(i.S+i.F*!W,"Object",{create:L,defineProperty:U,defineProperties:G,getOwnPropertyDescriptor:X,getOwnPropertyNames:Z,getOwnPropertySymbols:tt}),q&&i(i.S+i.F*(!W||l(function(){var t=M();return"[null]"!=$([t])||"{}"!=$({a:t})||"{}"!=$(Object(t))})),"JSON",{stringify:function(t){if(void 0!==t&&!Y(t)){for(var e,n,r=[t],a=1;arguments.length>a;)r.push(arguments[a++]);return e=r[1],"function"==typeof e&&(n=e),!n&&y(e)||(e=function(t,e){if(n&&(e=n.call(this,t,e)),!Y(e))return e}),r[1]=e,$.apply(q,r)}}}),M[P][N]||n(18)(M[P],N,M[P].valueOf),f(M,"Symbol"),f(Math,"Math",!0),f(r.JSON,"JSON",!0)},399:function(t,e,n){n(380)("asyncIterator")},400:function(t,e,n){n(380)("observable")},401:function(t,e,n){"use strict";var r=[{label:"临时任务",value:"once"},{label:"每天任务",value:"daily"},{label:"每周任务",value:"weekly"},{label:"每月任务",value:"monthly"},{label:"每季任务",value:"quarter"},{label:"每年任务",value:"yearly"}],a={title:"任务名称",content:"任务内容",expect_start:"开始时间",expect_end:"结束时间",reciever:"负责人",frequency:"任务类型"},s={created:"已创建",assigned:"已分派",recieved:"已接收",doing:"进行中",finish:"已完成",delay:"延迟"},i=[{status:"created",text:"创建"},{status:"assigned",text:"分派"},{status:"recieved",text:"接受"},{status:"doing",text:"开始"},{status:"finish",text:"结束"},{status:"delay",text:"延迟"}],o={assigned:"assign_time",recieved:"recieve_time",doing:"task_start",finish:"task_end"},u={id:"",creator:"",status:"created",expect_start:"",expect_end:"",frequency:"daily"};e.a={taskTypes:r,requiredFields:a,statusMap:s,statusSteps:i,statusTimeFields:o,newTask:u}},421:function(t,e,n){e=t.exports=n(373)(),e.push([t.i,"h1[data-v-40bf57fe]{font-size:30px;font-weight:400}","",{version:3,sources:["/./src/views/task/My.vue"],names:[],mappings:"AACA,oBACE,eAAgB,AAChB,eAAoB,CACrB",file:"My.vue",sourcesContent:["\nh1[data-v-40bf57fe] {\n  font-size: 30px;\n  font-weight: normal;\n}\n"],sourceRoot:"webpack://"}])},425:function(t,e,n){e=t.exports=n(373)(),e.push([t.i,".task-searchbar{.el-select{width:180px}}","",{version:3,sources:["/./src/views/task/TaskSearchbar.vue"],names:[],mappings:"AACA,gBACA,WACY,WAAa,CACxB,CACA",file:"TaskSearchbar.vue",sourcesContent:["\n.task-searchbar {\n.el-select {\n            width: 180px;\n}\n}\n"],sourceRoot:"webpack://"}])},426:function(t,e,n){e=t.exports=n(373)(),e.push([t.i,"h1[data-v-9ec6c78a]{font-size:35px}.task-create-page[data-v-9ec6c78a]{width:60%;margin:auto;margin-top:50px}","",{version:3,sources:["/./src/views/task/TaskForm.vue"],names:[],mappings:"AACA,oBACE,cAAgB,CACjB,AACD,mCACE,UAAW,AACX,YAAa,AACb,eAAiB,CAClB",file:"TaskForm.vue",sourcesContent:["\nh1[data-v-9ec6c78a] {\n  font-size: 35px;\n}\n.task-create-page[data-v-9ec6c78a] {\n  width: 60%;\n  margin: auto;\n  margin-top: 50px;\n}\n"],sourceRoot:"webpack://"}])},429:function(t,e,n){e=t.exports=n(373)(),e.push([t.i,"h1[data-v-f15dbae0]{font-size:30px;font-weight:400}","",{version:3,sources:["/./src/views/task/index.vue"],names:[],mappings:"AACA,oBACE,eAAgB,AAChB,eAAoB,CACrB",file:"index.vue",sourcesContent:["\nh1[data-v-f15dbae0] {\n  font-size: 30px;\n  font-weight: normal;\n}\n"],sourceRoot:"webpack://"}])},432:function(t,e,n){var r=n(421);"string"==typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);n(374)("40599615",r,!0)},436:function(t,e,n){var r=n(425);"string"==typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);n(374)("4399fa98",r,!0)},437:function(t,e,n){var r=n(426);"string"==typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);n(374)("8a7609c6",r,!0)},440:function(t,e,n){var r=n(429);"string"==typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);n(374)("31777ca4",r,!0)},453:function(t,e,n){var r=n(11)(n(512),n(476),null,null);t.exports=r.exports},454:function(t,e,n){var r=n(11)(n(513),n(474),null,null);t.exports=r.exports},455:function(t,e,n){n(437);var r=n(11)(n(515),n(482),"data-v-9ec6c78a",null);t.exports=r.exports},456:function(t,e,n){n(436);var r=n(11)(n(516),n(481),null,null);t.exports=r.exports},457:function(t,e,n){var r=n(11)(n(517),n(488),null,null);t.exports=r.exports},461:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("task-form",{attrs:{"edit-api":"task/update/"+t.taskid,current:t.currentTask},on:{"save-done":t.onSaved}})},staticRenderFns:[]}},470:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"task-page task-admin"},[n("h1",{staticClass:"text-center"},[t._v("我的任务列表")]),t._v(" "),n("my-task-table",{ref:"table",attrs:{api:"task/get","query-condition":{reciever:t.user.userId},idkey:"id",subject:"任务","query-view":!0,active:t.tblActive},on:{edit:t.nav2edit,"modal-show":t.showModal}}),t._v(" "),n("my-task-modal",{ref:"modal",attrs:{current:t.currentTask}})],1)},staticRenderFns:[]}},474:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"task-table"},[n("el-table",{attrs:{border:"",stripe:"",data:t.data}},[n("el-table-column",{attrs:{type:"index",label:"序号",width:"70"}}),t._v(" "),n("el-table-column",{attrs:{prop:"title",label:"任务名称"}}),t._v(" "),n("el-table-column",{attrs:{prop:"frequency",label:"任务类型"},scopedSlots:t._u([["default",function(e){return[t._v("\n        "+t._s(t._f("taskTypeText")(e.row.frequency))+"\n      ")]}]])}),t._v(" "),n("el-table-column",{attrs:{prop:"assignerName",label:"分派人"}}),t._v(" "),n("el-table-column",{attrs:{prop:"status",label:"状态"},scopedSlots:t._u([["default",function(e){return[t._v("\n        "+t._s(t._f("statusText")(e.row.status))+"\n      ")]}]])}),t._v(" "),n("el-table-column",{attrs:{prop:"recieve_time",label:"接受时间",width:"120"}}),t._v(" "),n("el-table-column",{attrs:{prop:"task_start",label:"开始时间",width:"120"}}),t._v(" "),n("el-table-column",{attrs:{prop:"task_end",label:"完成时间",width:"120"}}),t._v(" "),n("el-table-column",{attrs:{prop:"expect_start",label:"期望开始",width:"120"}}),t._v(" "),n("el-table-column",{attrs:{prop:"expect_end",label:"期望结束",width:"120"}}),t._v(" "),n("el-table-column",{attrs:{label:"操作",width:"100"},scopedSlots:t._u([["default",function(e){return[n("el-button",{attrs:{type:t.hasNextStatus(e.row.status)?"primary":"success"},on:{click:function(n){t.updateTask(e.row)}}},[t._v("\n        "+t._s(t._f("nextStatusText")(e.row.status)))])]}]])})],1),t._v(" "),n("div",{staticClass:"paging mt10 clearfix"},[n("ex-pagination",{attrs:{paging:t.paging},on:{"paging-change":t.handlePagingChange}})],1)],1)},staticRenderFns:[]}},476:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("el-dialog",{attrs:{title:"任务备注"},model:{value:t.visible,callback:function(e){t.visible=e}}},[n("el-form",{attrs:{model:t.current,"label-width":"120px","label-position":"right"}},[n("el-form-item",{attrs:{label:"任务: ",prop:"title"}},[n("div",[t._v(t._s(t.current.title))])]),t._v(" "),n("el-form-item",{attrs:{label:"内容: ",prop:"content"}},[n("div",[t._v(t._s(t.current.content))])]),t._v(" "),n("el-form-item",{attrs:{label:"备注: ",prop:"reason"}},[n("el-input",{attrs:{type:"textarea",rows:4},model:{value:t.current.reason,callback:function(e){t.current.reason=e}}})],1)],1),t._v(" "),n("div",{staticClass:"dialog-footer",slot:"footer"},[n("el-button",{attrs:{type:"primary"},on:{click:t.save}},[t._v("保存")]),t._v(" "),n("el-button",{attrs:{type:"default"},on:{click:t.hide}},[t._v("取消")])],1)],1)},staticRenderFns:[]}},481:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"task-searchbar mt20"},[n("el-form",{attrs:{inline:"","label-width":"60px","label-suffix":": "}},[n("el-form-item",{attrs:{label:"关键字"}},[n("el-input",{attrs:{placeholder:"任务名 / 任务内容"},nativeOn:{keyup:function(e){return t._k(e.keyCode,"enter",13)?null:void t.search(e)}},model:{value:t.searching.kw,callback:function(e){t.searching.kw=e}}})],1),t._v(" "),n("el-form-item",{attrs:{label:"类型"}},[n("el-select",{model:{value:t.searching.frequency,callback:function(e){t.searching.frequency=e}}},[n("el-option",{attrs:{label:"全部",value:""}}),t._v(" "),t._l(t.taskTypes,function(t){return n("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})})],2)],1),t._v(" "),n("el-form-item",{attrs:{label:"状态"}},[n("el-select",{model:{value:t.searching.status,callback:function(e){t.searching.status=e}}},[n("el-option",{attrs:{label:"全部",value:""}}),t._v(" "),t._l(t.statusMap,function(t,e){return n("el-option",{key:e,attrs:{label:t,value:e}})})],2)],1),t._v(" "),n("el-form-item",[n("el-button",{attrs:{icon:"search",type:"primary"},on:{click:t.search}},[t._v("查询")]),t._v(" "),n("el-button",{attrs:{type:"primary",plain:""},on:{click:t.reset}},[t._v("重置")])],1)],1)],1)},staticRenderFns:[]}},482:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"task-page task-create-page"},[n("el-form",{attrs:{"label-width":"150px","label-position":"right"}},[n("el-form-item",{attrs:{required:"",label:"任务名称:"}},[n("el-input",{model:{value:t.current.title,callback:function(e){t.current.title=e}}})],1),t._v(" "),n("el-form-item",{attrs:{required:"",label:"任务内容:"}},[n("el-input",{attrs:{type:"textarea",rows:4},model:{value:t.current.content,callback:function(e){t.current.content=e}}})],1),t._v(" "),n("el-form-item",{attrs:{required:"",label:"负责人:"}},[n("ui-select",{staticClass:"d-ib",attrs:{disabled:t.isEdit&&!t.reassign,api:"user/get",value:t.current.reciever},on:{change:t.onSelectUser}}),t._v(" "),t.isEdit?n("el-checkbox",{model:{value:t.reassign,callback:function(e){t.reassign=e}}},[t._v("重新分派")]):t._e()],1),t._v(" "),n("el-form-item",{attrs:{required:"",label:"任务类型:"}},[n("el-select",{attrs:{placeholder:"任务类型"},model:{value:t.current.frequency,callback:function(e){t.current.frequency=e}}},t._l(t.taskTypes,function(t){return n("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})}))],1),t._v(" "),n("el-form-item",{attrs:{required:"",label:"期望开始时间:"}},[n("el-date-picker",{ref:"dt1",attrs:{type:"datetime","picker-options":t.pickerOpts,format:"yyyy-MM-dd HH:mm:ss",placeholder:"选择日期"},model:{value:t.current.expect_start,callback:function(e){t.current.expect_start=e}}})],1),t._v(" "),n("el-form-item",{attrs:{required:"",label:"期望结束时间:"}},[n("el-date-picker",{ref:"dt2",attrs:{type:"datetime","picker-options":t.pickerOpts,format:"yyyy-MM-dd HH:mm:ss",placeholder:"选择日期"},model:{value:t.current.expect_end,callback:function(e){t.current.expect_end=e}}})],1),t._v(" "),n("el-form-item",{attrs:{required:""}},[n("div",{staticClass:"action"},[n("el-button",{attrs:{type:"primary"},on:{click:t.save}},[t._v(t._s(t.isEdit?"保存":"创建"))])],1)])],1)],1)},staticRenderFns:[]}},487:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"task-page task-admin"},[n("task-searchbar",{on:{search:t.setSearching,reset:t.setSearching}}),t._v(" "),n("h1",{staticClass:"text-center"},[t._v("全部任务列表")]),t._v(" "),n("task-table",{ref:"table",attrs:{api:"task/get",idkey:"id",subject:"任务","query-view":!0,"query-condition":t.searching},on:{edit:t.nav2edit}})],1)},staticRenderFns:[]}},488:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"task-table"},[n("el-table",{attrs:{border:"",stripe:"",data:t.data}},[n("el-table-column",{attrs:{type:"index",label:"序号",width:"70"}}),t._v(" "),n("el-table-column",{attrs:{prop:"title",label:"任务名称"}}),t._v(" "),n("el-table-column",{attrs:{prop:"frequency",label:"任务类型"},scopedSlots:t._u([["default",function(e){return[t._v("\n        "+t._s(t._f("taskTypeText")(e.row.frequency))+"\n      ")]}]])}),t._v(" "),n("el-table-column",{attrs:{prop:"recieverName",label:"负责人"}}),t._v(" "),n("el-table-column",{attrs:{prop:"creatorName",label:"创建人"}}),t._v(" "),n("el-table-column",{attrs:{prop:"assignerName",label:"分派人"}}),t._v(" "),n("el-table-column",{attrs:{prop:"status",label:"状态"},scopedSlots:t._u([["default",function(e){return[t._v("\n        "+t._s(t._f("statusText")(e.row.status))+"\n      ")]}]])}),t._v(" "),n("el-table-column",{attrs:{prop:"expect_start",label:"期望开始"}}),t._v(" "),n("el-table-column",{attrs:{prop:"expect_end",label:"期望结束"}}),t._v(" "),n("el-table-column",{attrs:{label:"操作",width:"140"},scopedSlots:t._u([["default",function(e){return[n("el-button",{attrs:{plain:"",size:"small",type:"primary"},on:{click:function(n){t.editRow(e.row)}}},[t._v("编辑")]),t._v(" "),n("el-button",{attrs:{plain:"",size:"small",type:"danger"},on:{click:function(n){t.delRow(e.row)}}},[t._v("删除")])]}]])})],1),t._v(" "),n("div",{staticClass:"paging mt10 clearfix"},[n("ex-pagination",{attrs:{paging:t.paging},on:{"paging-change":t.handlePagingChange}})],1)],1)},staticRenderFns:[]}},511:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n(39),a=n.n(r),s=n(38),i=n(454),o=n.n(i),u=n(453),l=n.n(u);e.default={name:"TaskView",data:function(){return{tblActive:!1,currentTask:{}}},computed:a()({},n.i(s.b)(["user"])),components:{MyTaskTable:o.a,MyTaskModal:l.a},methods:a()({},n.i(s.a)(["setCurrentTask"]),{nav2edit:function(t){this.setCurrentTask(t),this.$router.push({name:"taskEdit",params:{id:t.id}})},showModal:function(t){this.currentTask=t,this.$refs.modal.show()}}),created:function(){var t=this;this.user.userId?this.tblActive=!0:(this.$message.error("请先登录.."),this.$nextTick(function(){return t.$router.push({name:"home"})}))}}},512:function(t,e,n){"use strict";(function(t,r){Object.defineProperty(e,"__esModule",{value:!0});var a=n(385);e.default={name:"MyTaskModal",mixins:[a.a],props:{conf:null,current:{type:Object,default:function(){return{}}}},methods:{save:function(){var e=this,n=this.current,a=n.reason.trim();return a?n.id?void t.post(r.getApi("/task/update/"+n.id),{reason:a}).then(r.resolvedCallback("备注",function(){e.hide()})):void this.$message.warning("缺少必要参数 id"):void this.$message.warning("备注不能为空..")}}}}).call(e,n(16),n(5))},513:function(t,e,n){"use strict";(function(t,r){Object.defineProperty(e,"__esModule",{value:!0});var a=n(152),s=n.n(a),i=n(382),o=n(401),u=o.a.statusMap,l=o.a.taskTypes,c=o.a.statusSteps,f=o.a.statusTimeFields;e.default={name:"TaskTable",mixins:[i.a],props:{order:{type:String,default:"frequency desc, recieverName asc"}},methods:{hasNextStatus:function(e){return t.nextStatus(e,c)},updateTask:function(t){this.hasNextStatus(t.status)?this.setStatus(t):this.$emit("modal-show",t)},setStatus:function(e){var n=this,a=e.id,i=e.status,o=t.nextStatus(i,c);if(!o)return void this.$message.warning("已完成的任务..");var u=f[o.status];r.post(t.getApi("/task/update/"+a),s()({status:o.status},u,t.formatDatetime())).then(t.resolvedCallback(o.text+"任务",function(){n.load(!0)}))}},filters:{statusText:function(t){return u[t]},taskTypeText:function(t){var e=l.filter(function(e){return e.value===t})[0];return e?e.label:""},nextStatusText:function(e){var n=t.nextStatus(e,c);return n?n.text:"备注"}}}}).call(e,n(5),n(16))},514:function(t,e,n){"use strict";(function(t,r){Object.defineProperty(e,"__esModule",{value:!0});var a=n(76),s=n.n(a),i=n(39),o=n.n(i),u=n(38),l=n(455),c=n.n(l),f=n(401),d=f.a.newTask;e.default={name:"TaskEditPage",data:function(){return{taskid:""}},computed:o()({},n.i(u.b)(["currentTask"])),methods:o()({},n.i(u.a)(["setCurrentTask"]),{onSaved:function(){this.taskid||this.setCurrentTask(s()({},d))}}),components:{TaskForm:c.a},beforeRouteEnter:function(e,n,a){var i=e.params.id;a(function(e){e.taskid=i,"taskEdit"!==e.$route.name||e.currentTask.id||t.post(r.getApi("task/get"),{id:i}).then(r.resolvedCallback("获取任务",function(t){e.setCurrentTask(t.data[0])})),"taskCreate"===e.$route.name&&e.setCurrentTask(s()({},d))})}}}).call(e,n(16),n(5))},515:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0});var r=n(39),a=n.n(r),s=n(38),i=n(384),o=n(401),u=o.a.taskTypes,l=o.a.requiredFields;e.default={name:"TaskForm",mixins:[i.a],props:{subject:{type:String,default:function(){return"任务"}},saveApi:{type:String,default:"task/insert"},editApi:{type:String,default:"task/update"},current:{type:[Object,null],default:function(){return{}}}},data:function(){return{taskTypes:u,pickerOpts:{shortcuts:t.pickerShortcuts},reassign:!1}},computed:a()({},n.i(s.b)(["user"])),methods:{onSelectUser:function(t){this.current.reciever=t},preSave:function(e){t.eachKey(l,function(t,n){if(!e[n])throw new Error(t+"不能为空..")}),this.isEdit?(this.reassign&&(e.assigner=this.user.userId,e.assign_time=t.formatDatetime()),["assignerName","creatorName","recieverName"].forEach(function(t){delete e[t]})):(e.creator=this.user.userId,e.reciever&&(e.assigner=this.user.userId,e.assign_time=t.formatDatetime(),e.status="assigned"));var n=e.expect_start,r=e.expect_end;return e.expect_start=t.formatDatetime(n),e.expect_end=t.formatDatetime(r),e},postSave:function(){t.log("save ok..")}},created:function(){return this.user.userId?void(this.current.creator=this.user.userId):void this.$message.error("请先登录..")},mounted:function(){}}}).call(e,n(5))},516:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0});var r=n(76),a=n.n(r),s=n(401),i={kw:"",frequency:"",status:""},o=s.a.statusMap,u=s.a.taskTypes;e.default={name:"TaskSearchbar",data:function(){return{searching:a()({},i),statusMap:o,taskTypes:u}},methods:{search:function(){var e=t.filterKey(this.searching,function(t){return!!t});this.$emit("search",e)},reset:function(){this.searching=a()({},i),this.$emit("reset",{})}}}}).call(e,n(5))},517:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n(382),a=n(401),s=a.a.statusMap,i=a.a.taskTypes;e.default={name:"TaskTable",mixins:[r.a],props:{order:{type:String,default:"frequency desc, recieverName asc"}},filters:{statusText:function(t){return s[t]},taskTypeText:function(t){var e=i.filter(function(e){return e.value===t})[0];return e?e.label:""}}}},518:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0});var r=n(39),a=n.n(r),s=n(38),i=n(457),o=n.n(i),u=n(456),l=n.n(u);e.default={name:"TaskView",data:function(){return{searching:{}}},components:{TaskTable:o.a,TaskSearchbar:l.a},methods:a()({},n.i(s.a)(["setCurrentTask"]),{nav2edit:function(t){this.setCurrentTask(t),this.$router.push({name:"taskEdit",params:{id:t.id}})},setSearching:function(t){var e=this;this.searching=t,this.$nextTick(function(){return e.$refs.table.load()})}}),created:function(){t.checkLogin(this)}}}).call(e,n(5))}});
//# sourceMappingURL=1.ec255486c5f0001a1f16.js.map