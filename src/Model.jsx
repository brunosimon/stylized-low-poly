import { useGLTF, Text } from '@react-three/drei'
import { PlaneGeometry } from 'three'
import { DoubleSide, Mesh, MeshBasicMaterial, MeshStandardMaterial, Object3D } from 'three'

const planeGometry = new PlaneGeometry()
const titleMaterial = new MeshBasicMaterial()
const detailsMaterial = new MeshBasicMaterial({ opacity: 0.65, transparent: true })

export default function Model({ path, name, details, position=[ 0, 0, 0 ] })
{
    const model = useGLTF(path)
    const mesh = model.scene.children[0]
    const material = mesh.material
    mesh.material = new MeshBasicMaterial({
        map: material.map
    })
    
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
        >
            <meshBasicMaterial map={ material.map } side={ DoubleSide } />
        </mesh>
        
        {/* Axes helper */}
        {/* <axesHelper /> */}

        <Text
            // font="./fonts/aboreto-v2-latin-regular.woff"
            // font="./fonts/darker-grotesque-v7-latin-regular.woff"
            // font="./fonts/gfs-neohellenic-v25-greek-regular.woff"
            font="./fonts/port-lligat-sans-v18-latin-regular.woff"
            position={ [ - 1.5, -0.5, 0 ] }
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
            position={ [ - 1.5, -0.5, 0 ] }
            fontSize={ 0.15 }
            text={ details.join('\n') }
            textAlign="right"
            anchorX="right"
            anchorY="top"
            material={ detailsMaterial }
        />
    </group>
}
