import React, { useState } from "react";
import axios from "axios";

function AddIngredientModal({ recipeId, onClose, onIngredientAdded }) {
  const [ingredientName, setIngredientName] = useState("");

  const handleIngredientNameChange = (e) => {
    setIngredientName(e.target.value);
  };

  const addIngredientToRecipe = async () => {
    try {
      // 재료 이름으로 재료를 생성하여 재료 ID를 받아옴
      const ingredientResponse = await axios.post(
        "https://recipe-backend.fly.dev/api/v1/ingredients",
        { name: ingredientName }
      );

      const ingredientId = ingredientResponse.data.data.ingredient_id;
      console.log(ingredientResponse.data);

      // 생성된 재료 ID를 사용하여 레시피에 재료를 추가하는 요청을 보냄
      const response = await axios.post(
        `https://recipe-backend.fly.dev/api/v1/recipes/${recipeId}/ingredients`,
        { ingredient_id: ingredientId }
      );

      // 재료가 성공적으로 추가되었음을 알림
      console.log("Ingredient added to recipe:", response.data);

      // 재료 추가가 성공하면 추가된 재료 정보를 상위 컴포넌트로 전달
      onIngredientAdded(response.data.data);

      // 모달 닫기
      onClose();
    } catch (error) {
      console.error("Error adding ingredient to recipe:", error);
    }
  };

  return (
    <div className="modal p-6 rounded-lg shadow bg-gray-400 ">
      <div className="modal-content">
      <button type="button" class="bg-white rounded-md inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500" onClick={onClose}>
              <span class="sr-only">Close menu</span>
              <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
        <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">추가할 재료를 입력하세요</h2>
        <input
          type="text"
          placeholder="재료"
          value={ingredientName}
          onChange={handleIngredientNameChange}
          className="mb-2 px-3 py-2 rounded-lg border border-gray-300"
        />
        <button onClick={addIngredientToRecipe} className="bg-gray-400 inline-block px-7 py-2 rounded-3xl drop-shadow-3xl font-bold hover:text-white active:drop-shadow-4xl">추가</button>
      </div>
    </div>
  );
}

export default AddIngredientModal;
