import { useGLTF, PivotControls } from '@react-three/drei'
import { Mesh, MeshBasicMaterial } from 'three'

export default function Models()
{
    const model = useGLTF('./models/hammer-2.glb')
    const mesh:any = model.scene.children[0]
    mesh.material = new MeshBasicMaterial({
        map: mesh.material.map
    })
    
    return <>
        <primitive
            scale={ 0.5 }
            rotation-y={ Math.PI * 0.5 }
            position-y={ 2.5 }
            object={ model.scene }
        />
    </>
}
