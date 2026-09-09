import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";

export default function Home() {

  const [profissionais, setProfissionais] = useState([]);
  const [pesquisa, setPesquisa] = useState("");
  const navigate = useNavigate();

  useEffect(() => {

    async function carregarProfissionais() {

     const { data, error } = await supabase
        .from("profissionais")
        .select(`
          id,
          nome,
          username,
          paginas!profissional_id (
            id,
            foto,
            servicos,
            name
          )
        `);


      if (error) {
        console.log(error);
        return;
      }
        const profissionaisMedidos = await Promise.all(

          data.map(async (profissional) => {
            if (!profissional.paginas?.id) {
                return {
                  ...profissional,
                  media: 0
                };
              }

            const { data: media} = await supabase
              .rpc("obter_media_pagina", {
                id_da_pagina: profissional.paginas?.id
              });
            

            return {
              ...profissional,
              media
            };

          })
       )
      
       setProfissionais(profissionaisMedidos);
      
    }

    carregarProfissionais();

  }, []);
  

  const profissionaisFilter = profissionais.filter((profissional) => {

    const nome = profissional.nome?.toLowerCase() || "";
    const username = profissional.username?.toLowerCase() || "";

    const servicos = profissional.paginas?.servicos || [];

    const servicoOK = servicos.some((servico) =>
      servico.nome?.toLowerCase().includes(pesquisa.toLowerCase())
    );

    return (
      nome.includes(pesquisa.toLowerCase()) ||
      username.includes(pesquisa.toLowerCase()) ||
      servicoOK
    );

  });

  return (
    <div className="min-h-screen px-4">

      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">

        <div className="w-16 h-16 bg-blue-600 rounded-full mb-6 animate-pulse md:w-24 md:h-24">
        
        </div>

        <p className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
          Projeto Autônomos
          <br className="hidden sm:block" />
        </p>

        <div className="mt-4 h-1 w-20 bg-blue-600 rounded-full mx-auto"></div>

        <div className="mt-8 w-full max-w-xl">

          <input
            type="text"
            placeholder="Procure por um profissional ou serviço..."
            value={pesquisa}
            onChange={(e) => setPesquisa(e.target.value)}
            className="w-full px-5 py-3 border border-gray-300 rounded-full outline-none focus:ring-2 focus:ring-blue-600"
          />

        </div>

      </div>


      <div className="max-w-6xl mx-auto pb-12">

        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Profissionais
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {profissionaisFilter.map((profissional) => {

             const foto = profissional.paginas?.foto || "https://placehold.co/600x400?text=Sem+Foto"
             const name = profissional.paginas?.name || ""

            return (
              <div
                key={profissional.id}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden cursor-pointer hover:shadow-md transition"
                onClick={() => {navigate(`a/${profissional.username}`)}}
              >

                <div className="h-40 bg-gray-100 relative">

                  {foto && (
                    <img
                      src={foto}
                      alt={profissional.nome}
                      className="w-full h-full object-cover"
                    />
                  )}

                  <div className="absolute top-2 right-2 bg-white px-2 py-0.5 rounded flex items-center gap-1 text-sm font-semibold text-gray-800 shadow-sm">
                    <svg className="w-4 h-4 text-yellow-500 fill-current" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                    <span>{profissional.media}</span>
                  </div>

                </div>

                <div className="p-4">

                  <h1 className="text-2xl font-bold text-gray-900">
                    {name}
                  </h1>
                  <div className="flex items-center gap-2">
                  <h5 className="text-base font-bold text-blue-600">
                    {profissional.nome}
                  </h5>

                  <p className="text-sm text-gray-500 mt-1">
                    {"(@"+profissional.username+")"}
                  </p>
                  </div>

                </div>

              </div>
            );


          })}

        </div>

        {profissionaisFilter.length == 0 && (
          <p className="text-center text-gray-500 mt-10">
            Nenhum profissional encontrado.
          </p>
        )}

      </div>

    </div>
  );

}

