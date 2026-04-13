import { useState, useEffect, useCallback } from 'react';

const SHEET_ID = '17nTgtnPGyKNKNXggPwKASwYIp8aD8BM__KNhY5jscdg';
const GID = '1632616135';
const REFRESH_INTERVAL = 30000;

export interface SheetRow {
  cutoff: string;
  hora: string;
  tipo: string;
  shipment: string;
  transbordo: string;
  canal: string;
  dia_semana: string;
  [key: string]: string;
}

function parseCSV(csv: string): SheetRow[] {
  const lines = csv.split('\n').filter((l) => l.trim());
  if (lines.length < 2) return [];

  const headers = lines[0].split(',').map((h) => h.trim().toLowerCase().replace(/\s+/g, '_'));
  const rows: SheetRow[] = [];

  for (let i = 1; i < lines.length; i++) {
    const cells = lines[i].split(',');
    const row: Record<string, string> = {};
    headers.forEach((header, idx) => {
      row[header] = cells[idx] ? cells[idx].trim() : '';
    });
    rows.push(row as SheetRow);
  }

  return rows;
}

export function useFetchData() {
  const [data, setData] = useState<SheetRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchData = useCallback(async () => {
    const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=${GID}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      const text = await response.text();
      const parsed = parseCSV(text);
      setData(parsed);
      setError(null);
      setLastUpdated(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar dados');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, REFRESH_INTERVAL);
    return () => clearInterval(interval);
  }, [fetchData]);

  return { data, loading, error, lastUpdated, refetch: fetchData };
}
