import React from "react";
import ToyCard from "./ToyCard";

function ToyContainer({ toys, deleteToy, updateToy }) {
  const toyComponents = toys.map( toy => {
    return(
      <ToyCard key={ toy.id } toy={ toy } deleteToy={ deleteToy } updateToy={ updateToy } />
    )
  })

  return (
    <div id="toy-collection">
      { toyComponents }
    </div>
  );
}

export default ToyContainer;
