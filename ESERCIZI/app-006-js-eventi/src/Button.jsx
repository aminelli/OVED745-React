
export default function Button({message, children}) {
  
    function handleClick() {
        alert(message);
    }

    return (
        <button onClick={
            event => {
                event.stopPropagation();
                handleClick();
            }
        }>{children}</button>
    )
}