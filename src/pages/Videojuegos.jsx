import axios from 'axios';
import { useEffect, useState } from 'react';
import { LuPencil, LuTrash } from "react-icons/lu";
import { VideojuegoModal } from '../components/VideojuegoModal';
import { ToastContainer, toast } from 'react-toastify';

function VideoJuego() {
  const [videojuegos, setvideojuegos] = useState([]);
  const [tiposVideojuego, setTiposVideojuego] = useState([]);
  const [isModalShow, setIsModalShow] = useState(false);
  const [currentVideojuego, setCurrentVideojuego] = useState({});

  useEffect(() => {
    fetchVideojuegos();
    fetchTiposVideojuego();
  }, []);

  const fetchVideojuegos = async () => {
    try {
      const response = await axios.get(import.meta.env.VITE_TORNEO_ENDPOINT + '/listar-videojuegos');
      if (response.status === 200) {
        console.log(response.data);
        setvideojuegos(response.data.data);
      }
    } catch (error) {
      console.error("Error al cargar videojuegos", error);
    }
  };

  const fetchTiposVideojuego = async () => {
    try {
      const response = await axios.get(import.meta.env.VITE_TORNEO_ENDPOINT + '/listar-tipo');
      setTiposVideojuego(response.data.data);
    } catch (error) {
      console.error("Error al cargar tipos", error);
    }
  };

  const setModalEditInfo = (videojuego_id) => {
    setIsModalShow(true);
    setCurrentVideojuego(videojuego_id);
  };

  const handleChangeVideojuego = (event) => {
    setCurrentVideojuego({
      ...currentVideojuego,
      [event.name]: event.value
    });
  };

  const createOrUpdateVideojuego = async () => {
    const data = {
      nombre: currentVideojuego.nombre,
      tipo_id: currentVideojuego.tipo_id,
    };

    if (currentVideojuego.videojuego_id) {
      try {
        await axios.put(
          import.meta.env.VITE_TORNEO_ENDPOINT + '/actualizar-videojuego/' + currentVideojuego.videojuego_id, data
        );
        toast("Actualización exitosa");
        setIsModalShow(false);
        fetchVideojuegos();
      } catch (error) {
        console.error("Error al actualizar", error);
      }
    } else {
      try {
        await axios.post(
          import.meta.env.VITE_TORNEO_ENDPOINT + '/creategame/' + currentVideojuego.tipo_id,
          { ...data, premio: "Lo que sea" }
        );
        toast("Creación exitosa");
        setIsModalShow(false);
        fetchVideojuegos();
      } catch (error) {
        console.error("Error al crear", error);
      }
    }
  };

  const removeVideojuego = async (videojuegoId) => {
    const isConfirm = confirm("¿Estás seguro que deseas borrar?");
    if (isConfirm) {
      try {
        await axios.delete(import.meta.env.VITE_TORNEO_ENDPOINT + '/eliminar-videojuego/' + videojuegoId);
        toast("Eliminación exitosa");
        fetchVideojuegos();
      } catch (error) {
        console.error("Error al eliminar", error);
      }
    }
  };

  const openVideojuegoModal = () => {
    setCurrentVideojuego({});
    setIsModalShow(true);
  };

  return (
    <>
      <VideojuegoModal
        tiposVideojuego={tiposVideojuego}
        videojuego={currentVideojuego}
        isShow={isModalShow}
        onClose={() => setIsModalShow(false)}
        onChangeVideoJuego={(e) => handleChangeVideojuego(e)}
        onSubmit={() => createOrUpdateVideojuego()}
      />

      <div className="min-h-screen bg-gray-100 flex flex-col items-center py-16 px-4">
        <h1 className="text-4xl font-bold text-black mb-8">Videojuegos</h1>
        <button className='bg-green-700 text-white rounded shadow-md p-2 my-4' onClick={openVideojuegoModal}>
          Crear Videojuego
        </button>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className='px-6 py-3'>Nombre</th>
                <th className='px-6 py-3'>Tipo</th>
                <th className='px-6 py-3'></th>
              </tr>
            </thead>
            <tbody>
              {videojuegos.length > 0 ? videojuegos.map((v) => (
                <tr key={v.id} className="odd:bg-white even:bg-gray-50 dark:odd:bg-gray-900 dark:even:bg-gray-800 border-b dark:border-gray-700">
                  <td className='px-6 py-3'>{v.nombre}</td>
                  <td className='px-6 py-3'>{v.tipo.tipo}</td>
                  <td className='px-6 py-3'>
                    <button onClick={() => setModalEditInfo(v)} className='bg-blue-600 text-white rounded p-2 mr-2'><LuPencil /></button>
                    <button onClick={() => removeVideojuego(v.id)} className='bg-red-600 text-white rounded p-2'><LuTrash /></button>
                  </td>
                </tr>
              )) : (
                <tr><td colSpan="3" className="text-center py-4">No hay videojuegos registrados</td></tr>
              )}
            </tbody>
          </table>
        </div>

        <ToastContainer />
      </div>
    </>
  );
}

export default VideoJuego;
