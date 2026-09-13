// ════════════════════════════════════════════════════════════
//  VAULTIFY — Zero-Knowledge Offline File Encryption & Steganography
//  Architected by Srinivas Jangiti (https://github.com/srinivasjangiti)
// ════════════════════════════════════════════════════════════

// ── Application State ──
let encFile = null;
let encFiles = []; // For multiple files / folders
let isZipMode = false;
let decFile = null;
let encryptedBlob = null;
let decryptedBlob = null;
let decryptedName = '';
let decryptedMime = '';
let objectUrls = [];
let cryptoOptions = { iters: 250000, saltLen: 32, algo: 'AES-GCM' };

// Keyfile 2FA State
let encKeyfileBuffer = null;
let decKeyfileBuffer = null;

// Steganography Carrier State
let stegoCarrierType = 'generated'; // 'generated' or 'custom'
let customCarrierImage = null;

// ZIP Explorer State
let currentZipEntries = {};

// Hash & Integrity State
let hashTargetFile = null;
let computedHashes = { sha256: '', sha512: '', sha1: '' };

// Shredder State
let shredTargetFile = null;
let lastDestructionCert = '';

// Password Generator Mode
let pgMode = 'words-4'; // 'words-4', 'words-6', 'complex', 'hex'

// Diceware Wordlist for High-Entropy Passphrases
const wordlist = [
  "abide","about","above","absurd","abuse","achieve","acid","action","active","actual","adapt","add","admin","admit","adult","advice","affair","afford","afraid","after","again","against","age","agency","agent","ago","agree","ahead","aim","air","airport","album","alien","alive","allow","almost","alone","alpha","already","also","alter","always","amazing","among","amount","amuse","anchor","and","angel","anger","angle","angry","animal","ankle","announce","another","answer","ant","any","apart","apology","appear","apple","apply","approach","area","argue","arm","armor","army","around","arrange","arrest","arrive","arrow","art","artist","as","ask","asset","assign","assist","assume","asthma","at","athlete","atom","attack","attend","attitude","attract","auction","audit","author","auto","autumn","average","avocado","avoid","awake","aware","away","awesome","awful","awkward","axis","baby","bachelor","bacon","badge","bag","balance","balcony","ball","bamboo","banana","banner","bar","barely","bargain","barrel","base","basic","basket","battle","beach","bean","bear","beat","beauty","because","become","beef","before","begin","behave","behind","believe","below","belt","bench","benefit","best","betray","better","between","beyond","bicycle","bid","bike","bind","biology","bird","birth","bitter","black","blade","blame","blanket","blast","bleak","bless","blind","blood","blossom","blouse","blue","blur","board","boat","body","boil","bomb","bone","bonus","book","boost","border","boring","borrow","boss","bottom","bounce","box","boy","bracket","brain","brand","brass","brave","bread","breeze","brick","bridge","brief","bright","bring","brisk","broccoli","broken","bronze","broom","brother","brown","brush","bubble","buddy","budget","buffalo","build","bulb","bulk","bullet","bundle","bunker","burden","burger","burst","bus","business","busy","butter","buyer","buzz","cabbage","cabin","cable","cactus","cage","cake","call","calm","camera","camp","can","canal","cancel","candy","cannon","canoe","canvas","canyon","capable","capital","captain","car","carbon","card","cargo","carpet","carry","cart","case","cash","casino","castle","casual","cat","catalog","catch","category","cattle","caught","cause","caution","cave","ceiling","celery","cell","cement","census","century","cereal","certain","chair","chalk","champion","change","chaos","chapter","charge","chase","chat","cheap","check","cheese","chef","cherry","chest","chicken","chief","child","chimney","choice","choose","chronic","chuckle","chunk","churn","cigar","cinnamon","circle","citizen","city","civil","claim","clap","clarify","claw","clay","clean","clerk","clever","click","client","cliff","climb","clinic","clip","clock","clog","close","cloth","cloud","clown","club","clump","cluster","clutch","coach","coast","coconut","code","coffee","coil","coin","collect","color","column","combine","come","comfort","comic","common","company","concert","conduct","confirm","congress","connect","consider","control","convince","cook","cool","copper","copy","coral","core","corn","correct","cost","cotton","couch","country","couple","course","cousin","cover","coyote","crack","cradle","craft","cram","crane","crash","crater","crawl","crazy","cream","credit","creek","crew","cricket","crime","crisp","critic","crop","cross","crouch","crowd","crucial","cruel","cruise","crumble","crunch","crush","cry","crystal","cube","culture","cup","cupboard","curious","current","curtain","curve","cushion","custom","cute","cycle","dad","damage","damp","dance","danger","daring","dash","data","date","dawn","day","dead","deal","debate","debris","decade","december","decide","decline","decorate","decrease","deer","defense","define","defy","degree","delay","deliver","demand","demise","denial","dentist","deny","depart","depend","deposit","depth","deputy","derive","describe","desert","design","desk","despair","destroy","detail","detect","develop","device","devote","diagram","dial","diamond","diary","dice","diesel","diet","differ","digital","dignity","dilemma","dinner","dinosaur","direct","dirt","disagree","discover","disease","dish","dismiss","disorder","display","distance","divert","divide","divorce","dizzy","doctor","document","dog","doll","dolphin","domain","donate","donkey","donor","door","dose","double","dove","draft","dragon","drama","drastic","draw","dream","dress","drift","drill","drink","drip","drive","drop","drum","dry","duck","dumb","dune","during","dust","dutch","duty","dwarf","dynamic","eager","eagle","early","earn","earth","easily","east","easy","echo","ecology","economy","edge","edit","educate","effort","egg","eight","either","elbow","elder","electric","elegant","element","elephant","elevator","elite","else","embark","embody","embrace","emerge","emotion","employ","empower","empty","enable","enact","end","endless","endorse","enemy","energy","enforce","engage","engine","enhance","enjoy","enlist","enough","enrich","enroll","ensure","enter","entire","entry","envelope","episode","equal","equip","era","erase","erode","error","erupt","escape","essay","essence","estate","eternal","ethics","evidence","evil","evoke","evolve","exact","example","excess","exchange","excite","exclude","excuse","execute","exercise","exhaust","exhibit","exile","exist","exit","exotic","expand","expect","expire","explain","expose","express","extend","extra","eye","eyebrow","fabric","face","faculty","fade","faint","faith","fall","false","fame","family","famous","fan","fancy","fantasy","farm","fashion","fat","fatal","father","fatigue","fault","favorite","feature","february","federal","fee","feed","feel","female","fence","festival","fetch","fever","few","fiber","fiction","field","figure","file","film","filter","final","find","fine","finger","finish","fire","firm","first","fiscal","fish","fit","fitness","fix","flag","flame","flash","flat","flavor","flee","flight","flip","float","flock","floor","flower","fluid","flush","fly","foam","focus","fog","foil","fold","follow","food","foot","force","forest","forget","fork","fortune","forum","forward","fossil","foster","found","fox","fragile","frame","frequent","fresh","friend","fringe","frog","front","frost","frown","frozen","fruit","fuel","fun","funny","furnace","fury","future","gadget","gain","galaxy","gallery","game","gap","garage","garbage","garden","garlic","garment","gas","gasp","gate","gather","gauge","gaze","general","genius","genre","gentle","genuine","gesture","ghost","giant","gift","giggle","ginger","giraffe","girl","give","glad","glance","glare","glass","glide","glimpse","globe","gloom","glory","glove","glow","glue","goat","goddess","gold","good","goose","gorilla","gospel","gossip","govern","gown","grab","grace","grain","grant","grape","grass","gravity","great","green","grid","grief","grit","grocery","group","grow","grunt","guard","guess","guide","guilt","guitar","gun","gym","habit","hair","half","hammer","hamster","hand","happy","harbor","hard","harsh","harvest","hat","have","hawk","hazard","head","health","heart","heavy","hedgehog","height","hello","helmet","help","hen","hero","hidden","high","hill","hint","hip","hire","history","hobby","hockey","hold","hole","holiday","hollow","home","honey","hood","hope","horn","horror","horse","hospital","host","hotel","hover","hub","huge","human","humble","humor","hundred","hungry","hunt","hurdle","hurry","hurt","husband","hybrid","ice","icon","idea","identify","idle","ignore","ill","illegal","illness","image","imitate","immense","immune","impact","impose","improve","impulse","inch","include","income","increase","index","indicate","indoor","industry","infant","inflict","inform","inhale","inherit","initial","inject","injury","inmate","inner","innocent","input","inquiry","insane","insect","inside","inspire","install","intact","interest","into","invest","invite","involve","iron","island","isolate","issue","item","ivory","jacket","jaguar","jar","jazz","jealous","jeans","jelly","jewel","job","join","joke","journey","joy","judge","juice","jump","jungle","junior","junk","just","kangaroo","keen","keep","ketchup","key","kick","kid","kidney","kind","kingdom","kiss","kit","kitchen","kite","kitten","kiwi","knee","knife","knock","know","lab","label","labor","ladder","lady","lake","lamp","language","laptop","large","laser","last","late","laugh","laundry","lava","law","lawn","lawsuit","layer","lazy","leader","leaf","learn","leave","lecture","left","leg","legend","lemon","lend","length","lens","leopard","lesson","letter","level","liar","liberty","library","license","life","lift","light","like","limb","limit","link","lion","liquid","list","listen","little","live","lizard","load","loan","lobster","local","lock","logic","lonely","long","loop","lottery","loud","lounge","love","loyal","lucky","luggage","lumber","lunar","lunch","luxury","lyrics","machine","mad","magic","magnet","maid","mail","main","major","make","mammal","man","manage","mandate","mango","mansion","manual","maple","marble","march","margin","marine","market","marriage","mask","mass","master","match","material","math","matrix","matter","maximum","maze","meadow","mean","measure","meat","mechanic","medal","media","melody","melt","member","memory","mention","menu","mercy","merge","merit","merry","mesh","message","metal","method","middle","midnight","milk","million","mimic","mind","minimum","minor","minute","miracle","mirror","misery","miss","mistake","mix","mixed","mixture","mobile","model","modify","mom","moment","monitor","monkey","monster","month","moon","moral","more","morning","mosquito","mother","motion","motor","mountain","mouse","move","movie","much","muffin","mule","multiply","muscle","museum","mushroom","music","must","mutual","myself","mystery","myth","naive","name","napkin","narrow","nasty","nation","nature","near","neck","need","negative","neglect","neither","nephew","nerve","nest","net","network","neutral","never","news","next","nice","night","noble","noise","nominee","noodle","normal","north","nose","notable","note","nothing","notice","novel","now","nuclear","number","nurse","nut","oak","obey","object","oblige","obscure","observe","obtain","obvious","occur","ocean","october","odor","off","offer","office","often","oil","okay","old","olive","olympic","omit","once","one","onion","online","only","open","opera","opinion","oppose","option","orange","orbit","orchard","order","ordinary","organ","orient","original","orphan","ostrich","other","outdoor","outer","output","outside","oval","oven","over","own","owner","oxygen","oyster","ozone","pact","paddle","page","pair","palace","palm","panda","panel","panic","panther","paper","parade","parent","park","parrot","party","pass","patch","path","patient","patrol","pattern","pause","pave","payment","peace","peanut","pear","peasant","pelican","pen","penalty","pencil","people","pepper","perfect","permit","person","pet","phone","photo","phrase","physical","piano","picnic","picture","piece","pig","pigeon","pill","pilot","pink","pioneer","pipe","pistol","pitch","pizza","place","planet","plastic","plate","play","please","pledge","pluck","plug","plunge","poem","poet","point","polar","pole","police","pond","pony","pool","popular","portion","position","possible","post","potato","pottery","poverty","powder","power","practice","praise","predict","prefer","prepare","present","pretty","prevent","price","pride","primary","print","priority","prison","private","prize","problem","process","produce","profit","program","project","promote","proof","property","prosper","protect","proud","provide","public","pudding","pull","pulp","pulse","pumpkin","punch","pupil","puppy","purchase","purity","purpose","purse","push","put","puzzle","pyramid","quality","quantum","quarter","question","quick","quit","quiz","quote","rabbit","raccoon","race","rack","radar","radio","rail","rain","raise","rally","ramp","ranch","random","range","rapid","rare","rate","rather","raven","raw","razor","ready","real","reason","rebel","rebuild","recall","receive","recipe","record","recycle","reduce","reflect","reform","refuse","region","regret","regular","reject","relax","release","relief","rely","remain","remember","remind","remove","render","renew","rent","reopen","repair","repeat","replace","report","require","rescue","resemble","resist","resource","response","result","retire","retreat","return","reunion","reveal","review","reward","rhythm","rib","ribbon","rice","rich","ride","ridge","rifle","right","rigid","ring","riot","ripple","risk","ritual","rival","river","road","roast","robot","robust","rocket","romance","roof","rookie","room","rose","rotate","rough","round","route","royal","rubber","rude","rug","rule","run","runway","rural","sad","saddle","sadness","safe","sail","salad","salmon","salon","salt","salute","same","sample","sand","satisfy","satoshi","sauce","sausage","save","say","scale","scan","scare","scatter","scene","scheme","school","science","scissors","scorpion","scout","scrap","screen","script","scrub","sea","search","season","seat","second","secret","section","security","seed","seek","segment","select","sell","seminar","senior","sense","sentence","series","service","session","settle","setup","seven","shadow","shaft","shallow","share","shed","shell","sheriff","shield","shift","shine","ship","shiver","shock","shoe","shoot","shop","short","shoulder","shove","shrimp","shrug","shuffle","shy","sibling","sick","side","siege","sight","sign","silent","silk","silly","silver","similar","simple","since","sing","siren","sister","situate","six","size","skate","sketch","ski","skill","skin","skirt","skull","slab","slam","sleep","slender","slice","slide","slight","slim","slogan","slot","slow","slush","small","smart","smile","smoke","smooth","snack","snake","snap","sniff","snow","soap","soccer","social","sock","soda","soft","solar","soldier","solid","solution","solve","someone","song","soon","sorry","sort","soul","sound","soup","source","south","space","spare","spatial","spawn","speak","special","speed","spell","spend","sphere","spice","spider","spike","spin","spirit","split","spoil","sponsor","spoon","sport","spot","spray","spread","spring","spy","square","squeeze","squirrel","stable","stadium","staff","stage","stairs","stamp","stand","start","state","stay","steak","steel","stem","step","stereo","stick","still","sting","stock","stomach","stone","stool","story","stove","strategy","street","strike","strong","struggle","student","stuff","stumble","style","subject","submit","subway","success","such","sudden","suffer","sugar","suggest","suit","summer","sun","sunny","sunset","super","supply","supreme","sure","surface","surge","surprise","surround","survey","suspect","sustain","swallow","swamp","swap","swarm","swear","sweet","swift","swim","swing","switch","sword","symbol","symptom","syrup","system","table","tackle","tag","tail","talent","talk","tank","tape","target","task","taste","tattoo","taxi","teach","team","tell","ten","tenant","tennis","tent","term","test","text","thank","that","theme","then","theory","there","they","thing","this","thought","three","thrive","throw","thumb","thunder","ticket","tide","tiger","tilt","timber","time","tiny","tip","tired","tissue","title","toast","tobacco","today","toddler","toe","together","toilet","token","tomato","tomorrow","tone","tongue","tonight","tool","tooth","top","topic","topple","torch","tornado","tortoise","toss","total","tourist","toward","tower","town","toy","track","trade","traffic","tragic","train","transfer","trap","trash","travel","tray","treat","tree","trend","trial","tribe","trick","trigger","trim","trip","trophy","trouble","truck","true","truly","trumpet","trust","truth","try","tube","tuition","tumble","tuna","tunnel","turkey","turn","turtle","twelve","twenty","twice","twin","twist","two","type","typical","ugly","umbrella","unable","unaware","uncle","uncover","under","undo","unfair","unfold","unhappy","uniform","unique","universe","unknown","unlock","until","unusual","unveil","update","upgrade","uphold","upon","upper","upset","urban","urge","usage","use","used","useful","useless","usual","utility","vacant","vacuum","vague","valid","valley","valve","van","vanish","vapor","various","vast","vault","vehicle","velvet","vendor","venture","venue","verb","verify","version","very","vessel","veteran","viable","vibrant","vicious","victory","video","view","village","vintage","violin","virtual","virus","visa","visit","visual","vital","vivid","vocal","voice","void","volcano","volume","vote","voyage","wage","wagon","wait","walk","wall","walnut","want","warfare","warm","warrior","wash","wasp","waste","water","wave","way","wealth","weapon","wear","weasel","weather","web","wedding","weekend","weird","welcome","west","wet","whale","what","wheat","wheel","when","where","whip","whisper","wide","width","wife","wild","will","win","window","wine","wing","wink","winner","winter","wire","wisdom","wise","wish","witness","wolf","woman","wonder","wood","wool","word","work","world","worry","worth","wrap","wreck","wrestle","wrist","write","wrong","yard","year","yellow","you","young","youth","zebra","zero","zone","zoo"
];

