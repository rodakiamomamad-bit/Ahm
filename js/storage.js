const KEY="little-world-madhis-v1";
export function loadState(){try{return JSON.parse(localStorage.getItem(KEY))||{answers:{},index:0,complete:false}}catch{return {answers:{},index:0,complete:false}}}
export function saveState(state){try{localStorage.setItem(KEY,JSON.stringify(state));return true}catch{return false}}
export function clearState(){localStorage.removeItem(KEY)}
export function exportAnswers(answers){const payload={project:"A Little World of You",createdBy:"Mehrzad",exportedAt:new Date().toISOString(),answers};return new Blob([JSON.stringify(payload,null,2)],{type:"application/json"})}