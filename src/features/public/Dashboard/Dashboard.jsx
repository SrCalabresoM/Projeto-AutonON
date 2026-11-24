
import { useState, useEffect } from "react";
import Apresentação from "./Apresentacao";
import Identidade from "./Identidade";
import Servicos from "./Servicos";
import Galeria from "./Galeria";
import Tema from "./Temas";
import { supabase } from "../../../lib/supabase";
import { useAuth } from "../../../shared/useAuth";
import AgendaConfig from "./AgendaConfig";

function Dashboard() {

    const { user, perfil } = useAuth();
    const [profissionalId, setProfissionalId] = useState(null);
    const [etapa, setEtapa] = useState(1);
    const [nome, setNome] = useState('');
    const [titulo, setTitulo] = useState('');
    const [foto, setFoto] = useState(null);
    const [content, setContent] = useState('');
    const [servicos, setServicos] = useState([
        {
            nome: '',
            preco: ''
        }
    ]);
    const [imagens, setImagens] = useState([]);
    const [temaSelecionado, setTemaSelecionado] = useState(null);
    const [duracao, setDuracao] = useState("");
    const [labuta, setLabuta] = useState([]);
    const [horaInicio, setHoraInicio] = useState("")
    const [horaFim, setHoraFim] = useState("");
    const [intervalo, setIntervalo] = useState([
        {
            start: '',
            end: ''
        }
    ]);
    const [pagina, setPagina] = useState(null)
    const [num, setNum] = useState(null)
    const [confirm, setConfirm] = useState(false);

    useEffect(() => {
        if (!user) return;

        async function buscarIdProfissional() {
            const { data, error } = await supabase
            .from("profissionais")
            .select("id, paginas(*)")
            .eq("user_id", user.id)
            .maybeSingle();

            if (error) {
                console.log("Erro usuário não existe:", error);
                setProfissionalId(null);
                return null;
            }

            setProfissionalId(data.id);
            setPagina(data.paginas);
            
            return data;
        }

        
        buscarIdProfissional();

    }, [user]);

    useEffect(() => {
        if (!pagina && confirm) return;

         async function carregarDados() {
            
            if (pagina) {
                const arquivoFoto = await urlToFile(pagina.foto);
                const arquivosGaleria = await Promise.all(
                    pagina.galeria.map((url, index) =>
                        urlToFile(url, `galeria-${index}.jpg`)
                    )
                );

                setNome(pagina.name);
                setTitulo(pagina.slogan);
                setFoto(arquivoFoto);
                setContent(pagina.descricao);
                setServicos(pagina.servicos);
                setImagens(arquivosGaleria);
                setTemaSelecionado(pagina.tema);
                setDuracao(pagina.duracao || "");
                setLabuta(pagina.labuta || []);
                setHoraInicio(pagina.hora_inicio);
                setHoraFim(pagina.hora_fim);
                setIntervalo(pagina.intervalo || []);
            }
        }

        carregarDados();
    }, [pagina]);


    if (!pagina && !confirm) return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] px-4 text-center">
      <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-6 max-w-md leading-relaxed">
        Você ainda não tem uma página, deseja criar uma?
      </h2>

      <button
        onClick={() => setConfirm(true)}
        className="px-10 py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl shadow-lg shadow-green-200 transition-all active:scale-95 hover:-translate-y-0.5"
      >
        Criar
      </button>
    </div>
  );
    return (
    <div className="min-h-screen bg-gray-50">
        
        <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-8 lg:px-10 py-8">
        <div className="flex flex-wrap gap-2 mb-8">
            <button onClick={() => {setEtapa(1)}} className={etapa == 1 ? 'rounded-full px-5 py-2 text-sm font-medium bg-blue-600 text-black shadow-sm transition-colors' : 'rounded-full px-5 py-2 text-sm font-medium text-black hover:bg-gray-200 transition-colors'}>
                Identidade
            </button>

            <button onClick={() => {setEtapa(2)}} className={etapa == 2 ? 'rounded-full px-5 py-2 text-sm font-medium bg-blue-600 text-black shadow-sm transition-colors' : 'rounded-full px-5 py-2 text-sm font-medium text-black hover:bg-gray-200 transition-colors'}>
                Apresentação
            </button>

            <button onClick={() => {setEtapa(3)}} className={etapa == 3 ? 'rounded-full px-5 py-2 text-sm font-medium bg-blue-600 text-black shadow-sm transition-colors' : 'rounded-full px-5 py-2 text-sm font-medium text-black hover:bg-gray-200 transition-colors'}>
                Serviços
            </button>

            <button onClick={() => {setEtapa(4)}} className={etapa == 4 ? 'rounded-full px-5 py-2 text-sm font-medium bg-blue-600 text-black shadow-sm transition-colors' : 'rounded-full px-5 py-2 text-sm font-medium text-black hover:bg-gray-200 transition-colors'}>
                Galeria
            </button>

            <button onClick={() => {setEtapa(5)}} className={etapa == 5 ? 'rounded-full px-5 py-2 text-sm font-medium bg-blue-600 text-black shadow-sm transition-colors' : 'rounded-full px-5 py-2 text-sm font-medium text-black hover:bg-gray-200 transition-colors'}>
                Tema
            </button>

            <button onClick={() => {setEtapa(6)}} className={etapa == 6 ? 'rounded-full px-5 py-2 text-sm font-medium bg-blue-600 text-black shadow-sm transition-colors' : 'rounded-full px-5 py-2 text-sm font-medium text-black hover:bg-gray-200 transition-colors'}>
                Disponibilidade
            </button>

        </div>

        {etapa == 1 && (
            <div>
                <h2 className="font-display text-base font-semibold text-gray-800 mb-4">Identidade</h2>
                <Identidade 
                    nome={nome}
                    setNome={setNome}
                    titulo={titulo}
                    setTitulo={setTitulo}
                    foto={foto}
                    setFoto={setFoto}
                    num={num}
                    setNum={setNum}
                />
                
            </div>
        )}

        {etapa == 2 && (
            <div>
                <h2 className="font-display text-base font-semibold text-gray-800 mb-4">Apresentação</h2>
                <Apresentação 
                    content={content}
                    setContent={setContent}
                />
            </div>
        )}

        {etapa == 3 && (
            <div>
                <h2 className="font-display text-base font-semibold text-gray-800 mb-4">Serviços</h2>
                <Servicos 
                    servicos={servicos}
                    setServicos={setServicos}
                />
                
            </div>
        )}

        {etapa == 4 && (
            <div>
                <h2 className="font-display text-base font-semibold text-gray-800 mb-4">Galeria</h2>
                <Galeria 
                    imagens={imagens}
                    setImagens={setImagens}
                />
                
            </div>
        )}

        {etapa == 5 && (
            <div>
                <h2 className="font-display text-base font-semibold text-gray-800 mb-4">Tema</h2>
                <Tema
                    temaSelecionado={temaSelecionado}
                    setTemaSelecionado={setTemaSelecionado}
                />
                
            </div>
        )}

        {etapa == 6 && (
            <div>
                <h2 className="font-display text-base font-semibold text-gray-800 mb-4">Disponibilidade</h2>
                <AgendaConfig
                    duracao={duracao}
                    setDuracao={setDuracao}
                    labuta={labuta}
                    setLabuta={setLabuta}
                    horaInicio={horaInicio}
                    setHoraInicio={setHoraInicio}
                    horaFim={horaFim}
                    setHoraFim={setHoraFim}
                    intervalo={intervalo}
                    setIntervalo={setIntervalo}
                />
                
            </div>
        )}

        {/*botões*/}
        <div className="flex items-center justify-between mt-8">
            {etapa > 1 && (
                <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors" onClick={() => setEtapa(etapa - 1)}>
                    Voltar
                </button>
            )}

            {etapa <= 5 && (
                <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors" onClick={() => setEtapa(etapa + 1)}>
                    Continuar
                </button>
            )}

            {etapa === 6 && (
                <button className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 transition-colors" onClick={() => salvar()}>
                    Salvar
                </button>
            )}
        </div>
        </main>
    </div>
    );

    async function salvar() {
        const fotoUrl = await uploadImagem(foto, 'foto');
        await limparGaleria();
        const galeriaUrls = await Promise.all(
        imagens.map(arquivo => uploadImagem(arquivo, "galeria"))
    );
    console.log(fotoUrl, galeriaUrls, profissionalId, temaSelecionado, content, servicos, nome, labuta, horaInicio, horaFim, intervalo, duracao);
    
        await supabase
        .from("paginas")
        .upsert(
            {
                profissional_id: profissionalId,
                tema: temaSelecionado,
                descricao: content,
                servicos: servicos,
                galeria: galeriaUrls,
                configuracoes: {},
                name: nome,
                foto: fotoUrl,
                labuta: labuta,
                hora_inicio: horaInicio,
                hora_fim: horaFim,
                intervalo: intervalo,
                slogan: titulo,
                duracao: duracao
            },
            { onConflict: 'profissional_id' }
        )

                await supabase
          .from("profissionais")
          .upsert(
            {
              id: profissionalId,
              num: num
            },
            { onConflict: 'id' }
          )


    }
    async function uploadImagem(arquivo, tipo) {

        if (!arquivo || !profissionalId) return null;

        const extensao = arquivo.name.split(".").pop();

        let nomeArquivo;

        if (tipo === "foto") {

            nomeArquivo = `foto.${extensao}`;

        } else {

            nomeArquivo = `${crypto.randomUUID()}.${extensao}`;

        }

        const caminho = `profissionais/${profissionalId}/${tipo}/${nomeArquivo}`;

        const { error } = await supabase.storage
            .from("imagens")
            .upload(caminho, arquivo, {
                upsert: tipo === "foto"
            });

        if (error) {

            console.error("Erro ao enviar imagem:", error);
            return null;

        }

        const { data } = supabase.storage
            .from("imagens")
            .getPublicUrl(caminho);

        return data.publicUrl;

    }

    async function limparGaleria() {
        if (!profissionalId) return;

        const pasta = `profissionais/${profissionalId}/galeria`;

        const { data: arquivos, error } = await supabase.storage
            .from("imagens")
            .list(pasta);

        if (error) {

            console.error("Erro ao listar galeria:", error);
            return;

        }

        if (!arquivos?.length) return;

        const arquivosParaApagar = arquivos.map((arquivo) =>
            `${pasta}/${arquivo.name}`
        );

        const { error: erroDelete } = await supabase.storage
            .from("imagens")
            .remove(arquivosParaApagar);

        if (erroDelete) {

            console.error("Erro ao apagar galeria:", erroDelete);

        }
    }
    async function urlToFile(url, filename = 'foto.jpg', mimeType = 'image/jpeg') {
        const response = await fetch(url);
        const blob = await response.blob();
        return new File([blob], filename, { type: mimeType });
    }

} 
export default Dashboard;