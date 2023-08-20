import { useState } from "react";

import NoteContext from "../context/notes/noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];
  const [notes, setNote] = useState(notesInitial);
  // const update = () => {
  //     setTimeout(() => {
  //         setState({
  //             "name": "farhan",
  //             "class": "12b"
  //         })
  //     }, 2000);
  // }

  //Get All Notes
  const getNotes = async () => {
    let token = localStorage.getItem('token');
    //api call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token
       },
    });
    // const json = response.json();
    const json = await response.json();
    //(localStorage.getItem('token'))
    setNote(() => json);
  };
  const addNote = async (title, description, tag) => {
    //todo: api call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const note = await response.json();
    setNote(notes.concat(note));
  };
  const deleteNote = async (id) => {
    let response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token")
      },
    });
    response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
    });
    const json = await response.json();
    // setNote(json)

    // console.log(json);
    setNote(() => json);
    // const newNotes = notes.filter((note) => {
    //   return note._id !== id;
    // });
    // setNote(newNotes);
  };
  const editNote = async (id, title, description, tag) => {
    //api call
    let response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
      body: JSON.stringify({ title, description, tag }),
    });

    response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
    });
    const json = await response.json();
    //let newNotes =JSON.parse(JSON.stringify(notes))
    setNote(() => json);
    //client side
    // for (let index = 0; index < newNotes.length; index++) {
    //   const element = newNotes[index];
    //   if (element._id === id) {
    //     newNotes.title = title;
    //     newNotes.description = description;
    //     newNotes.tag = tag;
    //     break;
    //   }
    // }
    // setNote(newNotes)
  };
  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
