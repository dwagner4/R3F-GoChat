import React, { useState, useRef, createContext, useContext } from 'react'
import "./App.css"
import { Canvas } from '@react-three/fiber'
import {GoExperience} from './go/GoExperience.jsx'
import { Headsup } from './components/Headsup.jsx'

import {Auth, cookies} from './components/Auth.jsx'
import { Chat } from './components/Chat.jsx'

import { appMachineService } from './appMachine.js'

export const AppContext = createContext(appMachineService)


export function App() {
  // const [ isAuth, setIsAuth ] = useState(cookies.get("auth-token"))
  // const [ room, setRoom ] = useState(null)
  // const roomInputRef = useRef(null)
  

  return (
    <AppContext.Provider value={{appMachineService}}>
      <Canvas
        shadows
        camera={ {
          fov: 45,
          near: 0.1,
          far: 200,
          position: [ 0, 0.5, 1 ]
        } }
      >
        <GoExperience />
      </Canvas>

      <div className="overlay">
        <Headsup />
        <Auth />
      </div>
    </AppContext.Provider>
  )
}
