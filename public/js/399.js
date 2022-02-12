(self.webpackChunk=self.webpackChunk||[]).push([[399],{1490:(t,e,n)=>{"use strict";n.d(e,{Z:()=>f,W:()=>d});var r=n(7484),i=n.n(r),s=n(4110),a=n.n(s),o=n(178),c=n.n(o),l=n(9387),u=n.n(l);i().extend(a()),i().extend(c()),i().extend(u());const f=i();var d=function(t){var e=Math.floor(t/60),n=t%60;return"".concat(e,":").concat(n)}},8399:(t,e,n)=>{"use strict";n.r(e),n.d(e,{default:()=>l});n(7294);var r=n(1636),i=n(5222),s=n(1490),a=n(7698),o=n(5893),c=function(t){var e=t.roster;return(0,o.jsx)("div",{className:"p-4",children:(0,o.jsx)("div",{className:"rounded shadow bg-white mt-4 overflow-x-auto",children:(0,o.jsx)("div",{children:(0,o.jsxs)("table",{className:"table table-auto",children:[(0,o.jsx)("thead",{children:(0,o.jsxs)("tr",{children:[(0,o.jsx)("th",{children:"Rank"}),(0,o.jsx)("th",{children:"Pilot"}),(0,o.jsx)("th",{children:"Current Location"}),(0,o.jsx)("th",{children:"Flights"}),(0,o.jsx)("th",{children:"Hours"}),(0,o.jsx)("th",{children:"Discord"}),(0,o.jsx)("th",{children:"Volanta"}),(0,o.jsx)("th",{children:"MSFS"})]})}),(0,o.jsx)("tbody",{children:e.map((function(t){return(0,o.jsxs)("tr",{children:[(0,o.jsx)("td",{children:(0,o.jsx)(i.Z,{content:t.rank.name,direction:"top",children:(0,o.jsx)("img",{src:t.rank.image,width:"80"})})}),(0,o.jsxs)("td",{children:[(0,o.jsx)("span",{children:t.pilot_id}),(0,o.jsx)("br",{}),(0,o.jsx)("span",{className:"text-xs",children:t.private_name})]}),(0,o.jsxs)("td",{children:[(0,o.jsx)(r.rU,{href:"/airports/".concat(t.current_airport_id),className:"text-xs",children:t.current_airport_id}),(0,o.jsx)("br",{}),(0,o.jsx)("span",{className:"text-xs",children:t.location.name})]}),(0,o.jsx)("td",{children:t.flights}),(0,o.jsx)("td",{children:(0,s.W)(t.flights_time)}),(0,o.jsx)("td",{children:t.discord_username}),(0,o.jsx)("td",{children:t.volanta_username}),(0,o.jsx)("td",{children:t.msfs_username})]},t.id)}))})]})})})})};c.layout=function(t){return(0,o.jsx)(a.Z,{children:t,title:"Roster",heading:"Pilot Roster"})};const l=c},7698:(t,e,n)=>{"use strict";n.d(e,{Z:()=>g});var r=n(7294),i=n(1636),s=(n(2669),n(2629)),a=n(5893);var o=n(1490),c=n(5222);function l(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var n=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null==n)return;var r,i,s=[],a=!0,o=!1;try{for(n=n.call(t);!(a=(r=n.next()).done)&&(s.push(r.value),!e||s.length!==e);a=!0);}catch(t){o=!0,i=t}finally{try{a||null==n.return||n.return()}finally{if(o)throw i}}return s}(t,e)||function(t,e){if(!t)return;if("string"==typeof t)return u(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(t);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return u(t,e)}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function u(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}const f=function(t){var e=t.heading,n=t.setNavState,s=(0,i.qt)().props.auth,u=l((0,r.useState)((0,o.Z)().utc().format("HH:mm")),2),f=u[0],d=u[1],h=l((0,r.useState)("UTC"),2),m=h[0],x=h[1];return(0,a.jsxs)("header",{className:"flex flex-row justify-between items-center header fixed bg-white shadow left-0 lg:left-64 right-0 py-4 px-4 z-20",children:[(0,a.jsxs)("div",{className:"flex items-center",children:[(0,a.jsx)("div",{className:"lg:hidden mr-3 cursor-pointer",onClick:n,children:(0,a.jsx)("i",{className:"material-icons",children:"menu"})}),(0,a.jsx)("h1",{children:e})]}),(0,a.jsxs)("div",{className:"flex items-center",children:[(0,a.jsx)("div",{className:"mr-1 md:mr-4",children:(0,a.jsxs)("span",{className:"nav-link cursor-pointer",onMouseOver:function(){d((0,o.Z)().format("HH:mm")),x("local")},onMouseLeave:function(){d((0,o.Z)().utc().format("HH:mm")),x("UTC")},children:[f," ",m]})}),(0,a.jsx)("div",{className:"hidden md:inline-block mr-4",children:(0,a.jsxs)("div",{className:"flex items-center",children:[(0,a.jsx)("div",{className:"mx-1",children:(0,a.jsx)(c.Z,{content:"My Finances",direction:"bottom",children:(0,a.jsxs)(i.rU,{href:"/my-finances",children:["$",s.user.balance.toLocaleString(navigator.language)]})})}),(0,a.jsx)("div",{className:"mx-1",children:(0,a.jsx)(c.Z,{content:"My Logbook",direction:"bottom",children:(0,a.jsxs)(i.rU,{href:"/logbook",children:[s.user.points.toLocaleString(navigator.language)," XP"]})})}),(0,a.jsx)("div",{className:"mx-1",children:(0,a.jsx)(c.Z,{content:"Current Airport",direction:"bottom",children:(0,a.jsx)(i.rU,{href:"/airports/".concat(s.user.current_airport_id),className:"ml-2 btn cursor-pointer",children:s.user.current_airport_id})})})]})}),(0,a.jsxs)("div",{className:"flex items-center mx-2",children:[(0,a.jsx)("img",{width:"60",className:"mr-3",src:s.user.rank.image}),(0,a.jsx)(c.Z,{content:"Profile",direction:"bottom",children:(0,a.jsx)(i.rU,{href:"/profile",children:(0,a.jsxs)("span",{className:"flex flex-col",children:[(0,a.jsx)("span",{className:"font-semibold text-orange-500 tracking-wide leading-none",children:s.user.name}),(0,a.jsxs)("span",{className:"text-gray-500 text-xs leading-none mt-1",children:[s.user.pilot_id," ",s.user.rank.name]})]})})})]})]})]})};const d=function(t){var e=t.text,n=t.link,r=t.icon,s=t.numeric;return(0,a.jsx)("li",{className:"my-px",children:(0,a.jsxs)(i.rU,{href:n,className:"flex flex-row items-center h-10 px-3 rounded-lg text-gray-700 hover:bg-gray-100",children:[(0,a.jsx)("span",{className:"flex items-center justify-center text-lg text-gray-400",children:(0,a.jsx)("i",{className:"material-icons",children:r})}),(0,a.jsx)("span",{className:"ml-3",children:e}),s>=0&&(0,a.jsx)("span",{className:"flex items-center justify-center text-xs text-orange-500 font-semibold bg-orange-100 h-6 px-2 rounded-full ml-auto",children:s})]})})};const h=function(t){var e=t.name;return(0,a.jsx)("li",{className:"my-px",children:(0,a.jsx)("span",{className:"flex font-medium text-sm text-gray-300 px-4 my-2 uppercase",children:e})})};const m=function(t){var e=t.isNavVisible,n=t.setNavState,r=(0,i.qt)().props.auth;return(0,a.jsxs)("aside",{className:"".concat(e?"block":"hidden"," lg:block overflow-auto sidebar fixed top-0 bottom-0 min-h-screen w-64 lg:shadow transform md:translate-x-0 transition-transform duration-150 ease-in bg-white border-r-2 border-orange-500 z-20"),children:[(0,a.jsx)("div",{className:"sidebar-header flex items-center justify-center py-4",children:(0,a.jsxs)("div",{className:"inline-flex items-center",children:[(0,a.jsxs)(i.rU,{href:"/",className:"inline-flex flex-row items-center",children:[(0,a.jsx)("img",{className:"h-9 w-auto",src:"https://res.cloudinary.com/dji0yvkef/image/upload/v1628691598/BDLogo.png",alt:"logo"}),(0,a.jsx)("span",{className:"leading-10 text-gray-900 text-xl ml-2",children:"Bush Divers"})]}),(0,a.jsx)("i",{onClick:n,className:"lg:hidden cursor-pointer ml-2 material-icons",children:"menu_open"})]})}),(0,a.jsx)("div",{className:"sidebar-content px-4 py-2",children:(0,a.jsxs)("ul",{className:"flex flex-col w-full",children:[(0,a.jsx)(d,{link:"/dashboard",icon:"home",text:"My Crew Page"}),(0,a.jsx)(d,{link:"/live-flights",icon:"near_me",text:"Live Flights"}),(0,a.jsx)(d,{link:"/airports",icon:"business",text:"Airports"}),(0,a.jsx)(h,{name:"HQ"}),(0,a.jsx)(d,{link:"/roster",icon:"people",text:"Roster"}),(0,a.jsx)(d,{link:"/fleet-aircraft",icon:"flight",text:"Fleet"}),(0,a.jsx)(d,{link:"/finances",icon:"account_balance_wallet",text:"Company Finances"}),(0,a.jsx)(d,{link:"/resources",icon:"download",text:"Resources"}),(0,a.jsx)(h,{name:"Contracts"}),(0,a.jsx)(d,{link:"/available-contracts",icon:"assignment_ind",text:"Available Contracts",numeric:r.user.current_bids}),(0,a.jsx)(d,{link:"/contracts",icon:"assignment",text:"Find a Contract"}),(0,a.jsx)(d,{link:"/completed-contracts",icon:"assignment_turned_in",text:"Completed Contracts"}),(0,a.jsx)(d,{link:"/dispatch",icon:"assignment_returned",text:"Flight Dispatch"}),(0,a.jsx)(h,{name:"Pilot Area"}),(0,a.jsx)(d,{link:"/logbook",icon:"text_snippet",text:"Logbook"}),(0,a.jsx)(d,{link:"/my-finances",icon:"account_balance",text:"My Finances"}),(0,a.jsx)(d,{link:"/jumpseat",icon:"airplane_ticket",text:"Jumpseat"}),(0,a.jsx)(d,{link:"/rentals",icon:"flight_takeoff",text:"Aircraft Rentals"}),(0,a.jsx)(d,{link:"/logout",icon:"lock",text:"Sign Out"}),r.user.is_admin?(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(h,{name:"Admin"}),(0,a.jsx)(d,{link:"/admin/pireps",icon:"text_snippet",text:"Pireps"}),(0,a.jsx)(d,{link:"/admin/fleet",icon:"flight",text:"Fleet"}),(0,a.jsx)(d,{link:"/admin/users",icon:"people",text:"Users"}),(0,a.jsx)(d,{link:"/admin/resources",icon:"download",text:"Resources"})]}):(0,a.jsx)(a.Fragment,{})]})})]})};function x(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var n=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null==n)return;var r,i,s=[],a=!0,o=!1;try{for(n=n.call(t);!(a=(r=n.next()).done)&&(s.push(r.value),!e||s.length!==e);a=!0);}catch(t){o=!0,i=t}finally{try{a||null==n.return||n.return()}finally{if(o)throw i}}return s}(t,e)||function(t,e){if(!t)return;if("string"==typeof t)return v(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(t);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return v(t,e)}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function v(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function g(t){var e=t.children,n=t.title,o=t.heading,c=(0,i.qt)().props.flash,l=x((0,r.useState)(!1),2),u=l[0],d=l[1],h=function(){d(!u)};return(0,a.jsxs)("div",{className:"flex flex-row min-h-screen bg-gray-100 text-gray-800",children:[(0,a.jsx)(i.Fb,{title:n}),(0,a.jsx)(m,{isNavVisible:u,setNavState:h}),(0,a.jsxs)("main",{className:"main flex flex-col flex-grow -ml-64 lg:ml-0 transition-all duration-150 ease-in z-10",children:[(0,a.jsx)(f,{heading:o,setNavState:h}),(0,a.jsxs)("div",{className:"main-content flex flex-col flex-grow relative ml-64 mt-16",children:[c.error&&(0,a.jsx)(s.Z,{type:"error",message:c.error}),c.success&&(0,a.jsx)(s.Z,{type:"success",message:c.success}),e]})]}),(0,a.jsx)("a",{rel:"noreferrer",target:"_blank",href:"https://www.patreon.com/bushdivers?fan_landing=true",children:(0,a.jsx)("div",{className:"ribbon ribbon-bottom ribbon-right ribbon-sticky",children:(0,a.jsx)("div",{className:"text-xs",children:"Donate"})})})]})}},2629:(t,e,n)=>{"use strict";n.d(e,{Z:()=>i});n(7294);var r=n(5893);const i=function(t){return(0,r.jsx)(r.Fragment,{children:(0,r.jsxs)("div",{className:"bg-opacity-40 p-2 mx-12 my-2 rounded shadow-lg ".concat("success"===t.type?"bg-green-100":"bg-red-100"),children:[(0,r.jsx)("span",{className:"success"===t.type?"text-green-900":"text-red-900",children:"success"===t.type?(0,r.jsx)("span",{className:"text-green-900 text-lg font-bold",children:"Success"}):(0,r.jsx)("span",{className:"text-red-900 text-lg font-bold",children:"Error"})}),(0,r.jsx)("span",{className:"ml-2",children:t.message})]})})}},5222:(t,e,n)=>{"use strict";n.d(e,{Z:()=>o});var r=n(7294),i=n(5893);function s(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var n=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null==n)return;var r,i,s=[],a=!0,o=!1;try{for(n=n.call(t);!(a=(r=n.next()).done)&&(s.push(r.value),!e||s.length!==e);a=!0);}catch(t){o=!0,i=t}finally{try{a||null==n.return||n.return()}finally{if(o)throw i}}return s}(t,e)||function(t,e){if(!t)return;if("string"==typeof t)return a(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(t);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return a(t,e)}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function a(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function o(t){var e,n=s((0,r.useState)(!1),2),a=n[0],o=n[1];return(0,i.jsxs)("div",{className:"inline-block relative",onMouseEnter:function(){e=setTimeout((function(){o(!0)}),400)},onMouseLeave:function(){clearInterval(e),o(!1)},children:[t.children,a&&(0,i.jsx)("div",{className:"tooltip ".concat(t.direction||"top"),children:t.content})]})}},2669:(t,e,n)=>{"use strict";n.d(e,{Z:()=>s});n(7294);var r=n(1636),i=n(5893);const s=function(){var t=(new Date).getFullYear();return(0,i.jsx)("footer",{children:(0,i.jsxs)("div",{className:"bg-gray-100 flex justify-between p-4",children:[(0,i.jsxs)("div",{children:["© Bush Divers ",t]}),(0,i.jsxs)("div",{children:[(0,i.jsx)(r.rU,{className:"mr-4",href:"/privacy",children:"Privacy Policy"}),(0,i.jsx)(r.rU,{href:"/supporters",children:"Supporters"})]})]})})}},7484:function(t){t.exports=function(){"use strict";var t=1e3,e=6e4,n=36e5,r="millisecond",i="second",s="minute",a="hour",o="day",c="week",l="month",u="quarter",f="year",d="date",h="Invalid Date",m=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,x=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,v={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_")},g=function(t,e,n){var r=String(t);return!r||r.length>=e?t:""+Array(e+1-r.length).join(n)+t},p={s:g,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),r=Math.floor(n/60),i=n%60;return(e<=0?"+":"-")+g(r,2,"0")+":"+g(i,2,"0")},m:function t(e,n){if(e.date()<n.date())return-t(n,e);var r=12*(n.year()-e.year())+(n.month()-e.month()),i=e.clone().add(r,l),s=n-i<0,a=e.clone().add(r+(s?-1:1),l);return+(-(r+(n-i)/(s?i-a:a-i))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return{M:l,y:f,w:c,d:o,D:d,h:a,m:s,s:i,ms:r,Q:u}[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},y="en",j={};j[y]=v;var $=function(t){return t instanceof S},b=function(t,e,n){var r;if(!t)return y;if("string"==typeof t)j[t]&&(r=t),e&&(j[t]=e,r=t);else{var i=t.name;j[i]=t,r=i}return!n&&r&&(y=r),r||!n&&y},w=function(t,e){if($(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new S(n)},M=p;M.l=b,M.i=$,M.w=function(t,e){return w(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var S=function(){function v(t){this.$L=b(t.locale,null,!0),this.parse(t)}var g=v.prototype;return g.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(M.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var r=e.match(m);if(r){var i=r[2]-1||0,s=(r[7]||"0").substring(0,3);return n?new Date(Date.UTC(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)):new Date(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)}}return new Date(e)}(t),this.$x=t.x||{},this.init()},g.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},g.$utils=function(){return M},g.isValid=function(){return!(this.$d.toString()===h)},g.isSame=function(t,e){var n=w(t);return this.startOf(e)<=n&&n<=this.endOf(e)},g.isAfter=function(t,e){return w(t)<this.startOf(e)},g.isBefore=function(t,e){return this.endOf(e)<w(t)},g.$g=function(t,e,n){return M.u(t)?this[e]:this.set(n,t)},g.unix=function(){return Math.floor(this.valueOf()/1e3)},g.valueOf=function(){return this.$d.getTime()},g.startOf=function(t,e){var n=this,r=!!M.u(e)||e,u=M.p(t),h=function(t,e){var i=M.w(n.$u?Date.UTC(n.$y,e,t):new Date(n.$y,e,t),n);return r?i:i.endOf(o)},m=function(t,e){return M.w(n.toDate()[t].apply(n.toDate("s"),(r?[0,0,0,0]:[23,59,59,999]).slice(e)),n)},x=this.$W,v=this.$M,g=this.$D,p="set"+(this.$u?"UTC":"");switch(u){case f:return r?h(1,0):h(31,11);case l:return r?h(1,v):h(0,v+1);case c:var y=this.$locale().weekStart||0,j=(x<y?x+7:x)-y;return h(r?g-j:g+(6-j),v);case o:case d:return m(p+"Hours",0);case a:return m(p+"Minutes",1);case s:return m(p+"Seconds",2);case i:return m(p+"Milliseconds",3);default:return this.clone()}},g.endOf=function(t){return this.startOf(t,!1)},g.$set=function(t,e){var n,c=M.p(t),u="set"+(this.$u?"UTC":""),h=(n={},n[o]=u+"Date",n[d]=u+"Date",n[l]=u+"Month",n[f]=u+"FullYear",n[a]=u+"Hours",n[s]=u+"Minutes",n[i]=u+"Seconds",n[r]=u+"Milliseconds",n)[c],m=c===o?this.$D+(e-this.$W):e;if(c===l||c===f){var x=this.clone().set(d,1);x.$d[h](m),x.init(),this.$d=x.set(d,Math.min(this.$D,x.daysInMonth())).$d}else h&&this.$d[h](m);return this.init(),this},g.set=function(t,e){return this.clone().$set(t,e)},g.get=function(t){return this[M.p(t)]()},g.add=function(r,u){var d,h=this;r=Number(r);var m=M.p(u),x=function(t){var e=w(h);return M.w(e.date(e.date()+Math.round(t*r)),h)};if(m===l)return this.set(l,this.$M+r);if(m===f)return this.set(f,this.$y+r);if(m===o)return x(1);if(m===c)return x(7);var v=(d={},d[s]=e,d[a]=n,d[i]=t,d)[m]||1,g=this.$d.getTime()+r*v;return M.w(g,this)},g.subtract=function(t,e){return this.add(-1*t,e)},g.format=function(t){var e=this,n=this.$locale();if(!this.isValid())return n.invalidDate||h;var r=t||"YYYY-MM-DDTHH:mm:ssZ",i=M.z(this),s=this.$H,a=this.$m,o=this.$M,c=n.weekdays,l=n.months,u=function(t,n,i,s){return t&&(t[n]||t(e,r))||i[n].substr(0,s)},f=function(t){return M.s(s%12||12,t,"0")},d=n.meridiem||function(t,e,n){var r=t<12?"AM":"PM";return n?r.toLowerCase():r},m={YY:String(this.$y).slice(-2),YYYY:this.$y,M:o+1,MM:M.s(o+1,2,"0"),MMM:u(n.monthsShort,o,l,3),MMMM:u(l,o),D:this.$D,DD:M.s(this.$D,2,"0"),d:String(this.$W),dd:u(n.weekdaysMin,this.$W,c,2),ddd:u(n.weekdaysShort,this.$W,c,3),dddd:c[this.$W],H:String(s),HH:M.s(s,2,"0"),h:f(1),hh:f(2),a:d(s,a,!0),A:d(s,a,!1),m:String(a),mm:M.s(a,2,"0"),s:String(this.$s),ss:M.s(this.$s,2,"0"),SSS:M.s(this.$ms,3,"0"),Z:i};return r.replace(x,(function(t,e){return e||m[t]||i.replace(":","")}))},g.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},g.diff=function(r,d,h){var m,x=M.p(d),v=w(r),g=(v.utcOffset()-this.utcOffset())*e,p=this-v,y=M.m(this,v);return y=(m={},m[f]=y/12,m[l]=y,m[u]=y/3,m[c]=(p-g)/6048e5,m[o]=(p-g)/864e5,m[a]=p/n,m[s]=p/e,m[i]=p/t,m)[x]||p,h?y:M.a(y)},g.daysInMonth=function(){return this.endOf(l).$D},g.$locale=function(){return j[this.$L]},g.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),r=b(t,e,!0);return r&&(n.$L=r),n},g.clone=function(){return M.w(this.$d,this)},g.toDate=function(){return new Date(this.valueOf())},g.toJSON=function(){return this.isValid()?this.toISOString():null},g.toISOString=function(){return this.$d.toISOString()},g.toString=function(){return this.$d.toUTCString()},v}(),N=S.prototype;return w.prototype=N,[["$ms",r],["$s",i],["$m",s],["$H",a],["$W",o],["$M",l],["$y",f],["$D",d]].forEach((function(t){N[t[1]]=function(e){return this.$g(e,t[0],t[1])}})),w.extend=function(t,e){return t.$i||(t(e,S,w),t.$i=!0),w},w.locale=b,w.isDayjs=$,w.unix=function(t){return w(1e3*t)},w.en=j[y],w.Ls=j,w.p={},w}()},4110:function(t){t.exports=function(){"use strict";return function(t,e,n){t=t||{};var r=e.prototype,i={future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"};function s(t,e,n,i){return r.fromToBase(t,e,n,i)}n.en.relativeTime=i,r.fromToBase=function(e,r,s,a,o){for(var c,l,u,f=s.$locale().relativeTime||i,d=t.thresholds||[{l:"s",r:44,d:"second"},{l:"m",r:89},{l:"mm",r:44,d:"minute"},{l:"h",r:89},{l:"hh",r:21,d:"hour"},{l:"d",r:35},{l:"dd",r:25,d:"day"},{l:"M",r:45},{l:"MM",r:10,d:"month"},{l:"y",r:17},{l:"yy",d:"year"}],h=d.length,m=0;m<h;m+=1){var x=d[m];x.d&&(c=a?n(e).diff(s,x.d,!0):s.diff(e,x.d,!0));var v=(t.rounding||Math.round)(Math.abs(c));if(u=c>0,v<=x.r||!x.r){v<=1&&m>0&&(x=d[m-1]);var g=f[x.l];o&&(v=o(""+v)),l="string"==typeof g?g.replace("%d",v):g(v,r,x.l,u);break}}if(r)return l;var p=u?f.future:f.past;return"function"==typeof p?p(l):p.replace("%s",l)},r.to=function(t,e){return s(t,e,this,!0)},r.from=function(t,e){return s(t,e,this)};var a=function(t){return t.$u?n.utc():n()};r.toNow=function(t){return this.to(a(this),t)},r.fromNow=function(t){return this.from(a(this),t)}}}()},9387:function(t){t.exports=function(){"use strict";var t={year:0,month:1,day:2,hour:3,minute:4,second:5},e={};return function(n,r,i){var s,a=function(t,n,r){void 0===r&&(r={});var i=new Date(t);return function(t,n){void 0===n&&(n={});var r=n.timeZoneName||"short",i=t+"|"+r,s=e[i];return s||(s=new Intl.DateTimeFormat("en-US",{hour12:!1,timeZone:t,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit",timeZoneName:r}),e[i]=s),s}(n,r).formatToParts(i)},o=function(e,n){for(var r=a(e,n),s=[],o=0;o<r.length;o+=1){var c=r[o],l=c.type,u=c.value,f=t[l];f>=0&&(s[f]=parseInt(u,10))}var d=s[3],h=24===d?0:d,m=s[0]+"-"+s[1]+"-"+s[2]+" "+h+":"+s[4]+":"+s[5]+":000",x=+e;return(i.utc(m).valueOf()-(x-=x%1e3))/6e4},c=r.prototype;c.tz=function(t,e){void 0===t&&(t=s);var n=this.utcOffset(),r=this.toDate(),a=r.toLocaleString("en-US",{timeZone:t}),o=Math.round((r-new Date(a))/1e3/60),c=i(a).$set("millisecond",this.$ms).utcOffset(15*-Math.round(r.getTimezoneOffset()/15)-o,!0);if(e){var l=c.utcOffset();c=c.add(n-l,"minute")}return c.$x.$timezone=t,c},c.offsetName=function(t){var e=this.$x.$timezone||i.tz.guess(),n=a(this.valueOf(),e,{timeZoneName:t}).find((function(t){return"timezonename"===t.type.toLowerCase()}));return n&&n.value};var l=c.startOf;c.startOf=function(t,e){if(!this.$x||!this.$x.$timezone)return l.call(this,t,e);var n=i(this.format("YYYY-MM-DD HH:mm:ss:SSS"));return l.call(n,t,e).tz(this.$x.$timezone,!0)},i.tz=function(t,e,n){var r=n&&e,a=n||e||s,c=o(+i(),a);if("string"!=typeof t)return i(t).tz(a);var l=function(t,e,n){var r=t-60*e*1e3,i=o(r,n);if(e===i)return[r,e];var s=o(r-=60*(i-e)*1e3,n);return i===s?[r,i]:[t-60*Math.min(i,s)*1e3,Math.max(i,s)]}(i.utc(t,r).valueOf(),c,a),u=l[0],f=l[1],d=i(u).utcOffset(f);return d.$x.$timezone=a,d},i.tz.guess=function(){return Intl.DateTimeFormat().resolvedOptions().timeZone},i.tz.setDefault=function(t){s=t}}}()},178:function(t){t.exports=function(){"use strict";var t="minute",e=/[+-]\d\d(?::?\d\d)?/g,n=/([+-]|\d\d)/g;return function(r,i,s){var a=i.prototype;s.utc=function(t){return new i({date:t,utc:!0,args:arguments})},a.utc=function(e){var n=s(this.toDate(),{locale:this.$L,utc:!0});return e?n.add(this.utcOffset(),t):n},a.local=function(){return s(this.toDate(),{locale:this.$L,utc:!1})};var o=a.parse;a.parse=function(t){t.utc&&(this.$u=!0),this.$utils().u(t.$offset)||(this.$offset=t.$offset),o.call(this,t)};var c=a.init;a.init=function(){if(this.$u){var t=this.$d;this.$y=t.getUTCFullYear(),this.$M=t.getUTCMonth(),this.$D=t.getUTCDate(),this.$W=t.getUTCDay(),this.$H=t.getUTCHours(),this.$m=t.getUTCMinutes(),this.$s=t.getUTCSeconds(),this.$ms=t.getUTCMilliseconds()}else c.call(this)};var l=a.utcOffset;a.utcOffset=function(r,i){var s=this.$utils().u;if(s(r))return this.$u?0:s(this.$offset)?l.call(this):this.$offset;if("string"==typeof r&&null===(r=function(t){void 0===t&&(t="");var r=t.match(e);if(!r)return null;var i=(""+r[0]).match(n)||["-",0,0],s=i[0],a=60*+i[1]+ +i[2];return 0===a?0:"+"===s?a:-a}(r)))return this;var a=Math.abs(r)<=16?60*r:r,o=this;if(i)return o.$offset=a,o.$u=0===r,o;if(0!==r){var c=this.$u?this.toDate().getTimezoneOffset():-1*this.utcOffset();(o=this.local().add(a+c,t)).$offset=a,o.$x.$localOffset=c}else o=this.utc();return o};var u=a.format;a.format=function(t){var e=t||(this.$u?"YYYY-MM-DDTHH:mm:ss[Z]":"");return u.call(this,e)},a.valueOf=function(){var t=this.$utils().u(this.$offset)?0:this.$offset+(this.$x.$localOffset||(new Date).getTimezoneOffset());return this.$d.valueOf()-6e4*t},a.isUTC=function(){return!!this.$u},a.toISOString=function(){return this.toDate().toISOString()},a.toString=function(){return this.toDate().toUTCString()};var f=a.toDate;a.toDate=function(t){return"s"===t&&this.$offset?s(this.format("YYYY-MM-DD HH:mm:ss:SSS")).toDate():f.call(this)};var d=a.diff;a.diff=function(t,e,n){if(t&&this.$u===t.$u)return d.call(this,t,e,n);var r=this.local(),i=s(t).local();return d.call(r,i,e,n)}}}()}}]);