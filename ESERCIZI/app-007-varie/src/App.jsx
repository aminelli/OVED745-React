import { useState } from 'react';

function sendMessage(message) {
  console.log("Messaggio inviato:", message);
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


export default function Form() {

  const [isSent, setIsSent] = useState(false);
  const [message, setMessage] = useState('Ciao !');

  const [number, setNumber] = useState(0);
  const [number2, setNumber2] = useState(0);
  const [number3, setNumber3] = useState(3);

  const [pending, setPending] = useState(0);
  const [completed, setCompleted] = useState(0);

  const [pending2, setPending2] = useState(0);
  const [completed2, setCompleted2] = useState(0);


  async function handleClick() {
    setPending(pending + 1);
    await delay(3000);
    setPending(pending - 1);
    setCompleted(completed + 1);
  }

    async function handleClick2() {
    setPending2(p => p + 1);
    await delay(3000);
    setPending2(p => p - 1);
    setCompleted2(c => c + 1);
  }

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

    <hr/>
    <h3>Pending: {pending}</h3>
    <h3>Completed: {completed}</h3>
    <button onClick={handleClick}>Simula Operazione</button>

      <hr/>
    <h3>Pending 2: {pending2}</h3>
    <h3>Completed 2: {completed2}</h3>
    <button onClick={handleClick2}>Simula Operazione 2</button>
    </>
  );





}