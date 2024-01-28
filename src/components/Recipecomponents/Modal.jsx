function Modal({ isOpen, closeModal }) {
    // 모달이 열려 있을 때만 모달을 렌더링합니다.
    return isOpen ? (
      <div className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center h-screen pt-4 px-4 pb-20 text-center">
          <div className="fixed inset-0 transition-opacity">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>
  
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
  
          <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <h3 className="text-xl leading-6 font-medium text-gray-900">
                Modal Title
              </h3>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  Modal content goes here.
                </p>
              </div>
            </div>
            <div className="bg-white px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="button"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                onClick={closeModal} // 모달 닫기 버튼을 클릭하면 closeModal 함수를 호출하여 모달을 닫습니다.
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    ) : null;
  }
  
  export default Modal;