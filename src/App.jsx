import React, { useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState(null); // Para almacenar los datos de la API
  const [loading, setLoading] = useState(false); // Para mostrar el estado de carga
  const [error, setError] = useState(null); // Para manejar los errores

  const handleClick = async () => {
    setLoading(true);
    setError(null); // Reseteamos el error
    try {
      // Hacemos la consulta a la API
      const response = await axios.get('ec2-54-173-133-129.compute-1.amazonaws.com/user/buscartodos');
      setData(response.data); // Guardamos los datos obtenidos
    } catch (err) {
      setError("Error al obtener los datos."); // Si ocurre un error, lo mostramos
    } finally {
      setLoading(false); // Finalizamos el estado de carga
    }
  };

  return (
    <div className="App">
      <h1>Consulta API</h1>
      <button onClick={handleClick} disabled={loading}>
        {loading ? "Cargando..." : "Obtener Datos"}
      </button>

      {/* Mostrar error si ocurre */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Mostrar los datos si la consulta es exitosa */}
      {data && (
        <div>
          <h2>Datos obtenidos:</h2>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;