import React, {useEffect, useState} from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  const plantAPI = "http://localhost:6001/plants"
  const [plants, setPlants] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch(plantAPI)
      .then(resp => resp.json())
      .then(plantsList => {
        setPlants(() => plantsList);
      })
  }, [])

  function handleChange(event){
    setSearch(() => event.target.value)
  }

  function handleSubmitForm(event){
    event.preventDefault();
    const newPlant = {
      name: event.target.name.value,
      image: event.target.image.value,
      price: parseFloat(event.target.price.value)
    }

    const postObj = {
      method: 'POST',
      headers: {"Content-type": "application/json"},
      body: JSON.stringify(newPlant)
    }

    fetch(plantAPI, postObj);
    event.target.name.value = "";
    event.target.image.value = "";
    event.target.price.value = "";
    setPlants(() => [...plants, newPlant]);
  }

  const plantsToDisplay = plants.filter((plant) => {
    if(search == "" || plant.name.includes(search)){
      return true;
    } else {
      return false;
    }
  })

  return (
    <main>
      <NewPlantForm submitNewPlant={handleSubmitForm}/>
      <Search handleSearchChange={handleChange}/>
      <PlantList plants={plantsToDisplay}/>
    </main>
  );
}

export default PlantPage;
