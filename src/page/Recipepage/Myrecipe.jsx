import { useEffect, useState } from "react";
import React from "react";
import Headerbar from "../../components/Recipecomponents/Headerbar";
import axios from "axios";
import Card from "../../components/Recipecomponents/Card";
import { Link } from "react-router-dom";
import Modal from "../../components/Recipecomponents/Modal";
import Menubutton from "../../components/Menubutton";

function Myrecipe() {
  const [Rlist, setRlist] = React.useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userInput, setUserInput] = useState('');

  useEffect(() => {
    getList();
  }, []);

  const getList = () => {
    axios
      .get("https://recipe-backend.fly.dev/api/v1/recipes")
      .then((response) => {
        setRlist(response.data.data);
        console.log(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // 입력값을 가져와 저장
const getValue = (e) => {
  setUserInput(e.target.value)
  console.log(e.target.value);
};


  // 모달 열기 함수
  const openModal = () => {
   setIsModalOpen(true);
 };

 // 모달 닫기 함수
 const closeModal = () => {
   setIsModalOpen(false);
 };


 // 데이터 목록중, field에 사용자 입력값이 있는 데이터만 불러오기
const searched = Rlist.filter((Recipe) =>
Recipe.field.includes(userInput)
);

  return (
    <div>
       <div className="relative min-w-[100%] p-3 mx-auto mb-8 bg-green-300">
        <Link to={'/'}><Menubutton name="뒤로가기"/></Link>
        <Link to={'/myrecipe'}><Menubutton name="내 레시피"/></Link>
        <Link to={'/makerecipe'}><Menubutton name="레시피 만들기"/></Link>
        <input className="rounded-3xl w-[700px] h-[50px] ml-[80px] placeholder:text-gray-500 pl-[14px] focus:outline-none focus:bg-gray-400 focus:placeholder:text-black" type="text" placeholder="원하는 레시피를 검색해보세요" onChange={getValue}/>
        
      <button className="bg-gray-400 inline-block px-7 py-2 rounded-3xl drop-shadow-3xl font-bold hover:text-white active:drop-shadow-4xl" onClick={openModal}>내 재료창고</button>
      <Modal isOpen={isModalOpen} closeModal={closeModal} />
    </div>
      <div className="grid grid-cols-auto-fit gap-2 justify-center">
        {searched.map((recipe) => (
          <Card key={recipe.recipe_id} recipe={recipe} getList={getList} />
        ))}
      </div>
    </div>
  );
}

export default Myrecipe;
