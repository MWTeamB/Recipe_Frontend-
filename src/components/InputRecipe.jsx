import { useState } from "react";
import Inputbox from "src/components/Recipecomponents/Inputbox.jsx";
import axios from "axios";

function InputRecipe() {
    const [Field, setField] = useState("");
    const [description, setdescription] = useState("");
    const [cooking_time, setcooking_time] = useState("");
    const [Rlist, setRlist] = useState([]);

    const getList = () => {
      axios.get("https://recipe-backend.fly.dev/api/v1/recipes")
        .then((response) => {
          setRlist(response.data.data);
          console.log(response.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  
    const addList = () => {
      axios.post("https://recipe-backend.fly.dev/api/v1/recipes", { Field, description, cooking_time })
        .then(() => {
          getList();
          setField("");
          setdescription("")
          setcooking_time("")
        })
        .catch((error) => {
          console.log(error);
        });
    }

    const onFieldChange = (e) => {
        setField(e.target.value);
      };
    
      const onDescription = (e) => {
        setdescription(e.target.value);
      };
    
      const onCooking_time = (e) => {
        setcooking_time(e.target.value);
      };
    
      const onSubmit = (e) => {
        e.preventDefault();
        addList();
      };

      
    return ( 
        <form onSubmit={onSubmit}>
        <div className="p-9 rounded-lg shadow w-[700px] hover:bg-gray-800 bg-gray-400 dark:border-gray-700 dark:hover:bg-gray-700">
            <Inputbox placeholder="레시피를 이름을 작성하세요." value={Field}  onChange={(e) => setField(e.target.value)}/>
            <Inputbox placeholder="레시피를 설명해보세요." value={description} onChange={(e) => setdescription(e.target.value)}/>
            <Inputbox placeholder="레시피 조리시간을 작성하세요. Ex 10[분], 1[시간] 시간단위 표기를 꼭 함께 작성 해주세요" value={cooking_time} onChange={(e) => setcooking_time(e.target.value)}/>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            저장
          </button>
        </div>
      </form>
     );
}

export default InputRecipe;