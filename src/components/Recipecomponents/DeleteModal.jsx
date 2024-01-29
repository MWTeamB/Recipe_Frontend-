// DeleteModal.js

import React from "react";

function DeleteModal({
  showDeleteModal,
  handleConfirmDelete,
  handleCloseModal,
}) {
  return (
    <>
      {showDeleteModal && (
        <div
          className="fixed inset-0 z-10 overflow-y-auto"
          onClick={handleCloseModal}
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
                  onClick={handleCloseModal}
                >
                  취소
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DeleteModal;
