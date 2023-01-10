import useStore from './stores/useStore'

export default function Interface()
{
    const mode = useStore(state => state.mode)
    const setMode = useStore(state => state.setMode)
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
        <footer className="footer">
            <div className="group">
                <div className="label">mode</div>
                <button
                    className={ `choice is-plain ${mode === 'plain' ? 'is-active' : ''}` }
                    onClick={ () => setMode('plain') }
                ><span className="icon" /></button>
                <button
                    className={ `choice is-wireframe ${mode === 'wireframe' ? 'is-active' : ''}`}
                    onClick={ () => setMode('wireframe') }
                ><span className="icon" /></button>
            </div>
        </footer>
    </>
}