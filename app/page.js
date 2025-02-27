import Image from "next/image";
import styles from "./page.module.css";
import { getProducts } from "../lib/db";
import Button from "../components/button";
import AddToCartButton from "../components/AddToCartButton";

export default function Home() {
  // Fetch recipes from the database
  const recipes = getProducts();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        Welcome to{" "}
        <span className={styles.highlight}>Almond Paste Delights</span>
      </h1>

      <div className={styles.title}>
        <h3>
          Explore the delicious world of almond paste in baking and
          confectionery!
        </h3>
      </div>

      <div className={styles.grid}>
        {recipes.map((recipe) => (
          <div key={recipe.id} className={styles.card}>
            <Button href={`/recipes/${recipe.id}`} className={styles.cardLink}>
              <Image
                src={recipe.image_path}
                alt={recipe.name}
                width={300}
                height={200}
                className={styles.image}
              />
              <h2>{recipe.name}</h2>
              <p>{recipe.description}</p>
            </Button>
            <p className={styles.price}>${recipe.price.toFixed(2)}</p>
            <AddToCartButton recipe={recipe} />
          </div>
        ))}
      </div>
    </div>
  );
}
