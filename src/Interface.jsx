import useStore from './stores/useStore'

export default function Interface()
{
    const index = useStore(state => state.index)
    const models = useStore(state => state.models)
    const previous = useStore(state => state.previous)
    const next = useStore(state => state.next)

    return <>
        <button className={ `button is-previous ${ index > 0 ? 'is-active' : '' }` } onClick={ previous }>
            <div className="icon">
                <div className="arrow"></div>
            </div>
        </button>
        <button className={ `button is-next ${ index < models.length - 1 ? 'is-active' : '' }` } onClick={ next }>
            <div className="icon">
                <div className="arrow"></div>
            </div>
        </button>
    </>
}