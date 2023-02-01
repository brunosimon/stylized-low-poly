import { Canvas } from '@react-three/fiber'
import Experience from './Experience'
import { Leva } from 'leva'
import Interface from './Interface'

export default function Application()
{
    return <>
        <Leva collapsed hidden />
        <Canvas
            flat
            camera={ {
                fov: 35,
                position: [ 2, 4, 6 ]
            } }
        >
            <Experience />
        </Canvas>
        <Interface />
    </>
}
