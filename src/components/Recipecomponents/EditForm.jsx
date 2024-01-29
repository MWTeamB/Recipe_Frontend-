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
  return (
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
      <button
        className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        onClick={handleSaveEdit}
      >
        저장
      </button>
      <button
        className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700 ms-3"
        onClick={handleCancelEdit}
      >
        취소
      </button>
    </>
  );
}

export default EditForm;
