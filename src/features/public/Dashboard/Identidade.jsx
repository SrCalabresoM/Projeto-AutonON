function Identidade({nome, setNome, foto, setFoto, titulo, setTitulo, num, setNum}) {

    const handleFoto = (e) => {
        const arquivo = e.target.files[0];

        if (arquivo) {
            setFoto(arquivo);
        }
    };

    return (
        <>
            <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Nome da Marca</label>
                <input
                    className="w-full h-10 rounded-md border border-gray-300 bg-white px-3 text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                    type="text"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                />
            </div>

            <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Slogan</label>
                <input
                    className="w-full h-10 rounded-md border border-gray-300 bg-white px-3 text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                    type="text"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                />
            </div>

            <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Número de Telefone (Ex: 5516999999999)</label>
                <input
                    className="w-full h-10 rounded-md border border-gray-300 bg-white px-3 text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={num??""}
                    onChange={(e) => setNum(e.target.value.replace(/\D/g, ""))}
                />
            </div>

            <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Foto</label>

                <input
                    className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200 cursor-pointer"
                    type="file"
                    accept="image/*"
                    onChange={handleFoto}
                />

                {foto && (
                    <img
                        className="mt-3 w-12 h-12 rounded-full border border-gray-200 object-cover"
                        src={URL.createObjectURL(foto)}
                        alt="Preview"
                    />
                )}
            </div>

        </>

    )
}

export default Identidade;