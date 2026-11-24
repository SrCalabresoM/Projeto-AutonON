import { useState } from "react";
import useForm from "../../shared/hooks/useForm.jsx";
import { useAuth } from "../../shared/useAuth.jsx";
import { supabase } from "../../lib/supabase.js"
import { Link } from "react-router-dom";

function Cadastro() {
  //declaração de estados e hooks
    const { user, setUser } = useAuth();
  const { valores, onChange } = useForm({ 
    nome: "",
    email: "",
    username: "",
    password: "",
    password2: ""
  });

  const [erros, setErros] = useState({});
  const [loading, setLoading] = useState(false);

  async function enviar() {
    //valida 
    if (!validar()) {
        return;
    }

    //função do signup
    let { data, error } = await supabase.auth.signUp({
      email: valores.email,
      password: valores.password
    });

    if (error) {
      console.log(error);
      return;
    }

    const user = data.user;
    
    //conecta o signup com a tabela profissionais
    const { error: insertError } = await supabase
      .from("profissionais")
      .insert([
        {
          user_id: user.id,
          nome: valores.nome,
          username: valores.username.toLowerCase()
        }
      ]);

    if (insertError) {
      console.log(insertError);
      return;
    }

}

  //assegura envio
  async function fletchEnvio(e) { 
    e.preventDefault();
    setLoading(true)

    try {
      await enviar()
    } catch (erro) {
      console.error(erro)
    } finally {
      setLoading(false)
    }
  }

  //vai validar os campos no enviar
  function validar() {
  const novosErros = {};

  if (valores.nome.trim() === "") {
    novosErros.nome = "Nome é obrigatório";
  }
  if (valores.password !== valores.password2) {
    novosErros.password = "As senhas não coincidem";
  }
  setErros(novosErros);

  return Object.keys(novosErros).length === 0;
}


  return (
  <div className="bg-[#F6F7F3] text-[#212529] flex flex-col min-h-screen overflow-x-hidden font-sans antialiased">
    <style>{`
      body {
        font-family: 'Work Sans', sans-serif !important;
        font-weight: 400;
      }

      h1, h2, h3, h4, h5, h6,
      .font-display {
        font-family: 'Raleway', sans-serif !important;
      }

      p, label, input, button, a, nav, select, option {
        font-family: 'Work Sans', sans-serif !important;
      }
    `}</style>

    <main className="flex-1 flex items-center justify-center px-4 py-10 sm:px-[8%] lg:py-16">
      <section className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
        <div className="order-2 lg:order-1 flex flex-col items-center justify-center text-center min-h-[280px] lg:min-h-[520px]">
          <div className="w-full max-w-md aspect-square bg-white border border-[#E2E4DC] rounded-3xl flex items-center justify-center p-6 shadow-sm">
            <div className="w-full h-full flex flex-col items-center justify-center">
              <span className="block w-full h-4/5 mb-2 overflow-hidden rounded-2xl">
                <img
                  src="./imagens/arandu-mascot-review.png"
                  alt="Harpy, mascote oficial do Arandu"
                  className="w-full h-full object-contain rounded-2xl"
                />
              </span>

              <p className="text-[#2563eb] font-semibold text-sm">Harpy</p>

              <p className="text-slate-500 text-xs mt-1">Mascote oficial do Arandu</p>
            </div>
          </div>
        </div>

        <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
          <div className="bg-white border border-[#E2E4DC] text-[#212529] w-full max-w-md p-6 sm:p-8 rounded-2xl shadow-sm">
            <h1 className="font-display text-2xl font-bold text-center text-[#1e293b] mb-6">
              Criar Conta
            </h1>

            <form id="form-cadastro" className="flex flex-col gap-4" onSubmit={fletchEnvio}>
              <div className="flex flex-col gap-1">
                <label htmlFor="nome" className="text-xs font-semibold text-slate-700">Nome:</label>
                <input id="nome" name="nome" type="text" required value={valores.nome} onChange={onChange} className="w-full border border-[#CBD5E1] bg-[#F9FAFB] rounded-lg px-3 py-2 text-sm text-[#212529] outline-none focus:bg-white focus:border-[#2563eb] focus:ring-1 focus:ring-[#2563eb] transition-all" />
              </div>
              {erros.nome && <div className="text-red-500 text-xs mt-1 mb-2">{erros.nome}</div>}

              <div className="flex flex-col gap-1">
                <label htmlFor="username" className="text-xs font-semibold text-slate-700">Nome de usuário:</label>
                <input id="username" name="username" type="text" required value={valores.username} onChange={onChange} className="w-full border border-[#CBD5E1] bg-[#F9FAFB] rounded-lg px-3 py-2 text-sm text-[#212529] outline-none focus:bg-white focus:border-[#2563eb] focus:ring-1 focus:ring-[#2563eb] transition-all" />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="email" className="text-xs font-semibold text-slate-700">E-mail:</label>
                <input id="email" name="email" type="email" required value={valores.email} onChange={onChange} className="w-full border border-[#CBD5E1] bg-[#F9FAFB] rounded-lg px-3 py-2 text-sm text-[#212529] outline-none focus:bg-white focus:border-[#2563eb] focus:ring-1 focus:ring-[#2563eb] transition-all" />
              </div>
              {erros.email && <div className="text-red-500 text-xs mt-1 mb-2">{erros.email}</div>}

              <div className="flex flex-col gap-1">
                <label htmlFor="password" className="text-xs font-semibold text-slate-700">Senha:</label>
                <input id="password" name="password" type="password" required value={valores.password} onChange={onChange} className="w-full border border-[#CBD5E1] bg-[#F9FAFB] rounded-lg px-3 py-2 text-sm text-[#212529] outline-none focus:bg-white focus:border-[#2563eb] focus:ring-1 focus:ring-[#2563eb] transition-all" />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="password2" className="text-xs font-semibold text-slate-700">Digite a senha novamente:</label>
                <input id="password2" name="password2" type="password" required value={valores.password2} onChange={onChange} className="w-full border border-[#CBD5E1] bg-[#F9FAFB] rounded-lg px-3 py-2 text-sm text-[#212529] outline-none focus:bg-white focus:border-[#2563eb] focus:ring-1 focus:ring-[#2563eb] transition-all" />
              </div>
              {erros.password && <div className="text-red-500 text-xs mt-1 mb-2">{erros.password}</div>}

              <button
                type="submit"
                disabled={loading}
                className="font-display mt-2 w-full bg-[#2563eb] hover:bg-[#1d4ed8] active:scale-[0.98] text-white py-2.5 rounded-lg font-semibold flex items-center justify-center transition-all cursor-pointer shadow-sm disabled:bg-blue-300 disabled:cursor-not-allowed"
              >
                <span className="text-base">{loading ? "Enviando..." : "🐰 Enviar 🐰"}</span>
              </button>

              <p className="mt-2 text-xs text-slate-600 flex items-center justify-center gap-1">
                Já tem uma conta?
                <Link to="/login" className="text-[#2563eb] font-semibold hover:underline">
                  Fazer Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </section>
    </main>
  </div>
);


}


export default Cadastro;