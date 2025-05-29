import axios from 'axios';
import { useEffect, useState } from 'react';
import { LuPencil, LuTrash } from "react-icons/lu";
import { EquiposModal } from '../components/EquiposModal';
import { ToastContainer, toast } from 'react-toastify';


function Equipos() {
  const [Equipos, setEquipos] = useState([]);
  const [isModalShow, setIsModalShow] = useState(false);
  const [currentEquipos, setCurrentEquipos] = useState({});
  const [Jugadores, setJugadores] = useState([]);
  const [Torneos, setTorneos] = useState([]);

  useEffect(() => {
    fetchEquipos();
    fetchJugadores();
    fetchTorneos();

  }, []);

  const fetchEquipos = async () => {
    try {
     const response = await axios.get(import.meta.env.VITE_TORNEO_ENDPOINT + 'http://127.0.0.1:8000/api//listar-equipos')
      if (response.status === 200) {
        setEquipos(response.data.data);
      }
    } catch (error) {
      console.error("Error al cargar torneos", error);
    }
  };

  const fetchJugadores = () => {
    axios.get(import.meta.env.VITE_TORNEO_ENDPOINT + 'http://127.0.0.1:8000/api/listar-jugadores')
      .then((response) => setJugadores(response.data.data))
      .catch(error => console.error(error));
  };

  const setModalEditInfo = (Equipo) => {
    setIsModalShow(true);
    setCurrentEquipos(Equipos);
  };

  const handleChangeEquipos = (event) => {
    setCurrentEquipos({
      ...currentEquipos,
      [event.name]: event.value
    });
  };

  const createOrUpdateEquipos = async () => {
    const data = {
      nombre: currentEquipos.nombre,
      lider_id: currentEquipos.lider_id,
      torneo_id: currentEquipos.torneo_id,
      jugadores: currentEquipos.jugadores
    };

    if (currentEquipos.equipo_id) {
      try {
        await axios.put(
          import.meta.env.VITE_TORNEO_ENDPOINT + 'http://127.0.0.1:8000/api/actulizar-equipo/' + currentEquipos.equipo_id, data);
        toast("Actualización exitosa");
        setIsModalShow(false);
        fetchEquipos();
      } catch (error) {
        console.error("Error al actualizar torneo", error);
      }
    } else {
      try {
        await axios.post(
          import.meta.env.VITE_TORNEO_ENDPOINT + 'http://127.0.0.1:8000/api/crearequipos/' + currentEquipos.jugadores + currentEquipos.torneo_id,
          { ...data }
        );
        toast("Creación exitosa");
        setIsModalShow(false);
        fetchEquipos();
      } catch (error) {
        console.error("Error al crear equipos", error);
      }
    }
  };

  const removeEquipos = async (equipo_id) => {
    if (confirm("Estas seguro que deseas borrar?")) {
      try {
        await axios.delete(import.meta.env.VITE_TORNEO_ENDPOINT + 'http://127.0.0.1:8000/apieliminar-equipo/' + equipo_id);
        toast("Eliminación exitosa");
        fetchEquipos();
      } catch (error) {
        console.error("Error al eliminar equipo", error);
      }
    }
  };

  const openTournamentModal = () => {
    setCurrentEquipos({});
    setIsModalShow(true);
  };

  return (
    <>
      <EquiposTModal
        Jugadores={Jugadores}
        Torneos={Torneos}
        Equipos={currentEquipos}
        isShow={isModalShow}
        onClose={() => setIsModalShow(false)}
        onChangeEquipos={handleChangeEquipos}
        onSubmit={createOrUpdateEquipos}
      />
      <div className="min-h-screen bg-gray-100 flex flex-col items-center py-16 px-4">
        <h1 className="text-4xl font-bold text-black mb-8">Torneos</h1>
        <button className="bg-green-700 text-white rounded shadow-md p-2 my-4" onClick={openEquiposModal}>
          Crear equipo
        </button>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="px-6 py-3">Nombre del equipo</th>
                <th className="px-6 py-3">Lider</th>
                <th className="px-6 py-3">Jugadores</th>
                <th className="px-6 py-3">Torneo</th>
                <th className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {Equipos.map(Equipos => (
                <tr key={Equipos.equipo_id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                  <td className="px-6">{Equipos.nombre}</td>
                  <td className="px-6">{Equipos.lider_id}</td>
                  <td className="px-6">{Equipos.Jugadores.nombre}</td>
                  <td className="px-6">{Equipos.Torneos.nombre}</td>
                  <td className="px-6">
                    <button onClick={() => setModalEditInfo(torneo)} className="bg-blue-600 text-white rounded p-2 mr-2 my-2">
                      <LuPencil />
                    </button>
                    <button onClick={() => removeEquipos(Equipos.equipo_id)} className="bg-red-600 text-white rounded p-2 my-2">
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

export default Equipos;
