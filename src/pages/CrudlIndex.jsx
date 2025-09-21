import { useEffect } from "react"
import { Link } from "react-router-dom"
import { crudlAction } from "../store/actions/crudl.actions"
import { useSelector } from "react-redux"
import { CrudlList } from "../cmps/crudl/CrudlList"

export function CrudlIndex(props) {
    const objects = useSelector(storeState => storeState.crudlModule.objects)

    useEffect(() => {
        load()
    }, [])

    async function load() {
        try {
            await crudlAction.load()
        } catch (err) {
            console.log('err:', err)
        }
    }

    async function remove(objectId) {
        try {
            await crudlAction.remove(objectId)
        } catch (err) {
            console.log('err:', err)
        }
    }

    return (
        <section>
            <header className="flex justify-between align-center">
                <h2>List</h2>
                <Link to="/index/edit"><button>add</button></Link>
            </header>

            {objects?.length > 0
                ? <CrudlList objects={objects} remove={remove} />
                : <div>No object found</div>
            }

        </section>
    )

}