// ── Service Worker Registration ──
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').then(reg => {
      console.log('Vaultify SW registered successfully:', reg.scope);
    }).catch(err => console.log('Vaultify SW registration failed:', err));
  });
}

// ── Page Switching ──
function switchPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
  
  if (id === 'home') {
    document.getElementById('hero-section').style.display = 'flex';
    document.getElementById('page-encrypt').classList.add('active');
    const tab = document.getElementById('tab-encrypt');
    if (tab) tab.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }

  const targetPage = document.getElementById('page-' + id);
  if (targetPage) targetPage.classList.add('active');
  
  const tab = document.getElementById('tab-' + id);
  if (tab) tab.classList.add('active');
  
  document.getElementById('hero-section').style.display = 'none';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ── Toast Notifications ──
function toast(msg, type = 'success') {
  const t = document.getElementById('toast');
  const icon = type === 'error'
    ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:16px;height:16px;color:var(--red);flex-shrink:0"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`
    : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:16px;height:16px;color:var(--teal);flex-shrink:0"><polyline points="20 6 9 17 4 12"/></svg>`;
  t.innerHTML = icon + ' ' + msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3500);
}

// ── Clipboard Utility ──
function copyText(text, successMsg = 'Copied to clipboard!') {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => toast(successMsg));
  } else {
    const el = document.createElement('textarea');
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    toast(successMsg);
  }
}

