
import styles from "./page.module.css";
import {Logo} from "@/Components/Logo";

export default function Home() {
  return (
          <main className={styles.main}>
              <Logo color={'#76b852'}/>
          </main>
  );
}
