"use client"; 

import { useState } from "react";

export default function StudyPlanner() {
  const [porcentagemEstudada, setPorcentagemEstudada] = useState<number>(0); 
  const [horasPorDia, setHorasPorDia] = useState<number>(0); 
  const [dataConclusao, setDataConclusao] = useState<string>(""); 

  // Função para calcular a nova data de conclusão
  const calcularNovaDataConclusao = (inicio: string, horasRestantes: number, horasPorDia: number) => {
    const diasAdicionais = horasRestantes / horasPorDia; 
    const dataInicio = new Date(inicio);
    dataInicio.setDate(dataInicio.getDate() + Math.ceil(diasAdicionais)); 
    return dataInicio.toLocaleDateString(); 
  };

  const handleSubmit = () => {
    const horasRestantes = 100 - porcentagemEstudada; 
    const novaData = calcularNovaDataConclusao("2024-11-11", horasRestantes, horasPorDia); 
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
