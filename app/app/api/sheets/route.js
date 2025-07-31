export async function GET() {
  const url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTctPK3hWLNDSIp-4EmEgWELkzlSBysObsGsTAWBwhH-uBSL__CgQrzv2gLRcdRfkPSQmrbaLlQRRWP/pub?gid=0&single=true&output=csv';

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Error al obtener CSV');
    const csvText = await response.text();

    const lines = csvText.trim().split('\n');
    const headers = lines[0].split(',');

    const data = lines.slice(1).map(line => {
      const values = line.split(',');
      const obj = {};
      headers.forEach((header, idx) => {
        obj[header.trim()] = values[idx]?.trim() || '';
      });
      return obj;
    });

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message || 'Error desconocido' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
