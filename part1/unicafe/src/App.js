import { useState } from "react";
import Button from "./Button";

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGood = () => {
    return;
  };

  return (
    <div>
      <div>
        <p>give feedback</p>
        <Button handleClick={handleGood} text="good" />
        <Button text="neutral" />
        <Button text="bad" />
      </div>
      <div>
        <p>statistics:</p>
        <p>good:</p>
        <p>neutral:</p>
        <p>bad:</p>
        <p>all:</p>
        <p>average:</p>
        <p>positive:</p>
      </div>
    </div>
  );
};

export default App;
