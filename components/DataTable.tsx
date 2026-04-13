import React from 'react';
import styles from '../styles/dashboard.module.css';
import { SheetRow } from '../hooks/useFetchData';

interface DataTableProps {
  data: SheetRow[];
}

export default function DataTable({ data }: DataTableProps) {
  return (
    <div className={styles.tableContainer}>
      <h2 className={styles.tableTitle}>Dados Detalhados</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Cutoff (Data)</th>
            <th>Hora</th>
            <th>Tipo</th>
            <th>Shipment</th>
            <th>Transbordo</th>
            <th>Canal</th>
            <th>Dia Semana</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={7} className={styles.noData}>
                Nenhum dado encontrado.
              </td>
            </tr>
          ) : (
            data.map((row, index) => (
              <tr key={index}>
                <td>{row.cutoff || '–'}</td>
                <td>{row.hora || '–'}</td>
                <td>{row.tipo || '–'}</td>
                <td>{row.shipment || '0'}</td>
                <td>{row.transbordo || '0'}</td>
                <td>{row.canal || '–'}</td>
                <td>{row.dia_semana || '–'}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
