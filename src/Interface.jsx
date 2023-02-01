import useStore from './stores/useStore'

export default function Interface()
{
    const mode = useStore(state => state.mode)
    const setMode = useStore(state => state.setMode)
    const floor = useStore(state => state.floor)
    const setFloor = useStore(state => state.setFloor)
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
                <div className="label">floor</div>
                <button
                    className={ `choice is-floor-texture ${floor === 'texture' ? 'is-active' : ''}` }
                    onClick={ () => setFloor('texture') }
                ><span className="icon" /></button>
                <button
                    className={ `choice is-floor-grid ${floor === 'grid' ? 'is-active' : ''}` }
                    onClick={ () => setFloor('grid') }
                ><span className="icon" /></button>
                <button
                    className={ `choice is-floor-none ${floor === 'none' ? 'is-active' : ''}` }
                    onClick={ () => setFloor('none') }
                ><span className="icon" /></button>
            </div>
            <div className="group">
                <div className="label">mode</div>
                <button
                    className={ `choice is-mode-plain ${mode === 'plain' ? 'is-active' : ''}` }
                    onClick={ () => setMode('plain') }
                ><span className="icon" /></button>
                <button
                    className={ `choice is-mode-wireframe ${mode === 'wireframe' ? 'is-active' : ''}`}
                    onClick={ () => setMode('wireframe') }
                ><span className="icon" /></button>
            </div>
        </footer>
    </>
}