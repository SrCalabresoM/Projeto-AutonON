import CurrencyInput from 'react-currency-input-field';

function Servicos({servicos, setServicos}) {


    function handleServico(index, campo, valor) {

        const novosServicos = [...servicos];

        novosServicos[index][campo] = valor;

        setServicos(novosServicos);
    }

    function adicionarServico() {

        setServicos([
            ...servicos,
            {
                nome: '',
                preco: ''
            }
        ]);
    }

    function removerServico(index) {

        const novosServicos = servicos.filter((_, i) => i !== index);

        setServicos(novosServicos);
    }

    return (
        <>

            <div className="space-y-4 max-w-2xl">

                {servicos.map((servico, index) => (

                    <div
                        key={index}
                        className="flex gap-4 items-center"
                    >

                        <input
                            type="text"
                            placeholder="Nome do serviço"
                            value={servico.nome}
                            onChange={(e) =>
                                handleServico(
                                    index,
                                    'nome',
                                    e.target.value
                                )
                            }
                            className="flex-1 min-w-0 h-10 rounded-md border border-gray-300 bg-white px-3 text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                        />

                        <CurrencyInput
                            className="w-36 h-10 rounded-md border border-gray-300 bg-white px-3 text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                            placeholder="Preço"
                            intlConfig={{ locale: 'pt-BR', currency: 'BRL' }}
                            value={servico.preco}
                            onValueChange={(value) => {
                                handleServico(
                                    index,
                                    'preco',
                                    Number((value || "").replace(",","." ))
                                )
                            }}
                        />

                        {servicos.length > 1 && (
                            <button onClick={() => removerServico(index)} className="text-gray-500 hover:text-red-600 text-sm transition-colors">🗑</button>
                        )}

                    </div>

                ))}

            </div>

            <button onClick={adicionarServico} className="mt-4 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"> + Adicionar serviço</button>
        </>

    );
}

export default Servicos;