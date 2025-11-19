import { Link } from 'react-router-dom'

export default function Home(){
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      <section className="max-w-7xl mx-auto px-6 pt-24 pb-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6">Grow your plant digitally</h1>
            <p className="text-slate-300 text-lg mb-8">Adopt, care and nurture virtual plants with realistic growth, AI-assisted identification & diagnosis, and future IoT support.</p>
            <div className="flex gap-4">
              <Link to="/add" className="px-6 py-3 rounded-lg bg-green-600 hover:bg-green-500 transition-colors font-semibold">Adopt a Plant</Link>
              <Link to="/dashboard" className="px-6 py-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">Go to Dashboard</Link>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl bg-gradient-to-tr from-green-500/20 to-emerald-400/10 border border-white/10 p-6">
              <div className="w-full h-full rounded-xl bg-[radial-gradient(circle_at_70%_30%,rgba(16,185,129,0.35),transparent_50%)] flex items-center justify-center text-7xl">🌱</div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-6">
        {[{t:'Realistic Growth',d:'Daily decay and stage progression from seed to mature.'},{t:'Monitoring',d:'Hydration, nutrition, sunlight and health at a glance.'},{t:'Care Actions',d:'Water, fertilize, add sunlight, trim, repot.'},{t:'AI Identify',d:'Upload a photo to identify species and get care.'},{t:'AI Disease',d:'Detect leaf diseases with suggestions.'},{t:'IoT-ready',d:'Sensor endpoint ready for ESP32.'}].map((f,i)=> (
          <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-6">
            <div className="text-3xl mb-3">{['🌿','📊','🪴','🧠','🩺','📡'][i]}</div>
            <h3 className="font-semibold text-lg mb-1">{f.t}</h3>
            <p className="text-slate-300 text-sm">{f.d}</p>
          </div>
        ))}
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-6">How it works</h2>
        <ol className="grid md:grid-cols-4 gap-6">
          {["Choose a plant template","Adopt and name your plant","Care for it with actions","Watch it grow across stages"].map((s,i)=> (
            <li key={i} className="bg-white/5 border border-white/10 rounded-xl p-5">
              <div className="text-2xl mb-2">{i+1}️⃣</div>
              <p className="text-slate-300">{s}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="bg-green-600/10 border border-green-500/20 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold mb-2">Ready to adopt?</h3>
            <p className="text-slate-300">Pick from rose, money plant, ficus, aloe vera and more.</p>
          </div>
          <Link to="/add" className="px-6 py-3 rounded-lg bg-green-600 hover:bg-green-500 transition-colors font-semibold">Adopt a Plant</Link>
        </div>
      </section>

      <footer className="max-w-7xl mx-auto px-6 py-10 text-slate-400">
        © {new Date().getFullYear()} Digital Plant Growth & Care System
      </footer>
    </div>
  )
}
