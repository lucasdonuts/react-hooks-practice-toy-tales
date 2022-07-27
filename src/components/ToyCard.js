import React, { useState, useEffect } from "react";

function ToyCard({ toy, deleteToy, updateToy }) {
  const [toyData, setToyData] = useState(toy);
  const { name, image, likes } = toyData;

  useEffect( () => {
    fetch(`http://localhost:3001/toys/${toy.id}`)
      .then( res => res.json() )
      .then( setToyData )
  }, [ toy ] )

  const handleDonateClick = () => {
    deleteToy(toy.id);
  }

  const handleLikeClick = () => {
    setToyData(() => {
      return {
      ...toyData,
      likes: toyData.likes + 1
      }
    })
    updateToy(toyData)
  }

  return (
    <div className="card">
      <h2>{ name }</h2>
      <img
        src={ image }
        alt={ name }
        className="toy-avatar"
      />
      <p>{ likes } Likes </p>
      <button className="like-btn" onClick={ handleLikeClick } >Like {"<3"}</button>
      <button className="del-btn" onClick={ handleDonateClick } >Donate to GoodWill</button>
    </div>
  );
}

export default ToyCard;
