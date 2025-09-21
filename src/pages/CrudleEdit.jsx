import { useEffect, useRef, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import { crudlService } from "../services/crudl/index.js"
import { crudlAction } from "../store/actions/crudl.actions.js"

export function CrudleEdit(props) {

    const navigate = useNavigate()

    const params = useParams()
    const { objectId } = params

    const [objectToEdit, setObjectToEdit] = useState(crudlService.getEmptyObject())

    const emptyObjectRef = useRef(crudlService.getEmptyObject())

    useEffect(() => {
        if (objectId) {
            get(objectId)
        }
    }, [])

    function handleChange({ target }) {
        const { value, name } = target

        setObjectToEdit(prev => ({ ...prev, [name]: value }))
    }

    async function onSubmit(ev) {
        ev.preventDefault()
        const method = objectToEdit?._id ? 'update' : 'add'
        try {
            const savedObjectId = await crudlAction[method](objectToEdit)
            setObjectToEdit(emptyObjectRef.current)
            navigate(`/index/${savedObjectId}`)
        } catch (err) {
            console.log('err:', err)
        }
    }

    async function get(objectId) {
        try {
            const object = await crudlAction.get(objectId)
            setObjectToEdit(object)
        } catch (err) {
            console.log('err:', err)
        }
    }

    if (objectId && !objectToEdit?._id) return "loading..."

    const { name, description } = objectToEdit

    return (
        <section className="crudl-edit">
            <h2>{objectId ? "Update" : "Add"} object</h2>
            <form onSubmit={onSubmit}>

                <label htmlFor="name">Name</label>
                <input type="text" name="name" id="name" value={name} onChange={handleChange} required />

                <label htmlFor="description">Description</label>
                <textarea type="text" name="description" id="description" value={description} onChange={handleChange} required ></textarea>

                <button>Save</button>
            </form>
        </section>
    )
}