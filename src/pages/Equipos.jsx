import axios from 'axios';
import { useEffect, useState } from 'react';
import { LuPencil, LuTrash } from "react-icons/lu";
import { EquiposModal } from '../components/EquiposModal';
import { ToastContainer, toast } from 'react-toastify';

function Equipos() {
  const [equipos, setEquipos] = useState([]);
  const [isModalShow, setIsModalShow] = useState(false);
  const [currentEquipo, setCurrentEquipo] = useState({});
  const [jugadores, setJugadores] = useState([]);
  const [torneos, setTorneos] = useState([]);

  const endpoint = import.meta.env.VITE_TORNEO_ENDPOINT;

  useEffect(() => {
    fetchEquipos();
    fetchJugadores();
    fetchTorneos();
  }, []);

  const fetchEquipos = async () => {
    try {
      const response = await axios.get(import.meta.env.VITE_TORNEO_ENDPOINT + '/listar-equipo');
      if (response.status === 200) {
        setEquipos(response.data.data);
      }
    } catch (error) {
      console.error("Error al cargar equipos", error);
    }
  };

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
  
  const fetchTorneos = async () => {
    try {
      const response = await axios.get(import.meta.env.VITE_TORNEO_ENDPOINT + '/tournament');
      if (response.status === 200) {
        setTorneos(response.data.data);
      }
    } catch (error) {
      console.error("Error al cargar torneos", error);
    }
  };
  const setModalEditInfo = (equipo) => {
    setIsModalShow(true);
    setCurrentEquipo(equipo);
  };

  const handleChangeEquipo = (event) => {
    setCurrentEquipo({
      ...currentEquipo,
      [event.name]: event.value
    });
  };

  const createOrUpdateEquipo = async () => {
    const data = {
      nombre: currentEquipo.nombre,
      id_lider: currentEquipo.id_lider,

    };

    if (currentEquipo.id_equipo) {
      try {
        await axios.put(endpoint + '/api/actulizar-equipo/' + currentEquipo.id_equipo, data);
        toast("Actualización exitosa");
        setIsModalShow(false);
        fetchEquipos();
      } catch (error) {
        console.error("Error al actualizar equipo", error);
      }
    } else {
      try {
        await axios.post(endpoint + '/api/crearequipos/' + currentEquipo.jugadores + currentEquipo.id_torneo, data);
        toast("Creación exitosa");
        setIsModalShow(false);
        fetchEquipos();
      } catch (error) {
        console.error("Error al crear equipo", error);
      }
    }
  };

  const removeEquipo = async (id_equipo) => {
    if (confirm("¿Estás seguro que deseas eliminar este equipo?")) {
      try {
        await axios.delete(endpoint + '/api/eliminar-equipo/' + id_equipo);
        toast("Eliminación exitosa");
        fetchEquipos();
      } catch (error) {
        console.error("Error al eliminar equipo", error);
      }
    }
  };

  const openEquiposModal = () => {
    setCurrentEquipo({});
    setIsModalShow(true);
  };

  return (
    <>
      <EquiposModal
        jugadores={jugadores}
        torneos={torneos}
        equipo={currentEquipo}
        isShow={isModalShow}
        onClose={() => setIsModalShow(false)}
        onChangeEquipo={handleChangeEquipo}
        onSubmit={createOrUpdateEquipo}
      />

      <div className="min-h-screen bg-gray-100 flex flex-col items-center py-16 px-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Equipos </h1>
        <button className="bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-md px-6 py-2 mb-6"
          onClick={openEquiposModal}>
          Crear equipo
        </button>

        <div className="relative overflow-x-auto shadow-lg rounded-lg w-full max-w-5xl">
          <table className="w-full text-sm text-left text-gray-700">
            <thead className="text-xs uppercase bg-gray-800 text-white">
              <tr>
                <th className="px-6 py-3">Nombre del equipo</th>
                <th className="px-6 py-3">Líder</th>
              </tr>
            </thead>
            <tbody>
              {equipos.map(equipo => (
                <tr key={equipo.equipo_id} className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4">{equipo.nombre}</td>
                  <td className="px-6 py-4">{equipo.id_lider}</td>
                   <td className="px-6 py-4">{equipo.id_jugador}</td>
                  <td className="px-6 py-4">
                    <ul>
                      {
                        equipo.jugadores.map(jugador => (
                          <li>
                            {jugador.nombre}
                          </li>
                        ) )
                      }
                    </ul>

                  </td>
                  <td className="px-6 py-4">{equipo.torneos[0].nombre}</td>
                  <td className="px-6 py-4 flex justify-center space-x-2">
                    <button
                      onClick={() => setModalEditInfo(equipo)}
                      className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg p-2"
                    >
                      <LuPencil />
                    </button>
                    <button
                      onClick={() => removeEquipo(equipo.equipo_id)}
                      className="bg-red-600 hover:bg-red-700 text-white rounded-lg p-2"
                    >
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
