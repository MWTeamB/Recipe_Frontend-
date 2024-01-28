import react from "react";
import { Link } from "react-router-dom";
function Mainpage() {
    return ( 
        <div className="m-5">
        <header className="text-[4rem] text-center font-bold">나만의 레시피</header>
        <p className="text-2xl text-center font-bold">자기만의 레시피를 등록하거나 냉장고속 재료들로 레시피를 찾아보아요</p>
        <nav class="text-center mt-16"> 
            <section className="inline-block bg-gray-400 rounded-lg drop-shadow-3xl active:drop-shadow-4xl">
                    <Link to={'/recipe'} className="p-5 w-[500px] block font-bold tracking-widest inline-block active:text-xl text-white">서비스 이용하기</Link>                   
            </section>
        </nav>
        </div>
     );
}

export default Mainpage;