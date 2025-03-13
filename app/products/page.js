import Image from "next/image";
import styles from "./products.module.css";
import { getProducts } from "@/lib/db";
import Button from "@/components/button";
import AddToCartButton from "@/components/AddToCartButton";

export default function Products() {
  // Fetch recipes from the database
  const recipes = getProducts();

  return (
    <div className={styles.container}>
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
