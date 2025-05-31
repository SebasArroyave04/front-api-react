import axios from 'axios';
import { useEffect, useState } from 'react';
import { LuPencil, LuTrash } from "react-icons/lu";
import { JugadoresModal } from '../components/JugadoresModal';
import { ToastContainer, toast } from 'react-toastify';

function Jugadores() {
  const [Jugadores, setJugadores] = useState([]);
  const [isModalShow, setIsModalShow] = useState(false);
  const [currentJugadores, setCurrentJugadores] = useState({});

  useEffect(() => {
    fetchJugadores();
  }, []);

  const fetchJugadores = async () => {
    try {
      const response = await axios.get(import.meta.env.VITE_TORNEO_ENDPOINT + '/listar-jugadores');
      if (response.status === 200) {
        setJugadores(response.data.data);
      }
    } catch (error) {
      console.error("Error al cargar jugadores", error);
    }
  };

  const setModalEditInfo = (Jugadores) => {
    setIsModalShow(true);
    setCurrentJugadores(Jugadores);
  };

  const handleChangeJugadores = (event) => {
    setCurrentJugadores({
      ...currentJugadores,
      [event.name]: event.value
    });
  };

  const createOrUpdateJugadores = async () => {
    const data = {
      nombre: currentJugadores.nombre,
      nickname: currentJugadores.nickname,
      correo: currentJugadores.correo,
      pais: currentJugadores.pais
    };

    if (currentJugadores.id_jugador) {
      try {
        await axios.put(
          import.meta.env.VITE_TORNEO_ENDPOINT + '/actualizar-jugador/' + currentJugadores.id_jugador, data);
        toast("Actualización exitosa");
        setIsModalShow(false);
        fetchJugadores();
      } catch (error) {
        console.error("Error al actualizar jugadores", error);
      }
    } else {
      try {
        await axios.post(
          import.meta.env.VITE_TORNEO_ENDPOINT + '/crearjugador' , data);
        toast("Creación exitosa");
        setIsModalShow(false);
        fetchJugadores();
      } catch (error) {
        console.error("Error al registar jugador", error);
      }
    }
  };

  const removeJugadores = async (JugadoresId) => {
    if (confirm("Estas seguro que deseas borrar?")) {
      try {
        await axios.delete(import.meta.env.VITE_TORNEO_ENDPOINT + '/eliminar-jugador/' + JugadoresId);
        toast("Eliminación exitosa");
        fetchJugadores();
      } catch (error) {
        console.error("Error al eliminar jugador", error);
      }
    }
  };

  const openJugadoresModal = () => {
    setCurrentJugadores({});
    setIsModalShow(true);
  };

  return (
    <>
      <JugadoresModal
        Jugadores={currentJugadores}
        isShow={isModalShow}
        onClose={() => setIsModalShow(false)}
        onChangeJugadores={handleChangeJugadores}
        onSubmit={createOrUpdateJugadores}
      />
      <div className="min-h-screen bg-gray-100 flex flex-col items-center py-16 px-4">
        <h1 className="text-4xl font-bold text-black mb-8">Jugadores</h1>
        <button className="bg-green-700 text-white rounded shadow-md p-2 my-4" onClick={openJugadoresModal}>
          Registrar Jugadores
        </button>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="px-6 py-3">Nombre</th>
                <th className="px-6 py-3">Nickname</th>
                <th className="px-6 py-3">Correo</th>
                <th className="px-6 py-3">Pais</th>
                <th className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {Jugadores.map(Jugadores => (
                <tr key={Jugadores.id_jugador} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                  <td className="px-6">{Jugadores.nombre}</td>
                  <td className="px-6">{Jugadores.nickname}</td>
                  <td className="px-6">{Jugadores.correo}</td>
                  <td className="px-6">{Jugadores.pais}</td>
                  <td className="px-6">
                    <button onClick={() => setModalEditInfo(Jugadores)} className="bg-blue-600 text-white rounded p-2 mr-2 my-2">
                      <LuPencil />
                    </button>
                    <button onClick={() => removeJugadores(Jugadores.id_jugador)} className="bg-red-600 text-white rounded p-2 my-2">
                      <LuTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ToastContainer />
      </div>
    </>
  );
}

export default Jugadores;
