import React from 'react';
import styles from '../styles/dashboard.module.css';
import { SheetRow } from '../hooks/useFetchData';

interface FiltersProps {
  data: SheetRow[];
  selectedTipo: string;
  selectedCanal: string;
  onTipoChange: (value: string) => void;
  onCanalChange: (value: string) => void;
}

export default function Filters({
  data,
  selectedTipo,
  selectedCanal,
  onTipoChange,
  onCanalChange,
}: FiltersProps) {
  const tipos = Array.from(new Set(data.map((row) => row.tipo).filter(Boolean))).sort();
  const canais = Array.from(new Set(data.map((row) => row.canal).filter(Boolean))).sort();

  return (
    <div className={styles.filtersContainer}>
      <div className={styles.filterGroup}>
        <label className={styles.filterLabel} htmlFor="tipoFiltro">
          Tipo
        </label>
        <select
          id="tipoFiltro"
          className={styles.filterSelect}
          value={selectedTipo}
          onChange={(e) => onTipoChange(e.target.value)}
        >
          <option value="">Todos os Tipos</option>
          {tipos.map((tipo) => (
            <option key={tipo} value={tipo}>
              {tipo}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.filterGroup}>
        <label className={styles.filterLabel} htmlFor="canalFiltro">
          Canal
        </label>
        <select
          id="canalFiltro"
          className={styles.filterSelect}
          value={selectedCanal}
          onChange={(e) => onCanalChange(e.target.value)}
        >
          <option value="">Todos os Canais</option>
          {canais.map((canal) => (
            <option key={canal} value={canal}>
              {canal}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
