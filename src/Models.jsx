import Model from './Model'
import modelsData from './data/models.js'

export default function Models()
{
    return <group position-y={ 1.5 }>
        { modelsData.map((_modelData, _index) => (
            <Model key={ _modelData.id } { ..._modelData } position={ [ _index * 10, 0, 0 ] } />
        )) }
    </group>
}
