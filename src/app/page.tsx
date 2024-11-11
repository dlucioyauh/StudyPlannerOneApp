'use client';

import { useState } from "react";

// Definindo a interface para os dias de estudo
interface DiasEstudo {
  segunda: boolean;
  terca: boolean;
  quarta: boolean;
  quinta: boolean;
  sexta: boolean;
}

export default function Home() {
  const [porcentagemEstudada, setPorcentagemEstudada] = useState(0);
  const [inicio, setInicio] = useState("");
  const [final, setFinal] = useState("");
  const [totalHoras, setTotalHoras] = useState(0);
  
  // Definindo o tipo do estado diasEstudo
  const [diasEstudo, setDiasEstudo] = useState<DiasEstudo>({
    segunda: false,
    terca: false,
    quarta: false,
    quinta: false,
    sexta: false,
  });

  const [horasSegSex, setHorasSegSex] = useState(0);
  const [horasSábado, setHorasSábado] = useState(0);
  const [horasDomingo, setHorasDomingo] = useState(0);
  const [resultado, setResultado] = useState("");
  const [dataConclusao, setDataConclusao] = useState("");
  const [horasParaCumprirPrazo, setHorasParaCumprirPrazo] = useState("");
  const [aviso, setAviso] = useState("");

  const calcularFalta = () => {
    if (totalHoras <= 0) {
      setAviso("Por favor, insira um valor válido para o total de horas do curso.");
      setResultado("");
      setDataConclusao("");
      setHorasParaCumprirPrazo("");
      return;
    }

    const horasRestantes = totalHoras * ((100 - porcentagemEstudada) / 100);
    const diasRestantes = calcularDiasRestantes(inicio, final);
    const diasEstudoSelecionados = Object.values(diasEstudo).filter(Boolean).length;
    const horasPorSemana = horasSegSex * diasEstudoSelecionados + horasSábado + horasDomingo;

    const semanasRestantes = horasRestantes / horasPorSemana;
    const novaDataConclusao = calcularNovaDataConclusao(inicio, semanasRestantes);

    setAviso("");
    setResultado(`Você completou ${porcentagemEstudada}% do curso. Faltam ${100 - porcentagemEstudada}% para concluir.`);
    setDataConclusao(`Com as horas diárias ajustadas, você concluirá o curso em: ${novaDataConclusao}`);

    const horasDiariasPrazo = calcularHorasParaPrazo(horasRestantes, diasRestantes, diasEstudoSelecionados);
    setHorasParaCumprirPrazo(`Para concluir até ${new Date(final).toLocaleDateString()}, estude ${horasDiariasPrazo} horas por dia nos dias escolhidos.`);
  };

  const calcularDiasRestantes = (inicio: string, final: string) => {
    const dataInicio = new Date(inicio);
    const dataFinal = new Date(final);
    const tempoRestante = dataFinal.getTime() - dataInicio.getTime();
    return Math.floor(tempoRestante / (1000 * 3600 * 24));
  };

  const calcularNovaDataConclusao = (inicio: string, semanasRestantes: number) => {
    const dataInicio = new Date(inicio);
    const diasRestantes = semanasRestantes * 7;
    dataInicio.setDate(dataInicio.getDate() + Math.ceil(diasRestantes));
    return dataInicio.toLocaleDateString();
  };

  const calcularHorasParaPrazo = (horasRestantes: number, diasRestantes: number, diasEstudoSelecionados: number) => {
    const totalDiasEstudo = Math.floor(diasRestantes / 7) * diasEstudoSelecionados;
    return (horasRestantes / totalDiasEstudo).toFixed(2);
  };

  // Atualizando a tipagem da função handleCheckboxChange
  const handleCheckboxChange = (dia: keyof DiasEstudo) => {
    setDiasEstudo((prevState) => ({
      ...prevState,
      [dia]: !prevState[dia],
    }));
  };

  const redirecionarParaGitHub = () => {
    window.open("https://github.com/dlucioyauh/StudyPlannerOneApp", "_blank");
  };

  return (
    <div className="flex flex-col justify-center items-center p-6 min-h-screen">
      <p className="text-lg text-center mb-4 max-w-3xl">
        Bem-vindo ao StudyPlanner! Aqui você pode calcular suas horas de estudo, planejar seu tempo para projetos com data de conclusão
        e alcançar suas metas de aprendizado.
      </p>

      <div className="flex flex-col items-center space-y-6 max-w-3xl w-full">
        <label className="text-xl font-bold mb-4">Planejador de Projetos e Estudos</label>

        <div className="space-y-4 w-full">
          <div className="flex flex-col">
            <label>Data de início:</label>
            <input type="date" value={inicio} onChange={(e) => setInicio(e.target.value)} className="border p-2 rounded-md" />
          </div>

          <div className="flex flex-col">
            <label>Data final:</label>
            <input type="date" value={final} onChange={(e) => setFinal(e.target.value)} className="border p-2 rounded-md" />
          </div>

          <div className="flex flex-col">
            <label>Total de horas do projeto ou curso:</label>
            <input type="number" value={totalHoras} onChange={(e) => setTotalHoras(Number(e.target.value))} className="border p-2 rounded-md" />
          </div>

          <div className="flex flex-col">
            <label>Dias da semana para desenvolver ou estudar:</label>
            <div className="flex justify-between space-x-6 flex-wrap">
              {["segunda", "terca", "quarta", "quinta", "sexta"].map((dia) => (
                <label key={dia} className={`flex items-center justify-center w-12 h-12 cursor-pointer p-2 rounded-md border ${diasEstudo[dia as keyof DiasEstudo] ? "bg-blue-500 text-white border-blue-500" : "border-gray-300"}`}>
                  <input type="checkbox" checked={diasEstudo[dia as keyof DiasEstudo]} onChange={() => handleCheckboxChange(dia as keyof DiasEstudo)} className="hidden" />
                  <span className="capitalize">{dia.charAt(0).toUpperCase() + dia.slice(1, 3)}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex flex-col">
            <label>Horas diárias de projeto ou estudo (Segunda a Sexta):</label>
            <input type="number" value={horasSegSex} onChange={(e) => setHorasSegSex(Number(e.target.value))} className="border p-2 rounded-md" />
          </div>

          <div className="flex flex-col">
            <label>Horas no sábado:</label>
            <input type="number" value={horasSábado} onChange={(e) => setHorasSábado(Number(e.target.value))} className="border p-2 rounded-md" />
          </div>

          <div className="flex flex-col">
            <label>Horas no domingo:</label>
            <input type="number" value={horasDomingo} onChange={(e) => setHorasDomingo(Number(e.target.value))} className="border p-2 rounded-md" />
          </div>

          <div className="flex flex-col">
            <label>Porcentagem do projeto ou estudo realizado:</label>
            <input type="number" value={porcentagemEstudada} onChange={(e) => setPorcentagemEstudada(Number(e.target.value))} className="border p-2 rounded-md" />
          </div>

          <button onClick={calcularFalta} className="bg-blue-600 text-white px-6 py-3 rounded-md">
            Calcular
          </button>
        </div>

        {aviso && <p className="text-red-500">{aviso}</p>}
        
        {resultado && (
          <div className="mt-4 text-center">
            <p>{resultado}</p>
            <p>{dataConclusao}</p>
            <p>Horas diárias com o plano atual: {horasSegSex} horas</p>
            <p>{horasParaCumprirPrazo}</p>
          </div>
        )}

        <div className="mt-4">
          <button onClick={redirecionarParaGitHub} className="bg-gray-800 text-white px-4 py-2 rounded-md">
            Ver código no GitHub
          </button>
        </div>
      </div>
    </div>
  );
}
