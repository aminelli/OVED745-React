
import Button from './Button.jsx'
import CustomButton from './CustomButton.jsx'

export default function Toolbar() {

    function handleButton4(event) {
        alert("Logica nel componente Toolbar");
        event.stopPropagation();
    }

     function handleDiv() {
        alert("click su div");
    }

    return (
        <div onClick={handleDiv} style={{padding: "20px", backgroundColor: "lightgray", border: "1px solid black", width: "100%"}}>
            <Button message="Logica nel componente button">Button 1</Button>
            <Button message="Logica nel componente button">Button 2</Button>
            <Button message="Logica nel componente button">Button 3</Button>
            <CustomButton onClick={handleButton4}>Button 4</CustomButton>
        </div>
    )
}