import Profile from "./Profile";

const people = [
    {
        imageId : "szV5sdG",
        name : "Maria Skłodowska-Curie",
        profession : "physicist and chemist",
        awards : [
            'Nobel Prize in Physics',
            'Nobel Prize in Chemistry',
            'Davy Medal',
            'Matteucci Medal'
            ],
        discovery: "polonium (chemical element)",
        //imageSize : 70
    },
    {
        imageId : "YfeOqp2",
        name : "Katsuko Saruhashi",
        profession : "geochemist",
        awards : [
          'Miyake Prize for geochemistry',
          'Tanaka Prize'
        ],
        discovery: "a method for measuring carbon dioxide in seawater",
        //imageSize : 70
  }
  ];

export default function Gallery() {
 

  return (
    <div>
        <h1>Gallery scienziati</h1>
        {people.map(person => (
            <Profile
                key={person.imageId}
                name={person.name}
                imageId={person.imageId}
                profession={person.profession}
                awards={person.awards}
                discovery={person.discovery}
            />
        ))}
    </div>
  );
}