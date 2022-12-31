import { useGLTF, Text } from '@react-three/drei'
import { PlaneGeometry } from 'three'
import { DoubleSide, Mesh, MeshBasicMaterial, MeshStandardMaterial, Object3D } from 'three'

const planeGometry = new PlaneGeometry()
const textMaterial = new MeshBasicMaterial()

export default function Model({ path, name, position=[ 0, 0, 0 ] })
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
            position={ [ - 1.5, -0.5, 0 ] }
            fontSize={ 0.25 }
            text={ name }
            textAlign="right"
            anchorX="right"
            material={ textMaterial }
        />
    </group>
}
