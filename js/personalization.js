const fallback={color:"#b9a58c",secondary:"#849c91",season:"پاییز",weather:"مه‌آلود",flower:"گل‌های وحشی",animal:"گربه",environment:"باغ آرام",nickname:"دوست من"};
const colorMap={"قرمز":"#b96f69","صورتی":"#d59bab","یاسی":"#aa9bc8","بنفش":"#9582b6","آبی":"#779db9","آبی آسمونی":"#8eb8ca","سبز":"#829b80","سبز زیتونی":"#8b936a","زرد":"#d7bb72","نارنجی":"#c98c62","قهوه‌ای":"#a17b61","مشکی":"#555963","سفید":"#d9d8cf","کرم":"#c9b99e","طلایی":"#c5a36f"};
function pickColor(value,def){if(!value)return def;const found=Object.keys(colorMap).find(k=>value.includes(k));return found?colorMap[found]:def}
const hash=s=>{let h=2166136261;for(let i=0;i<s.length;i++)h=Math.imul(h^s.charCodeAt(i),16777619);return h>>>0};
export function buildWorldConfig(a){
 const main=pickColor(a.color,fallback.color),secondary=pickColor(a.color2,fallback.secondary);
 const season=a.season||fallback.season, weather=a.weather||fallback.weather;
 const place=a.fantasyPlace||a.environment||fallback.environment;
 const visual=a.visualMood||a.aesthetic||"جادویی و رؤیایی";
 const calm=["آروم و کم‌سروصدا","بیشتر درون‌گرا"].includes(a.energy)||a.social==="بیشتر درون‌گرا";
 const detail=a.detailLevel==="پر از جزئیات"?"rich":a.detailLevel==="خلوت و مینیمال"?"minimal":"balanced";
 const seed=hash(JSON.stringify(a));
 const particles=season==="زمستون"?"snow":season==="پاییز"?"leaves":season==="بهار"?"petals":weather==="بارونی و ابری"?"rain":"glow";
 const palette=[main,secondary,season==="زمستون"?"#c5d2d2":season==="تابستون"?"#d8b77e":"#9b8a79"];
 const environment={place,season,weather,particles,lighting:a.timeOfDay||"غروب",mood:visual};
 const companion=a.magicCompanion||a.pet||a.animal||fallback.animal;
 const messageTone=a.messageTone||a.writingStyle||"خودمونی و محاوره‌ای";
 return {seed,theme:visual,palette,environment,decorations:{flower:a.flower||fallback.flower,plant:a.plant||"گیاهان سبز",shapes:a.shapes||["دایره و منحنی"],decor:a.decor||[],texture:a.texture||"چوب طبیعی",density:detail},companion:{name:companion,color:secondary,animal:a.animal||fallback.animal},typography:{language:a.language||"فارسی",style:a.writingStyle||"خودمونی و محاوره‌ای"},animation:{intensity:calm?"low":"medium",particles},audio:{enabled:false,ambience:a.genres?.[0]||"ambient"},storytelling:{tone:messageTone,nickname:a.nickname||fallback.nickname,kindness:a.kindness||[]},interactions:{seed,hiddenCount:3+(seed%4)},emotionalStyle:{listening:a.listening||"اول گوش بده، بعد اگر خواستم راه‌حل",comfort:a.hardDay||a.peacefulPlace||"یک جای دنج و آرام",happy:a.happyThings||a.moodBoost||"جزئیات کوچیک روزمره"}};
}
export function stablePick(list,seed){if(!Array.isArray(list)||!list.length)return "";return list[seed%list.length]}
export {fallback};