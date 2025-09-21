import { Link } from "react-router-dom"
import { CrudlPreview } from "./CrudlPreview"

export function CrudlList({ objects, remove }) {

    return (
        <ul className="crudl-list">
            {objects.map(o => {
                return <li key={o._id} className="object-item">
                    <CrudlPreview object={o} />
                    <div>
                        <Link to={`/index/${o._id}`}> <button>Details</button> </Link>
                        <Link to={`/index/edit/${o._id}`}> <button>Edit</button> </Link>
                        <button onClick={() => remove(o._id)}>Remove</button>
                    </div>
                </li>
            })}
        </ul>)
}
