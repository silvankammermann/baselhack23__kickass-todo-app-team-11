"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import "@/app/fonts/Tanker/Fonts/WEB/css/tanker.css";
import styles from "@/app/page.module.css";
import Header from "./components/Header/Header";
import { useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

/*
export const metadata = {
  title: "Kick Ass Todo App",
  description: "A Todo App where your todo's won't be forgotten.",
};
*/

export default function RootLayout({ children }) {
  useEffect(() => {
    // i have absolutelly no idea how nextJS and routing stuff works
    // therefore i inserted this little hacky effect here
    if (window.location.pathname === "/tinder") {
      document.body.classList.add("bgPurple");
    }
  }, []);

  return (
    <html lang="en">
      <body className={inter.className}>
        <Header title={`Your tasks`} />
        <main className={styles.main}>
          <div className={styles.main__inner}>{children}</div>
        </main>
      </body>
    </html>
  );
}
