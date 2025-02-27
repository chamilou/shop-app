import Image from "next/image";
import { getRecipeById } from "../../../lib/db";

export default async function RecipePage({ params }) {
  // Fetch the recipe by ID
  const recipe = getRecipeById(params.id);

  if (!recipe) {
    return <div>Recipe not found</div>;
  }

  return (
    <div className="container">
      <h1 className="title">{recipe.name}</h1>
      <div className="image-container">
        <Image
          src={recipe.image_path}
          alt={recipe.name}
          width={600}
          height={400}
          className="image"
        />
      </div>
      <p className="description">{recipe.description}</p>
    </div>
  );
}
