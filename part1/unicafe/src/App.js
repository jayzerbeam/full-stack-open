import { useState } from "react";
import Button from "./Button";

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGood = () => {
    setGood(good + 1);
  };

  const handleNeutral = () => {
    setNeutral(neutral + 1);
  };

  const handleBad = () => {
    setBad(bad + 1);
  };

  const sumOfRatings = () => {
    return good + neutral + bad;
  };

  const getAveragePercent = () => {
    let value = (good - bad) / sumOfRatings();
    return isNaN(value) ? "" : value.toFixed(2).toString();
  };

  const getPositivePercent = () => {
    let value = good / sumOfRatings();
    // truncate to two decimal places
    return isNaN(value) ? "" : value.toFixed(2).toString().concat("%");
  };

  return (
    <div>
      <div>
        <h1>give feedback</h1>
        <Button handleClick={handleGood} text="good" />
        <Button handleClick={handleNeutral} text="neutral" />
        <Button handleClick={handleBad} text="bad" />
      </div>
      <div>
        <h2>statistics</h2>
        <p>good: {good}</p>
        <p>neutral: {neutral}</p>
        <p>bad: {bad}</p>
        <p>all: {sumOfRatings()}</p>
        <p>average: {getAveragePercent()}</p>
        <p>positive: {getPositivePercent()}</p>
      </div>
    </div>
  );
};

export default App;
