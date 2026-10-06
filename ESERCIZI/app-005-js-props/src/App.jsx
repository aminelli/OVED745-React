import CheckList from './CheckList';
import Gallery from './Gallery';
import Clock from './Clock';
import { useState, useEffect } from 'react';


function useTime() {

  const [time, setTime] = useState(() => new Date());
  
  useEffect(
    () => {
      const intervalId = setInterval(
        () => setTime(new Date())
      , 1000
    );
    return () => clearInterval(intervalId);
  }, []);

  return time;

}

export default function App() {

const time = useTime();

  return (
    <div>
      <Clock time={time} />
      <div>
            
          <h1>Welcome to the Scientist Gallery</h1>
          <Gallery />
          <CheckList />
      </div>
    </div>
  
  );
}