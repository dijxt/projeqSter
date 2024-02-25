import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/NavBar";
import dotenv from "dotenv";

dotenv.config();

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ProjeqSter",
  description: "Application de gestion de projet",
};

const host = process.env.API_HOST;

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className={inter.className}>
      <Navbar host={host}/>
      {children}
      </body>
    </html>
  );
}
