import { useParams } from "react-router-dom";
import { supabase } from "../../lib/supabase.js";
import { useState, useEffect } from "react";
import MiniCalendário from "./MiniCalendário.jsx";
import Rate from "./Rate.jsx";

function PaginaPublica() {

    const { username } = useParams();

    const [profissional, setProfissional] = useState(null);
    const [pagina, setPagina] = useState(null);
    const [fotoAtiva, setFotoAtiva] = useState(null);
    const [media, setMedia] = useState(0);
    const [nota, setNota] = useState(0);

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

    const carregarMedia = async () => {
        if (!pagina) return;

        const { data: mediaa, error } = await supabase
            .rpc('obter_media_pagina', { id_da_pagina: pagina.id });

        if (error) {
            console.error('Erro ao buscar média:', error.message);
            return 0;
        }

        setMedia(mediaa);
    };

    useEffect(() => {
            carregarMedia();
            console.log(nota)
        }, [pagina?.id, nota]);

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
                            className="flex items-center gap-2"
                        >
                            <div
                                className="flex justify-between p-4 rounded-lg bg-[var(--superficie)] flex-1"
                            >

                                <span className="text-[var(--texto)]">
                                    {servico.nome}
                                </span>

                                <span className="font-semibold text-[var(--destaque)]">

                                    R$ {servico.preco}

                                </span>

                            </div>

                            {profissional.num && (<a href={`https://wa.me/${profissional.num}?text=${encodeURIComponent(`Olá, ${profissional.nome} gostaria de saber mais sobre o(a) ${servico.nome}`)}`} target="_blank" rel="noopener noreferrer" className="group cursor-pointer w-[50px] h-[50px] rounded-xl border-none bg-gradient-to-r from-[#25D366] to-[#128C7E] relative z-0 flex items-center justify-center mx-1.5 transition-transform duration-100 active:scale-85 before:content-[''] before:absolute before:w-[55px] before:h-[55px] before:bg-[#EBECE6] before:rounded-xl before:-z-10 before:transition-all before:duration-400 hover:before:w-0 hover:before:h-0">
                                <svg className="w-6 h-6 fill-white relative z-10" viewBox="0 0 24 24">
                                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                                </svg>
                            </a>)}
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


            <div>
                <h2 className="text-xl font-bold mb-4 text-[var(--texto)]">
                    Conhece esse autônomo? Avalie-o {"    (" + (media || 0) + ")"}
                </h2>
                <Rate 
                paginaId={pagina.id}
                setNota={setNota}
                />
            </div>
        </div>

    </div>

);



}

export default PaginaPublica;