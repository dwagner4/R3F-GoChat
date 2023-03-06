

import { OrbitControls, Html } from '@react-three/drei'
import Lights from './Lights.jsx'
import Arena from './Arena.jsx'
import { Goban } from './Goban.jsx'
import { GoBowl } from './GoBowl.jsx'
import { Spaces } from './Spaces.jsx'



export function GoExperience()
{
    return (
        <>
            <OrbitControls makeDefault />
            <Lights />
            <Arena />
            <Goban />
            <GoBowl position={[ 0,0,0.3 ]}/>
            <Spaces />
            
        </>
    )
}