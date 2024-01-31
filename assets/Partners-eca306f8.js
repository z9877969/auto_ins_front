import{s as e,aT as y,T as u,a1 as b,aN as S,w as x,P as s,j as a,r as j,aS as f,a9 as c}from"./index-98452e44.js";import{R as w}from"./Rating-456c68cb.js";import{C as k}from"./Collapse-29e58838.js";import"./useActions-0f1e798e.js";import"./GeneralSelect-cf35ef26.js";import"./Portal-1255ff5c.js";import"./useSlotProps-3ac74678.js";const A=e("section")(({theme:i})=>({backgroundColor:i.palette.primary.background})),R=e(y)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`,B=e(u)(({theme:i})=>({"&.titleBlack":{color:i.palette.primary.main,marginBottom:"72px"}})),m=e(b)(({theme:i})=>({padding:"0",marginBottom:"48px",display:"flex",justifyContent:"center",gap:"20px",flexWrap:"wrap",[i.breakpoints.up("sm")]:{gap:"24px"},"&.additionalPartners":{marginBottom:"0"}})),C=e(S)(({theme:i})=>({boxSizing:"border-box",color:i.palette.primary.main,width:"163px",height:"151px",padding:"15px",margin:"0",border:`1px solid ${i.palette.primary.secondaryDark}`,borderRadius:"25px",display:"flex",justifyContent:"center",[i.breakpoints.up("sm")]:{width:"328px",height:"196px",padding:"23px",borderRadius:"50px"},[i.breakpoints.up("lg")]:{width:"272px",height:"220px",padding:"35px"}})),P=e(x)(({theme:i})=>({width:"100%",height:"62px",marginBottom:"8px",display:"flex",alignItems:"center",justifyContent:"center",[i.breakpoints.up("sm")]:{height:"76px",marginBottom:"16px"}})),T=e(x)(({theme:i})=>({width:"100%",display:"flex",flexDirection:"column",alignItems:"center",gap:"4px",[i.breakpoints.up("sm")]:{gap:"8px"}})),L=e(u)(({theme:i})=>({"&.ratingText":{margin:"0",fontSize:"14px",fontFamily:"Open Sans, sans-serif",fontWeight:600,color:i.palette.primary.main,lineHeight:"1.5",[i.breakpoints.up("sm")]:{fontSize:"16px"}}})),d=({partner:i})=>{const{id:o,imgSrc:r,imgAlt:l,rating:p}=i;return a.jsx(a.Fragment,{children:a.jsx(C,{id:o,children:a.jsxs("div",{children:[a.jsx(P,{children:a.jsx("img",{src:r,alt:l,id:o,style:{width:"100%",height:"100%",objectFit:"contain"}})}),a.jsxs(T,{children:[a.jsx(L,{className:"ratingText",children:"Рейтинг МТСБУ"}),a.jsx(w,{name:"read-only",value:p,precision:.1,readOnly:!0})]})]})})})};d.propTypes={partner:s.shape({id:s.number.isRequired,imgSrc:s.string.isRequired,imgAlt:s.string.isRequired,rating:s.number.isRequired}).isRequired};const n=[{id:85,imgSrc:"https://web.eua.in.ua/eua/api/binary/companyLogo?id=85",imgAlt:"credo logo",rating:4.1},{id:221,imgSrc:"https://web.eua.in.ua/eua/api/binary/companyLogo?id=221",imgAlt:"euroins logo",rating:4.5},{id:38,imgSrc:"https://web.eua.in.ua/eua/api/binary/companyLogo?id=38",imgAlt:"ingo logo",rating:4.9},{id:73,imgSrc:"https://web.eua.in.ua/eua/api/binary/companyLogo?id=73",imgAlt:"brokbusiness logo",rating:4.5},{id:10,imgSrc:"https://web.eua.in.ua/eua/api/binary/companyLogo?id=10",imgAlt:"arx logo",rating:5},{id:59,imgSrc:"https://web.eua.in.ua/eua/api/binary/companyLogo?id=59",imgAlt:"uniqa logo",rating:5},{id:456,imgSrc:"https://web.eua.in.ua/eua/api/binary/companyLogo?id=456",imgAlt:"inter-polis logo",rating:4.8},{id:61,imgSrc:"https://web.eua.in.ua/eua/api/binary/companyLogo?id=61",imgAlt:"europeisky-strahovy-allianz logo",rating:4.6},{id:254,imgSrc:"https://web.eua.in.ua/eua/api/binary/companyLogo?id=254",imgAlt:"oberig logo",rating:4.7}],O=()=>{const i=n==null?void 0:n.length,o=8,[r,l]=j.useState(!1),p=()=>{l(!r)},g=n==null?void 0:n.slice(0,o),h=n==null?void 0:n.slice(o);return a.jsx(A,{children:a.jsx(f,{children:a.jsxs(R,{disableGutters:!0,id:"партнери",children:[a.jsx(B,{variant:"h2",className:"titleBlack",children:"Партнери"}),a.jsxs(m,{children:[g==null?void 0:g.map(t=>a.jsx(d,{partner:t},t==null?void 0:t.imgSrc)),a.jsx(k,{in:r,timeout:500,children:a.jsx(m,{className:"additionalPartners",children:h.map(t=>a.jsx(d,{partner:t},t==null?void 0:t.imgSrc))})})]}),i>o?a.jsx(c,{type:"button",onClick:p,children:r?"Згорнути":"Всі партнери"}):a.jsx(c,{type:"button",className:"Mui-disabled",children:"Всі партнери"})]})})})};export{O as default};
