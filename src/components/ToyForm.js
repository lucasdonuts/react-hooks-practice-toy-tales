import React, { useState } from "react";

function ToyForm({ addNewToy }) {
  const [formData, setFormData] = useState({ likes: 0 });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    addNewToy(formData);

    e.target.reset();
  }


  return (
    <div className="container">
      <form className="add-toy-form" onSubmit={ handleSubmit }>
        <h3>Create a toy!</h3>
        <input
          onChange={ handleChange }
          type="text"
          name="name"
          placeholder="Enter a toy's name..."
          className="input-text"
        />
        <br />
        <input
          onChange={ handleChange }
          type="text"
          name="image"
          placeholder="Enter a toy's image URL..."
          className="input-text"
        />
        <br />
        <input
          type="submit"
          name="submit"
          value="Create New Toy"
          className="submit"
        />
      </form>
    </div>
  );
}

export default ToyForm;
