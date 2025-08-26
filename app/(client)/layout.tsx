import "../globals.css";
import { Header } from "@/components/header/Header";
import { Footer } from "@/components/footer/Footer";
import { SessionProvider } from "next-auth/react"


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider> 
     <div className="flex flex-col min-h-screen"> 
          <Header/>
           <main className="flex-1">{children}</main>
          <Footer/>
      </div>
    </SessionProvider>
  );
};
