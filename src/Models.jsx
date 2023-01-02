import Model from './Model'
import { useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { damp } from 'maath/easing'
import useStore from './stores/useStore'

export default function Models()
{
    const index = useStore(state => state.index)
    const previous = useStore(state => state.previous)
    const next = useStore(state => state.next)
    const models = useStore(state => state.models)
    const distanceInterModel = 10
    const group = useRef()

    useEffect(() =>
    {
        const down = (_event) =>
        {
            if(_event.code === 'ArrowRight' || _event.code === 'Enter')
                next()
            else if(_event.code === 'ArrowLeft' || _event.code === 'Backspace')
                previous()
        }
        window.addEventListener('keydown', down)

        return () =>
        {
            window.removeEventListener('keydown', down)
        }
    }, [])

    useFrame((state) =>
    {
        const target = - distanceInterModel * index
        const delta = state.clock.getDelta()
        damp(group.current.position, 'x', target, 0.008, delta)
    })
    
    return <group ref={ group } position={ [ 0, 1.5, 0 ] }>
        { models.map((_modelData, _index) => (
            <Model key={ _modelData.id } { ..._modelData } position={ [ _index * distanceInterModel, 0, 0 ] } />
        )) }
    </group>
}
