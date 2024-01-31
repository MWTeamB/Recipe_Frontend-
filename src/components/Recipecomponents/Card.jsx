import React, { useState, useEffect } from "react";
import axios from "axios";
import EditForm from "./EditForm";
import DeleteModal from "./DeleteModal";
import AddIngredientModal from "./AddIngredientModal";

function Card({ recipe, getList }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedField, setEditedField] = useState(recipe.field);
  const [editedDescription, setEditedDescription] = useState(recipe.description);
  const [editedCookingTime, setEditedCookingTime] = useState(recipe.cooking_time);
  const [showDeleteModal, setDeleteModal] = useState(false);
  const [showIngredientModal, setIngredientModal] = useState(false);
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    getIngredients();
  }, []);

  const getIngredients = () => {
    axios
      .get(
        `https://recipe-backend.fly.dev/api/v1/recipes/${recipe.recipe_id}/ingredients`
      )
      .then((response) => {
        setIngredients(response.data.data);
        console.log(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedField(recipe.Field);
    setEditedDescription(recipe.description);
    setEditedCookingTime(recipe.cooking_time);
  };

  const handleSaveEdit = () => {
    const recipeId = recipe.recipe_id;
    const requestData = {
      Field: editedField,
      description: editedDescription,
      cooking_time: editedCookingTime,
    };

    axios
      .patch(
        `https://recipe-backend.fly.dev/api/v1/recipes/${recipeId}`,
        requestData
      )
      .then((response) => {
        console.log(response.data.data);
        getList();
      })
      .catch((error) => {
        console.log(error);
      });

    setIsEditing(false);
  };

  const handleDelete = () => {
    const recipeId = recipe.recipe_id;

    axios
      .delete(`https://recipe-backend.fly.dev/api/v1/recipes/${recipeId}`)
      .then((response) => {
        getList();
        console.log("Recipe deleted:", response.data);
      })
      .catch((error) => {
        console.error("Error deleting recipe:", error);
      });
  };

  const handleIngredientAddition = (ingredient) => {
    setIngredients([...ingredients, ingredient]);
  };

  return (
    <div className="max-w-sm mx-auto mb-4">
      <div className="p-6 rounded-lg shadow hover:bg-gray-800 bg-gray-400 dark:border-gray-700 dark:hover:bg-gray-700" onClick={() => setDeleteModal(true)}ㅗ>
        {isEditing ? (
          <EditForm
            editedField={editedField}
            setEditedField={setEditedField}
            editedDescription={editedDescription}
            setEditedDescription={setEditedDescription}
            editedCookingTime={editedCookingTime}
            setEditedCookingTime={setEditedCookingTime}
            handleCancelEdit={handleCancelEdit}
            handleSaveEdit={handleSaveEdit}
          />
        ) : (
          <>
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {recipe.field}
            </h5>
            <p className="font-normal text-gray-900">
              요리 설명 : {recipe.description}
            </p>
            <p className="font-normal text-gray-900">
              요리 시간: {recipe.cooking_time}
            </p>
            <h6 className="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">
              재료목록
            </h6>
            <ul>
              {ingredients.map((ingredient) => (
                <li key={ingredient.ingredient_id}>{ingredient.name}</li>
              ))}
            </ul>
          </>
        )}
        {!isEditing && (
          <>
          <button
            className="inline-block bg-white inline-block px-7 py-2 rounded-3xl drop-shadow-3xl font-bold hover:text-white active:drop-shadow-4xl"
            onClick={(e) => {
            e.stopPropagation();
            handleEditClick();
           
          }}
          >
          레시피 수정
          </button>
        <button
          className="inline-block bg-white inline-block px-7 py-2 rounded-3xl drop-shadow-3xl font-bold hover:text-white active:drop-shadow-4xl"
          onClick={(e) => {
          e.stopPropagation();
          setIngredientModal(true);
          handleCancelEdit();
          
        }}
        >
        재료 추가
        </button>

          </>
        )}
      </div>
      {showDeleteModal && (
        <DeleteModal
          showDeleteModal={showDeleteModal}
          handleConfirmDelete={() => {
            handleDelete();
            setDeleteModal(false);
          }}
          handleCloseModal={() => setDeleteModal(false)}
        />
      )}
      {showIngredientModal && (
        <AddIngredientModal
          recipeId={recipe.recipe_id}
          onClose={() => setIngredientModal(false)}
          onIngredientAdded={handleIngredientAddition}
        />
      )}
    </div>
  );
}

export default Card;
