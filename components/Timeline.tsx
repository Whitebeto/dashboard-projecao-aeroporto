import React from 'react';
import styles from '../styles/dashboard.module.css';
import { SheetRow } from '../hooks/useFetchData';

interface TimelineProps {
  data: SheetRow[];
}

function buildHours(): string[] {
  const hours: string[] = [];
  for (let h = 6; h < 24; h++) {
    hours.push(`${String(h).padStart(2, '0')}h`);
  }
  for (let h = 0; h <= 5; h++) {
    hours.push(`${String(h).padStart(2, '0')}h`);
  }
  return hours;
}

function getHourKey(hora: string): string {
  if (!hora) return '';
  const match = hora.match(/^(\d{1,2}):/);
  if (!match) return '';
  return `${String(parseInt(match[1], 10)).padStart(2, '0')}h`;
}

export default function Timeline({ data }: TimelineProps) {
  const hours = buildHours();

  const countByHour: Record<string, number> = {};
  data.forEach((row) => {
    const key = getHourKey(row.hora);
    if (key) {
      countByHour[key] = (countByHour[key] || 0) + 1;
    }
  });

  const nowHour = `${String(new Date().getHours()).padStart(2, '0')}h`;

  return (
    <div className={styles.timelineContainer}>
      <h2 className={styles.timelineTitle}>Linha do Tempo (6h – 5h)</h2>
      <div className={styles.timeline}>
        {hours.map((hour) => {
          const count = countByHour[hour] || 0;
          const isActive = hour === nowHour;
          return (
            <div
              key={hour}
              className={`${styles.timelineItem} ${isActive ? styles.timelineItemActive : ''}`}
              title={`${hour}: ${count} item(s)`}
            >
              <div className={styles.timelineHour}>{hour}</div>
              <div className={styles.timelineCount}>{count > 0 ? count : '–'}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
