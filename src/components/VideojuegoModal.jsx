export const VideojuegoModal = ({
  tiposVideojuego,
  videojuego,
  isShow,
  onClose,
  onChangeVideoJuego,
  onSubmit
}) => {
  if (!isShow) return null;

  const handleChange = (event) => {
    onChangeVideoJuego({
      name: event.target.name,
      value: event.target.value
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative p-6 w-full max-w-md bg-white rounded-lg shadow-lg dark:bg-gray-700">
        <div className="flex items-center justify-between mb-4 border-b pb-2 dark:border-gray-600">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Crear nuevo videojuego
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-lg p-1"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form className="space-y-4">
          <div>
            <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 dark:text-white">
              Nombre del videojuego
            </label>
            <input
              value={videojuego.nombre}
              onChange={handleChange}
              type="text"
              id="nombre"
              name="nombre"
              placeholder="Nombre del videojuego"
              className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
              required
            />
          </div>

          <div>
            <label htmlFor="tipo_id" className="block text-sm font-medium text-gray-700 dark:text-white">
              Tipo de videojuego
            </label>
            <select
              value={videojuego.tipo_id || ""}
              onChange={handleChange}
              id="tipo_id"
              name="tipo_id"
              className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
              required
            >
              <option value="">Selecciona un tipo de videojuego</option>
              {tiposVideojuego.map((tipo) => (
                <option key={tipo.tipo_id} value={tipo.tipo_id}>
                  {tipo.nombre}
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            onClick={onSubmit}
            className="w-full inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 5a1 1 0 011 1v3h3a1 1 0 010 2h-3v3a1 1 0 01-2 0v-3H6a1 1 0 010-2h3V6a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            Guardar
          </button>
        </form>
      </div>
    </div>
  );
};
