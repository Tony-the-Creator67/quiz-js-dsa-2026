export default function Cabecalho({ atual, total, pontuacao }) {
  const progresso = (atual / total) * 100;
  return (
    <header className="cabecalho">
      <h1>Quiz JavaScript</h1>
      <div className="info">
        <span>Questão {Math.min(atual + 1, total)} de {total}</span>
        <span>Pontos: <strong>{pontuacao}</strong></span>
      </div>
      <div className="barra" role="progressbar" aria-valuenow={atual} aria-valuemin={0} aria-valuemax={total}>
        <div className="barra-preenchida" style={{ width: `${progresso}%` }} />
      </div>
    </header>
  );
}
