import Masonry from "./Card";
import Menubutton from "../Menubutton";
import { Link } from "react-router-dom";


function Headerbar() {

    return (  
    <div className="relative min-w-[100%] p-3 mx-auto mb-8 bg-green-300">
        <Link to={'/'}><Menubutton name="뒤로가기"/></Link>
        <Link to={'/myrecipe'}><Menubutton name="내 레시피"/></Link>
        <Link to={'/makerecipe'}><Menubutton name="레시피 만들기"/></Link>
        <input className="rounded-3xl w-[700px] h-[50px] ml-[80px] placeholder:text-gray-500 pl-[14px] focus:outline-none focus:bg-gray-400 focus:placeholder:text-black" type="text" placeholder="원하는 재료로 만들수 있는 레시피를 검색해보세요"/>
        <Menubutton name="검색"/>
        <Menubutton name="내 재료창고"/>
    </div>
    );
}

export default Headerbar;