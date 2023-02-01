import { shaderMaterial } from '@react-three/drei'
import { extend } from '@react-three/fiber'
import vertexShader from './vertex.glsl'
import fragmentShader from './fragment.glsl'

const FloorMaterial = shaderMaterial(
    {
        colorTexture: null
    },
    vertexShader,
    fragmentShader
)

extend({ FloorMaterial })