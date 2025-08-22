import "../globals.css";
import { Header } from "@/components/header/Header";
import { Footer } from "@/components/footer/Footer";
import { ClerkProvider } from '@clerk/nextjs';


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider> 
     <div className="flex flex-col min-h-screen"> 
          <Header/>
           <main className="flex-1">{children}</main>
          <Footer/>
      </div>
    </ClerkProvider>
  );
};
