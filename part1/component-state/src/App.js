import Display from "./Display";
import Button from "./Button";
import { useState } from "react";

const App = () => {
  const [counter, setCounter] = useState(0);

  const increment = () => setCounter(counter + 1);
  const decrement = () => setCounter(counter - 1);
  const reset = () => setCounter(0);

  return (
    <>
      <Display counter={counter} />
      <Button handleClick={increment} text="Plus" />
      <Button handleClick={reset} text="Reset" />
      <Button handleClick={decrement} text="Minus" />
    </>
  );
};

export default App;
