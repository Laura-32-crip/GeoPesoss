import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTctPK3hWLNDSIp-4EmEgWELkzlSBysObsGsTAWBwhH-uBSL__CgQrzv2gLRcdRfkPSQmrbaLlQRRWP/pub?gid=0&single=true&output=csv';

    const res = await fetch(csvUrl);
    const csvText = await res.text();

    const lines = csvText.trim().split('\n');
    const headers = lines[0].split(',');

    const data = lines.slice(1).map(line => {
      const values = line.split(',');
      const entry = {};
      headers.forEach((header, i) => {
        entry[header.trim()] = values[i].trim();
      });
      return entry;
    });

    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching data' }, { status: 500 });
  }
}

