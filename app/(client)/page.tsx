import Container from "@/components/Container"
import { HomeBanner } from "@/components/HomeBanner";
import { ProductGrid } from "@/components/ProductGrid";

export default function Home() {
  return (
   <>
    <Container className="p-4 rounded-lg">
        <HomeBanner/>
        <ProductGrid/>
    </Container>
   </>
  );
};
