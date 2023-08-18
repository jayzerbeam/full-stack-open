export default function Total({ parts }) {
  const getSum = (arr) => {
    return arr.reduce((acc, o) => {
      return acc + o.exercises;
    }, 0);
  };

  return (
    <p>
      <strong>Total number of exercises: {getSum(parts)}</strong>
    </p>
  );
}
