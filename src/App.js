import { useState, useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

const EXPENSE_CATEGORIES = [
  { id: "travel", label: "Travel", color: "#378ADD" },
  { id: "electricity", label: "Electricity", color: "#EF9F27" },
  { id: "skincare", label: "Skincare", color: "#D4537E" },
  { id: "haircare", label: "Haircare", color: "#7F77DD" },
  { id: "recharge", label: "Recharge", color: "#1D9E75" },
  { id: "supplements", label: "Supplements", color: "#639922" },
  { id: "health", label: "Health", color: "#E24B4A" },
  { id: "gym", label: "Gym", color: "#D85A30" },
  { id: "food", label: "Food & Dining", color: "#BA7517" },
  { id: "shopping", label: "Shopping", color: "#534AB7" },
  { id: "entertainment", label: "Entertainment", color: "#993556" },
  { id: "rent", label: "Rent / Housing", color: "#0F6E56" },
  { id: "transport", label: "Transport", color: "#185FA5" },
  { id: "other", label: "Other", color: "#888780" },
];

const INVESTMENT_TYPES = [
  { id: "gold", label: "Gold", color: "#EF9F27" },
  { id: "etf", label: "ETF", color: "#378ADD" },
  { id: "sip", label: "SIP", color: "#1D9E75" },
  { id: "mutual_fund", label: "Mutual Fund", color: "#7F77DD" },
  { id: "equity", label: "Equity / Stocks", color: "#D85A30" },
  { id: "reit", label: "REIT", color: "#639922" },
  { id: "fd", label: "Fixed Deposit (FD)", color: "#BA7517" },
  { id: "ppf", label: "PPF", color: "#D4537E" },
  { id: "nps", label: "NPS", color: "#534AB7" },
  { id: "bonds", label: "Bonds", color: "#888780" },
  { id: "crypto", label: "Crypto", color: "#E24B4A" },
  { id: "ulip", label: "ULIP", color: "#0F6E56" },
  { id: "other", label: "Other", color: "#5F5E5A" },
];

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const SAMPLE_TX = [
  {
    id: 1,
    date: "2026-04-01",
    category: "food",
    amount: 1200,
    type: "expense",
    description: "Groceries",
  },
  {
    id: 2,
    date: "2026-04-02",
    category: "recharge",
    amount: 299,
    type: "expense",
    description: "Mobile recharge",
  },
  {
    id: 3,
    date: "2026-04-03",
    category: "gym",
    amount: 2500,
    type: "expense",
    description: "Monthly gym fee",
  },
  {
    id: 4,
    date: "2026-04-05",
    category: "skincare",
    amount: 1800,
    type: "expense",
    description: "Face wash & serum",
  },
  {
    id: 5,
    date: "2026-04-06",
    category: "travel",
    amount: 4500,
    type: "expense",
    description: "Weekend trip to Lonavala",
  },
  {
    id: 6,
    date: "2026-04-08",
    category: "electricity",
    amount: 1100,
    type: "expense",
    description: "April electricity bill",
  },
  {
    id: 7,
    date: "2026-04-10",
    category: "health",
    amount: 800,
    type: "expense",
    description: "Doctor visit",
  },
  {
    id: 8,
    date: "2026-04-12",
    category: "supplements",
    amount: 1500,
    type: "expense",
    description: "Whey protein",
  },
  {
    id: 9,
    date: "2026-04-14",
    category: "haircare",
    amount: 650,
    type: "expense",
    description: "Shampoo & hair oil",
  },
  {
    id: 10,
    date: "2026-04-01",
    category: "income",
    amount: 85000,
    type: "income",
    description: "Monthly salary",
  },
  {
    id: 11,
    date: "2026-03-01",
    category: "income",
    amount: 85000,
    type: "income",
    description: "Monthly salary",
  },
  {
    id: 12,
    date: "2026-03-05",
    category: "food",
    amount: 1500,
    type: "expense",
    description: "Restaurant dinner",
  },
  {
    id: 13,
    date: "2026-03-08",
    category: "travel",
    amount: 3200,
    type: "expense",
    description: "Flight tickets",
  },
  {
    id: 14,
    date: "2026-03-12",
    category: "shopping",
    amount: 5000,
    type: "expense",
    description: "Clothes",
  },
  {
    id: 15,
    date: "2026-03-15",
    category: "gym",
    amount: 2500,
    type: "expense",
    description: "Monthly gym fee",
  },
  {
    id: 16,
    date: "2026-03-18",
    category: "electricity",
    amount: 950,
    type: "expense",
    description: "March electricity bill",
  },
  {
    id: 17,
    date: "2026-02-01",
    category: "income",
    amount: 85000,
    type: "income",
    description: "Monthly salary",
  },
  {
    id: 18,
    date: "2026-02-10",
    category: "rent",
    amount: 18000,
    type: "expense",
    description: "Monthly rent",
  },
  {
    id: 19,
    date: "2026-02-12",
    category: "health",
    amount: 1200,
    type: "expense",
    description: "Medical checkup",
  },
  {
    id: 20,
    date: "2026-02-20",
    category: "entertainment",
    amount: 800,
    type: "expense",
    description: "OTT subscriptions",
  },
];

const SAMPLE_INV = [
  {
    id: 1,
    date: "2026-04-01",
    type: "sip",
    name: "Axis Bluechip Fund",
    amount: 5000,
    units: 150.2,
    nav: 33.3,
  },
  {
    id: 2,
    date: "2026-04-01",
    type: "sip",
    name: "Mirae Asset Large Cap",
    amount: 3000,
    units: 78.4,
    nav: 38.3,
  },
  {
    id: 3,
    date: "2026-03-15",
    type: "equity",
    name: "Reliance Industries",
    amount: 10000,
    units: 4,
    nav: 2500,
  },
  {
    id: 4,
    date: "2026-03-20",
    type: "gold",
    name: "Sovereign Gold Bond",
    amount: 7500,
    units: 2,
    nav: 3750,
  },
  {
    id: 5,
    date: "2026-02-01",
    type: "etf",
    name: "Nifty 50 ETF",
    amount: 8000,
    units: 35,
    nav: 228.6,
  },
  {
    id: 6,
    date: "2026-01-15",
    type: "fd",
    name: "SBI FD 1yr",
    amount: 50000,
    units: 1,
    nav: 50000,
  },
  {
    id: 7,
    date: "2026-01-01",
    type: "ppf",
    name: "PPF Account",
    amount: 12500,
    units: 1,
    nav: 12500,
  },
  {
    id: 8,
    date: "2026-04-05",
    type: "mutual_fund",
    name: "HDFC Mid Cap",
    amount: 4000,
    units: 95.2,
    nav: 42.0,
  },
  {
    id: 9,
    date: "2026-03-10",
    type: "nps",
    name: "NPS Tier 1",
    amount: 5000,
    units: 1,
    nav: 5000,
  },
  {
    id: 10,
    date: "2026-02-15",
    type: "equity",
    name: "Infosys Ltd",
    amount: 6500,
    units: 3,
    nav: 2167,
  },
];

const fmt = (n) => `₹${Math.round(n).toLocaleString("en-IN")}`;

const card = {
  background: "var(--color-background-primary)",
  border: "0.5px solid var(--color-border-tertiary)",
  borderRadius: "var(--border-radius-lg)",
  padding: "1rem 1.25rem",
};

function MetricCard({ label, value, color, sub }) {
  return (
    <div
      style={{
        background: "var(--color-background-secondary)",
        borderRadius: "var(--border-radius-md)",
        padding: "1rem",
      }}
    >
      <div
        style={{
          fontSize: 12,
          color: "var(--color-text-secondary)",
          marginBottom: 4,
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontSize: 20,
          fontWeight: 500,
          color: color || "var(--color-text-primary)",
        }}
      >
        {value}
      </div>
      {sub && (
        <div
          style={{
            fontSize: 11,
            color: "var(--color-text-secondary)",
            marginTop: 2,
          }}
        >
          {sub}
        </div>
      )}
    </div>
  );
}

function ChartTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  return (
    <div
      style={{
        background: "var(--color-background-primary)",
        border: "0.5px solid var(--color-border-secondary)",
        borderRadius: 8,
        padding: "8px 12px",
        fontSize: 12,
      }}
    >
      <div
        style={{
          fontWeight: 500,
          color: "var(--color-text-primary)",
          marginBottom: 2,
        }}
      >
        {payload[0].name}
      </div>
      <div style={{ color: "var(--color-text-secondary)" }}>
        {fmt(payload[0].value)}
      </div>
    </div>
  );
}

