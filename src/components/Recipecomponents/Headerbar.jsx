import Menubutton from "../Menubutton";
import { Link } from "react-router-dom";
import { useState } from "react";
import Refrigerator from "./Refrigerator";


function Headerbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);

   // 모달 열기 함수
   const openModal = () => {
    setIsModalOpen(true);
  };

  // 모달 닫기 함수
  const closeModal = () => {
    setIsModalOpen(false);
  };
 
    return (  
    <div className="relative min-w-[100%] p-3 mx-auto mb-8 bg-green-300">
        <Link to={'/'}><Menubutton name="뒤로가기"/></Link>
        <Link to={'/myrecipe'}><Menubutton name="내 레시피"/></Link>
        <Link to={'/makerecipe'}><Menubutton name="레시피 만들기"/></Link>
        
      <button className="bg-gray-400 inline-block px-7 py-2 rounded-3xl drop-shadow-3xl font-bold hover:text-white active:drop-shadow-4xl" onClick={openModal}>내 재료창고</button>
      <Refrigerator isOpen={isModalOpen} closeModal={closeModal} />
    </div>
    );
}

export default Headerbar;