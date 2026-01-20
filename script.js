const base={
flagship:{general:180,red_dot:170,scope_2x:160,scope_4x:140,sniper:120,free_look:160},
'high-end':{general:170,red_dot:160,scope_2x:150,scope_4x:130,sniper:110,free_look:150},
'mid-range':{general:160,red_dot:150,scope_2x:140,scope_4x:120,sniper:100,free_look:140},
budget:{general:150,red_dot:140,scope_2x:130,scope_4x:110,sniper:90,free_look:130}
}

const styleAdj={aggressive:10,balanced:0,sniper:-10,beginner:-20}

async function generate(){
const key=document.getElementById('apiKey').value.trim()
if(!key){alert('Insert Gemini API key');return}

loading.style.display='block'
results.style.display='none'

const preset=devicePreset.value==='auto'?'mid-range':devicePreset.value
const style=playStyle.value

let out={}
for(let k in base[preset]){
out[k]=base[preset][k]+styleAdj[style]
}

await fakeGeminiLearning(key,out)

render(out)
loading.style.display='none'
results.style.display='block'
}

async function fakeGeminiLearning(key,data){
// Placeholder: Gemini API should be called from backend for security
await new Promise(r=>setTimeout(r,1200))
localStorage.setItem('lastSettings',JSON.stringify(data))
}

function render(data){
grid.innerHTML=''
for(let k in data){
grid.innerHTML+=`<div class="item"><b>${k}</b><br>${data[k]}</div>`
}
}

function rate(good){
let h=JSON.parse(localStorage.getItem('aiHistory')||'[]')
h.push({good})
localStorage.setItem('aiHistory',JSON.stringify(h))
alert('Feedback saved')
}
