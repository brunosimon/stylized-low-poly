import { useGLTF, Text, Line, meshBounds } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { damp } from 'maath/easing'
import { useRef } from 'react'
import { useEffect, useState } from 'react'
import { PlaneGeometry } from 'three'
import { DoubleSide, MeshBasicMaterial } from 'three'
import useStore from './stores/useStore'

const planeGometry = new PlaneGeometry()
const titleMaterial = new MeshBasicMaterial()
const detailsMaterial = new MeshBasicMaterial({ opacity: 0.65, transparent: true })

function Button(props)
{
    const hoverLine = useRef()
    const [ linkHover, setLinkHover ] = useState(false)
    const { link, ...restProps } = props
    const width = 1.53
    const height = 0.35

    const pointerEnter = () =>
    {
        setLinkHover(true)
        document.body.style.cursor = 'pointer'
    }

    const pointerLeave = () =>
    {
        setLinkHover(false)
        document.body.style.cursor = 'auto'
    }

    const click = () =>
    {
        open(link, '_blank')
    }

    useFrame((state, delta) =>
    {
        damp(hoverLine.current.position, 'z', linkHover ? 0.2 : 0, 0.05, delta)
    })

    return <group { ...restProps }>
        <mesh
            position={ [ - width * 0.5, - height * 0.5, 0 ] }
            onPointerEnter={ pointerEnter }
            onPointerLeave={ pointerLeave }
            onClick={ click }
            visible={ false }
        >
            <planeGeometry args={ [ width, height ] } />
            <meshBasicMaterial />
        </mesh>
        <Line
            points={ [
                0, 0, 0,
                0, - height, 0,
                - width, - height, 0,
                - width, 0, 0,
                0, 0, 0,
            ] }
            lineWidth={ 2 }
            color="#ffffff"
        />
        <Line
            ref={ hoverLine }
            position={ [ 0, 0, 0 ] }
            points={ [
                0, 0, 0,
                0, - height, 0,
                - width, - height, 0,
                - width, 0, 0,
                0, 0, 0,
            ] }
            lineWidth={ 2 }
            color="#ffffff"
            opacity={ 0.25 }
            transparent={ true }
        />
        <Text
            font="./fonts/port-lligat-sans-v18-latin-regular.woff"
            position={ [ - width * 0.5, - height * 0.5, 0 ] }
            fontSize={ 0.15 }
            text="ORIGINAL ARTWORK"
            textAlign="right"
            anchorX="center"
            anchorY="middle"
            material={ titleMaterial }
        />
        
    </group>
}

export default function Model({
    path,
    name,
    details,
    position = [ 0, 0, 0 ],
    textPosition = [ 0, 0, 0 ],
    referenceLink
})
{
    const text = useRef()
    const [ detailsHeight, setDetailsHeight ] = useState(0)
    const [ modelMaterial ] = useState(() => new MeshBasicMaterial())
    const [ textureMaterial ] = useState(() => new MeshBasicMaterial({ side: DoubleSide }))
    const [ triangles, setTriangles ] = useState(0)
    const model = useGLTF(path)
    const orientation = useStore(state => state.orientation)
    const mode = useStore(state => state.mode)
    modelMaterial.wireframe = mode === 'wireframe'

    useEffect(() =>
    {
        const mesh = model.scene.children[0]
        mesh.material.map.anisotropy = 16
        modelMaterial.map = mesh.material.map
        modelMaterial.transparent = mesh.material.transparent
        modelMaterial.needsUpdate = true
        modelMaterial.side = DoubleSide
        mesh.material = modelMaterial

        textureMaterial.map = mesh.material.map
        textureMaterial.transparent = mesh.material.transparent
        textureMaterial.needsUpdate = true

        setTriangles((mesh.geometry.index ? mesh.geometry.index.count : mesh.geometry.attributes.position.count) / 3)
    }, [ model ])

    useFrame(() =>
    {
        if(detailsHeight === 0 && text.current.geometry.boundingBox.min.y !== Infinity)
        {
            setDetailsHeight(Math.abs(text.current.geometry.boundingBox.min.y))
        }
    }, [ text ])

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
            material={ textureMaterial }
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
                ref={ text }
                font="./fonts/port-lligat-sans-v18-latin-regular.woff"
                position={ [ 0, orientation === 'portrait' ? - 0.1 : 0, 0 ] }
                fontSize={ 0.15 }
                text={ [...details, `${triangles} triangles`].join('\n') }
                textAlign={ orientation === 'portrait' ? 'left' : 'right' }
                anchorX={ orientation === 'portrait' ? 'center' : 'right' }
                anchorY="top"
                material={ detailsMaterial }
            />

            { referenceLink && <Button link={ referenceLink } position-y={ - detailsHeight - 0.1 } /> }
        </group>
        
        {/* Axes helper */}
        {/* <axesHelper /> */}
        
    </group>
}
