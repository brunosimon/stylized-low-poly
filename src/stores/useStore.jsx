import create from 'zustand'
import uniqid from 'uniqid'

export default create((set) =>
{
    return {
        mode: 'plain',
        setMode: (mode) =>
        {
            set(() => {
                return { mode: mode }
            })
        },
        floor: 'texture',
        setFloor: (floor) =>
        {
            set(() => {
                return { floor: floor }
            })
        },
        orientation: window.innerWidth < window.innerHeight ? 'portrait' : 'landscape',
        index: 0,
        models: [
            {
                id: uniqid(),
                path: './models/curvy-sword/model.glb',
                textPosition: [ -1.75, 0.3, 0 ],
                name: 'Curvy Sword',
                details: [
                    '11/02/2023',
                    '7 hours'
                ],
                referenceLink: 'https://www.artstation.com/artwork/NYGLD'
            },
            {
                id: uniqid(),
                path: './models/furnace/model.glb',
                textPosition: [ -2.9, 0.3, 0 ],
                name: 'Furnace',
                details: [
                    '29/01/2023',
                    '18 hours'
                ]
            },
            {
                id: uniqid(),
                path: './models/skull-candle/model.glb',
                textPosition: [ -2, 0, 0 ],
                name: 'Skull Candle',
                details: [
                    '09/01/2023',
                    '5 hours'
                ]
            },
            {
                id: uniqid(),
                path: './models/lantern-pole/model.glb',
                textPosition: [ -1.6, -0.3, 0 ],
                name: 'Lantern Pole',
                details: [
                    '07/01/2023',
                    '5 hours'
                ]
            },
            {
                id: uniqid(),
                path: './models/simple-table/model.glb',
                textPosition: [ -2.6, 0.15, 0 ],
                name: 'Simple Table',
                details: [
                    '03/01/2023',
                    '4 hours'
                ]
            },
            {
                id: uniqid(),
                path: './models/simple-anvil/model.glb',
                textPosition: [ -2.6, -0.3, 0 ],
                name: 'Simple Anvil',
                details: [
                    '01/01/2023',
                    '6 hours'
                ]
            },
            {
                id: uniqid(),
                path: './models/reinforced-hammer/model.glb',
                textPosition: [ - 1.5, -0.3, 0 ],
                name: 'Reinforced Hammer',
                details: [
                    '30/12/2022',
                    '4 hours'
                ]
            },
            {
                id: uniqid(),
                path: './models/simpler-hammer/model.glb',
                textPosition: [ - 1.5, -0.3, 0 ],
                name: 'Simple Hammer',
                details: [
                    '29/12/2022',
                    '2 hours'
                ]
            },
            {
                id: uniqid(),
                path: './models/powered-axe/model.glb',
                textPosition: [ - 1.5, -0.3, 0 ],
                name: 'Powered Axe',
                details: [
                    '28/12/2022',
                    '4 hours'
                ]
            }
        ],

        setOrientation: (orientation) =>
        {
            set(state => {
                return { orientation: orientation }
            })
        },

        previous: () =>
        {
            set(state =>
            {
                if(state.index > 0)
                    return { index: state.index - 1 }

                return {}
            })
        },

        next: () =>
        {
            set(state =>
            {
                if(state.index < state.models.length - 1)
                    return { index: state.index + 1 }

                return {}
            })
        }
    }
})