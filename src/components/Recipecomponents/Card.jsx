import axios from "axios";
import React, { useEffect, useState } from "react";

function Card({ recipe, getList }) {
  const [isEditing, setIsEditing] = useState(false); // 편집 모드 여부를 나타내는 상태
  const [editedField, setEditedField] = useState(recipe.field); // 편집된 필드 값
  const [editedDescription, setEditedDescription] = useState(
    recipe.description
  ); // 편집된 설명 값
  const [editedCookingTime, setEditedCookingTime] = useState(
    recipe.cooking_time
  ); // 편집된 조리 시간 값
  const [showModal, setShowModal] = useState(false); // 모달 창 표시 여부 상태
  const [ingredients, setIngredients] = useState([]);

  // 해당 페이지가 열어지는동시에 재료목록불러옴
  useEffect(() => {
    getIngredients();
  }, []);

  // 재료불러오기
  const getIngredients = () => {
    axios
      .get(
        `https://recipe-backend.fly.dev/api/v1/recipes/${recipe.recipe_id}/ingredients`
      )
      .then((response) => {
        setIngredients(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // 편집 모드로 전환하는 함수
  const handleEditClick = (e) => {
    e.stopPropagation(); // 이벤트 전파 중단
    setIsEditing(true);
  };

  // 편집 취소하는 함수
  const handleCancelEdit = (e) => {
    setIsEditing(false);
    setEditedField(recipe.field);
    setEditedDescription(recipe.description);
    setEditedCookingTime(recipe.cooking_time);
    e.stopPropagation(); // 이벤트 전파 중단
  };

  // 수정된 값을 저장하는 함수
  const handleSaveEdit = (e) => {
    e.stopPropagation(); // 이벤트 전파 중단
    // 수정할 데이터의 ID
    const recipeId = recipe.recipe_id;
    console.log(recipeId);

    // 순환 참조를 방지하기 위해 데이터 객체를 직접 생성
    const requestData = {
      Field: editedField,
      description: editedDescription,
      cooking_time: editedCookingTime,
    };

    console.log(requestData);
    // 여기에 수정된 레시피 상세 정보를 업데이트하는 로직을 구현할 수 있습니다.
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
    // API 호출을 통해 레시피 상세 정보를 업데이트하거나 필요한 다른 작업을 수행할 수 있습니다.
  };

  // 클릭 이벤트 핸들러 함수
  const handleCardClick = () => {
    setShowModal(true); // 모달 창 표시
  };

  // 모달에서 확인 클릭 시 실행되는 함수
  const handleConfirmDelete = () => {
    setShowModal(false); // 모달 창 닫기
    handleDelete(); // 삭제 함수 호출
  };

  // 카드 삭제 함수
  const handleDelete = () => {
    // 삭제할 데이터의 ID
    const recipeId = recipe.recipe_id;

    // 삭제 요청
    axios
      .delete(`https://recipe-backend.fly.dev/api/v1/recipes/${recipeId}`)
      .then((response) => {
        // 삭제 성공 시 필요한 작업 수행
        getList();
        console.log("카드 삭제 성공:", response.data);
      })
      .catch((error) => {
        // 삭제 실패 시 에러 처리
        console.error("카드 삭제 에러:", error);
      });
  };

  return (
    <div className="grid-item">
      <div
        className="block max-w-sm p-6 rounded-lg shadow hover:bg-gray-800 bg-gray-400 dark:border-gray-700 dark:hover:bg-gray-700"
        onClick={handleCardClick}
      >
        {isEditing ? (
          <>
            <input
              type="text"
              value={editedField}
              onChange={(e) => setEditedField(e.target.value)}
              className="mb-2 px-3 py-2 rounded-lg border border-gray-300"
              onClick={(e) => e.stopPropagation()} // 이벤트 전파 중단
            />
            <textarea
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              className="mb-2 px-3 py-2 rounded-lg border border-gray-300"
              onClick={(e) => e.stopPropagation()} // 이벤트 전파 중단
            ></textarea>
            <input
              type="text"
              value={editedCookingTime}
              onChange={(e) => setEditedCookingTime(e.target.value)}
              className="mb-2 px-3 py-2 rounded-lg border border-gray-300"
              onClick={(e) => e.stopPropagation()} // 이벤트 전파 중단
            />
          </>
        ) : (
          <>
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {recipe.field}
            </h5>
            <p className="font-normal text-white dark:text-gray-400">
              {recipe.description}
            </p>
            <p className="font-normal text-white dark:text-gray-400">
              조리시간 : {recipe.cooking_time}
            </p>
            <h6 className="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">
              재료 목록:
            </h6>
            <ul>
              {ingredients.map((ingredient) => (
                <li key={ingredient.ingredient_id}>{ingredient.name}</li>
              ))}
            </ul>
          </>
        )}
        <button
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={isEditing ? handleSaveEdit : handleEditClick}
        >
          {isEditing ? "저장" : "레시피 수정"}
        </button>
        {isEditing && (
          <button
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700 ms-3"
            onClick={handleCancelEdit}
          >
            취소
          </button>
        )}
      </div>
      {/* 모달 */}
      {showModal && (
        <div
          className="fixed inset-0 z-10 overflow-y-auto"
          onClick={() => setShowModal(false)}
        >
          <div className="flex items-center justify-center min-h-screen px-4 text-center">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left">
                    <h3
                      className="text-lg font-medium leading-6 text-gray-900"
                      id="modal-title"
                    >
                      레시피 삭제
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        정말로 삭제하시겠습니까?
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleConfirmDelete}
                >
                  삭제
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setShowModal(false)}
                >
                  취소
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Card;
