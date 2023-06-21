import React, {useState} from "react";

function PlantCard({plant}) {
  const [inStock, setInStock] = useState("In Stock")

  function handleClick(){
    setInStock(() => "Out of Stock")
  }

  return (
    <li className="card">
      <img src={plant.image} alt={plant.name} />
      <h4>{plant.name}</h4>
      <p>Price: {plant.price}</p>
      {true ? (
        <button className={inStock == "In Stock" ? "primary" : null} onClick={handleClick}>{inStock}</button>
      ) : (
        <button>Out of Stock</button>
      )}
    </li>
  );
}

export default PlantCard;
