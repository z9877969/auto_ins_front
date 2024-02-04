import{r as c,g as j,a as M,s as l,_ as d,u as k,e as N,ah as V,j as r,f as S,h as q,B as E,b8 as W,T as $,x as U,S as _}from"./index-55700721.js";import"./Stack-e395a7d8.js";import{P as F}from"./Modal-110b0ffe.js";import{C as L}from"./Collapse-1e6d9fe8.js";import"./Portal-214960b8.js";import"./useSlotProps-1d4a118d.js";const H=c.createContext({}),B=H;function O(o){return M("MuiAccordion",o)}const z=j("MuiAccordion",["root","rounded","expanded","disabled","gutters","region"]),h=z,J=["children","className","defaultExpanded","disabled","disableGutters","expanded","onChange","square","TransitionComponent","TransitionProps"],K=o=>{const{classes:s,square:e,expanded:n,disabled:a,disableGutters:t}=o;return q({root:["root",!e&&"rounded",n&&"expanded",a&&"disabled",!t&&"gutters"],region:["region"]},O,s)},Q=l(F,{name:"MuiAccordion",slot:"Root",overridesResolver:(o,s)=>{const{ownerState:e}=o;return[{[`& .${h.region}`]:s.region},s.root,!e.square&&s.rounded,!e.disableGutters&&s.gutters]}})(({theme:o})=>{const s={duration:o.transitions.duration.shortest};return{position:"relative",transition:o.transitions.create(["margin"],s),overflowAnchor:"none","&:before":{position:"absolute",left:0,top:-1,right:0,height:1,content:'""',opacity:1,backgroundColor:(o.vars||o).palette.divider,transition:o.transitions.create(["opacity","background-color"],s)},"&:first-of-type":{"&:before":{display:"none"}},[`&.${h.expanded}`]:{"&:before":{opacity:0},"&:first-of-type":{marginTop:0},"&:last-of-type":{marginBottom:0},"& + &":{"&:before":{display:"none"}}},[`&.${h.disabled}`]:{backgroundColor:(o.vars||o).palette.action.disabledBackground}}},({theme:o,ownerState:s})=>d({},!s.square&&{borderRadius:0,"&:first-of-type":{borderTopLeftRadius:(o.vars||o).shape.borderRadius,borderTopRightRadius:(o.vars||o).shape.borderRadius},"&:last-of-type":{borderBottomLeftRadius:(o.vars||o).shape.borderRadius,borderBottomRightRadius:(o.vars||o).shape.borderRadius,"@supports (-ms-ime-align: auto)":{borderBottomLeftRadius:0,borderBottomRightRadius:0}}},!s.disableGutters&&{[`&.${h.expanded}`]:{margin:"16px 0"}})),X=c.forwardRef(function(s,e){const n=k({props:s,name:"MuiAccordion"}),{children:a,className:t,defaultExpanded:p=!1,disabled:u=!1,disableGutters:x=!1,expanded:v,onChange:b,square:y=!1,TransitionComponent:A=L,TransitionProps:C}=n,R=N(n,J),[i,m]=V({controlled:v,default:p,name:"Accordion",state:"expanded"}),g=c.useCallback(P=>{m(!i),b&&b(P,!i)},[i,b,m]),[w,...I]=c.Children.toArray(a),T=c.useMemo(()=>({expanded:i,disabled:u,disableGutters:x,toggle:g}),[i,u,x,g]),G=d({},n,{square:y,disabled:u,disableGutters:x,expanded:i}),D=K(G);return r.jsxs(Q,d({className:S(D.root,t),ref:e,ownerState:G,square:y},R,{children:[r.jsx(B.Provider,{value:T,children:w}),r.jsx(A,d({in:i,timeout:"auto"},C,{children:r.jsx("div",{"aria-labelledby":w.props.id,id:w.props["aria-controls"],role:"region",className:D.region,children:I})}))]}))}),Y=X;function Z(o){return M("MuiAccordionDetails",o)}j("MuiAccordionDetails",["root"]);const oo=["className"],so=o=>{const{classes:s}=o;return q({root:["root"]},Z,s)},eo=l("div",{name:"MuiAccordionDetails",slot:"Root",overridesResolver:(o,s)=>s.root})(({theme:o})=>({padding:o.spacing(1,2,2)})),no=c.forwardRef(function(s,e){const n=k({props:s,name:"MuiAccordionDetails"}),{className:a}=n,t=N(n,oo),p=n,u=so(p);return r.jsx(eo,d({className:S(u.root,a),ref:e,ownerState:p},t))}),ro=no;function to(o){return M("MuiAccordionSummary",o)}const ao=j("MuiAccordionSummary",["root","expanded","focusVisible","disabled","gutters","contentGutters","content","expandIconWrapper"]),f=ao,io=["children","className","expandIcon","focusVisibleClassName","onClick"],co=o=>{const{classes:s,expanded:e,disabled:n,disableGutters:a}=o;return q({root:["root",e&&"expanded",n&&"disabled",!a&&"gutters"],focusVisible:["focusVisible"],content:["content",e&&"expanded",!a&&"contentGutters"],expandIconWrapper:["expandIconWrapper",e&&"expanded"]},to,s)},lo=l(E,{name:"MuiAccordionSummary",slot:"Root",overridesResolver:(o,s)=>s.root})(({theme:o,ownerState:s})=>{const e={duration:o.transitions.duration.shortest};return d({display:"flex",minHeight:48,padding:o.spacing(0,2),transition:o.transitions.create(["min-height","background-color"],e),[`&.${f.focusVisible}`]:{backgroundColor:(o.vars||o).palette.action.focus},[`&.${f.disabled}`]:{opacity:(o.vars||o).palette.action.disabledOpacity},[`&:hover:not(.${f.disabled})`]:{cursor:"pointer"}},!s.disableGutters&&{[`&.${f.expanded}`]:{minHeight:64}})}),po=l("div",{name:"MuiAccordionSummary",slot:"Content",overridesResolver:(o,s)=>s.content})(({theme:o,ownerState:s})=>d({display:"flex",flexGrow:1,margin:"12px 0"},!s.disableGutters&&{transition:o.transitions.create(["margin"],{duration:o.transitions.duration.shortest}),[`&.${f.expanded}`]:{margin:"20px 0"}})),uo=l("div",{name:"MuiAccordionSummary",slot:"ExpandIconWrapper",overridesResolver:(o,s)=>s.expandIconWrapper})(({theme:o})=>({display:"flex",color:(o.vars||o).palette.action.active,transform:"rotate(0deg)",transition:o.transitions.create("transform",{duration:o.transitions.duration.shortest}),[`&.${f.expanded}`]:{transform:"rotate(180deg)"}})),mo=c.forwardRef(function(s,e){const n=k({props:s,name:"MuiAccordionSummary"}),{children:a,className:t,expandIcon:p,focusVisibleClassName:u,onClick:x}=n,v=N(n,io),{disabled:b=!1,disableGutters:y,expanded:A,toggle:C}=c.useContext(B),R=g=>{C&&C(g),x&&x(g)},i=d({},n,{expanded:A,disabled:b,disableGutters:y}),m=co(i);return r.jsxs(lo,d({focusRipple:!1,disableRipple:!0,disabled:b,component:"div","aria-expanded":A,className:S(m.root,t),focusVisibleClassName:S(m.focusVisible,u),onClick:R,ref:e,ownerState:i},v,{children:[r.jsx(po,{className:m.content,ownerState:i,children:a}),p&&r.jsx(uo,{className:m.expandIconWrapper,ownerState:i,children:p})]}))}),xo=mo,bo=l(Y)(({theme:o})=>({"&.MuiAccordion-root":{borderBottom:`1px solid ${o.palette.primary.white}`,borderRadius:"0"},backgroundColor:o.palette.primary.main})),fo=l(xo)(({theme:o})=>({"& .MuiAccordionSummary-content":{[o.breakpoints.up("xs")]:{margin:"16px 0"},[o.breakpoints.up("sm")]:{margin:"24px 0"}},"& .MuiAccordionSummary-content.Mui-expanded":{[o.breakpoints.up("xs")]:{margin:"16px 0"},[o.breakpoints.up("sm")]:{margin:"24px 0"}},"&.MuiAccordionSummary-root":{padding:0},"& .subtitle":{[o.breakpoints.up("sm")]:{fontFamily:"Open Sans",fontSize:"18px",lineHeight:"1.5",fontWeight:"bold"}}})),go=l(ro)(({theme:o})=>({"&.MuiAccordionDetails-root":{padding:"0 0 16px 0",[o.breakpoints.up("sm")]:{padding:"0 0 24px 0"}}})),yo=l(W)(({theme:o})=>({backgroundColor:o.palette.primary.main,[o.breakpoints.up("lg")]:{padding:"120px 317px"}})),Ao=[{question:"Як я можу оформити автоцивілку через вашу платформу?",answer:"Ви можете легко оформити автоцивілку, заповнивши просту форму на нашому сайті. Після введення всіх необхідних даних система автоматично згенерує найкращі пропозиції для вас."},{question:"Чи безпечно надавати свої особисті дані на вашому сайті?",answer:"Так, ми гарантуємо високий рівень захисту ваших особистих даних. Вся інформація передається через захищені з´єднання, і ми не передаємо ваші дані третім особам."},{question:"Як я можу зекономити на оформленні автоцивілки через вашу платформу?",answer:"Ми пропонуємо вам прямий доступ до найкращих страхових пропозицій без посередницьких витрат, що дозволяє зекономити ваші гроші."},{question:"Чи є підтримка, якщо у мене виникнуть питання або проблеми під час оформлення?",answer:"Звісно! Наша команда підтримки доступна 24/7 і завжди готова допомогти вам з будь-якими питаннями або проблемами."},{question:"Чи отримаю я нагадування про терміни оплати та продовження автоцивілки?",answer:"Так, наші спеціалісти будуть надсилати вам сповіщення щодо термінів оплати та продовження автоцивілки, щоб ви завжди були в курсі."},{question:"Які документи мені потрібні для оформлення автоцивілки через ваш сайт?",answer:"Вам потрібно мати при собі наступні документи: паспорт/ID-карта, посвідчення водія та реєстраційний документ на транспортний засіб. За наявності - пільгове посвідчення на вибір."},{question:"Чи можу я оформити автоцивілку для іншої особи?",answer:"Так, ви можете оформити автоцивілку для іншої особи, але вам потрібно мати всі необхідні документи та інформацію про цю особу та її транспортний засіб."},{question:"Чи є у вас мобільний застосунок?",answer:"Наразі ми працюємо над створенням мобільного застосунку та сподіваємось запустити його найближчим часом. Тим часом ви можете використовувати нашу веб-платформу з будь-якого пристрою з доступом до інтернету."}],Co=()=>{const[o,s]=c.useState(!1),e=n=>(a,t)=>{s(t?n:!1)};return r.jsx("section",{children:r.jsxs(yo,{id:"питання-відповіді",children:[r.jsx($,{variant:"h2",className:"main-title",children:"Питання - Відповіді"}),Ao.map(({question:n,answer:a},t)=>r.jsxs(bo,{expanded:o===t,onChange:e(t),TransitionProps:{unmountOnExit:!0},children:[r.jsx(fo,{"aria-controls":t+"-content",id:t+"-header",expandIcon:r.jsx(U,{sx:{stroke:"#FFFF",width:"32px",height:"32px"},children:r.jsx(_,{name:"icon-chevron-down"})}),children:r.jsx($,{variant:"subtitle1",component:"h3",className:"subtitle",children:n})}),r.jsx(go,{children:r.jsx($,{variant:"body1",children:a})})]},t))]})})},jo=Co;export{jo as default};
