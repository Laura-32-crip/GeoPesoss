'use client';
import { useEffect, useState } from 'react';

export default function Page() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<string>(''); // nuevo estado

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch('/api/sheets');
        if (!res.ok) throw new Error('Error al obtener los datos');
        const json = await res.json();
        setData(json);

        // Guardar hora actual
        const now = new Date();
        const hora = now.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        });
        const fecha = now.toLocaleDateString();
        setLastUpdate(`${fecha} ${hora}`);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 60 * 60 * 1000); // 1 hora
    return () => clearInterval(interval);
  }, []);

  if (loading)
    return <p style={{ textAlign: 'center' }}>🌎 Cargando datos...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!data.length) return <p>No hay datos disponibles</p>;

  const headers = Object.keys(data[0]);

  return (
    <div
      style={{
        padding: '30px',
        fontFamily: 'sans-serif',
        background: 'linear-gradient(to bottom, #e0f7fa, #ffffff)',
        minHeight: '100vh',
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h1 style={{ fontSize: '2.5rem' }}>🌍 Geografía 4°1° Año</h1>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/The_Blue_Marble_%28remastered%29.jpg/800px-The_Blue_Marble_%28remastered%29.jpg"
          alt="Planeta Tierra"
          style={{ width: '180px', borderRadius: '50%', margin: '10px auto' }}
        />
        <p style={{ fontSize: '1rem', color: '#444' }}>
          Información actualizada automáticamente cada 1 hora
        </p>
        {lastUpdate && (
          <p style={{ fontSize: '0.9rem', color: '#666' }}>
            Última actualización: {lastUpdate}
          </p>
        )}
      </div>

      <table
        style={{
          borderCollapse: 'collapse',
          width: '100%',
          boxShadow: '0 0 10px rgba(0,0,0,0.1)',
          backgroundColor: '#fefefe',
        }}
      >
        <thead>
          <tr>
            {headers.map((header, idx) => (
              <th
                key={idx}
                style={{
                  border: '1px solid #ccc',
                  padding: '12px',
                  background: '#c8e6c9',
                  color: '#2e7d32',
                  textTransform: 'capitalize',
                }}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx}>
              {headers.map((key, i) => (
                <td
                  key={i}
                  style={{
                    border: '1px solid #ddd',
                    padding: '10px',
                    textAlign: 'center',
                  }}
                >
                  {row[key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
