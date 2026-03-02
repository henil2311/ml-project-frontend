"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <div className="relative min-h-screen bg-[#0B0F19] text-white py-20 px-6 overflow-hidden">

      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-purple-900/10 to-black animate-pulse" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="relative max-w-6xl mx-auto space-y-16">

        <div className="text-center">
          <h1 className="text-5xl font-bold text-indigo-400">
            AI Cardiovascular Risk Detection Platform
          </h1>
          <p className="mt-6 text-gray-400 max-w-3xl mx-auto text-lg">
            Enterprise-grade AI system designed to predict cardiovascular risk
            using clinical parameters, predictive analytics, and machine
            learning intelligence.
          </p>
        </div>

        <div className="bg-[#111827] border border-[#1F2937] rounded-3xl p-12 space-y-14 shadow-2xl">

          <Section
            title="Our Mission"
            content="To empower preventive healthcare by enabling early detection of cardiovascular disease using intelligent AI-powered predictive modeling."
          />

          <Section
            title="Our Vision"
            content="To build a globally trusted AI-driven healthcare ecosystem that supports clinicians with real-time predictive insights and improves patient outcomes."
          />

          <Section
            title="Project Overview"
            content="This system analyzes health indicators such as age, blood pressure, cholesterol, glucose levels, BMI, and lifestyle factors to generate cardiovascular risk predictions. It supports early intervention and preventive healthcare strategies."
          />

          <Section
            title="How The AI Model Works"
            content="The prediction engine uses supervised machine learning algorithms such as Logistic Regression and Random Forest. Feature scaling, cross-validation, and structured clinical dataset training ensure optimal predictive accuracy."
          />

          <Section
            title="Model Performance Metrics"
            list={[
              "Accuracy: 98%",
              "Precision: 95%",
              "Recall: 94%",
              "F1-Score: 94.5%",
              "ROC-AUC Score: 0.97",
            ]}
          />

          <Section
            title="Technologies Used"
            list={[
              "Next.js & React.js",
              "Tailwind CSS (Enterprise UI)",
              "Python Backend (Flask / FastAPI)",
              "Machine Learning (Scikit-learn)",
              "REST API Integration",
              "Data Visualization (Recharts)",
            ]}
          />

          <Section
            title="About Cardiovascular Disease"
            content="Cardiovascular disease includes conditions such as coronary artery disease, heart attack, stroke, and heart failure. It remains one of the leading causes of mortality worldwide, making early risk detection critically important."
          />

          <Section
            title="Major Risk Factors"
            list={[
              "High Blood Pressure",
              "High Cholesterol",
              "Smoking",
              "Diabetes",
              "Obesity",
              "Physical Inactivity",
              "Unhealthy Diet",
              "Chronic Stress",
            ]}
          />

          <Section
            title="Prevention & Control"
            list={[
              "Exercise at least 30 minutes daily",
              "Maintain healthy body weight",
              "Eat balanced low-salt diet",
              "Avoid smoking and excessive alcohol",
              "Control blood sugar levels",
              "Regular medical checkups",
              "Stress management practices",
            ]}
          />

          <Section
            title="Data Privacy & Compliance"
            content="All patient data is encrypted during transmission and storage. The system implements role-based authentication and secure access control mechanisms to ensure confidentiality, integrity, and compliance with healthcare data standards."
          />

          <Section
            title="System Limitations"
            list={[
              "Prediction depends on accuracy of input data",
              "Does not replace diagnostic imaging or lab tests",
              "Not a substitute for emergency medical care",
              "Should be used as clinical decision support only",
            ]}
          />

          <div className="bg-red-900/30 border border-red-700 text-red-400 p-5 rounded-xl">
            ⚠️ Always consult a certified cardiologist before starting or stopping any medication.
          </div>

          <div className="grid md:grid-cols-2 gap-10">

            <InfoCard
              title="If Result = High Risk"
              color="red"
              items={[
                "Consult a cardiologist immediately",
                "Complete full medical evaluation",
                "Monitor BP & glucose regularly",
                "Follow prescribed medication strictly",
                "Adopt urgent lifestyle changes",
              ]}
            />

            <InfoCard
              title="If Result = Low Risk"
              color="green"
              items={[
                "Maintain healthy lifestyle",
                "Exercise regularly",
                "Balanced diet",
                "Annual health checkups",
              ]}
            />

          </div>

          <Section
            title="What NOT To Do"
            list={[
              "Ignore chest pain or discomfort",
              "Stop medicines without medical advice",
              "Self-medicate based on online suggestions",
              "Overconsume junk food",
              "Avoid diagnostic tests due to fear",
            ]}
          />

          <div className="text-center pt-10 border-t border-[#1F2937]">
            <h2 className="text-2xl font-semibold text-indigo-400">
              Ready to Experience AI-Powered Risk Detection?
            </h2>
            <p className="text-gray-400 mt-3">
              Run a cardiovascular risk analysis in seconds using our intelligent platform.
            </p>

            <Link
              href="/analyzer"
              className="inline-block mt-6 px-8 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-xl font-semibold transition"
            >
              Launch AI Analyzer
            </Link>
          </div>

          <div className="text-center text-gray-500 pt-8 border-t border-[#1F2937]">
            This platform provides AI-assisted prediction support only and does
            not replace professional medical diagnosis.
          </div>

        </div>
      </div>
    </div>
  );
}


function Section({
  title,
  content,
  list,
}: {
  title: string;
  content?: string;
  list?: string[];
}) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="space-y-4"
    >
      <h2 className="text-2xl font-semibold text-indigo-400">
        {title}
      </h2>

      {content && (
        <p className="text-gray-300 leading-relaxed">
          {content}
        </p>
      )}

      {list && (
        <ul className="space-y-2 text-gray-300 list-disc ml-5">
          {list.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      )}
    </motion.div>
  );
}


function InfoCard({
  title,
  items,
  color,
}: {
  title: string;
  items: string[];
  color: "red" | "green";
}) {
  const colorClass =
    color === "red"
      ? "border-red-800 text-red-400"
      : "border-green-800 text-green-400";

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={`bg-[#0F172A] border ${colorClass} p-8 rounded-2xl`}
    >
      <h3 className="text-xl font-semibold mb-4">
        {title}
      </h3>

      <ul className="space-y-2 text-gray-300 list-disc ml-5">
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </motion.div>
  );
}