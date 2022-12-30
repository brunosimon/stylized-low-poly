import { useControls } from 'leva'
import { OrbitControls } from '@react-three/drei'
import Floor from './Floor'
import Models from './Models'
import { useEffect, useRef } from 'react'

export default function Experience()
{
    const options = useControls('general', {
        background: { value: '#171717' }
    })

    return <>
        <color args={ [ options.background ] } attach="background" />

        <OrbitControls makeDefault target={ [ 0, 1.75, 0 ] } />
        <Floor />
        <Models />
    </>
}
