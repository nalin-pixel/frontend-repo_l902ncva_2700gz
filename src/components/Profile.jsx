import { useEffect, useState } from 'react'

const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Profile(){
  const [user,setUser] = useState(null)

  useEffect(()=>{
    fetch(`${baseUrl}/api/users/demo`).then(r=>r.json()).then(setUser)
  },[])

  if(!user) return <div className="min-h-screen bg-slate-900 text-white p-10">Loading...</div>

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="max-w-4xl mx-auto px-6 pt-24 pb-10">
        <h1 className="text-3xl font-bold mb-6">Profile</h1>
        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <div className="text-2xl mb-2">👤 {user.name}</div>
          <div className="text-slate-300">Email: {user.email}</div>
          <div className="mt-4 grid sm:grid-cols-4 gap-4">
            <div className="bg-white/5 rounded p-3"><div className="text-sm text-slate-300">XP</div><div className="text-xl font-bold">{user.xp}</div></div>
            <div className="bg-white/5 rounded p-3"><div className="text-sm text-slate-300">Level</div><div className="text-xl font-bold">{user.level}</div></div>
            <div className="bg-white/5 rounded p-3"><div className="text-sm text-slate-300">Streak</div><div className="text-xl font-bold">{user.streak}</div></div>
            <div className="bg-white/5 rounded p-3"><div className="text-sm text-slate-300">Badges</div><div className="text-xl font-bold">{user.badges?.length||0}</div></div>
          </div>
        </div>
      </div>
    </div>
  )
}
