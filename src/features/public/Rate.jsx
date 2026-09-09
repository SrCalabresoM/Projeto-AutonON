import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../shared/useAuth';

const Rate = ({paginaId, setNota}) => {

  const [hoverIndex, setHoverIndex] = useState(-1);
  const { user } = useAuth();

  const salvarVoto = async (paginaId, usuarioId, novaNota) => {
    const { data, error } = await supabase
      .from('avaliacoes')
      .upsert(
        { 
          pagina_id: paginaId, 
          usuario_id: usuarioId, 
          nota: novaNota 
        }, 
        { onConflict: 'pagina_id, usuario_id' } 
      );

    if (error) {
      console.error('Erro ao registrar voto:', error.message);
    } else {
      console.log('Voto computado/atualizado com sucesso!');
    }
  };


  return (
   <>
      <div className="flex items-center gap-1" onMouseLeave={() => setHoverIndex(-1)}>
      {[...Array(5)].map((_, index) => {
       
        const starHover = index <= hoverIndex;

        return (
          <svg
            key={index}
            onClick={() => {
              salvarVoto(paginaId, user.id, index+1);
              setNota(index+1);
            }}
            onMouseEnter={() => setHoverIndex(index)}
            className={`w-8 h-8 text-yellow-400 stroke-current stroke-2 cursor-pointer transition-colors duration-200 
              ${starHover ? "fill-current" : "fill-none"}`}
            xmlns="http://w3.org"
            viewBox="0 0 24 24"
          >
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        );
      })}
    </div>
   </>
  );
}

export default Rate;
