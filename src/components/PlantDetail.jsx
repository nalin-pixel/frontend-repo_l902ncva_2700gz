import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function Stat({label, value}){
  return (
    <div>
      <div className="text-sm text-slate-300 mb-1">{label}</div>
      <div className="w-full h-2 bg-white/10 rounded"><div className="h-2 bg-green-500 rounded" style={{width:`${value}%`}}></div></div>
    </div>
  )
}

export default function PlantDetail(){
  const { plantId } = useParams()
  const [plant,setPlant] = useState(null)

  const load = async()=>{
    const p = await fetch(`${baseUrl}/api/plants/${plantId}`).then(r=>r.json())
    setPlant(p)
  }
  useEffect(()=>{ load() },[plantId])

  const act = async (type)=>{
    await fetch(`${baseUrl}/api/plants/${plantId}/care`,{method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({type})})
    await load()
  }

  if(!plant) return <div className="min-h-screen bg-slate-900 text-white p-10">Loading...</div>
  const stageEmoji = plant.stage==='seed'?'🌱':plant.stage==='sprout'?'🌿':plant.stage==='juvenile'?'🌳':'🌴'

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="max-w-6xl mx-auto px-6 pt-24 pb-10 grid md:grid-cols-2 gap-10">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center aspect-[4/3]">
          <div className="text-9xl">{stageEmoji}</div>
          <div className="mt-4 text-slate-300">Stage: <span className="font-semibold text-white">{plant.stage}</span></div>
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-2">{plant.nickname}</h1>
          <p className="text-slate-400 mb-4">Health score: <span className="text-white font-semibold">{plant.health_score}%</span></p>
          <div className="space-y-3 mb-6">
            <Stat label="Hydration" value={plant.hydration}/>
            <Stat label="Nutrition" value={plant.nutrition}/>
            <Stat label="Sunlight" value={plant.sunlight}/>
            <Stat label="Growth Progress" value={Math.min(100, Math.round(plant.growth_points/5))}/>
          </div>
          <div className="flex flex-wrap gap-3 mb-6">
            {[{t:'water',l:'Water',e:'💧'},{t:'fertilize',l:'Fertilize',e:'🧪'},{t:'sunlight_add',l:'Add Sun',e:'☀️'},{t:'trim',l:'Trim',e:'✂️'},{t:'repot',l:'Repot',e:'🪴'}].map(a=> (
              <button key={a.t} onClick={()=>act(a.t)} className="px-3 py-2 bg-white/10 hover:bg-white/20 rounded">{a.e} {a.l}</button>
            ))}
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <h3 className="font-semibold mb-2">Timeline</h3>
            <div className="space-y-2 max-h-56 overflow-auto pr-2">
              {plant.action_log && plant.action_log.length>0 ? plant.action_log.map((a,i)=> (
                <div key={i} className="text-sm text-slate-300 flex justify-between">
                  <span className="capitalize">{a.type.replace('_',' ')}</span>
                  <span>{new Date(a.date).toLocaleString()}</span>
                </div>
              )) : <p className="text-slate-400 text-sm">No actions yet.</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
