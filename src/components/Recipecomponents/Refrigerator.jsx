import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

function Refrigerator({ isOpen, closeModal }) {
  const [ingredients, setingredients] = useState([])
  const [ingredfield, setingredfield] = useState("")
  
  useEffect(() => {
    getList();
  }, []);

  const getList = () => {
    axios.get("https://recipe-backend.fly.dev/api/v1/storage")
      .then((response) => {
        setingredients(response.data.data);  
        console.log(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const Saveingredient = () => {
    console.log(ingredfield);
      axios.post("https://recipe-backend.fly.dev/api/v1/storage", { name: ingredfield })
        .then(() => {
         getList()
        })
        .catch((error) => {
          console.log(error);
        });
    };
  

    const Deleteingredient = (ingredient_id) => {
      axios.delete(`https://recipe-backend.fly.dev/api/v1/storage/${ingredient_id}`)
        .then(() => {
          getList();
        })
        .catch((error) => {
          console.log(error);
        });
    };

    // 모달이 열려 있을 때만 모달을 렌더링합니다.
    return isOpen ? (
      <div
          id="authentication-modal"
          tabIndex="-1"
          aria-hidden="true"
          className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-screen bg-black bg-opacity-50"
        >
          <div className="relative p-4 w-full max-w-md">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                 내 재료 창고
                </h3>
                <button
                  onClick={closeModal}
                  type="button"
                  className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-hide="authentication-modal"
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    ></path>
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <div className="p-4 md:p-5">
                <div className="grid gap-4 mb-4 grid-cols-2">
                  <div className="col-span-2">
                  
                  <ul className="space-y-4 mb-4">
                  {ingredients.map((ingredient) => (
                    <li key={ingredient.ingredient_id}>
                        <label for="job-1" className="inline-flex items-center justify-between w-full p-5 text-gray-900 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-500 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-900 hover:bg-gray-100 dark:text-white dark:bg-gray-600 dark:hover:bg-gray-500">                           
                            <div className="block">
                                <div className="w-full text-lg font-semibold">{ingredient.name}</div>
                            </div>
                            <svg class="w-4 h-4 ms-3 rtl:rotate-180 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/></svg>
                        </label>
                        <button onClick={() => Deleteingredient(ingredient.ingredient_id)}>삭제</button>

                    </li>
                     ))}
                    </ul>
                     
                  <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 "type="text"  onChange={(e) => setingredfield(e.target.value)} />
                  <button className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 w-full p-2.5 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={Saveingredient}>
                    추가
                    </button> 
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    ) : null;
  }
  
  export default Refrigerator;