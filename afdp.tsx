import React, { useState, useMemo } from "react";

const DARK={bg:"#13111e",bgCard:"#1c1a2e",bgInput:"#0f0d1a",border:"#2e2a4a",borderPurple:"#5b3fd4",purple:"#7c4dff",purpleLight:"#9b72ff",purpleDim:"#3d2a7a",text:"#ffffff",textSub:"#9b96b8",textDim:"#5c5880",green:"#22c55e",red:"#ef4444",gold:"#f59e0b",cyan:"#06b6d4"};
const LIGHT={bg:"#f0f2ff",bgCard:"#ffffff",bgInput:"#eef0ff",border:"#d4d8f5",borderPurple:"#7c4dff",purple:"#6d28d9",purpleLight:"#7c3aed",purpleDim:"#ede9fe",text:"#1a1d3a",textSub:"#4a5080",textDim:"#9ba3c9",green:"#059669",red:"#dc2626",gold:"#b45309",cyan:"#0891b2"};
const POS_COLORS={QB:"#818cf8",RB:"#34d399",WR:"#c084fc",TE:"#f59e0b",K:"#a78bfa",DST:"#94a3b8",DL:"#f87171",LB:"#fb923c",DB:"#22d3ee",PICK:"#f1c40f"};
const SCORING_FORMATS=["Dynasty","Superflex","PPR","Half","Std"];
const ALL_POSITIONS=["ALL","QB","RB","WR","TE","K","DST","DL","LB","DB"];
const PRIME={QB:[26,35],RB:[22,27],WR:[23,29],TE:[25,30],K:[25,38],DST:[0,99],DL:[23,30],LB:[23,30],DB:[23,29]};
const FREE_RANK_LIMIT=20;
const FREE_TRADE_LIMIT=20;
const ADMIN_EMAILS=["jacklawrence713@gmail.com"];
function isAdminEmail(e){return ADMIN_EMAILS.indexOf((e||"").toLowerCase().trim())!==-1;}

const SLEEPER_IDS={"Lamar Jackson":"4881","Josh Allen":"4984","Jalen Hurts":"6770","Patrick Mahomes":"4358","Jayden Daniels":"10229","Joe Burrow":"6904","C.J. Stroud":"10208","Caleb Williams":"10854","Baker Mayfield":"4381","Bo Nix":"10855","Drake Maye":"11565","Anthony Richardson":"10215","Jordan Love":"5892","Kyler Murray":"4663","Justin Fields":"7547","Sam Darnold":"4017","Saquon Barkley":"1466","Bijan Robinson":"10216","Jahmyr Gibbs":"10233","De'Von Achane":"10234","Breece Hall":"7564","Christian McCaffrey":"4034","Kyren Williams":"8155","Derrick Henry":"1689","Jonathan Taylor":"7528","Josh Jacobs":"5012","Ashton Jeanty":"11568","Omarion Hampton":"11569","Ja'Marr Chase":"7564","Justin Jefferson":"6794","CeeDee Lamb":"6786","Amon-Ra St. Brown":"7561","Puka Nacua":"10228","A.J. Brown":"5844","Brandon Aiyuk":"7571","Tee Higgins":"6813","Drake London":"8119","Garrett Wilson":"8122","Tyreek Hill":"3321","DK Metcalf":"5844","Rashee Rice":"10225","Marvin Harrison Jr.":"10856","Tetairoa McMillan":"11575","Travis Hunter":"11576","Rome Odunze":"11562","Brock Bowers":"10857","Trey McBride":"8145","Sam LaPorta":"10230","Mark Andrews":"4892","Travis Kelce":"1234","Tyler Warren":"11583","Myles Garrett":"3321","Micah Parsons":"7552","Aidan Hutchinson":"8112","Kyle Hamilton":"8113","Derwin James":"4663","Sauce Gardner":"8114","Roquan Smith":"6130","Fred Warner":"5849"};
function headshot(n){var id=SLEEPER_IDS[n];return id?"https://sleepercdn.com/content/nfl/players/thumb/"+id+".jpg":null;}

const PLAYERS=[
  {name:"Lamar Jackson",pos:"QB",age:29,team:"BAL",proj:{PPR:438,Half:438,Std:438},adp:1.2,note:"4,200 yds 42 TD 900 rush"},
  {name:"Josh Allen",pos:"QB",age:30,team:"BUF",proj:{PPR:428,Half:428,Std:428},adp:1.7,note:"4,400 yds 42 TD"},
  {name:"Jalen Hurts",pos:"QB",age:28,team:"PHI",proj:{PPR:412,Half:412,Std:412},adp:2.1,note:"4,000 yds 34 TD 800 rush"},
  {name:"Patrick Mahomes",pos:"QB",age:31,team:"KC",proj:{PPR:405,Half:405,Std:405},adp:2.5,note:"4,300 yds 37 TD"},
  {name:"Jayden Daniels",pos:"QB",age:26,team:"WAS",proj:{PPR:390,Half:390,Std:390},adp:3.4,note:"Year 2: 3,900 yds 30 TD"},
  {name:"Joe Burrow",pos:"QB",age:30,team:"CIN",proj:{PPR:382,Half:382,Std:382},adp:4.2,note:"4,700 yds 37 TD"},
  {name:"C.J. Stroud",pos:"QB",age:25,team:"HOU",proj:{PPR:368,Half:368,Std:368},adp:5.5,note:"4,200 yds 32 TD"},
  {name:"Caleb Williams",pos:"QB",age:24,team:"CHI",proj:{PPR:358,Half:358,Std:358},adp:6.8,note:"Year 2: 3,900 yds 28 TD"},
  {name:"Baker Mayfield",pos:"QB",age:31,team:"TB",proj:{PPR:330,Half:330,Std:330},adp:12.1,note:"3,700 yds 28 TD"},
  {name:"Bo Nix",pos:"QB",age:26,team:"DEN",proj:{PPR:345,Half:345,Std:345},adp:8.2,note:"3,900 yds 30 TD"},
  {name:"Drake Maye",pos:"QB",age:24,team:"NE",proj:{PPR:338,Half:338,Std:338},adp:9.1,note:"Year 2: 3,600 yds 26 TD"},
  {name:"Anthony Richardson",pos:"QB",age:24,team:"IND",proj:{PPR:332,Half:332,Std:332},adp:9.8,note:"3,400 yds 25 TD"},
  {name:"Jordan Love",pos:"QB",age:28,team:"GB",proj:{PPR:340,Half:340,Std:340},adp:10.1,note:"3,900 yds 29 TD"},
  {name:"Kyler Murray",pos:"QB",age:28,team:"ARI",proj:{PPR:332,Half:332,Std:332},adp:11.8,note:"3,700 yds 26 TD"},
  {name:"Justin Fields",pos:"QB",age:27,team:"PIT",proj:{PPR:325,Half:325,Std:325},adp:12.5,note:"3,400 yds 22 TD 650 rush"},
  {name:"Cam Ward",pos:"QB",age:23,team:"TEN",proj:{PPR:312,Half:312,Std:312},adp:14.8,note:"Year 2: 3,500 yds 26 TD"},
  {name:"Shedeur Sanders",pos:"QB",age:23,team:"CLE",proj:{PPR:305,Half:305,Std:305},adp:15.2,note:"Year 2: 3,200 yds 22 TD"},
  {name:"Saquon Barkley",pos:"RB",age:29,team:"PHI",proj:{PPR:335,Half:310,Std:285},adp:1.3,note:"1,850 rush 14 TD"},
  {name:"Bijan Robinson",pos:"RB",age:24,team:"ATL",proj:{PPR:325,Half:300,Std:275},adp:2.1,note:"1,750 rush 13 TD 70 rec"},
  {name:"Jahmyr Gibbs",pos:"RB",age:24,team:"DET",proj:{PPR:318,Half:293,Std:268},adp:2.6,note:"1,500 rush 12 TD 68 rec"},
  {name:"De'Von Achane",pos:"RB",age:25,team:"MIA",proj:{PPR:305,Half:281,Std:257},adp:3.5,note:"1,300 rush 72 rec"},
  {name:"Breece Hall",pos:"RB",age:25,team:"NYJ",proj:{PPR:292,Half:269,Std:246},adp:4.8,note:"1,450 rush 58 rec"},
  {name:"Christian McCaffrey",pos:"RB",age:30,team:"SF",proj:{PPR:285,Half:263,Std:241},adp:5.9,note:"1,200 rush 70 rec"},
  {name:"Kyren Williams",pos:"RB",age:26,team:"LAR",proj:{PPR:278,Half:256,Std:234},adp:6.5,note:"1,500 rush 13 TD"},
  {name:"Derrick Henry",pos:"RB",age:32,team:"BAL",proj:{PPR:268,Half:251,Std:234},adp:7.4,note:"1,700 rush 13 TD"},
  {name:"Jonathan Taylor",pos:"RB",age:27,team:"IND",proj:{PPR:268,Half:246,Std:224},adp:8.1,note:"1,300 rush 10 TD"},
  {name:"Ashton Jeanty",pos:"RB",age:22,team:"LV",proj:{PPR:295,Half:272,Std:249},adp:5.2,note:"Year 2: 1,400 rush 11 TD"},
  {name:"Omarion Hampton",pos:"RB",age:22,team:"LAC",proj:{PPR:272,Half:250,Std:228},adp:7.1,note:"1,250 rush 9 TD"},
  {name:"Josh Jacobs",pos:"RB",age:28,team:"GB",proj:{PPR:255,Half:235,Std:215},adp:9.5,note:"1,250 rush 9 TD"},
  {name:"D'Andre Swift",pos:"RB",age:26,team:"CHI",proj:{PPR:228,Half:209,Std:190},adp:14.2,note:"700 rush 60 rec"},
  {name:"Ja'Marr Chase",pos:"WR",age:26,team:"CIN",proj:{PPR:352,Half:326,Std:300},adp:1.5,note:"130 rec 1,750 yds 17 TD"},
  {name:"Justin Jefferson",pos:"WR",age:27,team:"MIN",proj:{PPR:338,Half:313,Std:288},adp:2.0,note:"132 rec 1,580 yds 11 TD"},
  {name:"CeeDee Lamb",pos:"WR",age:27,team:"DAL",proj:{PPR:325,Half:301,Std:277},adp:2.8,note:"122 rec 1,520 yds 12 TD"},
  {name:"Amon-Ra St. Brown",pos:"WR",age:26,team:"DET",proj:{PPR:315,Half:291,Std:267},adp:3.8,note:"125 rec 1,320 yds 11 TD"},
  {name:"Puka Nacua",pos:"WR",age:24,team:"LAR",proj:{PPR:308,Half:285,Std:262},adp:4.5,note:"115 rec 1,350 yds 9 TD"},
  {name:"A.J. Brown",pos:"WR",age:29,team:"PHI",proj:{PPR:298,Half:276,Std:254},adp:5.4,note:"108 rec 1,420 yds 13 TD"},
  {name:"Brandon Aiyuk",pos:"WR",age:28,team:"SF",proj:{PPR:290,Half:268,Std:246},adp:6.2,note:"100 rec 1,380 yds 12 TD"},
  {name:"Tee Higgins",pos:"WR",age:27,team:"CIN",proj:{PPR:285,Half:263,Std:241},adp:6.9,note:"95 rec 1,200 yds 11 TD"},
  {name:"Drake London",pos:"WR",age:25,team:"ATL",proj:{PPR:278,Half:257,Std:236},adp:7.8,note:"108 rec 1,150 yds 10 TD"},
  {name:"Garrett Wilson",pos:"WR",age:25,team:"NYJ",proj:{PPR:268,Half:248,Std:228},adp:9.8,note:"96 rec 1,080 yds"},
  {name:"Tyreek Hill",pos:"WR",age:33,team:"MIA",proj:{PPR:268,Half:248,Std:228},adp:9.1,note:"105 rec 1,200 yds 8 TD"},
  {name:"DK Metcalf",pos:"WR",age:28,team:"SEA",proj:{PPR:262,Half:243,Std:224},adp:10.8,note:"88 rec 1,100 yds 9 TD"},
  {name:"Rashee Rice",pos:"WR",age:25,team:"KC",proj:{PPR:258,Half:239,Std:220},adp:10.5,note:"90 rec 1,020 yds"},
  {name:"Marvin Harrison Jr.",pos:"WR",age:23,team:"ARI",proj:{PPR:272,Half:252,Std:232},adp:8.8,note:"Year 2: 92 rec 1,100 yds"},
  {name:"Tetairoa McMillan",pos:"WR",age:22,team:"CAR",proj:{PPR:272,Half:252,Std:232},adp:8.5,note:"Year 2: 88 rec 1,050 yds"},
  {name:"Travis Hunter",pos:"WR",age:22,team:"JAX",proj:{PPR:265,Half:245,Std:225},adp:9.4,note:"82 rec 980 yds two-way"},
  {name:"Rome Odunze",pos:"WR",age:23,team:"CHI",proj:{PPR:248,Half:229,Std:210},adp:12.1,note:"Year 2: 90 rec 1,000 yds"},
  {name:"Brock Bowers",pos:"TE",age:24,team:"LV",proj:{PPR:238,Half:219,Std:200},adp:3.2,note:"115 rec 1,250 yds"},
  {name:"Trey McBride",pos:"TE",age:26,team:"ARI",proj:{PPR:228,Half:210,Std:192},adp:4.5,note:"108 rec 1,150 yds"},
  {name:"Sam LaPorta",pos:"TE",age:25,team:"DET",proj:{PPR:218,Half:200,Std:182},adp:5.8,note:"95 rec 1,000 yds 9 TD"},
  {name:"Mark Andrews",pos:"TE",age:31,team:"BAL",proj:{PPR:210,Half:193,Std:176},adp:7.1,note:"82 rec 910 yds 9 TD"},
  {name:"Travis Kelce",pos:"TE",age:37,team:"KC",proj:{PPR:195,Half:179,Std:163},adp:8.5,note:"88 rec 940 yds declining"},
  {name:"Tyler Warren",pos:"TE",age:24,team:"IND",proj:{PPR:205,Half:188,Std:171},adp:10.5,note:"Year 2: 78 rec 860 yds"},
  {name:"Brandon Aubrey",pos:"K",age:31,team:"DAL",proj:{PPR:175,Half:175,Std:175},adp:13.1,note:"39/42 FG 93%"},
  {name:"Harrison Butker",pos:"K",age:31,team:"KC",proj:{PPR:170,Half:170,Std:170},adp:13.7,note:"38/41 FG"},
  {name:"Philadelphia Eagles",pos:"DST",age:0,team:"PHI",proj:{PPR:155,Half:155,Std:155},adp:11.2,note:"Defending champs"},
  {name:"Baltimore Ravens",pos:"DST",age:0,team:"BAL",proj:{PPR:150,Half:150,Std:150},adp:11.9,note:"Top-3 D"},
  {name:"Cleveland Browns",pos:"DST",age:0,team:"CLE",proj:{PPR:145,Half:145,Std:145},adp:12.5,note:"Myles Garrett anchors"},
  {name:"Myles Garrett",pos:"DL",age:30,team:"CLE",proj:{PPR:148,Half:148,Std:148},adp:7.8,note:"15 sacks 22 TFL"},
  {name:"Micah Parsons",pos:"DL",age:27,team:"DAL",proj:{PPR:145,Half:145,Std:145},adp:8.1,note:"14 sacks 21 TFL"},
  {name:"Aidan Hutchinson",pos:"DL",age:26,team:"DET",proj:{PPR:142,Half:142,Std:142},adp:8.5,note:"14 sacks 18 TFL"},
  {name:"Will Anderson Jr.",pos:"DL",age:24,team:"HOU",proj:{PPR:135,Half:135,Std:135},adp:9.9,note:"13 sacks 16 TFL"},
  {name:"Roquan Smith",pos:"LB",age:29,team:"BAL",proj:{PPR:152,Half:152,Std:152},adp:7.5,note:"155 tackles 5 sacks 3 INT"},
  {name:"Fred Warner",pos:"LB",age:29,team:"SF",proj:{PPR:148,Half:148,Std:148},adp:7.9,note:"145 tackles 3 sacks"},
  {name:"Zaire Franklin",pos:"LB",age:29,team:"IND",proj:{PPR:144,Half:144,Std:144},adp:8.5,note:"170 tackles"},
  {name:"Kyle Hamilton",pos:"DB",age:26,team:"BAL",proj:{PPR:142,Half:142,Std:142},adp:8.8,note:"108 tackles 5 INT 3 sacks"},
  {name:"Derwin James",pos:"DB",age:30,team:"LAC",proj:{PPR:136,Half:136,Std:136},adp:9.5,note:"110 tackles 3 INT"},
  {name:"Sauce Gardner",pos:"DB",age:25,team:"NYJ",proj:{PPR:125,Half:125,Std:125},adp:11.2,note:"70 tackles 4 INT"},
];

const DRAFT_PICKS=[
  {id:"p1",name:"2026 1st Early 1-4",round:1,est:55,note:"Dynasty gold"},
  {id:"p2",name:"2026 1st Mid 5-8",round:1,est:38,note:"Strong 1st"},
  {id:"p3",name:"2026 1st Late 9-12",round:1,est:26,note:"Late 1st"},
  {id:"p4",name:"2026 2nd Early",round:2,est:15,note:"Top 2nd"},
  {id:"p5",name:"2026 2nd Mid/Late",round:2,est:9,note:"Mid 2nd"},
  {id:"p6",name:"2026 3rd Round",round:3,est:4,note:"Depth"},
  {id:"p7",name:"2027 1st Unprotected",round:1,est:30,note:"Future 1st"},
  {id:"p8",name:"2027 2nd Round",round:2,est:10,note:"Future 2nd"},
];

const UNQ=PLAYERS.filter(function(p,i,a){return a.findIndex(function(x){return x.name===p.name;})===i;});

