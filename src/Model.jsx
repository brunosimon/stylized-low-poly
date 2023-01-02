import { useGLTF, Text } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useEffect, useState } from 'react'
import { PlaneGeometry } from 'three'
import { DoubleSide, MeshBasicMaterial } from 'three'

const planeGometry = new PlaneGeometry()
const titleMaterial = new MeshBasicMaterial()
const detailsMaterial = new MeshBasicMaterial({ opacity: 0.65, transparent: true })
console.log(planeGometry.index.count/3)
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

    useEffect(() =>
    {
        const mesh = model.scene.children[0]
        material.map = mesh.material.map
        material.needsUpdate = true
        mesh.material = material

        setTriangles((mesh.geometry.index ? mesh.geometry.index.count : mesh.geometry.attributes.position.count) / 3)
    }, [ model ])
    
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
            position={ textPosition }
        >
            <Text
                // font="./fonts/aboreto-v2-latin-regular.woff"
                // font="./fonts/darker-grotesque-v7-latin-regular.woff"
                // font="./fonts/gfs-neohellenic-v25-greek-regular.woff"
                font="./fonts/port-lligat-sans-v18-latin-regular.woff"
                position={ [ 0, 0, 0 ] }
                fontSize={ 0.25 }
                text={ name.toUpperCase() }
                textAlign="right"
                anchorX="right"
                anchorY="bottom"
                material={ titleMaterial }
            />
            
            <Text
                // font="./fonts/aboreto-v2-latin-regular.woff"
                // font="./fonts/darker-grotesque-v7-latin-regular.woff"
                // font="./fonts/gfs-neohellenic-v25-greek-regular.woff"
                font="./fonts/port-lligat-sans-v18-latin-regular.woff"
                position={ [ 0, 0, 0 ] }
                fontSize={ 0.15 }
                text={ [...details, `${triangles} triangles`].join('\n') }
                textAlign="right"
                anchorX="right"
                anchorY="top"
                material={ detailsMaterial }
            />
        </group>
        
        {/* Axes helper */}
        {/* <axesHelper /> */}
        
    </group>
}
