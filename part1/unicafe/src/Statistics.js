import StatisticsLine from "./StatisticsLine";

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
      <table>
        <StatisticsLine text={"good"} value={good} />
        <StatisticsLine text={"neutral"} value={neutral} />
        <StatisticsLine text={"bad"} value={bad} />
        <StatisticsLine text={"all"} value={sumOfRatings()} />
        <StatisticsLine text={"average"} value={getAveragePercent()} />
        <StatisticsLine text={"positive"} value={getPositivePercent()} />
      </table>
    </div>
  );
};

export default Statistics;
