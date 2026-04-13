import React from 'react';
import styles from '../styles/dashboard.module.css';
import { SheetRow } from '../hooks/useFetchData';

interface SummaryProps {
  data: SheetRow[];
}

interface TipoSummary {
  tipo: string;
  count: number;
  totalShipment: number;
  totalTransbordo: number;
}

export default function Summary({ data }: SummaryProps) {
  const summaryMap: Record<string, TipoSummary> = {};

  data.forEach((row) => {
    const tipo = row.tipo || 'Desconhecido';
    if (!summaryMap[tipo]) {
      summaryMap[tipo] = { tipo, count: 0, totalShipment: 0, totalTransbordo: 0 };
    }
    summaryMap[tipo].count += 1;
    summaryMap[tipo].totalShipment += parseInt(row.shipment, 10) || 0;
    summaryMap[tipo].totalTransbordo += parseInt(row.transbordo, 10) || 0;
  });

  const summaries = Object.values(summaryMap).sort((a, b) => b.count - a.count);

  return (
    <div className={styles.summaryContainer}>
      <h2 className={styles.summaryTitle}>Resumo por Tipo de Produto</h2>
      <div className={styles.summaryGrid}>
        {summaries.map((s) => (
          <div key={s.tipo} className={styles.summaryCard}>
            <div className={styles.summaryCardType}>{s.tipo}</div>
            <div className={styles.summaryCardStat}>
              <span className={styles.summaryCardLabel}>Registros</span>
              <span className={styles.summaryCardValue}>{s.count}</span>
            </div>
            <div className={styles.summaryCardStat}>
              <span className={styles.summaryCardLabel}>Shipment</span>
              <span className={styles.summaryCardValue}>{s.totalShipment}</span>
            </div>
            <div className={styles.summaryCardStat}>
              <span className={styles.summaryCardLabel}>Transbordo</span>
              <span className={styles.summaryCardValue}>{s.totalTransbordo}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
