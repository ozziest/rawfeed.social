// timer.ts
interface TimerEntry {
  name: string;
  duration: number;
  timestamp: number;
}

class SimpleTimer {
  private entries: TimerEntry[] = [];
  private activeTimers: Map<string, number> = new Map();
  private maxEntries = 10000;

  start(name: string) {
    this.activeTimers.set(name, Date.now());
  }

  end(name: string) {
    const startTime = this.activeTimers.get(name);
    if (!startTime) return;

    const duration = Date.now() - startTime;
    this.activeTimers.delete(name);

    this.entries.push({
      name,
      duration,
      timestamp: Date.now(),
    });

    // Son 100'ü tut
    if (this.entries.length > this.maxEntries) {
      this.entries.shift();
    }
  }

  getStats() {
    // Name'e göre grupla
    const grouped = new Map<string, number[]>();

    this.entries.forEach((entry) => {
      if (!grouped.has(entry.name)) {
        grouped.set(entry.name, []);
      }
      grouped.get(entry.name)!.push(entry.duration);
    });

    // İstatistikleri hesapla
    const stats = Array.from(grouped.entries()).map(([name, durations]) => {
      const sorted = [...durations].sort((a, b) => a - b);
      const avg = durations.reduce((a, b) => a + b, 0) / durations.length;
      const min = Math.min(...durations);
      const max = Math.max(...durations);
      const p50 = sorted[Math.floor(sorted.length * 0.5)] || 0;
      const p95 = sorted[Math.floor(sorted.length * 0.95)] || 0;
      const p99 = sorted[Math.floor(sorted.length * 0.99)] || 0;

      return {
        name,
        count: durations.length,
        avg: Math.round(avg),
        min,
        max,
        p50,
        p95,
        p99,
      };
    });

    // Max'e göre sırala
    return stats.sort((a, b) => b.max - a.max);
  }

  getHtml() {
    const stats = this.getStats();

    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta http-equiv="refresh" content="5">
  <title>Metrics</title>
  <style>
    body { font-family: monospace; padding: 20px; background: #1e1e1e; color: #d4d4d4; }
    table { border-collapse: collapse; width: 100%; }
    th, td { padding: 8px; text-align: left; border-bottom: 1px solid #333; }
    th { background: #252525; position: sticky; top: 0; }
    tr:hover { background: #2a2a2a; }
    .red { color: #f44336; }
    .yellow { color: #ffeb3b; }
    .green { color: #4caf50; }
  </style>
</head>
<body>
  <h1>Performance Metrics (Last 100)</h1>
  <p>Auto-refresh: 5s</p>
  <table>
    <thead>
      <tr>
        <th>Operation</th>
        <th>Count</th>
        <th>Avg</th>
        <th>Min</th>
        <th>P50</th>
        <th>P95</th>
        <th>P99</th>
        <th>Max</th>
      </tr>
    </thead>
    <tbody>
      ${stats
        .map((s) => {
          const maxClass =
            s.max > 1000 ? "red" : s.max > 500 ? "yellow" : "green";
          return `
          <tr>
            <td><strong>${s.name}</strong></td>
            <td>${s.count}</td>
            <td>${s.avg}ms</td>
            <td>${s.min}ms</td>
            <td>${s.p50}ms</td>
            <td>${s.p95}ms</td>
            <td>${s.p99}ms</td>
            <td class="${maxClass}">${s.max}ms</td>
          </tr>
        `;
        })
        .join("")}
    </tbody>
  </table>
</body>
</html>
    `.trim();
  }
}

export const timer = new SimpleTimer();
