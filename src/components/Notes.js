import React, { useState, useContext, useEffect, useRef } from "react";
import noteContext from "../context/notes/NoteContext";
import Noteitem from "./Noteitem";
import AddNote from "./AddNote";
import { useNavigate } from 'react-router-dom';

export const Notes = () => {
  let history = useNavigate();
  const context = useContext(noteContext);
  const { notes, getNotes, editNote } = context;
  
  useEffect(() => {
    if(localStorage.getItem('token')){

      getNotes();
    }
    else{
      history("/login");
    }
  });
  const ref = useRef(null)
  const refClose = useRef(null)
  
  const [note, setNote] = useState({id: "", etitle: "", edescription: "", etag: ""})
  
  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({id : currentNote._id, etitle : currentNote.title, edescription : currentNote.description, etag : currentNote.tag});
  }
  

  const NOTEADD = (e) => {
    console.log("Updating the node",note)
    editNote(note.id, note.etitle, note.edescription, note.etag)
    refClose.current.click();
  }

  const onChange = (e) => {
    setNote({...note, [e.target.name]: e.target.value})
  }
  return (
    <>
      <AddNote />
      {/* editing ke lea hai ye */}
      <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Editing
      </button>


      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label htmlFor="etitle">Title</label>
                  <input type="text" className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp" value={note.etitle} onChange={onChange} placeholder="Title" />
                </div>
                <div className="form-group">
                  <label htmlFor="edescription">Description</label>
                  <input type="text" className="form-control" id="edescription" onChange={onChange} name="edescription" value={note.edescription} placeholder="Description" />
                </div>
                <div className="form-group">
                  <label htmlFor="etag">Tag</label>
                  <input type="text" className="form-control" id="etag" onChange={onChange} name="etag" value={note.etag} placeholder="Tag" />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" onClick={NOTEADD} className="btn btn-primary">Update Note</button>
            </div>
          </div>
        </div>
      </div>
      <div className="container my-3">
        <h2>Your Notes</h2>
        <div className="row my-2">
          <div className="container col-md-6 offset-md-5">
            <b>
              {notes.length === 0 && 'Add a note to display'}
            </b>
          </div>
          {notes.map((note) => {
            return <Noteitem key={note._id} updateNote={updateNote} note={note}/>;
          })}
        </div>
      </div>
    </>
  );
};

export default Notes;
