"use strict";(self.webpackChunk_inc2734_unitone_css=self.webpackChunk_inc2734_unitone_css||[]).push([[653],{"./src/patterns/header/header-6/stories/index.stories.jsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,__namedExportsOrder:()=>__namedExportsOrder,default:()=>index_stories});__webpack_require__("./node_modules/react/index.js");var Decorator=__webpack_require__("./src/layout-primitives/decorator/Decorator.jsx"),Center=__webpack_require__("./src/layout-primitives/center/Center.jsx"),Container=__webpack_require__("./src/layout-primitives/container/Container.jsx"),Cover=__webpack_require__("./src/layout-primitives/cover/Cover.jsx"),Layers=__webpack_require__("./src/layout-primitives/layers/Layers.jsx"),Stack=__webpack_require__("./src/layout-primitives/stack/Stack.jsx"),Text=__webpack_require__("./src/layout-primitives/text/Text.jsx"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const Header6=props=>(0,jsx_runtime.jsx)(Decorator.S,{backgroundColor:props.backgroundColor,color:props.color,children:(0,jsx_runtime.jsx)(Layers.S,{cover:!0,children:(0,jsx_runtime.jsx)(Decorator.S,{padding:props.padding,children:(0,jsx_runtime.jsx)(Decorator.S,{backgroundColor:"transparent",borderColor:props.borderColor,borderWidth:"1px",children:(0,jsx_runtime.jsx)(Cover.Y,{minHeight:`calc(100vh - var(--unitone--s${props.padding}) * 2`,children:(0,jsx_runtime.jsx)(Cover.W,{children:(0,jsx_runtime.jsx)(Container.W,{gutters:0,maxWidth:"var(--unitone--measure)",children:(0,jsx_runtime.jsxs)(Stack.K,{gap:2,children:[!!props.title&&(0,jsx_runtime.jsx)(Center.M,{children:(0,jsx_runtime.jsx)("h2",{style:{"--unitone--font-size":5},children:props.title})}),!!props.children&&(0,jsx_runtime.jsx)(Text.x,{center:!0,children:props.children})]})})})})})})})});Header6.displayName="Header6",Header6.__docgenInfo={description:"",methods:[],displayName:"Header6"};const index_stories={title:"Patterns/Header/Header-6",component:Header6,argTypes:{backgroundColor:{control:{type:"color"},table:{defaultValue:{summary:"#000"}},type:{name:"string",required:!1}},borderColor:{control:{type:"color"},table:{defaultValue:{summary:"#fff"}},type:{name:"string",required:!1}},color:{control:{type:"color"},table:{defaultValue:{summary:"#fff"}},type:{name:"string",required:!1}},padding:{control:{type:"inline-radio"},options:[-2,-1,1,2,3],table:{defaultValue:{summary:"var(--unitone--s0)"}},type:{name:"number",required:!1}}},args:{backgroundColor:"#000",borderColor:"#fff",color:"#fff",padding:1},parameters:{layout:"fullscreen"}},Default=props=>(0,jsx_runtime.jsx)(Header6,{src:"https://placehold.jp/1280x1024.jpg",title:"Lorem ipsum dolor",backgroundColor:props.backgroundColor,borderColor:props.borderColor,color:props.color,padding:props.padding,children:(0,jsx_runtime.jsx)("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cill"})});Default.displayName="Default",Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:'props => <Header6 src="https://placehold.jp/1280x1024.jpg" title="Lorem ipsum dolor" backgroundColor={props.backgroundColor} borderColor={props.borderColor} color={props.color} padding={props.padding}>\n    <p>\n      Lorem ipsum dolor sit amet, consectetur adipisicing elit Lorem ipsum dolor sit amet,\n      consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna\n      aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex\n      ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cill\n    </p>\n  </Header6>',...Default.parameters?.docs?.source}}};const __namedExportsOrder=["Default"];Default.__docgenInfo={description:"",methods:[],displayName:"Default"}},"./src/layout-primitives/center/Center.jsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{M:()=>Center});__webpack_require__("./node_modules/react/index.js");var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/jsx-runtime.js");const Center=({intrinsic,withText,gutters,maxWidth,style,...props})=>(style={...style,"--unitone--max-width":maxWidth||void 0},(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div",{"data-unitone-layout":["center",!0===intrinsic?"-intrinsic":void 0,!0===withText?"-with-text":void 0,void 0!==gutters?`-gutters:${gutters}`:void 0].filter(Boolean).join(" "),style,children:props.children}));Center.displayName="Center",Center.__docgenInfo={description:"",methods:[],displayName:"Center"}},"./src/layout-primitives/container/Container.jsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{W:()=>Container});__webpack_require__("./node_modules/react/index.js");var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/jsx-runtime.js");const Container=({align,gutters,maxWidth,text,style,...props})=>(style={...style,"--unitone--max-width":maxWidth||void 0},(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div",{"data-unitone-layout":["container",void 0!==align?`-align:${align}`:void 0,void 0!==gutters?`-gutters:${gutters}`:void 0].filter(Boolean).join(" "),style,children:props.children}));Container.displayName="Container",Container.__docgenInfo={description:"",methods:[],displayName:"Container"}},"./src/layout-primitives/cover/Cover.jsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{W:()=>CoverContent,Y:()=>Cover});__webpack_require__("./node_modules/react/index.js");var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/jsx-runtime.js");const Cover=({gap,minHeight,justifyContent,noPadding,style,...props})=>(style={...style,"--unitone--min-height":minHeight||void 0},(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div",{"data-unitone-layout":["cover",noPadding?"-no-padding":void 0,void 0!==gap?`-gap:${gap}`:void 0,void 0!==justifyContent?`-justify-content:${justifyContent}`:void 0].filter(Boolean).join(" "),style,children:props.children}));Cover.displayName="Cover";const CoverContent=({position,tagName="div",...props})=>{const Tag=tagName;return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Tag,{"data-unitone-layout":["cover__content",void 0!==position?`-valign:${position}`:void 0].filter(Boolean).join(" "),children:props.children})};CoverContent.displayName="CoverContent",Cover.__docgenInfo={description:"",methods:[],displayName:"Cover"},CoverContent.__docgenInfo={description:"",methods:[],displayName:"CoverContent",props:{tagName:{defaultValue:{value:"'div'",computed:!1},required:!1}}}},"./src/layout-primitives/decorator/Decorator.jsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{S:()=>Decorator});__webpack_require__("./node_modules/react/index.js");var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/jsx-runtime.js");const Decorator=({backgroundColor,borderColor,borderRadius,borderWidth,color,padding,shadow,position,top,right,bottom,left,zIndex,overflow,style,...props})=>(style={...style,"--unitone--background-color":backgroundColor,"--unitone--border-color":borderColor,"--unitone--border-radius":borderRadius,"--unitone--border-width":borderWidth,"--unitone--color":color,"--unitone--top":void 0!==top?top:void 0,"--unitone--right":void 0!==right?right:void 0,"--unitone--bottom":void 0!==bottom?bottom:void 0,"--unitone--left":void 0!==left?left:void 0,"--unitone--z-index":void 0!==zIndex?zIndex:void 0},(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div",{"data-unitone-layout":["decorator",void 0!==padding?`-padding:${padding}`:void 0,shadow?"-shadow":void 0,position?`-position:${position}`:void 0,overflow?`-overflow:${overflow}`:void 0].filter(Boolean).join(" "),style,children:props.children}));Decorator.displayName="Decorator",Decorator.__docgenInfo={description:"",methods:[],displayName:"Decorator"}},"./src/layout-primitives/layers/Layers.jsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{S:()=>Layers});__webpack_require__("./node_modules/react/index.js");var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/jsx-runtime.js");const Layers=({cover,fill,portrait,style,...props})=>(style={...style},(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div",{"data-unitone-layout":["layers",!0===cover?"-cover":void 0,!0===fill?"-fill":void 0,!0===portrait?"-portrait":void 0].filter(Boolean).join(" "),style,children:props.children}));Layers.displayName="Layers",Layers.__docgenInfo={description:"",methods:[],displayName:"Layers"}},"./src/layout-primitives/stack/Stack.jsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{K:()=>Stack});__webpack_require__("./node_modules/react/index.js");var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/jsx-runtime.js");const Stack=({center,divider,gap,negative,style,...props})=>(style={...style},(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div",{"data-unitone-layout":["stack",divider?`-divider:${divider}`:void 0,void 0!==gap?`-gap:${gap}`:void 0,!0===negative?"-negative":void 0].filter(Boolean).join(" "),style,children:props.children}));Stack.displayName="Stack",Stack.__docgenInfo={description:"",methods:[],displayName:"Stack"}},"./src/layout-primitives/text/Text.jsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{x:()=>Text});__webpack_require__("./node_modules/react/index.js");var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/jsx-runtime.js");const Text=({center,column,gap,maxWidth,scale,style,...props})=>(style={...style,"--unitone--max-width":maxWidth||void 0},(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div",{"data-unitone-layout":["text",!0===center?"-center":void 0,!0===column?"-column":void 0,void 0!==gap?`-gap:${gap}`:void 0].filter(Boolean).join(" "),style,children:props.children}));Text.displayName="Text",Text.__docgenInfo={description:"",methods:[],displayName:"Text"}}}]);