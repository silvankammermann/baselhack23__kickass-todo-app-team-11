import styles from "./page.module.css";
import TaskRow from "./components/TaskRow/TaskRow";
import tasks from "./testdata/tasks.js";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.main__inner}>
        {tasks.map(({
          name
        }) => {
          return <TaskRow taskName={name} />
        })}
      </div>
    </main>
  );
}
