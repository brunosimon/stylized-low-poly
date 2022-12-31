import { Canvas } from '@react-three/fiber'
import Experience from './Experience'

export default function Application()
{
    return <Canvas
        camera={ {
            fov: 35,
            position: [ 2, 4, 6 ]
        } }
    >
        <Experience />
    </Canvas>
}
