import { Grid, ContactShadows, useTexture } from '@react-three/drei'
import { useControls } from 'leva'
import './Materials/FloorMaterial/FloorMaterial.jsx'
import useStore from './stores/useStore.jsx'

export default function Floor()
{
    const floor = useStore(state => state.floor)
    
    const gridOptions = useControls(
        'grid',
        {
            gridSize: [ 10, 10 ],
            cellSize: { value: 1, min: 0, max: 10, step: 0.1 },
            cellThickness: { value: 0.75, min: 0, max: 5, step: 0.1 },
            cellColor: '#343434',
            sectionSize: { value: 5, min: 0, max: 10, step: 0.1 },
            sectionThickness: { value: 1, min: 0, max: 5, step: 0.1 },
            sectionColor: '#383838',
            fadeDistance: { value: 25, min: 0, max: 100, step: 1 },
            fadeStrength: { value: 1, min: 0, max: 1, step: 0.1 },
            followCamera: false,
            infiniteGrid: true
        }
    )

    const contactShadowOptions = useControls('contact shadows', {
        color: '#0f211d',
        scale: { value: 10, min: 0, max: 20 },
        far: { value: 5, min: 0, max: 20 },
        opacity: { value: 0.5, min: 0, max: 1 },
        blur: { value: 1.5, min: 0, max: 10 },
    })

    const floorColorTexture = useTexture('./models/floor-grass-dirt/color.jpg')

    return <>
        {/* Shadow */}
        <ContactShadows
            position={ [ 0, 0, 0 ] }
            resolution={ 512 }
            color={ floor == 'texture' ? '#0f211d' : '#000000' }
            { ...contactShadowOptions }
        />
        
        {/* Grid */}
        { floor == 'grid' && <Grid position={ [ 0, -0.01, 0 ] } args={ gridOptions.gridSize } { ...gridOptions } /> }
        
        {/* Texture */}
        { floor == 'texture' && <mesh position-y={ - 0.05 } rotation={ [ - Math.PI * 0.5, 0, - Math.PI * 0.5 ] } scale={ 10 }>
            <planeGeometry />
            <floorMaterial colorTexture={ floorColorTexture } transparent />
        </mesh> }
    </>
}
