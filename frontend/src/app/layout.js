import { Inter } from "next/font/google";
import "./globals.css";
import "./atomics.css";
import "@/app/fonts/Tanker/Fonts/WEB/css/tanker.css";
import styles from "@/app/page.module.css";
import Header from "./components/Header/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Kick Ass Todo App",
  description: "A Todo App where your todo's won't be forgotten.",
};

let colorClass = "";
/*
if (usePathname() === "/tinder") {
  colorClass = "bg--purple";
}
*/

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${colorClass} ${inter.className}`}>
        <Header title={`Your tasks`} />
        <main className={styles.main}>
          <div className={styles.main__inner}>{children}</div>
        </main>
      </body>
    </html>
  );
}
