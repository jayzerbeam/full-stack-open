const Statistics = ({ good, bad, neutral }) => {
  const sumOfRatings = () => {
    return good + neutral + bad;
  };

  const getAveragePercent = () => {
    let value = (good - bad) / sumOfRatings();
    return isNaN(value) ? "" : value.toFixed(2).toString();
  };

  const getPositivePercent = () => {
    let value = good / sumOfRatings();
    return isNaN(value) ? "" : value.toFixed(2).toString().concat("%");
  };

  return (
    <div>
      <h2>statistics</h2>
      <p>good: {good}</p>
      <p>neutral: {neutral}</p>
      <p>bad: {bad}</p>
      <p>all: {sumOfRatings()}</p>
      <p>average: {getAveragePercent()}</p>
      <p>positive: {getPositivePercent()}</p>
    </div>
  );
};

export default Statistics;
