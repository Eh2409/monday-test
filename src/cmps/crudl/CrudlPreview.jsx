import { Fragment } from "react";

export function CrudlPreview({ object }) {
    return (
        <Fragment>
            <span><b>Name:</b> {object.name}</span>
            <span><b>Created At:</b> {new Date(object.createdAt).toLocaleTimeString("en-US")}</span>
            <span><b>Description:</b> {object.description}</span>
        </Fragment>
    )
}