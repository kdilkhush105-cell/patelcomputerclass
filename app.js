// No Firebase or server: demo-only local browser storage.
const $ = id => document.getElementById(id);
let mode = "login", user = JSON.parse(localStorage.getItem("bsh_demo_session") || "null");
let materials = JSON.parse(localStorage.getItem("bsh_demo_materials") || "[]");
function msg(id, text, type="") { const el=$(id); el.textContent=text; el.className=`message ${type}`; }
function setMode(m){mode=m;$("loginTab").classList.toggle("active",m==="login");$("signupTab").classList.toggle("active",m==="signup");$("nameField").classList.toggle("hidden",m!=="signup");$("authTitle").textContent=m==="login"?"Welcome back":"Create your account";$("authSubtitle").textContent=m==="login"?"Sign in to access study material.":"Join your classmates on BCA Study Hub."; $("authSubmit").textContent=m==="login"?"Login":"Create account";msg("authMessage","");}
$("loginTab").onclick=()=>setMode("login");$("signupTab").onclick=()=>setMode("signup");
function saveUsers(users){localStorage.setItem("bsh_demo_users",JSON.stringify(users));}
function getUsers(){return JSON.parse(localStorage.getItem("bsh_demo_users")||"[]");}
$("authForm").addEventListener("submit",e=>{
 e.preventDefault();const email=$("email").value.trim().toLowerCase(),password=$("password").value,role=$("role").value,name=$("fullName").value.trim();let users=getUsers();
 if(mode==="signup"){
  if(!name)return msg("authMessage","अपना पूरा नाम लिखें।","error");
  if(users.some(u=>u.email===email))return msg("authMessage","इस ईमेल से डेमो अकाउंट पहले से है। Login करें।","error");
  // This is only a local demo. Role selection is intentionally NOT secure.
  users.push({email,password,name,role});saveUsers(users);user={email,name,role};localStorage.setItem("bsh_demo_session",JSON.stringify(user));render();
  msg("authMessage","डेमो अकाउंट बन गया। याद रखें: यह सुरक्षित वास्तविक लॉगिन नहीं है।","success");
 }else{
  const found=users.find(u=>u.email===email&&u.password===password);
  if(!found)return msg("authMessage","अकाउंट नहीं मिला। पहले Create account करें या सही विवरण डालें।","error");
  user={email:found.email,name:found.name,role:found.role};localStorage.setItem("bsh_demo_session",JSON.stringify(user));render();
 }
});
$("logoutBtn").onclick=()=>{user=null;localStorage.removeItem("bsh_demo_session");render();};
$("uploadForm").addEventListener("submit",e=>{
 e.preventDefault();if(!user||user.role!=="admin")return msg("uploadMessage","Demo Admin login जरूरी है।","error");
 const f=$("materialFile").files[0];if(!f)return msg("uploadMessage","PDF चुनें।","error");
 if(f.type!=="application/pdf"&&!f.name.toLowerCase().endsWith(".pdf"))return msg("uploadMessage","केवल PDF फाइल स्वीकार है।","error");
 if(f.size>10*1024*1024)return msg("uploadMessage","फाइल 10 MB से छोटी होनी चाहिए।","error");
 const reader=new FileReader();reader.onload=()=>{
  materials.unshift({id:Date.now().toString(),title:$("materialTitle").value.trim(),semester:$("semester").value,category:$("category").value,subject:$("subject").value.trim(),fileName:f.name,data:reader.result});
  try{localStorage.setItem("bsh_demo_materials",JSON.stringify(materials));$("uploadForm").reset();msg("uploadMessage","PDF इसी ब्राउज़र में सेव हो गई। दूसरे लोगों को नहीं दिखेगी।","success");renderMaterials();}
  catch(err){msg("uploadMessage","ब्राउज़र की स्टोरेज भर गई। छोटी PDF इस्तेमाल करें या क्लाउड बैकएंड जोड़ें।","error");}
 };reader.readAsDataURL(f);
});
function renderMaterials(){const list=$("materialsList");list.innerHTML="";const term=$("searchInput").value.toLowerCase().trim(),sem=$("filterSemester").value,cat=$("filterCategory").value;
 const rows=materials.filter(m=>(!term||`${m.title} ${m.subject}`.toLowerCase().includes(term))&&(!sem||m.semester===sem)&&(!cat||m.category===cat));
 if(!rows.length){const p=document.createElement("p");p.className="muted";p.textContent="अभी कोई study material नहीं मिला।";list.appendChild(p);return;}
 rows.forEach(m=>{const card=document.createElement("article");card.className="material";const h=document.createElement("h3");h.textContent=m.title;card.appendChild(h);const p=document.createElement("p");p.textContent=`${m.semester} · ${m.category} · ${m.subject}`;card.appendChild(p);const f=document.createElement("p");f.textContent=m.fileName;card.appendChild(f);const actions=document.createElement("div");actions.className="material-actions";const a=document.createElement("a");a.href=m.data;a.download=m.fileName;a.textContent="Download PDF";actions.appendChild(a);
 if(user&&user.role==="admin"){const d=document.createElement("button");d.className="delete-btn";d.textContent="Delete";d.onclick=()=>{if(confirm("यह PDF इस ब्राउज़र से हटाएँ?")){materials=materials.filter(x=>x.id!==m.id);localStorage.setItem("bsh_demo_materials",JSON.stringify(materials));renderMaterials();}};actions.appendChild(d);}card.appendChild(actions);list.appendChild(card);});
}
["searchInput","filterSemester","filterCategory"].forEach(id=>$(id).addEventListener(id==="searchInput"?"input":"change",renderMaterials));
function render(){const signed=!!user;$("accountStatus").textContent=signed?`${user.name} · ${user.role}`:"Not signed in";$("authCard").classList.toggle("hidden",signed);$("appPanel").classList.toggle("hidden",!signed);$("adminPanel").classList.toggle("hidden",!(signed&&user.role==="admin"));if(signed)renderMaterials();}
render();