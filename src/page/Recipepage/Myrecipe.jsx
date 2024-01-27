import { useEffect , useState} from "react";
import React from "react";
import Headerbar from "../../components/Recipecomponents/Headerbar";
import axios from "axios";

function Myrecipe() {
    const [Rlist, setRlist] = React.useState([]);

    useEffect(() => {
        getList();
    }, []);

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
    return (  
        <div>
            <Headerbar />
                {Rlist.map((list) => (
                    <h1 key={list.recipe_id}>
                        {list.field} - {list.description} - {list.cooking_time}
                    </h1>
                ))}

          

        </div>
    );
}

export default Myrecipe;