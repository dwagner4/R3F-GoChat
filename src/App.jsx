import React, { useState, useRef, createContext, useContext } from 'react'
import "./style.css"
import { Canvas } from '@react-three/fiber'
import Experience from './fruitexp/Experience.jsx'
import { Headsup } from './components/Headsup.jsx'
import {Auth, cookies, SignOut} from './components/Auth.jsx'
import { Chat } from './components/Chat.jsx'
// import { SignOut } from './components/SignOut.jsx'

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
            far: 200000,
            position: [ 2.5, 4, 6 ]
        } }
      >
        <Experience />
      </Canvas>

      <div className="overlay">
        <Headsup />
        
      </div>
    </AppContext.Provider>
  )
}
