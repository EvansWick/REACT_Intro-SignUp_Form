import { useState } from "react";
import SignUpForm from "./assets/components/SignUpForm";
import styles from "./App.module.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <article className={styles.articleForm}>
      <SignUpForm></SignUpForm>
    </article>
  );
}

export default App;
