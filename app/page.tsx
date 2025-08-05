import Container from "@/components/Container"
import { HomeBanner } from "@/components/HomeBanner";

export default function Home() {
  return (
   <>
    <Container className="bg-[var(--shop-light-pink)] text-[var(--dark-color)] p-4 rounded-lg">
        <HomeBanner/>
    </Container>
   </>
  );
};
