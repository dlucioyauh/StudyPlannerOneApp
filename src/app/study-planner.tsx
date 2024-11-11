"use client"; // Garantindo que o componente seja processado no cliente

import { useState } from "react";

export default function StudyPlanner() {
  const [porcentagemEstudada, setPorcentagemEstudada] = useState<number>(0); // Estado para a porcentagem
  const [horasPorDia, setHorasPorDia] = useState<number>(0); // Horas de estudo por dia
  const [dataConclusao, setDataConclusao] = useState<string>(""); // Resultado da nova data de conclusão

  // Função para calcular a nova data de conclusão
  const calcularNovaDataConclusao = (inicio: string, horasRestantes: number, horasPorDia: number) => {
    const diasAdicionais = horasRestantes / horasPorDia; // Calcula quantos dias adicionais são necessários
    const dataInicio = new Date(inicio);
    dataInicio.setDate(dataInicio.getDate() + Math.ceil(diasAdicionais)); // Adiciona os dias ao tempo de início
    return dataInicio.toLocaleDateString(); // Retorna a data formatada
  };

  const handleSubmit = () => {
    const horasRestantes = 100 - porcentagemEstudada; // Definindo horasRestantes
    const novaData = calcularNovaDataConclusao("2024-11-11", horasRestantes, horasPorDia); // Exemplo de uso
    setDataConclusao(novaData);
  };

  return (
    <div className="flex flex-col items-center">
      {/* Campo para a porcentagem estudada */}
      <input
        type="number"
        value={porcentagemEstudada}
        onChange={(e) => setPorcentagemEstudada(Number(e.target.value))}
        placeholder="Digite a porcentagem estudada"
        className="border p-2 mb-4 rounded-md text-center"
        min={0}
        max={100}
        aria-label="Porcentagem de estudo concluída"
      />

      {/* Campo para as horas de estudo por dia */}
      <input
        type="number"
        value={horasPorDia}
        onChange={(e) => setHorasPorDia(Number(e.target.value))}
        placeholder="Horas por dia"
        className="border p-2 mb-4 rounded-md text-center"
        aria-label="Horas de estudo por dia"
      />

      {/* Botão para calcular */}
      <button
        onClick={handleSubmit}
        className={`bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition-all ${!porcentagemEstudada || !horasPorDia ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={!porcentagemEstudada || !horasPorDia}
        aria-label="Calcular nova data de conclusão"
      >
        Calcular Nova Data de Conclusão
      </button>

      {/* Exibir a nova data de conclusão */}
      {dataConclusao && (
        <p className="text-lg text-center mt-4">Nova data de conclusão: {dataConclusao}</p>
      )}
    </div>
  );
}
