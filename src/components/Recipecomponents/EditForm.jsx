import React from "react";

function EditForm({
  editedField,
  setEditedField,
  editedDescription,
  setEditedDescription,
  editedCookingTime,
  setEditedCookingTime,
  handleCancelEdit,
  handleSaveEdit,
}) {
  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  return (
    <>
      <input
        type="text"
        value={editedField}
        onChange={(e) => setEditedField(e.target.value)}
        className="mb-2 px-3 py-2 rounded-lg border border-gray-300"
        onClick={stopPropagation} // 이벤트 전파 중단
      />
      <textarea
        value={editedDescription}
        onChange={(e) => setEditedDescription(e.target.value)}
        className="mb-2 px-3 py-2 rounded-lg border border-gray-300"
        onClick={stopPropagation} // 이벤트 전파 중단
      ></textarea>
      <input
        type="text"
        value={editedCookingTime}
        onChange={(e) => setEditedCookingTime(e.target.value)}
        className="mb-2 px-3 py-2 rounded-lg border border-gray-300"
        onClick={stopPropagation} // 이벤트 전파 중단
      />
      <button
        className="bg-gray-400 inline-block px-7 py-2 rounded-3xl drop-shadow-3xl font-bold hover:text-white active:drop-shadow-4xl"
        onClick={(e) => {
          stopPropagation(e);
          handleSaveEdit();
        }}
      >
        저장
      </button>
      <button
        className="bg-gray-400 inline-block px-7 py-2 rounded-3xl drop-shadow-3xl font-bold hover:text-white active:drop-shadow-4xl"
        onClick={(e) => {
          stopPropagation(e);
          handleCancelEdit();
        }}
      >
        취소
      </button>
    </>
  );
}

export default EditForm;
