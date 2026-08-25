function Identidade({nome, setNome, foto, setFoto, titulo, setTitulo}) {

    const handleFoto = (e) => {
        const arquivo = e.target.files[0];

        if (arquivo) {
            setFoto(arquivo);
        }
    };

    return (
        <>
            <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">Nome da Marca</label>
                <input
                    className="w-full px-3 py-2 border border-zinc-300 rounded-lg text-sm shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    type="text"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">Slogan</label>
                <input
                    className="w-full px-3 py-2 border border-zinc-300 rounded-lg text-sm shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    type="text"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">Foto</label>

                <input
                    className="w-full text-sm text-zinc-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-zinc-100 file:text-zinc-700 hover:file:bg-zinc-200 cursor-pointer"
                    type="file"
                    accept="image/*"
                    onChange={handleFoto}
                />

                {foto && (
                    <img
                        className="mt-3 max-w-xs h-auto rounded-lg border border-zinc-200 object-cover shadow-sm"
                        src={URL.createObjectURL(foto)}
                        alt="Preview"
                    />
                )}
            </div>

        </>

    )
}

export default Identidade;