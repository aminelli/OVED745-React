import './App.css'

export default function MarkuExampleWithCss() {
  return (
    <div>
      <div className="intro">
        <h1>Hello, World!</h1>
      </div>
      <p className="summary">
        ciao !
        <br/><br/>
        <b>testo <i>italico</i></b> di <span className="testProva">prova</span>
      </p>
    </div>
  )
}