"use strict";(self.webpackChunk_inc2734_unitone_css=self.webpackChunk_inc2734_unitone_css||[]).push([[9903],{"./src/patterns/features/features-2/stories/index.stories.jsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,__namedExportsOrder:()=>__namedExportsOrder,default:()=>index_stories});__webpack_require__("./node_modules/react/index.js");var Decorator=__webpack_require__("./src/layout-primitives/decorator/Decorator.jsx"),Container=__webpack_require__("./src/layout-primitives/container/Container.jsx"),Frame=__webpack_require__("./src/layout-primitives/frame/Frame.jsx"),Layers=__webpack_require__("./src/layout-primitives/layers/Layers.jsx"),ResponsiveGrid=__webpack_require__("./src/layout-primitives/responsive-grid/ResponsiveGrid.jsx"),Gutters=__webpack_require__("./src/layout-primitives/gutters/Gutters.jsx"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const Feature2=({items=[],...props})=>(0,jsx_runtime.jsx)(Decorator.S,{backgroundColor:props.backgroundColor,color:props.color,children:(0,jsx_runtime.jsx)(Gutters.T,{children:(0,jsx_runtime.jsx)(Container.W,{children:0<items.length&&(0,jsx_runtime.jsx)(ResponsiveGrid.S,{columnMinWidth:props.columnMinWidth,gap:props.gap,children:items.map(((item,index)=>(0,jsx_runtime.jsxs)(Layers.S,{children:[(0,jsx_runtime.jsx)(Frame.R,{ratio:"3/4",children:!!item.src&&(0,jsx_runtime.jsx)("img",{src:item.src,alt:""})}),!!item.content&&(0,jsx_runtime.jsx)("div",{style:{"--unitone--font-size":-1,"--unitone--align-self":"end"},children:(0,jsx_runtime.jsx)(Decorator.S,{padding:1,children:(0,jsx_runtime.jsx)("p",{children:item.content})})})]},index)))})})})});Feature2.displayName="Feature2",Feature2.__docgenInfo={description:"",methods:[],displayName:"Feature2",props:{items:{defaultValue:{value:"[]",computed:!1},required:!1}}};const index_stories={title:"Patterns/Features/Features-2",component:Feature2,argTypes:{backgroundColor:{control:{type:"color"},table:{defaultValue:{summary:"transparent"}},type:{name:"string",required:!1}},columnMinWidth:{control:{type:"text"},description:"`--unitone--column-min-width`",table:{defaultValue:{summary:"250px"}},type:{name:"string",required:!1}},color:{control:{type:"color"},table:{defaultValue:{summary:"#fff"}},type:{name:"string",required:!1}},gap:{control:{type:"inline-radio"},options:[0,1,2,3,4],table:{defaultValue:{summary:0}},type:{name:"number",required:!1}}},args:{backgroundColor:"transparent",columnMinWidth:"250px",color:"#fff",gap:0},parameters:{layout:"fullscreen"}},Default=props=>(0,jsx_runtime.jsx)(Feature2,{backgroundColor:props.backgroundColor,columnMinWidth:props.columnMinWidth,color:props.color,gap:props.gap,items:[{title:"Lorem",src:"https://placehold.jp/600x800.jpg",content:"Lorem ipsum dolor sit amet, consectetur adipisicing elit"},{title:"ipsum",src:"https://placehold.jp/600x800.jpg",content:"sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"},{title:"dolor",src:"https://placehold.jp/600x800.jpg",content:"Ut enim ad minim veniam"}]});Default.displayName="Default",Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"props => <Feature2 backgroundColor={props.backgroundColor} columnMinWidth={props.columnMinWidth} color={props.color} gap={props.gap} items={[{\n  title: 'Lorem',\n  src: 'https://placehold.jp/600x800.jpg',\n  content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit'\n}, {\n  title: 'ipsum',\n  src: 'https://placehold.jp/600x800.jpg',\n  content: 'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'\n}, {\n  title: 'dolor',\n  src: 'https://placehold.jp/600x800.jpg',\n  content: 'Ut enim ad minim veniam'\n}]} />",...Default.parameters?.docs?.source}}};const __namedExportsOrder=["Default"];Default.__docgenInfo={description:"",methods:[],displayName:"Default"}},"./src/layout-primitives/container/Container.jsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{W:()=>Container});__webpack_require__("./node_modules/react/index.js");var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/jsx-runtime.js");const Container=({align,gutters,maxWidth,text,style,...props})=>(style={...style,"--unitone--max-width":maxWidth||void 0},(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div",{"data-unitone-layout":["container",void 0!==align?`-align:${align}`:void 0,void 0!==gutters?`-gutters:${gutters}`:void 0].filter(Boolean).join(" "),style,children:props.children}));Container.displayName="Container",Container.__docgenInfo={description:"",methods:[],displayName:"Container"}},"./src/layout-primitives/decorator/Decorator.jsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{S:()=>Decorator});__webpack_require__("./node_modules/react/index.js");var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/jsx-runtime.js");const Decorator=({backgroundColor,borderColor,borderRadius,borderWidth,color,padding,shadow,position,top,right,bottom,left,zIndex,overflow,style,...props})=>(style={...style,"--unitone--background-color":backgroundColor,"--unitone--border-color":borderColor,"--unitone--border-radius":borderRadius,"--unitone--border-width":borderWidth,"--unitone--color":color,"--unitone--top":void 0!==top?top:void 0,"--unitone--right":void 0!==right?right:void 0,"--unitone--bottom":void 0!==bottom?bottom:void 0,"--unitone--left":void 0!==left?left:void 0,"--unitone--z-index":void 0!==zIndex?zIndex:void 0},(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div",{"data-unitone-layout":["decorator",void 0!==padding?`-padding:${padding}`:void 0,shadow?"-shadow":void 0,position?`-position:${position}`:void 0,overflow?`-overflow:${overflow}`:void 0].filter(Boolean).join(" "),style,children:props.children}));Decorator.displayName="Decorator",Decorator.__docgenInfo={description:"",methods:[],displayName:"Decorator"}},"./src/layout-primitives/frame/Frame.jsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{R:()=>Frame});__webpack_require__("./node_modules/react/index.js");var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/jsx-runtime.js");const Frame=({ratio,switchRatio,style,...props})=>(style={...style,"--unitone--ratio":ratio||void 0},(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div",{"data-unitone-layout":["frame",!0===switchRatio?"-switch":void 0].filter(Boolean).join(" "),style,children:props.children}));Frame.displayName="Frame",Frame.__docgenInfo={description:"",methods:[],displayName:"Frame"}},"./src/layout-primitives/gutters/Gutters.jsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{T:()=>Gutters});__webpack_require__("./node_modules/react/index.js");var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/jsx-runtime.js");const Gutters=({padding,style,...props})=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div",{"data-unitone-layout":["gutters",void 0!==padding?`-padding:${padding}`:void 0].filter(Boolean).join(" "),style,children:props.children});Gutters.displayName="Gutters",Gutters.__docgenInfo={description:"",methods:[],displayName:"Gutters"}},"./src/layout-primitives/layers/Layers.jsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{S:()=>Layers});__webpack_require__("./node_modules/react/index.js");var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/jsx-runtime.js");const Layers=({cover,fill,portrait,style,...props})=>(style={...style},(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div",{"data-unitone-layout":["layers",!0===cover?"-cover":void 0,!0===fill?"-fill":void 0,!0===portrait?"-portrait":void 0].filter(Boolean).join(" "),style,children:props.children}));Layers.displayName="Layers",Layers.__docgenInfo={description:"",methods:[],displayName:"Layers"}},"./src/layout-primitives/responsive-grid/ResponsiveGrid.jsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{S:()=>ResponsiveGrid});__webpack_require__("./node_modules/react/index.js");var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/jsx-runtime.js");const ResponsiveGrid=({columnMinWidth,gap,autoRepeat,style,...props})=>(style={...style,"--unitone--column-min-width":columnMinWidth||void 0},(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div",{"data-unitone-layout":["responsive-grid",void 0!==gap?`-gap:${gap}`:void 0,void 0!==autoRepeat?`-auto-repeat:${autoRepeat}`:void 0].filter(Boolean).join(" "),style,children:props.children}));ResponsiveGrid.displayName="ResponsiveGrid",ResponsiveGrid.__docgenInfo={description:"",methods:[],displayName:"ResponsiveGrid"}}}]);