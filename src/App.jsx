
import { useState } from 'react'
import { BrowserRouter, Link, useLocation } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes.jsx'
import { AuthContextProvider } from './shared/useAuth.jsx'
import { useAuth } from './shared/useAuth.jsx'


function AppContent() {
  const { user, perfil } = useAuth();
  const location = useLocation();

  const paginaPublica = location.pathname.startsWith('/a/');

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">

      {!paginaPublica && (

        <header className="w-full flex flex-wrap items-center justify-between gap-4 px-4 sm:px-[2%] lg:px-[1%] py-3 sm:py-4 bg-[#F0EBE5]/55 backdrop-blur-xl border-b border-white/40 sticky top-0 z-50 shadow-sm">

         <div className="flex items-center gap-3 sm:gap-5">
          <Link to="/" className="group flex items-center shrink-0 rounded-lg p-2 transition-colors duration-300 hover:bg-black/5" aria-label="Ir para a página inicial">
            <img
              src="/imagens/autonon-logo.svg"
              alt="AutonON"
              className="w-[110px] sm:w-[150px] h-auto"
            />
          </Link>

          <Link
            to="/sobrenos"
            className="text-xs sm:text-sm font-semibold text-[#2A2829]/75 hover:text-[#263A99] transition-colors"
          >
            Sobre nós
          </Link>
        </div>

        <nav className="flex flex-1 flex-wrap items-center justify-end gap-4 sm:gap-6 text-sm font-semibold text-[#2A2829]">

          <Link
            to={user ? "/dashboard" : "/login"}
            className="shrink-0 font-display bg-[#263A99] text-white py-2.5 px-4 sm:px-5 rounded-full text-xs sm:text-sm font-semibold transition-colors hover:bg-[#2A2829] shadow-sm"
          >
            {user ? "Meu Dashboard" : "Acessar AutonON"}
          </Link>
           

            <Link
              to={user ? "/perfil" : "/cadastro"}
              className="hover:text-[#263A99] transition-colors"
            >
              {user ? perfil?.nome || "Perfil" : "Cadastro"}
            </Link>

          </nav>

        </header>

      )}

      {paginaPublica ? (

        <AppRoutes />

      ) : (

        <main className="container mx-auto p-4 md:p-8">
          <AppRoutes />
        </main>

      )}

    </div>
  );

}

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <AppContent />
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
