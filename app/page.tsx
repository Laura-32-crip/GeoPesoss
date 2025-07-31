'use client'; // Importante para usar hooks en componentes cliente

import { useEffect, useState } from 'react';

export default function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/sheets');
        const json = await res.json();
        setData(json.data || []);
      } catch (error) {
        console.error('Error al cargar los datos:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <main style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Geografía 4°1 Año</h1>
      {loading ? (
        <p>Cargando datos...</p>
      ) : (
        <table border="1" cellPadding="8" cellSpacing="0" style={{ borderCollapse: 'collapse', width: '100%' }}>
          <thead>
            <tr>
              {data.length > 0 &&
                Object.keys(data[0]).map((key) => (
                  <th key={key} style={{ backgroundColor: '#0c4a6e', color: 'white' }}>
                    {key}
                  </th>
                ))}
            </tr>
          </thead>
          <tbody>
            {data.length === 0 && (
              <tr>
                <td colSpan="100%">No hay datos para mostrar.</td>
              </tr>
            )}
            {data.map((row, i) => (
              <tr key={i}>
                {Object.values(row).map((val, idx) => (
                  <td key={idx}>{val}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}
