import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { crudlAction } from "../store/actions/crudl.actions"

export function CrudleDetails(props) {
    const params = useParams()
    const { objectId } = params

    const [object, setObject] = useState(null)

    useEffect(() => {
        if (objectId) {
            get(objectId)
        }
    }, [])


    async function get(objectId) {
        try {
            const object = await crudlAction.get(objectId)
            setObject(object)
        } catch (err) {
            console.log('err:', err)
        }
    }

    if (!object) return 'loading....'
    const { name, createdAt, description } = object
    return (
        <section className="crudl-details">
            <span><b>Name:</b> {name}</span>
            <span><b>Created At:</b> {new Date(createdAt).toLocaleTimeString("en-US")}</span>
            <span><b>Description:</b> {description}</span>
        </section>
    )
}