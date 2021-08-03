import React, { useState, useEffect } from 'react';
import { db } from '../firebase';

const LinkForm = (props) => {

    const initialState = {
        url: '',
        name: '',
        description: ''
    }

    const [values, setValues] = useState(initialState);

    useEffect(() => {
        if(props.currentId === "") {
            setValues({...initialState});
        } else {
            getLinkById(props.currentId);
        }
    }, [props.currentId]);

    const getLinkById = async id => {
        const doc = await db.collection('links').doc(id).get();
        setValues(doc.data());
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        props.addOrEditLink(values);
        setValues({...initialState})
    }

    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        });
    }

    return (
        <form className="card card-body" onSubmit={handleSubmit}>
            <div className="input-group mb-3">
                <div className="input-group-text bg-light">
                    <i className="material-icons">insert_link</i>
                </div>
                <input
                    onChange={handleChange}
                    value={values.url}
                    type="url"
                    name="url"
                    placeholder="https://someurl.com"
                    className="form-control"
                />
            </div>
            <div className="input-group mb-3">
                <div className="input-group-text bg-light">
                    <i className="material-icons">create</i>
                </div>
                <input
                    value={values.name}
                    onChange={handleChange}
                    type="text"
                    name="name"
                    placeholder="website name"
                    className="form-control"
                />
            </div>
            <div className="mb-3">
                <textarea
                    value={values.description}
                    onChange={handleChange}
                    name="description"
                    rows="10"
                    placeholder="Write a description"
                    className="form-control"></textarea>
            </div>
            <button className="btn btn-primary btn-block">
                {props.currentId === '' ? 'Save' : 'Update'}
            </button>
        </form>
    );
}

export default LinkForm;