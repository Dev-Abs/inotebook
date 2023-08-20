import React, { useContext, useState } from "react";
import contextValue from "../context/notes/noteContext";

const AddNote = (props) => {
  const context = useContext(contextValue);
  const { addNote } = context;
  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "",
  });
  const handleAdd = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({ title: "", description: "", tag: "" });
    props.showAlert("Note Added Successfully", "success");
  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <div className="container my-3">
      <h2>Add a Note</h2>
      <div className="container my-3">
        <form className="row g-3">
          <div className="col-12">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              name="title"
              id="title"
              onChange={onChange}
              value={note.title}
              minLength={5}
              required
            />
          </div>
          <div className="col-12">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input
              type="text"
              name="description"
              className="form-control"
              id="description"
              onChange={onChange}
              value={note.description}
              minLength={5}
              required
            />
          </div>
          <div className="col-12">
            <label htmlFor="tag" className="form-label">
              Tag
            </label>
            <input
              type="text"
              name="tag"
              className="form-control"
              id="tag"
              onChange={onChange}
              value={note.tag}
              minLength={5}
              required
            />
          </div>
          <div className="col-12">
            <button
              disabled={note.title.length < 3 || note.description.length < 5}
              type="submit"
              className="btn btn-primary"
              onClick={handleAdd}
            >
              Add Note
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNote;
