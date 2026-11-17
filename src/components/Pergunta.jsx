// Recebe a pergunta e o estado da resposta via props.
export default function Pergunta({ pergunta, selecionada, confirmada, onSelecionar }) {
  function classe(i) {
    let c = "opcao";
    if (i === selecionada) c += " selecionada";
    if (confirmada && i === pergunta.correta) c += " certa";
    if (confirmada && i === selecionada && i !== pergunta.correta) c += " errada";
    return c;
  }
  return (
    <section>
      <h2 className="enunciado">{pergunta.enunciado}</h2>
      <div className="opcoes">
        {pergunta.opcoes.map((texto, i) => (
          <button key={i} className={classe(i)} disabled={confirmada} onClick={() => onSelecionar(i)}>
            {texto}
          </button>
        ))}
      </div>
    </section>
  );
}
