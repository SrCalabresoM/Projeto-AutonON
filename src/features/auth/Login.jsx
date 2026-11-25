import { useState } from "react";
import useForm from "../../shared/hooks/useForm.jsx";
import { useAuth } from "../../shared/useAuth.jsx";
import { supabase } from "../../lib/supabase.js";
import { Toaster, toast } from 'sonner';
import { Eye, EyeOff } from "lucide-react";

function Login() {

  //declaração de estados e hooks
    const { user, setUser } = useAuth();
  const { valores, onChange } = useForm({
    email: "",
    password: "",
  });

  const [showPass, setShowPass] = useState(false)
  const [erros, setErros] = useState({});
  const [loading, setLoading] = useState(false);

  async function enviar() {
    //valida
    if (!validar()) {
        return;
    }

    //função do login
    let { data, error } = await supabase.auth.signInWithPassword({
      email: valores.email,
      password: valores.password
    });


    if (error) {
            toast.error(error.message);
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
      toast.error(erro.message);
    } finally {
      setLoading(false);
      toast.success("Login realizado com sucesso");s
    }
  }
  
  //validação
  function validar() {
  const novosErros = {};

  if (valores.password.trim() === "") {
    novosErros.password = "Senha é obrigatória";
  }
    if (!valores.email.endsWith("@gmail.com")) {
    novosErros.email = "Email inválido";
  }
  setErros(novosErros);

  return Object.keys(novosErros).length === 0;
}

  
  return (
  <div className="bg-[#F6F7F3] text-[#212529] flex items-center justify-center min-h-screen font-sans antialiased">
    <style>{`
      @font-face { font-family: 'Raleway'; src: url('./fonts/Raleway-Regular.ttf') format('truetype'); font-weight: 400; font-style: normal; font-display: swap; }
      @font-face { font-family: 'Raleway'; src: url('./fonts/Raleway-Medium.ttf') format('truetype'); font-weight: 500; font-style: normal; font-display: swap; }
      @font-face { font-family: 'Raleway'; src: url('./fonts/Raleway-SemiBold.ttf') format('truetype'); font-weight: 600; font-style: normal; font-display: swap; }
      @font-face { font-family: 'Raleway'; src: url('./fonts/Raleway-Bold.ttf') format('truetype'); font-weight: 700; font-style: normal; font-display: swap; }
      @font-face { font-family: 'Raleway'; src: url('./fonts/Raleway-ExtraBold.ttf') format('truetype'); font-weight: 800; font-style: normal; font-display: swap; }
      @font-face { font-family: 'Raleway'; src: url('./fonts/Raleway-Black.ttf') format('truetype'); font-weight: 900; font-style: normal; font-display: swap; }
      @font-face { font-family: 'Work Sans'; src: url('./fonts/WorkSans-Regular.ttf') format('truetype'); font-weight: 400; font-style: normal; font-display: swap; }
      @font-face { font-family: 'Work Sans'; src: url('./fonts/WorkSans-Bold.ttf') format('truetype'); font-weight: 700; font-style: normal; font-display: swap; }
      body, body * {
        font-family: 'Work Sans', ui-sans-serif, system-ui, sans-serif !important;
      }
      body h1, body h2, body h3, body h4, body h5, body h6,
      body .font-heading, body .font-heading * {
        font-family: 'Raleway', 'Work Sans', ui-sans-serif, system-ui, sans-serif !important;
      }
    `}</style>

    <div className="relative py-3 sm:max-w-xs sm:mx-auto w-full px-4 sm:px-0">
      <Toaster position="bottom-center" richColors /> 
    
      <form onSubmit={fletchEnvio} className="min-h-96 px-8 py-8 mt-4 text-left bg-white border border-[#E2E4DC] rounded-2xl shadow-sm">
        <div className="flex flex-col justify-center items-center h-full select-none">
          <div className="flex flex-col items-center justify-center gap-2 mb-6">
            <div className="w-10 h-10 bg-[#2563eb] rounded-xl flex items-center justify-center shadow-sm">
              <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24">
                <path d="M12,2L4.5,20.29L5.21,21L12,18L18.79,21L19.5,20.29L12,2Z" />
              </svg>
            </div>
            <p className="font-heading m-0 text-lg font-bold text-[#1e293b] mt-1">
              Faça login na sua conta
            </p>
            <span className="m-0 text-xs max-w-[90%] text-center text-slate-500">
              Entre com suas credenciais para acessar sua conta.
            </span>
          </div>

          <div className="w-full flex flex-col gap-1.5">
            <label htmlFor="email" className="font-semibold text-xs text-slate-700">E-mail</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Digite seu e-mail"
              required
              value={valores.email}
              onChange={onChange}
              className="border border-[#CBD5E1] bg-[#F9FAFB] rounded-lg px-3 py-2.5 mb-4 text-sm w-full outline-none text-[#212529] placeholder-slate-400 focus:bg-white focus:border-[#2563eb] focus:ring-1 focus:ring-[#2563eb] transition-all"
            />
            {erros.email && <div className="text-red-500 text-xs mt-1 mb-2">{erros.email}</div>}
          </div>

          <div className="w-full flex flex-col gap-1.5">
            <label htmlFor="password" className="font-semibold text-xs text-slate-700">Senha</label>
            <div className="relative mb-6">
            <input
              id="password"
              name="password"
              type={showPass ? "text" : "password"} 
              placeholder="Digite aqui"
              required
              value={valores.password}
              onChange={onChange}
              className="border border-[#CBD5E1] bg-[#F9FAFB] rounded-lg px-3 py-2.5 text-sm w-full outline-none text-[#212529] placeholder-slate-400 focus:bg-white focus:border-[#2563eb] focus:ring-1 focus:ring-[#2563eb] transition-all"
            />
            <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-[#2563eb]">
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
            </div>
            {erros.password && <div className="text-red-500 text-xs mt-1 mb-2">{erros.password}</div>}
          </div>
        </div>

        <div>
          <button
            type="submit"
            disabled={loading}
            className="font-heading py-2.5 px-8 bg-[#2563eb] hover:bg-[#1d4ed8] active:scale-[0.98] text-white w-full transition duration-200 text-center text-sm font-semibold shadow-sm rounded-lg cursor-pointer select-none disabled:bg-blue-300 disabled:cursor-not-allowed"
          >
            {loading ? "Enviando..." : "Entrar"}
          </button>
        </div>
      </form>
    </div>
  </div>
);



}


export default Login;