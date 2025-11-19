import { useEffect, useState } from 'react'

const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function StatBar({label, value, color='green'}){
  const colorCls = color==='green'?'bg-green-500':color==='yellow'?'bg-yellow-500':color==='blue'?'bg-blue-500':'bg-slate-400'
  return (
    <div>
      <div className="flex justify-between text-sm text-slate-300 mb-1"><span>{label}</span><span>{value}%</span></div>
      <div className="w-full h-2 bg-white/10 rounded">
        <div className={`h-2 rounded ${colorCls}`} style={{width:`${value}%`}}></div>
      </div>
    </div>
  )
}

function QuickActions({onAction}){
  const actions = [
    {type:'water', label:'Water', emoji:'💧'},
    {type:'fertilize', label:'Fertilize', emoji:'🧪'},
    {type:'sunlight_add', label:'Add Sun', emoji:'☀️'},
    {type:'trim', label:'Trim', emoji:'✂️'},
    {type:'repot', label:'Repot', emoji:'🪴'},
  ]
  return (
    <div className="flex flex-wrap gap-3">
      {actions.map(a=> (
        <button key={a.type} onClick={()=>onAction(a.type)} className="px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm">
          <span className="mr-1">{a.emoji}</span>{a.label}
        </button>
      ))}
    </div>
  )
}

export default function Dashboard(){
  const [user,setUser] = useState(null)
  const [plants,setPlants] = useState([])
  const [loading,setLoading] = useState(true)

  const fetchAll = async()=>{
    const u = await fetch(`${baseUrl}/api/users/demo`).then(r=>r.json())
    setUser(u)
    await fetch(`${baseUrl}/api/growth/run?user_id=${u._id}`,{method:'POST'})
    const ps = await fetch(`${baseUrl}/api/plants?user_id=${u._id}`).then(r=>r.json())
    setPlants(ps)
    setLoading(false)
  }

  useEffect(()=>{ fetchAll() },[])

  const doAction = async (pid, type)=>{
    await fetch(`${baseUrl}/api/plants/${pid}/care`,{method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({type})})
    fetchAll()
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-6 pt-24 pb-10">
        <div className="flex items-end justify-between mb-6">
          <h1 className="text-3xl font-bold">Your Plants</h1>
          <a href="/add" className="px-4 py-2 bg-green-600 hover:bg-green-500 rounded">Add Plant</a>
        </div>

        {loading? <p className="text-slate-300">Loading...</p> : (
          plants.length===0 ? (
            <div className="text-slate-300">No plants yet. <a className="text-green-400" href="/add">Adopt your first plant</a>.</div>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {plants.map(p=> (
                <div key={p._id} className="bg-white/5 border border-white/10 rounded-xl p-5">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-2xl">{p.stage==='seed'?'🌱':p.stage==='sprout'?'🌿':p.stage==='juvenile'?'🌳':'🌴'}</div>
                    <a className="text-sm text-green-400" href={`/plant/${p._id}`}>Open</a>
                  </div>
                  <h3 className="font-semibold">{p.nickname}</h3>
                  <p className="text-slate-400 text-sm mb-3">Health {p.health_score}% • Growth {p.growth_points}</p>
                  <div className="space-y-2 mb-4">
                    <StatBar label="Hydration" value={p.hydration} color='blue'/>
                    <StatBar label="Nutrition" value={p.nutrition} color='yellow'/>
                    <StatBar label="Sunlight" value={p.sunlight} color='green'/>
                  </div>
                  <QuickActions onAction={(t)=>doAction(p._id,t)}/>
                </div>
              ))}
            </div>
          )
        )}
      </div>
    </div>
  )
}
