'use client';

import { useState } from "react";

export default function Home() {
  const [porcentagemEstudada, setPorcentagemEstudada] = useState(0); // Para armazenar a porcentagem de estudo
  const [inicio, setInicio] = useState(""); // Data de início
  const [final, setFinal] = useState(""); // Data final
  const [totalHoras, setTotalHoras] = useState(0); // Total de horas de curso
  const [diasSemana, setDiasSemana] = useState(0); // Dias da semana para estudar
  const [horasSegSex, setHorasSegSex] = useState(0); // Horas diárias de Segunda a Sexta
  const [horasSábado, setHorasSábado] = useState(0); // Horas no sábado
  const [horasDomingo, setHorasDomingo] = useState(0); // Horas no domingo
  const [resultado, setResultado] = useState(""); // Resultado de cálculo de horas restantes
  const [dataConclusao, setDataConclusao] = useState(""); // Para mostrar a data de conclusão
  const [horasPorDia, setHorasPorDia] = useState(0); // Para armazenar a quantidade de horas que o usuário precisa estudar por dia

  // Função para calcular o que falta
  const calcularFalta = () => {
    const horasRestantes = totalHoras * ((100 - porcentagemEstudada) / 100); // Calcula as horas restantes
    const diasRestantes = calcularDiasRestantes(inicio, final); // Função para calcular os dias restantes

    // Total de horas que o usuário pode estudar por semana
    const horasPorSemana = (horasSegSex * 5) + horasSábado + horasDomingo;

    // Calcula quantas semanas restam para concluir
    const semanasRestantes = horasRestantes / horasPorSemana;

    // Calcula a nova data de conclusão
    const novaDataConclusao = calcularNovaDataConclusao(inicio, semanasRestantes);

    // Calcula as horas que o usuário precisa estudar por dia para terminar o curso
    const horasPorDia = (horasRestantes / diasRestantes).toFixed(2);

    setResultado(`Você completou ${porcentagemEstudada}% do curso. Faltam ${100 - porcentagemEstudada}% para concluir.`);
    setDataConclusao(`Com as horas diárias ajustadas, você concluirá o curso em: ${novaDataConclusao}`);
    setHorasPorDia(horasPorDia); // Exibe as horas por dia necessárias
  };

  // Função para calcular a quantidade de dias restantes
  const calcularDiasRestantes = (inicio: string, final: string) => {
    const dataInicio = new Date(inicio);
    const dataFinal = new Date(final);
    const tempoRestante = dataFinal.getTime() - dataInicio.getTime(); // Diferença entre as datas em milissegundos
    return Math.floor(tempoRestante / (1000 * 3600 * 24)); // Converte milissegundos para dias
  };

  // Função para calcular a nova data de conclusão com base nas semanas restantes
  const calcularNovaDataConclusao = (inicio: string, semanasRestantes: number) => {
    const dataInicio = new Date(inicio);
    const diasRestantes = semanasRestantes * 7; // Convertendo semanas restantes para dias
    dataInicio.setDate(dataInicio.getDate() + Math.ceil(diasRestantes)); // Adiciona os dias ao tempo de início
    return dataInicio.toLocaleDateString(); // Retorna a data formatada
  };

  // Função para redirecionar para o GitHub
  const redirecionarParaGitHub = () => {
    window.location.href = "https://github.com/dlucioyauh/StudyPlannerOneApp"; // Altere para o seu repositório no GitHub
  };

  return (
    <div className="flex flex-col justify-center items-center p-6">
      <p className="text-lg text-center mb-4">
        Bem-vindo ao StudyPlanner! Aqui você pode calcular suas horas de estudo
        e alcançar suas metas de aprendizado.
      </p>

      <div className="flex flex-col items-center space-y-4">
        <label>Planejador de Estudos</label>
        <div className="space-y-2">
          <div>
            <label className="block">Data de início:</label>
            <input
              type="date"
              value={inicio}
              onChange={(e) => setInicio(e.target.value)}
              className="border p-2 rounded-md"
            />
          </div>

          <div>
            <label className="block">Data final:</label>
            <input
              type="date"
              value={final}
              onChange={(e) => setFinal(e.target.value)}
              className="border p-2 rounded-md"
            />
          </div>

          <div>
            <label className="block">Total de horas de curso:</label>
            <input
              type="number"
              value={totalHoras}
              onChange={(e) => setTotalHoras(Number(e.target.value))}
              className="border p-2 rounded-md"
            />
          </div>

          <div>
            <label className="block">Dias da semana para estudar:</label>
            <input
              type="number"
              value={diasSemana}
              onChange={(e) => setDiasSemana(Number(e.target.value))}
              className="border p-2 rounded-md"
            />
          </div>

          <div>
            <label className="block">Horas diárias de estudo (Segunda a Sexta):</label>
            <input
              type="number"
              value={horasSegSex}
              onChange={(e) => setHorasSegSex(Number(e.target.value))}
              className="border p-2 rounded-md"
            />
          </div>

          <div>
            <label className="block">Horas no sábado:</label>
            <input
              type="number"
              value={horasSábado}
              onChange={(e) => setHorasSábado(Number(e.target.value))}
              className="border p-2 rounded-md"
            />
          </div>

          <div>
            <label className="block">Horas no domingo:</label>
            <input
              type="number"
              value={horasDomingo}
              onChange={(e) => setHorasDomingo(Number(e.target.value))}
              className="border p-2 rounded-md"
            />
          </div>

          {/* Campo para a porcentagem de estudo já realizado */}
          <div>
            <label className="block">Porcentagem de estudo realizado:</label>
            <input
              type="number"
              value={porcentagemEstudada}
              onChange={(e) => setPorcentagemEstudada(Number(e.target.value))}
              className="border p-2 rounded-md"
              min={0}
              max={100}
            />
          </div>

          {/* Botão para calcular a porcentagem que falta */}
          <button
            onClick={calcularFalta}
            className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition-all mt-4"
          >
            Calcular
          </button>

          {/* Resultado do cálculo */}
          {resultado && (
            <p className="text-lg text-center mt-4">{resultado}</p>
          )}

          {/* Exibe as horas por dia necessárias */}
          {horasPorDia > 0 && (
            <p className="text-lg text-center mt-4">
              Você precisa estudar {horasPorDia} horas por dia para concluir o curso.
            </p>
          )}

          {/* Data de conclusão ajustada */}
          {dataConclusao && (
            <p className="text-lg text-center mt-4">{dataConclusao}</p>
          )}
        </div>
      </div>

      {/* Botão "Compartilhe, ou siga-nos" */}
      <button
        onClick={redirecionarParaGitHub}
        className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600 transition-all mt-6"
      >
        Compartilhe, ou siga-nos
      </button>
    </div>
  );
}
