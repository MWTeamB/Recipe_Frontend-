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
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>추가할 재료 입력창</h2>
        <input
          type="text"
          placeholder="재료"
          value={ingredientName}
          onChange={handleIngredientNameChange}
        />
        <button onClick={addIngredientToRecipe}>추가</button>
      </div>
    </div>
  );
}

export default AddIngredientModal;
