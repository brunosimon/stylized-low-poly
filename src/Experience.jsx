import { useControls } from 'leva'
import { OrbitControls } from '@react-three/drei'
import Floor from './Floor'
import Models from './Models'
import useStore from './stores/useStore'
import { useEffect } from 'react'
import { useThree } from '@react-three/fiber'

export default function Experience()
{
    const options = useControls('general', {
        background: { value: '#171717' }
    })

    const orientation = useStore(state => state.orientation)
    const setOrientation = useStore(state => state.setOrientation)
    const size = useThree((state) => state.size)
    const camera = useThree((state) => state.camera)

    useEffect(() =>
    {
        setOrientation(size.width < size.height ? 'portrait' : 'landscape')
    }, [ size ])

    useEffect(() =>
    {
        camera.position.multiplyScalar(orientation == 'portrait' ? 2 : 1)
    }, [])

    return <>
        <color args={ [ options.background ] } attach="background" />
        <OrbitControls
            makeDefault
            target={ [ 0, 1.6, 0 ] }
            enablePan={ false }
            minDistance={ 3 }
            maxDistance={ 20 }
        />
        <Floor />
        <Models />
    </>
}
