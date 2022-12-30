import { Canvas } from '@react-three/fiber'
import Experience from './Experience'

export default function Application()
{
    return <Canvas
        camera={ {
            fov: 35,
            position: [ - 6, 4, 2 ]
        } }
    >
        <Experience />
    </Canvas>
}
