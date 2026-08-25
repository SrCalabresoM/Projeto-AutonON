import { useParams } from "react-router-dom";
import { supabase } from "../../lib/supabase.js";
import { useState, useEffect } from "react";
import MiniCalendário from "./MiniCalendário.jsx";

function PaginaPublica() {

    const { username } = useParams();

    const [profissional, setProfissional] = useState(null);
    const [pagina, setPagina] = useState(null);
    const [fotoAtiva, setFotoAtiva] = useState(null);

    useEffect(() => {

        if (!username) return;

        async function buscarPagina(usernam) {

            const { data: profissionalData, error: profissionalError } = await supabase
              .from("profissionais")
              .select("*")
              .eq("username", usernam)
              .maybeSingle();

            if (profissionalError || !profissionalData) {
                console.log("Erro usuário não existe:", profissionalError);
                setProfissional(null);
                return;
            }

            setProfissional(profissionalData);

            const { data: paginaData, error: paginaError } = await supabase
              .from("paginas")
              .select("*")
              .eq("profissional_id", profissionalData.id)
              .maybeSingle();

            if (paginaError) {
                console.log("Erro ao buscar página:", paginaError);
                return;
            }

            setPagina(paginaData);
        }

        buscarPagina(username);

    }, [username]);

    if (!profissional) {
        return <p>A página que você busca não existe</p>;
    }

    if (!pagina) {
        return <p>Carregando...</p>;
    }

    const tema = pagina.tema
        ? typeof pagina.tema === "string"
            ? JSON.parse(pagina.tema)
            : pagina.tema
        : {};

    const servicos = pagina.servicos
        ? typeof pagina.servicos === "string"
            ? JSON.parse(pagina.servicos)
            : pagina.servicos
        : [];

    const galeria = pagina.galeria || [];


return (

    <div
        className="min-h-screen"
        style={{
            '--fundo': tema.fundo,
            '--superficie': tema.superficie,
            '--texto': tema.texto,
            '--secundario': tema.secundario,
            '--destaque': tema.destaque,

            backgroundColor: 'var(--fundo)',
            color: 'var(--texto)'
        }}
    >

        <div className="max-w-4xl mx-auto p-6 space-y-8">

            <div className="flex flex-col sm:flex-row items-center gap-6">

                {pagina.foto && (

                    <img
                        src={pagina.foto}
                        alt={pagina.name}
                        className="w-64 h-64 rounded-full object-cover border-4 border-[var(--superficie)]"
                    />

                )}

                <div>

                    <h1 className="text-8xl font-bold text-[var(--texto)]">
                        {pagina.name}
                    </h1>

                    <h5 className="text-lg text-[var(--secundario)]">
                        Loja de: {profissional.nome}
                    </h5>

                </div>

            </div>

            {pagina.descricao && (

                <div
                    className="prose max-w-none [&_*]:text-[var(--texto)]"
                    dangerouslySetInnerHTML={{
                        __html: pagina.descricao
                    }}
                />

            )}

            <div>

                <h2 className="text-xl font-bold mb-4 text-[var(--texto)]">
                    Serviços
                </h2>

                <div className="space-y-2">

                    {servicos.map((servico, index) => (

                        <div
                            key={index}
                            className="flex justify-between p-4 rounded-lg bg-[var(--superficie)]"
                        >

                            <span className="text-[var(--texto)]">
                                {servico.nome}
                            </span>

                            <span className="font-semibold text-[var(--destaque)]">

                                R$ {servico.preco}

                            </span>

                        </div>

                    ))}

                </div>

            </div>

            {galeria.length > 0 && (

                <div>

                    <h2 className="text-xl font-bold mb-4 text-[var(--texto)]">
                        Galeria
                    </h2>

                     <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-1">

                        {galeria.map((imagem, index) => (

                            <img
                                key={index}
                                src={imagem}
                                alt={`Imagem ${index + 1}`}
                                onClick={() => setFotoAtiva(index)}
                                className="w-full aspect-square object-cover rounded-lg cursor-pointer hover:opacity-90 transition border-2 border-[var(--superficie)]"
                            />

                        ))}

                    </div>

                  {fotoAtiva !== null && (
                      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm select-none" onClick={() => setFotoAtiva(null)}>
                          <button className="absolute top-4 right-4 text-white bg-zinc-900/50 hover:bg-zinc-800 p-2.5 rounded-full text-xl border border-zinc-700/50" onClick={() => setFotoAtiva(null)}>✕</button>
                          <button className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-zinc-900/50 hover:bg-zinc-800 p-4 rounded-full text-2xl border border-zinc-700/50" onClick={(e) => { e.stopPropagation(); setFotoAtiva((fotoAtiva - 1 + galeria.length) % galeria.length); }}>‹</button>
                          <div className="max-w-[90vw] max-h-[85vh] flex flex-col items-center gap-2" onClick={(e) => e.stopPropagation()}>
                              <img src={galeria[fotoAtiva]} alt="" className="max-w-full max-h-[80vh] object-contain rounded-lg border border-[var(--superficie)] shadow-2xl"/>
                              <span className="text-zinc-400 text-sm font-medium">{fotoAtiva + 1} de {galeria.length}</span>
                          </div>
                          <button className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-zinc-900/50 hover:bg-zinc-800 p-4 rounded-full text-2xl border border-zinc-700/50" onClick={(e) => { e.stopPropagation(); setFotoAtiva((fotoAtiva + 1) % galeria.length); }}>›</button>
                      </div>
                  )}


                </div>

            )}

            <MiniCalendário 
              profissionalUsername={profissional.username}
            />
        </div>

    </div>

);



}

export default PaginaPublica;