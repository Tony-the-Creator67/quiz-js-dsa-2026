export default function Resultado({ pontuacao, total, respostas, perguntas, onReiniciar }) {
  // Estrutura de repetição: monta a lista das questões erradas.
  const erradas = [];
  for (let i = 0; i < perguntas.length; i++) {
    if (respostas[i] !== perguntas[i].correta) erradas.push(perguntas[i]);
  }
  const percentual = Math.round((pontuacao / total) * 100);
  let mensagem;
  if (percentual === 100) mensagem = "Perfeito! Você domina o conteúdo!";
  else if (percentual >= 60) mensagem = "Muito bem! Revise os pontos abaixo.";
  else mensagem = "Continue estudando, você chega lá!";

  return (
    <section className="resultado">
      <h2>Resultado final</h2>
      <p className="nota">{pontuacao} / {total} ({percentual}%)</p>
      <p>{mensagem}</p>
      {erradas.length > 0 && (
        <div className="revisar">
          <h3>Para revisar:</h3>
          <ul>
            {erradas.map((p) => (
              <li key={p.enunciado}>
                {p.enunciado} <strong>Resposta: {p.opcoes[p.correta]}</strong>
              </li>
            ))}
          </ul>
        </div>
      )}
      <button className="botao-principal" onClick={onReiniciar}>Refazer o quiz</button>
    </section>
  );
}
