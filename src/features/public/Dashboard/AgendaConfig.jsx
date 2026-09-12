function AgendaConfig({duracao, setDuracao, labuta, setLabuta, horaInicio, setHoraInicio, horaFim, setHoraFim, intervalo, setIntervalo}) {

    function toggleDia(diaNumero) {

        if (labuta.includes(diaNumero)) {

            setLabuta(
                labuta.filter(d => d !== diaNumero)
            );

            return;
        }

        setLabuta([
            ...labuta,
            diaNumero
        ]);

    }

    const dias = [
        { label: 'Dom', value: 0 },
        { label: 'Seg', value: 1 },
        { label: 'Ter', value: 2 },
        { label: 'Qua', value: 3 },
        { label: 'Qui', value: 4 },
        { label: 'Sex', value: 5 },
        { label: 'Sab', value: 6 }
    ];


    return (

        <>

            <h2 className="text-xl font-bold mb-4">
                Configuração da Agenda
            </h2>

            <div className="grid grid-cols-2 gap-6">

                <div className="border rounded-lg p-4">

                    <h3 className="font-bold mb-4">
                        Horário de Trabalho
                    </h3>

                    <label className="block mb-2">
                        Duração média dos atendimentos
                    </label>

                    <select
                        value={duracao}
                        onChange={(e) => setDuracao(e.target.value)}
                        className="w-full border rounded p-2 mb-4"
                    >

                        <option value="00:15:00">15 minutos</option>
                        <option value="00:30:00">30 minutos</option>
                        <option value="00:45:00">45 minutos</option>
                        <option value="01:00:00">60 minutos</option>
                        <option value="01:30:00">90 minutos</option>

                    </select>

                    <label className="block mb-2">
                        Início do expediente
                    </label>

                    <input
                        type="time"
                        value={horaInicio}
                        onChange={(e) => setHoraInicio(e.target.value)}
                        className="w-full border rounded p-2 mb-4"
                    />

                    <label className="block mb-2">
                        Fim do expediente
                    </label>

                    <input
                        type="time"
                        value={horaFim}
                        onChange={(e) => setHoraFim(e.target.value)}
                        className="w-full border rounded p-2 mb-4"
                    />

                     <h3 className="font-bold mb-4 mt-6">
                        Intervalo
                    </h3>

                    {intervalo.map((item, index) => (
                        <div key={index} className="mb-4 border-b pb-4 last:border-0 last:pb-0">
                            <label className="block mb-2">
                                Início do intervalo {index + 1}
                            </label>
                            <input
                                type="time"
                                value={item.start}
                                onChange={(e) => {
                                    const novosIntervalos = [...intervalo];
                                    novosIntervalos[index].start = e.target.value;
                                    setIntervalo(novosIntervalos);
                                }}
                                className="w-full border rounded p-2 mb-4"
                            />

                            <label className="block mb-2">
                                Fim do intervalo {index + 1}
                            </label>
                            <div className="flex gap-2">
                                <input
                                    type="time"
                                    value={item.end}
                                    onChange={(e) => {
                                        const novosIntervalos = [...intervalo];
                                        novosIntervalos[index].end = e.target.value;
                                        setIntervalo(novosIntervalos);
                                    }}
                                    className="w-full border rounded p-2"
                                />
                                <button
                                    type="button"
                                    onClick={() => {
                                        const novosIntervalos = intervalo.filter((_, i) => i !== index);
                                        setIntervalo(novosIntervalos);
                                    }}
                                    className="border border-red-500 text-red-500 rounded p-2 hover:bg-red-50"
                                >
                                    Remover
                                </button>
                            </div>
                        </div>
                    ))}

                    <button
                        type="button"
                        onClick={() => setIntervalo([...intervalo, { start: "", end: "" }])}
                        className="w-full bg-blue-600 text-white rounded p-2 mt-2 hover:bg-blue-700"
                    >
                        Adicionar Intervalo
                    </button>


                </div>

                <div className="border rounded-lg p-4">

                    <h3 className="font-bold mb-4">
                        Dias da Semana
                    </h3>

                    <div className="grid grid-cols-4 gap-2">

                        {dias.map((dia) => (

                            <button
                                key={dia.value}
                                type="button"
                                onClick={() => toggleDia(dia.value)}
                                className={`p-2 rounded border ${
                                    labuta.includes(dia.value)
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-white'
                                }`}
                            >

                                {dia.label}

                            </button>

                        ))}

                    </div>


                    <div className="mt-6 p-4 rounded bg-gray-100">

                        <p className="font-medium">
                            Resumo
                        </p>

                        <p className="text-sm text-gray-600 mt-2">
                            Atendimento de {duracao} minutos
                        </p>

                        <p className="text-sm text-gray-600">
                            Das {horaInicio} às {horaFim}
                        </p>

                        {intervalo.map((item, index) => (
                            item.start && item.end && (
                                <p key={index} className="text-sm text-gray-600">
                                    Intervalo das {item.start} às {item.end}
                                </p>
                            )
                        ))}

                        <p className="text-sm text-gray-600">
                            {labuta.length} dias selecionados
                        </p>

                    </div>

                </div>

            </div>

        </>

    );

}

export default AgendaConfig;