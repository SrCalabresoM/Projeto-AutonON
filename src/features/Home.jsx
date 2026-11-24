import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";


const fontCss = `
  @import url('https://fonts.googleapis.com/css2?family=Raleway:wght@400;500;600;700;800;900&family=Work+Sans:wght@400;500;600;700;800;900&display=swap');

  body {
    font-family: 'Work Sans', sans-serif !important;
    font-weight: 400;
  }

  h1, h2, h3, h4, h5, h6,
  .font-display {
    font-family: 'Raleway', sans-serif !important;
  }

  p, nav, a, input, select, option {
    font-family: 'Work Sans', sans-serif !important;
  }

  p {
    font-weight: 400 !important;
  }
`;

const socialIcons = {
  instagram: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z',
  whatsapp: 'M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z',
  youtube: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z',
  github: 'M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z',
};

function SocialButton({ type, className, title }) {
  return (
    <button
      type="button"
      className={`group cursor-pointer w-[50px] h-[50px] rounded-full border-none ${className} relative z-0 flex items-center justify-center mx-1.5 transition-transform duration-100 active:scale-85 before:content-[''] before:absolute before:w-[55px] before:h-[55px] before:bg-[#EBECE6] before:rounded-full before:-z-10 before:transition-all before:duration-400 hover:before:w-0 hover:before:h-0`}
      title={title}
      aria-label={title}
    >
      <svg className="w-6 h-6 fill-white relative z-10" viewBox="0 0 24 24" aria-hidden="true">
        <path d={socialIcons[type]} />
      </svg>
    </button>
  );
}

