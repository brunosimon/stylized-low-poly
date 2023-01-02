import { Canvas } from '@react-three/fiber'
import Experience from './Experience'
import { Leva } from 'leva'
import Interface from './Interface'
import useStore from './stores/useStore'
import { useEffect } from 'react'

export default function Application()
{
    const orientation = useStore(state => state.orientation)
    const setOrientation = useStore(state => state.setOrientation)

    const resize = () =>
    {
        const orientation = window.innerWidth < window.innerHeight ? 'portrait' : 'landscape'
        setOrientation(orientation)
    }

    useEffect(() =>
    {
        window.addEventListener('resize', resize)

        return () =>
        {
            window.removeEventListener('resize', resize)
        }
    }, [])

    const distanceMultiplier = orientation == 'portrait' ? 2 : 1

    return <>
        <Leva collapsed />
        <Canvas
            flat
            camera={ {
                fov: 35,
                position: [ 2 * distanceMultiplier, 4, 6 * distanceMultiplier ]
            } }
        >
            <Experience />
        </Canvas>
        <Interface />
    </>
}
