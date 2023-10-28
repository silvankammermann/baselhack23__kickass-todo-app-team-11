"use client";

import "./globals.css";
import "./atomics.css";
import "@/app/fonts/Tanker/Fonts/WEB/css/tanker.css";
import styles from "@/app/page.module.css";
import Header from "./components/Header/Header";
import { useEffect } from "react";


/*
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
  useEffect(() => {
    // i have absolutelly no idea how nextJS and routing stuff works
    // therefore i inserted this little hacky effect here
    if (window.location.pathname === "/tinder") {
      document.body.classList.add("bgPurple");
    }
  }, []);

  return (
    <html lang="en">
      <body className="bgDarkPurple">
        <Header title={`My tasks`} />
        <main className={styles.main}>
          <div className={styles.main__inner}>{children}</div>
        </main>
      </body>
    </html>
  );
}
