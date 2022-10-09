import React from 'react'
import axios from 'axios'
import { useEffect, useState, useRef } from 'react'

const List = () => {
    const ref = useRef(null)
    const refClose = useRef(null)
    const [list, setList] = useState([])

    const editNote = async (id, name, color) => {
        const res = await axios.put(`http://localhost:8000/api/edit/${id}`, { id, name, color })
        console.log(res.data)
        let newNotes = JSON.parse(JSON.stringify(list))
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].name = name;
                newNotes[index].color = color;
                break;
            }
        }
        setList(newNotes);
    }

    const [note, setNote] = useState({ id: "", eName: "", eColor: "" })

    const updateNote = (id, name, color) => {
        console.log(id, name, color);
        ref.current.click();
        console.log("ref", ref.current)
        setNote({ id, eName: name, eColor: color })
    }

    const handleClick = (e) => {
        editNote(note.id, note.eName, note.eColor)
        refClose.current.click();
    }

    const onChange = (e) => {
        console.log({ ...note, [e.target.name]: e.target.value });
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    const fetchData = async () => {
        try {
            const res = await axios.get('http://localhost:8000/api/getcolor')
            const data = await res.data
            setList(data)
        } catch (error) {
            console.log('error from fetching the data', error)
        }
    }
    useEffect(() => {
        fetchData();
    }, [list])

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:8000/api/delete/${id}`)
        const newNotes = list.filter((i) => { return i._id !== id })
        console.log(newNotes);
        setList(newNotes)
        console.log(id)
    }

    return (
        <>
            <button ref={ref} type="button" hidden className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="my-3">
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="eName" name="eName" aria-describedby="emailHelp" value={note.eName} onChange={onChange} minLength={5} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="eColor" name="eColor" value={note.eColor} onChange={onChange} minLength={5} required />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" onClick={handleClick} className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className='container'>
                <div className="row my-3">
                    <h2>You Notes</h2>
                    <div className='d-flex flex-wrap'>
                        {list.map((item) => {
                            return (
                                <div className="col-md-2 mx-2" key={item._id}>
                                    <div className="card my-2">
                                        <div className="card-body">
                                            <div className="d-flex align-items-center">
                                                <h5 className="card-title">{item.name}</h5>
                                                <i className="far fa-trash-alt mx-2" onClick={() => { handleDelete(item._id) }}></i>
                                                <i className="far fa-edit mx-2" onClick={() => { updateNote(item._id, item.name, item.color) }}></i>
                                            </div>
                                            <p className="card-text">{item.color}</p>
                                        </div >
                                    </div >
                                </div >
                            )
                        })}
                    </div >
                </div>
            </div>
        </>
    )
}

export default List
