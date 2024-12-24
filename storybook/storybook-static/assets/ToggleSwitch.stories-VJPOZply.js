import{j as t}from"./jsx-runtime-WdPq8kIh.js";import{r as f}from"./index-BpYrhlGc.js";const d=({checked:e=!1,onClick:o,disabled:a=!1,onLabel:i="On",offLabel:n="Off",children:r})=>{const C=()=>{!a&&o&&o(!e)},O={display:"flex",alignItems:"center",gap:"10px"},S={position:"relative",display:"inline-flex",width:"60px",height:"30px",borderRadius:"15px",backgroundColor:a?"#e5e7eb":e?"blue":"gray",cursor:a?"not-allowed":"pointer",border:"none",padding:0},T={position:"absolute",top:"3px",left:e?"33px":"3px",width:"24px",height:"24px",borderRadius:"50%",backgroundColor:"white"},v={fontSize:"14px",fontWeight:"500",color:a?"#9ca3af":"#000"};return t.jsxs("div",{style:O,children:[t.jsx("span",{style:v,children:e?i:n}),t.jsx("button",{onClick:C,disabled:a,style:S,children:t.jsx("span",{style:T})}),r]})};d.__docgenInfo={description:"",methods:[],displayName:"ToggleSwitch",props:{checked:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},onClick:{required:!1,tsType:{name:"signature",type:"function",raw:"(checked: boolean) => void",signature:{arguments:[{type:{name:"boolean"},name:"checked"}],return:{name:"void"}}},description:""},disabled:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},onLabel:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'"On"',computed:!1}},offLabel:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'"Off"',computed:!1}}},composes:["PropsWithChildren"]};const q={title:"Components/ToggleSwitch",component:d,tags:["autodocs"],parameters:{layout:"centered"},argTypes:{checked:{control:"boolean",description:"Toggle state"},disabled:{control:"boolean",description:"Disabled state"},onClick:{action:"clicked",description:"Triggered when toggle is clicked"},onLabel:{control:"text",description:"Label for On state"},offLabel:{control:"text",description:"Label for Off state"}}},L=e=>{const[o,a]=f.useState(e.checked||!1);f.useEffect(()=>{a(e.checked||!1)},[e.checked]);const i=n=>{var r;a(n),(r=e.onClick)==null||r.call(e,n)};return t.jsx(d,{...e,checked:o,onClick:i})},s={render:e=>t.jsx(L,{...e}),args:{checked:!1,disabled:!1,onLabel:"On",offLabel:"Off"}},l={render:e=>t.jsx(L,{...e}),args:{checked:!0,disabled:!1,onLabel:"On",offLabel:"Off"}},c={args:{...s.args,onLabel:"Active",offLabel:"Inactive"}};var p,u,g;s.parameters={...s.parameters,docs:{...(p=s.parameters)==null?void 0:p.docs,source:{originalSource:`{
  render: args => <ToggleSwitchWrapper {...args} />,
  args: {
    checked: false,
    disabled: false,
    onLabel: 'On',
    offLabel: 'Off'
  }
}`,...(g=(u=s.parameters)==null?void 0:u.docs)==null?void 0:g.source}}};var m,b,h;l.parameters={...l.parameters,docs:{...(m=l.parameters)==null?void 0:m.docs,source:{originalSource:`{
  render: args => <ToggleSwitchWrapper {...args} />,
  args: {
    checked: true,
    disabled: false,
    onLabel: 'On',
    offLabel: 'Off'
  }
}`,...(h=(b=l.parameters)==null?void 0:b.docs)==null?void 0:h.source}}};var x,k,y;c.parameters={...c.parameters,docs:{...(x=c.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    onLabel: 'Active',
    offLabel: 'Inactive'
  }
}`,...(y=(k=c.parameters)==null?void 0:k.docs)==null?void 0:y.source}}};const I=["Default","Checked","CustomLabels"];export{l as Checked,c as CustomLabels,s as Default,I as __namedExportsOrder,q as default};
