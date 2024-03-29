import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/src/app/{components}/Nav";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "FreshForkfuls",
  description: "Transform Your Meals, Transform Your Life – Start Crafting Nutritious Recipes That Fuel Your Joy!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className + " bg-base-100"}>
        <Nav />
        {children}
      </body>
    </html>
  );
}
