(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-ec1bc9ec"],{"52ef":function(e,t,l){"use strict";l.r(t);var n=l("7a23"),o={class:"tags-container",style:{"line-height":"28px"}},c=Object(n["createTextVNode"])("Add");function a(e,t,l,a,i,r){var u=Object(n["resolveComponent"])("el-tag"),d=Object(n["resolveComponent"])("el-button"),s=Object(n["resolveComponent"])("el-option"),b=Object(n["resolveComponent"])("el-select"),p=Object(n["resolveComponent"])("el-dialog");return Object(n["openBlock"])(),Object(n["createElementBlock"])("div",null,[Object(n["createElementVNode"])("div",o,[(Object(n["openBlock"])(!0),Object(n["createElementBlock"])(n["Fragment"],null,Object(n["renderList"])(e.locList,(function(t){return Object(n["openBlock"])(),Object(n["createBlock"])(u,{key:t,style:{cursor:"pointer"},closable:!e.readOnly,"disable-transitions":!1,type:"info",onClose:function(l){return e.handleDelete(t)}},{default:Object(n["withCtx"])((function(){return[Object(n["createTextVNode"])(Object(n["toDisplayString"])(t),1)]})),_:2},1032,["closable","onClose"])})),128)),e.readOnly||e.onlyOne&&0!==e.modelValue.length?Object(n["createCommentVNode"])("",!0):(Object(n["openBlock"])(),Object(n["createBlock"])(d,{key:0,style:{"vertical-align":"middle"},type:"info",round:"",onClick:e.openFindDial},{default:Object(n["withCtx"])((function(){return[c]})),_:1},8,["onClick"]))]),Object(n["createVNode"])(p,{title:"Select",center:"",modelValue:e.addDialIsVisible,"onUpdate:modelValue":t[1]||(t[1]=function(t){return e.addDialIsVisible=t}),width:"95%",top:"2%","append-to-body":""},{default:Object(n["withCtx"])((function(){return[Object(n["createVNode"])(b,{modelValue:e.selvalue,"onUpdate:modelValue":t[0]||(t[0]=function(t){return e.selvalue=t}),class:"m-2",placeholder:"Select",size:"large",onChange:e.selected},{default:Object(n["withCtx"])((function(){return[(Object(n["openBlock"])(!0),Object(n["createElementBlock"])(n["Fragment"],null,Object(n["renderList"])(e.options,(function(e){return Object(n["openBlock"])(),Object(n["createBlock"])(s,{key:e,label:e,value:e},null,8,["label","value"])})),128))]})),_:1},8,["modelValue","onChange"])]})),_:1},8,["modelValue"])])}l("a434");var i=Object(n["defineComponent"])({name:"MyCustomFieldTwo",props:{modelValue:{type:Array},onlyOne:{type:Boolean,default:!1,required:!1},readOnly:{type:Boolean,default:!1}},setup:function(e,t){var l=t.emit,o=Object(n["ref"])(!1),c=Object(n["ref"])(e.modelValue),a=Object(n["ref"])(""),i=["Field1","Field2","Field3","Field4"],r=function(){o.value=!0},u=function(e){c.value.splice(c.value.indexOf(e),1),l("update:modelValue",c.value)},d=function(e){c.value.push(e),l("update:modelValue",c.value),o.value=!1};return{addDialIsVisible:o,locList:c,selvalue:a,options:i,handleDelete:u,openFindDial:r,selected:d}}}),r=(l("da2b"),l("6b0d")),u=l.n(r);const d=u()(i,[["render",a],["__scopeId","data-v-c0933b5a"]]);t["default"]=d},"95b0":function(e,t,l){},da2b:function(e,t,l){"use strict";l("95b0")}}]);
//# sourceMappingURL=chunk-ec1bc9ec.7833fd66.js.map