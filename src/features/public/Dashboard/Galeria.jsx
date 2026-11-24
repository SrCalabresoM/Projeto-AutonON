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
            <label htmlFor="galeria" className="inline-block bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium px-4 py-2 rounded-md cursor-pointer transition-colors">
                Selecionar imagens
            </label>

            <input
                id="galeria"
                className="hidden"
                type="file"
                accept="image/*"
                multiple
                onChange={adicionarImagens}
            />

            <div className="flex flex-wrap gap-3 mt-4">

                {imagens.map((imagem, index) => (

                    <div
                        key={index}
                        className="relative w-16 h-16"
                    >

                        <img src={URL.createObjectURL(imagem)} alt="" className="w-full h-full object-cover rounded-md border border-gray-200"/>

                        <button onClick={() => removerImagem(index)} className="absolute -top-2 -right-2 bg-white hover:bg-red-50 text-gray-700 hover:text-red-600 p-0.5 rounded-full shadow-sm border border-gray-200 transition-colors flex items-center justify-center text-xs">🗑</button>

                    </div>

                ))}

            </div>
        </>


    );

}

export default Galeria;