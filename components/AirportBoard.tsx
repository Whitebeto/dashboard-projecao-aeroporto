import React, { useState, useMemo } from 'react';
import styles from '../styles/dashboard.module.css';
import { useFetchData } from '../hooks/useFetchData';
import Filters from './Filters';
import Timeline from './Timeline';
import DataTable from './DataTable';
import Summary from './Summary';

export default function AirportBoard() {
  const { data, loading, error, lastUpdated } = useFetchData();
  const [selectedTipo, setSelectedTipo] = useState('');
  const [selectedCanal, setSelectedCanal] = useState('');

  const filteredData = useMemo(() => {
    return data.filter((row) => {
      const matchTipo = !selectedTipo || row.tipo === selectedTipo;
      const matchCanal = !selectedCanal || row.canal === selectedCanal;
      return matchTipo && matchCanal;
    });
  }, [data, selectedTipo, selectedCanal]);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.headerTitle}>✈️ Dashboard de Projeção</h1>
        <p className={styles.headerSubtitle}>Dados em tempo real – Linha do Tempo 6h às 5h</p>
        {lastUpdated && (
          <p className={styles.lastUpdated}>
            Última atualização: {lastUpdated.toLocaleTimeString('pt-BR')}
          </p>
        )}
      </header>

      {loading && !data.length && (
        <div className={styles.loading}>⏳ Carregando dados...</div>
      )}

      {error && (
        <div className={styles.error}>❌ Erro ao carregar dados: {error}</div>
      )}

      {!loading && !error && (
        <>
          <Filters
            data={data}
            selectedTipo={selectedTipo}
            selectedCanal={selectedCanal}
            onTipoChange={setSelectedTipo}
            onCanalChange={setSelectedCanal}
          />
          <Timeline data={filteredData} />
          <DataTable data={filteredData} />
          <Summary data={filteredData} />
        </>
      )}
    </div>
  );
}
