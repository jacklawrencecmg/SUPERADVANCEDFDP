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

const SLEEPER_IDS={"Lamar Jackson":"4881","Josh Allen":"4984","Jalen Hurts":"6770","Patrick Mahomes":"4358","Jayden Daniels":"10229","Joe Burrow":"6904","C.J. Stroud":"10208","Caleb Williams":"10854","Baker Mayfield":"4381","Bo Nix":"10855","Drake Maye":"11565","Anthony Richardson":"10215","Jordan Love":"5892","Kyler Murray":"4663","Justin Fields":"7547","Justin Herbert":"6740","Trevor Lawrence":"7527","Tua Tagovailoa":"6801","Brock Purdy":"9226","Bryce Young":"10213","Sam Darnold":"4017","Saquon Barkley":"4866","Bijan Robinson":"10216","Jahmyr Gibbs":"10233","De'Von Achane":"10234","Breece Hall":"7553","Christian McCaffrey":"4034","Kyren Williams":"8155","Derrick Henry":"1689","Jonathan Taylor":"7528","Josh Jacobs":"5012","Ashton Jeanty":"11568","Omarion Hampton":"11569","Kenneth Walker III":"8138","James Cook":"8131","Rhamondre Stevenson":"7990","Travis Etienne Jr.":"7547","Isiah Pacheco":"8151","Joe Mixon":"3163","Tony Pollard":"5036","Rachaad White":"8154","Jaylen Warren":"8162","Tank Bigsby":"10224","Zonovan Knight":"8161","Blake Corum":"10863","Kimani Vidal":"10232","Braelon Allen":"10862","Zach Charbonnet":"10226","Keaton Mitchell":"10222","Ja'Marr Chase":"7564","Justin Jefferson":"6794","CeeDee Lamb":"6786","Amon-Ra St. Brown":"7561","Puka Nacua":"10228","A.J. Brown":"4988","Brandon Aiyuk":"7571","Tee Higgins":"6813","Drake London":"8119","Garrett Wilson":"8122","Tyreek Hill":"3374","DK Metcalf":"5844","Rashee Rice":"10225","Marvin Harrison Jr.":"10856","Tetairoa McMillan":"11575","Travis Hunter":"11576","Rome Odunze":"10865","Jaylen Waddle":"7573","Chris Olave":"7578","George Pickens":"8148","Jaxon Smith-Njigba":"10227","Malik Nabers":"10858","Zay Flowers":"10219","Jordan Addison":"10218","Josh Downs":"10221","Ladd McConkey":"10859","DeVonta Smith":"6820","Mike Evans":"2133","Xavier Worthy":"10872","Tank Dell":"10223","Kayshon Boutte":"8123","Keon Coleman":"10868","Tre Tucker":"10231","Matthew Golden":"10873","Brian Thomas Jr.":"10869","D.J. Moore":"5001","Davante Adams":"3294","Deebo Samuel":"6813","Brock Bowers":"10857","Trey McBride":"8145","Sam LaPorta":"10230","Mark Andrews":"4892","Travis Kelce":"2374","Tyler Warren":"11583","Dallas Goedert":"5893","T.J. Hockenson":"5122","David Njoku":"4037","Jake Ferguson":"8130","Brenton Strange":"10220","Myles Garrett":"2449","Micah Parsons":"7552","Aidan Hutchinson":"8112","T.J. Watt":"5927","Nick Bosa":"5849","Maxx Crosby":"5955","Chris Jones":"4068","Brian Burns":"6783","Jalen Carter":"10212","Dexter Lawrence":"5920","Will Anderson Jr.":"10215","Kyle Hamilton":"8113","Derwin James":"3992","Sauce Gardner":"8114","Patrick Surtain II":"7554","Antoine Winfield Jr.":"7543","Minkah Fitzpatrick":"4683","Devon Witherspoon":"10217","Roquan Smith":"6130","Fred Warner":"4982","T.J. Edwards":"5886","Patrick Queen":"6797","Foyesade Oluokun":"5875","Zaire Franklin":"5929"};
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
  // Additional QBs
  {name:"Justin Herbert",pos:"QB",age:28,team:"LAC",proj:{PPR:348,Half:348,Std:348},adp:7.2,note:"4,200 yds 30 TD"},
  {name:"Trevor Lawrence",pos:"QB",age:27,team:"JAX",proj:{PPR:355,Half:355,Std:355},adp:6.5,note:"4,100 yds 30 TD"},
  {name:"Tua Tagovailoa",pos:"QB",age:28,team:"MIA",proj:{PPR:342,Half:342,Std:342},adp:8.1,note:"3,900 yds 28 TD"},
  {name:"Brock Purdy",pos:"QB",age:27,team:"SF",proj:{PPR:338,Half:338,Std:338},adp:8.6,note:"4,000 yds 27 TD"},
  {name:"Matthew Stafford",pos:"QB",age:38,team:"LAR",proj:{PPR:316,Half:316,Std:316},adp:13.8,note:"3,600 yds 24 TD aging"},
  {name:"Kirk Cousins",pos:"QB",age:38,team:"ATL",proj:{PPR:305,Half:305,Std:305},adp:16.5,note:"3,400 yds 22 TD"},
  {name:"Geno Smith",pos:"QB",age:35,team:"SEA",proj:{PPR:308,Half:308,Std:308},adp:15.9,note:"3,500 yds 22 TD"},
  {name:"Bryce Young",pos:"QB",age:24,team:"CAR",proj:{PPR:295,Half:295,Std:295},adp:18.8,note:"Year 3: 3,200 yds rebound"},
  // Additional RBs
  {name:"Kenneth Walker III",pos:"RB",age:25,team:"SEA",proj:{PPR:272,Half:250,Std:228},adp:7.5,note:"1,250 rush 9 TD"},
  {name:"James Cook",pos:"RB",age:25,team:"BUF",proj:{PPR:260,Half:240,Std:220},adp:9.0,note:"900 rush 72 rec 11 TD"},
  {name:"Rhamondre Stevenson",pos:"RB",age:27,team:"NE",proj:{PPR:238,Half:218,Std:198},adp:11.2,note:"1,050 rush 38 rec 7 TD"},
  {name:"Travis Etienne Jr.",pos:"RB",age:27,team:"JAX",proj:{PPR:235,Half:215,Std:195},adp:11.8,note:"1,000 rush 45 rec"},
  {name:"Isiah Pacheco",pos:"RB",age:26,team:"KC",proj:{PPR:228,Half:209,Std:190},adp:12.9,note:"950 rush 8 TD"},
  {name:"Joe Mixon",pos:"RB",age:30,team:"HOU",proj:{PPR:222,Half:204,Std:186},adp:13.5,note:"1,000 rush 8 TD"},
  {name:"David Montgomery",pos:"RB",age:29,team:"DET",proj:{PPR:215,Half:198,Std:181},adp:14.2,note:"1,050 rush 9 TD tandem"},
  {name:"Tony Pollard",pos:"RB",age:28,team:"TEN",proj:{PPR:210,Half:193,Std:176},adp:14.8,note:"800 rush 50 rec 7 TD"},
  {name:"Rachaad White",pos:"RB",age:27,team:"TB",proj:{PPR:208,Half:191,Std:174},adp:15.5,note:"700 rush 72 rec"},
  {name:"Jaylen Warren",pos:"RB",age:26,team:"PIT",proj:{PPR:195,Half:179,Std:163},adp:17.2,note:"800 rush 40 rec"},
  {name:"Zach Charbonnet",pos:"RB",age:25,team:"SEA",proj:{PPR:188,Half:173,Std:158},adp:16.8,note:"850 rush tandem"},
  {name:"Tank Bigsby",pos:"RB",age:24,team:"JAX",proj:{PPR:182,Half:167,Std:152},adp:18.5,note:"750 rush 6 TD"},
  {name:"Javonte Williams",pos:"RB",age:26,team:"DEN",proj:{PPR:178,Half:163,Std:148},adp:19.2,note:"800 rush 35 rec"},
  {name:"Aaron Jones",pos:"RB",age:32,team:"MIN",proj:{PPR:172,Half:158,Std:144},adp:20.0,note:"600 rush 55 rec veteran"},
  {name:"Zonovan Knight",pos:"RB",age:25,team:"NYJ",proj:{PPR:165,Half:151,Std:137},adp:21.8,note:"700 rush starter"},
  {name:"Blake Corum",pos:"RB",age:24,team:"LAR",proj:{PPR:158,Half:144,Std:130},adp:23.1,note:"650 rush 5 TD"},
  {name:"Kimani Vidal",pos:"RB",age:24,team:"LAC",proj:{PPR:152,Half:139,Std:126},adp:23.8,note:"600 rush 40 rec"},
  {name:"Braelon Allen",pos:"RB",age:22,team:"NYJ",proj:{PPR:148,Half:135,Std:122},adp:24.5,note:"Year 2: 550 rush 45 rec"},
  {name:"Keaton Mitchell",pos:"RB",age:24,team:"BAL",proj:{PPR:142,Half:130,Std:118},adp:25.5,note:"600 rush explosive"},
  {name:"MarShawn Lloyd",pos:"RB",age:24,team:"DET",proj:{PPR:138,Half:126,Std:114},adp:26.2,note:"500 rush backup"},
  {name:"Will Shipley",pos:"RB",age:23,team:"PHI",proj:{PPR:132,Half:121,Std:110},adp:27.8,note:"400 rush 55 rec"},
  {name:"Ray Davis",pos:"RB",age:25,team:"BUF",proj:{PPR:125,Half:114,Std:103},adp:29.2,note:"450 rush backup"},
  {name:"Ty Chandler",pos:"RB",age:27,team:"MIN",proj:{PPR:118,Half:108,Std:98},adp:31.0,note:"400 rush depth"},
  {name:"Javion Cohen",pos:"RB",age:23,team:"IND",proj:{PPR:112,Half:102,Std:92},adp:33.5,note:"250 rush 40 rec"},
  // Additional WRs
  {name:"Jaylen Waddle",pos:"WR",age:28,team:"MIA",proj:{PPR:265,Half:245,Std:225},adp:10.4,note:"Year 5: 100 rec 1,050 yds"},
  {name:"Chris Olave",pos:"WR",age:26,team:"NO",proj:{PPR:258,Half:238,Std:218},adp:11.4,note:"95 rec 1,120 yds 7 TD"},
  {name:"George Pickens",pos:"WR",age:24,team:"PIT",proj:{PPR:252,Half:233,Std:214},adp:12.2,note:"85 rec 1,080 yds 9 TD"},
  {name:"Jaxon Smith-Njigba",pos:"WR",age:23,team:"SEA",proj:{PPR:248,Half:229,Std:210},adp:12.8,note:"Year 3: 108 rec 1,100 yds"},
  {name:"Malik Nabers",pos:"WR",age:22,team:"NYG",proj:{PPR:255,Half:236,Std:217},adp:12.0,note:"Year 2: 92 rec 1,050 yds"},
  {name:"Zay Flowers",pos:"WR",age:25,team:"BAL",proj:{PPR:242,Half:224,Std:206},adp:13.8,note:"88 rec 1,000 yds 8 TD"},
  {name:"Jordan Addison",pos:"WR",age:24,team:"MIN",proj:{PPR:238,Half:220,Std:202},adp:14.2,note:"82 rec 980 yds 9 TD"},
  {name:"Josh Downs",pos:"WR",age:24,team:"IND",proj:{PPR:235,Half:217,Std:199},adp:14.9,note:"Year 3: 95 rec 980 yds"},
  {name:"Ladd McConkey",pos:"WR",age:25,team:"LAC",proj:{PPR:232,Half:214,Std:196},adp:15.5,note:"88 rec 940 yds"},
  {name:"DeVonta Smith",pos:"WR",age:29,team:"PHI",proj:{PPR:228,Half:211,Std:194},adp:16.0,note:"88 rec 1,000 yds 7 TD"},
  {name:"Mike Evans",pos:"WR",age:32,team:"TB",proj:{PPR:225,Half:208,Std:191},adp:16.5,note:"84 rec 1,050 yds 12 TD"},
  {name:"Michael Pittman Jr.",pos:"WR",age:28,team:"IND",proj:{PPR:218,Half:201,Std:184},adp:17.8,note:"88 rec 950 yds 7 TD"},
  {name:"D.J. Moore",pos:"WR",age:28,team:"CHI",proj:{PPR:215,Half:199,Std:183},adp:18.2,note:"80 rec 920 yds"},
  {name:"Xavier Worthy",pos:"WR",age:23,team:"KC",proj:{PPR:210,Half:194,Std:178},adp:19.0,note:"Year 2: 72 rec 890 yds 9 TD"},
  {name:"Tank Dell",pos:"WR",age:25,team:"HOU",proj:{PPR:205,Half:189,Std:173},adp:19.8,note:"75 rec 850 yds 7 TD"},
  {name:"Davante Adams",pos:"WR",age:33,team:"NYJ",proj:{PPR:195,Half:180,Std:165},adp:20.8,note:"Veteran: 80 rec 880 yds"},
  {name:"Kayshon Boutte",pos:"WR",age:24,team:"LAC",proj:{PPR:198,Half:183,Std:168},adp:21.5,note:"70 rec 800 yds 6 TD"},
  {name:"Deebo Samuel",pos:"WR",age:30,team:"SF",proj:{PPR:185,Half:171,Std:157},adp:23.2,note:"55 rec 680 yds + rush"},
  {name:"Keon Coleman",pos:"WR",age:23,team:"BUF",proj:{PPR:192,Half:177,Std:162},adp:22.8,note:"Year 2: 68 rec 820 yds"},
  {name:"Tre Tucker",pos:"WR",age:25,team:"LV",proj:{PPR:185,Half:170,Std:155},adp:24.0,note:"72 rec 760 yds 5 TD"},
  {name:"Matthew Golden",pos:"WR",age:22,team:"HOU",proj:{PPR:178,Half:164,Std:150},adp:24.8,note:"Year 2: 65 rec 740 yds"},
  {name:"Brian Thomas Jr.",pos:"WR",age:23,team:"JAX",proj:{PPR:172,Half:158,Std:144},adp:25.5,note:"Year 2: 70 rec 780 yds"},
  {name:"Courtland Sutton",pos:"WR",age:30,team:"DEN",proj:{PPR:165,Half:152,Std:139},adp:27.2,note:"68 rec 780 yds 6 TD"},
  {name:"Xavier Legette",pos:"WR",age:25,team:"CAR",proj:{PPR:158,Half:145,Std:132},adp:28.8,note:"Year 2: 62 rec 720 yds"},
  {name:"Jakobi Meyers",pos:"WR",age:29,team:"LV",proj:{PPR:152,Half:140,Std:128},adp:30.0,note:"72 rec 720 yds"},
  {name:"Quentin Johnston",pos:"WR",age:24,team:"LAC",proj:{PPR:145,Half:133,Std:121},adp:31.2,note:"60 rec 700 yds 5 TD"},
  {name:"Stefon Diggs",pos:"WR",age:32,team:"NE",proj:{PPR:178,Half:164,Std:150},adp:24.2,note:"Veteran: 75 rec 820 yds"},
  // Additional TEs
  {name:"Dallas Goedert",pos:"TE",age:30,team:"PHI",proj:{PPR:182,Half:167,Std:152},adp:11.8,note:"72 rec 820 yds 7 TD"},
  {name:"T.J. Hockenson",pos:"TE",age:28,team:"MIN",proj:{PPR:175,Half:160,Std:145},adp:12.5,note:"70 rec 740 yds"},
  {name:"David Njoku",pos:"TE",age:29,team:"CLE",proj:{PPR:168,Half:154,Std:140},adp:13.8,note:"65 rec 680 yds 6 TD"},
  {name:"Jake Ferguson",pos:"TE",age:26,team:"DAL",proj:{PPR:162,Half:148,Std:134},adp:15.0,note:"68 rec 700 yds 6 TD"},
  {name:"Harold Fannin Jr.",pos:"TE",age:23,team:"CLE",proj:{PPR:155,Half:142,Std:129},adp:16.5,note:"Year 2: 60 rec 620 yds"},
  {name:"Cade Otton",pos:"TE",age:26,team:"TB",proj:{PPR:148,Half:135,Std:122},adp:17.8,note:"55 rec 570 yds"},
  {name:"Cole Kmet",pos:"TE",age:26,team:"CHI",proj:{PPR:145,Half:133,Std:121},adp:18.2,note:"55 rec 560 yds 5 TD"},
  {name:"Pat Freiermuth",pos:"TE",age:28,team:"PIT",proj:{PPR:138,Half:126,Std:114},adp:19.5,note:"52 rec 540 yds 5 TD"},
  {name:"Brenton Strange",pos:"TE",age:25,team:"JAX",proj:{PPR:125,Half:114,Std:103},adp:22.5,note:"48 rec 470 yds"},
  {name:"Michael Mayer",pos:"TE",age:24,team:"LV",proj:{PPR:118,Half:108,Std:98},adp:25.0,note:"45 rec 440 yds"},
  {name:"Chigoziem Okonkwo",pos:"TE",age:27,team:"TEN",proj:{PPR:115,Half:105,Std:95},adp:26.2,note:"48 rec 460 yds"},
  {name:"Dawson Knox",pos:"TE",age:28,team:"BUF",proj:{PPR:108,Half:99,Std:90},adp:28.8,note:"40 rec 410 yds 5 TD"},
  // Additional DLs
  {name:"T.J. Watt",pos:"DL",age:30,team:"PIT",proj:{PPR:155,Half:155,Std:155},adp:7.2,note:"18 sacks 25 TFL elite pass rush"},
  {name:"Nick Bosa",pos:"DL",age:29,team:"SF",proj:{PPR:150,Half:150,Std:150},adp:7.5,note:"16 sacks 22 TFL"},
  {name:"Maxx Crosby",pos:"DL",age:29,team:"LV",proj:{PPR:148,Half:148,Std:148},adp:7.9,note:"15 sacks 20 TFL"},
  {name:"Chris Jones",pos:"DL",age:31,team:"KC",proj:{PPR:140,Half:140,Std:140},adp:9.2,note:"Interior: 14 sacks 18 TFL"},
  {name:"Brian Burns",pos:"DL",age:28,team:"NYG",proj:{PPR:138,Half:138,Std:138},adp:9.8,note:"14 sacks 17 TFL"},
  {name:"Jonathan Greenard",pos:"DL",age:28,team:"HOU",proj:{PPR:135,Half:135,Std:135},adp:10.5,note:"13 sacks 16 TFL"},
  {name:"Jalen Carter",pos:"DL",age:24,team:"PHI",proj:{PPR:132,Half:132,Std:132},adp:11.0,note:"Interior: 10 sacks 18 TFL"},
  {name:"Dexter Lawrence",pos:"DL",age:28,team:"NYG",proj:{PPR:128,Half:128,Std:128},adp:11.8,note:"Interior: 10 sacks 16 TFL"},
  {name:"Jeffery Simmons",pos:"DL",age:28,team:"TEN",proj:{PPR:125,Half:125,Std:125},adp:12.5,note:"Interior: 9 sacks 15 TFL"},
  {name:"Daron Payne",pos:"DL",age:28,team:"WAS",proj:{PPR:122,Half:122,Std:122},adp:13.2,note:"Interior: 9 sacks 14 TFL"},
  {name:"Sam Hubbard",pos:"DL",age:30,team:"CIN",proj:{PPR:118,Half:118,Std:118},adp:14.5,note:"11 sacks 14 TFL"},
  {name:"Josh Uche",pos:"DL",age:29,team:"NE",proj:{PPR:115,Half:115,Std:115},adp:15.2,note:"11 sacks 13 TFL"},
  {name:"Bryce Huff",pos:"DL",age:27,team:"PHI",proj:{PPR:112,Half:112,Std:112},adp:16.5,note:"12 sacks 13 TFL"},
  {name:"Haason Reddick",pos:"DL",age:31,team:"NYJ",proj:{PPR:108,Half:108,Std:108},adp:17.8,note:"11 sacks 12 TFL"},
  {name:"Lukas Van Ness",pos:"DL",age:24,team:"GB",proj:{PPR:112,Half:112,Std:112},adp:16.8,note:"Year 3: 11 sacks 13 TFL"},
  {name:"Zach Allen",pos:"DL",age:28,team:"ARI",proj:{PPR:108,Half:108,Std:108},adp:18.0,note:"Versatile: 8 sacks 15 TFL"},
  {name:"Leonard Williams",pos:"DL",age:32,team:"SEA",proj:{PPR:105,Half:105,Std:105},adp:18.8,note:"Interior: 8 sacks 14 TFL"},
  {name:"Cameron Jordan",pos:"DL",age:35,team:"NO",proj:{PPR:102,Half:102,Std:102},adp:19.5,note:"Veteran: 9 sacks 12 TFL"},
  {name:"Za'Darius Smith",pos:"DL",age:33,team:"CLE",proj:{PPR:100,Half:100,Std:100},adp:20.2,note:"9 sacks 11 TFL veteran"},
  {name:"Rashan Gary",pos:"DL",age:28,team:"GB",proj:{PPR:118,Half:118,Std:118},adp:14.0,note:"13 sacks 16 TFL pass rush"},
  {name:"Danielle Hunter",pos:"DL",age:31,team:"HOU",proj:{PPR:112,Half:112,Std:112},adp:16.2,note:"12 sacks 14 TFL"},
  // Additional LBs
  {name:"T.J. Edwards",pos:"LB",age:30,team:"CHI",proj:{PPR:150,Half:150,Std:150},adp:8.2,note:"155 tackles 3 sacks 2 INT"},
  {name:"Bobby Wagner",pos:"LB",age:35,team:"WAS",proj:{PPR:145,Half:145,Std:145},adp:8.8,note:"Veteran: 140 tackles 3 sacks"},
  {name:"Patrick Queen",pos:"LB",age:27,team:"PIT",proj:{PPR:142,Half:142,Std:142},adp:9.2,note:"148 tackles 4 sacks"},
  {name:"Foyesade Oluokun",pos:"LB",age:30,team:"PHI",proj:{PPR:140,Half:140,Std:140},adp:9.8,note:"158 tackles 2 sacks"},
  {name:"Quay Walker",pos:"LB",age:26,team:"GB",proj:{PPR:138,Half:138,Std:138},adp:10.2,note:"150 tackles 3 sacks"},
  {name:"Jordyn Brooks",pos:"LB",age:28,team:"SEA",proj:{PPR:135,Half:135,Std:135},adp:11.0,note:"142 tackles 2 sacks"},
  {name:"Germaine Pratt",pos:"LB",age:31,team:"CIN",proj:{PPR:132,Half:132,Std:132},adp:11.8,note:"138 tackles 3 sacks"},
  {name:"Dre Greenlaw",pos:"LB",age:28,team:"SF",proj:{PPR:130,Half:130,Std:130},adp:12.5,note:"132 tackles 3 sacks"},
  {name:"Matt Milano",pos:"LB",age:31,team:"BUF",proj:{PPR:128,Half:128,Std:128},adp:13.2,note:"125 tackles 2 INT"},
  {name:"Christian Harris",pos:"LB",age:26,team:"HOU",proj:{PPR:125,Half:125,Std:125},adp:14.2,note:"130 tackles 3 sacks"},
  {name:"Demario Davis",pos:"LB",age:36,team:"NO",proj:{PPR:122,Half:122,Std:122},adp:15.2,note:"Veteran: 128 tackles 3 sacks"},
  {name:"De'Vondre Campbell",pos:"LB",age:33,team:"GB",proj:{PPR:118,Half:118,Std:118},adp:16.5,note:"120 tackles 2 INT"},
  {name:"Eric Kendricks",pos:"LB",age:33,team:"LAC",proj:{PPR:115,Half:115,Std:115},adp:17.8,note:"Veteran: 115 tackles"},
  {name:"Myjai Sanders",pos:"LB",age:27,team:"CIN",proj:{PPR:112,Half:112,Std:112},adp:18.8,note:"110 tackles 4 sacks"},
  {name:"Devin Lloyd",pos:"LB",age:27,team:"JAX",proj:{PPR:118,Half:118,Std:118},adp:15.8,note:"125 tackles 3 sacks 2 INT"},
  // Additional DBs
  {name:"Patrick Surtain II",pos:"DB",age:26,team:"DEN",proj:{PPR:138,Half:138,Std:138},adp:9.5,note:"Elite CB: 65 tackles 4 INT"},
  {name:"Antoine Winfield Jr.",pos:"DB",age:27,team:"TB",proj:{PPR:132,Half:132,Std:132},adp:10.8,note:"S: 110 tackles 4 INT 2 sacks"},
  {name:"Minkah Fitzpatrick",pos:"DB",age:29,team:"PIT",proj:{PPR:128,Half:128,Std:128},adp:11.5,note:"S: 105 tackles 4 INT"},
  {name:"Budda Baker",pos:"DB",age:30,team:"ARI",proj:{PPR:125,Half:125,Std:125},adp:12.2,note:"S: 115 tackles 3 INT"},
  {name:"Jessie Bates III",pos:"DB",age:29,team:"ATL",proj:{PPR:122,Half:122,Std:122},adp:13.2,note:"S: 100 tackles 4 INT"},
  {name:"Devon Witherspoon",pos:"DB",age:25,team:"SEA",proj:{PPR:118,Half:118,Std:118},adp:14.5,note:"Year 3 CB: 80 tackles 5 INT"},
  {name:"Jaylon Johnson",pos:"DB",age:27,team:"CHI",proj:{PPR:115,Half:115,Std:115},adp:15.2,note:"CB: 70 tackles 5 INT"},
  {name:"Trevon Diggs",pos:"DB",age:28,team:"DAL",proj:{PPR:112,Half:112,Std:112},adp:16.2,note:"CB: 65 tackles 6 INT high variance"},
  {name:"C.J. Gardner-Johnson",pos:"DB",age:28,team:"PHI",proj:{PPR:108,Half:108,Std:108},adp:17.5,note:"S: 98 tackles 4 INT"},
  {name:"Jordan Poyer",pos:"DB",age:33,team:"MIA",proj:{PPR:105,Half:105,Std:105},adp:18.8,note:"Veteran S: 92 tackles 4 INT"},
  {name:"Darius Slay",pos:"DB",age:34,team:"PHI",proj:{PPR:102,Half:102,Std:102},adp:19.8,note:"Veteran CB: 55 tackles 4 INT"},
  {name:"Emmanuel Forbes",pos:"DB",age:24,team:"WAS",proj:{PPR:100,Half:100,Std:100},adp:20.8,note:"Year 3 CB: 70 tackles 4 INT"},
  {name:"Deommodore Lenoir",pos:"DB",age:26,team:"SF",proj:{PPR:108,Half:108,Std:108},adp:17.8,note:"CB: 72 tackles 4 INT"},
  {name:"Sterling Shepard",pos:"DB",age:32,team:"NYG",proj:{PPR:95,Half:95,Std:95},adp:22.5,note:"Depth"},
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
  var [reportSubTab,setReportSubTab]=useState("dynasty");
  var [newsFilter,setNewsFilter]=useState("all");
  var [billingPeriod,setBillingPeriod]=useState("yearly");
  var [adminSubTab,setAdminSubTab]=useState("system");
  var [adminSyncSel,setAdminSyncSel]=useState("");
  var [rebuildConfirmed,setRebuildConfirmed]=useState(false);
  var [valueTunerLayer,setValueTunerLayer]=useState("format");
  var [contactName,setContactName]=useState("");
  var [contactEmail,setContactEmail]=useState("");
  var [contactSubject,setContactSubject]=useState("");
  var [contactMsg,setContactMsg]=useState("");
  var [contactSent,setContactSent]=useState(false);
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
  var [rankSubTab,setRankSubTab]=useState("allrankings");
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
      p.tradeVal=Math.max(0,Math.round(p.vbd*100));
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
      [["trade","Trade"],["league","My League"],["rankings","Rankings"],["reports","Reports"],["admin","Admin"]].map(function(item){
        var active=tab===item[0];
        return React.createElement("button",{key:item[0],onClick:function(){
          if((item[0]==="league"||item[0]==="reports")&&!isPro){setAuthMode("signup");setShowAuth(true);return;}
          if(item[0]==="admin"){setTab("admin");return;}
          setTab(item[0]);
        },style:{flex:1,padding:"10px 4px 6px",background:"none",border:"none",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:2}},
          React.createElement("span",{style:{fontSize:16}}," "),
          React.createElement("span",{style:{fontSize:10,fontWeight:700,color:active?T.purple:T.textDim}},item[1]),
          active&&React.createElement("div",{style:{width:20,height:2,background:T.purple,borderRadius:2}}),
          (item[0]==="league"||item[0]==="reports")&&!isPro&&React.createElement("span",{style:{fontSize:7,color:T.gold,fontWeight:700}},"PRO")
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
            React.createElement("div",{style:{display:"flex",alignItems:"center",gap:10}},
              React.createElement("span",{style:{fontSize:20,color:T.green,fontWeight:900}},"↗"),
              React.createElement("div",null,
                React.createElement("div",{style:{fontWeight:900,fontSize:22}},"Power Rankings"),
                React.createElement("div",{style:{fontSize:12,color:T.textSub,marginTop:2,display:"flex",alignItems:"center",gap:4}},React.createElement("span",{style:{color:T.gold,fontWeight:700}},"$"),"Powered by FDP Values")
              )
            ),
            React.createElement("div",{style:{display:"flex",gap:8}},
              React.createElement("button",{style:{padding:"8px 14px",borderRadius:10,border:"1px solid "+T.borderPurple,background:T.purpleDim,color:T.purple,fontWeight:700,fontSize:11,cursor:"pointer",display:"flex",alignItems:"center",gap:4}},React.createElement("span",null,"↻")," Sync FDP Values"),
              React.createElement("button",{style:{padding:"8px 14px",borderRadius:10,border:"1px solid "+T.border,background:"transparent",color:T.textSub,fontWeight:700,fontSize:11,cursor:"pointer"}},"Refresh")
            )
          )
        ),
        LEAGUE_TEAMS.map(function(team,i){
          var ords=["1st","2nd","3rd","4th","5th","6th","7th","8th","9th","10th","11th","12th"];
          var ord=ords[i]||(i+1)+"th";
          var badgeBg=i===0?"#f59e0b":i===1?"#9ca3af":i===2?"#b45309":T.bgInput;
          var badgeText=i<3?"#000":T.textSub;
          return React.createElement("div",{key:team.name,style:{background:T.bgCard,border:"1px solid "+(i===0?T.borderPurple:T.border),borderRadius:14,padding:16,marginBottom:10}},
            React.createElement("div",{style:{display:"flex",alignItems:"flex-start",gap:12,marginBottom:12}},
              React.createElement("div",{style:{background:badgeBg,borderRadius:20,padding:"5px 12px",display:"inline-flex",alignItems:"center",gap:4,flexShrink:0}},
                React.createElement("span",{style:{fontSize:12}},"\uD83C\uDFC6"),
                React.createElement("span",{style:{fontWeight:900,fontSize:13,color:badgeText}},ord)
              ),
              React.createElement("div",{style:{flex:1}},
                React.createElement("div",{style:{fontWeight:800,fontSize:15,marginBottom:4}},team.name),
                React.createElement("div",{style:{fontSize:11,color:T.textSub,display:"flex",gap:8,alignItems:"center"}},
                  React.createElement("span",null,"\uD83D\uDC65 "+team.record),
                  React.createElement("span",null,"  0.0 pts")
                )
              )
            ),
            React.createElement("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:8}},
              [["Players",team.players],["Draft Picks",team.picks]].map(function(s){return React.createElement("div",{key:s[0],style:{background:T.bgInput,borderRadius:8,padding:"10px 12px"}},React.createElement("div",{style:{fontSize:10,color:T.textSub,marginBottom:2}},s[0]),React.createElement("div",{style:{fontWeight:800,fontSize:18}},s[1]));})
            ),
            React.createElement("div",{style:{background:T.bgInput,borderRadius:8,padding:"10px 12px",marginBottom:12}},
              React.createElement("div",{style:{fontSize:10,color:T.textSub,marginBottom:2}},"FAAB"),
              React.createElement("div",{style:{fontWeight:800,fontSize:18}},"$"+team.faab)
            ),
            React.createElement("button",{style:{width:"100%",padding:"11px",borderRadius:10,border:"1px solid "+T.border,background:"transparent",color:T.purple,fontWeight:700,fontSize:13,cursor:"pointer"}},"View Full Roster")
          );
        })
      ),

      // PLAYOFF ODDS
      leagueSubTab==="playoff"&&React.createElement("div",{style:{padding:"16px"}},
        React.createElement("div",{style:{background:T.bgCard,border:"1px solid "+T.borderPurple,borderRadius:16,padding:16,marginBottom:16}},
          React.createElement("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:16}},
            React.createElement("div",null,
              React.createElement("div",{style:{fontWeight:900,fontSize:22,lineHeight:1.1}},"Playoff Odds"),
              React.createElement("div",{style:{fontWeight:900,fontSize:22,lineHeight:1.1,marginBottom:6}},"Simulator"),
              React.createElement("div",{style:{fontSize:11,color:T.textSub}},"Armchair Football League · 2026")
            ),
            React.createElement("button",{style:{padding:"8px 14px",borderRadius:10,border:"1px solid "+T.border,background:"transparent",color:T.textSub,fontWeight:700,fontSize:11,cursor:"pointer",display:"flex",alignItems:"center",gap:4}},
              React.createElement("span",null,"↓")," Export"
            )
          ),
          React.createElement("div",{style:{marginBottom:14}},
            React.createElement("div",{style:{fontSize:12,color:T.textSub,marginBottom:6,fontWeight:600}},"Number of Simulations"),
            React.createElement("select",{value:simCount,onChange:function(e){setSimCount(e.target.value);setSimRan(false);},style:{background:T.bgInput,color:T.text,border:"1px solid "+T.border,borderRadius:10,padding:"10px 14px",fontSize:13,outline:"none",width:"100%"}},
              ["100","500","1,000 (Recommended)","5,000","10,000"].map(function(v){return React.createElement("option",{key:v},v);})
            )
          ),
          React.createElement("button",{onClick:function(){setSimRunning(true);setSimRan(false);setTimeout(function(){setSimRunning(false);setSimRan(true);},1800);},style:{width:"100%",padding:"13px",borderRadius:12,border:"none",background:"linear-gradient(135deg,"+T.purple+",#5b21b6)",color:"#fff",fontWeight:800,fontSize:14,cursor:"pointer"}},simRunning?"Running simulation...":"Run Simulation")
        ),
        simRan&&React.createElement("div",{style:{background:T.bgCard,border:"1px solid "+T.borderPurple,borderRadius:16,padding:16,marginBottom:16}},
          React.createElement("div",{style:{fontSize:12,fontWeight:600,marginBottom:10,color:T.textSub}},"Save Results"),
          React.createElement("div",{style:{display:"flex",gap:8}},
            React.createElement("input",{placeholder:"Add notes (optional)",value:simNotes,onChange:function(e){setSimNotes(e.target.value);},style:{flex:1,background:T.bgInput,color:T.text,border:"1px solid "+T.border,borderRadius:10,padding:"10px 14px",fontSize:12,outline:"none"}}),
            React.createElement("button",{onClick:function(){setSimSaved(true);},style:{padding:"10px 16px",borderRadius:10,border:"none",background:T.purple,color:"#fff",fontWeight:700,fontSize:12,cursor:"pointer",display:"flex",alignItems:"center",gap:6}},
              React.createElement("span",null,"▣"),simSaved?" Saved!":" Save"
            )
          )
        ),
        simRan&&React.createElement("div",null,
          React.createElement("div",{style:{background:"linear-gradient(135deg,#1a1400,#1e1a00)",border:"1px solid "+T.gold+"44",borderRadius:14,padding:16,marginBottom:16}},
            React.createElement("div",{style:{display:"flex",alignItems:"center",gap:8,marginBottom:8}},
              React.createElement("span",{style:{fontSize:20,color:T.gold}},"★"),
              React.createElement("div",{style:{fontWeight:800,fontSize:16,color:T.gold}},"Championship Favorite")
            ),
            React.createElement("div",{style:{fontSize:11,color:T.textSub,marginBottom:4}},"Most Likely Champion"),
            React.createElement("div",{style:{fontWeight:900,fontSize:24,color:T.gold,marginBottom:4}},LEAGUE_TEAMS[0].name),
            React.createElement("div",{style:{fontSize:12,color:T.textSub}},"0-0 · "+LEAGUE_TEAMS[0].makePlayoffs+"% playoff odds")
          ),
          React.createElement("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}},
            React.createElement("div",{style:{fontWeight:800,fontSize:16}},"Simulation Results"),
            React.createElement("div",{style:{display:"flex",gap:8,alignItems:"center"}},
              React.createElement("select",{style:{background:T.bgInput,color:T.text,border:"1px solid "+T.border,borderRadius:8,padding:"5px 10px",fontSize:11,outline:"none"}},React.createElement("option",null,"All Teams")),
              React.createElement("div",{style:{fontSize:10,color:T.textSub}},LEAGUE_TEAMS.length+" of "+LEAGUE_TEAMS.length+" · "+simCount.split(" ")[0]+" sims")
            )
          ),
          LEAGUE_TEAMS.map(function(team,i){
            var collapsed=expandedTeam===team.name;
            return React.createElement("div",{key:team.name,style:{background:T.bgCard,border:"1px solid "+T.border,borderRadius:14,padding:16,marginBottom:10}},
              React.createElement("div",{style:{display:"flex",alignItems:"flex-start",gap:12}},
                React.createElement("div",{style:{width:40,height:40,borderRadius:"50%",background:i===0?T.purple:T.bgInput,border:"2px solid "+(i===0?T.purple:T.border),display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}},
                  React.createElement("span",{style:{fontWeight:900,fontSize:12,color:i===0?"#fff":T.textSub}},"#"+(i+1))
                ),
                React.createElement("div",{style:{flex:1}},
                  React.createElement("div",{style:{fontWeight:800,fontSize:14}},team.name),
                  React.createElement("div",{style:{fontSize:10,color:T.textSub,display:"flex",gap:8}},
                    React.createElement("span",null,"Record: "+team.record),
                    React.createElement("span",null,"Proj: "+team.projW+" W"),
                    React.createElement("span",null,"0.0 PF")
                  )
                ),
                React.createElement("button",{onClick:function(){setExpandedTeam(collapsed?null:team.name);},style:{background:"none",border:"none",color:T.textSub,cursor:"pointer",fontSize:12,paddingTop:4}},collapsed?"▲":"▼")
              ),
              !collapsed&&React.createElement("div",{style:{marginTop:12}},
                [["Make Playoffs",team.makePlayoffs,T.gold,"linear-gradient(90deg,#d97706,#f59e0b)"],["First Round Bye",team.firstRoundBye,"#f87171","#dc2626"],["Win Championship",team.winChamp,"#f87171","#b91c1c"]].map(function(row){
                  return React.createElement("div",{key:row[0],style:{marginBottom:10}},
                    React.createElement("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}},
                      React.createElement("span",{style:{fontSize:12,color:T.textSub}},row[0]),
                      React.createElement("span",{style:{fontWeight:800,fontSize:14,color:row[2]}},row[1]+"%")
                    ),
                    React.createElement("div",{style:{background:T.border,borderRadius:99,height:7,overflow:"hidden"}},
                      React.createElement("div",{style:{width:row[1]+"%",height:"100%",background:row[3],borderRadius:99}})
                    )
                  );
                })
              )
            );
          })
        )
      ),

      // CHAMPIONSHIP
      leagueSubTab==="champ"&&React.createElement("div",{style:{padding:"16px"}},
        React.createElement("div",{style:{display:"flex",alignItems:"center",gap:12,marginBottom:20}},
          React.createElement("span",{style:{fontSize:28,color:T.gold}},"★"),
          React.createElement("div",{style:{fontWeight:900,fontSize:26,lineHeight:1.1}},"Championship Probability")
        ),
        LEAGUE_TEAMS.map(function(team,i){
          return React.createElement("div",{key:team.name,style:{background:T.bgCard,border:"1px solid "+T.border,borderRadius:14,padding:16,marginBottom:10}},
            React.createElement("div",{style:{display:"flex",alignItems:"center",gap:10,marginBottom:14}},
              React.createElement("span",{style:{fontWeight:900,fontSize:16,color:T.textDim}},"#"+team.rank),
              React.createElement("div",{style:{flex:1}},
                React.createElement("div",{style:{fontWeight:800,fontSize:15}},team.name),
                React.createElement("div",{style:{fontSize:11,color:T.textSub}},"Total Value: "+team.totalVal.toLocaleString())
              ),
              i===0&&React.createElement("span",{style:{fontSize:20,color:T.gold}},"★")
            ),
            React.createElement("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:14}},
              React.createElement("div",null,
                React.createElement("div",{style:{fontSize:11,color:T.textSub,marginBottom:4}},"Playoff Odds"),
                React.createElement("div",{style:{fontWeight:900,fontSize:22,color:T.green,marginBottom:6}},team.playoffOdds+"%"),
                React.createElement("div",{style:{background:T.border,borderRadius:99,height:5,overflow:"hidden"}},React.createElement("div",{style:{width:team.playoffOdds+"%",height:"100%",background:"#2563eb",borderRadius:99}}))
              ),
              React.createElement("div",null,
                React.createElement("div",{style:{fontSize:11,color:T.textSub,marginBottom:4}},"Championship Odds"),
                React.createElement("div",{style:{fontWeight:900,fontSize:22,color:T.cyan,marginBottom:6}},team.champOdds+"%"),
                React.createElement("div",{style:{background:T.border,borderRadius:99,height:5,overflow:"hidden"}},React.createElement("div",{style:{width:team.champOdds+"%",height:"100%",background:T.gold,borderRadius:99}}))
              )
            ),
            React.createElement("div",{style:{marginBottom:14}},
              React.createElement("div",{style:{fontSize:11,color:T.textSub,marginBottom:4}},"Weekly Win Probability"),
              React.createElement("div",{style:{fontWeight:900,fontSize:22,color:T.green,marginBottom:6}},team.weeklyWin+"%"),
              React.createElement("div",{style:{background:T.border,borderRadius:99,height:5,overflow:"hidden"}},React.createElement("div",{style:{width:team.weeklyWin+"%",height:"100%",background:T.green,borderRadius:99}}))
            ),
            React.createElement("button",{style:{width:"100%",padding:"11px",borderRadius:10,border:"none",background:"#2563eb",color:"#fff",fontWeight:700,fontSize:13,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:8}},
              React.createElement("span",null,"◷")," View Team Strengths"
            )
          );
        })
      ),

      // TEAM ADVICE
      leagueSubTab==="advice"&&React.createElement("div",{style:{padding:"16px"}},
        React.createElement("div",{style:{marginBottom:16}},
          React.createElement("select",{value:adviceTeam,onChange:function(e){setAdviceTeam(Number(e.target.value));},style:{background:T.bgInput,color:T.text,border:"1px solid "+T.border,borderRadius:10,padding:"10px 14px",fontSize:13,outline:"none",width:"100%"}},
            LEAGUE_TEAMS.map(function(t,i){return React.createElement("option",{key:i,value:i},t.name);})
          )
        ),
        (function(){
          var team=LEAGUE_TEAMS[adviceTeam];
          var mode=adviceTeam<2?"COMPETE":adviceTeam<4?"NEUTRAL":"REBUILD";
          var modeColor=mode==="COMPETE"?T.green:mode==="NEUTRAL"?T.gold:T.red;
          var modeBg=mode==="COMPETE"?"linear-gradient(135deg,#052e16,#064e3b)":mode==="NEUTRAL"?"linear-gradient(135deg,#1c1400,#261c00)":"linear-gradient(135deg,#2d0707,#3b0f0f)";
          var modeIcon=mode==="COMPETE"?"↗":mode==="NEUTRAL"?"→":"↘";
          var modeDesc=mode==="COMPETE"?"Win now. Your team is built to compete for a championship this season.":mode==="NEUTRAL"?"Balance youth and veterans. Trades should go either direction.":"Focus on the future. Acquire picks and young talent for sustained success.";
          var confidence=mode==="REBUILD"?95:mode==="COMPETE"?89:72;
          var leaguePercentile=Math.round(((LEAGUE_TEAMS.length-1-adviceTeam)/Math.max(1,LEAGUE_TEAMS.length-1))*100);
          var starterVal=Math.round(team.totalVal*0.65/1000)*1000;
          var futureVal=team.picks*8500;
          var agingRisk=Math.max(0,Math.round(adviceTeam*3.5));
          return React.createElement("div",null,
            React.createElement("div",{style:{background:modeBg,border:"1px solid "+modeColor+"44",borderRadius:16,padding:20,marginBottom:14}},
              React.createElement("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}},
                React.createElement("div",{style:{flex:1,marginRight:12}},
                  React.createElement("div",{style:{fontWeight:900,fontSize:28,color:"#fff",letterSpacing:1}},mode),
                  React.createElement("div",{style:{display:"flex",alignItems:"flex-start",gap:6,marginTop:6}},
                    React.createElement("span",{style:{color:modeColor,fontSize:14,flexShrink:0,marginTop:2}},modeIcon),
                    React.createElement("div",{style:{fontSize:13,color:"#fff",opacity:0.9,lineHeight:1.4}},modeDesc)
                  )
                ),
                React.createElement("button",{style:{padding:"8px 14px",borderRadius:10,border:"1px solid "+modeColor+"44",background:modeColor+"22",color:"#fff",fontWeight:700,fontSize:12,cursor:"pointer",display:"flex",alignItems:"center",gap:4,flexShrink:0}},
                  React.createElement("span",null,"↻")," Refresh"
                )
              ),
              React.createElement("div",{style:{marginTop:14}},
                React.createElement("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:6}},
                  React.createElement("span",{style:{fontSize:12,color:"#fff",opacity:0.8}},"Confidence"),
                  React.createElement("span",{style:{fontSize:12,fontWeight:700,color:"#fff"}},confidence+"%")
                ),
                React.createElement("div",{style:{background:"rgba(0,0,0,0.4)",borderRadius:99,height:8,overflow:"hidden"}},
                  React.createElement("div",{style:{width:confidence+"%",height:"100%",background:modeColor,borderRadius:99}})
                )
              )
            ),
            [["▦","League Rank",leaguePercentile+"th","percentile","#818cf8"],["◎","Starter Value",starterVal.toLocaleString(),"FDP value","#818cf8"],["↗","Future Value",futureVal.toLocaleString(),"youth (≤24)",T.green],["◷","Aging Risk",agingRisk,"veterans","#f97316"]].map(function(card){
              return React.createElement("div",{key:card[1],style:{background:T.bgCard,border:"1px solid "+T.border,borderRadius:14,padding:16,marginBottom:10}},
                React.createElement("div",{style:{display:"flex",alignItems:"center",gap:8,marginBottom:6}},
                  React.createElement("span",{style:{fontSize:16,color:card[4]}},card[0]),
                  React.createElement("span",{style:{fontSize:12,color:T.textSub,fontWeight:600}},card[1])
                ),
                React.createElement("div",{style:{fontWeight:900,fontSize:28,color:card[4],marginBottom:2}},card[2]),
                React.createElement("div",{style:{fontSize:11,color:T.textSub}},card[3])
              );
            })
          );
        })()
      ),

      // ROSTER HEALTH
      leagueSubTab==="roster"&&React.createElement("div",{style:{padding:"16px"}},
        React.createElement("div",{style:{display:"flex",alignItems:"center",gap:12,marginBottom:20}},
          React.createElement("span",{style:{fontSize:28,color:"#60a5fa",fontWeight:900}},"\u2665"),
          React.createElement("div",{style:{fontWeight:900,fontSize:28,lineHeight:1.1}},"Roster Health Dashboard")
        ),
        (function(){
          var myPlayers=rankedPlayers.filter(function(p){return p.pos!=="DST"&&p.pos!=="K";}).slice(0,14);
          var healthy=myPlayers.length;
          var injured=0;
          var onBye=0;
          var posCounts={};
          myPlayers.forEach(function(p){posCounts[p.pos]=(posCounts[p.pos]||0)+1;});
          return React.createElement("div",null,
            React.createElement("div",{style:{display:"grid",gridTemplateColumns:"1fr",gap:10,marginBottom:16}},
              React.createElement("div",{style:{background:"linear-gradient(135deg,#052e16,#065f46)",border:"1px solid "+T.green+"33",borderRadius:14,padding:16}},
                React.createElement("div",{style:{display:"flex",alignItems:"center",gap:8,marginBottom:6}},React.createElement("span",{style:{fontSize:18,color:T.green}},"✓"),React.createElement("span",{style:{fontSize:13,color:"#a7f3d0"}},"Healthy")),
                React.createElement("div",{style:{fontWeight:900,fontSize:28,color:T.green}},healthy)
              ),
              React.createElement("div",{style:{background:"linear-gradient(135deg,#2d0707,#3b0f0f)",border:"1px solid "+T.red+"33",borderRadius:14,padding:16}},
                React.createElement("div",{style:{display:"flex",alignItems:"center",gap:8,marginBottom:6}},React.createElement("span",{style:{fontSize:18,color:T.red}},"⚠"),React.createElement("span",{style:{fontSize:13,color:"#fca5a5"}},"Injured")),
                React.createElement("div",{style:{fontWeight:900,fontSize:28,color:T.red}},injured)
              ),
              React.createElement("div",{style:{background:T.bgCard,border:"1px solid #3b82f633",borderRadius:14,padding:16}},
                React.createElement("div",{style:{display:"flex",alignItems:"center",gap:8,marginBottom:6}},React.createElement("span",{style:{fontSize:18,color:"#60a5fa"}},"▦"),React.createElement("span",{style:{fontSize:13,color:"#93c5fd"}},"On Bye (Week "+byeWeek+")")),
                React.createElement("div",{style:{fontWeight:900,fontSize:28,color:"#60a5fa"}},onBye)
              ),
              React.createElement("div",{style:{background:T.bgCard,border:"1px solid "+T.border,borderRadius:14,padding:16}},
                React.createElement("div",{style:{fontSize:13,color:T.textSub,marginBottom:6}},"Roster Size"),
                React.createElement("div",{style:{fontWeight:900,fontSize:28,color:T.text}},myPlayers.length)
              )
            ),
            React.createElement("div",{style:{background:T.bgCard,border:"1px solid "+T.borderPurple,borderRadius:14,padding:16,marginBottom:16}},
              React.createElement("div",{style:{fontWeight:700,fontSize:14,marginBottom:14}},"Position Breakdown"),
              React.createElement("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}},
                [["WR",posCounts["WR"]||0],["RB",posCounts["RB"]||0],["TE",posCounts["TE"]||0],["QB",posCounts["QB"]||0]].map(function(pc){
                  return React.createElement("div",{key:pc[0],style:{textAlign:"center"}},
                    React.createElement("div",{style:{fontWeight:900,fontSize:28}},pc[1]),
                    React.createElement("div",{style:{fontSize:11,color:T.textSub,fontWeight:600}},pc[0])
                  );
                })
              )
            ),
            React.createElement("div",{style:{marginBottom:16}},
              React.createElement("div",{style:{fontSize:12,color:T.textSub,marginBottom:6,fontWeight:600}},"Check Bye Week"),
              React.createElement("input",{type:"number",value:byeWeek,onChange:function(e){setByeWeek(Number(e.target.value));},style:{background:T.bgInput,color:T.text,border:"1px solid "+T.border,borderRadius:10,padding:"10px 14px",fontSize:13,outline:"none",width:"60px"}})
            ),
            myPlayers.map(function(p){
              return React.createElement("div",{key:p.name,style:{background:T.bgCard,border:"1px solid "+T.border,borderRadius:14,padding:16,marginBottom:10,display:"flex",alignItems:"center",gap:14}},
                React.createElement("div",{style:{position:"relative",flexShrink:0}},
                  React.createElement(Avatar,{name:p.name,pos:p.pos,size:52}),
                  React.createElement("div",{style:{position:"absolute",bottom:-2,right:-2,background:"#1a1a2e",borderRadius:6,padding:"1px 5px",fontSize:9,fontWeight:700,color:T.textSub,border:"1px solid "+T.border}},p.team)
                ),
                React.createElement("div",{style:{flex:1}},
                  React.createElement("div",{style:{fontWeight:700,fontSize:14,marginBottom:6}},p.name),
                  React.createElement("div",{style:{display:"inline-flex",alignItems:"center",gap:4,background:T.green+"18",border:"1px solid "+T.green+"33",borderRadius:20,padding:"3px 10px"}},
                    React.createElement("span",{style:{color:T.green,fontSize:11}},"✓"),
                    React.createElement("span",{style:{color:T.green,fontWeight:700,fontSize:11}},"Healthy")
                  )
                )
              );
            })
          );
        })()
      ),

      // WAIVER WIRE
      leagueSubTab==="waiver"&&React.createElement("div",{style:{padding:"16px"}},
        React.createElement("div",{style:{display:"flex",alignItems:"flex-start",gap:12,marginBottom:20}},
          React.createElement("span",{style:{fontSize:30,color:"#60a5fa",fontWeight:900,marginTop:2}},"↗"),
          React.createElement("div",{style:{fontWeight:900,fontSize:30,lineHeight:1.15}},"Waiver Wire Assistant")
        ),
        React.createElement("div",{style:{background:T.bgCard,border:"1px solid "+T.border,borderRadius:14,padding:16,marginBottom:16}},
          React.createElement("div",{style:{display:"flex",gap:12,alignItems:"flex-start",marginBottom:8}},
            React.createElement("div",{style:{flex:1}},
              React.createElement("div",{style:{fontSize:13,color:T.text,lineHeight:1.5,marginBottom:4}},"Showing available players from your league's waiver wire, sorted by dynasty value"),
              React.createElement("div",{style:{fontSize:11,color:T.textSub,lineHeight:1.5}},"Values from Fantasy Draft Pros · Higher values indicate more valuable players")
            ),
            React.createElement("button",{onClick:function(){setWaiverLoaded(false);setTimeout(function(){setWaiverLoaded(true);},1200);},style:{padding:"10px 14px",borderRadius:10,border:"none",background:"#2563eb",color:"#fff",fontWeight:700,fontSize:12,cursor:"pointer",flexShrink:0,whiteSpace:"nowrap"}},"Force Refresh")
          ),
          React.createElement("input",{value:waiverSearch,onChange:function(e){setWaiverSearch(e.target.value);},placeholder:"Search players...",style:Object.assign({},inpS,{marginBottom:10})}),
          React.createElement("select",{value:waiverPos,onChange:function(e){setWaiverPos(e.target.value);},style:{background:T.bgInput,color:T.text,border:"1px solid "+T.border,borderRadius:10,padding:"10px 14px",fontSize:13,outline:"none",width:"100%",marginBottom:10}},
            ["All Positions","QB","RB","WR","TE","DL","LB","DB"].map(function(p){return React.createElement("option",{key:p},p);})
          ),
          React.createElement("select",{style:{background:T.bgInput,color:T.text,border:"1px solid "+T.border,borderRadius:10,padding:"10px 14px",fontSize:13,outline:"none",width:"100%",marginBottom:10}},
            React.createElement("option",null,"Sort by Dynasty Value"),
            React.createElement("option",null,"Sort by Projected Points"),
            React.createElement("option",null,"Sort by Age")
          ),
          !waiverLoaded&&React.createElement("button",{onClick:function(){setWaiverLoaded(true);},style:{padding:"10px 20px",borderRadius:10,border:"none",background:"#2563eb",color:"#ffffffaa",fontWeight:700,fontSize:13,cursor:"pointer"}},"Loading...")
        ),
        waiverLoaded&&rankedPlayers.filter(function(p){
          return (waiverPos==="All Positions"||p.pos===waiverPos)&&
                 (!waiverSearch||p.name.toLowerCase().includes(waiverSearch.toLowerCase()))&&
                 p.rank>20;
        }).slice(0,15).map(function(p){
          return React.createElement("div",{key:p.name,style:{background:T.bgCard,border:"1px solid "+T.border,borderRadius:12,padding:"12px 14px",marginBottom:8,display:"flex",alignItems:"center",gap:10}},
            React.createElement(Avatar,{name:p.name,pos:p.pos,size:40}),
            React.createElement("div",{style:{flex:1}},
              React.createElement("div",{style:{fontWeight:700,fontSize:13}},p.name),
              React.createElement("div",{style:{fontSize:11,color:T.textSub}},p.pos+" - "+p.team+" | Age "+p.age)
            ),
            React.createElement("div",{style:{textAlign:"right"}},
              React.createElement("div",{style:{fontSize:12,color:T.purple,fontWeight:700}},"Value: "+Math.max(0,Math.round(p.vbd)).toLocaleString()),
              React.createElement("div",{style:{fontSize:11,color:T.green}},"Proj: "+p.pts.toFixed(1)+" pts")
            )
          );
        })
      ),

      // LINEUP OPTIMIZER
      leagueSubTab==="lineup"&&React.createElement("div",{style:{padding:"16px"}},
        React.createElement("div",{style:{display:"flex",alignItems:"center",gap:12,marginBottom:20}},
          React.createElement("span",{style:{fontSize:28,color:T.purple}},"◎"),
          React.createElement("div",{style:{fontWeight:900,fontSize:30}},"Lineup Optimizer")
        ),
        React.createElement("div",{style:{background:T.bgCard,border:"1px solid "+T.border,borderRadius:14,padding:16,marginBottom:14}},
          React.createElement("div",{style:{fontSize:12,color:T.textSub,marginBottom:8,fontWeight:600}},"Select Team"),
          React.createElement("div",{style:{display:"flex",gap:8}},
            React.createElement("select",{value:lineupTeam,onChange:function(e){setLineupTeam(Number(e.target.value));setLineupOptimized(false);},style:{flex:1,background:T.bgInput,color:T.text,border:"1px solid "+T.border,borderRadius:10,padding:"10px 14px",fontSize:13,outline:"none"}},
              LEAGUE_TEAMS.map(function(t,i){return React.createElement("option",{key:i,value:i},t.name);})
            ),
            React.createElement("button",{onClick:function(){setLineupOptimized(true);},style:{padding:"10px 18px",borderRadius:10,border:"none",background:"linear-gradient(135deg,"+T.purple+",#5b21b6)",color:"#fff",fontWeight:700,fontSize:13,cursor:"pointer",display:"flex",alignItems:"center",gap:6}},React.createElement("span",null,"↻")," Optimize")
          )
        ),
        lineupOptimized&&(function(){
          var qbs=rankedPlayers.filter(function(p){return p.pos==="QB";});
          var rbs=rankedPlayers.filter(function(p){return p.pos==="RB";});
          var wrs=rankedPlayers.filter(function(p){return p.pos==="WR";});
          var tes=rankedPlayers.filter(function(p){return p.pos==="TE";});
          var off=lineupTeam*2;
          var curSlots=[["QB",qbs[off+1]||qbs[0]],["RB",rbs[off+2]||rbs[0]],["RB",rbs[off+3]||rbs[1]],["WR",wrs[off+2]||wrs[0]],["WR",wrs[off+3]||wrs[1]],["TE",tes[off+1]||tes[0]]];
          var optSlots=[["QB",qbs[0]],["RB",rbs[0]],["RB",rbs[1]],["WR",wrs[0]],["WR",wrs[1]],["TE",tes[0]]];
          var bench=rankedPlayers.filter(function(p){return p.pos!=="DST"&&p.pos!=="K"&&!curSlots.find(function(s){return s[1]&&s[1].name===p.name;})&&!optSlots.find(function(s){return s[1]&&s[1].name===p.name;});}).slice(0,5);
          var curPts=curSlots.reduce(function(s,sl){return s+(sl[1]?sl[1].pts:0);},0);
          var optPts=optSlots.reduce(function(s,sl){return s+(sl[1]?sl[1].pts:0);},0);
          var curVal=curSlots.reduce(function(s,sl){return s+(sl[1]?sl[1].tradeVal:0);},0);
          var optVal=optSlots.reduce(function(s,sl){return s+(sl[1]?sl[1].tradeVal:0);},0);
          var imps=[];
          optSlots.forEach(function(os,i){if(curSlots[i]&&os[1]&&curSlots[i][1]&&os[1].name!==curSlots[i][1].name){var vd=Math.max(1,os[1].tradeVal-curSlots[i][1].tradeVal);var pd=+(os[1].pts-curSlots[i][1].pts).toFixed(1);imps.push("Swap in "+os[1].name+" for "+curSlots[i][1].name+" (+"+vd.toLocaleString()+" value, +"+pd+" pts)");}});
          return React.createElement("div",null,
            React.createElement("div",{style:{display:"grid",gridTemplateColumns:"1fr",gap:10,marginBottom:16}},
              [["Current Value",curVal.toLocaleString(),curPts.toFixed(1)+" pts",T.text,T.border],["Optimal Value",optVal.toLocaleString(),optPts.toFixed(1)+" pts",T.green,T.green+"33"],["Value Gain","+"+(optVal-curVal).toLocaleString(),"+"+(optPts-curPts).toFixed(1)+" pts",T.green,T.green+"33"]].map(function(card){
                return React.createElement("div",{key:card[0],style:{background:T.bgCard,border:"1px solid "+card[4],borderRadius:14,padding:16}},
                  React.createElement("div",{style:{fontSize:11,color:T.textSub,marginBottom:4}},card[0]),
                  React.createElement("div",{style:{fontWeight:900,fontSize:28,color:card[3]}},card[1]),
                  React.createElement("div",{style:{fontSize:11,color:T.textSub}},card[2])
                );
              })
            ),
            imps.length>0&&React.createElement("div",{style:{background:T.purpleDim,border:"1px solid "+T.borderPurple,borderRadius:14,padding:16,marginBottom:16}},
              React.createElement("div",{style:{display:"flex",alignItems:"center",gap:8,marginBottom:10}},
                React.createElement("span",{style:{fontSize:14,color:T.purple}},"i"),
                React.createElement("span",{style:{fontWeight:700,fontSize:14,color:T.purple}},"Lineup Improvements Available")
              ),
              imps.map(function(imp,idx){return React.createElement("div",{key:idx,style:{fontSize:12,color:T.text,marginBottom:4,lineHeight:1.5}},"· "+imp);})
            ),
            React.createElement("div",{style:{fontWeight:800,fontSize:20,marginBottom:12}},"Current Lineup"),
            curSlots.map(function(slot,si){
              var p=slot[1];
              if(!p) return null;
              return React.createElement("div",{key:si,style:{background:T.bgCard,border:"1px solid "+T.border,borderRadius:12,padding:"14px",marginBottom:8,display:"flex",alignItems:"center",gap:12}},
                React.createElement("div",{style:{position:"relative",flexShrink:0}},
                  React.createElement(Avatar,{name:p.name,pos:p.pos,size:48}),
                  React.createElement("div",{style:{position:"absolute",bottom:-2,right:-2,background:"#1a1a2e",borderRadius:4,padding:"1px 4px",fontSize:8,fontWeight:700,color:T.textSub,border:"1px solid "+T.border}},p.team)
                ),
                React.createElement("div",{style:{flex:1}},
                  React.createElement("div",{style:{fontSize:11,color:T.textSub,marginBottom:2,fontWeight:600}},slot[0]),
                  React.createElement("div",{style:{fontWeight:700,fontSize:16,marginBottom:2}},p.name),
                  React.createElement("div",{style:{fontSize:12,color:T.textSub,marginBottom:6}},p.pos+" - "+p.team),
                  React.createElement("div",{style:{display:"flex",alignItems:"center",gap:16}},
                    React.createElement("span",{style:{fontSize:13,color:T.purple,fontWeight:700}},"Value: "+p.tradeVal.toLocaleString()),
                    React.createElement("span",{style:{fontSize:13,color:T.green,fontWeight:600}},"Proj: "+p.pts.toFixed(1)+" pts")
                  )
                )
              );
            }),
            React.createElement("div",{style:{display:"flex",alignItems:"center",gap:10,marginTop:8,marginBottom:12}},
              React.createElement("span",{style:{fontSize:24,color:T.green}},"↗"),
              React.createElement("span",{style:{fontWeight:800,fontSize:20}},"Optimal Lineup")
            ),
            optSlots.map(function(slot,si){
              var p=slot[1];
              var isBetter=curSlots[si]&&p&&curSlots[si][1]&&p.name!==curSlots[si][1].name;
              if(!p) return null;
              return React.createElement("div",{key:si,style:{background:T.bgCard,border:"1px solid "+(isBetter?T.borderPurple:T.border),borderRadius:12,padding:"14px",marginBottom:8,display:"flex",alignItems:"center",gap:12}},
                React.createElement("div",{style:{position:"relative",flexShrink:0}},
                  React.createElement(Avatar,{name:p.name,pos:p.pos,size:48}),
                  React.createElement("div",{style:{position:"absolute",bottom:-2,right:-2,background:"#1a1a2e",borderRadius:4,padding:"1px 4px",fontSize:8,fontWeight:700,color:T.textSub,border:"1px solid "+T.border}},p.team)
                ),
                React.createElement("div",{style:{flex:1}},
                  React.createElement("div",{style:{display:"flex",alignItems:"center",gap:8,marginBottom:2}},
                    React.createElement("span",{style:{fontSize:11,color:T.textSub,fontWeight:600}},slot[0]),
                    isBetter&&React.createElement("div",{style:{background:T.green,color:"#fff",fontSize:10,fontWeight:800,borderRadius:20,padding:"2px 10px",display:"inline-flex",alignItems:"center",gap:4}},React.createElement("span",null,"↗"),"BETTER")
                  ),
                  React.createElement("div",{style:{fontWeight:700,fontSize:16,marginBottom:2}},p.name),
                  React.createElement("div",{style:{fontSize:12,color:T.textSub,marginBottom:6}},p.pos+" - "+p.team),
                  React.createElement("div",{style:{display:"flex",alignItems:"center",gap:16}},
                    React.createElement("span",{style:{fontSize:13,color:T.purple,fontWeight:700}},"Value: "+p.tradeVal.toLocaleString()),
                    React.createElement("span",{style:{fontSize:13,color:T.green,fontWeight:600}},"Proj: "+p.pts.toFixed(1)+" pts")
                  )
                )
              );
            }),
            React.createElement("div",{style:{fontWeight:800,fontSize:20,marginBottom:12,marginTop:8}},"Bench Players"),
            bench.map(function(p){
              return React.createElement("div",{key:p.name,style:{background:T.bgCard,border:"1px solid "+T.border,borderRadius:12,padding:"14px",marginBottom:8,display:"flex",alignItems:"center",gap:12}},
                React.createElement("div",{style:{position:"relative",flexShrink:0}},
                  React.createElement(Avatar,{name:p.name,pos:p.pos,size:48}),
                  React.createElement("div",{style:{position:"absolute",bottom:-2,right:-2,background:"#1a1a2e",borderRadius:4,padding:"1px 4px",fontSize:8,fontWeight:700,color:T.textSub,border:"1px solid "+T.border}},p.team)
                ),
                React.createElement("div",{style:{flex:1}},
                  React.createElement("div",{style:{fontSize:11,color:T.textSub,marginBottom:2,fontWeight:600}},p.pos),
                  React.createElement("div",{style:{fontWeight:700,fontSize:16,marginBottom:2}},p.name),
                  React.createElement("div",{style:{fontSize:12,color:T.textSub,marginBottom:6}},p.pos+" - "+p.team),
                  React.createElement("div",{style:{display:"flex",alignItems:"center",gap:16}},
                    React.createElement("span",{style:{fontSize:13,color:T.purple,fontWeight:700}},"Value: "+p.tradeVal.toLocaleString()),
                    React.createElement("span",{style:{fontSize:13,color:T.green,fontWeight:600}},"Proj: "+p.pts.toFixed(1)+" pts")
                  )
                )
              );
            })
          );
        })()
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
      React.createElement("div",{style:{display:"flex",gap:6,overflowX:"auto",padding:"10px 12px",borderBottom:"1px solid "+T.border,scrollbarWidth:"none",WebkitOverflowScrolling:"touch"}},
        [["playervalues","$ Player Values"],["allrankings","All Rankings"],["qbs","QBs"],["rbs","RBs"],["wrs","WRs"],["tes","TEs"],["idp","IDP"],["rookie","Rookie Picks"],["trending","Trending"],["market","Market"],["valuetrends","Value Trends"],["watchlist","Watchlist"],["draft","Draft Kit"],["keeper","Keeper Calc"],["compare","Compare"]].map(function(st){
          var active=rankSubTab===st[0];
          return React.createElement("button",{key:st[0],onClick:function(){setRankSubTab(st[0]);},style:{padding:"7px 14px",borderRadius:20,border:"1px solid "+(active?T.purple:T.border),background:active?T.purple:"transparent",color:active?"#fff":T.textSub,fontWeight:700,fontSize:12,cursor:"pointer",whiteSpace:"nowrap",flexShrink:0}},st[1]);
        })
      ),

      // PLAYER VALUES (image 1 — FDP Value table with 7D Change)
      rankSubTab==="playervalues"&&React.createElement("div",{style:{paddingBottom:16}},
        React.createElement("div",{style:{padding:"14px 16px 0"}},
          React.createElement("div",{style:{fontWeight:900,fontSize:20,marginBottom:2}},"FDP Player Values"),
          React.createElement("div",{style:{fontSize:12,color:T.textSub,marginBottom:12}},"Fantasy Draft Pros dynasty values"),
          React.createElement("div",{style:{display:"flex",gap:6}},
            ["SF","1QB","TEP"].map(function(fmt){var active=rankFormat===fmt;return React.createElement("button",{key:fmt,onClick:function(){setRankFormat(fmt);},style:{padding:"7px 18px",borderRadius:10,border:"1px solid "+(active?T.purple:T.border),background:active?T.purple:"transparent",color:active?"#fff":T.textSub,fontWeight:700,fontSize:13,cursor:"pointer"}},fmt);})
          )
        ),
        React.createElement("div",{style:{display:"grid",gridTemplateColumns:"1fr 72px 96px",padding:"10px 16px",borderTop:"1px solid "+T.border,borderBottom:"1px solid "+T.border,marginTop:12,background:T.bgInput,gap:4}},
          React.createElement("div",{style:{fontSize:9,fontWeight:700,color:T.textDim,letterSpacing:1}},"DETAILS"),
          React.createElement("div",{style:{fontSize:9,fontWeight:700,color:T.textDim,letterSpacing:1,textAlign:"center"}},"7D CHANGE"),
          React.createElement("div",{style:{fontSize:9,fontWeight:700,color:T.purple,letterSpacing:1,textAlign:"right"}},"FDP VALUE ("+rankFormat+")")
        ),
        rankedPlayers.filter(function(p){return !user||user.isPro||p.rank<=FREE_RANK_LIMIT;}).map(function(p){
          var h=0;for(var i=0;i<p.name.length;i++)h=(h*31+p.name.charCodeAt(i))&0xffff;
          var change=Math.round(((h%21)-10)*50);
          var fdpVal=Math.round(p.pts*30+Math.max(0,p.vbd)*5);
          return React.createElement("div",{key:p.name,style:{display:"grid",gridTemplateColumns:"1fr 72px 96px",padding:"12px 16px",borderBottom:"1px solid "+T.border,alignItems:"center",gap:4}},
            React.createElement("div",null,
              React.createElement("div",{style:{fontWeight:700,fontSize:14,color:T.text,marginBottom:3}},p.name),
              React.createElement("div",{style:{display:"flex",alignItems:"center",gap:5}},
                React.createElement("span",{style:{width:3,height:12,borderRadius:2,background:POS_COLORS[p.pos]||"#888",display:"inline-block",flexShrink:0}}),
                React.createElement("span",{style:{fontSize:11,color:T.textSub,fontWeight:600}},p.team)
              )
            ),
            React.createElement("div",{style:{textAlign:"center",fontWeight:700,fontSize:13,color:change>0?T.green:change<0?T.red:T.textDim}},change!==0?(change>0?"+":"")+change:"—"),
            React.createElement("div",{style:{textAlign:"right",fontWeight:800,fontSize:15,color:T.purpleLight}},fdpVal+".0")
          );
        }),
        (!user||!user.isPro)&&React.createElement("div",{style:{background:T.purpleDim,border:"1px solid "+T.purple+"44",borderRadius:14,padding:"16px",textAlign:"center",margin:"16px"}},
          React.createElement("div",{style:{fontWeight:700,fontSize:14,color:T.purpleLight,marginBottom:6}},"Unlock Full Rankings"),
          React.createElement("div",{style:{fontSize:12,color:T.textSub,marginBottom:12}},"See all 200+ players with Pro"),
          React.createElement("button",{onClick:function(){setAuthMode("signup");setShowAuth(true);},style:{padding:"10px 24px",borderRadius:12,border:"none",background:"linear-gradient(135deg,"+T.purple+",#5b21b6)",color:"#fff",fontWeight:700,fontSize:13,cursor:"pointer"}},"Start Free Trial")
        )
      ),

      // ALL RANKINGS + POSITION TABS (image 2 — Dynasty Rankings hero + filters)
      (rankSubTab==="allrankings"||rankSubTab==="qbs"||rankSubTab==="rbs"||rankSubTab==="wrs"||rankSubTab==="tes")&&React.createElement("div",{style:{paddingBottom:16}},
        React.createElement("div",{style:{background:"linear-gradient(135deg,#2d52e0,#4466ff)",margin:"16px",borderRadius:16,padding:"24px 20px",display:"flex",alignItems:"flex-start",gap:16}},
          React.createElement("div",{style:{fontSize:34,lineHeight:1,color:"#f59e0b"}},"*"),
          React.createElement("div",null,
            React.createElement("div",{style:{fontWeight:900,fontSize:28,color:"#fff",lineHeight:1.1,marginBottom:8}},"Dynasty",React.createElement("br",null),"Rankings"),
            React.createElement("div",{style:{fontSize:14,color:"rgba(255,255,255,0.8)",lineHeight:1.5}},"FantasyDraftPros player values",React.createElement("br",null),"and rankings")
          )
        ),
        rankSubTab==="allrankings"&&React.createElement("div",{style:{padding:"0 16px 12px"}},
          React.createElement("div",{style:{fontSize:12,color:T.textSub,fontWeight:600,marginBottom:8}},"Position"),
          React.createElement("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:8}},
            ["QB","RB","WR","TE"].map(function(pos){
              var active=rankPos===pos;var pc=POS_COLORS[pos]||T.purple;
              return React.createElement("button",{key:pos,onClick:function(){setRankPos(pos);},style:{padding:"12px 8px",borderRadius:10,border:"1px solid "+(active?pc:T.border),background:active?pc:"transparent",color:active?"#fff":T.textSub,fontWeight:700,fontSize:15,cursor:"pointer",textAlign:"center"}},pos);
            })
          )
        ),
        React.createElement("div",{style:{padding:"0 16px 12px"}},
          React.createElement("div",{style:{fontSize:12,color:T.textSub,fontWeight:600,marginBottom:8}},"Format"),
          React.createElement("div",{style:{display:"flex",gap:8}},
            ["SF","1QB","TEP"].map(function(fmt){
              var active=rankFormat===fmt;
              return React.createElement("button",{key:fmt,onClick:function(){setRankFormat(fmt);},style:{padding:"10px 22px",borderRadius:10,border:"none",background:active?"#22c55e":T.bgInput,color:active?"#fff":T.textSub,fontWeight:700,fontSize:14,cursor:"pointer"}},fmt);
            })
          )
        ),
        React.createElement("div",{style:{padding:"0 16px 12px"}},
          React.createElement("div",{style:{fontSize:12,color:T.textSub,fontWeight:600,marginBottom:8}},"Search Players"),
          React.createElement("input",{value:rankSearch,onChange:function(e){setRankSearch(e.target.value);},placeholder:"Search by name...",style:Object.assign({},inpS)})
        ),
        React.createElement("div",{style:{padding:"0 16px 16px",borderBottom:"1px solid "+T.border}},
          React.createElement("div",{style:{fontSize:12,color:T.textSub,fontWeight:600,marginBottom:8}},"Filter by Team"),
          React.createElement("input",{value:rankTeamFilter==="All Teams"?"":rankTeamFilter,onChange:function(e){setRankTeamFilter(e.target.value||"All Teams");},placeholder:"All Teams",style:Object.assign({},inpS)})
        ),
        React.createElement("div",{style:{display:"grid",gridTemplateColumns:"44px 1fr 52px",padding:"8px 16px",background:T.bgInput,borderBottom:"1px solid "+T.border}},
          React.createElement("div",{style:{fontSize:9,fontWeight:700,color:T.textDim,letterSpacing:1}},"RANK"),
          React.createElement("div",{style:{fontSize:9,fontWeight:700,color:T.textDim,letterSpacing:1}},"PLAYER"),
          React.createElement("div",{style:{fontSize:9,fontWeight:700,color:T.textDim,letterSpacing:1,textAlign:"right"}},"TEAM")
        ),
        (function(){
          var posF=rankSubTab==="allrankings"?rankPos:rankSubTab==="qbs"?"QB":rankSubTab==="rbs"?"RB":rankSubTab==="wrs"?"WR":"TE";
          return rankedPlayers.filter(function(p){
            return p.pos===posF&&(!rankSearch||p.name.toLowerCase().includes(rankSearch.toLowerCase()))&&(rankTeamFilter==="All Teams"||p.team.toUpperCase()===rankTeamFilter.toUpperCase());
          }).filter(function(p){return !user||user.isPro||p.posRank<=FREE_RANK_LIMIT;}).map(function(p){
            return React.createElement("div",{key:p.name,style:{display:"grid",gridTemplateColumns:"44px 1fr 52px",padding:"12px 16px",borderBottom:"1px solid "+T.border,alignItems:"center"}},
              React.createElement("div",{style:{fontWeight:800,fontSize:13,color:T.textDim}},p.posRank),
              React.createElement("div",{style:{display:"flex",alignItems:"center",gap:10}},
                React.createElement(Avatar,{name:p.name,pos:p.pos,size:36}),
                React.createElement("div",null,
                  React.createElement("div",{style:{fontWeight:700,fontSize:14,color:T.text}},p.name),
                  React.createElement("div",{style:{fontSize:10,color:T.textSub,marginTop:2}},p.note)
                )
              ),
              React.createElement("div",{style:{textAlign:"right"}},
                React.createElement("div",{style:{fontWeight:700,fontSize:13,color:T.text}},p.team),
                React.createElement("div",{style:{fontSize:9,color:T.textSub}},p.pos)
              )
            );
          });
        })(),
        (!user||!user.isPro)&&React.createElement("div",{style:{background:T.purpleDim,border:"1px solid "+T.purple+"44",borderRadius:14,padding:"16px",textAlign:"center",margin:"16px"}},
          React.createElement("div",{style:{fontWeight:700,fontSize:14,color:T.purpleLight,marginBottom:6}},"Unlock Full Rankings"),
          React.createElement("div",{style:{fontSize:12,color:T.textSub,marginBottom:12}},"See all 200+ players with Pro"),
          React.createElement("button",{onClick:function(){setAuthMode("signup");setShowAuth(true);},style:{padding:"10px 24px",borderRadius:12,border:"none",background:"linear-gradient(135deg,"+T.purple+",#5b21b6)",color:"#fff",fontWeight:700,fontSize:13,cursor:"pointer"}},"Start Free Trial")
        )
      ),

      // IDP
      rankSubTab==="idp"&&React.createElement("div",{style:{padding:"16px"}},
        React.createElement("div",{style:{fontWeight:900,fontSize:22,marginBottom:12}},"IDP Rankings"),
        React.createElement("div",{style:{display:"flex",gap:6,flexWrap:"wrap",marginBottom:12}},
          ["DL","LB","DB"].map(function(p){return React.createElement("button",{key:p,onClick:function(){setRankIdpPos(p);},style:{padding:"6px 16px",borderRadius:20,border:"1px solid "+(rankIdpPos===p?(POS_COLORS[p]||T.purple):T.border),background:rankIdpPos===p?(POS_COLORS[p]||T.purple)+"22":"transparent",color:rankIdpPos===p?(POS_COLORS[p]||T.purple):T.textSub,fontWeight:700,fontSize:12,cursor:"pointer"}},p);})
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

      // ROOKIE PICKS
      rankSubTab==="rookie"&&React.createElement("div",{style:{padding:"16px"}},
        React.createElement("div",{style:{fontWeight:900,fontSize:22,marginBottom:4}},"Rookie Picks"),
        React.createElement("div",{style:{fontSize:12,color:T.textSub,marginBottom:16}},"2026 dynasty draft pick values"),
        DRAFT_PICKS.map(function(pk){
          var tierC=pk.round===1?"#f1c40f":pk.round===2?"#818cf8":"#4b5563";
          return React.createElement("div",{key:pk.id,style:{background:T.bgCard,border:"1px solid "+T.border,borderRadius:12,padding:"14px 16px",marginBottom:8,display:"flex",alignItems:"center",gap:12}},
            React.createElement("div",{style:{width:42,height:42,borderRadius:10,background:tierC+"22",border:"1px solid "+tierC+"44",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,fontSize:11,color:tierC,flexShrink:0,textAlign:"center"}},"R"+pk.round),
            React.createElement("div",{style:{flex:1}},
              React.createElement("div",{style:{fontWeight:700,fontSize:14,color:T.text}},pk.name),
              React.createElement("div",{style:{fontSize:11,color:T.textSub,marginTop:2}},pk.note)
            ),
            React.createElement("div",{style:{textAlign:"right",flexShrink:0}},
              React.createElement("div",{style:{fontWeight:800,fontSize:16,color:tierC}},"$"+pk.est),
              React.createElement("div",{style:{fontSize:9,color:T.textSub,marginTop:2}},pk.round===1?"1st Round":pk.round===2?"2nd Round":"3rd Round")
            )
          );
        })
      ),

      // TRENDING (image 3)
      rankSubTab==="trending"&&React.createElement("div",{style:{padding:"16px"}},
        React.createElement("div",{style:{background:T.bgCard,border:"1px solid "+T.border,borderRadius:16,padding:20}},
          React.createElement("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:16}},
            React.createElement("div",null,
              React.createElement("div",{style:{display:"flex",alignItems:"center",gap:10,marginBottom:4}},
                React.createElement("span",{style:{fontSize:20,color:T.green}},"~"),
                React.createElement("div",{style:{fontWeight:900,fontSize:22}},"Trending Players")
              ),
              React.createElement("div",{style:{fontSize:12,color:T.textSub}},"Real-time value adjustments")
            ),
            React.createElement("button",{style:{width:36,height:36,borderRadius:10,border:"1px solid "+T.border,background:T.bgInput,cursor:"pointer",color:T.textSub,fontSize:16,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}},"o")
          ),
          React.createElement("div",{style:{display:"flex",gap:8,marginBottom:12}},
            [["all","All (0)"],["rising","Rising (0)"],["falling","Falling (0)"]].map(function(f){
              var active=trendingFilter===f[0];
              return React.createElement("button",{key:f[0],onClick:function(){setTrendingFilter(f[0]);},style:{padding:"7px 14px",borderRadius:20,border:"1px solid "+(active?T.purple:T.border),background:active?T.purple:"transparent",color:active?"#fff":T.textSub,fontWeight:700,fontSize:12,cursor:"pointer"}},f[1]);
            })
          ),
          React.createElement("div",{style:{display:"flex",alignItems:"center",gap:6,marginBottom:16,fontSize:12,color:T.textSub}},
            React.createElement("span",null,"o")," Last updated: "+(new Date().toLocaleTimeString())
          ),
          React.createElement("div",{style:{background:darkMode?"#0f2a4a":"#dbeafe",border:"1px solid "+(darkMode?"#3b82f644":"#93c5fd"),borderRadius:10,padding:"12px 14px",marginBottom:24,display:"flex",alignItems:"flex-start",gap:10}},
            React.createElement("span",{style:{color:"#60a5fa",fontSize:14,flexShrink:0,marginTop:1}},"i"),
            React.createElement("div",{style:{fontSize:12,color:darkMode?"#93c5fd":"#1e40af",lineHeight:1.6}},"Adjustments are temporary overlays on base values. They react to injuries, role changes, and transactions, and reset during nightly rebuilds. Base rankings remain stable.")
          ),
          React.createElement("div",{style:{textAlign:"center",padding:"32px 0"}},
            React.createElement("div",{style:{fontSize:32,color:T.textDim,marginBottom:12}},"~"),
            React.createElement("div",{style:{fontWeight:700,fontSize:16,color:T.textSub,marginBottom:6}},"No trending players at the moment"),
            React.createElement("div",{style:{fontSize:13,color:T.textDim}},"Check back after injuries or transactions")
          )
        )
      ),

      // MARKET — Dynasty Market Trends
      rankSubTab==="market"&&React.createElement("div",{style:{paddingBottom:16}},
        React.createElement("div",{style:{background:T.bgCard,border:"1px solid "+T.border,borderRadius:16,margin:"16px",marginBottom:12,padding:20}},
          React.createElement("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}},
            React.createElement("div",{style:{flex:1,marginRight:16}},
              React.createElement("div",{style:{fontWeight:900,fontSize:26,lineHeight:1.15,marginBottom:8,color:T.text}},"Dynasty Market",React.createElement("br",null),"Trends"),
              React.createElement("div",{style:{fontSize:13,color:T.textSub,lineHeight:1.5,marginBottom:10}},"Real-time buy-low and sell-high opportunities based on value movement"),
              React.createElement("div",{style:{fontSize:11,color:T.textDim}},"Last updated: "+(new Date().toLocaleString()))
            ),
            React.createElement("button",{style:{padding:"10px 14px",borderRadius:10,border:"none",background:"#2563eb",color:"#fff",fontWeight:700,fontSize:13,cursor:"pointer",display:"flex",alignItems:"center",gap:6,flexShrink:0,whiteSpace:"nowrap"}},"o Refresh")
          )
        ),
        React.createElement("div",{style:{background:T.bgCard,border:"1px solid "+T.border,borderRadius:16,margin:"0 16px 12px",overflow:"hidden"}},
          React.createElement("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr"}},
            [["buylow","Buy Low","Players whose values have dropped significantly","#22c55e"],["sellhigh","Sell High","Players whose values have spiked recently","#818cf8"],["rising","Rising","Players with steady upward momentum","#60a5fa"],["falling","Falling","Players with declining values","#9b96b8"]].map(function(cat){
              var active=marketFilter===cat[0];
              return React.createElement("div",{key:cat[0],onClick:function(){setMarketFilter(cat[0]);},style:{padding:"14px 10px",cursor:"pointer",borderLeft:"3px solid "+(active?cat[3]:"transparent"),background:active?cat[3]+"11":"transparent",borderBottom:"1px solid "+T.border}},
                React.createElement("div",{style:{fontWeight:800,fontSize:12,color:active?cat[3]:T.textSub,marginBottom:4,lineHeight:1.2}},cat[1]),
                React.createElement("div",{style:{fontSize:9,color:T.textDim,lineHeight:1.4}},cat[2])
              );
            })
          )
        ),
        React.createElement("div",{style:{background:T.bgCard,border:"1px solid "+T.border,borderRadius:16,margin:"0 16px 12px",padding:"12px 14px",display:"flex",alignItems:"center",gap:8}},
          React.createElement("span",{style:{color:T.textDim,fontSize:14}},"V"),
          React.createElement("select",{value:marketPos,onChange:function(e){setMarketPos(e.target.value);},style:{background:T.bgInput,color:T.text,border:"1px solid "+T.border,borderRadius:8,padding:"8px 12px",fontSize:13,outline:"none",flex:1,cursor:"pointer"}},
            ["All Positions","QB","RB","WR","TE","DL","LB","DB"].map(function(p){return React.createElement("option",{key:p},p);})
          ),
          React.createElement("button",{style:{width:36,height:36,borderRadius:8,border:"1px solid "+T.border,background:T.bgInput,cursor:"pointer",color:T.textSub,fontSize:12,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}},"Q"),
          (function(){
            var ct=rankedPlayers.filter(function(p){
              if(marketPos!=="All Positions"&&p.pos!==marketPos)return false;
              if(marketFilter==="buylow")return p.age>29||p.posRank>8;
              if(marketFilter==="sellhigh")return p.age<26&&p.posRank<=8;
              if(marketFilter==="rising")return p.age<27&&p.posRank<=12;
              return p.age>31;
            }).length;
            return React.createElement("span",{style:{fontSize:12,color:T.textSub,whiteSpace:"nowrap",flexShrink:0}},"Showing "+Math.min(ct,8)+" players");
          })()
        ),
        (function(){
          var catColor=marketFilter==="buylow"?"#22c55e":marketFilter==="sellhigh"?"#818cf8":marketFilter==="rising"?"#60a5fa":T.red;
          return rankedPlayers.filter(function(p){
            if(marketPos!=="All Positions"&&p.pos!==marketPos)return false;
            if(marketFilter==="buylow")return p.age>29||p.posRank>8;
            if(marketFilter==="sellhigh")return p.age<26&&p.posRank<=8;
            if(marketFilter==="rising")return p.age<27&&p.posRank<=12;
            return p.age>31;
          }).slice(0,8).map(function(p){
            var h=0;for(var i=0;i<p.name.length;i++)h=(h*31+p.name.charCodeAt(i))&0xffff;
            var conf=60+((h%4)*10);
            var chg=marketFilter==="buylow"||marketFilter==="falling"?-(Math.round(((h%10)+1)*200)):+(Math.round(((h%10)+1)*200));
            var fdpVal=Math.round(p.pts*30+Math.max(0,p.vbd)*5);
            var confColor=conf>=80?"#22c55e":conf>=60?"#f59e0b":"#ef4444";
            var chgColor=chg<0?T.red:T.green;
            return React.createElement("div",{key:p.name,style:{background:T.bgCard,border:"2px solid "+catColor+"33",borderRadius:16,padding:16,margin:"0 16px 10px"}},
              React.createElement("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:6}},
                React.createElement("div",null,
                  React.createElement("div",{style:{fontWeight:800,fontSize:17,color:T.text,marginBottom:4}},p.name),
                  React.createElement("div",{style:{display:"flex",alignItems:"center",gap:6,fontSize:12,color:T.textSub}},
                    React.createElement(PBadge,{pos:p.pos}),React.createElement("span",null,"·"),React.createElement("span",{style:{fontWeight:600}},p.team)
                  )
                ),
                React.createElement("div",{style:{background:confColor,color:"#fff",fontWeight:800,fontSize:12,borderRadius:20,padding:"4px 10px",flexShrink:0}},conf+"%")
              ),
              React.createElement("div",{style:{marginTop:10}},
                React.createElement("div",{style:{fontSize:11,color:T.textSub,marginBottom:2}},"Current Value"),
                React.createElement("div",{style:{fontWeight:800,fontSize:22,color:T.text,marginBottom:10}},fdpVal.toLocaleString())
              ),
              React.createElement("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,paddingTop:10,borderTop:"1px solid "+T.border}},
                React.createElement("div",null,
                  React.createElement("div",{style:{fontSize:11,color:T.textSub,marginBottom:3}},"Change"),
                  React.createElement("div",{style:{fontWeight:700,fontSize:14,color:chgColor}},(chg>0?"+":"")+chg.toLocaleString()),
                  React.createElement("div",{style:{fontSize:10,color:T.textDim}},"0%")
                ),
                React.createElement("div",null,
                  React.createElement("div",{style:{fontSize:11,color:T.textSub,marginBottom:3}},"7D Change"),
                  React.createElement("div",{style:{fontWeight:700,fontSize:14,color:chgColor}},(chg>0?"+":"")+chg.toLocaleString()),
                  React.createElement("div",{style:{fontSize:10,color:T.textDim}},"0%")
                )
              )
            );
          });
        })()
      ),

      // VALUE TRENDS — Value Trend Tracker
      rankSubTab==="valuetrends"&&React.createElement("div",{style:{padding:"16px"}},
        React.createElement("div",{style:{display:"flex",alignItems:"center",gap:12,marginBottom:20}},
          React.createElement("span",{style:{fontSize:28,color:"#3b82f6",fontWeight:900,lineHeight:1}},"^"),
          React.createElement("div",{style:{fontWeight:900,fontSize:26,color:T.text}},"Value Trend Tracker")
        ),
        React.createElement("div",{style:{background:T.bgCard,border:"1px solid "+T.border,borderRadius:14,padding:16,marginBottom:12}},
          React.createElement("div",{style:{position:"relative",marginBottom:10}},
            React.createElement("span",{style:{position:"absolute",left:14,top:"50%",transform:"translateY(-50%)",color:T.textDim,fontSize:13}},"Q"),
            React.createElement("input",{value:valueTrendSearch,onChange:function(e){setValueTrendSearch(e.target.value);},placeholder:"Search tracked players...",style:Object.assign({},inpS,{paddingLeft:38})})
          ),
          React.createElement("button",{style:{width:"100%",padding:"13px",borderRadius:10,border:"none",background:"#2563eb",color:"#fff",fontWeight:700,fontSize:14,cursor:"pointer"}},"Refresh Trends")
        ),
        React.createElement("div",{style:{background:T.bgCard,border:"1px solid "+T.border,borderRadius:14,padding:"48px 20px",textAlign:"center"}},
          React.createElement("div",{style:{fontSize:44,color:T.textDim,marginBottom:16,lineHeight:1}},"^"),
          React.createElement("div",{style:{fontWeight:700,fontSize:17,color:T.textSub,marginBottom:8}},"No trend data available yet"),
          React.createElement("div",{style:{fontSize:13,color:T.textDim,lineHeight:1.6}},"Player values will be tracked automatically over time")
        )
      ),

      // WATCHLIST — empty state redesign
      rankSubTab==="watchlist"&&React.createElement("div",{style:{paddingBottom:8}},
        watchlist.length===0
          ?React.createElement("div",{style:{padding:"60px 24px 32px",textAlign:"center"}},
              React.createElement("div",{style:{fontSize:64,color:T.textDim,marginBottom:20,lineHeight:1}},"\u2606"),
              React.createElement("div",{style:{fontWeight:900,fontSize:22,color:T.text,marginBottom:10}},"Your Watchlist is Empty"),
              React.createElement("div",{style:{fontSize:14,color:T.textSub,lineHeight:1.6,marginBottom:28,maxWidth:280,margin:"0 auto 28px"}},"Follow players to receive alerts when their values change significantly"),
              React.createElement("input",{placeholder:"Search players to add to watchlist...",style:Object.assign({},inpS,{background:T.bgCard,borderRadius:12,border:"1px solid "+T.border})})
            )
          :React.createElement("div",{style:{padding:"16px"}},
              rankedPlayers.filter(function(p){return watchlist.indexOf(p.name)!==-1;}).map(function(p){
                return React.createElement("div",{key:p.name,style:{background:T.bgCard,border:"1px solid "+T.borderPurple,borderRadius:12,padding:"10px 14px",marginBottom:8,display:"flex",alignItems:"center",gap:10}},
                  React.createElement(Avatar,{name:p.name,pos:p.pos,size:32}),
                  React.createElement(PBadge,{pos:p.pos,rank:p.posRank}),
                  React.createElement("div",{style:{flex:1}},
                    React.createElement("div",{style:{fontWeight:700,fontSize:13}},p.name),
                    React.createElement("div",{style:{fontSize:10,color:T.textSub}},p.team+" | val "+p.tradeVal)
                  ),
                  React.createElement("button",{onClick:function(){setWatchlist(function(w){return w.filter(function(x){return x!==p.name;});});},style:{background:"none",border:"none",cursor:"pointer",color:T.gold,fontSize:16}},"\u2605")
                );
              })
            )
      ),

      // DRAFT KIT
      rankSubTab==="draft"&&React.createElement("div",{style:{paddingBottom:16}},
        React.createElement("style",null,"@keyframes fdp-spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}"),
        React.createElement("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"16px 16px 12px"}},
          React.createElement("div",{style:{display:"flex",alignItems:"center",gap:10}},
            React.createElement("span",{style:{fontSize:22,color:"#3b82f6"}},"[=]"),
            React.createElement("div",{style:{fontWeight:900,fontSize:24,color:T.text}},"Draft Kit")
          ),
          React.createElement("button",{onClick:function(){alert("Rankings saved!");},style:{padding:"10px 18px",borderRadius:10,border:"none",background:"#22c55e",color:"#fff",fontWeight:700,fontSize:13,cursor:"pointer"}},"Save Rankings")
        ),
        React.createElement("div",{style:{background:T.bgCard,border:"1px solid "+T.border,borderRadius:14,margin:"0 16px 16px",padding:"14px 16px"}},
          React.createElement("div",{style:{display:"flex",gap:8,marginBottom:10}},
            React.createElement("button",{onClick:function(){setDraftKitSearch(draftKitSearch?"":"");},style:{width:44,height:44,borderRadius:10,border:"1px solid "+T.border,background:T.bgInput,cursor:"pointer",color:T.textSub,fontSize:13,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}},"Q"),
            React.createElement("select",{value:draftKitPos,onChange:function(e){setDraftKitPos(e.target.value);},style:{flex:1,background:T.bgInput,color:T.text,border:"1px solid "+T.border,borderRadius:10,padding:"10px 14px",fontSize:13,outline:"none",cursor:"pointer"}},
              ["All Positions","QB","RB","WR","TE","K","DST"].map(function(p){return React.createElement("option",{key:p},p);})
            ),
            React.createElement("button",{onClick:function(){setDraftKitLoaded(function(v){return !v;});},style:{padding:"10px 16px",borderRadius:10,border:"none",background:"#2563eb",color:draftKitLoaded?"#fff":"rgba(255,255,255,0.7)",fontWeight:700,fontSize:13,cursor:"pointer",flexShrink:0}},draftKitLoaded?"Reset":"Loading...")
          ),
          React.createElement("div",{style:{display:"flex",gap:20,fontSize:13,color:T.textSub}},
            React.createElement("span",null,"Drafted: ",React.createElement("span",{style:{fontWeight:800,color:T.text}},drafted.length)),
            React.createElement("span",null,"Available: ",React.createElement("span",{style:{fontWeight:800,color:T.text}},rankedPlayers.filter(function(p){return drafted.indexOf(p.name)===-1&&(draftKitPos==="All Positions"||p.pos===draftKitPos);}).length))
          )
        ),
        !draftKitLoaded
          ?React.createElement("div",{style:{textAlign:"center",padding:"60px 20px"}},
              React.createElement("div",{style:{width:48,height:48,border:"3px solid #3b82f6",borderTopColor:"transparent",borderRadius:"50%",margin:"0 auto 16px",animation:"fdp-spin 0.9s linear infinite"}}),
              React.createElement("div",{style:{fontSize:14,color:T.textSub}},"Loading draft board...")
            )
          :React.createElement("div",null,
              draftKitSearch&&React.createElement("div",{style:{padding:"0 16px 8px"}},
                React.createElement("input",{value:draftKitSearch,onChange:function(e){setDraftKitSearch(e.target.value);},placeholder:"Search players...",style:Object.assign({},inpS)})
              ),
              rankedPlayers.filter(function(p){
                return (draftKitPos==="All Positions"||p.pos===draftKitPos)&&(!draftKitSearch||p.name.toLowerCase().includes(draftKitSearch.toLowerCase()));
              }).slice(0,40).map(function(p){
                var isDrafted=drafted.indexOf(p.name)!==-1;
                return React.createElement("div",{key:p.name,style:{background:T.bgCard,border:"1px solid "+T.border,borderRadius:10,padding:"10px 14px",marginBottom:5,margin:"0 16px 6px",display:"flex",alignItems:"center",gap:10,opacity:isDrafted?0.4:1}},
                  React.createElement("span",{style:{fontWeight:700,fontSize:11,color:T.textDim,width:24,flexShrink:0}},"#"+p.rank),
                  React.createElement(Avatar,{name:p.name,pos:p.pos,size:30}),
                  React.createElement(PBadge,{pos:p.pos,rank:p.posRank}),
                  React.createElement("div",{style:{flex:1,minWidth:0}},
                    React.createElement("div",{style:{fontWeight:700,fontSize:13,color:isDrafted?T.textDim:T.text,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}},p.name),
                    React.createElement("div",{style:{fontSize:10,color:T.textSub}},p.team+(p.age?" · Age "+p.age:""))
                  ),
                  React.createElement("button",{onClick:function(){setDrafted(function(d){return isDrafted?d.filter(function(x){return x!==p.name;}):[p.name].concat(d);});},style:{padding:"6px 12px",borderRadius:8,border:"1px solid "+(isDrafted?T.border:T.purple),background:isDrafted?"transparent":T.purple,color:isDrafted?T.textDim:"#fff",fontWeight:700,fontSize:11,cursor:"pointer",flexShrink:0}},isDrafted?"Undraft":"Draft")
                );
              })
            )
      ),

      // KEEPER CALCULATOR
      rankSubTab==="keeper"&&React.createElement("div",{style:{padding:"16px",paddingBottom:8}},
        React.createElement("div",{style:{display:"flex",alignItems:"center",gap:12,marginBottom:20}},
          React.createElement("div",{style:{width:44,height:44,borderRadius:12,background:T.purple,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontSize:22,color:"#fff"}},"\u26E8"),
          React.createElement("div",null,
            React.createElement("div",{style:{fontWeight:900,fontSize:22,color:T.text}},"Keeper Value Calculator"),
            React.createElement("div",{style:{fontSize:12,color:T.textSub}},"Find the best keepers for your dynasty league")
          )
        ),
        React.createElement("div",{style:{background:T.bgCard,border:"1px solid "+T.border,borderRadius:14,padding:16,marginBottom:14}},
          React.createElement("div",{style:{display:"flex",gap:8,marginBottom:12}},
            React.createElement("select",{value:keeperTeam,onChange:function(e){setKeeperTeam(Number(e.target.value));setKeeperCalced(false);},style:{flex:1,background:T.bgInput,color:T.text,border:"1px solid "+T.border,borderRadius:10,padding:"10px 14px",fontSize:13,outline:"none"}},
              LEAGUE_TEAMS.map(function(t,i){return React.createElement("option",{key:i,value:i},t.name);})
            ),
            React.createElement("button",{onClick:function(){setKeeperCalced(true);},style:{padding:"10px 20px",borderRadius:10,border:"none",background:T.purple,color:"#fff",fontWeight:700,fontSize:13,cursor:"pointer",flexShrink:0}},"Calculate")
          ),
          React.createElement("div",{style:{marginBottom:12}},
            React.createElement("div",{style:{fontSize:11,color:T.textSub,marginBottom:4}},"Keeper Limit"),
            React.createElement("input",{type:"number",value:keeperLimit,onChange:function(e){setKeeperLimit(Number(e.target.value));setKeeperCalced(false);},min:1,max:10,style:Object.assign({},inpS,{textAlign:"center"})})
          ),
          React.createElement("div",null,
            React.createElement("div",{style:{fontSize:11,color:T.textSub,marginBottom:4}},"Default Keeper Cost"),
            React.createElement("input",{type:"number",value:keeperCost,onChange:function(e){setKeeperCost(Number(e.target.value));setKeeperCalced(false);},min:0,style:Object.assign({},inpS,{textAlign:"center"})})
          )
        ),
        keeperCalced&&React.createElement("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:16}},
          React.createElement("div",{style:{background:T.green+"15",border:"1px solid "+T.green+"44",borderRadius:12,padding:"16px",textAlign:"center"}},
            React.createElement("div",{style:{fontWeight:900,fontSize:22,color:T.green}},
              (function(){var ps=rankedPlayers.filter(function(p){return p.pos!=="DST"&&p.pos!=="K";}).slice(keeperTeam*2,keeperTeam*2+keeperLimit+6).slice(0,keeperLimit);return ps.reduce(function(s,p){return s+p.tradeVal;},0).toLocaleString();})()
            ),
            React.createElement("div",{style:{fontSize:11,color:T.textSub,marginTop:4}},"Total Keeper Value")
          ),
          React.createElement("div",{style:{background:T.red+"15",border:"1px solid "+T.red+"44",borderRadius:12,padding:"16px",textAlign:"center"}},
            React.createElement("div",{style:{fontWeight:900,fontSize:22,color:T.red}},(keeperLimit*keeperCost).toLocaleString()),
            React.createElement("div",{style:{fontSize:11,color:T.textSub,marginTop:4}},"Total Cost")
          )
        ),
        keeperCalced&&React.createElement("div",null,
          React.createElement("div",{style:{fontWeight:700,fontSize:16,marginBottom:12,color:T.purpleLight}},"Top "+keeperLimit+" Recommended Keepers"),
          rankedPlayers.filter(function(p){return p.pos!=="DST"&&p.pos!=="K";}).slice(keeperTeam*2,keeperTeam*2+keeperLimit+6).slice(0,keeperLimit).map(function(p,i){
            var savings=Math.max(0,Math.round(p.tradeVal-keeperCost*(i+1)));
            return React.createElement("div",{key:p.name,style:{background:T.bgCard,border:"1px solid "+(savings>20?T.green+"44":T.border),borderRadius:12,padding:"14px 16px",marginBottom:10}},
              React.createElement("div",{style:{display:"flex",alignItems:"center",gap:10,marginBottom:8}},
                React.createElement("div",{style:{width:28,height:28,borderRadius:"50%",background:T.purple,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,fontSize:12,color:"#fff",flexShrink:0}},i+1),
                React.createElement(Avatar,{name:p.name,pos:p.pos,size:36}),
                React.createElement("div",{style:{flex:1}},
                  React.createElement("div",{style:{fontWeight:700,fontSize:14}},p.name),
                  React.createElement("div",{style:{fontSize:11,color:T.textSub}},p.team+" | "+p.pos+" | Age "+p.age)
                ),
                savings>0&&React.createElement("div",{style:{background:T.green+"22",border:"1px solid "+T.green+"44",borderRadius:8,padding:"4px 10px",textAlign:"center"}},
                  React.createElement("div",{style:{fontWeight:800,fontSize:12,color:T.green}},"+"+savings),
                  React.createElement("div",{style:{fontSize:9,color:T.textSub}},"savings")
                )
              ),
              React.createElement("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,paddingTop:8,borderTop:"1px solid "+T.border}},
                React.createElement("div",{style:{textAlign:"center"}},React.createElement("div",{style:{fontWeight:700,fontSize:14,color:T.purpleLight}},p.tradeVal),React.createElement("div",{style:{fontSize:9,color:T.textSub}},"Value")),
                React.createElement("div",{style:{textAlign:"center"}},React.createElement("div",{style:{fontWeight:700,fontSize:14,color:T.text}},keeperCost*(i+1)),React.createElement("div",{style:{fontSize:9,color:T.textSub}},"Cost")),
                React.createElement("div",{style:{textAlign:"center"}},React.createElement("div",{style:{fontWeight:700,fontSize:14,color:savings>0?T.green:T.red}},savings>0?"+"+savings:savings),React.createElement("div",{style:{fontSize:9,color:T.textSub}},"Net"))
              )
            );
          })
        )
      ),

      // COMPARE — Player Compare redesign
      rankSubTab==="compare"&&React.createElement("div",{style:{padding:"16px",paddingBottom:8}},
        React.createElement("div",{style:{display:"flex",alignItems:"center",gap:12,marginBottom:20}},
          React.createElement("div",{style:{width:44,height:44,borderRadius:12,background:T.purple,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}},
            React.createElement("span",{style:{fontSize:20,color:"#fff"}},">>")
          ),
          React.createElement("div",null,
            React.createElement("div",{style:{fontWeight:900,fontSize:22,color:T.text}},"Player Compare"),
            React.createElement("div",{style:{fontSize:12,color:T.textSub}},"Dynasty value head-to-head")
          )
        ),
        React.createElement("div",{style:{background:T.bgCard,border:"1px solid "+T.border,borderRadius:16,padding:20,marginBottom:16,position:"relative"}},
          React.createElement("div",{style:{display:"grid",gridTemplateColumns:"1fr 1px 1fr",gap:0,marginBottom:16}},
            React.createElement("div",{style:{paddingRight:16}},
              React.createElement("div",{style:{display:"flex",alignItems:"center",gap:6,marginBottom:12}},
                React.createElement("span",{style:{width:8,height:8,borderRadius:"50%",background:T.purple,display:"inline-block"}}),
                React.createElement("span",{style:{fontSize:11,fontWeight:800,color:T.textSub,letterSpacing:1}},"PLAYER 1")
              ),
              React.createElement("div",{style:{position:"relative"}},
                React.createElement("span",{style:{position:"absolute",left:10,top:"50%",transform:"translateY(-50%)",color:T.textDim,fontSize:12}},"Q"),
                React.createElement("input",{value:compareS1,onChange:function(e){setCompareS1(e.target.value);setCompareP1(null);},placeholder:"Search playe...",style:Object.assign({},inpS,{paddingLeft:28,fontSize:13})}),
                compareS1&&!compareP1&&React.createElement("div",{style:{position:"absolute",top:"calc(100% + 4px)",left:0,right:0,zIndex:200,background:T.bgCard,border:"1px solid "+T.borderPurple,borderRadius:10,overflow:"hidden",boxShadow:"0 8px 24px #0008"}},
                  rankedPlayers.filter(function(p){return p.name.toLowerCase().includes(compareS1.toLowerCase());}).slice(0,4).map(function(p){
                    return React.createElement("button",{key:p.name,onClick:function(){setCompareP1(p);setCompareS1(p.name);},style:{display:"flex",alignItems:"center",gap:8,width:"100%",background:"none",border:"none",borderBottom:"1px solid "+T.border,padding:"8px 12px",cursor:"pointer",textAlign:"left"}},
                      React.createElement(Avatar,{name:p.name,pos:p.pos,size:22}),
                      React.createElement("span",{style:{fontSize:12,fontWeight:600,color:T.text}},p.name)
                    );
                  })
                )
              ),
              compareP1&&React.createElement("div",{style:{marginTop:10,textAlign:"center"}},
                React.createElement(Avatar,{name:compareP1.name,pos:compareP1.pos,size:52}),
                React.createElement("div",{style:{fontWeight:700,fontSize:13,marginTop:6,color:T.text}},compareP1.name),
                React.createElement(PBadge,{pos:compareP1.pos,rank:compareP1.posRank})
              )
            ),
            React.createElement("div",{style:{background:T.border,width:1}}),
            React.createElement("div",{style:{paddingLeft:16}},
              React.createElement("div",{style:{display:"flex",alignItems:"center",gap:6,marginBottom:12}},
                React.createElement("span",{style:{width:8,height:8,borderRadius:"50%",background:T.purple,display:"inline-block"}}),
                React.createElement("span",{style:{fontSize:11,fontWeight:800,color:T.textSub,letterSpacing:1}},"PLAYER 2")
              ),
              React.createElement("div",{style:{position:"relative"}},
                React.createElement("span",{style:{position:"absolute",left:10,top:"50%",transform:"translateY(-50%)",color:T.textDim,fontSize:12}},"Q"),
                React.createElement("input",{value:compareS2,onChange:function(e){setCompareS2(e.target.value);setCompareP2(null);},placeholder:"Search playe...",style:Object.assign({},inpS,{paddingLeft:28,fontSize:13})}),
                compareS2&&!compareP2&&React.createElement("div",{style:{position:"absolute",top:"calc(100% + 4px)",left:0,right:0,zIndex:200,background:T.bgCard,border:"1px solid "+T.borderPurple,borderRadius:10,overflow:"hidden",boxShadow:"0 8px 24px #0008"}},
                  rankedPlayers.filter(function(p){return p.name.toLowerCase().includes(compareS2.toLowerCase());}).slice(0,4).map(function(p){
                    return React.createElement("button",{key:p.name,onClick:function(){setCompareP2(p);setCompareS2(p.name);},style:{display:"flex",alignItems:"center",gap:8,width:"100%",background:"none",border:"none",borderBottom:"1px solid "+T.border,padding:"8px 12px",cursor:"pointer",textAlign:"left"}},
                      React.createElement(Avatar,{name:p.name,pos:p.pos,size:22}),
                      React.createElement("span",{style:{fontSize:12,fontWeight:600,color:T.text}},p.name)
                    );
                  })
                )
              ),
              compareP2&&React.createElement("div",{style:{marginTop:10,textAlign:"center"}},
                React.createElement(Avatar,{name:compareP2.name,pos:compareP2.pos,size:52}),
                React.createElement("div",{style:{fontWeight:700,fontSize:13,marginTop:6,color:T.text}},compareP2.name),
                React.createElement(PBadge,{pos:compareP2.pos,rank:compareP2.posRank})
              )
            )
          ),
          React.createElement("div",{style:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:36,height:36,borderRadius:"50%",background:T.bgInput,border:"1px solid "+T.border,display:"flex",alignItems:"center",justifyContent:"center",zIndex:10}},
            React.createElement("span",{style:{fontSize:11,fontWeight:800,color:T.textSub}},"VS")
          ),
          !compareP1&&!compareP2&&React.createElement("div",{style:{textAlign:"center",padding:"16px 0 4px",fontSize:13,color:T.textDim}},"Search for two players to compare their dynasty value")
        ),
        compareP1&&compareP2&&React.createElement("div",{style:{background:T.bgCard,border:"1px solid "+T.borderPurple,borderRadius:14,padding:16}},
          [["Trade Value",compareP1.tradeVal,compareP2.tradeVal],["Proj Pts",compareP1.pts,compareP2.pts],["Age",compareP1.age,compareP2.age],["Position Rank","#"+compareP1.posRank,"#"+compareP2.posRank]].map(function(row,ri){
            var v1=typeof row[1]==="string"?parseFloat(row[1]):row[1];
            var v2=typeof row[2]==="string"?parseFloat(row[2]):row[2];
            var winner=row[0]==="Age"||(typeof row[1]==="string"&&row[1][0]==="#")?(v1<v2?0:1):(v1>v2?0:1);
            return React.createElement("div",{key:row[0],style:{display:"grid",gridTemplateColumns:"1fr auto 1fr",gap:8,alignItems:"center",marginBottom:ri<3?"12px":"0",paddingBottom:ri<3?"12px":"0",borderBottom:ri<3?"1px solid "+T.border:"none"}},
              React.createElement("div",{style:{fontWeight:800,fontSize:18,color:winner===0?T.green:T.text,textAlign:"right"}},row[1]),
              React.createElement("div",{style:{fontSize:10,color:T.textSub,textAlign:"center",fontWeight:600,whiteSpace:"nowrap"}},row[0]),
              React.createElement("div",{style:{fontWeight:800,fontSize:18,color:winner===1?T.green:T.text,textAlign:"left"}},row[2])
            );
          })
        )
      ),

      // FOOTER
      React.createElement("div",{style:{padding:"32px 20px 16px",borderTop:"1px solid "+T.border,textAlign:"center",marginTop:8}},
        React.createElement("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",gap:8,marginBottom:10}},
          LogoSvg,
          React.createElement("span",{style:{fontSize:12,color:T.textSub}},"© 2026 Fantasy Draft Pros · All rights reserved")
        ),
        React.createElement("div",{style:{display:"flex",justifyContent:"center",gap:24,marginBottom:16}},
          ["Contact","FAQ","Help"].map(function(l){return React.createElement("span",{key:l,style:{fontSize:12,color:T.textSub,cursor:"pointer",fontWeight:500}},l);})
        ),
        React.createElement("div",{style:{display:"flex",justifyContent:"center",gap:24,marginBottom:16}},
          [["f","Facebook"],["@","Instagram"],["T","TikTok"]].map(function(s){return React.createElement("div",{key:s[1],style:{width:32,height:32,borderRadius:"50%",background:T.bgCard,border:"1px solid "+T.border,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",fontSize:13,color:T.textSub,fontWeight:700}},s[0]);})
        ),
        React.createElement("div",{style:{fontSize:10,color:T.textDim,lineHeight:1.6}},"Player values powered by Fantasy Draft Pros. Not affiliated with",React.createElement("br",null),"Sleeper, ESPN, or Yahoo. For entertainment only.")
      )
    ),

    // ════ REPORTS TAB ════
    tab==="reports"&&React.createElement("div",{style:{paddingBottom:80}},
      // sub-nav pills
      React.createElement("div",{style:{display:"flex",gap:6,padding:"12px 16px",overflowX:"auto",WebkitOverflowScrolling:"touch",msOverflowStyle:"none",scrollbarWidth:"none"}},
        [["dynasty","\uD83D\uDCC4","Dynasty Reports"],["news","\uD83D\uDCF0","Player News"],["export","\uD83D\uDD17","Export & Share"],["upgrade","\u2728","Upgrade to Pro"],["contact","\u2709","Contact"]].map(function(s){
          var active=reportSubTab===s[0];
          var isUpgrade=s[0]==="upgrade";
          return React.createElement("button",{key:s[0],onClick:function(){setReportSubTab(s[0]);},style:{whiteSpace:"nowrap",display:"flex",alignItems:"center",gap:6,padding:"8px 14px",borderRadius:10,border:"1px solid "+(active?T.purple:(isUpgrade?T.purple:T.border)),background:active?T.purple:(isUpgrade?"linear-gradient(135deg,"+T.purple+",#5b21b6)":"transparent"),color:(active||isUpgrade)?"#fff":T.textSub,fontWeight:700,fontSize:12,cursor:"pointer",flexShrink:0}},
            React.createElement("span",{style:{fontSize:13}},s[1]),s[2]
          );
        })
      ),
      // Dynasty Reports
      reportSubTab==="dynasty"&&React.createElement("div",{style:{padding:"20px 16px"}},
        React.createElement("div",{style:{display:"flex",alignItems:"flex-start",gap:14,marginBottom:20}},
          React.createElement("span",{style:{fontSize:40,color:"#60a5fa",flexShrink:0,lineHeight:1}},"\uD83D\uDCC4"),
          React.createElement("div",{style:{fontWeight:900,fontSize:28,color:T.text,lineHeight:1.2}},"Dynasty Market Reports")
        ),
        React.createElement("div",{style:{fontSize:14,color:T.textSub,lineHeight:1.6,marginBottom:24}},"Weekly analysis of the biggest value changes and market trends in dynasty fantasy football"),
        React.createElement("div",{style:{background:T.bgCard,border:"1px solid "+T.border,borderRadius:16,padding:"48px 20px",textAlign:"center"}},
          React.createElement("div",{style:{fontSize:48,color:T.textDim,marginBottom:12}},"\uD83D\uDCC4"),
          React.createElement("div",{style:{fontWeight:800,fontSize:18,color:T.text,marginBottom:8}},"No Reports Yet"),
          React.createElement("div",{style:{fontSize:13,color:T.textSub}},"Weekly dynasty market reports will appear here")
        )
      ),
      // Player News
      reportSubTab==="news"&&React.createElement("div",{style:{padding:"20px 16px"}},
        React.createElement("div",{style:{display:"flex",alignItems:"center",gap:12,marginBottom:20}},
          React.createElement("span",{style:{fontSize:40,color:"#60a5fa",flexShrink:0,lineHeight:1}},"\uD83D\uDCF0"),
          React.createElement("div",{style:{fontWeight:900,fontSize:28,color:T.text,lineHeight:1.1}},"Player News Feed")
        ),
        React.createElement("div",{style:{background:T.bgCard,border:"1px solid "+T.border,borderRadius:14,padding:"16px",marginBottom:16}},
          React.createElement("div",{style:{display:"flex",gap:8,flexWrap:"wrap",marginBottom:12}},
            [["all","All News"],["injury","Injurys"],["trade","Trades"],["depth","Depth Chart"],["perf","Performances"]].map(function(f){
              var active=newsFilter===f[0];
              return React.createElement("button",{key:f[0],onClick:function(){setNewsFilter(f[0]);},style:{padding:"8px 14px",borderRadius:8,border:"none",background:active?"#3b82f6":T.bgInput,color:active?"#fff":T.text,fontWeight:700,fontSize:13,cursor:"pointer"}},f[1]);
            })
          ),
          React.createElement("div",{style:{display:"flex",justifyContent:"flex-end"}},
            React.createElement("button",{style:{display:"flex",alignItems:"center",gap:6,padding:"10px 20px",borderRadius:10,border:"none",background:"#22c55e",color:"#fff",fontWeight:700,fontSize:14,cursor:"pointer"}},
              React.createElement("span",null,"\u21BB"),"Refresh"
            )
          )
        ),
        React.createElement("div",{style:{background:T.red+"22",border:"1px solid "+T.red+"44",borderRadius:12,padding:"14px 16px",marginBottom:20}},
          React.createElement("div",{style:{fontSize:14,color:T.red}},"Unable to load news. Check your SportsData.io API key.")
        ),
        React.createElement("div",{style:{textAlign:"center",padding:"32px 0"}},
          React.createElement("div",{style:{fontSize:48,color:T.textDim,marginBottom:12}},"\uD83D\uDCF0"),
          React.createElement("div",{style:{fontSize:14,color:T.textSub}},"No news items found.")
        )
      ),
      // Export & Share
      reportSubTab==="export"&&React.createElement("div",{style:{padding:"20px 16px"}},
        React.createElement("div",{style:{display:"flex",alignItems:"center",gap:12,marginBottom:20}},
          React.createElement("span",{style:{fontSize:36,color:"#818cf8",flexShrink:0,lineHeight:1}},"\uD83D\uDD17"),
          React.createElement("div",{style:{fontWeight:900,fontSize:28,color:T.text,lineHeight:1.1}},"Export & Share")
        ),
        React.createElement("div",{style:{fontWeight:800,fontSize:18,color:T.text,marginBottom:14}},"Generate Graphics"),
        [["Power Rankings","Share your league power rankings"],["Trade Analysis","Export trade breakdown with values"],["Roster Summary","Your roster with player values"],["Weekly Recap","Weekly matchup results and highlights"],["Playoff Bracket","Championship tournament bracket"],["Draft Results","Draft picks and grades"]].map(function(card){
          return React.createElement("div",{key:card[0],style:{background:T.bgCard,border:"1px solid "+T.border,borderRadius:14,padding:"16px",marginBottom:10,display:"flex",alignItems:"center",gap:12}},
            React.createElement("div",{style:{width:36,height:36,borderRadius:8,background:"#1e3a5f",border:"1px solid #3b82f644",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0,color:"#60a5fa"}},"\uD83D\uDDBC"),
            React.createElement("div",{style:{flex:1}},
              React.createElement("div",{style:{fontWeight:700,fontSize:15,color:T.text}},card[0]),
              React.createElement("div",{style:{fontSize:12,color:T.textSub,marginTop:2}},card[1])
            )
          );
        }),
        React.createElement("button",{style:{width:"100%",padding:"16px",borderRadius:14,border:"none",background:"#3b82f6",color:"#fff",fontWeight:700,fontSize:16,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:8,marginBottom:28}},
          React.createElement("span",{style:{fontSize:18}},"\uD83D\uDDBC"),"Generate Graphic"
        ),
        React.createElement("div",{style:{fontWeight:800,fontSize:18,color:T.text,marginBottom:14}},"Export Data"),
        React.createElement("div",{style:{background:T.bgCard,border:"1px solid "+T.border,borderRadius:14,padding:"16px",marginBottom:14}},
          React.createElement("div",{style:{fontWeight:700,fontSize:15,color:T.text,marginBottom:12}},"Download Options"),
          [["Export to CSV"],["Export to PDF"],["Export to JSON"]].map(function(btn){
            return React.createElement("button",{key:btn[0],style:{width:"100%",padding:"14px",borderRadius:10,border:"none",background:"#22c55e",color:"#fff",fontWeight:700,fontSize:15,cursor:"pointer",marginBottom:8,display:"flex",alignItems:"center",justifyContent:"center",gap:8}},
              React.createElement("span",null,"\u2913"),btn[0]
            );
          })
        ),
        React.createElement("div",{style:{background:T.bgCard,border:"1px solid "+T.border,borderRadius:14,padding:"16px",marginBottom:14}},
          React.createElement("div",{style:{fontWeight:700,fontSize:15,color:T.text,marginBottom:12}},"Share to Social Media"),
          ["Share to Twitter/X","Share to Facebook","Share to Reddit","Copy Link"].map(function(btn){
            return React.createElement("button",{key:btn,style:{width:"100%",padding:"14px",borderRadius:10,border:"none",background:T.bgInput,color:T.text,fontWeight:600,fontSize:14,cursor:"pointer",marginBottom:8,display:"flex",alignItems:"center",justifyContent:"center",gap:8}},
              React.createElement("span",{style:{fontSize:16}},"\uD83D\uDD17"),btn
            );
          })
        ),
        React.createElement("div",{style:{background:T.purpleDim,border:"1px solid "+T.borderPurple,borderRadius:14,padding:"16px",marginBottom:8}},
          React.createElement("div",{style:{fontWeight:800,fontSize:15,color:T.text,marginBottom:8}},"Pro Tip"),
          React.createElement("div",{style:{fontSize:14,color:T.textSub,lineHeight:1.6}},"Generated graphics are optimized for social media sharing. They include your league branding and are sized perfectly for Twitter, Facebook, and Instagram posts.")
        ),
        React.createElement("div",{style:{padding:"24px 0 8px",borderTop:"1px solid "+T.border,textAlign:"center",marginTop:16}},
          React.createElement("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",gap:8,marginBottom:8}},
            LogoSvg,
            React.createElement("span",{style:{fontSize:12,color:T.textSub}},"© 2026 Fantasy Draft Pros · All rights reserved")
          ),
          React.createElement("div",{style:{display:"flex",justifyContent:"center",gap:24}},
            ["Contact","FAQ","Help"].map(function(l){return React.createElement("span",{key:l,style:{fontSize:12,color:T.textSub,cursor:"pointer"}},l);})
          )
        )
      ),
      // Upgrade to Pro
      reportSubTab==="upgrade"&&React.createElement("div",{style:{padding:"16px"}},
        React.createElement("button",{onClick:function(){setReportSubTab("dynasty");},style:{display:"flex",alignItems:"center",gap:6,background:"none",border:"none",color:T.textSub,cursor:"pointer",fontSize:13,fontWeight:600,marginBottom:20,padding:0}},
          React.createElement("span",null,"\u2190"),"Back to Dashboard"
        ),
        React.createElement("div",{style:{textAlign:"center",marginBottom:24}},
          LogoSvg,
          React.createElement("div",{style:{fontWeight:900,fontSize:30,color:T.text,marginTop:16,marginBottom:8}},"Choose Your Plan"),
          React.createElement("div",{style:{fontSize:14,color:T.textSub,lineHeight:1.6}},"Start with our free tier or unlock premium features with Pro")
        ),
        React.createElement("div",{style:{display:"flex",background:T.bgCard,borderRadius:12,padding:4,marginBottom:24}},
          React.createElement("button",{onClick:function(){setBillingPeriod("monthly");},style:{flex:1,padding:"10px",borderRadius:10,border:"none",background:billingPeriod==="monthly"?T.bgInput:"transparent",color:billingPeriod==="monthly"?T.text:T.textSub,fontWeight:700,fontSize:14,cursor:"pointer"}},"Monthly"),
          React.createElement("button",{onClick:function(){setBillingPeriod("yearly");},style:{flex:1,padding:"10px",borderRadius:10,border:"none",background:billingPeriod==="yearly"?"#f97316":"transparent",color:billingPeriod==="yearly"?"#fff":T.textSub,fontWeight:700,fontSize:14,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:6}},
            React.createElement("span",null,"\u26A1"),"Yearly",
            billingPeriod==="yearly"&&React.createElement("span",{style:{background:"#22c55e",color:"#fff",fontSize:10,fontWeight:800,padding:"2px 6px",borderRadius:8}},"SAVE 40%")
          )
        ),
        // Subscription Management card
        React.createElement("div",{style:{background:T.bgCard,border:"1px solid "+T.border,borderRadius:14,padding:"16px",marginBottom:20}},
          React.createElement("div",{style:{fontWeight:800,fontSize:16,color:T.text,marginBottom:16}},"Subscription Management"),
          React.createElement("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",marginBottom:12}},
            React.createElement("div",null,
              React.createElement("div",{style:{fontSize:11,color:T.textSub,marginBottom:4}},"Current Plan"),
              React.createElement("div",{style:{fontWeight:800,fontSize:18,color:T.text}},"Pro")
            ),
            React.createElement("div",{style:{textAlign:"right"}},
              React.createElement("div",{style:{fontSize:11,color:T.textSub,marginBottom:4}},"Status"),
              React.createElement("div",{style:{fontWeight:800,fontSize:18,color:T.green}},"Active")
            )
          ),
          React.createElement("div",{style:{fontSize:13,color:T.textSub,marginBottom:16,display:"flex",alignItems:"center",gap:6}},
            React.createElement("span",null,"\uD83D\uDCC5"),"Renews on February 27, 2036"
          ),
          React.createElement("div",{style:{borderTop:"1px solid "+T.border,paddingTop:12}},
            React.createElement("span",{style:{fontSize:13,color:T.textSub,cursor:"pointer"}},"Cancel Subscription")
          )
        ),
        // Free plan card
        React.createElement("div",{style:{background:T.bgCard,border:"1px solid "+T.border,borderRadius:14,padding:"20px",marginBottom:12}},
          React.createElement("div",{style:{fontWeight:800,fontSize:20,color:T.text,marginBottom:4}},"Free"),
          React.createElement("div",{style:{fontWeight:900,fontSize:28,color:T.text,marginBottom:4}},"$0"),
          React.createElement("div",{style:{fontSize:12,color:T.textSub,marginBottom:16}},"Forever free · No credit card required"),
          ["Basic trade calculator","10 trade analyses/day","Dynasty rankings (top 100)","1 watchlist slot"].map(function(f){
            return React.createElement("div",{key:f,style:{display:"flex",alignItems:"center",gap:8,marginBottom:8,fontSize:13,color:T.textSub}},
              React.createElement("span",{style:{color:T.textDim,fontSize:14}},"\u2713"),f
            );
          }),
          React.createElement("button",{style:{width:"100%",marginTop:12,padding:"12px",borderRadius:10,border:"1px solid "+T.border,background:"transparent",color:T.textSub,fontWeight:700,fontSize:13,cursor:"pointer"}},"Current Plan")
        ),
        // Pro plan card
        React.createElement("div",{style:{background:"#fff8f0",border:"2px solid #f97316",borderRadius:14,padding:"20px",marginBottom:24,position:"relative",overflow:"hidden"}},
          React.createElement("div",{style:{position:"absolute",top:0,right:0,background:"#f97316",color:"#fff",fontWeight:800,fontSize:11,padding:"6px 14px",borderRadius:"0 14px 0 14px"}},"POPULAR"),
          React.createElement("div",{style:{display:"flex",alignItems:"center",gap:8,marginBottom:8}},
            React.createElement("div",{style:{fontWeight:800,fontSize:20,color:"#1a1a2e"}},"Pro"),
            React.createElement("span",{style:{background:"#f97316",color:"#fff",fontWeight:800,fontSize:11,padding:"4px 10px",borderRadius:20,display:"flex",alignItems:"center",gap:4}},"\u2728 PRO")
          ),
          React.createElement("div",{style:{fontWeight:900,fontSize:32,color:"#1a1a2e",marginBottom:2}},"$2.99",React.createElement("span",{style:{fontSize:14,fontWeight:400,color:"#666"}},"/month")),
          React.createElement("div",{style:{marginBottom:8}},
            React.createElement("span",{style:{fontSize:13,color:"#999",textDecoration:"line-through",marginRight:8}},"$59.88/year"),
            React.createElement("span",{style:{fontSize:13,color:"#22c55e",fontWeight:700}},"$35.88/year")
          ),
          React.createElement("div",{style:{display:"inline-block",background:"#ccfbf1",color:"#065f46",fontWeight:700,fontSize:12,padding:"4px 12px",borderRadius:20,marginBottom:16}},"24-Hour Free Trial"),
          ["Player search and profiles","Dynasty rankings","Weekly market reports","Unlimited trade calculations","Unlimited league imports","Player value history","AI trade suggestions","Team strategy advice","Market alerts & notifications","Unlimited watchlist","Advanced trend analytics","Priority support"].map(function(f){
            return React.createElement("div",{key:f,style:{display:"flex",alignItems:"center",gap:10,marginBottom:10,fontSize:14,color:"#1a1a2e"}},
              React.createElement("span",{style:{color:"#22c55e",fontWeight:700,fontSize:16}},"\u2713"),f
            );
          }),
          React.createElement("button",{style:{width:"100%",marginTop:16,padding:"14px",borderRadius:12,border:"none",background:"#f97316",color:"#fff",fontWeight:800,fontSize:15,cursor:"pointer"}},"Current Plan")
        ),
        // FAQ
        React.createElement("div",{style:{background:"#eef2ff",borderRadius:14,padding:"20px",marginBottom:24}},
          React.createElement("div",{style:{fontWeight:900,fontSize:18,color:"#3730a3",marginBottom:16,textAlign:"center"}},"Frequently Asked Questions"),
          [["Can I cancel anytime?","Yes! You can cancel your Pro subscription at any time. You'll keep access until the end of your billing period."],["What happens after the free trial?","After 7 days, you'll be charged $2.99/month. You can cancel before the trial ends to avoid being charged."],["What if I downgrade from Pro to Free?","You'll keep all your data, but some features will become locked. Your watchlist, league data, and trade history are preserved."],["Do you offer refunds?","We offer a 30-day money-back guarantee if you're not satisfied with Pro. Just email support."]].map(function(q){
            return React.createElement("div",{key:q[0],style:{marginBottom:14}},
              React.createElement("div",{style:{fontWeight:800,fontSize:14,color:"#1e1b4b",marginBottom:4}},q[0]),
              React.createElement("div",{style:{fontSize:14,color:"#4338ca",lineHeight:1.6}},q[1])
            );
          })
        ),
        React.createElement("div",{style:{padding:"16px 0",borderTop:"1px solid "+T.border,textAlign:"center"}},
          React.createElement("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",gap:8,marginBottom:8}},
            LogoSvg,
            React.createElement("span",{style:{fontSize:12,color:T.textSub}},"© 2026 Fantasy Draft Pros · All rights reserved")
          )
        )
      ),
      // Contact
      reportSubTab==="contact"&&React.createElement("div",{style:{padding:"16px"}},
        React.createElement("div",{style:{background:T.bgCard,border:"1px solid "+T.border,borderRadius:16,padding:"28px 20px",textAlign:"center",marginBottom:20}},
          React.createElement("div",{style:{width:64,height:64,borderRadius:16,background:T.purple,display:"flex",alignItems:"center",justifyContent:"center",fontSize:28,margin:"0 auto 16px"}},"✉"),
          React.createElement("div",{style:{fontWeight:900,fontSize:26,color:T.text,marginBottom:8}},"Get in Touch"),
          React.createElement("div",{style:{fontSize:14,color:T.textSub,lineHeight:1.6,marginBottom:24}},"We're here to help with any questions or feedback"),
          React.createElement("div",{style:{textAlign:"left",marginBottom:12}},
            React.createElement("div",{style:{fontSize:12,color:T.textSub,marginBottom:4,fontWeight:600}},"Your Name"),
            React.createElement("input",{value:contactName,onChange:function(e){setContactName(e.target.value);},placeholder:"John Doe",style:Object.assign({},inpS)})
          ),
          React.createElement("div",{style:{textAlign:"left",marginBottom:12}},
            React.createElement("div",{style:{fontSize:12,color:T.textSub,marginBottom:4,fontWeight:600}},"Your Email"),
            React.createElement("input",{value:contactEmail,onChange:function(e){setContactEmail(e.target.value);},placeholder:"you@example.com",type:"email",style:Object.assign({},inpS)})
          ),
          React.createElement("div",{style:{textAlign:"left",marginBottom:12}},
            React.createElement("div",{style:{fontSize:12,color:T.textSub,marginBottom:4,fontWeight:600}},"Subject"),
            React.createElement("input",{value:contactSubject,onChange:function(e){setContactSubject(e.target.value);},placeholder:"How can we help?",style:Object.assign({},inpS)})
          ),
          React.createElement("div",{style:{textAlign:"left",marginBottom:16}},
            React.createElement("div",{style:{fontSize:12,color:T.textSub,marginBottom:4,fontWeight:600}},"Message"),
            React.createElement("textarea",{value:contactMsg,onChange:function(e){setContactMsg(e.target.value);},placeholder:"Tell us what you need help with...",rows:4,style:{background:T.bgInput,color:T.text,border:"1px solid "+T.border,borderRadius:10,padding:"12px 14px",fontSize:13,outline:"none",width:"100%",boxSizing:"border-box",resize:"none",fontFamily:"inherit",lineHeight:1.6}})
          ),
          contactSent?React.createElement("div",{style:{padding:"14px",background:T.green+"15",border:"1px solid "+T.green+"44",borderRadius:10,color:T.green,fontWeight:700,fontSize:14}},"Message sent! We'll respond within 24-48 hours."):
          React.createElement("button",{onClick:function(){setContactSent(true);},style:{width:"100%",padding:"14px",borderRadius:12,border:"none",background:T.purple,color:"#fff",fontWeight:800,fontSize:16,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:8}},
            React.createElement("span",null,"➤"),"Send Message"
          )
        ),
        React.createElement("div",{style:{background:T.bgCard,border:"1px solid "+T.border,borderRadius:14,padding:"16px",marginBottom:12,display:"flex",alignItems:"flex-start",gap:12}},
          React.createElement("div",{style:{width:40,height:40,borderRadius:10,background:T.purpleDim,border:"1px solid "+T.borderPurple,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0}},"💬"),
          React.createElement("div",null,
            React.createElement("div",{style:{fontWeight:800,fontSize:15,color:T.text,marginBottom:4}},"Email Support"),
            React.createElement("div",{style:{fontSize:13,color:T.textSub,marginBottom:8}},"Prefer to email directly? Reach out to us at:"),
            React.createElement("div",{style:{fontSize:13,color:T.purple,fontWeight:600,display:"flex",alignItems:"center",gap:6}},"✉ fantasydraftproshelp@gmail.com")
          )
        ),
        React.createElement("div",{style:{background:T.bgCard,border:"1px solid "+T.border,borderRadius:14,padding:"16px",marginBottom:16,display:"flex",alignItems:"flex-start",gap:12}},
          React.createElement("div",{style:{width:40,height:40,borderRadius:10,background:T.purpleDim,border:"1px solid "+T.borderPurple,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0}},"❓"),
          React.createElement("div",null,
            React.createElement("div",{style:{fontWeight:800,fontSize:15,color:T.text,marginBottom:8}},"Common Topics"),
            ["Trade analysis and recommendations","Platform integration issues","Feature requests and suggestions","Account and authentication help","Bug reports and technical issues"].map(function(t){
              return React.createElement("div",{key:t,style:{fontSize:13,color:T.textSub,marginBottom:6,display:"flex",gap:6}},
                React.createElement("span",null,"•"),t
              );
            })
          )
        ),
        React.createElement("div",{style:{textAlign:"center",padding:"12px 0",borderTop:"1px solid "+T.border,marginBottom:16}},
          React.createElement("div",{style:{fontSize:13,color:T.textSub}},"We typically respond within 24-48 hours during business days")
        ),
        React.createElement("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",gap:8}},
          LogoSvg,
          React.createElement("span",{style:{fontSize:12,color:T.textSub}},"© 2026 Fantasy Draft Pros · All rights reserved")
        )
      )
    ),

    // ════ ADMIN TAB ════
    tab==="admin"&&React.createElement("div",{style:{paddingBottom:80}},
      // sub-nav
      React.createElement("div",{style:{display:"flex",gap:6,padding:"12px 16px",overflowX:"auto",WebkitOverflowScrolling:"touch",msOverflowStyle:"none",scrollbarWidth:"none",borderBottom:"1px solid "+T.border}},
        [["system","\u21BA","System"],["valuetuner","\u2AE5","Value Tuner"],["rbcontext","\u270E","RB Context"],["rbai","\u2728","RB AI"],["headshots","\uD83D\uDC64","Headshots"],["idpupload","\u2B06","IDP Upload"]].map(function(s){
          var active=adminSubTab===s[0];
          return React.createElement("button",{key:s[0],onClick:function(){setAdminSubTab(s[0]);},style:{whiteSpace:"nowrap",display:"flex",alignItems:"center",gap:5,padding:"8px 12px",borderRadius:10,border:"1px solid "+(active?T.purple:T.border),background:active?T.purple:"transparent",color:active?"#fff":T.textSub,fontWeight:700,fontSize:12,cursor:"pointer",flexShrink:0}},
            React.createElement("span",null,s[1]),s[2]
          );
        })
      ),
      // SYSTEM sub-tab
      adminSubTab==="system"&&React.createElement("div",{style:{padding:"16px"}},
        // Sync Hub header
        React.createElement("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16}},
          React.createElement("div",{style:{fontWeight:900,fontSize:24,color:T.textDim}},"Sync Hub"),
          React.createElement("button",{style:{display:"flex",alignItems:"center",gap:6,padding:"10px 16px",borderRadius:10,border:"1px solid "+T.border,background:"#fff",color:"#1a1a2e",fontWeight:700,fontSize:13,cursor:"pointer"}},"\u21BA Refresh Status")
        ),
        // Registry cards
        [["Player Registry","\uD83D\uDDC4","Total Players",222,"Last Sync","6 days ago"],["Value Snapshots","\u2197","Total Snapshots",222,"Last Sync","6 days ago"]].map(function(c){
          return React.createElement("div",{key:c[0],style:{background:"#fff",borderRadius:14,padding:"18px",marginBottom:12}},
            React.createElement("div",{style:{display:"flex",alignItems:"center",gap:8,marginBottom:12}},
              React.createElement("span",{style:{fontSize:20,color:c[0]==="Player Registry"?"#3b82f6":"#22c55e"}},c[1]),
              React.createElement("span",{style:{fontWeight:800,fontSize:16,color:"#1a1a2e"}},c[0])
            ),
            React.createElement("div",{style:{fontSize:13,color:"#666",marginBottom:4}},c[2]),
            React.createElement("div",{style:{fontWeight:900,fontSize:28,color:"#1a1a2e",marginBottom:8}},c[3]),
            React.createElement("div",{style:{fontSize:13,color:"#666",marginBottom:2}},c[4]),
            React.createElement("div",{style:{fontSize:14,fontWeight:700,color:"#ef4444"}},c[5])
          );
        }),
        React.createElement("div",{style:{background:"#fff",borderRadius:14,padding:"18px",marginBottom:12}},
          React.createElement("div",{style:{display:"flex",alignItems:"center",gap:8,marginBottom:12}},
            React.createElement("span",{style:{fontSize:20,color:"#f97316"}},"⚠"),
            React.createElement("span",{style:{fontWeight:800,fontSize:16,color:"#1a1a2e"}},"Unresolved Entities")
          ),
          React.createElement("div",{style:{fontSize:13,color:"#666",marginBottom:4}},"Open Issues"),
          React.createElement("div",{style:{fontWeight:900,fontSize:28,color:"#1a1a2e",marginBottom:8}},"0"),
          React.createElement("div",{style:{fontSize:13,color:"#666",marginBottom:2}},"Status"),
          React.createElement("div",{style:{fontSize:14,fontWeight:700,color:"#22c55e"}},"Good")
        ),
        // Position Coverage
        React.createElement("div",{style:{background:"#fff",borderRadius:14,padding:"18px",marginBottom:12}},
          React.createElement("div",{style:{fontWeight:800,fontSize:16,color:"#1a1a2e",marginBottom:14}},"Position Coverage"),
          React.createElement("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}},
            [["QB",34],["RB",24],["WR",30],["TE",14]].map(function(p){
              return React.createElement("div",{key:p[0],style:{background:"#f5f5f7",borderRadius:10,padding:"14px",textAlign:"center"}},
                React.createElement("div",{style:{fontSize:13,color:"#666",marginBottom:4}},p[0]),
                React.createElement("div",{style:{fontWeight:900,fontSize:26,color:"#1a1a2e"}},p[1])
              );
            })
          )
        ),
        // Sync Actions
        React.createElement("div",{style:{background:"#fff",borderRadius:14,padding:"18px",marginBottom:12}},
          React.createElement("div",{style:{fontWeight:800,fontSize:16,color:"#1a1a2e",marginBottom:14}},"Sync Actions"),
          [["Sync Players","Update rosters, teams, and status","\uD83D\uDDC4","#3b82f6"],["Sync Values","Sync FantasyDraftPros rankings","\u2197","#22c55e"],["Rebuild Player Values","Full rebuild with validation","\u26E8","#7c3aed"],["Full Pipeline","Run all syncs + trends","\u26A1","#7c3aed"]].map(function(a){
            var sel=adminSyncSel===a[0];
            return React.createElement("div",{key:a[0],onClick:function(){setAdminSyncSel(a[0]);},style:{border:"1px solid "+(sel?"#7c3aed":"#e5e7eb"),borderRadius:12,padding:"18px",marginBottom:10,textAlign:"center",cursor:"pointer",background:sel?"#f5f3ff":"#fff"}},
              React.createElement("div",{style:{fontSize:28,color:a[3],marginBottom:8}},a[2]),
              React.createElement("div",{style:{fontWeight:800,fontSize:15,color:"#1a1a2e",marginBottom:4}},a[0]),
              React.createElement("div",{style:{fontSize:12,color:"#666"}},a[1])
            );
          })
        ),
        // System Health
        React.createElement("div",{style:{background:"#2d0a0a",border:"1px solid #ef444444",borderRadius:14,padding:"18px",marginBottom:12}},
          React.createElement("div",{style:{display:"flex",alignItems:"center",marginBottom:16}},
            React.createElement("span",{style:{fontSize:20,color:"#a78bfa",marginRight:10}},"\u26A1"),
            React.createElement("div",{style:{flex:1}},
              React.createElement("div",{style:{fontWeight:800,fontSize:16,color:"#fff"}},"System Health"),
              React.createElement("div",{style:{fontSize:11,color:"#9ca3af"}},"Last checked: 9:33:48 PM")
            ),
            React.createElement("div",{style:{display:"flex",gap:8}},
              React.createElement("div",{style:{width:32,height:32,borderRadius:"50%",border:"2px solid #ef4444",display:"flex",alignItems:"center",justifyContent:"center",color:"#ef4444",fontWeight:900}},"\u2715"),
              React.createElement("div",{style:{width:32,height:32,borderRadius:8,background:"#374151",display:"flex",alignItems:"center",justifyContent:"center",color:"#9ca3af",fontSize:16}},"\u21BA")
            )
          ),
          [["Players Sync","\uD83D\uDDC4","No player sync found",false],["Values Build","\u2197","No values sync found",false],["Coverage","\u26A1","Low coverage: 0% (0/8)",false],["Unresolved Entities","⚠","Low unresolved count: 0",true]].map(function(h){
            return React.createElement("div",{key:h[0],style:{background:"#1a0505",borderRadius:10,padding:"14px",marginBottom:8}},
              React.createElement("div",{style:{display:"flex",alignItems:"center",gap:6,marginBottom:6}},
                React.createElement("span",{style:{fontSize:16,color:h[3]?"#22c55e":"#9ca3af"}},h[1]),
                React.createElement("span",{style:{fontWeight:700,fontSize:14,color:"#fff"}},h[0])
              ),
              React.createElement("div",{style:{display:"flex",alignItems:"center",gap:6}},
                React.createElement("span",{style:{fontSize:16,color:h[3]?"#22c55e":"#ef4444"}},h[3]?"\u2713":"\u2297"),
                React.createElement("span",{style:{fontSize:13,color:"#9ca3af"}},h[2])
              )
            );
          })
        ),
        // Season Context
        React.createElement("div",{style:{background:T.bgCard,border:"1px solid "+T.border,borderRadius:14,padding:"18px",marginBottom:12}},
          React.createElement("div",{style:{display:"flex",alignItems:"center",gap:8,marginBottom:14}},
            React.createElement("span",{style:{fontSize:20,color:T.purple}},"\uD83D\uDCC5"),
            React.createElement("span",{style:{fontWeight:800,fontSize:18,color:T.text}},"Season Context")
          ),
          React.createElement("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:12}},
            [["League Year","2026","#fff"],["Last Completed","2025","#fff"],["Phase","Postseason",T.purple],["Value Epoch","POST_2025","#22c55e"]].map(function(s){
              return React.createElement("div",{key:s[0],style:{background:T.bgInput,borderRadius:10,padding:"14px"}},
                React.createElement("div",{style:{fontSize:12,color:T.textSub,marginBottom:4}},s[0]),
                React.createElement("div",{style:{fontWeight:900,fontSize:18,color:s[2]}},s[1])
              );
            })
          ),
          React.createElement("div",{style:{background:"#1e3a5f",border:"1px solid #3b82f644",borderRadius:10,padding:"12px",display:"flex",gap:8}},
            React.createElement("span",{style:{color:"#60a5fa",fontSize:16,flexShrink:0}},"\u24D8"),
            React.createElement("div",{style:{fontSize:12,color:"#93c5fd",lineHeight:1.6}},
              React.createElement("b",null,"Invalidation Cutoff:")," All values before 2025-02-01 are considered stale and have been archived. Only production-based values from the 2025 season are active."
            )
          )
        ),
        // Value Rebuild
        React.createElement("div",{style:{background:T.bgCard,border:"1px solid "+T.border,borderRadius:14,padding:"18px",marginBottom:12}},
          React.createElement("div",{style:{display:"flex",alignItems:"center",gap:8,marginBottom:16}},
            React.createElement("span",{style:{fontSize:20,color:T.purple}},"\uD83D\uDDC4"),
            React.createElement("span",{style:{fontWeight:800,fontSize:18,color:T.text}},"Value Rebuild")
          ),
          React.createElement("div",{style:{textAlign:"center",padding:"24px 0",color:T.textSub,fontSize:14}},"No rebuild has been run yet")
        ),
        // Trigger Rebuild
        React.createElement("div",{style:{background:T.bgCard,border:"1px solid "+T.border,borderRadius:14,padding:"18px",marginBottom:12}},
          React.createElement("div",{style:{display:"flex",alignItems:"center",gap:8,marginBottom:12}},
            React.createElement("span",{style:{fontSize:20,color:T.purple}},"\u25B6"),
            React.createElement("span",{style:{fontWeight:800,fontSize:18,color:T.text}},"Trigger Rebuild")
          ),
          React.createElement("div",{style:{background:"#2d1a00",border:"1px solid #f59e0b",borderRadius:10,padding:"14px",marginBottom:14}},
            React.createElement("div",{style:{display:"flex",gap:8}},
              React.createElement("span",{style:{color:"#f59e0b",fontSize:18,flexShrink:0}},"\u26A0"),
              React.createElement("div",{style:{fontSize:13,color:"#f59e0b",lineHeight:1.6}},
                React.createElement("b",null,"Warning: "),"This will recalculate ALL player values using production-based scoring. Preseason ADP-based values will be replaced with 2025 season performance data. This process takes 2-5 minutes and cannot be undone."
              )
            )
          ),
          React.createElement("div",{style:{background:T.bgInput,borderRadius:10,padding:"14px",marginBottom:14,display:"flex",gap:10,alignItems:"flex-start",cursor:"pointer"},onClick:function(){setRebuildConfirmed(function(v){return !v;})}},
            React.createElement("input",{type:"checkbox",checked:rebuildConfirmed,readOnly:true,style:{width:18,height:18,flexShrink:0,marginTop:2,accentColor:T.purple}}),
            React.createElement("div",{style:{fontSize:13,color:T.textSub,lineHeight:1.6}},"I understand this will replace all current player values with production-based calculations using 2025 season data. Players like Jaxon Smith-Njigba will be properly ranked based on their breakout performance.")
          ),
          React.createElement("button",{disabled:!rebuildConfirmed,style:{width:"100%",padding:"14px",borderRadius:12,border:"none",background:rebuildConfirmed?T.purple:"#374151",color:rebuildConfirmed?"#fff":"#6b7280",fontWeight:800,fontSize:15,cursor:rebuildConfirmed?"pointer":"not-allowed",display:"flex",alignItems:"center",justifyContent:"center",gap:8}},
            React.createElement("span",null,"\u2197"),"Rebuild All Player Values"
          )
        ),
        // Admin footer
        React.createElement("div",{style:{padding:"32px 0 16px",borderTop:"1px solid "+T.border,textAlign:"center",marginTop:8}},
          React.createElement("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",gap:8,marginBottom:10}},
            LogoSvg,
            React.createElement("span",{style:{fontSize:12,color:T.textSub}},"© 2026 Fantasy Draft Pros · All rights reserved")
          ),
          React.createElement("div",{style:{display:"flex",justifyContent:"center",gap:24,marginBottom:16}},
            ["Contact","FAQ","Help"].map(function(l){return React.createElement("span",{key:l,style:{fontSize:12,color:T.textSub,cursor:"pointer",fontWeight:500}},l);})
          ),
          React.createElement("div",{style:{display:"flex",justifyContent:"center",gap:24,marginBottom:16}},
            [["f","Facebook"],["@","Instagram"],["T","TikTok"]].map(function(s){return React.createElement("div",{key:s[1],style:{width:32,height:32,borderRadius:"50%",background:T.bgCard,border:"1px solid "+T.border,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",fontSize:13,color:T.textSub,fontWeight:700}},s[0]);})
          ),
          React.createElement("div",{style:{fontSize:10,color:T.textDim,lineHeight:1.6}},"Player values powered by Fantasy Draft Pros. Not affiliated with",React.createElement("br",null),"Sleeper, ESPN, or Yahoo. For entertainment only.")
        )
      ),
      // VALUE TUNER sub-tab
      adminSubTab==="valuetuner"&&React.createElement("div",{style:{padding:"16px"}},
        React.createElement("div",{style:{display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:10,marginBottom:12}},
          React.createElement("div",{style:{display:"flex",alignItems:"center",gap:10}},
            React.createElement("div",{style:{width:36,height:36,borderRadius:10,background:"#f97316",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,color:"#fff",flexShrink:0}},"\u2AE5"),
            React.createElement("div",{style:{fontWeight:900,fontSize:18,color:T.text}},"Value Fine-Tuner")
          ),
          React.createElement("button",{onClick:function(){setAdminSubTab("system");},style:{display:"flex",alignItems:"center",gap:5,padding:"8px 12px",borderRadius:10,border:"1px solid "+T.border,background:"transparent",color:T.text,fontWeight:700,fontSize:12,cursor:"pointer",flexShrink:0,whiteSpace:"nowrap"}},"\u21BA Go to Rebuild")
        ),
        React.createElement("div",{style:{fontSize:12,color:T.textSub,lineHeight:1.6,marginBottom:14}},"Calibrate player values across four layers. Changes are saved to the database. Trigger a rebuild from ",React.createElement("b",{style:{color:T.text}},"Admin Sync")," to propagate updates."),
        React.createElement("div",{style:{background:T.bgCard,border:"1px solid "+T.border,borderRadius:12,padding:"12px",marginBottom:12}},
          React.createElement("div",{style:{display:"flex",alignItems:"center",gap:6,flexWrap:"wrap",fontSize:11}},
            React.createElement("span",{style:{color:T.textSub}},"\u24D8 Calculation order:"),
            React.createElement("span",{style:{color:T.textSub}},"FDP Base"),
            React.createElement("span",{style:{color:T.textDim}},"→"),
            React.createElement("span",{style:{background:"#7c2d12",color:"#fb923c",padding:"2px 7px",borderRadius:5,fontWeight:700}},"Format ×"),
            React.createElement("span",{style:{color:T.textDim}},"→"),
            React.createElement("span",{style:{background:"#1e3a5f",color:"#60a5fa",padding:"2px 7px",borderRadius:5,fontWeight:700}},"Tier %"),
            React.createElement("span",{style:{color:T.textDim}},"→"),
            React.createElement("span",{style:{background:"#14532d",color:"#4ade80",padding:"2px 7px",borderRadius:5,fontWeight:700}},"Situation pts"),
            React.createElement("span",{style:{color:T.textDim}},"→"),
            React.createElement("span",{style:{background:"#713f12",color:"#fbbf24",padding:"2px 7px",borderRadius:5,fontWeight:700}},"Bulk %+pts"),
            React.createElement("span",{style:{color:T.textDim}},"→"),
            React.createElement("span",{style:{color:T.textSub}},"FDP Value")
          )
        ),
        React.createElement("div",{style:{background:T.bgCard,border:"1px solid "+T.border,borderRadius:12,padding:"6px",marginBottom:12,display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:4}},
          [["format","\u2AE5"],["tiers","\u2261"],["situation","\u25C7"],["bulk","\uD83D\uDC65"]].map(function(l){
            var active=valueTunerLayer===l[0];
            return React.createElement("button",{key:l[0],onClick:function(){setValueTunerLayer(l[0]);},style:{padding:"10px",borderRadius:8,border:"none",background:active?"#fff":"transparent",color:active?"#1a1a2e":T.textSub,fontSize:18,cursor:"pointer"}},l[1]);
          })
        ),
        React.createElement("div",{style:{fontSize:13,color:T.textSub,marginBottom:12,padding:"10px 14px",background:T.bgCard,border:"1px solid "+T.border,borderRadius:10}},
          React.createElement("b",{style:{color:T.text}},"Format Multipliers")," — Edit per-format, per-position FDP multipliers (SF, 1QB, TEP)"
        ),
        React.createElement("div",{style:{background:T.bgCard,border:"1px solid "+T.border,borderRadius:14,padding:"16px",marginBottom:16}},
          React.createElement("div",{style:{display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:8,marginBottom:16}},
            React.createElement("div",null,
              React.createElement("div",{style:{fontWeight:800,fontSize:16,color:T.text}},"Format Multipliers"),
              React.createElement("div",{style:{fontSize:11,color:T.textSub,marginTop:4,lineHeight:1.5}},"Controls how much each position's base value is scaled per league format. WR at 1.00 = baseline.")
            ),
            React.createElement("div",{style:{display:"flex",gap:6,flexShrink:0}},
              React.createElement("button",{style:{display:"flex",alignItems:"center",gap:4,padding:"7px 10px",borderRadius:8,border:"1px solid "+T.border,background:"transparent",color:T.textSub,fontWeight:700,fontSize:11,cursor:"pointer"}},"\u21BA Defaults"),
              React.createElement("button",{style:{display:"flex",alignItems:"center",gap:4,padding:"7px 10px",borderRadius:8,border:"none",background:"#f97316",color:"#fff",fontWeight:700,fontSize:11,cursor:"pointer"}},"\uD83D\uDCBE Save Changes")
            )
          ),
          React.createElement("div",{style:{display:"grid",gridTemplateColumns:"1.3fr 1fr 1fr 1fr",gap:6,marginBottom:8,paddingBottom:8,borderBottom:"1px solid "+T.border}},
            React.createElement("span",{style:{fontSize:12,color:T.textSub,fontWeight:700}},"Format"),
            React.createElement("span",{style:{fontSize:12,color:"#ef4444",fontWeight:800,textAlign:"center"}},"QB"),
            React.createElement("span",{style:{fontSize:12,color:"#22c55e",fontWeight:800,textAlign:"center"}},"RB"),
            React.createElement("span",{style:{fontSize:12,color:"#60a5fa",fontWeight:800,textAlign:"center"}},"WR")
          ),
          [["Superflex (SF)",1.35,1.15,1.00],["1QB",1.00,1.18,1.00],["TE Premium (TEP)",1.35,1.15,1.00]].map(function(row){
            return React.createElement("div",{key:row[0],style:{display:"grid",gridTemplateColumns:"1.3fr 1fr 1fr 1fr",gap:6,alignItems:"center",marginBottom:16}},
              React.createElement("span",{style:{fontSize:12,color:T.text,fontWeight:600}},row[0]),
              React.createElement("div",{style:{textAlign:"center"}},
                React.createElement("input",{type:"number",step:"0.01",defaultValue:row[1],style:{width:"100%",background:T.bgInput,color:T.text,border:"1px solid "+T.border,borderRadius:8,padding:"7px 2px",fontSize:13,fontWeight:700,textAlign:"center",outline:"none",boxSizing:"border-box"}}),
                React.createElement("div",{style:{fontSize:10,color:T.textSub,marginTop:2}},"\u00D7"+row[1].toFixed(2))
              ),
              React.createElement("div",{style:{textAlign:"center"}},
                React.createElement("input",{type:"number",step:"0.01",defaultValue:row[2],style:{width:"100%",background:T.bgInput,color:T.text,border:"1px solid "+T.border,borderRadius:8,padding:"7px 2px",fontSize:13,fontWeight:700,textAlign:"center",outline:"none",boxSizing:"border-box"}}),
                React.createElement("div",{style:{fontSize:10,color:T.textSub,marginTop:2}},"\u00D7"+row[2].toFixed(2))
              ),
              React.createElement("div",{style:{textAlign:"center"}},
                React.createElement("input",{type:"number",step:"0.01",defaultValue:row[3],style:{width:"100%",background:T.bgInput,color:T.text,border:"1px solid "+T.border,borderRadius:8,padding:"7px 2px",fontSize:13,fontWeight:700,textAlign:"center",outline:"none",boxSizing:"border-box"}}),
                React.createElement("div",{style:{fontSize:10,color:T.textSub,marginTop:2}},"\u00D7"+row[3].toFixed(2))
              )
            );
          }),
          React.createElement("div",{style:{background:T.bgInput,border:"1px solid "+T.border,borderRadius:10,padding:"12px",display:"flex",gap:8}},
            React.createElement("span",{style:{color:T.textSub,flexShrink:0}},"\u24D8"),
            React.createElement("div",{style:{fontSize:12,color:T.textSub,lineHeight:1.6}},"Multipliers apply directly to the base value. Example: a QB with base value 7000 in Superflex (1.35\u00D7) = 9,450 FDP. Changes here are saved to the database but ",React.createElement("b",{style:{color:T.text}},"do not automatically rebuild all player values")," — trigger a rebuild from Admin Sync after saving.")
          )
        ),
        React.createElement("div",{style:{padding:"24px 0 8px",borderTop:"1px solid "+T.border,textAlign:"center"}},
          React.createElement("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",gap:8,marginBottom:8}},
            LogoSvg,
            React.createElement("span",{style:{fontSize:12,color:T.textSub}},"© 2026 Fantasy Draft Pros · All rights reserved")
          ),
          React.createElement("div",{style:{display:"flex",justifyContent:"center",gap:24}},
            ["Contact","FAQ","Help"].map(function(l){return React.createElement("span",{key:l,style:{fontSize:12,color:T.textSub,cursor:"pointer"}},l);})
          )
        )
      ),
      // RB CONTEXT sub-tab
      adminSubTab==="rbcontext"&&React.createElement("div",{style:{padding:"16px"}},
        React.createElement("div",{style:{display:"flex",alignItems:"flex-start",gap:12,marginBottom:16}},
          React.createElement("div",{style:{flex:1}},
            React.createElement("div",{style:{fontWeight:900,fontSize:24,color:T.text,lineHeight:1.15,marginBottom:6}},"RB Context Editor"),
            React.createElement("div",{style:{fontSize:12,color:T.textSub,lineHeight:1.5}},"Configure RB-specific factors for enhanced FDP value calculations")
          ),
          React.createElement("div",{style:{display:"flex",flexDirection:"column",gap:6,flexShrink:0}},
            React.createElement("button",{style:{display:"flex",alignItems:"center",gap:5,padding:"10px 14px",borderRadius:10,border:"none",background:"#22c55e",color:"#fff",fontWeight:700,fontSize:12,cursor:"pointer"}},"\u21BA Recalculate FDP Values"),
            React.createElement("button",{style:{display:"flex",alignItems:"center",gap:5,padding:"10px 14px",borderRadius:10,border:"none",background:"#3b82f6",color:"#fff",fontWeight:700,fontSize:12,cursor:"pointer"}},"\u21BA Refresh")
          )
        ),
        React.createElement("div",{style:{background:"#fff0f0",border:"1px solid #fca5a5",borderRadius:12,padding:"14px 16px",marginBottom:16,display:"flex",alignItems:"center",gap:8}},
          React.createElement("span",{style:{color:"#ef4444",fontSize:18}},"\u2297"),
          React.createElement("span",{style:{color:"#ef4444",fontWeight:600,fontSize:14}},"Failed to load RB data")
        ),
        React.createElement("div",{style:{position:"relative",marginBottom:8}},
          React.createElement("span",{style:{position:"absolute",left:14,top:"50%",transform:"translateY(-50%)",color:T.textDim,fontSize:14}},"Q"),
          React.createElement("input",{placeholder:"Search running backs...",style:Object.assign({},inpS,{paddingLeft:36,background:"#fff",color:"#1a1a2e",border:"1px solid #e5e7eb"})})
        ),
        React.createElement("div",{style:{fontSize:12,color:T.textSub,marginBottom:10}},"Showing 0 running backs"),
        React.createElement("div",{style:{background:T.bgCard,borderRadius:10,padding:"10px 12px",marginBottom:16,display:"grid",gridTemplateColumns:"2fr 1.5fr 1fr 1.5fr 1.5fr",gap:4}},
          ["PLAYER","SOURCE","AGE","DEPTH ROLE","WORKLOAD"].map(function(h){
            return React.createElement("span",{key:h,style:{fontSize:10,fontWeight:800,color:T.textSub,letterSpacing:0.5}},h);
          })
        ),
        React.createElement("div",{style:{background:"#eef2ff",borderRadius:14,padding:"18px"}},
          React.createElement("div",{style:{fontWeight:800,fontSize:16,color:"#3730a3",marginBottom:14}},"Adjustment Guide"),
          React.createElement("div",{style:{fontWeight:700,fontSize:13,color:"#1e1b4b",marginBottom:8}},"Context Data Sources:"),
          [["Manual","Data you've entered directly (always used)"],["Auto (XX%)","AI-generated suggestions based on depth charts and value trends (used if confidence ≥75%)"],["Default","No context data, only format multiplier applied"]].map(function(s){
            return React.createElement("div",{key:s[0],style:{display:"flex",gap:6,marginBottom:6,fontSize:13,color:"#4338ca"}},
              React.createElement("span",null,"•"),
              React.createElement("span",null,React.createElement("b",null,s[0]+":"),"\u00A0"+s[1])
            );
          }),
          React.createElement("div",{style:{borderTop:"1px solid #c7d2fe",margin:"14px 0"}}),
          [["Age Adjustments:",["\u226422: +250 (elite youth)","23-24: +150 (prime youth)","25: 0 (prime window)","26: -300 (decline begins)","27: -650 (significant concern)","\u226528: -1100 (high risk)"]],["Role Adjustments:",["Feature: +500","Lead Committee: +200","Committee: -250","Handcuff: -450","Backup: -700"]],["Workload Adjustments:",["Elite (250+ touches): +350","Solid (175-250): +150","Light (<150): -250"]],["Other Adjustments:",["Injury Risk Medium: -150","Injury Risk High: -450","Contract High: +200","Contract Low: -250"]]].map(function(section){
            return React.createElement("div",{key:section[0],style:{marginBottom:12}},
              React.createElement("div",{style:{fontWeight:700,fontSize:13,color:"#1e1b4b",marginBottom:6}},section[0]),
              section[1].map(function(item){
                return React.createElement("div",{key:item,style:{display:"flex",gap:6,marginBottom:4,fontSize:13,color:"#4338ca"}},
                  React.createElement("span",null,"•"),item
                );
              })
            );
          })
        )
      ),
      // RB AI sub-tab
      adminSubTab==="rbai"&&React.createElement("div",{style:{padding:"16px"}},
        React.createElement("div",{style:{display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:12,marginBottom:16}},
          React.createElement("div",null,
            React.createElement("div",{style:{fontWeight:900,fontSize:24,color:T.text,lineHeight:1.15,marginBottom:6}},"RB Context Suggestions"),
            React.createElement("div",{style:{fontSize:12,color:T.textSub,lineHeight:1.5}},"Review AI-generated context suggestions for running backs")
          ),
          React.createElement("button",{style:{display:"flex",alignItems:"center",gap:6,padding:"12px 16px",borderRadius:12,border:"none",background:"#3b82f6",color:"#fff",fontWeight:700,fontSize:13,cursor:"pointer",flexShrink:0,textAlign:"center",lineHeight:1.3}},"\u2728 Generate\nSuggestions")
        ),
        React.createElement("div",{style:{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap",marginBottom:24}},
          React.createElement("span",{style:{fontSize:13,color:T.textSub,fontWeight:600}},"Filter by confidence:"),
          [["all","All"],["high","High"],["medium","Medium"],["low","Low"]].map(function(f){
            var active=f[0]==="all";
            return React.createElement("button",{key:f[0],style:{padding:"6px 14px",borderRadius:8,border:"none",background:active?"#3b82f6":T.bgInput,color:active?"#fff":T.text,fontWeight:700,fontSize:13,cursor:"pointer"}},f[1]);
          }),
          React.createElement("span",{style:{fontSize:13,color:T.textSub}},"0 sugges...")
        ),
        React.createElement("div",{style:{textAlign:"center",padding:"40px 0 32px"}},
          React.createElement("div",{style:{fontSize:48,color:T.textDim,marginBottom:16}},"\u2728"),
          React.createElement("div",{style:{fontWeight:900,fontSize:20,color:T.text,marginBottom:8}},"No Pending Suggestions"),
          React.createElement("div",{style:{fontSize:14,color:T.textSub,lineHeight:1.6}},"Click \"Generate Suggestions\" to analyze",React.createElement("br",null),"RB context data")
        ),
        React.createElement("div",{style:{background:"#eef2ff",borderRadius:14,padding:"18px",marginBottom:16}},
          React.createElement("div",{style:{fontWeight:800,fontSize:15,color:"#3730a3",marginBottom:10}},"How Suggestions Work"),
          React.createElement("div",{style:{fontSize:13,color:"#4338ca",lineHeight:1.6,marginBottom:10}},
            React.createElement("b",null,"Context suggestions are automatically generated "),"by analyzing team depth charts, player values, and dynasty trends. They help populate RB context fields faster and more consistently."
          ),
          [["High confidence (80%+):","Clear depth chart situations"],["Medium confidence (60-80%):","Some ambiguity or competition"],["Low confidence (<60%):","Unclear or rapidly changing situations"]].map(function(b){
            return React.createElement("div",{key:b[0],style:{display:"flex",gap:6,marginBottom:6,fontSize:13,color:"#4338ca"}},
              React.createElement("span",null,"•"),
              React.createElement("span",null,React.createElement("b",null,b[0]),"\u00A0"+b[1])
            );
          }),
          React.createElement("div",{style:{fontSize:13,color:"#4338ca",lineHeight:1.6,marginTop:10}},
            React.createElement("b",null,"Note:")," Suggestions never overwrite manual edits. They only appear for RBs without existing context data. Suggestions expire after 7 days and are refreshed on each generation."
          )
        ),
        React.createElement("div",{style:{padding:"24px 0 8px",borderTop:"1px solid "+T.border,textAlign:"center"}},
          React.createElement("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",gap:8,marginBottom:8}},LogoSvg,React.createElement("span",{style:{fontSize:12,color:T.textSub}},"© 2026 Fantasy Draft Pros · All rights reserved")),
          React.createElement("div",{style:{display:"flex",justifyContent:"center",gap:24,marginBottom:14}},["Contact","FAQ","Help"].map(function(l){return React.createElement("span",{key:l,style:{fontSize:12,color:T.textSub,cursor:"pointer"}},l);})),
          React.createElement("div",{style:{display:"flex",justifyContent:"center",gap:24,marginBottom:14}},[["f","Facebook"],["@","Instagram"],["T","TikTok"]].map(function(s){return React.createElement("div",{key:s[1],style:{width:32,height:32,borderRadius:"50%",background:T.bgCard,border:"1px solid "+T.border,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",fontSize:13,color:T.textSub,fontWeight:700}},s[0]);})),
          React.createElement("div",{style:{fontSize:10,color:T.textDim,lineHeight:1.6}},"Player values powered by Fantasy Draft Pros. Not affiliated with",React.createElement("br",null),"Sleeper, ESPN, or Yahoo. For entertainment only.")
        )
      ),
      // HEADSHOTS sub-tab
      adminSubTab==="headshots"&&React.createElement("div",{style:{padding:"16px"}},
        React.createElement("div",{style:{marginBottom:20}},
          React.createElement("div",{style:{fontWeight:900,fontSize:24,color:T.textDim,lineHeight:1.15,marginBottom:6}},"Headshot Admin"),
          React.createElement("div",{style:{fontSize:13,color:T.textSub}},"Manually fix incorrect or missing player headshots")
        ),
        React.createElement("div",{style:{background:"#fff",borderRadius:14,padding:"16px",marginBottom:16}},
          React.createElement("div",{style:{position:"relative"}},
            React.createElement("span",{style:{position:"absolute",left:14,top:"50%",transform:"translateY(-50%)",color:"#9ca3af",fontSize:16}},"Q"),
            React.createElement("input",{placeholder:"Search for a player...",style:{width:"100%",background:"#f9fafb",color:"#1a1a2e",border:"1px solid #e5e7eb",borderRadius:10,padding:"14px 14px 14px 40px",fontSize:14,outline:"none",boxSizing:"border-box"}})
          )
        ),
        React.createElement("div",{style:{padding:"24px 0 8px",borderTop:"1px solid "+T.border,textAlign:"center",marginTop:32}},
          React.createElement("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",gap:8,marginBottom:8}},LogoSvg,React.createElement("span",{style:{fontSize:12,color:T.textSub}},"© 2026 Fantasy Draft Pros · All rights reserved")),
          React.createElement("div",{style:{display:"flex",justifyContent:"center",gap:24,marginBottom:14}},["Contact","FAQ","Help"].map(function(l){return React.createElement("span",{key:l,style:{fontSize:12,color:T.textSub,cursor:"pointer"}},l);})),
          React.createElement("div",{style:{display:"flex",justifyContent:"center",gap:24,marginBottom:14}},[["f","Facebook"],["@","Instagram"],["T","TikTok"]].map(function(s){return React.createElement("div",{key:s[1],style:{width:32,height:32,borderRadius:"50%",background:T.bgCard,border:"1px solid "+T.border,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",fontSize:13,color:T.textSub,fontWeight:700}},s[0]);})),
          React.createElement("div",{style:{fontSize:10,color:T.textDim,lineHeight:1.6}},"Player values powered by Fantasy Draft Pros. Not affiliated with",React.createElement("br",null),"Sleeper, ESPN, or Yahoo. For entertainment only.")
        )
      ),
      // IDP UPLOAD sub-tab
      adminSubTab==="idpupload"&&React.createElement("div",{style:{padding:"16px"}},
        React.createElement("div",{style:{marginBottom:16}},
          React.createElement("div",{style:{fontWeight:900,fontSize:24,color:T.textDim,lineHeight:1.15,marginBottom:6}},"IDP Admin Upload"),
          React.createElement("div",{style:{fontSize:12,color:T.textSub,lineHeight:1.5}},"Upload IDP player rankings via CSV to seed or update defensive player values")
        ),
        React.createElement("div",{style:{background:"#eef2ff",borderRadius:14,padding:"16px",marginBottom:14}},
          React.createElement("div",{style:{display:"flex",alignItems:"center",gap:8,marginBottom:12}},
            React.createElement("span",{style:{fontSize:18,color:"#3730a3"}},"\uD83D\uDCC4"),
            React.createElement("span",{style:{fontWeight:800,fontSize:15,color:"#1e1b4b"}},"CSV Format Requirements")
          ),
          [["Required columns:","full_name, position, base_value, rank"],["Optional columns:","sub_position, team"],["Valid positions:","DL, LB, DB"],["Valid sub_positions:","EDGE, DT, NT, ILB, OLB, MLB, CB, S, FS, SS"],["Value range:","0 - 10,000 (similar to offensive player scale)"]].map(function(r){
            return React.createElement("div",{key:r[0],style:{fontSize:13,color:"#4338ca",marginBottom:6,lineHeight:1.5}},
              React.createElement("b",null,r[0])," "+r[1]
            );
          }),
          React.createElement("div",{style:{marginTop:10,display:"flex",alignItems:"center",gap:6,cursor:"pointer"}},
            React.createElement("span",{style:{color:"#3b82f6",fontSize:14}},"\u2B07"),
            React.createElement("span",{style:{color:"#3b82f6",fontWeight:600,fontSize:13}},"Download Template CSV")
          )
        ),
        React.createElement("div",{style:{background:"#fff",borderRadius:14,padding:"16px",marginBottom:14}},
          React.createElement("div",{style:{fontSize:13,color:"#374151",fontWeight:600,marginBottom:8}},"League Format"),
          React.createElement("select",{style:{width:"100%",background:"#f9fafb",color:"#1a1a2e",border:"1px solid #e5e7eb",borderRadius:10,padding:"12px 14px",fontSize:14,outline:"none",marginBottom:14,appearance:"auto"}},
            React.createElement("option",null,"Dynasty Superflex + IDP"),
            React.createElement("option",null,"Dynasty 1QB + IDP"),
            React.createElement("option",null,"Redraft + IDP")
          ),
          React.createElement("div",{style:{fontSize:13,color:"#374151",fontWeight:600,marginBottom:8}},"Scoring Preset"),
          React.createElement("select",{style:{width:"100%",background:"#f9fafb",color:"#1a1a2e",border:"1px solid #e5e7eb",borderRadius:10,padding:"12px 14px",fontSize:14,outline:"none",marginBottom:10,appearance:"auto"}},
            React.createElement("option",null,"\u2696 Balanced"),
            React.createElement("option",null,"\uD83D\uDD25 Tackles Heavy"),
            React.createElement("option",null,"\u26A1 Sacks Heavy")
          ),
          React.createElement("div",{style:{background:"#f9fafb",border:"1px solid #e5e7eb",borderRadius:10,padding:"12px",marginBottom:14}},
            React.createElement("div",{style:{fontSize:13,fontWeight:700,color:"#1a1a2e",marginBottom:2}},"Format: dynasty_sf_idp_balanced"),
            React.createElement("div",{style:{fontSize:12,color:"#6b7280"}},"Values will be calculated using Balanced scoring")
          ),
          React.createElement("div",{style:{fontSize:13,color:"#374151",fontWeight:600,marginBottom:8}},"Upload CSV File"),
          React.createElement("div",{style:{display:"flex",gap:8}},
            React.createElement("div",{style:{flex:1,border:"2px dashed #d1d5db",borderRadius:10,padding:"14px",display:"flex",alignItems:"center",justifyContent:"center",gap:8,cursor:"pointer",color:"#6b7280",fontSize:13}},
              React.createElement("span",null,"\u2B06"),"Choose CSV file..."
            ),
            React.createElement("button",{style:{padding:"14px 20px",borderRadius:10,border:"none",background:"#818cf8",color:"#fff",fontWeight:700,fontSize:13,cursor:"pointer",flexShrink:0,display:"flex",alignItems:"center",gap:6}},"\u2B06 Upload")
          )
        ),
        React.createElement("div",{style:{background:"#fff",borderRadius:14,padding:"16px",marginBottom:14}},
          React.createElement("div",{style:{fontWeight:800,fontSize:15,color:"#1a1a2e",marginBottom:12}},"How Upload Works"),
          ["Parses CSV and validates required columns","Generates unique player_id from name and position","Upserts player record into player_values table with position_group='IDP'","Calculates FDP value using IDP multipliers and adjustments","Creates snapshot in ktc_value_snapshots with source='manual_seed'","Reports success count and any errors encountered"].map(function(s,i){
            return React.createElement("div",{key:i,style:{fontSize:13,color:"#374151",marginBottom:8,lineHeight:1.6}},
              React.createElement("span",{style:{fontWeight:700}},(i+1)+". "),s
            );
          })
        ),
        React.createElement("div",{style:{background:"#fffbeb",border:"1px solid #f59e0b44",borderRadius:14,padding:"16px",marginBottom:16}},
          React.createElement("div",{style:{fontWeight:800,fontSize:15,color:"#92400e",marginBottom:10}},"Important Notes"),
          ["Duplicate uploads will update existing players","New snapshots are always created (historical tracking)","Base values should be on similar scale to offensive players","FDP values are auto-calculated with IDP-specific adjustments","Position groups and sub-positions are automatically set"].map(function(note){
            return React.createElement("div",{key:note,style:{display:"flex",gap:6,marginBottom:8,fontSize:13,color:"#92400e",lineHeight:1.5}},
              React.createElement("span",null,"•"),note
            );
          })
        ),
        React.createElement("div",{style:{padding:"24px 0 8px",borderTop:"1px solid "+T.border,textAlign:"center"}},
          React.createElement("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",gap:8,marginBottom:8}},LogoSvg,React.createElement("span",{style:{fontSize:12,color:T.textSub}},"© 2026 Fantasy Draft Pros · All rights reserved")),
          React.createElement("div",{style:{display:"flex",justifyContent:"center",gap:24,marginBottom:14}},["Contact","FAQ","Help"].map(function(l){return React.createElement("span",{key:l,style:{fontSize:12,color:T.textSub,cursor:"pointer"}},l);})),
          React.createElement("div",{style:{display:"flex",justifyContent:"center",gap:24,marginBottom:14}},[["f","Facebook"],["@","Instagram"],["T","TikTok"]].map(function(s){return React.createElement("div",{key:s[1],style:{width:32,height:32,borderRadius:"50%",background:T.bgCard,border:"1px solid "+T.border,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",fontSize:13,color:T.textSub,fontWeight:700}},s[0]);})),
          React.createElement("div",{style:{fontSize:10,color:T.textDim,lineHeight:1.6}},"Player values powered by Fantasy Draft Pros. Not affiliated with",React.createElement("br",null),"Sleeper, ESPN, or Yahoo. For entertainment only.")
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
    ),

    // FLOATING CHAT BUTTON
    React.createElement("button",{style:{position:"fixed",bottom:72,right:20,width:52,height:52,borderRadius:"50%",background:"#3b82f6",border:"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 4px 16px rgba(59,130,246,0.5)",zIndex:200,fontSize:22,color:"#fff"}},"\uD83D\uDCAC")
  );
}
