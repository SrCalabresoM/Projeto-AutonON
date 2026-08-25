function Tema({temaSelecionado, setTemaSelecionado}) {

    const temas = [
        {
            nome: 'Padrão Corporativo',
            tipo: 'claro',
            fundo: '#FFFFFF',
            superficie: '#F8FAFC',
            texto: '#0F172A',
            secundario: '#64748B',
            destaque: '#2563EB'
        },
        {
            nome: 'Creme / Editorial',
            tipo: 'claro',
            fundo: '#FDFBF7',
            superficie: '#F5F2EB',
            texto: '#1C1917',
            secundario: '#78716C',
            destaque: '#C2410C'
        },
        {
            nome: 'Menta Ecológica',
            tipo: 'claro',
            fundo: '#F2F9F6',
            superficie: '#E6F2ED',
            texto: '#062F22',
            secundario: '#3F6257',
            destaque: '#059669'
        },
        {
            nome: 'Minimalista Dark',
            tipo: 'escuro',
            fundo: '#09090B',
            superficie: '#18181B',
            texto: '#FAFAFA',
            secundario: '#A1A1AA',
            destaque: '#7C3AED'
        },
        {
            nome: 'Azul Oceano',
            tipo: 'escuro',
            fundo: '#070F1E',
            superficie: '#0F1E36',
            texto: '#F1F5F9',
            secundario: '#94A3B8',
            destaque: '#0EA5E9'
        },
        {
            nome: 'Cyberpunk',
            tipo: 'escuro',
            fundo: '#050505',
            superficie: '#121212',
            texto: '#FFFFFF',
            secundario: '#8B8B8B',
            destaque: '#EC4899'
        }
    ];

    return (
        <>

            <h2 className="text-xl font-bold mb-4">
                Escolha um tema
            </h2>

                        <div className="grid grid-cols-3 gap-6">

                {temas.map((tema) => (

                    <div key={tema.nome} onClick={() => setTemaSelecionado(tema)} className={`cursor-pointer border rounded-lg overflow-hidden text-left transition-all ${temaSelecionado?.nome === tema.nome ? 'ring-2 ring-indigo-600' : ''}`}>

                        <div className="h-10" style={{
                            backgroundColor: tema.superficie
                        }}
                        />

                        <div className="p-4" style={{
                            backgroundColor: tema.fundo
                        }}
                        >

                            <p className="font-bold" style={{
                                color: tema.texto
                            }}
                            >
                                Nome da Loja
                            </p>

                            <p className="text-sm" style={{
                                color: tema.secundario
                            }}
                            >
                                Sua descrição aqui
                            </p>

                            <button className="mt-3 px-3 py-1 rounded text-white text-sm" style={{
                                backgroundColor: tema.destaque
                            }}
                            >
                                Agendar
                            </button>

                            <div className="flex gap-2 mt-4">

                                <span className="w-4 h-4 rounded-full border" style={{
                                    backgroundColor: tema.fundo
                                }}
                                />

                                <span className="w-4 h-4 rounded-full border" style={{
                                    backgroundColor: tema.superficie
                                }}
                                />

                                <span className="w-4 h-4 rounded-full border" style={{
                                    backgroundColor: tema.texto
                                }}
                                />

                                <span className="w-4 h-4 rounded-full border" style={{
                                    backgroundColor: tema.secundario
                                }}
                                />

                                <span className="w-4 h-4 rounded-full border" style={{
                                    backgroundColor: tema.destaque
                                }}
                                />

                            </div>

                            <p className="text-sm mt-4 font-medium" style={{
                                color: tema.texto
                            }}
                            >
                                {tema.nome}
                            </p>

                        </div>

                    </div>

                ))}

            </div>

        </>
    );

}

export default Tema;