import {loadState,saveState,clearState,exportAnswers} from "./storage.js";
import {Questionnaire,questions} from "./questionnaire.js";
import {WorldGenerator} from "./world-generator.js";
import {AmbientAudio} from "./audio.js";
import {showScreen,toast,shareFile} from "./interactions.js";
let state=loadState(),quiz=null,world=null;const audio=new AmbientAudio();
const $=id=>document.getElementById(id);
function persist(answers=state.answers,index=state.index){state={...state,answers,index};saveState(state)}
function startQuiz(){state.complete=false;persist();quiz=new Questionnaire({answers:state.answers,index:state.index,onChange:(a,i)=>persist(a,i??quiz?.index??state.index),onComplete:finishQuiz});showScreen("quiz-screen")}
function finishQuiz(){state.complete=true;persist(state.answers,questions.length-1);$("answered-count").textContent=new Intl.NumberFormat("fa-IR").format(Object.values(state.answers).filter(v=>v&&v!=="__prefer_not__"&&(Array.isArray(v)?v.length:true)).length);showScreen("secret-screen")}
function createWorld(){world=new WorldGenerator(state.answers);showScreen("world-screen");world.mount()}
$("start-button").onclick=startQuiz;$("resume-button").onclick=startQuiz;$("exit-quiz").onclick=()=>{persist();showScreen("welcome-screen")};$("create-world").onclick=createWorld;$("review-answers").onclick=()=>{state.index=0;startQuiz()};
$("sound-toggle").onclick=toggleAudio;$("world-sound").onclick=toggleAudio;
function toggleAudio(){const on=audio.toggle();[$("sound-toggle"),$("world-sound")].forEach(b=>{b.textContent=on?"♫":"♪";b.setAttribute("aria-label",on?"خاموش کردن صدای محیط":"فعال‌سازی صدای محیط")});toast(on?"صدای محیط روشن شد.":"صدای محیط خاموش شد.") }
$("export-button").onclick=()=>{const blob=exportAnswers(state.answers);shareFile(blob,"my-little-world-answers.json");toast("فایل پاسخ‌ها آماده شد؛ فقط در صورت تمایل خودت ارسالش کن.")};
$("reset-button").onclick=()=>{if(confirm("همه‌ی پاسخ‌ها و پیشرفت ذخیره‌شده روی این مرورگر پاک بشن؟")){clearState();state={answers:{},index:0,complete:false};world=null;showScreen("welcome-screen");$("resume-button").classList.add("hidden");toast("پاسخ‌ها از این مرورگر پاک شدند.")}};
$("privacy-info").onclick=()=>$("privacy-dialog").showModal();$("privacy-dialog").querySelectorAll(".dialog-close,.dialog-ok").forEach(b=>b.onclick=()=>$("privacy-dialog").close());
$("world-home").onclick=e=>{e.preventDefault();world?.show("universe");window.scrollTo({top:0,behavior:"smooth"})};
if(Object.keys(state.answers).length){$("resume-button").classList.remove("hidden");$("resume-button").textContent=`ادامه‌ی پرسش‌ها (${new Intl.NumberFormat("fa-IR").format(state.index+1)} از ${new Intl.NumberFormat("fa-IR").format(questions.length)})`}
if(state.complete){$("resume-button").classList.remove("hidden");$("resume-button").textContent="مرور و ویرایش جواب‌ها";$("resume-button").onclick=()=>{state.complete=false;state.index=0;startQuiz()};$("start-button").textContent="شروع دوباره‌ی پرسش‌ها"}
window.addEventListener("beforeunload",()=>persist());