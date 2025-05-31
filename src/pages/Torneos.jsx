import axios from 'axios';
import { useEffect, useState } from 'react';
import { LuPencil, LuTrash } from "react-icons/lu";
import { TournamentModal } from '../components/TournamentModal';
import { ToastContainer, toast } from 'react-toastify';


function Torneo() {
  const [Torneos, setTorneos] = useState([]);
  const [isModalShow, setIsModalShow] = useState(false);
  const [currentTorneo, setCurrentTorneo] = useState({});
  const [videojuegos, setVideojuegos] = useState([]);

  useEffect(() => {
    fetchTorneos();
    fetchVideojuegos();
  }, []);

  const fetchTorneos = async () => {
    try {
      const response = await axios.get(import.meta.env.VITE_TORNEO_ENDPOINT + '/listar-torneos')
      if (response.status === 200) {
        setTorneos(response.data.data);
      }
    } catch (error) {
      console.error("Error al cargar torneos", error);
    }
  };

  const fetchVideojuegos = () => {
    axios.get(import.meta.env.VITE_TORNEO_ENDPOINT + '/listar-videojuegos')
      .then((response) => setVideojuegos(response.data.data))
      .catch(error => console.error(error));
  };

  const setModalEditInfo = (torneo) => {
    setIsModalShow(true);
    setCurrentTorneo(torneo);
  };

  const handleChangeTorneo = (event) => {
    setCurrentTorneo({
      ...currentTorneo,
      [event.name]: event.value
    });
  };

  const createOrUpdateTorneo = async () => {
    const data = {
      nombre: currentTorneo.nombre,
      limite_equipos: currentTorneo.limite_equipos,
      modalidad: currentTorneo.modalidad,
      videojuego_id: currentTorneo.videojuego_id
    };

    if (currentTorneo.id_torneo) {
      try {
        await axios.put(
          import.meta.env.VITE_TORNEO_ENDPOINT + '/actualizar-torneo/' + currentTorneo.id_torneo, data);
        toast("Actualización exitosa");
        setIsModalShow(false);
        fetchTorneos();
      } catch (error) {
        console.error("Error al actualizar torneo", error);
      }
    } else {
      try {
        await axios.post(
          import.meta.env.VITE_TORNEO_ENDPOINT + '/create-tournament',
          { ...data, premio: "Lo que sea" }
        );
        toast("Creación exitosa");
        setIsModalShow(false);
        fetchTorneos();
      } catch (error) {
        console.error("Error al crear torneo", error);
      }
    }
  };

  const removeTorneo = async (torneo_id) => {
    if (confirm("Estas seguro que deseas borrar?")) {
      try {
        await axios.delete(import.meta.env.VITE_TORNEO_ENDPOINT + '/eliminar-torneo/' + currentTorneo.videojuego_id);
        toast("Eliminación exitosa");
        fetchTorneos();
      } catch (error) {
        console.error("Error al eliminar torneo", error);
      }
    }
  };

  const openTournamentModal = () => {
    setCurrentTorneo({});
    setIsModalShow(true);
  };

  return (
    <>
      <TournamentModal
        videojuegos={videojuegos}
        torneo={currentTorneo}
        isShow={isModalShow}
        onClose={() => setIsModalShow(false)}
        onChangeTorneo={handleChangeTorneo}
        onSubmit={createOrUpdateTorneo}
      />
      <div className="min-h-screen bg-gray-100 flex flex-col items-center py-16 px-4">
        <h1 className="text-4xl font-bold text-black mb-8">Torneos</h1>
        <button className="bg-green-700 text-white rounded shadow-md p-2 my-4" onClick={openTournamentModal}>
          Crear Torneo
        </button>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="px-6 py-3">Nombre del torneo</th>
                <th className="px-6 py-3">Límite de jugadores</th>
                <th className="px-6 py-3">Modalidad</th>
                <th className="px-6 py-3">Videojuego</th>
                <th className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {Torneos.map(torneo => (
                <tr key={torneo.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                  <td className="px-6">{torneo.nombre}</td>
                  <td className="px-6">{torneo.limite_equipos}</td>
                  <td className="px-6">{torneo.modalidad}</td>
                  <td className="px-6">{torneo.videojuego.nombre}</td>
                  <td className="px-6">
                    <button onClick={() => setModalEditInfo(torneo)} className="bg-blue-600 text-white rounded p-2 mr-2 my-2">
                      <LuPencil />
                    </button>
                    <button onClick={() => removeTorneo(torneo.torneo_id)} className="bg-red-600 text-white rounded p-2 my-2">
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

export default Torneo;
