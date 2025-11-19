import { useEffect, useState } from 'react'

const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function AddPlant(){
  const [user,setUser] = useState(null)
  const [templates,setTemplates] = useState([])
  const [selected,setSelected] = useState(null)
  const [nickname,setNickname] = useState('My Plant')
  const [imageUrl,setImageUrl] = useState('')
  const [identify,setIdentify] = useState(null)

  const load = async()=>{
    const u = await fetch(`${baseUrl}/api/users/demo`).then(r=>r.json())
    setUser(u)
    await fetch(`${baseUrl}/api/templates/seed`,{method:'POST'})
    const ts = await fetch(`${baseUrl}/api/templates`).then(r=>r.json())
    setTemplates(ts)
  }
  useEffect(()=>{ load() },[])

  const adopt = async()=>{
    if(!selected || !user) return
    const res = await fetch(`${baseUrl}/api/plants`,{method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({user_id:user._id, template_id:selected, nickname})}).then(r=>r.json())
    window.location.href = `/plant/${res._id}`
  }

  const runIdentify = async()=>{
    const res = await fetch(`${baseUrl}/api/ai/identify`,{method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({image_url:imageUrl})}).then(r=>r.json())
    setIdentify(res)
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="max-w-6xl mx-auto px-6 pt-24 pb-10">
        <h1 className="text-3xl font-bold mb-6">Adopt a Plant</h1>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="font-semibold">Choose a template</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {templates.map(t=> (
                <button key={t._id} onClick={()=>setSelected(t._id)} className={`p-4 rounded-xl border ${selected===t._id?'border-green-500 bg-green-500/10':'border-white/10 bg-white/5'} text-left`}>
                  <div className="text-2xl mb-2">🌿</div>
                  <div className="font-semibold">{t.template_name}</div>
                  <div className="text-slate-400 text-sm">Ideal moisture {t.ideal_moisture}% • Light {t.ideal_light}%</div>
                </button>
              ))}
            </div>

            <div>
              <label className="block text-sm text-slate-300 mb-1">Nickname</label>
              <input value={nickname} onChange={e=>setNickname(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded px-3 py-2"/>
            </div>

            <button onClick={adopt} className="px-4 py-2 bg-green-600 hover:bg-green-500 rounded">Create Plant</button>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Or upload/link an image for AI identification</h3>
            <input placeholder="Paste image URL (e.g. https://example.com/rose.jpg)" value={imageUrl} onChange={e=>setImageUrl(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded px-3 py-2"/>
            <button onClick={runIdentify} className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded">Identify</button>
            {identify && (
              <div className="bg-white/5 border border-white/10 rounded p-4 text-sm">
                <div className="font-semibold mb-1">Result</div>
                <div>Species: {identify.species}</div>
                <div>Confidence: {(identify.confidence*100).toFixed(0)}%</div>
                <div className="text-slate-300 mt-2">{identify.care_guide}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
