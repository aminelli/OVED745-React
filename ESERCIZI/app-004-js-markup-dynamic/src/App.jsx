const person = {
  name: "John Doe",
  imageUrl: "https://react.dev/images/docs/scientists/7vQD0fPs.jpg",
  theme: {
    backgroundColor: "black",
    color: 'pink'
  }
}

export default function TodoList() {
  return (
    <div style={person.theme}>
      <h1>{person.name} - Lista task</h1>
      <img 
        src={person.imageUrl} 
        alt={person.name} 
        className="avatar" />
      <ul>
        <li>Task 1</li>
        <li>Task 2</li>
        <li>Task 3</li>
      </ul>
    </div>
  )
}