function Galeria({imagens, setImagens}) {

    function adicionarImagens(e) {

        const arquivos = Array.from(e.target.files);

        setImagens([
            ...imagens,
            ...arquivos
        ]);

    }

    function removerImagem(index) {

        const novasImagens = imagens.filter((_, i) => i !== index);

        setImagens(novasImagens);

    }

    return (
         <>
            <input
                className="w-full text-sm text-zinc-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-zinc-100 file:text-zinc-700 hover:file:bg-zinc-200 cursor-pointer"
                type="file"
                accept="image/*"
                multiple
                onChange={adicionarImagens}
            />

            <div className="flex flex-wrap gap-4 mt-4">

                {imagens.map((imagem, index) => (

                    <div
                        key={index}
                        className="relative w-40 h-40"
                    >

                        <img src={URL.createObjectURL(imagem)} alt="" className="w-full h-full object-cover rounded-lg border border-zinc-200 shadow-sm"/>

                        <button onClick={() => removerImagem(index)} className="absolute top-2 right-2 bg-white/95 hover:bg-white text-zinc-800 hover:text-red-600 p-1.5 rounded-full shadow-lg border border-zinc-300/50 shadow-black/40 backdrop-blur-sm transition-colors flex items-center justify-center text-xs">🗑</button>

                    </div>

                ))}

            </div>
        </>


    );

}

export default Galeria;