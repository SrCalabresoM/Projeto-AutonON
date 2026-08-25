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

            <div className="space-y-4">

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
                            className="border p-2 rounded w-full"
                        />

                        <CurrencyInput
                            className="border p-2 rounded w-40"
                            placeholder="Preço"
                            intlConfig={{ locale: 'pt-BR', currency: 'BRL' }}
                            defaultValue={0}
                            onValueChange={(value) => {
                                handleServico(
                                    index,
                                    'preco',
                                    Number(value.replace(",","."))
                                )
                            }}
                        />

                        {servicos.length > 1 && (
                            <button onClick={() => removerServico(index)}>🗑</button>
                        )}

                    </div>

                ))}

            </div>

            <button onClick={adicionarServico} className="mt-4"> + Adicionar serviço</button>
        </>
        
    );
}

export default Servicos;