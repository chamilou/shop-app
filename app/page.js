import Image from "next/image";
import styles from "./page.module.css";
import { getProducts } from "../lib/db";
import Button from "../components/button";
import AddToCartButton from "../components/AddToCartButton";
import Slider from "@/components/Slider";

export default function Home() {
  // Fetch all products from the database
  const allProducts = getProducts();

  // Get the most recently added products (e.g., last 4 products)
  const recentlyAddedProducts = allProducts.slice(-4);

  return (
    <div className={styles.container}>
      {/* Swiper Slider Section */}
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
      <Slider />

      {/* Recently Added Products Section */}
      <h2 className={styles.sectionTitle}>Recently Added Products</h2>
      <div className={styles.grid}>
        {recentlyAddedProducts.map((product) => (
          <div key={product.id} className={styles.card}>
            <Button href={`/recipes/${product.id}`} className={styles.cardLink}>
              <Image
                src={product.image_path}
                alt={product.name}
                width={300}
                height={200}
                className={styles.image}
              />
              <h2>{product.name}</h2>
              <p>{product.description}</p>
            </Button>
            <p className={styles.price}>${product.price.toFixed(2)}</p>
            <AddToCartButton recipe={product} />
          </div>
        ))}
      </div>
    </div>
  );
}
