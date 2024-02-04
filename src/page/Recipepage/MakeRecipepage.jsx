import Headerbar from "../../components/Recipecomponents/Headerbar";
import InputRecipe from "../../components/InputRecipe";

function MakeRecipepage() {

  return (
    <>
      <Headerbar />
      <div className="grid grid-cols-auto-fit gap-2 justify-center">
      <h1 className="text-3xl font-bold mb-4 text-center">레시피 만들기창</h1>
      <InputRecipe />
      </div>
    </>
  );
}

export default MakeRecipepage;
