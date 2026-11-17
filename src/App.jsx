import { useState, useEffect } from "react";
import { perguntas } from "./perguntas";
import Cabecalho from "./components/Cabecalho";
import Pergunta from "./components/Pergunta";
import Resultado from "./components/Resultado";

const CHAVE = "quiz-js-dsa-2026";
const estadoInicial = { atual: 0, pontuacao: 0, respostas: [] };

// Recupera o progresso salvo (se existir) ao iniciar.
function carregarProgresso() {
  try {
    const salvo = localStorage.getItem(CHAVE);
    return salvo ? JSON.parse(salvo) : estadoInicial;
  } catch {
    return estadoInicial;
  }
}

export default function App() {
  const [progresso, setProgresso] = useState(carregarProgresso);
  const [selecionada, setSelecionada] = useState(null);
  const [confirmada, setConfirmada] = useState(false);

  const { atual, pontuacao, respostas } = progresso;
  const terminou = atual >= perguntas.length;

  // useEffect: sincroniza o progresso com o localStorage (recurso externo).
  useEffect(() => {
    try {
      localStorage.setItem(CHAVE, JSON.stringify(progresso));
    } catch {
      /* armazenamento indisponível: ignora */
    }
  }, [progresso]);

  function confirmar() {
    if (selecionada === null) return;
    const acertou = selecionada === perguntas[atual].correta; // condicional
    setConfirmada(true);
    setProgresso({
      atual,
      pontuacao: acertou ? pontuacao + 1 : pontuacao,
      respostas: [...respostas, selecionada],
    });
  }

  function proxima() {
    setProgresso({ ...progresso, atual: atual + 1 });
    setSelecionada(null);
    setConfirmada(false);
  }

  function reiniciar() {
    setProgresso(estadoInicial);
    setSelecionada(null);
    setConfirmada(false);
  }

  return (
    <main className="app">
      <Cabecalho atual={atual} total={perguntas.length} pontuacao={pontuacao} />
      {terminou ? (
        <Resultado pontuacao={pontuacao} total={perguntas.length} respostas={respostas} perguntas={perguntas} onReiniciar={reiniciar} />
      ) : (
        <>
          <Pergunta pergunta={perguntas[atual]} selecionada={selecionada} confirmada={confirmada} onSelecionar={setSelecionada} />
          <div className="acoes">
            {!confirmada ? (
              <button className="botao-principal" onClick={confirmar} disabled={selecionada === null}>
                Confirmar resposta
              </button>
            ) : (
              <button className="botao-principal" onClick={proxima}>
                {atual === perguntas.length - 1 ? "Ver resultado" : "Próxima pergunta"}
              </button>
            )}
          </div>
        </>
      )}
    </main>
  );
}
