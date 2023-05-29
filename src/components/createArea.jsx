import React, { useState } from "react";

function CreateArea(props) {
  const [note, setNote] = useState({
    content: ""
  });
  const [notesArray, setNotesArray] = useState([]);

  function handleChange(event) {
    const { name, value } = event.target;

    setNote(prevNote => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

  function submitNote(event) {
    props.onAdd(note);
    setNotesArray(prevNotes => [...prevNotes, note.content]);
    setNote({
      content: ""
    });
    event.preventDefault();
    console.log(note);
  }

  function handleAddSearch(noteContent) {
    props.onAddSearch(noteContent);
  }

  return (
    <div>
      <form className="cA">
        <textarea
          name="content"
          onChange={handleChange}
          value={note.content}
          placeholder="Add to Favorites"
          className="tA"
        />
        <button onClick={submitNote} className="addBtn">Add</button>
      </form>
      <div >
        {notesArray.map((noteContent, index) => (
          <div key={index} className="myFave">
            <p className="contentP">{noteContent}</p>
            <button
              className="addSearch"
              onClick={() => handleAddSearch(noteContent)}
            >
              Add To Search
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CreateArea;
