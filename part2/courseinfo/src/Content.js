import Part from "./Part";

export default function Content({ parts }) {
  return (
    <div>
      {parts.map((part) => (
        <Part name={part.name} exercise={part.exercises} key={part.id} />
      ))}
    </div>
  );
}
