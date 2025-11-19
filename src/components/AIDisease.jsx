import { useState } from 'react'

const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function AIDisease(){
  const [url,setUrl] = useState('')
  const [result,setResult] = useState(null)

  const run = async()=>{
    const r = await fetch(`${baseUrl}/api/ai/disease`,{method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({image_url:url})}).then(r=>r.json())
    setResult(r)
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="max-w-3xl mx-auto px-6 pt-24 pb-10">
        <h1 className="text-3xl font-bold mb-6">AI Disease Diagnosis</h1>
        <div className="flex gap-3 mb-4">
          <input value={url} onChange={e=>setUrl(e.target.value)} placeholder="Leaf Image URL" className="flex-1 bg-white/5 border border-white/10 rounded px-3 py-2"/>
          <button onClick={run} className="px-4 py-2 bg-green-600 hover:bg-green-500 rounded">Run</button>
        </div>
        {result && (
          <div className="bg-white/5 border border-white/10 rounded p-4">
            <div>Disease: {result.disease}</div>
            <div>Severity: {result.severity}</div>
            <div className="text-slate-300 mt-2">Treatment: {result.treatment}</div>
          </div>
        )}
      </div>
    </div>
  )
}
