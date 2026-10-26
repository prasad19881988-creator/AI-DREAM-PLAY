const characters = [
  {id:"maya",name:"Maya",role:"Romance",icon:"♡",tag:"ROMANTIC",desc:"Warm, witty and affectionate fictional companion.",greeting:"Hey, I'm Maya. What kind of romantic or feel-good story shall we create today?"},
  {id:"aarav",name:"Aarav",role:"Romance",icon:"✦",tag:"CHARMING",desc:"A confident, caring character for playful conversations.",greeting:"Hi there. Want to talk, flirt lightly, or build a story together?"},
  {id:"riya",name:"Riya",role:"Drama",icon:"🎭",tag:"DRAMA",desc:"A bold drama lead who brings twists to every scene.",greeting:"The scene is yours. Give me the setting and I'll help bring the drama to life."},
  {id:"family",name:"Family Story",role:"Family",icon:"⌂",tag:"OPEN STORY",desc:"Build a fictional family drama with multiple characters.",greeting:"Welcome to your family story. Who is in the scene, and what happens first?"},
  {id:"mystery",name:"Inspector Dev",role:"Mystery",icon:"⌕",tag:"MYSTERY",desc:"A sharp detective for clue-filled interactive mysteries.",greeting:"Inspector Dev here. Tell me where the case begins, and let's follow the clues."},
  {id:"custom",name:"Create Your Own",role:"All",icon:"＋",tag:"CUSTOM",desc:"Describe a fictional adult character and set the story tone.",greeting:"Let's create a fictional character. Tell me their name, personality and the kind of story you want."},
  {id:"anaya",name:"Anaya",role:"Drama",icon:"✿",tag:"CONFIDANTE",desc:"A thoughtful friend for heartfelt talks and life stories.",greeting:"I'm here to listen. Would you like a comforting conversation or a story scene?"},
  {id:"couple",name:"Couple Story",role:"Family",icon:"∞",tag:"TWO CHARACTERS",desc:"Guide a fictional couple through romance and relationship drama.",greeting:"Let's shape a couple's story. What's their relationship and what's the scene today?"}
];
let activeCharacter = characters[0];
const grid = document.getElementById("characterGrid");
const modal = document.getElementById("chatModal");
const messages = document.getElementById("chatMessages");
const input = document.getElementById("messageInput");
const toast = document.getElementById("toast");
function renderCharacters(filter="All"){
  grid.innerHTML="";
  characters.filter(c=>filter==="All"||c.role===filter||c.role==="All").forEach(c=>{
    const card=document.createElement("article"); card.className="character-card";
    card.innerHTML=`<div class="character-top"><div class="character-icon">${c.icon}</div><span class="tag">${c.tag}</span></div><h3>${c.name}</h3><p>${c.desc}</p><button class="btn ghost">Start a story ↗</button>`;
    card.querySelector("button").addEventListener("click",()=>openChat(c));
    grid.appendChild(card);
  });
}
renderCharacters();
document.querySelectorAll(".filter").forEach(btn=>btn.addEventListener("click",()=>{
  document.querySelectorAll(".filter").forEach(b=>b.classList.remove("active"));btn.classList.add("active");renderCharacters(btn.dataset.filter);
}));
document.getElementById("enterBtn").addEventListener("click",()=>{document.getElementById("ageGate").classList.add("hidden");try{sessionStorage.setItem("adp18","yes")}catch(e){}});
try{if(sessionStorage.getItem("adp18")==="yes")document.getElementById("ageGate").classList.add("hidden")}catch(e){}
function openChat(c){
  activeCharacter=c;document.getElementById("chatTitle").textContent=c.name;document.getElementById("chatSubtitle").textContent=`${c.role} • Fictional AI character`;document.getElementById("chatAvatar").textContent=c.icon;
  messages.innerHTML="";addBubble(c.greeting,"them");modal.classList.remove("hidden");input.focus();
}
function addBubble(text,who){const b=document.createElement("div");b.className=`bubble ${who}`;b.textContent=text;messages.appendChild(b);messages.scrollTop=messages.scrollHeight}
function showToast(text){toast.textContent=text;toast.classList.add("show");setTimeout(()=>toast.classList.remove("show"),2600)}
function demoReply(userText){
  const t=userText.toLowerCase();
  if(/video|वीडियो/.test(t))return "Video replies are planned for the next version. They need a connected video-generation provider and may have usage costs.";
  if(/voice|आवाज|बोल/.test(t))return "Voice replies are planned for a future version. For now, let's continue the scene in text.";
  if(/romantic|romance|date|kiss|प्यार|रोमांटिक/.test(t))return "Maya smiles softly. “Let's make this scene feel special. The lights are warm, your favourite song is playing, and we have all the time to talk. What happens next in our fictional story?”";
  if(/family|परिवार|माँ|मां|पिता|घर/.test(t))return "The family gathers in the living room, each carrying a different secret. One person finally says, “We should talk honestly tonight.” What should the next scene reveal?";
  if(/mystery|case|murder|रहस्य|जांच|जाँच/.test(t))return "Inspector Dev studies the scene. “One detail doesn't fit. Let's check the timeline before we jump to conclusions.” What clue should we examine first?";
  return `“That's an interesting direction,” ${activeCharacter.name} says. “Let's build on it together. What mood should the next part have—romantic, dramatic, funny, or mysterious?”`;
}
document.getElementById("chatForm").addEventListener("submit",e=>{
  e.preventDefault();const text=input.value.trim();if(!text)return;addBubble(text,"me");input.value="";
  setTimeout(()=>addBubble(demoReply(text),"them"),450);
});
document.querySelectorAll(".prompt-chips button").forEach(b=>b.addEventListener("click",()=>{input.value=b.dataset.prompt;input.focus()}));
document.getElementById("closeChat").addEventListener("click",()=>modal.classList.add("hidden"));
modal.addEventListener("click",e=>{if(e.target===modal)modal.classList.add("hidden")});
document.getElementById("profileBtn").addEventListener("click",()=>showToast("Account login and cloud chat history can be added in the next step."));
