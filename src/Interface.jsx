import useStore from './stores/useStore'

export default function Interface()
{
    const index = useStore(state => state.index)
    // console.log(index)
    return <>
        <button>next</button>
    </>
}