import Navbar from './components/Navbar'
import Home from './components/Home'
import Dashboard from './components/Dashboard'
import PlantDetail from './components/PlantDetail'
import AddPlant from './components/AddPlant'
import AIIdentify from './components/AIIdentify'
import AIDisease from './components/AIDisease'
import Profile from './components/Profile'
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/plant/:plantId" element={<PlantDetail/>} />
        <Route path="/add" element={<AddPlant/>} />
        <Route path="/ai/identify" element={<AIIdentify/>} />
        <Route path="/ai/disease" element={<AIDisease/>} />
        <Route path="/profile" element={<Profile/>} />
      </Routes>
    </div>
  )
}

export default App
