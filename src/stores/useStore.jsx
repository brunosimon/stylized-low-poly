import create from 'zustand'
import uniqid from 'uniqid'

export default create((set) =>
{
    return {
        index: 0,
        models: [
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

        previous: () =>
        {
            set((state) =>
            {
                if(state.index > 0)
                    return { index: state.index - 1 }

                return {}
            })
        },

        next: () =>
        {
            set((state) =>
            {
                if(state.index < state.models.length - 1)
                    return { index: state.index + 1 }

                return {}
            })
        }
    }
})