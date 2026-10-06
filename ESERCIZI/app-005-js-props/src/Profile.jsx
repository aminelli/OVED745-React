
import { getImageUrl } from './utils';

export default function Profile({
    imageId,
    name,
    profession,
    awards,
    discovery,
    imageSize = 70
}) {
    return (
        <section className="profile">
            <h2>{name}</h2>
            <img 
                    src={getImageUrl(imageId)} 
                    alt={name} 
                    className="avatar" 
                    style={{ width: `${imageSize}px`, height: `${imageSize}px` }}
                />
            <ul>
                <li><b>Professioni: </b>{profession}</li>
                <li>
                    <b>Awards: {awards.length}</b>
                    ({awards.join(', ')})

                </li>
                <li>
                    <b>Discovered:</b>
                    {discovery}
                </li>
            </ul>
        </section>
    );
}