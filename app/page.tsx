"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  BarChart,
  Bar,
} from "recharts";

const lineData = [
  { name: "Jan", risk: 20 },
  { name: "Feb", risk: 35 },
  { name: "Mar", risk: 30 },
  { name: "Apr", risk: 50 },
  { name: "May", risk: 45 },
  { name: "Jun", risk: 60 },
];

const pieData = [
  { name: "Low Risk", value: 60 },
  { name: "Moderate Risk", value: 25 },
  { name: "High Risk", value: 15 },
];

const areaData = [
  { age: "30", score: 20 },
  { age: "40", score: 35 },
  { age: "50", score: 55 },
  { age: "60", score: 75 },
  { age: "70", score: 90 },
];

const barData = [
  { age: "30-40", risk: 25 },
  { age: "40-50", risk: 45 },
  { age: "50-60", risk: 65 },
  { age: "60-70", risk: 80 },
];

const COLORS = ["#6366F1", "#8B5CF6", "#A78BFA"];

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-[#0B0F19] text-white overflow-hidden">

      <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-indigo-900/20 via-purple-900/10 to-black animate-pulse" />
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="relative z-10">

        <section className="px-6 py-28 text-center max-w-6xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-extrabold leading-tight"
          >
            AI-Powered{" "}
            <span className="text-indigo-400">
              Cardiovascular Intelligence Platform
            </span>
          </motion.h1>

          <p className="mt-6 text-lg text-gray-400 max-w-3xl mx-auto">
            Enterprise-grade cardiovascular risk detection powered by machine learning,
            real-time analytics, and clinical-grade predictive modeling.
          </p>

          <div className="mt-10 flex justify-center gap-6 flex-wrap">
            <Link
              href="/analyzer"
              className="px-8 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-indigo-500/30"
            >
              Launch AI Analyzer
            </Link>

            <Link
              href="/about"
              className="px-8 py-3 rounded-xl border border-gray-700 hover:border-indigo-500 transition-all duration-300 text-gray-300 hover:text-white"
            >
              Explore Platform
            </Link>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 mb-20">
          <div className="grid md:grid-cols-4 gap-6 backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 shadow-xl">
            <KPI value="98%" label="Clinical Accuracy" />
            <KPI value="10K+" label="Patient Analyses" />
            <KPI value="250+" label="Hospitals Integrated" />
            <KPI value="24/7" label="AI Monitoring" />
          </div>
        </section>

        <section className="grid md:grid-cols-2 gap-10 px-6 max-w-6xl mx-auto">

          <Card title="Predictive Risk Trend">
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={lineData}>
                <XAxis dataKey="name" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip />
                <Line type="monotone" dataKey="risk" stroke="#6366F1" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          <Card title="Population Risk Distribution">
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie data={pieData} outerRadius={90} dataKey="value" label>
                  {pieData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>

          <Card title="Risk Progression by Age">
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={areaData}>
                <XAxis dataKey="age" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="score"
                  stroke="#8B5CF6"
                  fill="#8B5CF6"
                  fillOpacity={0.2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </Card>

          <Card title="Age Group Risk Comparison">
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={barData}>
                <XAxis dataKey="age" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip />
                <Bar dataKey="risk" fill="#6366F1" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>

        </section>

        <section className="mt-28 px-6 max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          <InfoCard
            title="1. Patient Data Intake"
            desc="Secure collection of patient vitals, blood reports, lifestyle metrics, and clinical parameters."
          />
          <InfoCard
            title="2. AI Model Processing"
            desc="Advanced neural networks evaluate patterns, correlations, and predictive risk probabilities."
          />
          <InfoCard
            title="3. Structured Medical Report"
            desc="Automated AI-generated cardiovascular risk summary with decision-support insights."
          />
        </section>

        <section className="mt-28 px-6 max-w-4xl mx-auto text-center pb-28">
          <h2 className="text-3xl font-bold mb-6 text-indigo-400">
            Security & Compliance
          </h2>
          <p className="text-gray-400 leading-relaxed">
            End-to-end encrypted data transmission, role-based access control,
            HIPAA-aligned security standards, and enterprise infrastructure
            ensuring medical data confidentiality and integrity.
          </p>

          <div className="mt-10">
            <Link
              href="/analyzer"
              className="px-10 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-indigo-500/30"
            >
              Start Clinical AI Analysis
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}

function Card({ title, children }: any) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="bg-[#111827] border border-[#1F2937] rounded-2xl p-8 shadow-xl transition-all"
    >
      <h3 className="text-lg font-semibold mb-6 text-white">{title}</h3>
      {children}
    </motion.div>
  );
}

function KPI({ value, label }: any) {
  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold text-indigo-400">{value}</h2>
      <p className="text-gray-400 mt-1 text-sm">{label}</p>
    </div>
  );
}

function InfoCard({ title, desc }: any) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="bg-[#111827] border border-[#1F2937] rounded-2xl p-8 shadow-xl transition-all"
    >
      <h3 className="text-lg font-semibold mb-4 text-white">{title}</h3>
      <p className="text-gray-400 leading-relaxed">{desc}</p>
    </motion.div>
  );
}