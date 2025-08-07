import Container from "@/components/Container"
import { HomeBanner } from "@/components/HomeBanner";
import { HomeCategories } from "@/components/HomeCategories";
import { ProductGrid } from "@/components/ProductGrid";
import { getCategories } from "@/sanity/queries";

export default async function Home() {
  const categories = await getCategories(6);
  console.log("categories", categories);
  return (
   <>
    <Container className="p-4 rounded-lg">
        <HomeBanner/>
        <ProductGrid/>
        <HomeCategories categories={categories}/>
    </Container>
   </>
  );
};
