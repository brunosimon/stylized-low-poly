import { useGLTF, Text } from '@react-three/drei'
import { useEffect, useState } from 'react'
import { PlaneGeometry } from 'three'
import { DoubleSide, MeshBasicMaterial } from 'three'
import useStore from './stores/useStore'

const planeGometry = new PlaneGeometry()
const titleMaterial = new MeshBasicMaterial()
const detailsMaterial = new MeshBasicMaterial({ opacity: 0.65, transparent: true })

export default function Model({
    path,
    name,
    details,
    position = [ 0, 0, 0 ],
    textPosition = [ 0, 0, 0 ]
})
{
    const [ material ] = useState(() => new MeshBasicMaterial({ side: DoubleSide }))
    const [ triangles, setTriangles ] = useState(0)
    const model = useGLTF(path)
    const orientation = useStore(state => state.orientation)

    useEffect(() =>
    {
        const mesh = model.scene.children[0]
        material.map = mesh.material.map
        material.transparent = mesh.material.transparent
        material.needsUpdate = true
        mesh.material = material

        setTriangles((mesh.geometry.index ? mesh.geometry.index.count : mesh.geometry.attributes.position.count) / 3)
    }, [ model ])

    const finalTextPosition = [ ...textPosition ]

    if(orientation === 'portrait')
    {
        finalTextPosition[0] = 0
        finalTextPosition[1] = 2.5
    }
    
    return <group position={ position }>

        {/* Model */}
        <primitive
            position-x={ - 1 } 
            scale={ 0.5 }
            object={ model.scene }
        />

        {/* Texture */}
        <mesh
            position-x={ 1.5 }
            scale={ 2 }
            geometry={ planeGometry }
            material={ material }
        />

        <group
            position={ finalTextPosition }
        >
            <Text
                font="./fonts/port-lligat-sans-v18-latin-regular.woff"
                position={ [ 0, 0, 0 ] }
                fontSize={ 0.25 }
                text={ name.toUpperCase() }
                textAlign="right"
                anchorX={ orientation === 'portrait' ? 'center' : 'right' }
                anchorY="bottom"
                material={ titleMaterial }
            />
            
            <Text
                font="./fonts/port-lligat-sans-v18-latin-regular.woff"
                position={ [ 0, orientation === 'portrait' ? - 0.1 : 0, 0 ] }
                fontSize={ 0.15 }
                text={ [...details, `${triangles} triangles`].join('\n') }
                textAlign={ orientation === 'portrait' ? 'left' : 'right' }
                anchorX={ orientation === 'portrait' ? 'center' : 'right' }
                anchorY="top"
                material={ detailsMaterial }
            />
        </group>
        
        {/* Axes helper */}
        {/* <axesHelper /> */}
        
    </group>
}
