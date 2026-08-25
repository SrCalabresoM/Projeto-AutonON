import { useNavigate } from "react-router-dom";

function MiniCalendário({profissionalUsername}) {
    const navigate = useNavigate();
    return(
        <div>

            <h2 className="text-xl font-bold mb-4 text-[var(--texto)]">
                Agendamento
            </h2>

            <div
                onClick={() => navigate(`/agenda/${profissionalUsername}`)}
                className="max-w-md mx-auto rounded-2xl overflow-hidden border border-[var(--superficie)] bg-[var(--superficie)] cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
            >

                <div className="p-5">

                    <div className="flex items-center justify-between mb-5">

                        <div>

                            <div className="text-sm text-[var(--secundario)]">
                                Agende seu horário
                            </div>

                            <div className="text-2xl font-bold text-[var(--texto)]">
                                Agosto 2026
                            </div>

                        </div>

                        <div
                            className="w-11 h-11 rounded-xl flex items-center justify-center text-xl"
                            style={{
                                backgroundColor: 'var(--fundo)',
                                color: 'var(--destaque)'
                            }}
                        >
                            📅
                        </div>

                    </div>

                    <div className="grid grid-cols-7 mb-2">

                        {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((dia, index) => (

                            <div
                                key={index}
                                className="h-8 flex items-center justify-center text-xs font-semibold text-[var(--secundario)]"
                            >
                                {dia}
                            </div>

                        ))}

                    </div>

                    <div className="grid grid-cols-7 gap-y-1">

                        {[26, 27, 28, 29, 30, 31].map((dia) => (

                            <div
                                key={`anterior-${dia}`}
                                className="h-9 flex items-center justify-center text-sm text-[var(--secundario)] opacity-30"
                            >
                                {dia}
                            </div>

                        ))}

                        {Array.from({ length: 31 }, (_, index) => index + 1).map((dia) => (

                            <div
                                key={dia}
                                className="h-9 flex items-center justify-center"
                            >

                                <div
                                    className={`w-8 h-8 flex items-center justify-center rounded-full text-sm transition ${
                                        dia === 25
                                            ? 'text-white font-bold'
                                            : 'text-[var(--texto)]'
                                    }`}
                                    style={
                                        dia === 25
                                            ? {
                                                backgroundColor: 'var(--destaque)'
                                            }
                                            : {}
                                    }
                                >
                                    {dia}
                                </div>

                            </div>

                        ))}

                    </div>

                </div>

                <div
                    className="px-5 py-4 flex items-center justify-between border-t border-[var(--fundo)]"
                >

                    <div>

                        <div className="text-sm font-semibold text-[var(--texto)]">
                            Encontre um horário
                        </div>

                        <div className="text-xs text-[var(--secundario)]">
                            Clique para ver a agenda completa
                        </div>

                    </div>

                    <div
                        className="w-9 h-9 rounded-full flex items-center justify-center text-lg"
                        style={{
                            backgroundColor: 'var(--destaque)',
                            color: 'var(--fundo)'
                        }}
                    >
                        →
                    </div>

                </div>

            </div>

        </div>
    );
}

export default MiniCalendário;