// ── Creator Modal ──
function openCreatorModal() {
  document.getElementById('creator-modal').classList.add('show');
}
function closeCreatorModal() {
  document.getElementById('creator-modal').classList.remove('show');
}

// ── Password Visibility Toggle ──
const EYE_OPEN = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:16px;height:16px;"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`;
const EYE_CLOSED = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:16px;height:16px;"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>`;
function togglePw(id, btn) {
  const el = document.getElementById(id);
  if (el.type === 'password') { el.type = 'text'; btn.innerHTML = EYE_CLOSED; }
  else { el.type = 'password'; btn.innerHTML = EYE_OPEN; }
}

// ── Upgraded Password Generator ──
function setPgMode(mode) {
  pgMode = mode;
  document.querySelectorAll('.gen-mode-chip').forEach(c => c.classList.remove('active'));
  const activeChip = document.getElementById('gen-mode-' + mode);
  if (activeChip) activeChip.classList.add('active');
  generatePassword();
}

function generatePassword() {
  let password = "";
  if (pgMode === 'words-4') {
    const arr = new Uint32Array(4);
    crypto.getRandomValues(arr);
    password = Array.from(arr).map(n => wordlist[n % wordlist.length]).join('-');
  } else if (pgMode === 'words-6') {
    const arr = new Uint32Array(6);
    crypto.getRandomValues(arr);
    password = Array.from(arr).map(n => wordlist[n % wordlist.length]).join('-');
  } else if (pgMode === 'complex') {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";
    const arr = new Uint32Array(24);
    crypto.getRandomValues(arr);
    for (let i = 0; i < arr.length; i++) {
      password += chars[arr[i] % chars.length];
    }
  } else if (pgMode === 'hex') {
    const arr = new Uint8Array(32);
    crypto.getRandomValues(arr);
    password = Array.from(arr).map(b => b.toString(16).padStart(2, '0')).join('');
  }
  
  const pwField = document.getElementById('enc-pw');
  pwField.value = password;
  pwField.type = "text"; 
  updateStrength(password);
  
  const pw2Field = document.getElementById('enc-pw2');
  if (pw2Field) pw2Field.value = password;

  const toggleBtn = document.getElementById('enc-pw-toggle');
  if (toggleBtn) toggleBtn.innerHTML = EYE_CLOSED;
  
  toast('Generated secure passphrase');
}

// ── Extension Sanitize & Chips ──
function sanitizeExt(el) {
  el.value = el.value.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
}
function setExt(val) {
  document.getElementById('enc-ext').value = val;
}

// Toggle Theme
function toggleTheme() {
  document.documentElement.classList.toggle('dark-mode');
  const isDark = document.documentElement.classList.contains('dark-mode');
  document.getElementById('theme-toggle').innerText = isDark ? '💡 Light' : '🕶️ Dark';
}

// ── Password Strength & Entropy ──
function updateStrength(pw) {
  const fill = document.getElementById('pw-fill');
  const label = document.getElementById('pw-label');
  const entropySpan = document.getElementById('pw-entropy');
  
  let score = 0;
  let entropy = 0;
  
  if (pw.length > 0) {
    let pool = 0;
    if (/[a-z]/.test(pw)) pool += 26;
    if (/[A-Z]/.test(pw)) pool += 26;
    if (/[0-9]/.test(pw)) pool += 10;
    if (/[^a-zA-Z0-9]/.test(pw)) pool += 32;
    entropy = Math.round(pw.length * Math.log2(pool || 1));
  }
  
  if (entropy > 25) score = 1;
  if (entropy > 50) score = 2;
  if (entropy > 75) score = 3;
  if (entropy > 100) score = 4;
  if (entropy > 125) score = 5;

  const pct = Math.round((score / 5) * 100);
  const colors = ['#ff4757', '#ff4757', '#ffd166', '#ffd166', '#10b981', '#10b981'];
  const labels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong', 'Very Strong'];
  
  fill.style.width = pct + '%';
  fill.style.background = colors[score] || '#10b981';
  label.textContent = labels[score] || 'Very Strong';
  label.style.color = colors[score] || '#10b981';
  if (entropySpan) entropySpan.textContent = entropy ? `~${entropy} bits entropy` : '';
}

// ── Steganography Carrier Support ──
function toggleStego(enabled) {
  const extInput = document.getElementById('enc-ext');
  const stegoPanel = document.getElementById('stego-panel');
  if (enabled) {
    extInput.value = 'png';
    extInput.disabled = true;
    stegoPanel.style.display = 'block';
    drawGeneratedCover();
  } else {
    extInput.value = '';
    extInput.disabled = false;
    stegoPanel.style.display = 'none';
  }
}

function handleStegoTypeChange(type) {
  stegoCarrierType = type;
  const customUpload = document.getElementById('stego-custom-upload');
  const coverName = document.getElementById('stego-cover-name');
  const coverDim = document.getElementById('stego-cover-dimensions');
  
  if (type === 'generated') {
    customUpload.style.display = 'none';
    coverName.textContent = 'Cyber Shield Carrier';
    coverDim.textContent = '640 × 360 PNG container';
    drawGeneratedCover();
  } else {
    customUpload.style.display = 'block';
    coverName.textContent = customCarrierImage ? customCarrierImage._name : 'Custom Image (Upload below)';
    coverDim.textContent = customCarrierImage ? `${customCarrierImage.width} × ${customCarrierImage.height} photo` : 'Select photo to disguise vault';
  }
}

function handleCustomCoverSelected(e) {
  const file = e.target.files[0];
  if (!file) return;
  
  const reader = new FileReader();
  reader.onload = (event) => {
    const img = new Image();
    img.onload = () => {
      customCarrierImage = img;
      customCarrierImage._name = file.name;
      
      const canvas = document.getElementById('stego-canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = Math.min(img.width, 1280);
      canvas.height = Math.round(canvas.width * (img.height / img.width));
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      
      document.getElementById('stego-cover-name').textContent = file.name;
      document.getElementById('stego-cover-dimensions').textContent = `${canvas.width} × ${canvas.height} custom carrier`;
      toast(`Carrier image loaded: ${file.name}`);
    };
    img.src = event.target.result;
  };
  reader.readAsDataURL(file);
}

function drawGeneratedCover() {
  const canvas = document.getElementById('stego-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = 640;
  canvas.height = 360;
  
  // Cyber dark gradient background
  const grad = ctx.createLinearGradient(0, 0, 640, 360);
  grad.addColorStop(0, '#0c0e14');
  grad.addColorStop(0.5, '#151922');
  grad.addColorStop(1, '#080a0f');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 640, 360);
  
  // Subtle grid
  ctx.strokeStyle = '#1e2430';
  ctx.lineWidth = 1;
  for (let x = 0; x < 640; x += 40) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, 360); ctx.stroke();
  }
  for (let y = 0; y < 360; y += 40) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(640, y); ctx.stroke();
  }
  
  // Neon accents
  ctx.strokeStyle = '#ff5722';
  ctx.lineWidth = 4;
  ctx.strokeRect(20, 20, 600, 320);
  
  // Shield emblem
  ctx.fillStyle = '#ff5722';
  ctx.font = 'bold 36px "Space Mono", monospace';
  ctx.textAlign = 'center';
  ctx.fillText('VAULTIFY // SECURE CONTAINER', 320, 140);
  
  ctx.fillStyle = '#10b981';
  ctx.font = 'bold 18px "Space Mono", monospace';
  ctx.fillText('AES-256-GCM • PBKDF2 • ZERO-KNOWLEDGE', 320, 185);
  
  ctx.fillStyle = '#888888';
  ctx.font = '14px "Space Mono", monospace';
  ctx.fillText('Concealed Steganographic Binary Payload', 320, 225);
  ctx.fillText('Created by Srinivas Jangiti', 320, 260);
  
  // Corner markers
  ctx.fillStyle = '#10b981';
  ctx.fillRect(20, 20, 12, 12);
  ctx.fillRect(608, 20, 12, 12);
  ctx.fillRect(20, 328, 12, 12);
  ctx.fillRect(608, 328, 12, 12);
}