function dynastyBonus(pos,age){
  if(pos==="DST"||pos==="K"||pos==="PICK") return 1;
  var lo=PRIME[pos]?PRIME[pos][0]:25;
  if(age<lo) return 1+(lo-age)*0.045;
  if(age>lo+6) return Math.max(0.45,1-(age-lo-6)*0.065);
  return 1;
}
function getBaselines(teams,sf){return {QB:sf?teams*2:teams,RB:teams*2,WR:teams*2,TE:teams,K:teams,DST:teams,DL:teams,LB:teams,DB:teams};}
function ageGrade(pos,age){
  if(pos==="DST"||pos==="PICK") return {g:"N/A",c:"#5c5880"};
  var lo=PRIME[pos]?PRIME[pos][0]:25,hi=PRIME[pos]?PRIME[pos][1]:30,d=Math.abs(age-(lo+hi)/2);
  if(d<=1.5) return {g:"A+",c:"#10b981"};
  if(d<=3) return {g:"A",c:"#34d399"};
  if(age<lo) return {g:"B",c:"#f1c40f"};
  if(age>hi+5) return {g:"D",c:"#ef4444"};
  return {g:"C",c:"#f97316"};
}
function tierLabel(pr,pos){
  var ct={QB:[1,3,6,12],RB:[1,4,8,16],WR:[1,4,8,16],TE:[1,2,4,8],K:[1,3,5,8],DST:[1,2,4,6],DL:[1,3,6,10],LB:[1,3,6,10],DB:[1,3,6,10],PICK:[1,2,4,6]};
  var t=ct[pos]||[1,4,8,16];
  if(pr<=t[0]) return {t:1,c:"#f1c40f"};
  if(pr<=t[1]) return {t:2,c:"#818cf8"};
  if(pr<=t[2]) return {t:3,c:"#10b981"};
  if(pr<=t[3]) return {t:4,c:"#a78bfa"};
  return {t:5,c:"#4b5563"};
}
function scarcityLabel(pr,bl){
  var r=pr/bl;
  if(r<=0.25) return {l:"Elite",c:"#f1c40f"};
  if(r<=0.5) return {l:"Scarce",c:"#f87171"};
  if(r<=0.75) return {l:"Available",c:"#10b981"};
  return {l:"Deep",c:"#4b5563"};
}
function makePick(pk){return Object.assign({},pk,{pos:"PICK",age:0,pts:pk.est,vbd:pk.est,tradeVal:pk.est,ag:{g:"N/A",c:"#5c5880"},tier:tierLabel(pk.round,"PICK"),scarcity:{l:"—",c:"#5c5880"},auction:pk.est,ffabVal:pk.est,rank:999,team:"—"});}

function Avatar(props){
  var hs=headshot(props.name),pc=POS_COLORS[props.pos]||"#888";
  var [err,setErr]=useState(false);
  if(hs&&!err) return React.createElement("img",{src:hs,alt:props.name,style:{width:props.size,height:props.size,borderRadius:"50%",objectFit:"cover",border:"1.5px solid "+pc+"55",background:"#1c1a2e",flexShrink:0},onError:function(){setErr(true);}});
  return React.createElement("div",{style:{width:props.size,height:props.size,borderRadius:"50%",background:pc+"22",border:"1.5px solid "+pc+"44",display:"flex",alignItems:"center",justifyContent:"center",fontSize:props.size*0.3,fontWeight:800,color:pc,flexShrink:0}},props.name.split(" ").map(function(w){return w[0];}).join("").slice(0,2));
}
function PBadge(props){
  var pc=POS_COLORS[props.pos]||"#888";
  return React.createElement("span",{style:{background:pc+"18",color:pc,border:"1px solid "+pc+"33",borderRadius:5,padding:"2px 7px",fontWeight:700,fontSize:9,flexShrink:0}},props.pos+(props.rank||""));
}
function Chip(props){
  return React.createElement("button",{onClick:props.onClick,style:{padding:"6px 14px",borderRadius:8,border:"1px solid "+(props.active?(props.color||"#7c4dff"):"#2e2a4a"),background:props.active?(props.color||"#7c4dff"):"transparent",color:props.active?"#fff":"#9b96b8",fontWeight:700,fontSize:12,cursor:"pointer"}},props.label);
}

var PLANS=[{id:"free",label:"Free",priceStr:"$0",sub:"forever"},{id:"pro",label:"Pro",priceStr:"$2.99",sub:"/mo"},{id:"elite",label:"Elite",priceStr:"$6.99",sub:"/mo"}];
var COMPARE_ROWS=[["Trade Analyzer",true,true,true],["FAAB + Draft Picks",true,true,true],["IDP Rankings",true,true,true],["Top 20 Rankings",true,true,true],["Full 200+ Rankings",false,true,true],["League Import",false,true,true],["AI Trade Suggestions",false,true,true],["Market Alerts",false,true,true],["Roster Grades",false,true,true],["Power Rankings",false,true,true],["API Access",false,false,true],["Priority Support",false,false,true],["CSV Export",false,false,true]];
var FAQS=[{q:"What makes Fantasy Draft Pros the best dynasty trade analyzer?",a:"We combine 9,000+ player values updated daily across all positions including IDP, with FAAB budget tracking, draft pick values, and support for every major scoring format."},{q:"Is the dynasty trade calculator free?",a:"Yes! The core trade analyzer with 2026 player values is completely free — no account required."},{q:"Does it support IDP dynasty leagues?",a:"Absolutely. We rank DL, LB, and DB with full VBD scoring, age grades, and trade values."},{q:"Does Fantasy Draft Pros have superflex rankings?",a:"Yes — Superflex mode boosts QB values appropriately for SF leagues."},{q:"How often are player values updated?",a:"Player values are updated daily based on the latest news, injury reports, and 2026 projection data."},{q:"What league platforms are supported?",a:"Sleeper (live API), ESPN, Yahoo, and MFL — plus manual roster entry."}];

