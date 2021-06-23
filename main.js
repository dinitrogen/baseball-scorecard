(()=>{"use strict";function t(t,e){const n=document.createElement("button");n.setAttribute("id",t),n.setAttribute("class","navButton");const i=document.createElement("span");return i.textContent=e,n.appendChild(i),n}let e="Top",n=1,i=0,o=0,r=0,u=0,c=0;function d(t,e){const n=document.createElement("button");n.setAttribute("class","counterButton"),n.setAttribute("id",t);const i=document.createElement("span");return i.textContent=e,n.appendChild(i),n}function a(t){const e=document.createElement("div");return e.setAttribute("class","container"),e.setAttribute("id",t),e}function s(){3===r?(r=0,u=0):r++,ballCounter.textContent=`B: ${r}`,strikeCounter.textContent=`S: ${u}`,outCounter.textContent=`O: ${c}`}function l(){2===u?(u=0,r=0,m()):u++,ballCounter.textContent=`B: ${r}`,strikeCounter.textContent=`S: ${u}`,outCounter.textContent=`O: ${c}`}function m(){2===c?(c=0,r=0,u=0):c++,ballCounter.textContent=`B: ${r}`,strikeCounter.textContent=`S: ${u}`,outCounter.textContent=`O: ${c}`}function p(){i>24?i=0:i++,runCounterAway.textContent=`Away: ${i}`}function C(){o>24?o=0:o++,runCounterHome.textContent=`Home: ${o}`}function h(){n>9?(e="Top",n=1):"Top"==e?e="Bottom":(e="Top",n++),inningCounter.textContent=`${e} ${n}`}function b(){const t=function(t,e){const n=document.createElement("h1");return n.setAttribute("id","atBatHeader"),n.textContent="At Bat Tracker",n}(),b=function(t,e){const n=document.createElement("div");n.setAttribute("id","batterInfoDiv");const i=document.createElement("p");return i.setAttribute("id","batterInfo"),i.textContent="Up to bat: Ellie, #1",n.appendChild(i),n}(),v=a("inningDiv"),f=a("scoreDiv"),E=a("BSODiv"),A=function(){const t=d("inningCounter","Top 1");return t.addEventListener("click",h),t}();v.appendChild(A);const y=function(){const t=d("runCounterAway","Away: 0");return t.addEventListener("click",p),t}();f.appendChild(y);const B=function(){const t=d("runCounterHome","Home: 0");return t.addEventListener("click",C),t}();f.appendChild(B);const k=function(){const t=d("ballCounter","B: 0");return t.addEventListener("click",s),t}();E.appendChild(k);const x=function(){const t=d("strikeCounter","S: 0");return t.addEventListener("click",l),t}();E.appendChild(x);const g=function(){const t=d("outCounter","O: 0");return t.addEventListener("click",m),t}();E.appendChild(g);const D=document.getElementById("tabContent");D.textContent="",e="Top",n=1,i=0,o=0,r=0,u=0,c=0,D.appendChild(t),D.appendChild(b),D.appendChild(v),D.appendChild(f),D.appendChild(E)}let v=[];const f={getFullName(){return this.firstName+" "+this.lastName},atBat(){this.numAtBats++},hitSingle(){this.numSingles++},hitDouble(){this.numDoubles++},hitTriple(){this.numTriples++},hitHR(){this.numHRs++},strikeout(){this.numStrikeouts++},walk(){this.numWalks++},HBP(){this.numHBPs++}},E=document.createElement("form"),A=document.createElement("input");A.setAttribute("type","text"),A.setAttribute("placeholder","First name"),A.setAttribute("id","newFirstName");const y=document.createElement("input");y.setAttribute("type","text"),y.setAttribute("placeholder","Last name"),y.setAttribute("id","newLastName");const B=document.createElement("input");B.setAttribute("type","text"),B.setAttribute("placeholder","Jersey number"),B.setAttribute("id","newJerseyNum");const k=document.createElement("input");k.setAttribute("type","button"),k.setAttribute("value","Submit"),k.addEventListener("click",(function(){for(function(){let t=function(t,e,n){let i=Object.create(f);return i.firstName=t,i.lastName=e,i.jerseyNum=n,i.numAtBats=0,i.numSingles=0,i.numDoubles=0,i.numTriples=0,i.numHRs=0,i.numStrikeouts=0,i.numWalks=0,i.numHBPs=0,i}(document.getElementById("newFirstName").value,document.getElementById("newLastName").value,document.getElementById("newJerseyNum").value);v.push(t),console.table(v)}(),function(){for(;playerListDiv.firstChild;)playerListDiv.removeChild(playerListDiv.lastChild);for(let t of v){const e=document.createElement("div");e.setAttribute("class","playerCardDiv"),e.setAttribute("id",`player${v.indexOf(t)}`),playerListDiv.appendChild(e);const n=document.createElement("div");n.setAttribute("class","playerNameDiv"),e.appendChild(n),n.textContent=`${t.firstName}`;const i=document.createElement("div");i.setAttribute("class","buttonDiv"),e.appendChild(i);const o=document.createElement("button");o.setAttribute("class","delButton"),i.appendChild(o),o.textContent="remove player",o.onclick=function(){playerListDiv.removeChild(e),v.splice(v.indexOf(t),1),console.table(v)}}}();newPlayerFormDiv.firstChild;)newPlayerFormDiv.removeChild(newPlayerFormDiv.lastChild)}));const x=document.createElement("button");function g(){E.reset(),newPlayerFormDiv.appendChild(E),E.appendChild(A),E.appendChild(y),E.appendChild(B),E.appendChild(k)}function D(){const t=function(){const t=document.createElement("div");return t.setAttribute("id","newPlayerFormDiv"),t}(),e=function(){const t=document.createElement("button");t.setAttribute("id","addPlayerButton"),t.addEventListener("click",g);const e=document.createElement("span");return e.textContent="Add Player",t.appendChild(e),t}(),n=function(){const t=document.createElement("div");return t.setAttribute("id","playerListDiv"),t}(),i=document.getElementById("tabContent");i.textContent="",i.appendChild(e),i.appendChild(t),i.appendChild(n),g()}x.setAttribute("id","singleButton"),x.addEventListener("click",(function(){v[0].hitSingle(),console.log(v[0].numSingles),console.table(v)})),function(){const e=document.getElementById("content"),n=function(e){const n=document.createElement("nav");n.setAttribute("id","navBar");const i=t("atBatButton","At Bat Tracker"),o=t("gameTrackerButton","Game Tracker"),r=t("rosterButton","Roster");return n.appendChild(i),n.appendChild(o),n.appendChild(r),n}(),i=function(t){const e=document.createElement("div");return e.setAttribute("id","tabContent"),e}();e.appendChild(n),e.appendChild(i)}(),function(){const t=document.getElementById("atBatButton"),e=document.getElementById("gameTrackerButton"),n=document.getElementById("rosterButton");t.addEventListener("click",b),e.addEventListener("click",b),n.addEventListener("click",D)}()})();