function Legend({ items }) {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "8px 16px",
        marginBottom: 12,
      }}
    >
      {items.map((item) => (
        <span
          key={item.name}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            fontSize: 11,
            color: "var(--color-text-secondary)",
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: 2,
              background: item.color,
              flexShrink: 0,
            }}
          ></span>
          {item.name}
        </span>
      ))}
    </div>
  );
}

export default function BudgetTracker() {
  const today = new Date().toISOString().split("T")[0];
  const [transactions, setTransactions] = useState(SAMPLE_TX);
  const [investments, setInvestments] = useState(SAMPLE_INV);
  const [tab, setTab] = useState("dashboard");
  const [addMode, setAddMode] = useState("expense");
  const [filterMonth, setFilterMonth] = useState("all");
  const [txForm, setTxForm] = useState({
    date: today,
    amount: "",
    category: "food",
    description: "",
  });
  const [invForm, setInvForm] = useState({
    date: today,
    type: "sip",
    name: "",
    amount: "",
    units: "",
    nav: "",
  });
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const totalIncome = useMemo(
    () =>
      transactions
        .filter((t) => t.type === "income")
        .reduce((s, t) => s + t.amount, 0),
    [transactions]
  );
  const totalExpenses = useMemo(
    () =>
      transactions
        .filter((t) => t.type === "expense")
        .reduce((s, t) => s + t.amount, 0),
    [transactions]
  );
  const totalInvested = useMemo(
    () => investments.reduce((s, i) => s + i.amount, 0),
    [investments]
  );
  const netSavings = totalIncome - totalExpenses - totalInvested;

  const categoryData = useMemo(() => {
    const map = {};
    transactions
      .filter((t) => t.type === "expense")
      .forEach((t) => {
        map[t.category] = (map[t.category] || 0) + t.amount;
      });
    return Object.entries(map)
      .map(([cat, val]) => {
        const c = EXPENSE_CATEGORIES.find((x) => x.id === cat) || {
          label: cat,
          color: "#888",
        };
        return { name: c.label, value: val, color: c.color };
      })
      .sort((a, b) => b.value - a.value)
      .slice(0, 8);
  }, [transactions]);

  const monthlyData = useMemo(() => {
    const map = {};
    transactions.forEach((t) => {
      const m = new Date(t.date).getMonth();
      if (!map[m])
        map[m] = { month: MONTHS[m], expenses: 0, income: 0, idx: m };
      if (t.type === "expense") map[m].expenses += t.amount;
      else map[m].income += t.amount;
    });
    return Object.values(map).sort((a, b) => a.idx - b.idx);
  }, [transactions]);

  const invData = useMemo(() => {
    const map = {};
    investments.forEach((i) => {
      map[i.type] = (map[i.type] || 0) + i.amount;
    });
    return Object.entries(map)
      .map(([type, val]) => {
        const t = INVESTMENT_TYPES.find((x) => x.id === type) || {
          label: type,
          color: "#888",
        };
        return { name: t.label, value: val, color: t.color };
      })
      .sort((a, b) => b.value - a.value);
  }, [investments]);

  const filteredTx = useMemo(() => {
    let tx = transactions.filter((t) => t.type === "expense");
    if (filterMonth !== "all")
      tx = tx.filter(
        (t) => new Date(t.date).getMonth() === parseInt(filterMonth)
      );
    return tx.sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [transactions, filterMonth]);

  const addTransaction = () => {
    if (!txForm.amount || !txForm.date) return;
    const t = {
      ...txForm,
      id: Date.now(),
      amount: parseFloat(txForm.amount),
      type: addMode === "income" ? "income" : "expense",
    };
    if (addMode === "income") t.category = "income";
    setTransactions((prev) => [t, ...prev]);
    setTxForm({ ...txForm, amount: "", description: "" });
  };

  const addInvestment = () => {
    if (!invForm.amount || !invForm.name) return;
    const i = {
      ...invForm,
      id: Date.now(),
      amount: parseFloat(invForm.amount) || 0,
      units: parseFloat(invForm.units) || 0,
      nav: parseFloat(invForm.nav) || 0,
    };
    setInvestments((prev) => [i, ...prev]);
    setInvForm({ ...invForm, name: "", amount: "", units: "", nav: "" });
  };

  const deleteTransaction = (id) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
    setDeleteConfirm(null);
  };
  const deleteInvestment = (id) => {
    setInvestments((prev) => prev.filter((i) => i.id !== id));
    setDeleteConfirm(null);
  };

  const tabs = [
    { id: "dashboard", label: "Dashboard" },
    { id: "expenses", label: "Expenses" },
    { id: "investments", label: "Investments" },
    { id: "add", label: "+ Add entry" },
  ];

  const inputStyle = { width: "100%", boxSizing: "border-box", fontSize: 13 };

  return (
    <div
      style={{
        fontFamily: "var(--font-sans)",
        padding: "1rem 0",
        maxWidth: 680,
        margin: "0 auto",
      }}
    >
      <h2 className="sr-only">
        Personal Budget Tracker — Dashboard with spending, expenses, and
        investments
      </h2>

      {/* Header */}
      <div style={{ marginBottom: "1.25rem" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <div>
            <h1
              style={{
                fontSize: 22,
                fontWeight: 500,
                margin: 0,
                color: "var(--color-text-primary)",
              }}
            >
              Budget tracker
            </h1>
            <p
              style={{
                fontSize: 13,
                color: "var(--color-text-secondary)",
                margin: "3px 0 0",
              }}
            >
              Personal finance — April 2026
            </p>
          </div>
          <div
            style={{
              background: "#1D9E75",
              color: "white",
              borderRadius: "var(--border-radius-md)",
              padding: "4px 12px",
              fontSize: 12,
              fontWeight: 500,
            }}
          >
            {fmt(totalIncome - totalExpenses)} left
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div
        style={{
          display: "flex",
          borderBottom: "0.5px solid var(--color-border-tertiary)",
          marginBottom: "1.25rem",
          gap: 0,
        }}
      >
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            style={{
              background: "transparent",
              border: "none",
              borderBottom:
                tab === t.id ? "2px solid #1D9E75" : "2px solid transparent",
              padding: "8px 14px",
              fontSize: 13,
              fontWeight: tab === t.id ? 500 : 400,
              color:
                tab === t.id
                  ? "var(--color-text-primary)"
                  : "var(--color-text-secondary)",
              cursor: "pointer",
              transition: "color 0.15s",
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* ────── DASHBOARD ────── */}
      {tab === "dashboard" && (
        <div
          style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
        >
          {/* Metric cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
              gap: 10,
            }}
          >
            <MetricCard
              label="Total income"
              value={fmt(totalIncome)}
              color="#1D9E75"
            />
            <MetricCard
              label="Total expenses"
              value={fmt(totalExpenses)}
              color="#E24B4A"
            />
            <MetricCard
              label="Total invested"
              value={fmt(totalInvested)}
              color="#378ADD"
            />
            <MetricCard
              label="Net savings"
              value={fmt(Math.max(0, netSavings))}
              color={netSavings >= 0 ? "#1D9E75" : "#E24B4A"}
              sub={netSavings < 0 ? "Overspent!" : ""}
            />
          </div>

          {/* Savings rate bar */}
          <div style={card}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 8,
              }}
            >
              <span
                style={{ fontSize: 13, color: "var(--color-text-secondary)" }}
              >
                Savings rate
              </span>
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 500,
                  color:
                    totalIncome > 0 && netSavings / totalIncome >= 0.2
                      ? "#1D9E75"
                      : "#E24B4A",
                }}
              >
                {totalIncome > 0
                  ? Math.round((netSavings / totalIncome) * 100)
                  : 0}
                %
              </span>
            </div>
            <div
              style={{
                background: "var(--color-background-secondary)",
                borderRadius: 4,
                height: 8,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${Math.min(
                    100,
                    Math.max(
                      0,
                      totalIncome > 0 ? (netSavings / totalIncome) * 100 : 0
                    )
                  )}%`,
                  height: "100%",
                  background: "#1D9E75",
                  borderRadius: 4,
                  transition: "width 0.3s",
                }}
              ></div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 6,
                fontSize: 11,
                color: "var(--color-text-secondary)",
              }}
            >
              <span>Spent: {fmt(totalExpenses)}</span>
              <span>Invested: {fmt(totalInvested)}</span>
              <span>Saved: {fmt(Math.max(0, netSavings))}</span>
            </div>
          </div>

          {/* Expense pie + top categories */}
          <div style={card}>
            <div
              style={{
                fontSize: 13,
                fontWeight: 500,
                color: "var(--color-text-primary)",
                marginBottom: "0.75rem",
              }}
            >
              Spending breakdown
            </div>
            <Legend items={categoryData} />
            <div style={{ position: "relative", width: "100%", height: 220 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={85}
                    innerRadius={48}
                    paddingAngle={2}
                  >
                    {categoryData.map((c, i) => (
                      <Cell key={i} fill={c.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<ChartTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            {/* Top 3 */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: 8,
                marginTop: 8,
              }}
            >
              {categoryData.slice(0, 3).map((c) => (
                <div
                  key={c.name}
                  style={{
                    background: "var(--color-background-secondary)",
                    borderRadius: "var(--border-radius-md)",
                    padding: "8px 10px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                      marginBottom: 2,
                    }}
                  >
                    <span
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: c.color,
                      }}
                    ></span>
                    <span
                      style={{
                        fontSize: 11,
                        color: "var(--color-text-secondary)",
                      }}
                    >
                      {c.name}
                    </span>
                  </div>
                  <div
                    style={{
                      fontSize: 14,
                      fontWeight: 500,
                      color: "var(--color-text-primary)",
                    }}
                  >
                    {fmt(c.value)}
                  </div>
                  <div
                    style={{
                      fontSize: 10,
                      color: "var(--color-text-secondary)",
                    }}
                  >
                    {totalExpenses > 0
                      ? Math.round((c.value / totalExpenses) * 100)
                      : 0}
                    % of total
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Monthly bar chart */}
          <div style={card}>
            <div
              style={{
                fontSize: 13,
                fontWeight: 500,
                color: "var(--color-text-primary)",
                marginBottom: "0.75rem",
              }}
            >
              Monthly overview
            </div>
            <Legend
              items={[
                { name: "Income", color: "#1D9E75" },
                { name: "Expenses", color: "#E24B4A" },
              ]}
            />
            <div style={{ position: "relative", width: "100%", height: 200 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData} barCategoryGap="30%" barGap={3}>
                  <XAxis
                    dataKey="month"
                    tick={{ fontSize: 11, fill: "var(--color-text-secondary)" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 10, fill: "var(--color-text-secondary)" }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v) => `₹${Math.round(v / 1000)}k`}
                  />
                  <Tooltip content={<ChartTooltip />} />
                  <Bar
                    dataKey="income"
                    fill="#1D9E75"
                    radius={[3, 3, 0, 0]}
                    name="Income"
                  />
                  <Bar
                    dataKey="expenses"
                    fill="#E24B4A"
                    radius={[3, 3, 0, 0]}
                    name="Expenses"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Investment portfolio donut */}
          <div style={card}>
            <div
              style={{
                fontSize: 13,
                fontWeight: 500,
                color: "var(--color-text-primary)",
                marginBottom: "0.75rem",
              }}
            >
              Investment portfolio — {fmt(totalInvested)} total
            </div>
            <Legend items={invData} />
            <div style={{ position: "relative", width: "100%", height: 200 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={invData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    innerRadius={40}
                    paddingAngle={2}
                  >
                    {invData.map((c, i) => (
                      <Cell key={i} fill={c.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<ChartTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* ────── EXPENSES ────── */}
      {tab === "expenses" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <label
                style={{ fontSize: 12, color: "var(--color-text-secondary)" }}
              >
                Month:
              </label>
              <select
                value={filterMonth}
                onChange={(e) => setFilterMonth(e.target.value)}
                style={{ fontSize: 12, padding: "4px 8px" }}
              >
                <option value="all">All months</option>
                {MONTHS.map((m, i) => (
                  <option key={i} value={i}>
                    {m} 2026
                  </option>
                ))}
              </select>
            </div>
            <div style={{ fontSize: 12, color: "var(--color-text-secondary)" }}>
              {filteredTx.length} entries ·{" "}
              {fmt(filteredTx.reduce((s, t) => s + t.amount, 0))}
            </div>
          </div>

          <div style={card}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: 12,
                tableLayout: "fixed",
              }}
            >
              <colgroup>
                <col style={{ width: "22%" }} />
                <col style={{ width: "22%" }} />
                <col style={{ width: "38%" }} />
                <col style={{ width: "18%" }} />
              </colgroup>
              <thead>
                <tr
                  style={{
                    borderBottom: "0.5px solid var(--color-border-tertiary)",
                  }}
                >
                  {["Date", "Category", "Description", "Amount"].map((h, i) => (
                    <th
                      key={h}
                      style={{
                        padding: "8px 6px",
                        color: "var(--color-text-secondary)",
                        fontWeight: 500,
                        textAlign: i === 3 ? "right" : "left",
                        fontSize: 11,
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredTx.map((t) => {
                  const cat = EXPENSE_CATEGORIES.find(
                    (c) => c.id === t.category
                  ) || { label: t.category, color: "#888" };
                  return (
                    <tr
                      key={t.id}
                      style={{
                        borderBottom:
                          "0.5px solid var(--color-border-tertiary)",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.background =
                          "var(--color-background-secondary)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.background = "transparent")
                      }
                    >
                      <td
                        style={{
                          padding: "10px 6px",
                          color: "var(--color-text-secondary)",
                          fontSize: 11,
                        }}
                      >
                        {t.date}
                      </td>
                      <td style={{ padding: "10px 6px" }}>
                        <span
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 4,
                            background: "var(--color-background-secondary)",
                            borderRadius: 5,
                            padding: "2px 7px",
                            fontSize: 11,
                            whiteSpace: "nowrap",
                          }}
                        >
                          <span
                            style={{
                              width: 6,
                              height: 6,
                              borderRadius: "50%",
                              background: cat.color,
                              flexShrink: 0,
                            }}
                          ></span>
                          {cat.label}
                        </span>
                      </td>
                      <td
                        style={{
                          padding: "10px 6px",
                          color: "var(--color-text-primary)",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {t.description || "—"}
                      </td>
                      <td
                        style={{
                          padding: "10px 6px",
                          textAlign: "right",
                          fontWeight: 500,
                          color: "#E24B4A",
                        }}
                      >
                        <span
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-end",
                            gap: 8,
                          }}
                        >
                          {fmt(t.amount)}
                          {deleteConfirm === t.id ? (
                            <span style={{ display: "flex", gap: 4 }}>
                              <button
                                onClick={() => deleteTransaction(t.id)}
                                style={{
                                  background: "#E24B4A",
                                  color: "white",
                                  border: "none",
                                  borderRadius: 4,
                                  padding: "1px 6px",
                                  fontSize: 10,
                                  cursor: "pointer",
                                }}
                              >
                                Del
                              </button>
                              <button
                                onClick={() => setDeleteConfirm(null)}
                                style={{
                                  background:
                                    "var(--color-background-secondary)",
                                  border:
                                    "0.5px solid var(--color-border-secondary)",
                                  borderRadius: 4,
                                  padding: "1px 6px",
                                  fontSize: 10,
                                  cursor: "pointer",
                                  color: "var(--color-text-secondary)",
                                }}
                              >
                                No
                              </button>
                            </span>
                          ) : (
                            <button
                              onClick={() => setDeleteConfirm(t.id)}
                              style={{
                                background: "transparent",
                                border: "none",
                                cursor: "pointer",
                                color: "var(--color-text-secondary)",
                                fontSize: 14,
                                lineHeight: 1,
                                padding: 0,
                              }}
                            >
                              ×
                            </button>
                          )}
                        </span>
                      </td>
                    </tr>
                  );
                })}
                {filteredTx.length === 0 && (
                  <tr>
                    <td
                      colSpan={4}
                      style={{
                        padding: "2rem",
                        textAlign: "center",
                        color: "var(--color-text-secondary)",
                        fontSize: 13,
                      }}
                    >
                      No expenses for this period
                    </td>
                  </tr>
                )}
              </tbody>
              {filteredTx.length > 0 && (
                <tfoot>
                  <tr
                    style={{
                      borderTop: "0.5px solid var(--color-border-secondary)",
                    }}
                  >
                    <td
                      colSpan={3}
                      style={{
                        padding: "10px 6px",
                        fontWeight: 500,
                        fontSize: 12,
                      }}
                    >
                      Total expenses
                    </td>
                    <td
                      style={{
                        padding: "10px 6px",
                        textAlign: "right",
                        fontWeight: 500,
                        color: "#E24B4A",
                        fontSize: 13,
                      }}
                    >
                      {fmt(filteredTx.reduce((s, t) => s + t.amount, 0))}
                    </td>
                  </tr>
                </tfoot>
              )}
            </table>
          </div>
        </div>
      )}

      {/* ────── INVESTMENTS ────── */}
      {tab === "investments" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
              gap: 10,
            }}
          >
            <MetricCard
              label="Total invested"
              value={fmt(totalInvested)}
              color="#378ADD"
            />
            <MetricCard label="Holdings" value={investments.length} />
            <MetricCard
              label="Asset types"
              value={new Set(investments.map((i) => i.type)).size}
            />
          </div>

          {/* By type breakdown bar */}
          <div style={card}>
            <div
              style={{
                fontSize: 13,
                fontWeight: 500,
                color: "var(--color-text-primary)",
                marginBottom: "0.75rem",
              }}
            >
              Allocation by type
            </div>
            {invData.map((d) => (
              <div key={d.name} style={{ marginBottom: 8 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 3,
                  }}
                >
                  <span
                    style={{
                      fontSize: 12,
                      color: "var(--color-text-secondary)",
                    }}
                  >
                    {d.name}
                  </span>
                  <span
                    style={{
                      fontSize: 12,
                      fontWeight: 500,
                      color: "var(--color-text-primary)",
                    }}
                  >
                    {fmt(d.value)}{" "}
                    <span
                      style={{
                        fontWeight: 400,
                        color: "var(--color-text-secondary)",
                      }}
                    >
                      (
                      {totalInvested > 0
                        ? Math.round((d.value / totalInvested) * 100)
                        : 0}
                      %)
                    </span>
                  </span>
                </div>
                <div
                  style={{
                    background: "var(--color-background-secondary)",
                    borderRadius: 3,
                    height: 6,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: `${
                        totalInvested > 0 ? (d.value / totalInvested) * 100 : 0
                      }%`,
                      height: "100%",
                      background: d.color,
                      borderRadius: 3,
                      transition: "width 0.3s",
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <div style={card}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: 12,
                tableLayout: "fixed",
              }}
            >
              <colgroup>
                <col style={{ width: "20%" }} />
                <col style={{ width: "22%" }} />
                <col style={{ width: "32%" }} />
                <col style={{ width: "26%" }} />
              </colgroup>
              <thead>
                <tr
                  style={{
                    borderBottom: "0.5px solid var(--color-border-tertiary)",
                  }}
                >
                  {["Date", "Type", "Name", "Amount"].map((h, i) => (
                    <th
                      key={h}
                      style={{
                        padding: "8px 6px",
                        color: "var(--color-text-secondary)",
                        fontWeight: 500,
                        textAlign: i === 3 ? "right" : "left",
                        fontSize: 11,
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {investments
                  .sort((a, b) => new Date(b.date) - new Date(a.date))
                  .map((inv) => {
                    const t = INVESTMENT_TYPES.find(
                      (x) => x.id === inv.type
                    ) || { label: inv.type, color: "#888" };
                    return (
                      <tr
                        key={inv.id}
                        style={{
                          borderBottom:
                            "0.5px solid var(--color-border-tertiary)",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.background =
                            "var(--color-background-secondary)")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.background = "transparent")
                        }
                      >
                        <td
                          style={{
                            padding: "10px 6px",
                            color: "var(--color-text-secondary)",
                            fontSize: 11,
                          }}
                        >
                          {inv.date}
                        </td>
                        <td style={{ padding: "10px 6px" }}>
                          <span
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: 4,
                              background: "var(--color-background-secondary)",
                              borderRadius: 5,
                              padding: "2px 7px",
                              fontSize: 11,
                            }}
                          >
                            <span
                              style={{
                                width: 6,
                                height: 6,
                                borderRadius: "50%",
                                background: t.color,
                                flexShrink: 0,
                              }}
                            ></span>
                            {t.label}
                          </span>
                        </td>
                        <td
                          style={{
                            padding: "10px 6px",
                            color: "var(--color-text-primary)",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {inv.name}
                        </td>
                        <td
                          style={{
                            padding: "10px 6px",
                            textAlign: "right",
                            fontWeight: 500,
                            color: "#378ADD",
                          }}
                        >
                          <span
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "flex-end",
                              gap: 8,
                            }}
                          >
                            {fmt(inv.amount)}
                            {deleteConfirm === inv.id ? (
                              <span style={{ display: "flex", gap: 4 }}>
                                <button
                                  onClick={() => deleteInvestment(inv.id)}
                                  style={{
                                    background: "#E24B4A",
                                    color: "white",
                                    border: "none",
                                    borderRadius: 4,
                                    padding: "1px 6px",
                                    fontSize: 10,
                                    cursor: "pointer",
                                  }}
                                >
                                  Del
                                </button>
                                <button
                                  onClick={() => setDeleteConfirm(null)}
                                  style={{
                                    background:
                                      "var(--color-background-secondary)",
                                    border:
                                      "0.5px solid var(--color-border-secondary)",
                                    borderRadius: 4,
                                    padding: "1px 6px",
                                    fontSize: 10,
                                    cursor: "pointer",
                                    color: "var(--color-text-secondary)",
                                  }}
                                >
                                  No
                                </button>
                              </span>
                            ) : (
                              <button
                                onClick={() => setDeleteConfirm(inv.id)}
                                style={{
                                  background: "transparent",
                                  border: "none",
                                  cursor: "pointer",
                                  color: "var(--color-text-secondary)",
                                  fontSize: 14,
                                  lineHeight: 1,
                                  padding: 0,
                                }}
                              >
                                ×
                              </button>
                            )}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
              <tfoot>
                <tr
                  style={{
                    borderTop: "0.5px solid var(--color-border-secondary)",
                  }}
                >
                  <td
                    colSpan={3}
                    style={{
                      padding: "10px 6px",
                      fontWeight: 500,
                      fontSize: 12,
                    }}
                  >
                    Total portfolio
                  </td>
                  <td
                    style={{
                      padding: "10px 6px",
                      textAlign: "right",
                      fontWeight: 500,
                      color: "#378ADD",
                      fontSize: 13,
                    }}
                  >
                    {fmt(totalInvested)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      )}

      {/* ────── ADD ENTRY ────── */}
      {tab === "add" && (
        <div
          style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
        >
          {/* Mode selector */}
          <div style={{ display: "flex", gap: 8 }}>
            {[
              ["expense", "Expense", "#E24B4A"],
              ["income", "Income", "#1D9E75"],
              ["investment", "Investment", "#378ADD"],
            ].map(([m, label, color]) => (
              <button
                key={m}
                onClick={() => setAddMode(m)}
                style={{
                  background: addMode === m ? color + "18" : "transparent",
                  border: `0.5px solid ${
                    addMode === m ? color : "var(--color-border-tertiary)"
                  }`,
                  borderRadius: "var(--border-radius-md)",
                  padding: "6px 14px",
                  fontSize: 13,
                  cursor: "pointer",
                  color: addMode === m ? color : "var(--color-text-secondary)",
                  fontWeight: addMode === m ? 500 : 400,
                }}
              >
                {label}
              </button>
            ))}
          </div>

          {addMode !== "investment" ? (
            <div style={card}>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 500,
                  color: "var(--color-text-primary)",
                  marginBottom: "1rem",
                }}
              >
                Add {addMode === "income" ? "income" : "expense"}
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 12,
                }}
              >
                <div>
                  <label
                    style={{
                      fontSize: 11,
                      color: "var(--color-text-secondary)",
                      display: "block",
                      marginBottom: 4,
                    }}
                  >
                    Date
                  </label>
                  <input
                    type="date"
                    value={txForm.date}
                    onChange={(e) =>
                      setTxForm({ ...txForm, date: e.target.value })
                    }
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label
                    style={{
                      fontSize: 11,
                      color: "var(--color-text-secondary)",
                      display: "block",
                      marginBottom: 4,
                    }}
                  >
                    Amount (₹)
                  </label>
                  <input
                    type="number"
                    value={txForm.amount}
                    onChange={(e) =>
                      setTxForm({ ...txForm, amount: e.target.value })
                    }
                    placeholder="0.00"
                    style={inputStyle}
                  />
                </div>
                {addMode === "expense" && (
                  <div>
                    <label
                      style={{
                        fontSize: 11,
                        color: "var(--color-text-secondary)",
                        display: "block",
                        marginBottom: 4,
                      }}
                    >
                      Category
                    </label>
                    <select
                      value={txForm.category}
                      onChange={(e) =>
                        setTxForm({ ...txForm, category: e.target.value })
                      }
                      style={inputStyle}
                    >
                      {EXPENSE_CATEGORIES.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.label}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                <div
                  style={{
                    gridColumn: addMode === "income" ? "1 / -1" : "auto",
                  }}
                >
                  <label
                    style={{
                      fontSize: 11,
                      color: "var(--color-text-secondary)",
                      display: "block",
                      marginBottom: 4,
                    }}
                  >
                    Description
                  </label>
                  <input
                    type="text"
                    value={txForm.description}
                    onChange={(e) =>
                      setTxForm({ ...txForm, description: e.target.value })
                    }
                    placeholder={
                      addMode === "income"
                        ? "e.g. Monthly salary"
                        : "e.g. Grocery shopping"
                    }
                    style={inputStyle}
                  />
                </div>
              </div>
              <button
                onClick={addTransaction}
                style={{
                  marginTop: 14,
                  background: addMode === "income" ? "#1D9E75" : "#E24B4A",
                  color: "white",
                  border: "none",
                  borderRadius: "var(--border-radius-md)",
                  padding: "9px 22px",
                  fontSize: 13,
                  fontWeight: 500,
                  cursor: "pointer",
                }}
              >
                Add {addMode}
              </button>
            </div>
          ) : (
            <div style={card}>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 500,
                  color: "var(--color-text-primary)",
                  marginBottom: "1rem",
                }}
              >
                Add investment
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 12,
                }}
              >
                <div>
                  <label
                    style={{
                      fontSize: 11,
                      color: "var(--color-text-secondary)",
                      display: "block",
                      marginBottom: 4,
                    }}
                  >
                    Date
                  </label>
                  <input
                    type="date"
                    value={invForm.date}
                    onChange={(e) =>
                      setInvForm({ ...invForm, date: e.target.value })
                    }
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label
                    style={{
                      fontSize: 11,
                      color: "var(--color-text-secondary)",
                      display: "block",
                      marginBottom: 4,
                    }}
                  >
                    Investment type
                  </label>
                  <select
                    value={invForm.type}
                    onChange={(e) =>
                      setInvForm({ ...invForm, type: e.target.value })
                    }
                    style={inputStyle}
                  >
                    {INVESTMENT_TYPES.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div style={{ gridColumn: "1 / -1" }}>
                  <label
                    style={{
                      fontSize: 11,
                      color: "var(--color-text-secondary)",
                      display: "block",
                      marginBottom: 4,
                    }}
                  >
                    Name / Fund / Stock
                  </label>
                  <input
                    type="text"
                    value={invForm.name}
                    onChange={(e) =>
                      setInvForm({ ...invForm, name: e.target.value })
                    }
                    placeholder="e.g. Axis Bluechip Fund, Reliance Industries..."
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label
                    style={{
                      fontSize: 11,
                      color: "var(--color-text-secondary)",
                      display: "block",
                      marginBottom: 4,
                    }}
                  >
                    Amount invested (₹)
                  </label>
                  <input
                    type="number"
                    value={invForm.amount}
                    onChange={(e) =>
                      setInvForm({ ...invForm, amount: e.target.value })
                    }
                    placeholder="0.00"
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label
                    style={{
                      fontSize: 11,
                      color: "var(--color-text-secondary)",
                      display: "block",
                      marginBottom: 4,
                    }}
                  >
                    Units / Qty
                  </label>
                  <input
                    type="number"
                    value={invForm.units}
                    onChange={(e) =>
                      setInvForm({ ...invForm, units: e.target.value })
                    }
                    placeholder="0"
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label
                    style={{
                      fontSize: 11,
                      color: "var(--color-text-secondary)",
                      display: "block",
                      marginBottom: 4,
                    }}
                  >
                    NAV / Buy price (₹)
                  </label>
                  <input
                    type="number"
                    value={invForm.nav}
                    onChange={(e) =>
                      setInvForm({ ...invForm, nav: e.target.value })
                    }
                    placeholder="0.00"
                    style={inputStyle}
                  />
                </div>
              </div>
              <button
                onClick={addInvestment}
                style={{
                  marginTop: 14,
                  background: "#378ADD",
                  color: "white",
                  border: "none",
                  borderRadius: "var(--border-radius-md)",
                  padding: "9px 22px",
                  fontSize: 13,
                  fontWeight: 500,
                  cursor: "pointer",
                }}
              >
                Add investment
              </button>
            </div>
          )}

          {/* Quick tips */}
          <div
            style={{
              background: "var(--color-background-secondary)",
              borderRadius: "var(--border-radius-md)",
              padding: "0.75rem 1rem",
            }}
          >
            <div
              style={{
                fontSize: 11,
                fontWeight: 500,
                color: "var(--color-text-secondary)",
                marginBottom: 6,
              }}
            >
              Quick tips
            </div>
            <ul
              style={{
                margin: 0,
                padding: "0 0 0 16px",
                fontSize: 11,
                color: "var(--color-text-secondary)",
                lineHeight: 1.7,
              }}
            >
              <li>Add your monthly salary as income first</li>
              <li>Log SIP investments on the 1st of each month</li>
              <li>Use the Expenses tab to filter by month</li>
              <li>Click × on any row to delete an entry</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
