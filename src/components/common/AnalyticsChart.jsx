'use client';
import { useId, useMemo, useState } from 'react';
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Line, LineChart, Pie, PieChart, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { EmptyState } from './EmptyState';
import { formatCurrency } from '@/lib/currency';
import { filterChartRows, pieTotals } from '@/lib/chart-data';
const numbers = new Intl.NumberFormat('en-IN');

export function AnalyticsChart({ title, description, data = [], series, kind = 'bar', monetary = false, loading = false, sample = false, yLabel = 'Count', defaultPeriod = 'all' }) {
  const id = useId();
  const [period, setPeriod] = useState(defaultPeriod);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const rows = useMemo(() => filterChartRows(data, { period, from, to }), [data, period, from, to]);
  const config = useMemo(() => Object.fromEntries(series.map((item, index) => [item.key, { label: item.label, color: `var(--chart-${index % 5 + 1})` }])), [series]);
  const format = monetary ? formatCurrency : (value) => numbers.format(value);
  const totals = pieTotals(rows, series);
  const empty = !rows.length || (kind === 'pie' && !totals.some((item) => item.value > 0));
  const Chart = kind === 'area' ? AreaChart : kind === 'line' ? LineChart : BarChart;
  const tooltip = <ChartTooltip content={<ChartTooltipContent formatter={(value, name) => <div className="flex min-w-32 justify-between gap-4"><span>{config[name]?.label || name}</span><strong>{format(value)}</strong></div>} />} />;
  return <Card className="min-w-0" data-chart-card={title}>
    <CardHeader className="space-y-3"><div><CardTitle>{title}</CardTitle><CardDescription className="mt-1">{description}{sample && ' · Sample data'}</CardDescription></div>
      <div className="flex flex-wrap items-end gap-2">
        <div className="space-y-1"><Label htmlFor={`${id}-period`} className="text-xs">Period</Label><Select value={period} onValueChange={(value) => { setPeriod(value); setFrom(''); setTo(''); }}><SelectTrigger id={`${id}-period`} aria-label={`${title} period`}><SelectValue /></SelectTrigger><SelectContent><SelectItem value="all">All dates</SelectItem><SelectItem value="7">Last 7 days</SelectItem><SelectItem value="30">Last 30 days</SelectItem><SelectItem value="90">Last 90 days</SelectItem></SelectContent></Select></div>
        <div className="min-w-0 flex-1 space-y-1"><Label htmlFor={`${id}-from`} className="text-xs">From</Label><Input id={`${id}-from`} aria-label={`${title} from date`} className="min-w-0" type="date" value={from} max={to || undefined} onChange={(event) => setFrom(event.target.value)} /></div>
        <div className="min-w-0 flex-1 space-y-1"><Label htmlFor={`${id}-to`} className="text-xs">To</Label><Input id={`${id}-to`} aria-label={`${title} to date`} className="min-w-0" type="date" value={to} min={from || undefined} onChange={(event) => setTo(event.target.value)} /></div>
      </div>
      <p className="text-xs text-muted-foreground" aria-live="polite">{rows.length ? `${rows.length} observations · ${rows[0].date} to ${rows.at(-1).date}` : 'No observations in this period'}</p>
    </CardHeader>
    <CardContent className="min-w-0">
      {loading ? <Skeleton aria-label={`Loading ${title}`} className="h-72 w-full" /> : empty ? <div className="flex h-72 items-center justify-center" role="status"><EmptyState title="No chart data" description="Choose another date range or connect a data source." /></div> : <>
        <ChartContainer config={config} className="aspect-auto h-72 w-full" role="img" aria-label={`${title}. ${rows.length} dated observations. Values are available in the accessible data table.`}>
          {kind === 'pie' ? <PieChart accessibilityLayer>{tooltip}<Pie data={totals} dataKey="value" nameKey="key" innerRadius="45%" outerRadius="75%" paddingAngle={3}>{totals.map((item) => <Cell key={item.key} fill={item.fill} />)}</Pie><ChartLegend content={<ChartLegendContent nameKey="key" className="flex-wrap gap-2 text-xs" />} /></PieChart> : <Chart data={rows} accessibilityLayer margin={{ top: 8, right: 10, left: 0, bottom: 24 }}>
            <CartesianGrid vertical={false} /><XAxis dataKey="date" tickFormatter={(value) => value.slice(5)} tickLine={false} axisLine={false} minTickGap={24} label={{ value: 'Date', position: 'insideBottom', offset: -16 }} />
            <YAxis width={monetary ? 110 : 65} tickLine={false} axisLine={false} allowDecimals={monetary} tickFormatter={format} label={{ value: monetary ? 'INR' : yLabel, angle: -90, position: 'insideLeft' }} />
            {tooltip}<ChartLegend content={<ChartLegendContent className="flex-wrap gap-2 text-xs" />} />
            {series.map((item) => kind === 'area' ? <Area key={item.key} type="monotone" dataKey={item.key} stroke={`var(--color-${item.key})`} fill={`var(--color-${item.key})`} fillOpacity={0.15} /> : kind === 'line' ? <Line key={item.key} type="monotone" dataKey={item.key} stroke={`var(--color-${item.key})`} strokeWidth={2} /> : <Bar key={item.key} dataKey={item.key} fill={`var(--color-${item.key})`} radius={[4,4,0,0]} maxBarSize={36} />)}
          </Chart>}
        </ChartContainer>
        <details className="mt-3 text-xs"><summary className="cursor-pointer text-muted-foreground">View accessible chart data</summary><div className="overflow-x-auto"><table className="mt-2 w-full text-left"><caption className="sr-only">{title} data</caption><thead><tr><th scope="col">Date</th>{series.map((item) => <th scope="col" key={item.key}>{item.label}</th>)}</tr></thead><tbody>{rows.map((row, index) => <tr key={`${row.date}-${index}`}><th scope="row" className="font-normal">{row.date}</th>{series.map((item) => <td key={item.key}>{format(row[item.key] ?? 0)}</td>)}</tr>)}</tbody></table></div></details>
      </>}
    </CardContent>
  </Card>;
}
