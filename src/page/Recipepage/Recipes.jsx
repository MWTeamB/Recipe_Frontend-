import { useState } from "react";
import { useEffect } from "react";

function Recipes() {
    const [recipes, setRecipes] = useState([]);
  
    useEffect(() => {
      // API 호출
      fetch('/api/v1/recipes/search', {
        method: 'GET', 
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(response => response.json())
      .then(data => {
        // 응답 데이터를 상태에 저장
        setRecipes(data.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    }, []); // 빈 배열을 전달하여 컴포넌트 마운트 시 한번만 호출
  
    return (
      <div>
        <h1>레시피 목록</h1>
        {recipes.map(recipe => (
          <div key={recipe.recipe_id}>
            <h2>{recipe.title}</h2>
            <p>{recipe.description}</p>
          </div>
        ))}
      </div>
    );
  }
  
  export default Recipes;