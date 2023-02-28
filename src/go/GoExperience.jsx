import React, { createContext } from "react";

import { OrbitControls, Html } from '@react-three/drei'
import Lights from './Lights.jsx'
import Arena from './Arena.jsx'
import { Goban } from './Goban.jsx'
import { GoBowl } from './GoBowl.jsx'
import { Spaces } from './Spaces.jsx'
import  Interface  from './interface.jsx'

import { goMachineService } from './goMachine.js'

export const GoContext = createContext(goMachineService)

export function GoExperience()
{

    goMachineService.start()

    // const GoContext = createContext(goMachineService)
    console.log(GoContext)

    return (
        <GoContext.Provider value={{goMachineService}}>
            <OrbitControls makeDefault />
            <Lights />
            <Arena />
            <Goban />
            <GoBowl position={[ 0,0,0.3 ]}/>
            <Spaces />
            <Html>
                <Interface />
            </Html>
        </GoContext.Provider>
    )
}