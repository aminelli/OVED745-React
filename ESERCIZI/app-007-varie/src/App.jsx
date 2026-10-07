import { useState } from 'react';

function sendMessage(message) {
  console.log("Messaggio inviato:", message);
}


export default function Form() {

  const [isSent, setIsSent] = useState(false);
  const [message, setMessage] = useState('Ciao !');

  const [number, setNumber] = useState(0);
  const [number2, setNumber2] = useState(0);
  const [number3, setNumber3] = useState(3);

  const handleIncrement = () => {
    // number += 1;
    setNumber(number2 + 1);
    //setTimeout(() => {
    //  alert("Numero : " + (number));
    //}, 5000);
  };

   const handleIncrement2 = () => {
    setNumber2(number2 + 1);
    setNumber2(number2 + 1);
    setNumber2(number2 + 1);  
    console.log("number2", number2); 
    
  };

  const handleIncrement3 = () => {
    setNumber3(n => n + 1);
    setNumber3(n => n + 1);
    setNumber3(n => n + 1);   
    console.log("number3", number3);
  };


  if (isSent) {
    return <p>E' stato inviato il tuo messaggio: {message}</p>;
  }

  return (
    <>
    <form onSubmit={(e) => {
      e.preventDefault();
      setIsSent(true);
      sendMessage(message);
      
    }}>
      <label>
        Messaggio:
        <textarea value={message} onChange={(e) => setMessage(e.target.value)} />
      </label>
      <button type="submit">Invia</button>
    </form>
    
    <hr/>
    <h1>Numero: {number}  </h1>
    <button onClick={handleIncrement}>Incrementa</button>
    
    <hr/>
    <h1>Numero 2: {number2}  </h1>
    <button onClick={handleIncrement2}>Incrementa +3</button>

    <hr/>
    <h1>Numero 3: {number3}  </h1>
    <button onClick={handleIncrement3}>Incrementa +3</button>
    </>
  );





}