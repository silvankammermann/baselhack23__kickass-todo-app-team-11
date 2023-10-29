"use client";

import "./globals.css";
import "./atomics.css";
import "@/app/fonts/Tanker/Fonts/WEB/css/tanker.css";
import styles from "@/app/page.module.css";
import Header from "./components/Header/Header";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

/*
export const metadata = {
  title: "Kick Ass Todo App",
  description: "A Todo App where your todo's won't be forgotten.",
};
*/

export default function RootLayout({ children }) {
  const pathname = usePathname();

  // set body classes
  let bodyClasses = "bgDarkPurple";
  if (pathname === "/tinder") {
    bodyClasses = "bgPurple tinderPage";
  }

  // define header content
  let headerTitle = "";
  if (pathname === "/") {
    headerTitle = "My tasks";
  }

  return (
    <html lang="en">
      <body className={bodyClasses}>
        <Header title={headerTitle} />
        <b>{pathname}</b>
        <main className={styles.main}>
          <div className={styles.main__inner}>{children}</div>
        </main>
      </body>
    </html>
  );
}
