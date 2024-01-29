import { useEffect, useState } from "react";
import React from "react";
import Headerbar from "../../components/Recipecomponents/Headerbar";
import axios from "axios";
import Card from "../../components/Recipecomponents/Card";

function Myrecipe() {
  const [Rlist, setRlist] = React.useState([]);

  useEffect(() => {
    getList();
  }, []);

  const getList = () => {
    axios
      .get("https://recipe-backend.fly.dev/api/v1/recipes")
      .then((response) => {
        setRlist(response.data.data);
        console.log(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <Headerbar />
      <div className="grid grid-cols-auto-fit gap-2 justify-center">
        {Rlist.map((recipe) => (
          <Card key={recipe.recipe_id} recipe={recipe} getList={getList} />
        ))}
      </div>
    </div>
  );
}

export default Myrecipe;
