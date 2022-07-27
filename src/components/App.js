import React, { useState, useEffect } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toys, setToys] = useState([]);

  useEffect( () => {
    fetch('http://localhost:3001/toys')
      .then( res => res.json() )
      .then( setToys )
  }, [])

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  const addNewToy = (toyData) => {
    fetch('http://localhost:3001/toys', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(toyData)
    })
      .then( res => res.json() )
      .then( newToy => setToys([
        newToy,
        ...toys
      ]))
  }

  const deleteToy = (toyToDeleteId) => {
    fetch(`http://localhost:3001/toys/${toyToDeleteId}`, { method: 'DELETE' })
      .then( () => setToys( toys => {
        return toys.filter( toy => toy.id !== toyToDeleteId )
      }))
  }

  const updateToy = (toyToUpdate) => {
    fetch(`http://localhost:3001/toys/${toyToUpdate.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ likes: toyToUpdate.likes + 1})
    })
      .then( res => res.json() )
      .then( updatedToy => setToys(toys => toys.map( toy => {
        if(toy.id === toyToUpdate.id) {
          return {
            ...toy,
            likes: toyToUpdate.likes
          }
        } else {
          return toy;
        }
      })) )
  }

  return (
    <>
      <Header />
      {showForm
        ? <ToyForm
            addNewToy={ addNewToy }
          />
        : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer toys={ toys } deleteToy={ deleteToy } updateToy={ updateToy } />
    </>
  );
}

export default App;