function AuthModal(props){
  var T=props.T||DARK,onClose=props.onClose,onAuth=props.onAuth,initMode=props.mode||"signup";
  var [mode,setMode]=useState(initMode),[email,setEmail]=useState(""),[password,setPassword]=useState(""),[name,setName]=useState(""),[plan,setPlan]=useState("pro"),[step,setStep]=useState(1),[err,setErr]=useState(""),[loading,setLoading]=useState(false);
  var inp={background:T.bgInput,color:T.text,border:"1px solid "+T.border,borderRadius:10,padding:"13px 16px",fontSize:14,outline:"none",width:"100%",boxSizing:"border-box",marginBottom:12};
  function submit(){
    if(!email.includes("@")){setErr("Enter a valid email");return;}
    if(password.length<6){setErr("Password must be 6+ characters");return;}
    if(mode==="signup"&&!name.trim()){setErr("Enter your name");return;}
    setErr("");setLoading(true);
    setTimeout(function(){
      setLoading(false);
      if(mode==="signup"&&step===1){setStep(2);return;}
      var admin=isAdminEmail(email);
      onAuth({name:admin?"Jack Lawrence":(mode==="signup"?name:"Dynasty Manager"),email:email,plan:admin?"elite":(mode==="signup"?plan:"pro"),isPro:true,isAdmin:admin});
    },800);
  }
  var LogoSvg=React.createElement("svg",{width:24,height:28,viewBox:"0 0 54 62",fill:"none"},React.createElement("path",{d:"M27 2L4 11V33C4 46 27 60 27 60S50 46 50 33V11L27 2Z",fill:T.bg,stroke:T.purple,strokeWidth:"2.5"}),React.createElement("ellipse",{cx:"27",cy:"26",rx:"14",ry:"8",fill:"none",stroke:"#c4b5fd",strokeWidth:"1.5"}),React.createElement("circle",{cx:"27",cy:"26",r:"5",fill:T.bg,stroke:T.purple,strokeWidth:"1"}),React.createElement("rect",{x:"22.5",y:"24",width:"2",height:"4",rx:"0.5",fill:T.purple}),React.createElement("rect",{x:"25.5",y:"22",width:"2",height:"6",rx:"0.5",fill:"#c4b5fd"}),React.createElement("rect",{x:"28.5",y:"23",width:"2",height:"5",rx:"0.5",fill:T.purple}));
  return React.createElement("div",{style:{position:"fixed",inset:0,background:"rgba(0,0,0,0.88)",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center",padding:16}},
    React.createElement("div",{style:{background:T.bgCard,border:"1px solid "+T.borderPurple,borderRadius:20,padding:28,width:"100%",maxWidth:400,position:"relative"}},
      React.createElement("button",{onClick:onClose,style:{position:"absolute",top:14,right:16,background:"none",border:"none",color:T.textDim,cursor:"pointer",fontSize:20}},"x"),
      React.createElement("div",{style:{textAlign:"center",marginBottom:18}},
        React.createElement("div",{style:{display:"inline-flex",alignItems:"center",gap:6}},LogoSvg,React.createElement("span",{style:{fontSize:16,fontWeight:300,color:T.textSub}},"fantasy"),React.createElement("span",{style:{fontSize:16,fontWeight:900,color:T.purple,marginLeft:-4}},"DraftPros"))
      ),
      step===1&&React.createElement("div",null,
        React.createElement("div",{style:{textAlign:"center",marginBottom:18}},React.createElement("div",{style:{fontWeight:900,fontSize:22,marginBottom:4}},mode==="signup"?"Create Account":"Welcome Back"),React.createElement("div",{style:{fontSize:13,color:T.textSub}},mode==="signup"?"Start your 7-day free trial":"Sign in to your account")),
        React.createElement("div",{style:{display:"flex",background:T.bgInput,borderRadius:12,padding:4,marginBottom:18}},["signup","signin"].map(function(m){return React.createElement("button",{key:m,onClick:function(){setMode(m);setErr("");},style:{flex:1,padding:"9px",borderRadius:9,border:"none",cursor:"pointer",fontWeight:700,fontSize:13,background:mode===m?T.purple:"transparent",color:mode===m?"#fff":T.textSub}},m==="signup"?"Sign Up":"Sign In");})),
        mode==="signup"&&React.createElement("input",{placeholder:"Full name",value:name,onChange:function(e){setName(e.target.value);},style:inp}),
        React.createElement("input",{placeholder:"Email address",type:"email",value:email,onChange:function(e){setEmail(e.target.value);},style:inp}),
        React.createElement("input",{placeholder:"Password (6+ characters)",type:"password",value:password,onChange:function(e){setPassword(e.target.value);},onKeyDown:function(e){if(e.key==="Enter")submit();},style:Object.assign({},inp,{marginBottom:err?8:16})}),
        err&&React.createElement("div",{style:{fontSize:12,color:T.red,marginBottom:12,padding:"8px 12px",background:T.red+"15",borderRadius:8}},err),
        React.createElement("button",{onClick:submit,disabled:loading,style:{width:"100%",padding:"14px",borderRadius:12,border:"none",cursor:"pointer",fontWeight:800,fontSize:15,background:"linear-gradient(135deg,"+T.purple+",#5b21b6)",color:"#fff",opacity:loading?0.7:1}},loading?"...":(mode==="signup"?"Continue":"Sign In")),
        mode==="signin"&&React.createElement("div",{style:{textAlign:"center",marginTop:12,fontSize:12,color:T.textSub}},"No account? ",React.createElement("span",{onClick:function(){setMode("signup");setErr("");},style:{color:T.purple,cursor:"pointer",fontWeight:700}},"Sign up free"))
      ),
      step===2&&React.createElement("div",null,
        React.createElement("div",{style:{textAlign:"center",marginBottom:18}},React.createElement("div",{style:{fontWeight:900,fontSize:22,marginBottom:4}},"Choose Your Plan"),React.createElement("div",{style:{fontSize:13,color:T.textSub}},"7-day free trial on all paid plans")),
        PLANS.map(function(p){
          var active=plan===p.id;
          return React.createElement("div",{key:p.id,onClick:function(){setPlan(p.id);},style:{background:active?T.purple+"18":T.bgInput,border:"2px solid "+(active?T.purple:T.border),borderRadius:14,padding:"14px 16px",marginBottom:10,cursor:"pointer"}},
            React.createElement("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}},React.createElement("div",{style:{fontWeight:800,fontSize:15,color:active?T.purple:T.text}},p.label),React.createElement("div",{style:{fontWeight:900,fontSize:16,color:active?T.purple:T.textSub}},p.priceStr+(p.id==="free"?"":p.sub))),
            p.id==="free"&&React.createElement("div",{style:{fontSize:12,color:T.textSub}},"Core trade analyzer + top 20 rankings"),
            p.id==="pro"&&React.createElement("div",null,React.createElement("div",{style:{fontSize:12,color:T.textSub,marginBottom:4}},"Full rankings, league import, AI tools"),React.createElement("span",{style:{background:T.purple,color:"#fff",fontSize:9,fontWeight:800,borderRadius:4,padding:"2px 7px"}},"MOST POPULAR")),
            p.id==="elite"&&React.createElement("div",{style:{fontSize:12,color:T.textSub}},"Everything in Pro + API access + priority support")
          );
        }),
        err&&React.createElement("div",{style:{fontSize:12,color:T.red,marginBottom:10,padding:"8px 12px",background:T.red+"15",borderRadius:8}},err),
        React.createElement("button",{onClick:submit,disabled:loading,style:{width:"100%",padding:"14px",borderRadius:12,border:"none",cursor:"pointer",fontWeight:800,fontSize:15,background:"linear-gradient(135deg,"+T.purple+",#5b21b6)",color:"#fff",opacity:loading?0.7:1,marginTop:4}},loading?"...":(plan==="free"?"Start Free":"Start 7-Day Free Trial")),
        React.createElement("div",{style:{textAlign:"center",marginTop:8,fontSize:11,color:T.textDim}},plan!=="free"?"Cancel anytime.":"Upgrade anytime.")
      )
    )
  );
}

function UserMenu(props){
  var T=props.T||DARK,user=props.user,onSignOut=props.onSignOut,onUpgrade=props.onUpgrade,onAdmin=props.onAdmin;
  var [open,setOpen]=useState(false);
  return React.createElement("div",{style:{position:"relative"}},
    React.createElement("button",{onClick:function(){setOpen(!open);},style:{display:"flex",alignItems:"center",gap:6,background:user.isAdmin?"linear-gradient(135deg,"+T.purple+",#5b21b6)":T.purpleDim,border:"1px solid "+T.purple+"44",borderRadius:20,padding:"5px 12px 5px 6px",cursor:"pointer"}},
      React.createElement("div",{style:{width:24,height:24,borderRadius:"50%",background:user.isAdmin?"#f1c40f":T.purple,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:800,color:user.isAdmin?"#000":"#fff"}},user.name.charAt(0).toUpperCase()),
      React.createElement("span",{style:{fontSize:12,fontWeight:700,color:T.text}},user.name.split(" ")[0]),
      user.isAdmin?React.createElement("span",{style:{background:"#f1c40f",color:"#000",fontSize:8,fontWeight:800,borderRadius:4,padding:"1px 5px"}},"ADMIN"):user.isPro&&React.createElement("span",{style:{background:T.purple,color:"#fff",fontSize:8,fontWeight:800,borderRadius:4,padding:"1px 5px"}},"PRO"),
      React.createElement("span",{style:{color:T.textDim,fontSize:10}},"v")
    ),
    open&&React.createElement("div",{style:{position:"absolute",top:"calc(100% + 6px)",right:0,background:T.bgCard,border:"1px solid "+T.border,borderRadius:12,minWidth:200,zIndex:500,boxShadow:"0 8px 30px #0008",overflow:"hidden"}},
      React.createElement("div",{style:{padding:"12px 16px",borderBottom:"1px solid "+T.border}},
        React.createElement("div",{style:{fontWeight:700,fontSize:13}},user.name),
        React.createElement("div",{style:{fontSize:11,color:T.textSub}},user.email),
        React.createElement("div",{style:{marginTop:4,display:"flex",gap:4}},
          user.isAdmin&&React.createElement("span",{style:{background:"#f1c40f",color:"#000",fontSize:9,fontWeight:800,borderRadius:4,padding:"2px 7px"}},"ADMIN"),
          React.createElement("span",{style:{background:user.isPro?T.purple:"#374151",color:"#fff",fontSize:9,fontWeight:700,borderRadius:4,padding:"2px 7px"}},user.plan.toUpperCase())
        )
      ),
      user.isAdmin&&React.createElement("button",{onClick:function(){setOpen(false);onAdmin();},style:{width:"100%",padding:"11px 16px",background:T.purpleDim,border:"none",borderBottom:"1px solid "+T.border,cursor:"pointer",fontWeight:700,fontSize:12,color:"#f1c40f",textAlign:"left"}},"Admin Panel"),
      !user.isPro&&React.createElement("button",{onClick:function(){setOpen(false);onUpgrade();},style:{width:"100%",padding:"11px 16px",background:"linear-gradient(135deg,"+T.purple+",#5b21b6)",border:"none",cursor:"pointer",fontWeight:700,fontSize:12,color:"#fff",textAlign:"left"}},"Upgrade to Pro"),
      React.createElement("button",{onClick:function(){setOpen(false);onSignOut();},style:{width:"100%",padding:"11px 16px",background:"none",border:"none",cursor:"pointer",fontSize:12,color:T.textSub,textAlign:"left"}},"Sign Out")
    )
  );
}

export default function App(){
  var [tab,setTab]=useState("trade");
  var [scoring,setScoring]=useState("Dynasty");
  var [teams,setTeams]=useState(12);
  var [budget,setBudget]=useState(200);
  var [ffab,setFfab]=useState(100);
  var [sortBy,setSortBy]=useState("rank");
  var [search,setSearch]=useState("");
  var [posFilter,setPosFilter]=useState("ALL");
  var [tradeA,setTradeA]=useState([]);
  var [tradeB,setTradeB]=useState([]);
  var [tSrchA,setTSrchA]=useState("");
  var [tSrchB,setTSrchB]=useState("");
  var [faabA,setFaabA]=useState(0);
  var [faabB,setFaabB]=useState(0);
  var [analyzed,setAnalyzed]=useState(false);
  var [tradeCount,setTradeCount]=useState(0);
  var [impTab,setImpTab]=useState("sleeper");
  var [slUser,setSlUser]=useState("");
  var [impStatus,setImpStatus]=useState(null);
  var [impData,setImpData]=useState(null);
  var [impErr,setImpErr]=useState("");
  var [impRoster,setImpRoster]=useState([]);
  var [manRaw,setManRaw]=useState("");
  var [manMatched,setManMatched]=useState([]);
  var [espnId,setEspnId]=useState("");
  var [mflId,setMflId]=useState("");
  var [faqOpen,setFaqOpen]=useState(null);
  var [user,setUser]=useState(null);
  var [showAuth,setShowAuth]=useState(false);
  var [authMode,setAuthMode]=useState("signup");
  var [showAdmin,setShowAdmin]=useState(false);
  var [darkMode,setDarkMode]=useState(true);
  // League
  var [leagueSubTab,setLeagueSubTab]=useState("power");
  var [byeWeek,setByeWeek]=useState(1);
  var [waiverSearch,setWaiverSearch]=useState("");
  var [waiverPos,setWaiverPos]=useState("All Positions");
  var [waiverLoaded,setWaiverLoaded]=useState(false);
  var [adviceTeam,setAdviceTeam]=useState(0);
  var [lineupTeam,setLineupTeam]=useState(0);
  var [lineupOptimized,setLineupOptimized]=useState(false);
  var [rivalryTeam1,setRivalryTeam1]=useState("All Teams");
  var [rivalryTeam2,setRivalryTeam2]=useState("All Teams");
  var [recapWeek,setRecapWeek]=useState("1");
  var [recapGenerated,setRecapGenerated]=useState(false);
  var [recapError,setRecapError]=useState(false);
  var [chatMessages,setChatMessages]=useState([]);
  var [chatInput,setChatInput]=useState("");
  var [notifications,setNotifications]=useState([]);
  var [leagueImportUser,setLeagueImportUser]=useState("");
  var [leagueImportStatus,setLeagueImportStatus]=useState(null);
  var [leagueImportData,setLeagueImportData]=useState(null);
  var [leagueImportErr,setLeagueImportErr]=useState("");
  var [simCount,setSimCount]=useState("1,000 (Recommended)");
  var [simRan,setSimRan]=useState(false);
  var [simRunning,setSimRunning]=useState(false);
  var [simNotes,setSimNotes]=useState("");
  var [simSaved,setSimSaved]=useState(false);
  var [expandedTeam,setExpandedTeam]=useState(null);
  // Rankings
  var [rankSubTab,setRankSubTab]=useState("all");
  var [rankPos,setRankPos]=useState("QB");
  var [rankFormat,setRankFormat]=useState("SF");
  var [rankSearch,setRankSearch]=useState("");
  var [rankTeamFilter,setRankTeamFilter]=useState("All Teams");
  var [rankIdpPos,setRankIdpPos]=useState("DL");
  var [watchlist,setWatchlist]=useState([]);
  var [valueTrendsPos,setValueTrendsPos]=useState("QB");
  var [trendingFilter,setTrendingFilter]=useState("all");
  var [marketFilter,setMarketFilter]=useState("buylow");
  var [marketPos,setMarketPos]=useState("All Positions");
  var [marketSearch,setMarketSearch]=useState("");
  var [valueTrendSearch,setValueTrendSearch]=useState("");
  var [pickYear,setPickYear]=useState("2026 Draft");
  var [draftKitLoaded,setDraftKitLoaded]=useState(false);
  var [draftKitPos,setDraftKitPos]=useState("All Positions");
  var [draftKitSearch,setDraftKitSearch]=useState("");
  var [drafted,setDrafted]=useState([]);
  var [keeperTeam,setKeeperTeam]=useState(0);
  var [keeperLimit,setKeeperLimit]=useState(3);
  var [keeperCost,setKeeperCost]=useState(1000);
  var [keeperCalced,setKeeperCalced]=useState(false);
  var [compareP1,setCompareP1]=useState(null);
  var [compareP2,setCompareP2]=useState(null);
  var [compareS1,setCompareS1]=useState("");
  var [compareS2,setCompareS2]=useState("");

  var T=darkMode?DARK:LIGHT;
  var isPro=user&&user.isPro;
  var isDynasty=scoring==="Dynasty";
  var isSF=scoring==="Superflex";
  var sKey=(isDynasty||isSF)?"PPR":(scoring==="Half"?"Half":(scoring==="Std"?"Std":"PPR"));

  var rankedPlayers=useMemo(function(){
    var bl=getBaselines(teams,isSF);
    var byPos={};
    UNQ.forEach(function(p){if(!byPos[p.pos])byPos[p.pos]=[];byPos[p.pos].push(p);});
    var baseVal={};
    Object.keys(byPos).forEach(function(pos){
      var s=byPos[pos].slice().sort(function(a,b){return b.proj[sKey]-a.proj[sKey];});
      baseVal[pos]=s[Math.min((bl[pos]||teams)-1,s.length-1)]?s[Math.min((bl[pos]||teams)-1,s.length-1)].proj[sKey]:0;
    });
    var list=UNQ.map(function(p){
      var pts=p.proj[sKey]||p.proj["PPR"]||0;
      if(isDynasty) pts=pts*dynastyBonus(p.pos,p.age);
      var raw=pts-(baseVal[p.pos]||0);
      var vbd=isSF&&p.pos==="QB"?raw*1.38:raw;
      return Object.assign({},p,{pts:+pts.toFixed(1),vbd:+vbd.toFixed(1),ag:ageGrade(p.pos,p.age)});
    });
    list.sort(function(a,b){return b.vbd-a.vbd;});
    var totVbd=list.reduce(function(s,p){return s+Math.max(0,p.vbd);},0)||1;
    var prc={};
    list.forEach(function(p,i){
      prc[p.pos]=(prc[p.pos]||0)+1;
      p.posRank=prc[p.pos];p.rank=i+1;
      p.tier=tierLabel(p.posRank,p.pos);
      p.scarcity=scarcityLabel(p.posRank,bl[p.pos]||teams);
      p.auction=p.vbd>0?Math.max(1,Math.round((p.vbd/totVbd)*budget*teams*0.88)):1;
      p.ffabVal=p.vbd>0?Math.max(1,Math.round((p.vbd/totVbd)*ffab*4)):1;
      p.tradeVal=Math.max(0,Math.round(p.vbd));
    });
    return list;
  },[scoring,teams,budget,ffab,sKey,isDynasty,isSF]);

  var tradePool=useMemo(function(){return rankedPlayers.concat(DRAFT_PICKS.map(makePick));},[rankedPlayers]);

  var LEAGUE_TEAMS=useMemo(function(){
    var names=["From tank to battle-ship","Gay Lord Fockers","Dog Water","The FORGE","TwoSticks","Old Men Rule","Armchair Warriors","Dynasty Kings","Red Zone Bandits","Waiver Wire Heroes","Stack Attack","The Sleeper Picks"];
    return names.map(function(name,i){
      var baseVal=139126-(i*3800)+Math.floor(Math.random()*1000);
      var po=Math.max(20,82-(i*4.2)+Math.random()*3);
      var co=Math.max(5,75-(i*5.8)+Math.random()*3);
      var ww=Math.max(25,68-(i*3.5)+Math.random()*3);
      return {rank:i+1,name:name,totalVal:baseVal,playoffOdds:+po.toFixed(1),champOdds:+co.toFixed(1),weeklyWin:+ww.toFixed(1),makePlayoffs:+Math.max(15,58-(i*3.2)).toFixed(1),firstRoundBye:+Math.max(3,23-(i*1.8)).toFixed(1),winChamp:+Math.max(1,12.9-(i*1.1)).toFixed(1),players:Math.floor(22+Math.random()*14),picks:Math.floor(3+Math.random()*6),faab:Math.floor(50+Math.random()*150),record:"0-0",projW:+(6.9-i*0.3).toFixed(1)};
    });
  },[]);

  function tVal(side,fa){return side.reduce(function(s,x){return s+(x.pos==="PICK"?x.est:Math.max(0,x.vbd));},0)+(fa||0);}
  var tvA=tVal(tradeA,faabA),tvB=tVal(tradeB,faabB);
  function verdict(){
    var diff=tvA-tvB,pct=tvB>0?Math.abs(diff/tvB)*100:0;
    if(pct<8) return {txt:"Fair Trade",sub:"Both sides get equal value",c:T.green,pct:50};
    if(diff>0) return {txt:"Team B Overpays",sub:"Team A wins by "+pct.toFixed(0)+"%",c:T.gold,pct:Math.min(85,50+pct/2)};
    return {txt:"Team A Overpays",sub:"Team B wins by "+pct.toFixed(0)+"%",c:T.red,pct:Math.max(15,50-pct/2)};
  }
  function srchRes(q,excl){if(!q)return[];return tradePool.filter(function(p){return p.name.toLowerCase().includes(q.toLowerCase())&&!excl.find(function(x){return x.name===p.name;});}).slice(0,8);}

  function importSleeper(){
    if(!slUser.trim())return;
    setImpStatus("loading");setImpData(null);setImpErr("");
    fetch("https://api.sleeper.app/v1/user/"+slUser.trim()).then(function(r){if(!r.ok)throw new Error("User not found");return r.json();}).then(function(u){
      return fetch("https://api.sleeper.app/v1/user/"+u.user_id+"/leagues/nfl/2025").then(function(r){return r.json();}).then(function(leagues){
        if(!leagues||leagues.length===0)throw new Error("No NFL leagues found");
        var lg=leagues[0];
        return fetch("https://api.sleeper.app/v1/league/"+lg.league_id+"/rosters").then(function(r){return r.json();}).then(function(rosters){
          var my=rosters.find(function(r){return r.owner_id===u.user_id;});
          var rec=lg.scoring_settings?lg.scoring_settings.rec:0;
          var pls=my&&my.players?my.players:[];
          setImpData({username:u.display_name||u.username,leagueName:lg.name,totalTeams:rosters.length,scoringFormat:rec===1?"PPR":rec===0.5?"Half-PPR":"Standard"});
          setImpRoster(pls.map(function(pid){var f=rankedPlayers.find(function(p){return p.name.toLowerCase().includes(pid.toLowerCase());});return f||{name:"ID:"+pid,pos:"?",team:"?",rank:"—",vbd:0,tradeVal:0,ag:{g:"?",c:"#888"},tier:{t:"?",c:"#888"}};}));
          setImpStatus("success");
        });
      });
    }).catch(function(e){setImpErr(e.message||"Import failed");setImpStatus("error");});
  }

  function doLeagueImport(){
    if(!leagueImportUser.trim())return;
    setLeagueImportStatus("loading");setLeagueImportErr("");setLeagueImportData(null);
    fetch("https://api.sleeper.app/v1/user/"+leagueImportUser.trim()).then(function(r){if(!r.ok)throw new Error("User not found");return r.json();}).then(function(u){
      return fetch("https://api.sleeper.app/v1/user/"+u.user_id+"/leagues/nfl/2025").then(function(r){return r.json();}).then(function(leagues){
        setLeagueImportData({username:u.display_name||u.username,leagues:leagues||[]});
        setLeagueImportStatus("success");
      });
    }).catch(function(e){setLeagueImportErr(e.message||"User not found");setLeagueImportStatus("error");});
  }

  var inpS={background:T.bgInput,color:T.text,border:"1px solid "+T.border,borderRadius:10,padding:"12px 16px",fontSize:13,outline:"none",width:"100%",boxSizing:"border-box"};

  function SrchDrop(props){
    var q=props.value,setQ=props.onChange,excl=props.exclude,onSel=props.onSelect,ph=props.placeholder;
    var res=srchRes(q,excl);
    return React.createElement("div",{style:{position:"relative",flex:1}},
      React.createElement("input",{value:q,onChange:function(e){setQ(e.target.value);},placeholder:ph||"Search players or picks...",autoComplete:"off",style:Object.assign({},inpS,{border:"1px solid "+(q?T.borderPurple:T.border)})}),
      q&&res.length>0&&React.createElement("div",{style:{position:"absolute",top:"calc(100% + 4px)",left:0,right:0,zIndex:200,background:T.bgCard,border:"1px solid "+T.borderPurple,borderRadius:12,overflow:"hidden",boxShadow:"0 12px 40px #0009"}},
        res.map(function(p,ri){
          var bg=ri%2===0?T.bgCard:T.bg;
          return React.createElement("button",{key:p.name,onClick:function(){onSel(p);setQ("");},style:{display:"flex",alignItems:"center",gap:10,width:"100%",background:bg,border:"none",borderBottom:"1px solid "+T.border,padding:"10px 14px",cursor:"pointer",textAlign:"left"},onMouseEnter:function(e){e.currentTarget.style.background=T.purple+"22";},onMouseLeave:function(e){e.currentTarget.style.background=bg;}},
            React.createElement(Avatar,{name:p.name,pos:p.pos,size:30}),
            React.createElement("div",{style:{flex:1}},React.createElement("div",{style:{fontWeight:700,fontSize:13,color:T.text}},p.name),React.createElement("div",{style:{fontSize:10,color:T.textSub}},p.team||"",p.age?" Age "+p.age:"",p.rank&&p.rank<999?" #"+p.rank:"")),
            React.createElement("div",{style:{textAlign:"right"}},React.createElement(PBadge,{pos:p.pos}),React.createElement("div",{style:{fontSize:10,color:T.purpleLight,fontWeight:700,marginTop:2}},p.pos==="PICK"?"$"+p.est:p.tradeVal+" val"))
          );
        })
      )
    );
  }

  function TradeItem(props){
    var item=props.item,onRemove=props.onRemove;
    return React.createElement("div",{style:{display:"flex",alignItems:"center",gap:8,background:T.bgInput,border:"1px solid "+T.border,borderRadius:10,padding:"8px 12px",marginBottom:6}},
      React.createElement(Avatar,{name:item.name,pos:item.pos,size:28}),
      React.createElement(PBadge,{pos:item.pos}),
      React.createElement("div",{style:{flex:1,minWidth:0}},React.createElement("div",{style:{fontWeight:700,fontSize:12,color:T.text,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}},item.name)),
      React.createElement("span",{style:{fontWeight:700,fontSize:12,color:T.purpleLight,flexShrink:0}},item.pos==="PICK"?"$"+item.est:item.tradeVal),
      React.createElement("button",{onClick:onRemove,style:{background:"none",border:"none",color:T.textDim,cursor:"pointer",fontSize:14,padding:"0 2px"}},"x")
    );
  }

  var LogoSvg=React.createElement("svg",{width:22,height:26,viewBox:"0 0 54 62",fill:"none"},React.createElement("path",{d:"M27 2L4 11V33C4 46 27 60 27 60S50 46 50 33V11L27 2Z",fill:T.bgCard,stroke:T.purple,strokeWidth:"2.5"}),React.createElement("ellipse",{cx:"27",cy:"26",rx:"14",ry:"8",fill:"none",stroke:"#c4b5fd",strokeWidth:"1.5"}),React.createElement("circle",{cx:"27",cy:"26",r:"5",fill:T.bg,stroke:T.purple,strokeWidth:"1"}),React.createElement("rect",{x:"22.5",y:"24",width:"2",height:"4",rx:"0.5",fill:T.purple}),React.createElement("rect",{x:"25.5",y:"22",width:"2",height:"6",rx:"0.5",fill:"#c4b5fd"}),React.createElement("rect",{x:"28.5",y:"23",width:"2",height:"5",rx:"0.5",fill:T.purple}));

  // ── LEAGUE TEAMS mock data helper ──
  var leagueTeamNames=LEAGUE_TEAMS.map(function(t){return t.name;});

  return React.createElement("div",{style:{background:T.bg,minHeight:"100vh",color:T.text,fontFamily:"-apple-system,BlinkMacSystemFont,'Inter',sans-serif",maxWidth:480,margin:"0 auto",paddingBottom:70}},

    showAuth&&React.createElement(AuthModal,{mode:authMode,onClose:function(){setShowAuth(false);},onAuth:function(u){setUser(u);setShowAuth(false);},T:T}),

    // Admin panel
    showAdmin&&user&&user.isAdmin&&React.createElement("div",{style:{position:"fixed",inset:0,background:"rgba(0,0,0,0.92)",zIndex:1000,overflowY:"auto",padding:16}},
      React.createElement("div",{style:{background:T.bgCard,border:"1px solid #f1c40f44",borderRadius:20,padding:24,maxWidth:460,margin:"0 auto"}},
        React.createElement("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}},
          React.createElement("div",null,React.createElement("div",{style:{fontWeight:900,fontSize:20,color:"#f1c40f"}},"Admin Panel"),React.createElement("div",{style:{fontSize:11,color:T.textSub,marginTop:2}},user.email)),
          React.createElement("button",{onClick:function(){setShowAdmin(false);},style:{background:"none",border:"none",color:T.textDim,cursor:"pointer",fontSize:20}},"x")
        ),
        React.createElement("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:20}},
          [["68","Users"],["41","Pro"],["$122","MRR"]].map(function(s){return React.createElement("div",{key:s[0],style:{background:T.bgInput,borderRadius:10,padding:"12px 8px",textAlign:"center",border:"1px solid "+T.border}},React.createElement("div",{style:{fontWeight:900,fontSize:22,color:"#f1c40f"}},s[0]),React.createElement("div",{style:{fontSize:9,color:T.textSub,letterSpacing:1}},s[1]));})
        ),
        [["Platform Analytics","User signups, retention, feature usage","#818cf8"],["User Management","View, edit, upgrade, or ban any account","#34d399"],["Player Database","Edit projections, VBD scores, rankings","#f59e0b"],["Trade Value Editor","Override trade values for any player","#c084fc"],["Push Notifications","Send market alerts to all Pro users","#f87171"],["Revenue Dashboard","Stripe MRR, churn, LTV metrics","#06b6d4"],["Feature Flags","Toggle features per plan or per user","#fb923c"],["Content Manager","Edit rankings copy, FAQ, landing page","#a78bfa"]].map(function(f){
          return React.createElement("div",{key:f[0],style:{display:"flex",alignItems:"center",gap:12,background:T.bgInput,border:"1px solid "+T.border,borderRadius:12,padding:"12px 14px",marginBottom:8,cursor:"pointer"}},
            React.createElement("div",{style:{width:36,height:36,borderRadius:10,background:f[2]+"18",border:"1px solid "+f[2]+"33",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,flexShrink:0,color:f[2]}},"*"),
            React.createElement("div",{style:{flex:1}},React.createElement("div",{style:{fontWeight:700,fontSize:13}},f[0]),React.createElement("div",{style:{fontSize:11,color:T.textSub,marginTop:1}},f[1])),
            React.createElement("span",{style:{color:f[2],fontSize:16}},">")
          );
        }),
        React.createElement("button",{onClick:function(){setShowAdmin(false);},style:{width:"100%",marginTop:14,padding:"12px",borderRadius:12,border:"1px solid "+T.border,background:"transparent",color:T.textSub,cursor:"pointer",fontWeight:600,fontSize:13}},"Close")
      )
    ),

    // NAV
    React.createElement("div",{style:{padding:"14px 16px 12px",display:"flex",justifyContent:"space-between",alignItems:"center",position:"sticky",top:0,background:T.bg,zIndex:100,borderBottom:"1px solid "+T.border}},
      React.createElement("div",{style:{display:"flex",alignItems:"center",gap:6}},LogoSvg,React.createElement("span",{style:{fontSize:14,fontWeight:300,color:T.textSub}},"fantasy"),React.createElement("span",{style:{fontSize:14,fontWeight:900,color:T.purple,marginLeft:-4}},"DraftPros")),
      React.createElement("div",{style:{display:"flex",gap:6,alignItems:"center"}},
        React.createElement("button",{onClick:function(){setDarkMode(function(d){return !d;});},style:{padding:"6px 10px",borderRadius:20,border:"1px solid "+T.border,background:T.bgInput,color:T.textSub,cursor:"pointer",fontSize:13,lineHeight:1}},darkMode?"Sun":"Moon"),
        !user?React.createElement("div",{style:{display:"flex",gap:6}},
          React.createElement("button",{onClick:function(){setAuthMode("signin");setShowAuth(true);},style:{padding:"6px 12px",borderRadius:20,border:"1px solid "+T.border,background:"transparent",color:T.textSub,cursor:"pointer",fontWeight:600,fontSize:11}},"Sign In"),
          React.createElement("button",{onClick:function(){setAuthMode("signup");setShowAuth(true);},style:{padding:"6px 14px",borderRadius:20,border:"none",background:"linear-gradient(135deg,"+T.purple+",#5b21b6)",color:"#fff",cursor:"pointer",fontWeight:700,fontSize:11}},"Sign Up Free")
        ):React.createElement(UserMenu,{user:user,T:T,onSignOut:function(){setUser(null);setShowAdmin(false);},onUpgrade:function(){setAuthMode("signup");setShowAuth(true);},onAdmin:function(){setShowAdmin(true);}})
      )
    ),

    // BOTTOM TABS
    React.createElement("div",{style:{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:480,background:T.bgCard,borderTop:"1px solid "+T.border,display:"flex",zIndex:100}},
      [["trade","Trade"],["league","My League"],["rankings","Rankings"],["import","Import"]].map(function(item){
        var active=tab===item[0];
        return React.createElement("button",{key:item[0],onClick:function(){
          if((item[0]==="import"||item[0]==="league")&&!isPro){setAuthMode("signup");setShowAuth(true);return;}
          setTab(item[0]);
        },style:{flex:1,padding:"10px 4px 6px",background:"none",border:"none",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:2}},
          React.createElement("span",{style:{fontSize:16}}," "),
          React.createElement("span",{style:{fontSize:10,fontWeight:700,color:active?T.purple:T.textDim}},item[1]),
          active&&React.createElement("div",{style:{width:20,height:2,background:T.purple,borderRadius:2}}),
          (item[0]==="import"||item[0]==="league")&&!isPro&&React.createElement("span",{style:{fontSize:7,color:T.gold,fontWeight:700}},"PRO")
        );
      })
    ),

    // ════ TRADE TAB ════
    tab==="trade"&&React.createElement("div",{style:{padding:"16px 16px 0"}},
      React.createElement("div",{style:{textAlign:"center",marginTop:8,marginBottom:20}},
        React.createElement("div",{style:{display:"inline-flex",alignItems:"center",gap:6,background:T.purpleDim,border:"1px solid "+T.purple+"44",borderRadius:30,padding:"5px 14px",fontSize:10,color:T.purpleLight,fontWeight:700,letterSpacing:0.5,marginBottom:14}},"#1 DYNASTY FANTASY FOOTBALL TRADE CALCULATOR - FREE"),
        React.createElement("div",{style:{fontWeight:900,fontSize:28,lineHeight:1.15,marginBottom:10}},React.createElement("span",{style:{color:T.purple}},"Win Every Trade."),React.createElement("br",null),"Dominate Your Dynasty."),
        React.createElement("div",{style:{fontSize:13,color:T.textSub,lineHeight:1.7,marginBottom:20}},"The free dynasty fantasy football trade analyzer trusted by thousands. Combines offensive players, IDP, FAAB budget, and draft picks — 9,000+ player values updated daily."),
        !user&&React.createElement("div",{style:{display:"flex",gap:10,justifyContent:"center",marginBottom:4}},
          React.createElement("button",{onClick:function(){setAuthMode("signup");setShowAuth(true);},style:{padding:"13px 24px",borderRadius:30,border:"none",cursor:"pointer",fontWeight:800,fontSize:14,background:"linear-gradient(135deg,"+T.purple+",#5b21b6)",color:"#fff"}},"Start 7-Day Free Trial"),
          React.createElement("button",{onClick:function(){setAuthMode("signin");setShowAuth(true);},style:{padding:"13px 24px",borderRadius:30,border:"1px solid "+T.border,cursor:"pointer",fontWeight:700,fontSize:14,background:"transparent",color:T.text}},"Sign In")
        )
      ),
      React.createElement("div",{style:{background:T.bgCard,border:"1px solid "+T.borderPurple,borderRadius:20,padding:18,marginBottom:20}},
        React.createElement("div",{style:{fontWeight:800,fontSize:16,marginBottom:2}},"Free Dynasty Trade Analyzer - 2026"),
        React.createElement("div",{style:{fontSize:11,color:T.textSub,marginBottom:14}},"No account required - Offensive + IDP + FAAB + Draft Picks"),
        React.createElement("div",{style:{background:T.bgInput,borderRadius:12,padding:12,marginBottom:14}},
          React.createElement("div",{style:{display:"flex",gap:6,flexWrap:"wrap"}},SCORING_FORMATS.map(function(f){return React.createElement(Chip,{key:f,label:f,active:scoring===f,onClick:function(){setScoring(f);setAnalyzed(false);}});}))
        ),
        React.createElement("div",{style:{marginBottom:12}},
          React.createElement("div",{style:{fontWeight:700,fontSize:14,marginBottom:8}},"Your Team Gives"),
          React.createElement("div",{style:{display:"flex",gap:8,marginBottom:8}},
            React.createElement(SrchDrop,{value:tSrchA,onChange:setTSrchA,exclude:[].concat(tradeA,tradeB),onSelect:function(p){setTradeA(function(prev){return prev.concat([p]);});setAnalyzed(false);}}),
            React.createElement("button",{onClick:function(){var pk=DRAFT_PICKS[0];if(!tradeA.find(function(x){return x.name===pk.name;}))setTradeA(function(prev){return prev.concat([makePick(pk)]);});},style:{background:T.bgInput,border:"1px solid "+T.border,borderRadius:10,padding:"0 12px",color:T.textSub,cursor:"pointer",fontWeight:600,fontSize:11,whiteSpace:"nowrap",flexShrink:0}},"+ Pick")
          ),
          tradeA.map(function(item){return React.createElement(TradeItem,{key:item.name,item:item,onRemove:function(){setTradeA(function(p){return p.filter(function(x){return x.name!==item.name;});});setAnalyzed(false);}});}),
          React.createElement("div",{style:{marginTop:8}},
            React.createElement("div",{style:{fontSize:11,color:T.textSub,marginBottom:4,fontWeight:600}},"FAAB Money"),
            React.createElement("div",{style:{position:"relative"}},React.createElement("span",{style:{position:"absolute",left:14,top:"50%",transform:"translateY(-50%)",color:T.textSub,fontWeight:700}},"$"),React.createElement("input",{type:"number",value:faabA,onChange:function(e){setFaabA(+e.target.value||0);setAnalyzed(false);},min:0,style:Object.assign({},inpS,{paddingLeft:30}),placeholder:"0"}))
          )
        ),
        React.createElement("div",{style:{textAlign:"center",color:T.textDim,fontSize:11,fontWeight:700,letterSpacing:2,margin:"4px 0 12px"}},"VS"),
        React.createElement("div",{style:{marginBottom:16}},
          React.createElement("div",{style:{fontWeight:700,fontSize:14,marginBottom:8}},"Your Team Gets"),
          React.createElement("div",{style:{display:"flex",gap:8,marginBottom:8}},
            React.createElement(SrchDrop,{value:tSrchB,onChange:setTSrchB,exclude:[].concat(tradeA,tradeB),onSelect:function(p){setTradeB(function(prev){return prev.concat([p]);});setAnalyzed(false);}}),
            React.createElement("button",{onClick:function(){var pk=DRAFT_PICKS[1];if(!tradeB.find(function(x){return x.name===pk.name;}))setTradeB(function(prev){return prev.concat([makePick(pk)]);});},style:{background:T.bgInput,border:"1px solid "+T.border,borderRadius:10,padding:"0 12px",color:T.textSub,cursor:"pointer",fontWeight:600,fontSize:11,whiteSpace:"nowrap",flexShrink:0}},"+ Pick")
          ),
          tradeB.map(function(item){return React.createElement(TradeItem,{key:item.name,item:item,onRemove:function(){setTradeB(function(p){return p.filter(function(x){return x.name!==item.name;});});setAnalyzed(false);}});}),
          React.createElement("div",{style:{marginTop:8}},
            React.createElement("div",{style:{fontSize:11,color:T.textSub,marginBottom:4,fontWeight:600}},"FAAB Money"),
            React.createElement("div",{style:{position:"relative"}},React.createElement("span",{style:{position:"absolute",left:14,top:"50%",transform:"translateY(-50%)",color:T.textSub,fontWeight:700}},"$"),React.createElement("input",{type:"number",value:faabB,onChange:function(e){setFaabB(+e.target.value||0);setAnalyzed(false);},min:0,style:Object.assign({},inpS,{paddingLeft:30}),placeholder:"0"}))
          )
        ),
        React.createElement("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:8}},
          !isPro&&React.createElement("div",{style:{fontSize:11,color:tradeCount>=FREE_TRADE_LIMIT?T.red:T.textSub}},tradeCount>=FREE_TRADE_LIMIT?"Trade limit reached - upgrade for unlimited":(FREE_TRADE_LIMIT-tradeCount)+" free analyses remaining"),
          isPro&&React.createElement("div",{style:{fontSize:11,color:T.green}},"Unlimited analyses")
        ),
        React.createElement("button",{onClick:function(){
          if(tradeA.length===0&&tradeB.length===0)return;
          if(!isPro&&tradeCount>=FREE_TRADE_LIMIT){setAuthMode("signup");setShowAuth(true);return;}
          setAnalyzed(true);if(!isPro)setTradeCount(function(c){return c+1;});
        },style:{width:"100%",padding:"15px",borderRadius:14,border:"none",cursor:"pointer",fontWeight:800,fontSize:15,
          background:(tradeA.length>0||tradeB.length>0)?(!isPro&&tradeCount>=FREE_TRADE_LIMIT?"linear-gradient(135deg,"+T.gold+",#92400e)":"linear-gradient(135deg,"+T.purple+",#5b21b6)"):T.purpleDim,
          color:(tradeA.length>0||tradeB.length>0)?"#fff":T.textDim}},
          (!isPro&&tradeCount>=FREE_TRADE_LIMIT)?"Unlock Unlimited Trades":"Analyze Trade"
        ),
        analyzed&&(tradeA.length>0||tradeB.length>0)&&(function(){
          var v=verdict();
          return React.createElement("div",{style:{marginTop:14,background:T.bgInput,borderRadius:14,padding:16,border:"1px solid "+v.c+"33"}},
            React.createElement("div",{style:{fontWeight:900,fontSize:18,color:v.c,marginBottom:2}},v.txt),
            React.createElement("div",{style:{fontSize:12,color:T.textSub,marginBottom:12}},v.sub),
            React.createElement("div",{style:{background:T.border,borderRadius:99,height:8,marginBottom:12,overflow:"hidden"}},React.createElement("div",{style:{width:v.pct+"%",height:"100%",background:"linear-gradient(90deg,"+T.purple+","+v.c+")",borderRadius:99}})),
            React.createElement("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}},
              React.createElement("div",{style:{background:T.bgCard,borderRadius:10,padding:12,border:"1px solid "+T.border,textAlign:"center"}},React.createElement("div",{style:{fontSize:9,color:T.textSub,letterSpacing:1,marginBottom:4}},"GIVES"),React.createElement("div",{style:{fontWeight:900,fontSize:24,color:T.purple}},tvA.toFixed(0))),
              React.createElement("div",{style:{background:T.bgCard,borderRadius:10,padding:12,border:"1px solid "+T.border,textAlign:"center"}},React.createElement("div",{style:{fontSize:9,color:T.textSub,letterSpacing:1,marginBottom:4}},"GETS"),React.createElement("div",{style:{fontWeight:900,fontSize:24,color:T.purpleLight}},tvB.toFixed(0)))
            ),
            !user&&React.createElement("div",{style:{marginTop:12,background:T.purpleDim,border:"1px solid "+T.purple+"44",borderRadius:12,padding:"12px 14px"}},
              React.createElement("div",{style:{fontWeight:700,fontSize:13,color:T.purpleLight,marginBottom:4}},"Want AI Trade Suggestions?"),
              React.createElement("div",{style:{fontSize:11,color:T.textSub,marginBottom:10}},"Sign up free to unlock full rankings, league import, and personalized recommendations."),
              React.createElement("button",{onClick:function(){setAuthMode("signup");setShowAuth(true);},style:{width:"100%",padding:"10px",borderRadius:10,border:"none",cursor:"pointer",fontWeight:700,fontSize:12,background:"linear-gradient(135deg,"+T.purple+",#5b21b6)",color:"#fff"}},"Start Free Trial")
            )
          );
        })()
      ),
      React.createElement("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:28,padding:"0 4px"}},
        [["9,000+","PLAYERS RANKED"],["4","LEAGUE PLATFORMS"],["6","SCORING FORMATS"],["Daily","VALUE UPDATES"]].map(function(s){return React.createElement("div",{key:s[0],style:{textAlign:"center"}},React.createElement("div",{style:{fontWeight:900,fontSize:26,color:T.purple}},s[0]),React.createElement("div",{style:{fontSize:10,color:T.textSub,letterSpacing:1.5,fontWeight:600}},s[1]));})
      ),
      // Pricing
      React.createElement("div",{style:{marginBottom:32}},
        React.createElement("div",{style:{textAlign:"center",marginBottom:20}},
          React.createElement("div",{style:{display:"inline-flex",alignItems:"center",gap:6,background:T.purpleDim,border:"1px solid "+T.purple+"44",borderRadius:20,padding:"5px 14px",fontSize:10,color:T.purpleLight,fontWeight:700,letterSpacing:1,marginBottom:12}},"PRICING"),
          React.createElement("div",{style:{fontWeight:900,fontSize:26,lineHeight:1.2,marginBottom:6}},"Simple, ",React.createElement("span",{style:{color:T.purple}},"Transparent")," Pricing"),
          React.createElement("div",{style:{fontSize:13,color:T.textSub}},"Start free. Upgrade when you're ready.")
        ),
        React.createElement("div",{style:{background:T.bgCard,border:"1px solid "+T.border,borderRadius:20,padding:20,marginBottom:12}},
          React.createElement("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:16}},React.createElement("div",null,React.createElement("div",{style:{fontWeight:900,fontSize:18,marginBottom:2}},"Free"),React.createElement("div",{style:{fontSize:12,color:T.textSub}},"No account required")),React.createElement("div",{style:{textAlign:"right"}},React.createElement("div",{style:{fontWeight:900,fontSize:28}},"$0"),React.createElement("div",{style:{fontSize:10,color:T.textDim}},"forever"))),
          [["Trade analyzer with 2026 values",true],["FAAB money + draft pick values",true],["Offensive + IDP players",true],["All scoring formats",true],["Top 20 player rankings",true],["Full 200+ rankings",false],["League import",false],["AI trade suggestions",false]].map(function(f){return React.createElement("div",{key:f[0],style:{display:"flex",alignItems:"flex-start",gap:10,marginBottom:7,opacity:f[1]?1:0.38}},React.createElement("span",{style:{color:f[1]?T.green:T.textDim,fontSize:14,flexShrink:0,marginTop:1}},f[1]?"v":"x"),React.createElement("span",{style:{fontSize:13,color:f[1]?T.textSub:T.textDim}},f[0]));}),
          React.createElement("button",{onClick:function(){setAuthMode("signup");setShowAuth(true);},style:{width:"100%",marginTop:14,padding:"12px",borderRadius:12,border:"1px solid "+T.border,background:"transparent",color:T.text,cursor:"pointer",fontWeight:700,fontSize:13}},"Get Started Free")
        ),
        React.createElement("div",{style:{background:"linear-gradient(135deg,#1e1040,#1a1035)",border:"2px solid "+T.purple,borderRadius:20,padding:20,marginBottom:12,position:"relative",overflow:"hidden"}},
          React.createElement("div",{style:{position:"absolute",top:0,right:0,background:"linear-gradient(135deg,"+T.purple+",#5b21b6)",borderBottomLeftRadius:12,padding:"4px 14px",fontSize:10,fontWeight:800,color:"#fff"}},"MOST POPULAR"),
          React.createElement("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:16,marginTop:6}},React.createElement("div",null,React.createElement("div",{style:{fontWeight:900,fontSize:18,color:T.purple,marginBottom:2}},"Pro"),React.createElement("div",{style:{fontSize:12,color:T.textSub}},"7-day free trial")),React.createElement("div",{style:{textAlign:"right"}},React.createElement("div",{style:{fontWeight:900,fontSize:28}},"$2.99",React.createElement("span",{style:{fontSize:14,fontWeight:400,color:T.textSub}},"/mo")),React.createElement("div",{style:{fontSize:10,color:T.textDim}},"cancel anytime"))),
          ["Everything in Free","Full rankings - 200+ players","Live Sleeper league import","ESPN Yahoo MFL import","AI trade suggestions + analysis","Roster grades + team strategy","Power rankings + playoff odds","Market alerts - buy low sell high"].map(function(f){return React.createElement("div",{key:f,style:{display:"flex",alignItems:"flex-start",gap:10,marginBottom:7}},React.createElement("span",{style:{color:T.purple,fontSize:14,flexShrink:0,marginTop:1}},"v"),React.createElement("span",{style:{fontSize:13,color:"#fff",lineHeight:1.4}},f));}),
          React.createElement("button",{onClick:function(){setAuthMode("signup");setShowAuth(true);},style:{width:"100%",marginTop:16,padding:"14px",borderRadius:12,border:"none",background:"linear-gradient(135deg,"+T.purple+",#5b21b6)",color:"#fff",cursor:"pointer",fontWeight:800,fontSize:14}},"Start 7-Day Free Trial"),
          React.createElement("div",{style:{textAlign:"center",marginTop:8,fontSize:11,color:T.textDim}},"No credit card required - Cancel anytime")
        ),
        React.createElement("div",{style:{background:T.bgCard,border:"1px solid "+T.borderPurple,borderRadius:20,padding:20,marginBottom:16}},
          React.createElement("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:16}},React.createElement("div",null,React.createElement("div",{style:{fontWeight:900,fontSize:18,color:T.purpleLight,marginBottom:2}},"Elite"),React.createElement("div",{style:{fontSize:12,color:T.textSub}},"For serious dynasty managers")),React.createElement("div",{style:{textAlign:"right"}},React.createElement("div",{style:{fontWeight:900,fontSize:28}},"$6.99",React.createElement("span",{style:{fontSize:14,fontWeight:400,color:T.textSub}},"/mo")),React.createElement("div",{style:{fontSize:10,color:T.textDim}},"cancel anytime"))),
          ["Everything in Pro","API access","Priority support - 24hr response","Early access to new features","Custom scoring formula builder","Export rankings to CSV"].map(function(f){return React.createElement("div",{key:f,style:{display:"flex",alignItems:"flex-start",gap:10,marginBottom:7}},React.createElement("span",{style:{color:T.purpleLight,fontSize:14,flexShrink:0,marginTop:1}},"v"),React.createElement("span",{style:{fontSize:13,color:T.textSub}},f));}),
          React.createElement("button",{onClick:function(){setAuthMode("signup");setShowAuth(true);},style:{width:"100%",marginTop:14,padding:"13px",borderRadius:12,border:"1px solid "+T.borderPurple,background:"transparent",color:T.purpleLight,cursor:"pointer",fontWeight:700,fontSize:13}},"Start 7-Day Free Trial")
        ),
        React.createElement("div",{style:{background:T.bgCard,border:"1px solid "+T.border,borderRadius:16,overflow:"hidden"}},
          React.createElement("div",{style:{padding:"14px 16px",borderBottom:"1px solid "+T.border,fontWeight:800,fontSize:14}},"Feature Comparison"),
          React.createElement("table",{style:{width:"100%",borderCollapse:"collapse",fontSize:12}},
            React.createElement("thead",null,React.createElement("tr",{style:{background:T.bgInput}},React.createElement("th",{style:{padding:"10px 14px",textAlign:"left",color:T.textSub,fontWeight:700,fontSize:11}},"Feature"),["Free","Pro","Elite"].map(function(p){return React.createElement("th",{key:p,style:{padding:"10px 8px",textAlign:"center",color:p==="Pro"?T.purple:T.textSub,fontWeight:800,fontSize:11,width:58}},p);}))),
            React.createElement("tbody",null,COMPARE_ROWS.map(function(row,i){return React.createElement("tr",{key:row[0],style:{borderTop:"1px solid "+T.border,background:i%2===0?"transparent":T.bgInput+"88"}},React.createElement("td",{style:{padding:"10px 14px",color:T.textSub,fontSize:12}},row[0]),[row[1],row[2],row[3]].map(function(v,vi){return React.createElement("td",{key:vi,style:{padding:"10px 8px",textAlign:"center"}},v?React.createElement("span",{style:{color:vi===1?T.purple:T.green,fontSize:15,fontWeight:900}},"v"):React.createElement("span",{style:{color:T.textDim,fontSize:13}},"-"));}));}))
          )
        )
      ),
      // FAQ
      React.createElement("div",{style:{marginBottom:24}},
        React.createElement("div",{style:{textAlign:"center",marginBottom:16}},React.createElement("div",{style:{fontWeight:900,fontSize:22,marginBottom:4}},"Frequently Asked Questions"),React.createElement("div",{style:{fontSize:12,color:T.textSub}},"Everything you need to know")),
        FAQS.map(function(f,i){
          var open=faqOpen===i;
          return React.createElement("div",{key:i,style:{background:T.bgCard,border:"1px solid "+(open?T.borderPurple:T.border),borderRadius:12,marginBottom:8,overflow:"hidden"}},
            React.createElement("button",{onClick:function(){setFaqOpen(open?null:i);},style:{width:"100%",display:"flex",justifyContent:"space-between",alignItems:"center",padding:"14px 16px",background:"none",border:"none",cursor:"pointer",textAlign:"left",gap:12}},
              React.createElement("span",{style:{fontWeight:600,fontSize:13,color:open?T.purple:T.text,lineHeight:1.4}},f.q),
              React.createElement("span",{style:{color:T.textDim,fontSize:14,flexShrink:0}},open?"^":"v")
            ),
            open&&React.createElement("div",{style:{padding:"0 16px 14px",fontSize:12,color:T.textSub,lineHeight:1.6}},f.a)
          );
        })
      ),
      React.createElement("div",{style:{textAlign:"center",borderTop:"1px solid "+T.border,paddingTop:20,paddingBottom:20}},
        React.createElement("div",{style:{fontSize:12,color:T.textSub,marginBottom:8}},"2026 Fantasy Draft Pros - All rights reserved"),
        React.createElement("div",{style:{display:"flex",justifyContent:"center",gap:20,marginBottom:10,fontSize:12,color:T.textSub}},React.createElement("span",{style:{cursor:"pointer"}},"Contact"),React.createElement("span",{style:{cursor:"pointer"}},"FAQ"),React.createElement("span",{style:{cursor:"pointer"}},"Help")),
        React.createElement("div",{style:{fontSize:10,color:T.textDim}},"Not affiliated with Sleeper, ESPN, or Yahoo. For entertainment only.")
      )
    ),

    // ════ MY LEAGUE TAB ════
    tab==="league"&&React.createElement("div",{style:{paddingBottom:80}},
      React.createElement("div",{style:{display:"flex",gap:8,overflowX:"auto",padding:"12px 16px",borderBottom:"1px solid "+T.border,scrollbarWidth:"none"}},
        [["power","Power Rankings"],["playoff","Playoff Odds"],["champ","Championship"],["advice","Team Advice"],["roster","Roster Health"],["waiver","Waiver Wire"],["lineup","Lineup"],["rivalry","Rivalry"],["recap","Recap"],["chat","Chat"],["alerts","Alerts"],["leagimport","Import"]].map(function(st){
          var active=leagueSubTab===st[0];
          return React.createElement("button",{key:st[0],onClick:function(){
            setLeagueSubTab(st[0]);
            if(st[0]==="waiver"&&!waiverLoaded){setTimeout(function(){setWaiverLoaded(true);},1400);}
          },style:{padding:"7px 16px",borderRadius:20,border:"1px solid "+(active?T.purple:T.border),background:active?T.purple:"transparent",color:active?"#fff":T.textSub,fontWeight:700,fontSize:12,cursor:"pointer",whiteSpace:"nowrap",flexShrink:0}},st[1]);
        })
      ),

      // POWER RANKINGS
      leagueSubTab==="power"&&React.createElement("div",{style:{padding:"16px"}},
        React.createElement("div",{style:{background:T.bgCard,border:"1px solid "+T.borderPurple,borderRadius:16,padding:16,marginBottom:16}},
          React.createElement("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"}},
            React.createElement("div",null,React.createElement("div",{style:{fontWeight:900,fontSize:22}},"Power Rankings"),React.createElement("div",{style:{fontSize:12,color:T.purple,marginTop:2}},"Powered by FDP Values")),
            React.createElement("div",{style:{display:"flex",gap:8}},React.createElement("button",{style:{padding:"8px 14px",borderRadius:10,border:"1px solid "+T.borderPurple,background:T.purpleDim,color:T.purple,fontWeight:700,fontSize:11,cursor:"pointer"}},"Sync FDP"),React.createElement("button",{style:{padding:"8px 14px",borderRadius:10,border:"1px solid "+T.border,background:"transparent",color:T.textSub,fontWeight:700,fontSize:11,cursor:"pointer"}},"Refresh"))
          )
        ),
        LEAGUE_TEAMS.map(function(team,i){
          return React.createElement("div",{key:team.name,style:{background:T.bgCard,border:"1px solid "+(i===0?T.borderPurple:T.border),borderRadius:14,padding:16,marginBottom:10}},
            React.createElement("div",{style:{display:"flex",alignItems:"flex-start",gap:12,marginBottom:12}},
              React.createElement("div",{style:{width:40,height:40,borderRadius:"50%",background:i===0?T.purple:T.bgInput,border:"2px solid "+(i===0?T.purple:T.border),display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}},React.createElement("span",{style:{fontWeight:900,fontSize:13,color:i===0?"#fff":T.textSub}},"#"+team.rank)),
              React.createElement("div",{style:{flex:1}},React.createElement("div",{style:{fontWeight:800,fontSize:15,marginBottom:2}},team.name),React.createElement("div",{style:{fontSize:11,color:T.textSub}},"Total Value: "+team.totalVal.toLocaleString()))
            ),
            React.createElement("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:12}},
              [["Players",team.players],["Picks",team.picks],["FAAB","$"+team.faab]].map(function(s){return React.createElement("div",{key:s[0],style:{background:T.bgInput,borderRadius:8,padding:"10px 12px"}},React.createElement("div",{style:{fontSize:10,color:T.textSub,marginBottom:2}},s[0]),React.createElement("div",{style:{fontWeight:800,fontSize:18}},s[1]));})
            ),
            React.createElement("button",{style:{width:"100%",padding:"11px",borderRadius:10,border:"none",background:"#2563eb",color:"#fff",fontWeight:700,fontSize:13,cursor:"pointer"}},"View Full Roster")
          );
        })
      ),

      // PLAYOFF ODDS
      leagueSubTab==="playoff"&&React.createElement("div",{style:{padding:"16px"}},
        React.createElement("div",{style:{background:T.bgCard,border:"1px solid "+T.borderPurple,borderRadius:16,padding:"14px 16px",marginBottom:16,display:"flex",justifyContent:"space-between",alignItems:"center"}},
          React.createElement("div",null,React.createElement("div",{style:{fontWeight:900,fontSize:20}},"Playoff Odds"),React.createElement("div",{style:{fontSize:11,color:T.textSub,marginTop:2}},"Based on FDP trade values + schedule")),
          React.createElement("button",{style:{padding:"8px 14px",borderRadius:10,border:"1px solid "+T.border,background:"transparent",color:T.textSub,fontWeight:700,fontSize:11,cursor:"pointer"}},"Export")
        ),
        LEAGUE_TEAMS.map(function(team,i){
          return React.createElement("div",{key:team.name,style:{background:T.bgCard,border:"1px solid "+T.border,borderRadius:14,padding:16,marginBottom:10}},
            React.createElement("div",{style:{display:"flex",alignItems:"center",gap:10,marginBottom:14}},React.createElement("span",{style:{fontWeight:900,fontSize:16,color:T.textDim}},"#"+team.rank),React.createElement("div",null,React.createElement("div",{style:{fontWeight:800,fontSize:15}},team.name),React.createElement("div",{style:{fontSize:11,color:T.textSub}},"Total Value: "+team.totalVal.toLocaleString()))),
            React.createElement("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:14}},
              React.createElement("div",null,React.createElement("div",{style:{fontSize:11,color:T.textSub,marginBottom:4}},"Playoff Odds"),React.createElement("div",{style:{fontWeight:900,fontSize:22,color:T.green,marginBottom:6}},team.playoffOdds+"%"),React.createElement("div",{style:{background:T.border,borderRadius:99,height:5,overflow:"hidden"}},React.createElement("div",{style:{width:team.playoffOdds+"%",height:"100%",background:"#2563eb",borderRadius:99}}))),
              React.createElement("div",null,React.createElement("div",{style:{fontSize:11,color:T.textSub,marginBottom:4}},"Championship Odds"),React.createElement("div",{style:{fontWeight:900,fontSize:22,color:T.cyan,marginBottom:6}},team.champOdds+"%"),React.createElement("div",{style:{background:T.border,borderRadius:99,height:5,overflow:"hidden"}},React.createElement("div",{style:{width:team.champOdds+"%",height:"100%",background:T.gold,borderRadius:99}})))
            ),
            React.createElement("div",null,React.createElement("div",{style:{fontSize:11,color:T.textSub,marginBottom:4}},"Weekly Win Probability"),React.createElement("div",{style:{fontWeight:900,fontSize:22,color:T.cyan,marginBottom:6}},team.weeklyWin+"%"),React.createElement("div",{style:{background:T.border,borderRadius:99,height:5,overflow:"hidden"}},React.createElement("div",{style:{width:team.weeklyWin+"%",height:"100%",background:T.green,borderRadius:99}}))),
            React.createElement("button",{style:{width:"100%",marginTop:12,padding:"11px",borderRadius:10,border:"none",background:"#2563eb",color:"#fff",fontWeight:700,fontSize:13,cursor:"pointer"}},"View Team Strengths")
          );
        })
      ),

      // CHAMPIONSHIP
      leagueSubTab==="champ"&&React.createElement("div",{style:{padding:"16px"}},
        React.createElement("div",{style:{display:"flex",alignItems:"center",gap:12,marginBottom:16}},React.createElement("span",{style:{fontSize:28,color:T.gold}},"T"),React.createElement("div",{style:{fontWeight:900,fontSize:26,lineHeight:1.1}},"Championship Probability")),
        React.createElement("div",{style:{background:T.bgCard,border:"1px solid "+T.borderPurple,borderRadius:16,padding:16,marginBottom:14}},
          React.createElement("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14}},React.createElement("div",null,React.createElement("div",{style:{fontWeight:800,fontSize:16}},"Playoff Odds Simulator"),React.createElement("div",{style:{fontSize:11,color:T.textSub,marginTop:2}},"Armchair Football League 2026")),React.createElement("button",{style:{padding:"8px 14px",borderRadius:10,border:"1px solid "+T.border,background:"transparent",color:T.textSub,fontWeight:700,fontSize:11,cursor:"pointer"}},"Export")),
          React.createElement("div",{style:{marginBottom:12}},React.createElement("div",{style:{fontSize:12,color:T.textSub,marginBottom:6,fontWeight:600}},"Number of Simulations"),React.createElement("select",{value:simCount,onChange:function(e){setSimCount(e.target.value);setSimRan(false);},style:{background:T.bgInput,color:T.text,border:"1px solid "+T.border,borderRadius:10,padding:"10px 14px",fontSize:13,outline:"none",width:"100%"}},["100","500","1,000 (Recommended)","5,000","10,000"].map(function(v){return React.createElement("option",{key:v},v);}))),
          React.createElement("button",{onClick:function(){setSimRunning(true);setSimRan(false);setTimeout(function(){setSimRunning(false);setSimRan(true);},1800);},style:{width:"100%",padding:"13px",borderRadius:12,border:"none",background:"linear-gradient(135deg,"+T.purple+",#5b21b6)",color:"#fff",fontWeight:800,fontSize:14,cursor:"pointer"}},simRunning?"Running simulation...":"Run Simulation"),
          simRan&&React.createElement("div",{style:{marginTop:12}},React.createElement("div",{style:{fontSize:12,fontWeight:600,marginBottom:6,color:T.textSub}},"Save Results"),React.createElement("div",{style:{display:"flex",gap:8}},React.createElement("input",{placeholder:"Add notes (optional)",value:simNotes,onChange:function(e){setSimNotes(e.target.value);},style:{flex:1,background:T.bgInput,color:T.text,border:"1px solid "+T.border,borderRadius:10,padding:"10px 14px",fontSize:12,outline:"none"}}),React.createElement("button",{onClick:function(){setSimSaved(true);},style:{padding:"10px 16px",borderRadius:10,border:"none",background:T.purple,color:"#fff",fontWeight:700,fontSize:12,cursor:"pointer"}},simSaved?"Saved!":"Save")))
        ),
        simRan&&React.createElement("div",null,
          React.createElement("div",{style:{background:"linear-gradient(135deg,#1a1400,#1e1a00)",border:"1px solid "+T.gold+"44",borderRadius:14,padding:16,marginBottom:12}},React.createElement("div",{style:{display:"flex",alignItems:"center",gap:8,marginBottom:8}},React.createElement("span",{style:{fontSize:20,color:T.gold}},"T"),React.createElement("div",{style:{fontWeight:800,fontSize:16,color:T.gold}},"Championship Favorite")),React.createElement("div",{style:{fontSize:11,color:T.textSub,marginBottom:6}},"Most Likely Champion"),React.createElement("div",{style:{fontWeight:900,fontSize:24,color:T.gold,marginBottom:4}},LEAGUE_TEAMS[0].name),React.createElement("div",{style:{fontSize:12,color:T.textSub}},"0-0 - "+LEAGUE_TEAMS[0].makePlayoffs+"% playoff odds")),
          React.createElement("div",{style:{fontWeight:800,fontSize:16,marginBottom:12}},"Simulation Results"),
          LEAGUE_TEAMS.map(function(team,i){
            return React.createElement("div",{key:team.name,style:{background:T.bgCard,border:"1px solid "+T.border,borderRadius:14,padding:16,marginBottom:10}},
              React.createElement("div",{style:{display:"flex",alignItems:"center",gap:12,marginBottom:12}},
                React.createElement("div",{style:{width:40,height:40,borderRadius:"50%",background:i===0?T.purple:T.bgInput,border:"2px solid "+(i===0?T.purple:T.border),display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}},React.createElement("span",{style:{fontWeight:900,fontSize:12,color:i===0?"#fff":T.textSub}},"#"+(i+1))),
                React.createElement("div",{style:{flex:1}},React.createElement("div",{style:{fontWeight:800,fontSize:14}},team.name),React.createElement("div",{style:{fontSize:10,color:T.textSub}},"Record: 0-0 Proj: "+team.projW+" W"))
              ),
              [["Make Playoffs",team.makePlayoffs,T.gold,"#2563eb"],["First Round Bye",team.firstRoundBye,"#f87171","#dc2626"],["Win Championship",team.winChamp,"#f87171","#b91c1c"]].map(function(row){
                return React.createElement("div",{key:row[0],style:{marginBottom:10}},
                  React.createElement("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}},React.createElement("span",{style:{fontSize:12,color:T.textSub}},row[0]),React.createElement("span",{style:{fontWeight:800,fontSize:14,color:row[2]}},row[1]+"%")),
                  React.createElement("div",{style:{background:T.border,borderRadius:99,height:7,overflow:"hidden"}},React.createElement("div",{style:{width:row[1]+"%",height:"100%",background:row[3],borderRadius:99}}))
                );
              })
            );
          })
        )
      ),

      // TEAM ADVICE
      leagueSubTab==="advice"&&React.createElement("div",{style:{padding:"16px"}},
        React.createElement("div",{style:{fontWeight:900,fontSize:22,marginBottom:4}},"Team Strategy Advice"),
        React.createElement("div",{style:{fontSize:12,color:T.textSub,marginBottom:14}},"Select a team to view personalized strategy"),
        React.createElement("div",{style:{display:"flex",gap:6,flexWrap:"wrap",marginBottom:16}},
          LEAGUE_TEAMS.slice(0,6).map(function(team,i){return React.createElement("button",{key:i,onClick:function(){setAdviceTeam(i);},style:{padding:"5px 12px",borderRadius:8,border:"1px solid "+(adviceTeam===i?T.purple:T.border),background:adviceTeam===i?T.purple+"22":"transparent",color:adviceTeam===i?T.purple:T.textSub,fontWeight:700,fontSize:11,cursor:"pointer"}},team.name.split(" ").slice(0,2).join(" "));})
        ),
        (function(){
          var team=LEAGUE_TEAMS[adviceTeam];
          var modes=["COMPETE","COMPETE","NEUTRAL","REBUILD","REBUILD","REBUILD","REBUILD","REBUILD","REBUILD","REBUILD","REBUILD","REBUILD"];
          var modeColors={"COMPETE":T.green,"NEUTRAL":T.gold,"REBUILD":T.red};
          var mode=modes[adviceTeam]||"NEUTRAL";
          var modeColor=modeColors[mode]||T.textSub;
          var tipsMap={
            COMPETE:["Target proven win-now players in trades","Trade future picks for proven vets","Max your FAAB on established contributors","Stream DST/K aggressively","Look for short-term rental trades"],
            NEUTRAL:["Balance youth vs veterans in trades","Hold your draft picks for now","Monitor injury reports closely","Target aging stars at a discount","Build depth at RB and WR"],
            REBUILD:["Trade aging veterans for future picks","Accumulate early-round draft picks","Target rookie receivers with upside","Let young QBs develop","Hoard FAAB for emerging waiver talent"]
          };
          var tips=tipsMap[mode]||tipsMap.NEUTRAL;
          return React.createElement("div",null,
            React.createElement("div",{style:{background:T.bgCard,border:"1px solid "+modeColor+"44",borderRadius:14,padding:16,marginBottom:12}},
              React.createElement("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}},
                React.createElement("div",null,
                  React.createElement("div",{style:{fontWeight:900,fontSize:18}},team.name),
                  React.createElement("div",{style:{fontSize:11,color:T.textSub,marginTop:2}},"Value: "+team.totalVal.toLocaleString())
                ),
                React.createElement("span",{style:{background:modeColor+"22",color:modeColor,border:"1px solid "+modeColor+"44",borderRadius:8,padding:"4px 12px",fontWeight:800,fontSize:12}},mode)
              ),
              React.createElement("div",{style:{fontSize:11,color:T.textSub,fontWeight:700,marginBottom:8,letterSpacing:1}},"STRATEGY TIPS"),
              tips.map(function(tip,ti){
                return React.createElement("div",{key:ti,style:{display:"flex",alignItems:"flex-start",gap:10,marginBottom:8,padding:"8px 12px",background:T.bgInput,borderRadius:8}},
                  React.createElement("span",{style:{color:modeColor,fontSize:14,flexShrink:0,marginTop:1}},"v"),
                  React.createElement("span",{style:{fontSize:13,color:T.text,lineHeight:1.5}},tip)
                );
              }),
              React.createElement("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginTop:12}},
                [["Playoff %",team.playoffOdds+"%",T.green],["Champ %",team.champOdds+"%",T.cyan],["Win %",team.weeklyWin+"%",T.gold]].map(function(s){
                  return React.createElement("div",{key:s[0],style:{background:T.bgInput,borderRadius:8,padding:"10px 8px",textAlign:"center"}},
                    React.createElement("div",{style:{fontSize:10,color:T.textSub,marginBottom:2}},s[0]),
                    React.createElement("div",{style:{fontWeight:900,fontSize:18,color:s[2]}},s[1])
                  );
                })
              )
            )
          );
        })()
      ),

      // ROSTER HEALTH
      leagueSubTab==="roster"&&React.createElement("div",{style:{padding:"16px"}},
        React.createElement("div",{style:{fontWeight:900,fontSize:22,marginBottom:4}},"Roster Health"),
        React.createElement("div",{style:{fontSize:12,color:T.textSub,marginBottom:16}},"Player status and injury report"),
        LEAGUE_TEAMS.slice(0,6).map(function(team,ti){
          var healthPct=Math.max(60,95-(ti*4));
          return React.createElement("div",{key:team.name,style:{background:T.bgCard,border:"1px solid "+T.border,borderRadius:14,padding:16,marginBottom:10}},
            React.createElement("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}},
              React.createElement("div",{style:{fontWeight:800,fontSize:15}},team.name),
              React.createElement("span",{style:{background:healthPct>85?T.green+"22":T.gold+"22",color:healthPct>85?T.green:T.gold,borderRadius:8,padding:"3px 10px",fontWeight:700,fontSize:11}},healthPct+"% Healthy")
            ),
            React.createElement("div",{style:{background:T.border,borderRadius:99,height:6,overflow:"hidden",marginBottom:10}},
              React.createElement("div",{style:{width:healthPct+"%",height:"100%",background:healthPct>85?T.green:T.gold,borderRadius:99}})
            ),
            React.createElement("div",{style:{display:"flex",gap:8,flexWrap:"wrap"}},
              rankedPlayers.slice(ti*3,(ti+1)*3+2).map(function(p){
                var statusList=["Healthy","Healthy","Questionable","Healthy","Healthy"];
                var s=statusList[p.posRank%statusList.length]||"Healthy";
                var sc=s==="Healthy"?T.green:s==="Questionable"?T.gold:T.red;
                return React.createElement("div",{key:p.name,style:{display:"flex",alignItems:"center",gap:6,background:T.bgInput,borderRadius:8,padding:"6px 10px"}},
                  React.createElement(PBadge,{pos:p.pos}),
                  React.createElement("span",{style:{fontSize:11,color:T.text,fontWeight:600}},p.name.split(" ")[1]||p.name),
                  React.createElement("span",{style:{fontSize:9,color:sc,fontWeight:700}},s)
                );
              })
            )
          );
        })
      ),

      // WAIVER WIRE
      leagueSubTab==="waiver"&&React.createElement("div",{style:{padding:"16px"}},
        React.createElement("div",{style:{fontWeight:900,fontSize:22,marginBottom:4}},"Waiver Wire"),
        React.createElement("div",{style:{fontSize:12,color:T.textSub,marginBottom:12}},"Top available free agents"),
        React.createElement("div",{style:{display:"flex",gap:8,marginBottom:12,flexWrap:"wrap"}},
          ["All Positions","QB","RB","WR","TE","DL","LB","DB"].map(function(p){
            return React.createElement("button",{key:p,onClick:function(){setWaiverPos(p);},style:{padding:"6px 14px",borderRadius:20,border:"1px solid "+(waiverPos===p?T.purple:T.border),background:waiverPos===p?T.purple:"transparent",color:waiverPos===p?"#fff":T.textSub,fontWeight:700,fontSize:11,cursor:"pointer"}},p);
          })
        ),
        React.createElement("input",{value:waiverSearch,onChange:function(e){setWaiverSearch(e.target.value);},placeholder:"Search waiver wire...",style:Object.assign({},inpS,{marginBottom:12})}),
        !waiverLoaded
          ?React.createElement("div",{style:{textAlign:"center",padding:"40px",color:T.textSub}},"Loading waiver wire...")
          :rankedPlayers.filter(function(p){
              return (waiverPos==="All Positions"||p.pos===waiverPos)&&
                     (!waiverSearch||p.name.toLowerCase().includes(waiverSearch.toLowerCase()))&&
                     p.rank>20;
            }).slice(0,15).map(function(p){
              return React.createElement("div",{key:p.name,style:{background:T.bgCard,border:"1px solid "+T.border,borderRadius:12,padding:"12px 14px",marginBottom:8,display:"flex",alignItems:"center",gap:10}},
                React.createElement(Avatar,{name:p.name,pos:p.pos,size:34}),
                React.createElement(PBadge,{pos:p.pos,rank:p.posRank}),
                React.createElement("div",{style:{flex:1}},
                  React.createElement("div",{style:{fontWeight:700,fontSize:13}},p.name),
                  React.createElement("div",{style:{fontSize:11,color:T.textSub}},p.team+" | Age "+p.age+" | "+p.note)
                ),
                React.createElement("div",{style:{textAlign:"right"}},
                  React.createElement("div",{style:{fontWeight:800,fontSize:14,color:T.purpleLight}},"$"+p.ffabVal),
                  React.createElement("div",{style:{fontSize:9,color:T.textDim}},p.ag.g+" grade")
                )
              );
            })
      ),

      // LINEUP OPTIMIZER
      leagueSubTab==="lineup"&&React.createElement("div",{style:{padding:"16px"}},
        React.createElement("div",{style:{fontWeight:900,fontSize:22,marginBottom:4}},"Lineup Optimizer"),
        React.createElement("div",{style:{fontSize:12,color:T.textSub,marginBottom:16}},"Set your optimal lineup for this week"),
        React.createElement("div",{style:{display:"flex",gap:6,flexWrap:"wrap",marginBottom:16}},
          LEAGUE_TEAMS.slice(0,6).map(function(t,i){
            return React.createElement("button",{key:i,onClick:function(){setLineupTeam(i);setLineupOptimized(false);},style:{padding:"5px 12px",borderRadius:8,border:"1px solid "+(lineupTeam===i?T.purple:T.border),background:lineupTeam===i?T.purple+"22":"transparent",color:lineupTeam===i?T.purple:T.textSub,fontWeight:700,fontSize:11,cursor:"pointer"}},t.name.split(" ")[0]);
          })
        ),
        React.createElement("button",{onClick:function(){setLineupOptimized(true);},style:{width:"100%",padding:"13px",borderRadius:12,border:"none",background:"linear-gradient(135deg,"+T.purple+",#5b21b6)",color:"#fff",fontWeight:800,fontSize:14,cursor:"pointer",marginBottom:16}},"Optimize Lineup"),
        lineupOptimized&&React.createElement("div",null,
          React.createElement("div",{style:{fontWeight:800,fontSize:16,marginBottom:10}},"Optimal Lineup - "+LEAGUE_TEAMS[lineupTeam].name),
          [["QB","QB"],["RB","RB"],["RB","RB"],["WR","WR"],["WR","WR"],["TE","TE"],["FLEX","RB"],["K","K"],["DST","DST"]].map(function(slot,si){
            var offset=lineupTeam*2;
            var candidates=rankedPlayers.filter(function(p){return p.pos===slot[1];});
            var pl=candidates[si%candidates.length]||candidates[0];
            return pl?React.createElement("div",{key:si,style:{background:T.bgCard,border:"1px solid "+T.border,borderRadius:10,padding:"10px 14px",marginBottom:6,display:"flex",alignItems:"center",gap:10}},
              React.createElement("span",{style:{fontSize:10,color:T.textSub,fontWeight:700,width:36,flexShrink:0}},slot[0]),
              React.createElement(Avatar,{name:pl.name,pos:pl.pos,size:28}),
              React.createElement("div",{style:{flex:1}},React.createElement("div",{style:{fontWeight:700,fontSize:13}},pl.name),React.createElement("div",{style:{fontSize:10,color:T.textSub}},pl.team)),
              React.createElement("div",{style:{fontWeight:800,fontSize:13,color:T.purpleLight}},pl.pts.toFixed(0)+" pts")
            ):null;
          })
        )
      ),

      // RIVALRY
      leagueSubTab==="rivalry"&&React.createElement("div",{style:{padding:"16px"}},
        React.createElement("div",{style:{fontWeight:900,fontSize:22,marginBottom:4}},"Rivalry Analyzer"),
        React.createElement("div",{style:{fontSize:12,color:T.textSub,marginBottom:16}},"Head-to-head matchup breakdown"),
        React.createElement("div",{style:{display:"grid",gridTemplateColumns:"1fr auto 1fr",gap:8,alignItems:"center",marginBottom:20}},
          React.createElement("select",{value:rivalryTeam1,onChange:function(e){setRivalryTeam1(e.target.value);},style:Object.assign({},inpS,{textAlign:"center"})},
            ["All Teams"].concat(leagueTeamNames).map(function(n){return React.createElement("option",{key:n},n);})
          ),
          React.createElement("div",{style:{fontWeight:900,fontSize:14,color:T.textDim,textAlign:"center"}},"VS"),
          React.createElement("select",{value:rivalryTeam2,onChange:function(e){setRivalryTeam2(e.target.value);},style:Object.assign({},inpS,{textAlign:"center"})},
            ["All Teams"].concat(leagueTeamNames).map(function(n){return React.createElement("option",{key:n},n);})
          )
        ),
        (rivalryTeam1!=="All Teams"&&rivalryTeam2!=="All Teams"&&rivalryTeam1!==rivalryTeam2)&&(function(){
          var t1=LEAGUE_TEAMS.find(function(t){return t.name===rivalryTeam1;})||LEAGUE_TEAMS[0];
          var t2=LEAGUE_TEAMS.find(function(t){return t.name===rivalryTeam2;})||LEAGUE_TEAMS[1];
          var winner=t1.totalVal>t2.totalVal?t1:t2;
          return React.createElement("div",null,
            React.createElement("div",{style:{background:T.bgCard,border:"1px solid "+T.borderPurple,borderRadius:14,padding:16}},
              React.createElement("div",{style:{fontWeight:800,fontSize:16,color:T.purple,marginBottom:10}},"Matchup Analysis"),
              [["Total Value",t1.totalVal.toLocaleString(),t2.totalVal.toLocaleString()],["Playoff Odds",t1.playoffOdds+"%",t2.playoffOdds+"%"],["Champ Odds",t1.champOdds+"%",t2.champOdds+"%"],["Players",t1.players,t2.players]].map(function(row){
                return React.createElement("div",{key:row[0],style:{display:"grid",gridTemplateColumns:"1fr auto 1fr",gap:8,alignItems:"center",marginBottom:8}},
                  React.createElement("div",{style:{fontWeight:800,fontSize:14,color:T.text,textAlign:"right"}},row[1]),
                  React.createElement("div",{style:{fontSize:10,color:T.textSub,textAlign:"center",fontWeight:600}},row[0]),
                  React.createElement("div",{style:{fontWeight:800,fontSize:14,color:T.text,textAlign:"left"}},row[2])
                );
              }),
              React.createElement("div",{style:{marginTop:12,padding:"10px 14px",background:T.purple+"18",borderRadius:10,textAlign:"center"}},
                React.createElement("div",{style:{fontSize:12,color:T.textSub,marginBottom:2}},"Edge goes to"),
                React.createElement("div",{style:{fontWeight:900,fontSize:16,color:T.purple}},winner.name)
              )
            )
          );
        })()
      ),

      // WEEKLY RECAP
      leagueSubTab==="recap"&&React.createElement("div",{style:{padding:"16px"}},
        React.createElement("div",{style:{fontWeight:900,fontSize:22,marginBottom:4}},"Weekly Recap"),
        React.createElement("div",{style:{fontSize:12,color:T.textSub,marginBottom:16}},"AI-generated league recap and storylines"),
        React.createElement("div",{style:{display:"flex",gap:8,marginBottom:12}},
          React.createElement("select",{value:recapWeek,onChange:function(e){setRecapWeek(e.target.value);setRecapGenerated(false);setRecapError(false);},style:Object.assign({},inpS,{flex:1})},
            Array.from({length:14},function(_,i){return React.createElement("option",{key:i+1,value:String(i+1)},"Week "+(i+1));})
          ),
          React.createElement("button",{onClick:function(){setRecapGenerated(false);setRecapError(false);setTimeout(function(){setRecapGenerated(true);},1200);},style:{padding:"10px 18px",borderRadius:12,border:"none",background:"linear-gradient(135deg,"+T.purple+",#5b21b6)",color:"#fff",fontWeight:700,fontSize:12,cursor:"pointer"}},"Generate")
        ),
        !recapGenerated&&React.createElement("div",{style:{textAlign:"center",padding:"30px",color:T.textSub,fontSize:13}},"Select a week and generate your recap"),
        recapGenerated&&React.createElement("div",null,
          React.createElement("div",{style:{background:T.bgCard,border:"1px solid "+T.borderPurple,borderRadius:14,padding:16,marginBottom:12}},
            React.createElement("div",{style:{fontWeight:900,fontSize:16,color:T.purple,marginBottom:10}},"Week "+recapWeek+" Recap"),
            React.createElement("div",{style:{fontSize:13,color:T.textSub,lineHeight:1.7,marginBottom:12}},"Week "+recapWeek+" saw "+LEAGUE_TEAMS[0].name+" extend their lead atop the standings with a dominant performance. "+LEAGUE_TEAMS[1].name+" stayed within striking distance, while "+LEAGUE_TEAMS[LEAGUE_TEAMS.length-1].name+" continue to struggle."),
            React.createElement("div",{style:{fontWeight:700,fontSize:13,marginBottom:8}},"Top Performers"),
            rankedPlayers.slice(0,3).map(function(p){
              return React.createElement("div",{key:p.name,style:{display:"flex",alignItems:"center",gap:10,marginBottom:8}},
                React.createElement(Avatar,{name:p.name,pos:p.pos,size:28}),
                React.createElement(PBadge,{pos:p.pos}),
                React.createElement("span",{style:{fontSize:13,fontWeight:700}},p.name),
                React.createElement("span",{style:{fontSize:12,color:T.gold,marginLeft:"auto"}},p.pts.toFixed(0)+" pts")
              );
            })
          )
        )
      ),

      // CHAT
      leagueSubTab==="chat"&&React.createElement("div",{style:{padding:"16px"}},
        React.createElement("div",{style:{fontWeight:900,fontSize:22,marginBottom:4}},"League Chat"),
        React.createElement("div",{style:{fontSize:12,color:T.textSub,marginBottom:12}},"Chat with your leaguemates"),
        React.createElement("div",{style:{background:T.bgCard,border:"1px solid "+T.border,borderRadius:14,padding:12,marginBottom:12,minHeight:200,overflowY:"auto"}},
          chatMessages.length===0
            ?React.createElement("div",{style:{textAlign:"center",padding:"30px",color:T.textDim,fontSize:13}},"No messages yet. Start the conversation!")
            :chatMessages.map(function(m,i){
                return React.createElement("div",{key:i,style:{marginBottom:10}},
                  React.createElement("div",{style:{fontSize:11,color:T.textSub,marginBottom:2}},m.user+" - "+m.time),
                  React.createElement("div",{style:{background:T.bgInput,borderRadius:8,padding:"8px 12px",fontSize:13}},m.text)
                );
              })
        ),
        React.createElement("div",{style:{display:"flex",gap:8}},
          React.createElement("input",{value:chatInput,onChange:function(e){setChatInput(e.target.value);},onKeyDown:function(e){if(e.key==="Enter"&&chatInput.trim()){setChatMessages(function(prev){return prev.concat([{user:"You",text:chatInput,time:"Now"}]);});setChatInput("");}},placeholder:"Type a message...",style:Object.assign({},inpS,{flex:1})}),
          React.createElement("button",{onClick:function(){if(chatInput.trim()){setChatMessages(function(prev){return prev.concat([{user:"You",text:chatInput,time:"Now"}]);});setChatInput("");}},style:{padding:"10px 18px",borderRadius:12,border:"none",background:T.purple,color:"#fff",fontWeight:700,fontSize:12,cursor:"pointer"}},"Send")
        )
      ),

      // ALERTS
      leagueSubTab==="alerts"&&React.createElement("div",{style:{padding:"16px"}},
        React.createElement("div",{style:{fontWeight:900,fontSize:22,marginBottom:4}},"Market Alerts"),
        React.createElement("div",{style:{fontSize:12,color:T.textSub,marginBottom:16}},"Buy low, sell high opportunities"),
        [["Buy Low",rankedPlayers.filter(function(p){return p.age<27&&p.posRank>8&&(p.pos==="RB"||p.pos==="WR");}).slice(0,5),T.green],
         ["Sell High",rankedPlayers.filter(function(p){return p.age>30&&p.tradeVal>0;}).slice(0,5),T.red]
        ].map(function(section){
          return React.createElement("div",{key:section[0],style:{marginBottom:20}},
            React.createElement("div",{style:{fontWeight:800,fontSize:16,marginBottom:10,color:section[2]}},section[0]+" Targets"),
            section[1].map(function(p){
              return React.createElement("div",{key:p.name,style:{background:T.bgCard,border:"1px solid "+T.border,borderRadius:12,padding:"12px 14px",marginBottom:8,display:"flex",alignItems:"center",gap:10}},
                React.createElement(Avatar,{name:p.name,pos:p.pos,size:32}),
                React.createElement(PBadge,{pos:p.pos,rank:p.posRank}),
                React.createElement("div",{style:{flex:1}},
                  React.createElement("div",{style:{fontWeight:700,fontSize:13}},p.name),
                  React.createElement("div",{style:{fontSize:11,color:T.textSub}},p.team+" | Age "+p.age)
                ),
                React.createElement("div",{style:{textAlign:"right"}},
                  React.createElement("div",{style:{fontWeight:800,fontSize:14,color:section[2]}},section[0]==="Buy Low"?"BUY":"SELL"),
                  React.createElement("div",{style:{fontSize:11,color:T.textSub}},"val "+p.tradeVal)
                )
              );
            })
          );
        })
      ),

      // LEAGUE IMPORT (sub-tab)
      leagueSubTab==="leagimport"&&React.createElement("div",{style:{padding:"16px"}},
        React.createElement("div",{style:{fontWeight:900,fontSize:22,marginBottom:4}},"Import League"),
        React.createElement("div",{style:{fontSize:12,color:T.textSub,marginBottom:16}},"Connect your Sleeper league for live data"),
        React.createElement("div",{style:{background:T.bgCard,border:"1px solid "+T.borderPurple,borderRadius:16,padding:20}},
          React.createElement("div",{style:{display:"flex",gap:8,marginBottom:12}},
            React.createElement("input",{value:leagueImportUser,onChange:function(e){setLeagueImportUser(e.target.value);},placeholder:"Sleeper username",style:Object.assign({},inpS,{flex:1})}),
            React.createElement("button",{onClick:doLeagueImport,style:{padding:"10px 18px",borderRadius:12,border:"none",background:T.purple,color:"#fff",fontWeight:700,fontSize:12,cursor:"pointer"}},"Import")
          ),
          leagueImportStatus==="loading"&&React.createElement("div",{style:{textAlign:"center",padding:"20px",color:T.textSub}},"Loading..."),
          leagueImportStatus==="error"&&React.createElement("div",{style:{padding:"10px 14px",background:T.red+"15",borderRadius:10,color:T.red,fontSize:12}},leagueImportErr),
          leagueImportStatus==="success"&&leagueImportData&&React.createElement("div",null,
            React.createElement("div",{style:{fontWeight:700,fontSize:15,marginBottom:8}},leagueImportData.username+"'s Leagues"),
            leagueImportData.leagues.slice(0,5).map(function(lg){
              return React.createElement("div",{key:lg.league_id,style:{background:T.bgInput,borderRadius:10,padding:"12px 14px",marginBottom:8}},
                React.createElement("div",{style:{fontWeight:700,fontSize:13}},lg.name),
                React.createElement("div",{style:{fontSize:11,color:T.textSub,marginTop:2}},lg.total_rosters+" teams")
              );
            })
          )
        )
      )
    ),

    // ════ RANKINGS TAB ════
    tab==="rankings"&&React.createElement("div",{style:{paddingBottom:80}},
      React.createElement("div",{style:{display:"flex",gap:8,overflowX:"auto",padding:"12px 16px",borderBottom:"1px solid "+T.border,scrollbarWidth:"none"}},
        [["all","All Players"],["position","By Position"],["idp","IDP"],["watchlist","Watchlist"],["market","Market"],["draft","Draft Kit"],["compare","Compare"]].map(function(st){
          var active=rankSubTab===st[0];
          return React.createElement("button",{key:st[0],onClick:function(){setRankSubTab(st[0]);},style:{padding:"7px 16px",borderRadius:20,border:"1px solid "+(active?T.purple:T.border),background:active?T.purple:"transparent",color:active?"#fff":T.textSub,fontWeight:700,fontSize:12,cursor:"pointer",whiteSpace:"nowrap",flexShrink:0}},st[1]);
        })
      ),

      // ALL PLAYERS
      rankSubTab==="all"&&React.createElement("div",{style:{padding:"16px"}},
        React.createElement("div",{style:{fontWeight:900,fontSize:22,marginBottom:4}},"2026 Dynasty Rankings"),
        React.createElement("div",{style:{fontSize:12,color:T.textSub,marginBottom:12}},"Full player rankings with VBD values"),
        React.createElement("div",{style:{display:"flex",gap:8,marginBottom:12,flexWrap:"wrap"}},
          ALL_POSITIONS.map(function(p){return React.createElement("button",{key:p,onClick:function(){setPosFilter(p);},style:{padding:"5px 12px",borderRadius:20,border:"1px solid "+(posFilter===p?T.purple:T.border),background:posFilter===p?T.purple:"transparent",color:posFilter===p?"#fff":T.textSub,fontWeight:700,fontSize:11,cursor:"pointer"}},p);})
        ),
        React.createElement("input",{value:rankSearch,onChange:function(e){setRankSearch(e.target.value);},placeholder:"Search players...",style:Object.assign({},inpS,{marginBottom:12})}),
        rankedPlayers.filter(function(p){
          return (posFilter==="ALL"||p.pos===posFilter)&&(!rankSearch||p.name.toLowerCase().includes(rankSearch.toLowerCase()));
        }).filter(function(p){return !user||user.isPro||p.rank<=FREE_RANK_LIMIT;}).map(function(p){
          return React.createElement("div",{key:p.name,style:{background:T.bgCard,border:"1px solid "+(watchlist.indexOf(p.name)!==-1?T.purple:T.border),borderRadius:12,padding:"10px 14px",marginBottom:6,display:"flex",alignItems:"center",gap:10}},
            React.createElement("span",{style:{fontWeight:800,fontSize:12,color:T.textDim,width:24,flexShrink:0}},"#"+p.rank),
            React.createElement(Avatar,{name:p.name,pos:p.pos,size:32}),
            React.createElement("div",{style:{flex:1,minWidth:0}},
              React.createElement("div",{style:{display:"flex",alignItems:"center",gap:6}},
                React.createElement("span",{style:{fontWeight:700,fontSize:13,color:T.text}},p.name),
                React.createElement(PBadge,{pos:p.pos,rank:p.posRank})
              ),
              React.createElement("div",{style:{fontSize:10,color:T.textSub,marginTop:1}},p.team+(p.age?" | Age "+p.age:"")+" | "+p.note)
            ),
            React.createElement("div",{style:{textAlign:"right",flexShrink:0}},
              React.createElement("div",{style:{fontWeight:800,fontSize:14,color:T.purpleLight}},p.tradeVal),
              React.createElement("div",{style:{fontSize:9,color:p.ag.c,fontWeight:700}},p.ag.g)
            ),
            React.createElement("button",{onClick:function(){setWatchlist(function(w){return w.indexOf(p.name)!==-1?w.filter(function(x){return x!==p.name;}):[p.name].concat(w);});},style:{background:"none",border:"none",cursor:"pointer",color:watchlist.indexOf(p.name)!==-1?T.gold:T.textDim,fontSize:16,flexShrink:0,padding:"0 2px"}},"*")
          );
        }),
        (!user||!user.isPro)&&React.createElement("div",{style:{background:T.purpleDim,border:"1px solid "+T.purple+"44",borderRadius:14,padding:"16px",textAlign:"center",marginTop:8}},
          React.createElement("div",{style:{fontWeight:700,fontSize:14,color:T.purpleLight,marginBottom:6}},"Unlock Full Rankings"),
          React.createElement("div",{style:{fontSize:12,color:T.textSub,marginBottom:12}},"See all 200+ players with Pro"),
          React.createElement("button",{onClick:function(){setAuthMode("signup");setShowAuth(true);},style:{padding:"10px 24px",borderRadius:12,border:"none",background:"linear-gradient(135deg,"+T.purple+",#5b21b6)",color:"#fff",fontWeight:700,fontSize:13,cursor:"pointer"}},"Start Free Trial")
        )
      ),

      // BY POSITION
      rankSubTab==="position"&&React.createElement("div",{style:{padding:"16px"}},
        React.createElement("div",{style:{fontWeight:900,fontSize:22,marginBottom:12}},"Rankings by Position"),
        React.createElement("div",{style:{display:"flex",gap:6,flexWrap:"wrap",marginBottom:12}},
          ["QB","RB","WR","TE","K","DST"].map(function(p){
            return React.createElement("button",{key:p,onClick:function(){setRankPos(p);},style:{padding:"6px 16px",borderRadius:20,border:"1px solid "+(rankPos===p?(POS_COLORS[p]||T.purple):T.border),background:rankPos===p?(POS_COLORS[p]||T.purple)+"22":"transparent",color:rankPos===p?(POS_COLORS[p]||T.purple):T.textSub,fontWeight:700,fontSize:12,cursor:"pointer"}},p);
          })
        ),
        rankedPlayers.filter(function(p){return p.pos===rankPos;}).filter(function(p){return !user||user.isPro||p.posRank<=FREE_RANK_LIMIT;}).map(function(p){
          return React.createElement("div",{key:p.name,style:{background:T.bgCard,border:"1px solid "+T.border,borderRadius:12,padding:"10px 14px",marginBottom:6,display:"flex",alignItems:"center",gap:10}},
            React.createElement("span",{style:{fontWeight:800,fontSize:12,color:POS_COLORS[rankPos]||T.purple,width:28,flexShrink:0}},rankPos+(p.posRank)),
            React.createElement(Avatar,{name:p.name,pos:p.pos,size:32}),
            React.createElement("div",{style:{flex:1}},
              React.createElement("div",{style:{fontWeight:700,fontSize:13}},p.name),
              React.createElement("div",{style:{fontSize:10,color:T.textSub}},p.team+(p.age?" | Age "+p.age:""))
            ),
            React.createElement("div",{style:{textAlign:"right"}},
              React.createElement("div",{style:{fontWeight:800,fontSize:14,color:T.purpleLight}},p.pts.toFixed(0)+" pts"),
              React.createElement("span",{style:{background:p.tier.c+"22",color:p.tier.c,borderRadius:4,padding:"1px 6px",fontSize:9,fontWeight:700}},"T"+p.tier.t)
            )
          );
        })
      ),

      // IDP
      rankSubTab==="idp"&&React.createElement("div",{style:{padding:"16px"}},
        React.createElement("div",{style:{fontWeight:900,fontSize:22,marginBottom:12}},"IDP Rankings"),
        React.createElement("div",{style:{display:"flex",gap:6,flexWrap:"wrap",marginBottom:12}},
          ["DL","LB","DB"].map(function(p){
            return React.createElement("button",{key:p,onClick:function(){setRankIdpPos(p);},style:{padding:"6px 16px",borderRadius:20,border:"1px solid "+(rankIdpPos===p?(POS_COLORS[p]||T.purple):T.border),background:rankIdpPos===p?(POS_COLORS[p]||T.purple)+"22":"transparent",color:rankIdpPos===p?(POS_COLORS[p]||T.purple):T.textSub,fontWeight:700,fontSize:12,cursor:"pointer"}},p);
          })
        ),
        rankedPlayers.filter(function(p){return p.pos===rankIdpPos;}).map(function(p){
          return React.createElement("div",{key:p.name,style:{background:T.bgCard,border:"1px solid "+T.border,borderRadius:12,padding:"10px 14px",marginBottom:6,display:"flex",alignItems:"center",gap:10}},
            React.createElement("span",{style:{fontWeight:800,fontSize:12,color:POS_COLORS[rankIdpPos]||T.purple,width:28,flexShrink:0}},rankIdpPos+(p.posRank)),
            React.createElement(Avatar,{name:p.name,pos:p.pos,size:32}),
            React.createElement("div",{style:{flex:1}},
              React.createElement("div",{style:{fontWeight:700,fontSize:13}},p.name),
              React.createElement("div",{style:{fontSize:10,color:T.textSub}},p.team+(p.age?" | Age "+p.age:"")+" | "+p.note)
            ),
            React.createElement("div",{style:{textAlign:"right"}},
              React.createElement("div",{style:{fontWeight:800,fontSize:14,color:T.purpleLight}},p.tradeVal),
              React.createElement("div",{style:{fontSize:9,color:p.ag.c,fontWeight:700}},p.ag.g)
            )
          );
        })
      ),

      // WATCHLIST
      rankSubTab==="watchlist"&&React.createElement("div",{style:{padding:"16px"}},
        React.createElement("div",{style:{fontWeight:900,fontSize:22,marginBottom:4}},"My Watchlist"),
        React.createElement("div",{style:{fontSize:12,color:T.textSub,marginBottom:16}},"Players you're monitoring"),
        watchlist.length===0
          ?React.createElement("div",{style:{textAlign:"center",padding:"40px",color:T.textSub,fontSize:13}},"No players on watchlist. Tap the star icon on any player to add them.")
          :rankedPlayers.filter(function(p){return watchlist.indexOf(p.name)!==-1;}).map(function(p){
              return React.createElement("div",{key:p.name,style:{background:T.bgCard,border:"1px solid "+T.borderPurple,borderRadius:12,padding:"10px 14px",marginBottom:8,display:"flex",alignItems:"center",gap:10}},
                React.createElement(Avatar,{name:p.name,pos:p.pos,size:32}),
                React.createElement(PBadge,{pos:p.pos,rank:p.posRank}),
                React.createElement("div",{style:{flex:1}},
                  React.createElement("div",{style:{fontWeight:700,fontSize:13}},p.name),
                  React.createElement("div",{style:{fontSize:10,color:T.textSub}},p.team+" | val "+p.tradeVal)
                ),
                React.createElement("button",{onClick:function(){setWatchlist(function(w){return w.filter(function(x){return x!==p.name;});});},style:{background:"none",border:"none",cursor:"pointer",color:T.gold,fontSize:16}},"*")
              );
            })
      ),

      // MARKET
      rankSubTab==="market"&&React.createElement("div",{style:{padding:"16px"}},
        React.createElement("div",{style:{fontWeight:900,fontSize:22,marginBottom:4}},"Trade Market"),
        React.createElement("div",{style:{fontSize:12,color:T.textSub,marginBottom:12}},"Best buy low and sell high targets"),
        React.createElement("div",{style:{display:"flex",gap:6,marginBottom:12}},
          [["buylow","Buy Low"],["sellhigh","Sell High"]].map(function(f){
            return React.createElement("button",{key:f[0],onClick:function(){setMarketFilter(f[0]);},style:{padding:"6px 14px",borderRadius:20,border:"1px solid "+(marketFilter===f[0]?T.purple:T.border),background:marketFilter===f[0]?T.purple:"transparent",color:marketFilter===f[0]?"#fff":T.textSub,fontWeight:700,fontSize:12,cursor:"pointer"}},f[1]);
          })
        ),
        rankedPlayers.filter(function(p){
          if(marketFilter==="buylow") return p.age<27&&p.posRank>6&&(p.pos==="RB"||p.pos==="WR"||p.pos==="QB");
          return p.age>30&&p.tradeVal>0;
        }).slice(0,12).map(function(p){
          return React.createElement("div",{key:p.name,style:{background:T.bgCard,border:"1px solid "+T.border,borderRadius:12,padding:"12px 14px",marginBottom:8,display:"flex",alignItems:"center",gap:10}},
            React.createElement(Avatar,{name:p.name,pos:p.pos,size:32}),
            React.createElement(PBadge,{pos:p.pos,rank:p.posRank}),
            React.createElement("div",{style:{flex:1}},
              React.createElement("div",{style:{fontWeight:700,fontSize:13}},p.name),
              React.createElement("div",{style:{fontSize:11,color:T.textSub}},p.team+" | Age "+p.age+" | "+p.note)
            ),
            React.createElement("div",{style:{textAlign:"right"}},
              React.createElement("div",{style:{fontWeight:800,fontSize:14,color:marketFilter==="buylow"?T.green:T.red}},marketFilter==="buylow"?"BUY":"SELL"),
              React.createElement("div",{style:{fontSize:11,color:T.textSub}},"val "+p.tradeVal)
            )
          );
        })
      ),

      // DRAFT KIT
      rankSubTab==="draft"&&React.createElement("div",{style:{padding:"16px"}},
        React.createElement("div",{style:{fontWeight:900,fontSize:22,marginBottom:4}},"Draft Kit"),
        React.createElement("div",{style:{fontSize:12,color:T.textSub,marginBottom:16}},"Live draft board with pick tracking"),
        React.createElement("div",{style:{display:"flex",gap:8,marginBottom:12}},
          React.createElement("input",{value:draftKitSearch,onChange:function(e){setDraftKitSearch(e.target.value);},placeholder:"Search players...",style:Object.assign({},inpS,{flex:1})}),
          React.createElement("select",{value:draftKitPos,onChange:function(e){setDraftKitPos(e.target.value);},style:{background:T.bgInput,color:T.text,border:"1px solid "+T.border,borderRadius:10,padding:"10px 14px",fontSize:12,outline:"none"}},
            ["All Positions","QB","RB","WR","TE"].map(function(p){return React.createElement("option",{key:p},p);})
          )
        ),
        rankedPlayers.filter(function(p){
          return (draftKitPos==="All Positions"||p.pos===draftKitPos)&&(!draftKitSearch||p.name.toLowerCase().includes(draftKitSearch.toLowerCase()));
        }).slice(0,30).map(function(p){
          var isDrafted=drafted.indexOf(p.name)!==-1;
          return React.createElement("div",{key:p.name,style:{background:T.bgCard,border:"1px solid "+T.border,borderRadius:10,padding:"10px 14px",marginBottom:5,display:"flex",alignItems:"center",gap:10,opacity:isDrafted?0.4:1}},
            React.createElement("span",{style:{fontWeight:700,fontSize:11,color:T.textDim,width:22,flexShrink:0}},"#"+p.rank),
            React.createElement(Avatar,{name:p.name,pos:p.pos,size:28}),
            React.createElement(PBadge,{pos:p.pos,rank:p.posRank}),
            React.createElement("div",{style:{flex:1}},
              React.createElement("div",{style:{fontWeight:700,fontSize:12,color:isDrafted?T.textDim:T.text}},p.name),
              React.createElement("div",{style:{fontSize:10,color:T.textSub}},p.team+(p.age?" | Age "+p.age:""))
            ),
            React.createElement("button",{onClick:function(){setDrafted(function(d){return isDrafted?d.filter(function(x){return x!==p.name;}):[p.name].concat(d);});},style:{padding:"5px 12px",borderRadius:8,border:"1px solid "+(isDrafted?T.border:T.purple),background:isDrafted?"transparent":T.purple,color:isDrafted?T.textDim:"#fff",fontWeight:700,fontSize:11,cursor:"pointer"}},isDrafted?"Undraft":"Draft")
          );
        })
      ),

      // COMPARE
      rankSubTab==="compare"&&React.createElement("div",{style:{padding:"16px"}},
        React.createElement("div",{style:{fontWeight:900,fontSize:22,marginBottom:4}},"Player Comparison"),
        React.createElement("div",{style:{fontSize:12,color:T.textSub,marginBottom:16}},"Compare two players head-to-head"),
        React.createElement("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:20}},
          [[compareS1,setCompareS1,compareP1,setCompareP1,"Player 1"],[compareS2,setCompareS2,compareP2,setCompareP2,"Player 2"]].map(function(col,ci){
            return React.createElement("div",{key:ci,style:{position:"relative"}},
              React.createElement("input",{value:col[0],onChange:function(e){col[1](e.target.value);col[3](null);},placeholder:col[4],style:Object.assign({},inpS,{textAlign:"center"})}),
              col[0]&&!col[2]&&React.createElement("div",{style:{position:"absolute",top:"calc(100% + 4px)",left:0,right:0,zIndex:200,background:T.bgCard,border:"1px solid "+T.borderPurple,borderRadius:10,overflow:"hidden"}},
                rankedPlayers.filter(function(p){return p.name.toLowerCase().includes(col[0].toLowerCase());}).slice(0,4).map(function(p){
                  return React.createElement("button",{key:p.name,onClick:function(){col[3](p);col[1](p.name);},style:{display:"flex",alignItems:"center",gap:8,width:"100%",background:"none",border:"none",borderBottom:"1px solid "+T.border,padding:"8px 12px",cursor:"pointer",textAlign:"left"}},
                    React.createElement(Avatar,{name:p.name,pos:p.pos,size:24}),
                    React.createElement(PBadge,{pos:p.pos}),
                    React.createElement("span",{style:{fontSize:12,fontWeight:600}},p.name)
                  );
                })
              )
            );
          })
        ),
        compareP1&&compareP2&&React.createElement("div",null,
          React.createElement("div",{style:{background:T.bgCard,border:"1px solid "+T.borderPurple,borderRadius:14,padding:16}},
            React.createElement("div",{style:{display:"grid",gridTemplateColumns:"1fr auto 1fr",gap:8,alignItems:"center",marginBottom:16}},
              React.createElement("div",{style:{textAlign:"center"}},React.createElement(Avatar,{name:compareP1.name,pos:compareP1.pos,size:44}),React.createElement("div",{style:{fontWeight:800,fontSize:13,marginTop:4}},compareP1.name),React.createElement(PBadge,{pos:compareP1.pos,rank:compareP1.posRank})),
              React.createElement("div",{style:{fontWeight:900,fontSize:14,color:T.textDim}},"VS"),
              React.createElement("div",{style:{textAlign:"center"}},React.createElement(Avatar,{name:compareP2.name,pos:compareP2.pos,size:44}),React.createElement("div",{style:{fontWeight:800,fontSize:13,marginTop:4}},compareP2.name),React.createElement(PBadge,{pos:compareP2.pos,rank:compareP2.posRank}))
            ),
            [["Trade Value",compareP1.tradeVal,compareP2.tradeVal],["Proj Pts",compareP1.pts,compareP2.pts],["Age",compareP1.age,compareP2.age]].map(function(row){
              var winner=row[0]==="Age"?(row[1]<row[2]?0:1):(row[1]>row[2]?0:1);
              return React.createElement("div",{key:row[0],style:{display:"grid",gridTemplateColumns:"1fr auto 1fr",gap:8,alignItems:"center",marginBottom:10}},
                React.createElement("div",{style:{fontWeight:800,fontSize:16,color:winner===0?T.green:T.text,textAlign:"right"}},row[1]),
                React.createElement("div",{style:{fontSize:10,color:T.textSub,textAlign:"center",fontWeight:600}},row[0]),
                React.createElement("div",{style:{fontWeight:800,fontSize:16,color:winner===1?T.green:T.text,textAlign:"left"}},row[2])
              );
            })
          )
        )
      )
    ),

    // ════ IMPORT TAB ════
    tab==="import"&&React.createElement("div",{style:{padding:"16px",paddingBottom:80}},
      React.createElement("div",{style:{fontWeight:900,fontSize:24,marginBottom:4}},"League Import"),
      React.createElement("div",{style:{fontSize:12,color:T.textSub,marginBottom:16}},"Import your roster from any platform"),
      React.createElement("div",{style:{display:"flex",gap:6,flexWrap:"wrap",marginBottom:20}},
        [["sleeper","Sleeper"],["espn","ESPN"],["yahoo","Yahoo"],["mfl","MFL"],["manual","Manual"]].map(function(t){
          return React.createElement("button",{key:t[0],onClick:function(){setImpTab(t[0]);setImpStatus(null);setImpErr("");},style:{padding:"7px 16px",borderRadius:20,border:"1px solid "+(impTab===t[0]?T.purple:T.border),background:impTab===t[0]?T.purple:"transparent",color:impTab===t[0]?"#fff":T.textSub,fontWeight:700,fontSize:12,cursor:"pointer"}},t[1]);
        })
      ),
      impTab==="sleeper"&&React.createElement("div",null,
        React.createElement("div",{style:{background:T.bgCard,border:"1px solid "+T.borderPurple,borderRadius:16,padding:20,marginBottom:16}},
          React.createElement("div",{style:{fontWeight:800,fontSize:16,marginBottom:4}},"Import from Sleeper"),
          React.createElement("div",{style:{fontSize:12,color:T.textSub,marginBottom:16}},"Enter your Sleeper username to sync your roster"),
          React.createElement("div",{style:{display:"flex",gap:8,marginBottom:12}},
            React.createElement("input",{value:slUser,onChange:function(e){setSlUser(e.target.value);},placeholder:"Sleeper username",style:Object.assign({},inpS,{flex:1})}),
            React.createElement("button",{onClick:importSleeper,style:{padding:"10px 18px",borderRadius:12,border:"none",background:T.purple,color:"#fff",fontWeight:700,fontSize:12,cursor:"pointer"}},"Sync")
          ),
          impStatus==="loading"&&React.createElement("div",{style:{textAlign:"center",padding:"20px",color:T.textSub}},"Loading roster..."),
          impStatus==="error"&&React.createElement("div",{style:{padding:"10px 14px",background:T.red+"15",borderRadius:10,color:T.red,fontSize:12,marginBottom:8}},impErr),
          impStatus==="success"&&impData&&React.createElement("div",null,
            React.createElement("div",{style:{background:T.bgInput,borderRadius:10,padding:"12px 14px",marginBottom:12}},
              React.createElement("div",{style:{fontWeight:700,fontSize:14}},impData.username+"'s Roster"),
              React.createElement("div",{style:{fontSize:11,color:T.textSub,marginTop:2}},impData.leagueName+" | "+impData.totalTeams+" teams | "+impData.scoringFormat)
            ),
            React.createElement("div",{style:{fontWeight:700,fontSize:14,marginBottom:8}},"Your Players"),
            impRoster.slice(0,20).map(function(p){
              return React.createElement("div",{key:p.name,style:{background:T.bgCard,border:"1px solid "+T.border,borderRadius:10,padding:"10px 14px",marginBottom:6,display:"flex",alignItems:"center",gap:10}},
                React.createElement(Avatar,{name:p.name,pos:p.pos,size:28}),
                React.createElement(PBadge,{pos:p.pos}),
                React.createElement("div",{style:{flex:1}},
                  React.createElement("div",{style:{fontWeight:700,fontSize:12}},p.name),
                  React.createElement("div",{style:{fontSize:10,color:T.textSub}},p.team||(p.rank!=="—"?"#"+p.rank:"Unranked"))
                ),
                React.createElement("span",{style:{fontWeight:700,fontSize:12,color:T.purpleLight}},p.tradeVal||"—")
              );
            })
          )
        )
      ),
      (impTab==="espn"||impTab==="yahoo"||impTab==="mfl")&&React.createElement("div",null,
        React.createElement("div",{style:{background:T.bgCard,border:"1px solid "+T.border,borderRadius:16,padding:20}},
          React.createElement("div",{style:{fontWeight:800,fontSize:16,marginBottom:4}},"Import from "+impTab.toUpperCase()),
          React.createElement("div",{style:{fontSize:12,color:T.textSub,marginBottom:16}},"Enter your league ID to connect"),
          React.createElement("div",{style:{display:"flex",gap:8,marginBottom:16}},
            React.createElement("input",{value:impTab==="mfl"?mflId:espnId,onChange:function(e){impTab==="mfl"?setMflId(e.target.value):setEspnId(e.target.value);},placeholder:impTab.toUpperCase()+" League ID",style:Object.assign({},inpS,{flex:1})}),
            React.createElement("button",{onClick:function(){alert(impTab.toUpperCase()+" import coming soon!");},style:{padding:"10px 18px",borderRadius:12,border:"none",background:T.purple,color:"#fff",fontWeight:700,fontSize:12,cursor:"pointer"}},"Connect")
          ),
          React.createElement("div",{style:{background:T.bgInput,borderRadius:10,padding:"12px 14px",fontSize:12,color:T.textSub,lineHeight:1.6}},"To find your "+impTab.toUpperCase()+" League ID: open your league and look for the league ID in the URL.")
        )
      ),
      impTab==="manual"&&React.createElement("div",null,
        React.createElement("div",{style:{background:T.bgCard,border:"1px solid "+T.border,borderRadius:16,padding:20}},
          React.createElement("div",{style:{fontWeight:800,fontSize:16,marginBottom:4}},"Manual Roster Entry"),
          React.createElement("div",{style:{fontSize:12,color:T.textSub,marginBottom:14}},"Paste player names, one per line"),
          React.createElement("textarea",{value:manRaw,onChange:function(e){setManRaw(e.target.value);},placeholder:"Saquon Barkley\nJa'Marr Chase\nLamar Jackson\n...",rows:8,style:{background:T.bgInput,color:T.text,border:"1px solid "+T.border,borderRadius:10,padding:"12px 14px",fontSize:13,outline:"none",width:"100%",boxSizing:"border-box",resize:"vertical",fontFamily:"inherit",lineHeight:1.6}}),
          React.createElement("button",{onClick:function(){
            var names=manRaw.split("\n").map(function(n){return n.trim();}).filter(Boolean);
            var matched=names.map(function(name){return rankedPlayers.find(function(p){return p.name.toLowerCase().includes(name.toLowerCase());})||{name:name,pos:"?",team:"?",rank:"—",vbd:0,tradeVal:0,ag:{g:"?",c:"#888"},tier:{t:"?",c:"#888"}};});
            setManMatched(matched);
          },style:{width:"100%",marginTop:12,padding:"12px",borderRadius:12,border:"none",background:"linear-gradient(135deg,"+T.purple+",#5b21b6)",color:"#fff",fontWeight:700,fontSize:13,cursor:"pointer"}},"Match Players"),
          manMatched.length>0&&React.createElement("div",{style:{marginTop:16}},
            React.createElement("div",{style:{fontWeight:700,fontSize:14,marginBottom:8}},manMatched.length+" Players Matched"),
            manMatched.map(function(p){
              return React.createElement("div",{key:p.name,style:{background:T.bgInput,borderRadius:8,padding:"8px 12px",marginBottom:5,display:"flex",alignItems:"center",gap:8}},
                React.createElement(PBadge,{pos:p.pos}),
                React.createElement("span",{style:{flex:1,fontSize:12,fontWeight:600}},p.name),
                React.createElement("span",{style:{fontSize:11,color:T.purpleLight,fontWeight:700}},p.tradeVal||"—")
              );
            })
          )
        )
      )
    )
  );
}
