import axios from "axios";
import React, { useEffect, useState } from "react";
import DeleteModal from "./DeleteModal";
import EditForm from "./EditForm";

function Card({ recipe, getList }) {
  const [isEditing, setIsEditing] = useState(false); // 편집 모드 여부를 나타내는 상태
  const [editedField, setEditedField] = useState(recipe.field); // 편집된 필드 값
  const [editedDescription, setEditedDescription] = useState(
    recipe.description
  ); // 편집된 설명 값
  const [editedCookingTime, setEditedCookingTime] = useState(
    recipe.cooking_time
  ); // 편집된 조리 시간 값
  const [showDeleteModal, setDeleteModal] = useState(false); // 삭제모달 창 표시 여부 상태
  const [showIngredientsModal, setIngredientsModal] = useState(false); // 재료추가 모달 창 표시 여부 상태
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

    // 순환 참조를 방지하기 위해 데이터 객체를 직접 생성
    const requestData = {
      Field: editedField,
      description: editedDescription,
      cooking_time: editedCookingTime,
    };

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
    setDeleteModal(true); // 모달 창 표시
  };

  // 모달에서 확인 클릭 시 실행되는 함수
  const handleConfirmDelete = () => {
    setDeleteModal(false); // 모달 창 닫기
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
    <div className="max-w-sm mx-auto mb-4">
      <div
        className="p-6 rounded-lg shadow hover:bg-gray-800 bg-gray-400 dark:border-gray-700 dark:hover:bg-gray-700"
        onClick={handleCardClick}
      >
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
        {!isEditing && (
          <button
            className="inline-block bg-white inline-block px-7 py-2 rounded-3xl drop-shadow-3xl font-bold hover:text-white active:drop-shadow-4xl"
            onClick={handleEditClick}
          >
            레시피 수정
          </button>
        )}

        {/* 재료 추가  */}
        <button
          className="inline-block bg-white inline-block px-7 py-2 rounded-3xl drop-shadow-3xl font-bold hover:text-white active:drop-shadow-4xl"
          onClick={handleEditClick}
        >
          재료 추가
        </button>
      </div>
      {/* 삭제 모달 */}
      {showDeleteModal && (
        <DeleteModal
          showDeleteModal={showDeleteModal}
          handleConfirmDelete={handleConfirmDelete}
          handleCloseModal={() => setDeleteModal(false)}
        />
      )}
    </div>
  );
}

export default Card;
