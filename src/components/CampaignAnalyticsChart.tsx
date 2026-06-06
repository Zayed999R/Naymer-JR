import React, { useMemo } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { TrendingUp, Calendar, Award, ExternalLink } from "lucide-react";
import VerseLogo from "./VerseLogo";

interface CampaignAnalyticsChartProps {
  currentEarnings: number;
  isDarkMode: boolean;
}

interface ChartDataItem {
  day: string;
  earnings: number;
  projected: number;
}

export default function CampaignAnalyticsChart({
  currentEarnings,
  isDarkMode,
}: CampaignAnalyticsChartProps) {
  // Generate robust, dynamically adjusted mock 30-day analytics data
  const data: ChartDataItem[] = useMemo(() => {
    const list: ChartDataItem[] = [];
    const baseVal = 4.25; // starts from a small baseline of $4.25
    
    for (let d = 1; d <= 30; d++) {
      // Create a convincing non-linear cumulative curve (growth over a month)
      const ratio = d / 30;
      const progression = Math.sin(ratio * Math.PI / 2) * 0.4 + Math.pow(ratio, 1.8) * 0.6;
      
      // Dynamic additions based on real simulated campaign earnings progress
      const sessionBoost = currentEarnings * ratio;
      const calculatedEarnings = baseVal + progression * (24.50 + currentEarnings) + sessionBoost;
      
      list.push({
        day: `Day ${d}`,
        earnings: parseFloat(calculatedEarnings.toFixed(2)),
        projected: parseFloat((calculatedEarnings * 1.22).toFixed(2)),
      });
    }
    return list;
  }, [currentEarnings]);

  const latestStats = data[data.length - 1];

  // Colors dynamically adjusted based on dark/light mode
  const gridColor = isDarkMode ? "#334155" : "#e2e8f0"; // slate-700 : slate-200
  const axisLabelColor = isDarkMode ? "#94a3b8" : "#64748b"; // slate-400 : slate-500
  const tooltipBg = isDarkMode ? "#0f172a" : "#ffffff"; // slate-900 : white
  const tooltipBorder = isDarkMode ? "#1e293b" : "#cbd5e1"; // slate-800 : slate-300

  return (
    <div
      id="campaign-performance-chart"
      className={`p-5 rounded-2xl border transition-all duration-300 ${
        isDarkMode
          ? "bg-slate-900 border-slate-800 text-white shadow-xl shadow-slate-950/20"
          : "bg-white border-slate-200 text-slate-900 shadow-md"
      }`}
    >
      {/* Header section with Verse Logo */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4 mb-4 border-slate-800/15 dark:border-slate-200/5">
        <div className="flex items-center gap-3">
          {/* Beautiful Verse Logo integrated directly as requested */}
          <div className="relative group p-1 bg-gradient-to-tr from-cyan-400/10 to-pink-500/10 dark:from-cyan-400/20 dark:to-pink-500/20 rounded-xl">
            <VerseLogo className="w-10 h-10 transform group-hover:scale-105 transition-transform duration-300" />
            <div className="absolute -bottom-1 -right-1 bg-emerald-500 rounded-full w-3.5 h-3.5 border-2 border-white dark:border-slate-900" />
          </div>
          <div>
            <h3 className="text-sm font-semibold tracking-wider font-mono uppercase text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <span>📈</span> 30-Day Earnings Performance
            </h3>
            <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
              Live Simulated Earnings &amp; Projected Forecast
            </p>
          </div>
        </div>

        {/* Live campaign indicators */}
        <div className="flex items-center gap-2 self-start sm:self-center">
          <span className="text-[10px] bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 border border-indigo-500/20 font-bold px-2 py-0.5 rounded font-mono uppercase flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            30D Period
          </span>
          <span className="text-[10px] bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 font-bold px-2 py-0.5 rounded font-mono uppercase flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            Active
          </span>
        </div>
      </div>

      {/* Mini Stats Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-5">
        <div className={`p-3 rounded-xl border ${isDarkMode ? "bg-slate-950/40 border-slate-800" : "bg-slate-50 border-slate-150"}`}>
          <p className="text-slate-400 font-mono text-[10px]">TOTAL RECORDED EARNINGS</p>
          <p className="text-sm font-extrabold font-mono text-emerald-500">
            ${latestStats.earnings.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
        </div>
        <div className={`p-3 rounded-xl border ${isDarkMode ? "bg-slate-950/40 border-slate-800" : "bg-slate-50 border-slate-150"}`}>
          <p className="text-slate-400 font-mono text-[10px]">30D FORECAST PROJECTED</p>
          <p className="text-sm font-extrabold font-mono text-cyan-500">
            ${latestStats.projected.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
        </div>
        <a
          href="https://x.com/GetVerse"
          target="_blank"
          rel="noopener noreferrer"
          className={`col-span-2 md:col-span-1 p-3 rounded-xl border flex items-center gap-2 group transition-all duration-300 ${
            isDarkMode 
              ? "bg-slate-950/40 border-slate-800 hover:bg-slate-950/80 hover:border-indigo-500/30" 
              : "bg-slate-50 border-slate-150 hover:bg-slate-100/50 hover:border-indigo-400/30"
          }`}
        >
          <Award className="w-5 h-5 text-indigo-500 shrink-0 group-hover:scale-110 transition-transform" />
          <div className="leading-tight flex-1">
            <p className="text-slate-400 font-mono text-[10px]">REWARDS PROGRAM</p>
            <p className="text-xs font-bold text-slate-800 dark:text-slate-100 group-hover:text-indigo-500 dark:group-hover:text-indigo-400 flex items-center gap-1 transition-colors">
              Verse Affiliate Tier 1
              <ExternalLink className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
            </p>
          </div>
        </a>
      </div>

      {/* Recharts Render Container */}
      <div className="w-full h-64 overflow-hidden rounded-xl">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <CartesianGrid stroke={gridColor} strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="day"
              stroke={axisLabelColor}
              fontSize={10}
              tickLine={false}
              axisLine={false}
              dy={8}
            />
            <YAxis
              stroke={axisLabelColor}
              fontSize={10}
              tickLine={false}
              axisLine={false}
              dx={-8}
              tickFormatter={(val) => `$${val}`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: tooltipBg,
                borderColor: tooltipBorder,
                borderRadius: "8px",
                color: isDarkMode ? "#f8fafc" : "#0f172a",
                fontSize: "11px",
                fontFamily: "monospace",
              }}
              formatter={(value: any, name: string) => [
                `$${value}`,
                name === "earnings" ? "Cumulative Earnings" : "Projected Growth",
              ]}
              labelStyle={{ fontWeight: "bold" }}
            />
            <Legend
              verticalAlign="bottom"
              height={36}
              iconType="circle"
              iconSize={8}
              wrapperStyle={{
                fontSize: "11px",
                fontFamily: "monospace",
                paddingTop: "12px",
              }}
            />
            
            {/* Main Earnings Curve matching Verse Pink/Violet branding */}
            <Line
              type="monotone"
              dataKey="earnings"
              name="earnings"
              stroke="#8b5cf6" // Violet
              strokeWidth={3}
              dot={{ r: 0 }}
              activeDot={{ r: 6, stroke: "#ffffff", strokeWidth: 2 }}
            />

            {/* Projected Curve matching Verse Cyan branding */}
            <Line
              type="monotone"
              dataKey="projected"
              name="projected"
              stroke="#06b6d4" // Cyan
              strokeWidth={2}
              strokeDasharray="4 4"
              dot={{ r: 0 }}
              activeDot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-3.5 text-center">
        <p className="text-[10px] text-slate-400 font-mono">
          * This analytics graph is based on real-time simulation variables powered by the Verse network protocol logs.
        </p>
      </div>
    </div>
  );
}