export default function Home() {

  const [profissionais, setProfissionais] = useState([]);
  const [pesquisa, setPesquisa] = useState("");
  const [modal, setModal] = useState({ open: false, title: '', message: '' });
  const navigate = useNavigate();
  const [quant, setQuant] = useState(8);

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

  useEffect(() => {
    document.title = 'Arandu | AutonON';
    document.documentElement.classList.add('scroll-smooth');

    return () => {
      document.documentElement.classList.remove('scroll-smooth');
    };
  }, []);

  const mostrarModal = (title, message) => setModal({ open: true, title, message });
  const fecharModal = () => setModal((current) => ({ ...current, open: false }));
  const rolarParaHero = () => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  const voltarAoTopo = () => window.scrollTo({ top: 0, behavior: 'smooth' });

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
    <>
      <style>{fontCss}</style>

      <div className="bg-[#F6F7F3] text-[#212529] flex flex-col min-h-screen overflow-x-hidden font-sans antialiased">

        <main className="relative w-full min-h-[calc(100vh-80px)] flex flex-col items-center justify-center text-center overflow-hidden">
          <video autoPlay loop muted playsInline poster="imagens/silver-line-waves.png" className="absolute inset-0 w-full h-full object-cover z-0">
            <source src="imagens/silver-line-waves.mp4" type="video/mp4" />
            Seu navegador não suporta vídeos em HTML5.
          </video>

          <div className="absolute inset-0 bg-[#F6F7F3]/75 backdrop-blur-[2px] z-10" />

          <div className="relative z-20 flex flex-col items-center justify-center px-6 py-12 max-w-[1000px] mx-auto">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black leading-tight tracking-wide mb-6 text-[#1e293b]">
              Venha moldar o futuro do trabalho com a gente
            </h2>

            <p className="font-sans text-slate-700 text-base sm:text-lg leading-relaxed max-w-[700px] mb-8">
              Estamos desenvolvendo o AutonON para ser o lugar ideal para conectar profissionais autônomos e clientes de forma ágil, segura e sem complicações.
            </p>

            <div className="flex gap-5 flex-wrap justify-center mb-7">
              <button type="button" className="font-display py-3 px-20 rounded-full text-base font-bold cursor-pointer border-none transition-all duration-200 bg-[#2563eb] text-white hover:bg-[#1d4ed8] hover:-translate-y-0.5 shadow-md" onClick={rolarParaHero}>Serviços</button>
            </div>
            
          </div>
        </main>

        <section id="profissionais" className="w-full py-16 px-[8%] bg-[#F9FAFB] border-y border-[#E2E4DC] flex flex-col items-center">
          <div className="max-w-[1100px] w-full flex flex-col items-center">
            <div className="flex flex-col items-center mb-8">
              <div className="w-14 h-14 bg-[#2563eb] rounded-full mb-4 shadow-md" />
              <h2 className="font-display text-3xl md:text-4xl font-extrabold text-[#1e293b] text-center tracking-tight">Projeto Autônomos</h2>
            </div>

            <div className="w-full max-w-[500px] mb-12">
              <input
                type="text"
                placeholder="Procure um profissional ou serviço..."
                value={pesquisa}
                onChange={(e) => setPesquisa(e.target.value)}
                className="w-full bg-[#F3F4F6] text-slate-700 placeholder-slate-400 py-3 px-6 rounded-full border border-slate-200 outline-none focus:border-[#2563eb] focus:bg-white transition-all shadow-inner text-sm"
              />
            </div>

            <div className="w-full text-left mb-6">
              <h3 className="font-display text-xl font-bold text-[#1e293b]">Profissionais</h3>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">

              {profissionaisFilter.slice(0, quant).map((profissional) => {

                const foto = profissional.paginas?.foto || "https://placehold.co/600x400?text=Sem+Foto";
                const name = profissional.paginas?.name || "";

                return (
                  <div
                    key={profissional.id}
                    className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => {navigate(`a/${profissional.username}`)}}
                  >

                    <div className="bg-[#E5E7EB] h-44 flex items-center justify-center relative p-4">

                      {foto && (
                        <img
                          src={foto}
                          alt={profissional.nome}
                          className="w-full h-full object-cover absolute inset-0"
                        />
                      )}

                      <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-xs font-bold py-1 px-2.5 rounded-full border border-slate-200 text-slate-600 flex items-center gap-1 shadow-sm">
                        <svg className="w-3 h-3 fill-yellow-500" viewBox="0 0 24 24">
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                        {profissional.media}
                      </span>

                    </div>

                    <div className="p-4">
                      <h4 className="font-display font-bold text-lg text-[#1e293b]">
                        {name}
                      </h4>
                      <p className="text-xs text-slate-500 font-medium">
                        <span className="text-[#2563eb] font-semibold">{profissional.nome}</span> (@{profissional.username})
                      </p>
                    </div>

                  </div>
                );

              })}

            </div>

            {profissionaisFilter.length == 0 && (
              <p className="text-center text-slate-500 mt-10">
                Nenhum profissional encontrado.
              </p>
            )}

            {quant < profissionaisFilter.length && (
              <div className="flex flex-col items-center gap-2 cursor-pointer group" onClick={() => setQuant(quant + 6)}>
                <span className="text-xs font-semibold text-slate-500 group-hover:text-[#2563eb] transition-colors">Ver mais profissionais</span>
                <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center shadow-sm group-hover:border-[#2563eb] group-hover:bg-[#2563eb]/5 transition-all animate-bounce">
                  <svg className="w-5 h-5 fill-slate-600 group-hover:fill-[#2563eb] transition-colors" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6-6-6-6z" />
                  </svg>
                </div>
              </div>
            )}
          </div>
        </section>

        <footer className="bg-[#EBECE6] pt-16 pb-10 px-[8%] mt-auto border-t border-[#D8D9D1] relative overflow-hidden">
          <div className="flex flex-col items-center text-center mb-10 relative z-10">
            <div>
              <div className="flex items-center justify-center gap-3">
                <span className="font-display text-2xl font-extrabold tracking-wider text-[#1e293b]">ARANDU</span>
              </div>
              <p className="text-slate-600 text-sm mt-3 max-w-[300px] mx-auto">Qualidade para criar, liberdade para voar.</p>
              <select className="mt-5 bg-white text-slate-700 border border-[#CBD5E1] py-2 px-3 rounded-lg cursor-pointer outline-none focus:border-[#2563eb]" aria-label="Idioma">
                <option className="bg-white">Português (Brasil)</option>
                <option className="bg-white">English</option>
              </select>
            </div>
          </div>

          <div className="flex justify-center items-center my-7 relative z-10">
            <SocialButton type="instagram" className="bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045]" title="Instagram" />
            <SocialButton type="whatsapp" className="bg-gradient-to-r from-[#25D366] to-[#128C7E]" title="WhatsApp" />
            <SocialButton type="youtube" className="bg-[#FF0000]" title="YouTube" />
            <SocialButton type="github" className="bg-[#24292e]" title="GitHub" />
          </div>

          <div className="font-display absolute -bottom-10 left-1/2 -translate-x-1/2 text-[15vw] font-black text-transparent bg-clip-text bg-gradient-to-b from-slate-400/40 via-slate-500/20 to-[#EBECE6] whitespace-nowrap select-none pointer-events-none">
            AutonON
          </div>
        </footer>

        <button type="button" className="group fixed bottom-6 right-6 w-[50px] h-[50px] rounded-full bg-white border border-[#CBD5E1] font-semibold flex items-center justify-center shadow-md cursor-pointer transition-all duration-300 overflow-hidden z-50 hover:w-[140px] hover:bg-[#2563eb] hover:border-[#2563eb] before:content-['Voltar_ao_Topo'] before:absolute before:-bottom-[20px] before:text-white before:text-[0px] hover:before:text-[12px] hover:before:opacity-100 hover:before:bottom-auto hover:before:transition-all hover:before:duration-300" onClick={voltarAoTopo} title="Voltar ao topo" aria-label="Voltar ao topo">
          <svg className="w-5 h-5 fill-slate-700 group-hover:hidden" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z" />
          </svg>
        </button>

        <div className={`fixed inset-0 w-screen h-screen bg-slate-900/40 backdrop-blur-sm flex items-center justify-center transition-all duration-300 z-[1000] ${modal.open ? '' : 'opacity-0 invisible'}`} onClick={(event) => { if (event.target === event.currentTarget) fecharModal(); }}>
          <div className={`bg-white border border-[#E2E4DC] rounded-2xl p-8 max-w-[420px] w-[90%] text-center shadow-2xl transition-transform duration-300 ${modal.open ? '' : 'scale-80'}`}>
            <h3 className="font-display text-xl text-[#1e293b] mb-3 font-bold">{modal.title || 'Título'}</h3>
            <p className="text-slate-600 text-sm leading-normal mb-6">{modal.message || 'Mensagem...'}</p>
            <button type="button" className="font-display bg-[#2563eb] text-white py-3 px-7 rounded-full border-none font-bold cursor-pointer w-full transition-colors duration-200 hover:bg-[#1d4ed8]" onClick={fecharModal}>Entendido</button>
          </div>
        </div>

      </div>
    </>
  );

}
