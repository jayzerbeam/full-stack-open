export default function Total({ parts }) {
  const getSum = (arr) => {
    let sum = 0;
    arr.forEach((el) => {
      sum += el.exercises;
    });
    return sum;
  };

  return (
    <>
      <p>Number of exercises: {getSum(parts)}</p>
    </>
  );
}
