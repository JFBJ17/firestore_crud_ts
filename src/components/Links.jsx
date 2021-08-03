import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import LinkForm from './LinkForm';

import { db } from '../firebase'

const Links = () => {

    const [links, setLinks] = useState([]);
    const [currentId, setCurrentId] = useState('');

    useEffect(() => {
        getLinks();
    }, []);

    const getLinks = () => {
        db.collection('links').onSnapshot(querySnapshot => {
            const docs = [];
            querySnapshot.forEach(doc => {
                docs.push({ ...doc.data(), id: doc.id });
            });
            setLinks(docs);
        });
    }

    const addOrEditLink = async (linkObject) => {
        try {
            if (currentId === '') {
                await db.collection('links').doc().set(linkObject);
                toast.success('New Link Added');
            } else {
                await db.collection('links').doc(currentId).update(linkObject);
                toast.info('Link Updated Successfully');
                setCurrentId('');
            }
        } catch (error) {
            console.error(error)
        }
    }

    const onDeleteLink = async (id) => {
        if (window.confirm('are you sure you want to delete this link?')) {
            await db.collection('links').doc(id).delete();
            toast('Link Deleted', {
                type: 'error',
                autoClose: 2000
            });
        }
    }

    return (
        <>
            <div className="col-md-4 p-2">
                <LinkForm {...{addOrEditLink, currentId, links}} />
            </div>
            <div className="col-md-8 p-2">
                {links.map(link => {
                    return (
                        <div key={link.id} className="card mb-1">
                            <div className="card-header d-flex justify-content-between">
                                <h4>{link.name}</h4>
                                <div className="d-flex justify-content-between" style={{width: '3.8rem'}}>
                                    <i
                                        onClick={()=>setCurrentId(link.id)}
                                        className="material-icons"
                                        style={{ cursor: 'pointer' }}
                                    >
                                        create
                                    </i>
                                    <i
                                        onClick={() => {
                                            onDeleteLink(link.id)
                                        }}
                                        className="material-icons text-danger"
                                        style={{ cursor: 'pointer' }}
                                    >
                                        close
                                    </i>
                                </div>
                            </div>
                            <div className="card-body">
                                <p>{link.description}</p>
                                <a href={link.url} target="_blank" rel="noopener noreferrer">Go to Website</a>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
}

export default Links;