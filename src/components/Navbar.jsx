import { Link, NavLink } from 'react-router-dom'

export default function Navbar(){
  const navCls = ({isActive}) => `px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive ? 'bg-green-600 text-white' : 'text-slate-200 hover:text-white hover:bg-green-600/20'}`
  return (
    <header className="sticky top-0 z-30 backdrop-blur bg-slate-900/80 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-white">
          <span className="text-2xl">🌿</span>
          <span className="font-bold">Digital Plant Growth</span>
        </Link>
        <nav className="flex items-center gap-2">
          <NavLink to="/" className={navCls}>Home</NavLink>
          <NavLink to="/dashboard" className={navCls}>Dashboard</NavLink>
          <NavLink to="/add" className={navCls}>Add Plant</NavLink>
          <NavLink to="/ai/identify" className={navCls}>AI Identify</NavLink>
          <NavLink to="/ai/disease" className={navCls}>AI Disease</NavLink>
          <NavLink to="/profile" className={navCls}>Profile</NavLink>
        </nav>
      </div>
    </header>
  )
}
