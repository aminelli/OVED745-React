import Providers from "./components/Provider";
import "./globals.css";
import { ReactNode } from "react";
import Navbar from "./components/Navbar";

 
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <Providers>
          <Navbar />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
