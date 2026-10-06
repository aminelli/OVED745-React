import Profile, { ProfileLight } from "./Profile";
import { people } from "./data";


export default function Gallery() {
 
    const chemists = people.filter(person => person.profession === "chemist");

    const others = people.filter(person => person.profession !== "chemist");

  return (
    <div>
        <h1>Gallery scienziati</h1>
        {people.map(person => (
            <Profile
                key={person.id}
                //key={`Key-${crypto.randomUUID()}`}
                name={person.name}
                imageId={person.imageId}
                profession={person.profession}
                awards={person.awards}
                discovery={person.discovery}
            />
        ))}
        <br />
        <hr />
        <hr />
        <h2>Chemists</h2>
        {chemists.map(person => (
            <ProfileLight   
                key={person.id}
                name={person.name}
                imageId={person.imageId}
                profession={person.profession}
                discovery={person.discovery}
            />
        ))}
        <br />
        <hr />
        <hr />
        <h2>Others</h2>
        {others.map(person => (
            <ProfileLight
                key={person.id}
                name={person.name}
                imageId={person.imageId}
                profession={person.profession}
                discovery={person.discovery}
            />
        ))}
    </div>
  );
}


