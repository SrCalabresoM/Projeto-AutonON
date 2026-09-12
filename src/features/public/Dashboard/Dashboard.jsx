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
        if (!pagina) return;

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


    return (
    <>
        <div>
            <span onClick={() => {setEtapa(1)}} className={etapa == 1 ? 'px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium shadow-sm transition-all cursor-pointer' : 'cursor-pointer px-4 py-2 text-zinc-500 hover:text-zinc-800 transition-all'}>
                Identidade
            </span>

            <span onClick={() => {setEtapa(2)}} className={etapa == 2 ? 'px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium shadow-sm transition-all cursor-pointer' : 'cursor-pointer px-4 py-2 text-zinc-500 hover:text-zinc-800 transition-all'}>
                Apresentação
            </span>

            <span onClick={() => {setEtapa(3)}} className={etapa == 3 ? 'px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium shadow-sm transition-all cursor-pointer' : 'cursor-pointer px-4 py-2 text-zinc-500 hover:text-zinc-800 transition-all'}>
                Serviços
            </span>

            <span onClick={() => {setEtapa(4)}} className={etapa == 4 ? 'px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium shadow-sm transition-all cursor-pointer' : 'cursor-pointer px-4 py-2 text-zinc-500 hover:text-zinc-800 transition-all'}>
                Galeria
            </span>

            <span onClick={() => {setEtapa(5)}} className={etapa == 5 ? 'px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium shadow-sm transition-all cursor-pointer' : 'cursor-pointer px-4 py-2 text-zinc-500 hover:text-zinc-800 transition-all'}>
                Tema
            </span>

            <span onClick={() => {setEtapa(6)}} className={etapa == 6 ? 'px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium shadow-sm transition-all cursor-pointer' : 'cursor-pointer px-4 py-2 text-zinc-500 hover:text-zinc-800 transition-all'}>
                Disponibilidade
            </span>

        </div>
        <br></br>

        {etapa == 1 && (
            <div>
                <h2>Identidade</h2>
                <Identidade 
                    nome={nome}
                    setNome={setNome}
                    titulo={titulo}
                    setTitulo={setTitulo}
                    foto={foto}
                    setFoto={setFoto}
                />
                
            </div>
        )}

        {etapa == 2 && (
            <div>
                <h2>Apresentação</h2>
                <Apresentação 
                    content={content}
                    setContent={setContent}
                />
            </div>
        )}

        {etapa == 3 && (
            <div>
                <h2>Serviços</h2>
                <Servicos 
                    servicos={servicos}
                    setServicos={setServicos}
                />
                
            </div>
        )}

        {etapa == 4 && (
            <div>
                <h2>Galeria</h2>
                <Galeria 
                    imagens={imagens}
                    setImagens={setImagens}
                />
                
            </div>
        )}

        {etapa == 5 && (
            <div>
                <h2>Tema</h2>
                <Tema
                    temaSelecionado={temaSelecionado}
                    setTemaSelecionado={setTemaSelecionado}
                />
                
            </div>
        )}

        {etapa == 6 && (
            <div>
                <h2>Disponibilidade</h2>
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
        <br></br>

        {/*botões*/}
        {etapa > 1 && (
            <button className="px-4 py-2 text-sm font-medium text-zinc-600 bg-white border border-zinc-200 rounded-lg hover:bg-zinc-50 active:bg-zinc-100 transition-colors" onClick={() => setEtapa(etapa - 1)}>
                Voltar
            </button>
        )}

        {etapa <= 5 && (
            <button className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 active:bg-indigo-800 shadow-sm transition-colors" onClick={() => setEtapa(etapa + 1)}>
                Continuar
            </button>
        )}

        {etapa === 6 && (
            <button className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 active:bg-emerald-800 shadow-sm transition-colors" onClick={() => salvar()}>
                Salvar
            </button>
        )}
    </>
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