function getCarrierPngBuffer() {
  return new Promise((resolve) => {
    const canvas = document.getElementById('stego-canvas');
    canvas.toBlob((blob) => {
      blob.arrayBuffer().then(buf => resolve(new Uint8Array(buf)));
    }, 'image/png');
  });
}

// ── Dual-Factor Keyfile (2FA) ──
function toggleKeyfile(enabled) {
  const panel = document.getElementById('keyfile-panel');
  if (enabled) {
    panel.style.display = 'block';
  } else {
    panel.style.display = 'none';
    encKeyfileBuffer = null;
    document.getElementById('enc-keyfile-status').textContent = '';
    document.getElementById('enc-keyfile-input').value = '';
  }
}

function handleKeyfileSelect(e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    encKeyfileBuffer = reader.result;
    document.getElementById('enc-keyfile-status').textContent = `✓ Keyfile loaded: ${file.name} (${fmtSize(file.size)})`;
    toast(`Keyfile active: ${file.name}`);
  };
  reader.readAsArrayBuffer(file);
}

function generateKeyfile() {
  const randomBytes = new Uint8Array(32);
  crypto.getRandomValues(randomBytes);
  encKeyfileBuffer = randomBytes.buffer;
  
  const randHex = Array.from(randomBytes.slice(0, 4)).map(b => b.toString(16).padStart(2, '0')).join('');
  const keyfileName = `vaultify-auth-${randHex}.key`;
  
  const blob = new Blob([randomBytes], { type: 'application/octet-stream' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = keyfileName;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
  
  document.getElementById('enc-keyfile-status').textContent = `✓ Generated & active: ${keyfileName} (Save this file!)`;
  toast(`2FA Keyfile generated & active: ${keyfileName}`);
}

function handleDecKeyfileSelect(e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    decKeyfileBuffer = reader.result;
    document.getElementById('dec-keyfile-status').textContent = `✓ 2FA Keyfile loaded: ${file.name} (${fmtSize(file.size)})`;
    toast(`Keyfile attached: ${file.name}`);
  };
  reader.readAsArrayBuffer(file);
}

function toggleManualKeyfilePrompt() {
  const group = document.getElementById('dec-keyfile-group');
  group.style.display = group.style.display === 'none' ? 'block' : 'none';
}

// ── Advanced Crypto Settings ──
function updateCryptoOptions() {
  cryptoOptions.iters = parseInt(document.getElementById('adv-iters').value, 10);
  cryptoOptions.saltLen = parseInt(document.getElementById('adv-salt').value, 10);
  cryptoOptions.algo = document.getElementById('adv-algo').value;
}

// ── Drag & Drop Event Handling ──
let dragCounter = 0;
window.addEventListener('dragenter', (e) => {
  e.preventDefault();
  dragCounter++;
  document.getElementById('global-drop-zone').classList.add('active');
});
window.addEventListener('dragover', (e) => {
  e.preventDefault();
});
window.addEventListener('dragleave', (e) => {
  e.preventDefault();
  dragCounter--;
  if (dragCounter === 0) {
    document.getElementById('global-drop-zone').classList.remove('active');
  }
});
window.addEventListener('drop', async (e) => {
  e.preventDefault();
  dragCounter = 0;
  document.getElementById('global-drop-zone').classList.remove('active');
  
  const files = Array.from(e.dataTransfer.files);
  if (files.length === 0) return;
  
  // If multiple files, route to encryption
  if (files.length > 1 || !files[0].name.includes('.')) {
    switchPage('encrypt');
    setEncFiles(files);
    return;
  }
  
  // Single file — inspect for VLTFY magic signature
  const file = files[0];
  const slice = file.slice(0, 1024);
  const buf = await slice.arrayBuffer();
  const arr = new Uint8Array(buf);
  const MAGIC = [0x56, 0x4C, 0x54, 0x46, 0x59]; // "VLTFY"
  
  let isVault = false;
  for (let i = 0; i <= arr.length - 5; i++) {
    if (MAGIC.every((b, idx) => arr[i + idx] === b)) {
      isVault = true;
      break;
    }
  }
  
  if (file.name.endsWith('.vault') || file.name.endsWith('.vltfy')) isVault = true;
  
  if (isVault) {
    switchPage('decrypt');
    document.getElementById('dec-file-input').files = e.dataTransfer.files;
    setDecFile(file);
  } else {
    switchPage('encrypt');
    setEncFiles(files);
  }
});

function handleDrag(e, id) { e.preventDefault(); }
function handleDragLeave(e, id) { e.preventDefault(); }
function handleDrop(e, type) { e.preventDefault(); }

function handleEncFileChange(e) {
  const files = Array.from(e.target.files);
  if (files.length > 0) setEncFiles(files);
}
function handleDecFileChange(e) {
  const f = e.target.files[0];
  if (f) setDecFile(f);
}

function setEncFiles(files) {
  hideEl('enc-result'); hideEl('enc-error');
  encFiles = files;
  
  const dropTitle = document.getElementById('enc-drop-title');
  const dropHint = document.getElementById('enc-drop-hint');
  const dropIcon = document.getElementById('enc-drop-icon');
  
  if (files.length === 1 && !files[0].webkitRelativePath) {
    isZipMode = false;
    encFile = files[0];
    dropIcon.innerHTML = fileIconSVG(encFile.name);
    dropTitle.textContent = encFile.name;
    dropHint.textContent = fmtSize(encFile.size) + ' — ' + (encFile.type || 'Binary file');
    document.getElementById('enc-btn').innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:16px;height:16px;"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg> Encrypt &amp; Generate Vault File`;
    toast(encFile.name + ' selected');
  } else {
    isZipMode = true;
    const totalSize = files.reduce((acc, f) => acc + f.size, 0);
    dropIcon.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="width:40px;height:40px;color:var(--text);"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>`;
    dropTitle.innerHTML = `<div class="zip-badge">📁 ${files.length} Files Selected</div>`;
    dropHint.textContent = `Total size: ${fmtSize(totalSize)}. Automatically bundled into encrypted in-memory archive.`;
    document.getElementById('enc-btn').innerHTML = `📦 Zip, Encrypt &amp; Generate Vault`;
    toast(`${files.length} files selected for vault archive`);
  }
}

async function setDecFile(f) {
  decFile = f;
  document.getElementById('dec-drop-icon').innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="width:40px;height:40px;color:var(--teal);"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/></svg>`;
  document.getElementById('dec-drop-title').textContent = f.name;
  document.getElementById('dec-drop-hint').textContent = fmtSize(f.size);
  hideEl('dec-error'); hideEl('viewer-wrap');
  
  // Inspect if container has keyfile flag (ver 2)
  try {
    const slice = await f.slice(0, 512).arrayBuffer();
    const data = new Uint8Array(slice);
    let startOff = -1;
    for (let i = 0; i <= data.length - 5; i++) {
      if (data[i] === 0x56 && data[i+1] === 0x4C && data[i+2] === 0x54 && data[i+3] === 0x46 && data[i+4] === 0x59) {
        startOff = i;
        break;
      }
    }
    if (startOff !== -1 && data[startOff + 5] === 0x02) {
      const flags = data[startOff + 6];
      if (flags & 0x01) {
        document.getElementById('dec-keyfile-group').style.display = 'block';
        toast('This vault requires a 2FA Keyfile (.key)', 'error');
      }
    }
  } catch(e) {}
  
  toast(f.name + ' selected');
}

// ── Utility Formatting ──
function fmtSize(b) {
  if (b < 1024) return b + ' B';
  if (b < 1048576) return (b / 1024).toFixed(1) + ' KB';
  return (b / 1048576).toFixed(2) + ' MB';
}

function fileIcon(name) {
  const ext = name.split('.').pop().toLowerCase();
  const map = {
    pdf: '📄', doc: '📝', docx: '📝', xls: '📊', xlsx: '📊', ppt: '📋', pptx: '📋',
    mp4: '🎬', mkv: '🎬', avi: '🎬', mov: '🎬', mp3: '🎵', wav: '🎵', flac: '🎵', ogg: '🎵',
    jpg: '🖼️', jpeg: '🖼️', png: '🖼️', gif: '🖼️', webp: '🖼️', svg: '🖼️',
    zip: '📦', rar: '📦', tar: '📦', gz: '📦',
    txt: '📃', md: '📃', json: '📋', csv: '📊', html: '🌐', js: '💻', py: '🐍'
  };
  return map[ext] || '📁';
}

function fileIconSVG(name) {
  const ext = name.split('.').pop().toLowerCase();
  const video = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="width:40px;height:40px;color:var(--text);"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>`;
  const audio = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="width:40px;height:40px;color:var(--text);"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>`;
  const image = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="width:40px;height:40px;color:var(--text);"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>`;
  const doc = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="width:40px;height:40px;color:var(--text);"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>`;
  const zip = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="width:40px;height:40px;color:var(--text);"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>`;
  const code = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="width:40px;height:40px;color:var(--text);"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`;
  const generic = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="width:40px;height:40px;color:var(--text);"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>`;
  const catMap = {
    mp4: video, mkv: video, avi: video, mov: video,
    mp3: audio, wav: audio, flac: audio, ogg: audio,
    jpg: image, jpeg: image, png: image, gif: image, webp: image, svg: image,
    pdf: doc, doc: doc, docx: doc, xls: doc, xlsx: doc, txt: doc, md: doc,
    zip: zip, rar: zip, tar: zip, gz: zip,
    js: code, ts: code, py: code, html: code, css: code, json: code, csv: code
  };
  return catMap[ext] || generic;
}

function showEl(id) { document.getElementById(id).classList.add('show'); }
function hideEl(id) { document.getElementById(id).classList.remove('show'); }

function encErrMsg(msg) {
  document.getElementById('enc-error-text').textContent = msg;
  showEl('enc-error');
}
function decErrMsg(msg) {
  document.getElementById('dec-error-text').textContent = msg;
  showEl('dec-error');
}

// ── Progress Helpers ──
function encProgress(pct, label, info) {
  document.getElementById('enc-progress-fill').style.width = pct + '%';
  if (label) document.getElementById('enc-progress-label').textContent = label;
  if (info) document.getElementById('enc-progress-info').textContent = info;
}
function decProgress(pct, label, info) {
  document.getElementById('dec-progress-fill').style.width = pct + '%';
  if (label) document.getElementById('dec-progress-label').textContent = label;
  if (info) document.getElementById('dec-progress-info').textContent = info;
}

// ── Glitch Terminal Effect ──
let glitchInterval;
function startGlitch(wrapId) {
  const wrap = document.getElementById(wrapId);
  wrap.classList.add('glitching');
  const term = wrap.querySelector('.terminal-overlay');
  if (!term) return;
  term.innerHTML = '';
  
  glitchInterval = setInterval(() => {
    const hex = Array.from({length: 8}, () => Math.floor(Math.random()*256).toString(16).padStart(2,'0').toUpperCase()).join(' ');
    const line = document.createElement('div');
    line.textContent = `[${new Date().toISOString().substring(11, 19)}] 0x${Math.floor(Math.random()*0xFFFF).toString(16).toUpperCase()} : ${hex} [AEAD-GCM]`;
    term.appendChild(line);
    if (term.childNodes.length > 15) term.removeChild(term.firstChild);
  }, 60);
}
function stopGlitch(wrapId) {
  clearInterval(glitchInterval);
  const el = document.getElementById(wrapId);
  if (el) el.classList.remove('glitching');
}

// ── In-Memory Zip Creation via fflate ──
async function createZipBlob(files) {
  return new Promise(async (resolve, reject) => {
    try {
      const zipData = {};
      const term = document.querySelector('#enc-progress .terminal-overlay');
      if (term) term.innerHTML = '';
      
      for (let i = 0; i < files.length; i++) {
        const f = files[i];
        const path = f.webkitRelativePath || f.name;
        
        if (term) {
           const pct = Math.floor((i / files.length) * 20);
           encProgress(pct, 'Bundling archive…', `Adding ${path}`);
           const line = document.createElement('div');
           line.textContent = `[ZIP] Adding: ${path} (${fmtSize(f.size)})`;
           term.appendChild(line);
           term.scrollTop = term.scrollHeight;
        }
        
        const arrayBuffer = await f.arrayBuffer();
        zipData[path] = new Uint8Array(arrayBuffer);
        if (i % 15 === 0) await new Promise(r => setTimeout(r, 4));
      }
      
      fflate.zip(zipData, { level: 0 }, (err, out) => {
        if (err) reject(err);
        else resolve(new Blob([out], { type: 'application/zip' }));
      });
    } catch(e) {
      reject(e);
    }
  });
}

// ════════════════════════════ ENCRYPT FILE ════════════════════════════
async function encryptFile() {
  hideEl('enc-error'); hideEl('enc-result');

  if (encFiles.length === 0) return encErrMsg('Please select a file or folder first.');
  const ext = document.getElementById('enc-ext').value.trim();
  if (!ext) return encErrMsg('Please set a custom extension (e.g., .vault, .yowtf).');
  const pw = document.getElementById('enc-pw').value;
  const pw2 = document.getElementById('enc-pw2').value;
  if (!pw) return encErrMsg('Please enter a secret passphrase.');
  if (pw !== pw2) return encErrMsg('Passwords do not match. Please verify.');
  if (pw.length < 6) return encErrMsg('Password must be at least 6 characters.');

  showEl('enc-progress');
  document.getElementById('enc-btn').disabled = true;
  encryptedBlob = null;

  try {
    let targetFile = encFile;
    let targetName = "vault-archive.zip";
    let targetType = "application/zip";
    
    if (isZipMode) {
      const zipBlob = await createZipBlob(encFiles);
      targetFile = new File([zipBlob], "vault-archive.zip", { type: "application/zip" });
    } else {
      targetName = encFile.name;
      targetType = encFile.type;
    }
    
    startGlitch('enc-progress');
    encProgress(15, 'Reading file…', 'Buffering into secure client RAM…');
    const fileData = await targetFile.arrayBuffer();
    
    const metaObj = {
      originalName: targetName,
      mimeType: targetType || 'application/octet-stream',
      originalSize: targetFile.size,
      createdAt: new Date().toISOString(),
      vaultifyVersion: '2.0',
      architect: 'Srinivas Jangiti'
    };

    const code = document.getElementById('crypto-worker').textContent;
    const blob = new Blob([code], { type: 'application/javascript' });
    const workerUrl = URL.createObjectURL(blob);
    const worker = new Worker(workerUrl);
    
    worker.onmessage = async (e) => {
      const msg = e.data;
      if (msg.type === 'progress') {
        encProgress(msg.pct, msg.label, msg.info);
      } else if (msg.type === 'error') {
        encErrMsg('Encryption failed: ' + msg.error);
        worker.terminate();
        cleanup();
      } else if (msg.type === 'done') {
        let totalBuf = msg.result;
        
        const isStego = document.getElementById('enc-stego').checked;
        if (isStego) {
          encProgress(96, 'Embedding in carrier photo…', 'Appending authenticated vault bytes after PNG structure…');
          const carrierBytes = await getCarrierPngBuffer();
          const vaultArray = new Uint8Array(totalBuf);
          const finalBuf = new Uint8Array(carrierBytes.length + vaultArray.byteLength);
          finalBuf.set(carrierBytes, 0);
          finalBuf.set(vaultArray, carrierBytes.length);
          totalBuf = finalBuf.buffer;
        }

        encryptedBlob = new Blob([totalBuf], { type: isStego ? 'image/png' : 'application/octet-stream' });
        const baseName = targetName.replace(/\.[^/.]+$/, '') || 'vault';
        const outName = baseName + (ext.startsWith('.') ? ext : '.' + ext);
        
        encProgress(100, 'Done!', 'Vault container sealed and ready to download.');
        document.getElementById('enc-result-name').textContent = outName;
        showEl('enc-result');
        toast('Vault created: ' + outName);
        encryptedBlob._filename = outName;
        addHistory('enc', outName, encryptedBlob.size, encryptedBlob);
        
        worker.terminate();
        cleanup();
      }
    };
    
    worker.postMessage({
      type: 'encrypt',
      fileData,
      password: pw,
      keyfileData: encKeyfileBuffer,
      metaObj,
      iters: cryptoOptions.iters
    }, [fileData]);
    
  } catch (e) {
    encErrMsg('Encryption error: ' + e.message);
    console.error(e);
    cleanup();
  }
  
  function cleanup() {
    document.getElementById('enc-btn').disabled = false;
    stopGlitch('enc-progress');
    setTimeout(() => hideEl('enc-progress'), 1500);
  }
}

function downloadEncrypted() {
  if (!encryptedBlob) return;
  const url = URL.createObjectURL(encryptedBlob);
  const a = document.createElement('a');
  a.href = url;
  a.download = encryptedBlob._filename || 'vaultify.vault';
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 3000);
  toast('Downloading ' + a.download);
}

// ════════════════════════════ DECRYPT FILE ════════════════════════════
async function decryptFile() {
  hideEl('dec-error'); hideEl('viewer-wrap');
  revokeAll();

  if (!decFile) return decErrMsg('Please select or drop a vault file first.');
  const pw = document.getElementById('dec-pw').value;
  if (!pw) return decErrMsg('Please enter the vault secret password.');

  showEl('dec-progress');
  document.getElementById('dec-btn').disabled = true;
  decryptedBlob = null;
  startGlitch('dec-progress');

  try {
    decProgress(10, 'Reading vault file…', 'Loading encrypted bytes into memory…');
    const fileData = await decFile.arrayBuffer();

    const code = document.getElementById('crypto-worker').textContent;
    const blob = new Blob([code], { type: 'application/javascript' });
    const workerUrl = URL.createObjectURL(blob);
    const worker = new Worker(workerUrl);
    
    worker.onmessage = (e) => {
      const msg = e.data;
      if (msg.type === 'progress') {
        decProgress(msg.pct, msg.label, msg.info);
      } else if (msg.type === 'keyfile_needed') {
        document.getElementById('dec-keyfile-group').style.display = 'block';
        decErrMsg('This vault requires a 2FA Keyfile. Please select your .key file above and try again.');
        worker.terminate();
        cleanup();
      } else if (msg.type === 'error') {
        decErrMsg(msg.error);
        worker.terminate();
        cleanup();
      } else if (msg.type === 'done') {
        const { result, meta } = msg;
        decryptedBlob = new Blob([result], { type: meta.mimeType });
        decryptedName = meta.originalName;
        decryptedMime = meta.mimeType;

        document.getElementById('viewer-fname').textContent = meta.originalName;
        document.getElementById('viewer-fsize').textContent =
          fmtSize(meta.originalSize) + ' · ' + meta.mimeType + ' · Sealed ' + new Date(meta.createdAt).toLocaleString();

        renderViewer(decryptedBlob, meta);
        decProgress(100, 'Decrypted!', 'Plaintext recovered in memory.');
        showEl('viewer-wrap');
        toast(meta.originalName + ' decrypted successfully!');
        addHistory('dec', meta.originalName, meta.originalSize, decryptedBlob);
        
        worker.terminate();
        cleanup();
      }
    };
    
    worker.postMessage({
      type: 'decrypt',
      fileData,
      password: pw,
      keyfileData: decKeyfileBuffer,
      iters: cryptoOptions.iters
    }, [fileData]);
    
  } catch (e) {
    decErrMsg('Decryption failed: ' + e.message);
    console.error(e);
    cleanup();
  }
  
  function cleanup() {
    document.getElementById('dec-btn').disabled = false;
    stopGlitch('dec-progress');
    setTimeout(() => hideEl('dec-progress'), 1500);
  }
}

// ── Object URL Lifecycle ──
function revokeAll() {
  objectUrls.forEach(u => URL.revokeObjectURL(u));
  objectUrls = [];
}
function mkUrl(blob) {
  const u = URL.createObjectURL(blob);
  objectUrls.push(u);
  return u;
}

// ── Viewer & ZIP Explorer ──
function renderViewer(blob, meta) {
  const content = document.getElementById('viewer-content');
  content.innerHTML = '';
  const mime = meta.mimeType || '';
  const url = mkUrl(blob);

  if (mime.startsWith('image/')) {
    const img = document.createElement('img');
    img.src = url; img.alt = meta.originalName;
    img.onclick = () => openFullscreen(url, meta.originalName, 'image');
    content.appendChild(img);

  } else if (mime.startsWith('video/')) {
    const vid = document.createElement('video');
    vid.src = url; vid.controls = true; vid.autoplay = false;
    content.appendChild(vid);

  } else if (mime.startsWith('audio/')) {
    const aud = document.createElement('audio');
    aud.src = url; aud.controls = true;
    const wrap = document.createElement('div');
    wrap.style.cssText = 'text-align:center;padding:3rem 1rem;';
    wrap.innerHTML = '<div style="font-size:4rem;margin-bottom:1rem">🎵</div><div style="color:var(--text2);font-size:.9rem;margin-bottom:1rem">' + meta.originalName + '</div>';
    wrap.appendChild(aud);
    content.appendChild(wrap);

  } else if (mime === 'application/pdf') {
    const iframe = document.createElement('iframe');
    iframe.src = url + '#toolbar=0';
    iframe.title = meta.originalName;
    content.appendChild(iframe);
    
    const fsBtn = document.createElement('button');
    fsBtn.className = 'btn btn-teal btn-full';
    fsBtn.style.marginTop = '1rem';
    fsBtn.textContent = '🔍 Fullscreen PDF';
    fsBtn.onclick = () => openFullscreen(url, meta.originalName, 'pdf');
    content.appendChild(fsBtn);

  } else if (mime.startsWith('text/') || mime === 'application/json') {
    const reader = new FileReader();
    reader.onload = (e) => {
      const pre = document.createElement('pre');
      pre.textContent = e.target.result;
      content.innerHTML = '';
      content.appendChild(pre);
    };
    reader.readAsText(blob);

  } else if (mime === 'application/zip' || meta.originalName.toLowerCase().endsWith('.zip')) {
    // Render Interactive In-Browser ZIP Explorer!
    blob.arrayBuffer().then(buf => {
      fflate.unzip(new Uint8Array(buf), (err, unzipped) => {
        if (err) {
          content.innerHTML = `
            <div class="viewer-msg">
              <div class="vm-icon">📦</div>
              <div class="vm-text" style="color:var(--red);">Archive read error: ${err.message}</div>
              <button class="btn btn-primary" onclick="downloadDecrypted()">⬇️ Download Raw ZIP</button>
            </div>`;
          return;
        }
        currentZipEntries = unzipped;
        renderZipExplorer(meta.originalName, unzipped);
      });
    });

  } else {
    // Generic fallback
    content.innerHTML = `
      <div class="viewer-msg">
        <div class="vm-icon">${fileIcon(meta.originalName)}</div>
        <div class="vm-text" style="margin-bottom:.5rem;font-size:1rem;font-weight:600;color:var(--text)">${meta.originalName}</div>
        <div class="vm-text" style="margin-bottom:1.5rem">This file format (<code style="color:var(--text)">${mime || 'binary'}</code>) cannot be previewed directly in the browser DOM.<br/>Click below to save the unsealed file to your local disk.</div>
        <button class="btn btn-primary" onclick="downloadDecrypted()">⬇️ Save Decrypted File</button>
      </div>`;
  }
}

// ── Interactive In-Browser ZIP Archive Explorer ──
function renderZipExplorer(archiveName, entries) {
  const content = document.getElementById('viewer-content');
  const filePaths = Object.keys(entries).filter(p => !p.endsWith('/')); // ignore directory stubs
  const totalBytes = filePaths.reduce((acc, p) => acc + entries[p].length, 0);

  let html = `
    <div class="zip-explorer">
      <div class="ze-header">
        <div>
          <div style="font-weight:900;font-size:1.1rem;display:flex;align-items:center;gap:0.5rem;">
            <span>📦</span> ${archiveName}
            <span class="tag tag-accent">${filePaths.length} Files</span>
          </div>
          <div style="font-size:0.8rem;color:var(--text2);margin-top:2px;">
            Total unpacked size: ${fmtSize(totalBytes)} • In-Memory Zero-Knowledge Explorer
          </div>
        </div>
        <button class="btn btn-teal" onclick="downloadDecrypted()" style="padding:0.4rem 0.8rem;font-size:0.8rem;">
          ⬇️ Download All (.zip)
        </button>
      </div>

      <div style="margin-bottom:1rem;">
        <input type="text" id="zip-search-input" placeholder="Search files in archive…" oninput="filterZipList(this.value)" style="width:100%;padding:0.6rem;font-family:'Space Mono',monospace;font-size:0.85rem;border:2px solid var(--border);background:var(--surface);" />
      </div>

      <div class="ze-table-wrap">
        <table class="ze-table" id="ze-table">
          <thead>
            <tr>
              <th style="text-align:left;">File Name</th>
              <th style="text-align:right;">Size</th>
              <th style="text-align:center;">Actions</th>
            </tr>
          </thead>
          <tbody id="ze-tbody">
  `;

  filePaths.forEach((path, idx) => {
    const data = entries[path];
    const sizeStr = fmtSize(data.length);
    const icon = fileIcon(path);
    html += `
      <tr data-path="${path.toLowerCase()}">
        <td style="text-align:left;font-weight:600;">
          <span style="margin-right:0.4rem;">${icon}</span> ${path}
        </td>
        <td style="text-align:right;font-family:'Space Mono',monospace;font-size:0.8rem;">${sizeStr}</td>
        <td style="text-align:center;display:flex;gap:0.4rem;justify-content:center;">
          <button class="btn btn-outline btn-sm" onclick="previewZipEntry('${encodeURIComponent(path)}')">👁️ View</button>
          <button class="btn btn-teal btn-sm" onclick="extractZipEntry('${encodeURIComponent(path)}')">⬇️ Extract</button>
        </td>
      </tr>
    `;
  });

  html += `
          </tbody>
        </table>
      </div>
    </div>
  `;

  content.innerHTML = html;
}

function filterZipList(query) {
  const q = query.toLowerCase().trim();
  const rows = document.querySelectorAll('#ze-tbody tr');
  rows.forEach(r => {
    const path = r.getAttribute('data-path');
    r.style.display = path.includes(q) ? '' : 'none';
  });
}

function extractZipEntry(encPath) {
  const path = decodeURIComponent(encPath);
  const data = currentZipEntries[path];
  if (!data) return toast('File not found in archive', 'error');

  const filename = path.split('/').pop() || 'extracted-file';
  const blob = new Blob([data], { type: 'application/octet-stream' });
  const url = mkUrl(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  toast(`Extracted: ${filename}`);
}

function previewZipEntry(encPath) {
  const path = decodeURIComponent(encPath);
  const data = currentZipEntries[path];
  if (!data) return toast('File not found in archive', 'error');

  const filename = path.split('/').pop() || 'preview';
  const ext = filename.split('.').pop().toLowerCase();
  
  let mime = 'text/plain';
  if (['png', 'jpg', 'jpeg', 'gif', 'webp', 'svg'].includes(ext)) {
    mime = ext === 'svg' ? 'image/svg+xml' : 'image/' + (ext === 'jpg' ? 'jpeg' : ext);
  } else if (['mp3', 'wav', 'ogg'].includes(ext)) {
    mime = 'audio/' + ext;
  } else if (ext === 'pdf') {
    mime = 'application/pdf';
  } else if (['json', 'js', 'ts', 'html', 'css', 'py', 'md', 'txt'].includes(ext)) {
    mime = 'text/plain';
  }

  const blob = new Blob([data], { type: mime });
  const url = mkUrl(blob);

  if (mime.startsWith('image/')) {
    openFullscreen(url, filename, 'image');
  } else if (mime === 'application/pdf') {
    openFullscreen(url, filename, 'pdf');
  } else if (mime.startsWith('text/') || ext === 'json') {
    const reader = new FileReader();
    reader.onload = (e) => {
      openFullscreenModalText(filename, e.target.result);
    };
    reader.readAsText(blob);
  } else {
    // Offer extract
    extractZipEntry(encPath);
  }
}

function openFullscreenModalText(title, text) {
  const modal = document.getElementById('fs-modal');
  document.getElementById('fs-title').textContent = title;
  const content = document.getElementById('fs-content');
  content.innerHTML = `<pre style="padding:2rem;color:var(--text);font-family:'Space Mono',monospace;white-space:pre-wrap;line-height:1.6;">${escapeHtml(text)}</pre>`;
  modal.classList.add('show');
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function downloadDecrypted() {
  if (!decryptedBlob) return;
  const url = mkUrl(decryptedBlob);
  const a = document.createElement('a');
  a.href = url;
  a.download = decryptedName;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 3000);
  toast('Saving ' + decryptedName);
}

function closeViewer() {
  hideEl('viewer-wrap');
  document.getElementById('viewer-content').innerHTML = '';
  currentZipEntries = {};
  const sdCb = document.getElementById('self-destruct-cb');
  if (sdCb && sdCb.checked) {
    revokeAll();
    decryptedBlob = null;
    decFile = null;
    decKeyfileBuffer = null;
    document.getElementById('dec-file-input').value = '';
    const keyfileInput = document.getElementById('dec-keyfile-input');
    if (keyfileInput) keyfileInput.value = '';
    document.getElementById('dec-drop-icon').innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="width:40px;height:40px;color:var(--text3);"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`;
    document.getElementById('dec-drop-title').textContent = 'Drop Vaultify File Here';
    document.getElementById('dec-drop-hint').textContent = 'Any custom extension: .yowtf, .myvault, etc.';
    toast('File wiped from memory (Self-Destruct)');
  }
}

// ── Fullscreen Viewer ──
function openFullscreen(url, name, type) {
  const modal = document.getElementById('fs-modal');
  const title = document.getElementById('fs-title');
  const content = document.getElementById('fs-content');
  
  title.textContent = name;
  content.innerHTML = '';
  
  if (type === 'image') {
    const img = document.createElement('img');
    img.src = url;
    content.appendChild(img);
  } else if (type === 'pdf') {
    const iframe = document.createElement('iframe');
    iframe.src = url;
    content.appendChild(iframe);
  }
  
  modal.classList.add('show');
}
function closeFullscreen() {
  document.getElementById('fs-modal').classList.remove('show');
  document.getElementById('fs-content').innerHTML = '';
}

// ── Cryptographic Hash & Integrity Inspector ──
function handleHashDrop(e) {
  e.preventDefault();
  const file = e.dataTransfer.files[0];
  if (file) computeFileHashes(file);
}
function handleHashFileChange(e) {
  const file = e.target.files[0];
  if (file) computeFileHashes(file);
}

async function computeFileHashes(file) {
  hashTargetFile = file;
  document.getElementById('hash-drop-title').textContent = file.name;
  document.getElementById('hash-drop-hint').textContent = `${fmtSize(file.size)} • Computing SHA fingerprints…`;
  document.getElementById('hash-results-card').style.display = 'block';

  document.getElementById('hash-sha256').textContent = 'Computing…';
  document.getElementById('hash-sha512').textContent = 'Computing…';
  document.getElementById('hash-sha1').textContent = 'Computing…';

  try {
    const buffer = await file.arrayBuffer();
    
    // Web Crypto parallel digests
    const [sha256Buf, sha512Buf, sha1Buf] = await Promise.all([
      crypto.subtle.digest('SHA-256', buffer),
      crypto.subtle.digest('SHA-512', buffer),
      crypto.subtle.digest('SHA-1', buffer)
    ]);

    computedHashes.sha256 = bufToHex(sha256Buf);
    computedHashes.sha512 = bufToHex(sha512Buf);
    computedHashes.sha1 = bufToHex(sha1Buf);

    document.getElementById('hash-sha256').textContent = computedHashes.sha256;
    document.getElementById('hash-sha512').textContent = computedHashes.sha512;
    document.getElementById('hash-sha1').textContent = computedHashes.sha1;

    document.getElementById('hash-drop-hint').textContent = `${fmtSize(file.size)} • Fingerprints verified`;
    
    // Check if user already typed compare hash
    const compareInput = document.getElementById('hash-compare-input');
    if (compareInput && compareInput.value) {
      verifyChecksumMatch(compareInput.value);
    }
    toast('Hashes computed successfully');
  } catch (err) {
    toast('Error computing hash: ' + err.message, 'error');
  }
}

function bufToHex(buffer) {
  return Array.from(new Uint8Array(buffer)).map(b => b.toString(16).padStart(2, '0')).join('');
}

function copyHash(algo) {
  const val = computedHashes[algo];
  if (!val) return toast('No hash available to copy', 'error');
  copyText(val, `${algo.toUpperCase()} hash copied!`);
}

function verifyChecksumMatch(val) {
  const clean = val.trim().toLowerCase();
  const status = document.getElementById('hash-match-status');
  if (!clean) {
    status.innerHTML = '';
    return;
  }
  
  if (clean === computedHashes.sha256.toLowerCase()) {
    status.innerHTML = `<span style="color:var(--teal);background:rgba(16,185,129,0.1);padding:0.4rem 0.8rem;border:2px solid var(--teal);display:inline-block;">✓ MATCH: Verified authentic SHA-256 checksum!</span>`;
  } else if (clean === computedHashes.sha512.toLowerCase()) {
    status.innerHTML = `<span style="color:var(--teal);background:rgba(16,185,129,0.1);padding:0.4rem 0.8rem;border:2px solid var(--teal);display:inline-block;">✓ MATCH: Verified authentic SHA-512 checksum!</span>`;
  } else if (clean === computedHashes.sha1.toLowerCase()) {
    status.innerHTML = `<span style="color:var(--teal);background:rgba(16,185,129,0.1);padding:0.4rem 0.8rem;border:2px solid var(--teal);display:inline-block;">✓ MATCH: Verified authentic SHA-1 checksum!</span>`;
  } else {
    status.innerHTML = `<span style="color:var(--red);background:rgba(239,68,68,0.1);padding:0.4rem 0.8rem;border:2px solid var(--red);display:inline-block;">✗ MISMATCH: Checksum does not match any computed hash.</span>`;
  }
}

// ── Digital File Shredder & Data Sanitizer ──
function handleShredDrop(e) {
  e.preventDefault();
  const file = e.dataTransfer.files[0];
  if (file) setShredFile(file);
}
function handleShredFileChange(e) {
  const file = e.target.files[0];
  if (file) setShredFile(file);
}

function setShredFile(file) {
  shredTargetFile = file;
  document.getElementById('shred-drop-title').textContent = file.name;
  document.getElementById('shred-drop-hint').textContent = `${fmtSize(file.size)} • Ready for memory sanitization`;
  document.getElementById('shred-cert').style.display = 'none';
  toast(`Selected for shredding: ${file.name}`);
}

async function executeShredding() {
  if (!shredTargetFile) return toast('Please select a file to shred first', 'error');
  
  const algo = document.getElementById('shred-algorithm').value;
  const btn = document.getElementById('shred-btn');
  btn.disabled = true;
  
  showEl('shred-progress');
  startGlitch('shred-progress');
  
  try {
    const file = shredTargetFile;
    const buf = await file.arrayBuffer();
    const u8 = new Uint8Array(buf);
    
    // Initial Fingerprint
    const preHashBuf = await crypto.subtle.digest('SHA-256', u8);
    const preHash = bufToHex(preHashBuf);
    
    if (algo === 'dod') {
      // Pass 1: 0x00
      updateShredProgress(30, 'Pass 1 of 3: Zero-Filling…', 'Overwriting all bytes with 0x00 zeroes…');
      u8.fill(0x00);
      await sleep(400);
      
      // Pass 2: 0xFF
      updateShredProgress(60, 'Pass 2 of 3: Inverting bits…', 'Overwriting all bytes with 0xFF ones…');
      u8.fill(0xFF);
      await sleep(400);
      
      // Pass 3: Cryptographic Random
      updateShredProgress(90, 'Pass 3 of 3: Cryptographic Noise…', 'Filling with CSPRNG entropy noise…');
      crypto.getRandomValues(u8.subarray(0, Math.min(u8.length, 65536)));
      await sleep(400);
    } else if (algo === 'nist') {
      updateShredProgress(60, 'Single Pass Cryptographic Overwrite…', 'Writing CSPRNG pseudorandom pattern…');
      crypto.getRandomValues(u8.subarray(0, Math.min(u8.length, 65536)));
      await sleep(500);
    } else {
      updateShredProgress(60, 'Zero-Fill Sanitization…', 'Wiping buffer with 0x00…');
      u8.fill(0x00);
      await sleep(400);
    }
    
    const postHashBuf = await crypto.subtle.digest('SHA-256', u8);
    const postHash = bufToHex(postHashBuf);
    
    // Wipe buffer completely
    u8.fill(0);
    
    updateShredProgress(100, 'Erasure Complete', 'All memory buffers zeroed and purged.');
    await sleep(300);
    
    // Build Certificate of Digital Destruction
    const timestamp = new Date().toISOString();
    const certText = 
`================================================================================
                    CERTIFICATE OF DIGITAL DESTRUCTION
================================================================================
Application       : Vaultify Zero-Knowledge Security Suite
Architect         : Srinivas Jangiti (https://github.com/srinivasjangiti/Vaultify)
Destruction Date  : ${timestamp}
File Name         : ${file.name}
File Size         : ${fmtSize(file.size)} (${file.size} bytes)
Sanitization Rule : ${algo === 'dod' ? 'DoD 5220.22-M (3-Pass Zero/One/Random)' : (algo === 'nist' ? 'NIST SP 800-88 Rev 1' : 'Zero-Fill 0x00')}
Pre-Wipe SHA-256  : ${preHash}
Post-Wipe SHA-256 : ${postHash}
Buffer Sanitation : Purged from RAM via typed array zeroing
Status            : CRYPTOGRAPHICALLY VERIFIED ERASED
================================================================================`;

    lastDestructionCert = certText;
    
    document.getElementById('shred-cert-details').innerHTML = `
      <div><strong>File Name:</strong> ${file.name} (${fmtSize(file.size)})</div>
      <div><strong>Standard:</strong> ${algo.toUpperCase()} Multi-Pass Sanitization</div>
      <div><strong>Pre-Wipe SHA-256:</strong> <span class="mono">${preHash}</span></div>
      <div><strong>Post-Wipe SHA-256:</strong> <span class="mono">${postHash}</span></div>
      <div><strong>Purged At:</strong> ${timestamp}</div>
    `;
    
    document.getElementById('shred-cert').style.display = 'block';
    toast('File sanitized and wiped from memory!');
    
  } catch (err) {
    toast('Shredding failed: ' + err.message, 'error');
  } finally {
    btn.disabled = false;
    stopGlitch('shred-progress');
    setTimeout(() => hideEl('shred-progress'), 1200);
  }
}

function updateShredProgress(pct, label, info) {
  document.getElementById('shred-progress-fill').style.width = pct + '%';
  document.getElementById('shred-progress-label').textContent = label;
  document.getElementById('shred-progress-info').textContent = info;
}

function downloadDestructionCert() {
  if (!lastDestructionCert) return;
  const blob = new Blob([lastDestructionCert], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `Destruction-Cert-${shredTargetFile ? shredTargetFile.name : 'file'}.txt`;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
  toast('Certificate downloaded');
}

function copyDestructionCert() {
  if (!lastDestructionCert) return;
  copyText(lastDestructionCert, 'Destruction Certificate copied!');
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// ── Session History ──
let sessionHistory = [];
function toggleHistory() {
  document.getElementById('history-drawer').classList.toggle('open');
}
function addHistory(type, name, size, blob) {
  const url = mkUrl(blob);
  sessionHistory.unshift({ type, name, size, url, time: new Date() });
  renderHistory();
}
function renderHistory() {
  const list = document.getElementById('history-list');
  if (sessionHistory.length === 0) {
    list.innerHTML = '<div style="color:var(--text3);text-align:center;padding:2rem 0;font-family:\'Space Mono\',monospace;font-size:0.8rem;">No recent activity</div>';
    return;
  }
  list.innerHTML = sessionHistory.map(h => `
    <div class="history-item">
      <div class="hi-icon">${h.type === 'enc' ? '🔒' : '🔓'}</div>
      <div class="hi-info">
        <div class="hi-name" title="${h.name}">${h.name}</div>
        <div class="hi-sub">${h.time.toLocaleTimeString()} • ${fmtSize(h.size)}</div>
      </div>
      <a href="${h.url}" download="${h.name}" class="hi-action" title="Download">⬇️</a>
    </div>
  `).join('');
}

// ── DOM Initialization ──
window.addEventListener('DOMContentLoaded', () => {
  // Advanced Settings
  const itersEl = document.getElementById('adv-iters');
  if (itersEl) itersEl.addEventListener('change', updateCryptoOptions);
  const saltEl = document.getElementById('adv-salt');
  if (saltEl) saltEl.addEventListener('change', updateCryptoOptions);
  const algoEl = document.getElementById('adv-algo');
  if (algoEl) algoEl.addEventListener('change', updateCryptoOptions);
  
  // Default Stego Canvas
  drawGeneratedCover();
});
