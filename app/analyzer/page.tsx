"use client";
import { useState, useMemo } from "react";
import axios from "axios";
import { motion } from "framer-motion";

export default function Home() {
  const [formData, setFormData] = useState({
    age: "",
    gender: "1",
    height: "",
    weight: "",
    ap_hi: "",
    ap_lo: "",
    cholesterol: "1",
    gluc: "1",
    smoke: "0",
    alco: "0",
    active: "1",
  });

  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const bmi = useMemo(() => {
    const h = Number(formData.height) / 100;
    const w = Number(formData.weight);
    if (!h || !w) return null;
    return (w / (h * h)).toFixed(1);
  }, [formData.height, formData.weight]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}`,
        {
          ...formData,
          age: Number(formData.age),
          height: Number(formData.height),
          weight: Number(formData.weight),
          ap_hi: Number(formData.ap_hi),
          ap_lo: Number(formData.ap_lo),
          gender: Number(formData.gender),
          cholesterol: Number(formData.cholesterol),
          gluc: Number(formData.gluc),
          smoke: Number(formData.smoke),
          alco: Number(formData.alco),
          active: Number(formData.active),
        },
        {
          timeout: 120000,
        }
      );

      setResult(response.data);
    } catch (error) {
      console.log(error);
      alert("Backend is waking up. Please wait 30-60 seconds and try again.");
    }

    setLoading(false);
  };

  const getSeverity = (prob: number) => {
    if (prob < 0.3)
      return { label: "Low Risk", color: "text-green-400", badge: "bg-green-600" };
    if (prob < 0.7)
      return { label: "Moderate Risk", color: "text-yellow-400", badge: "bg-yellow-600" };
    return { label: "High Risk", color: "text-red-400", badge: "bg-red-600" };
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white px-6 py-16 max-w-7xl mx-auto">

      <div className="mb-12">
        <h1 className="text-4xl font-bold">
          Cardiovascular Risk Assessment
        </h1>
        <p className="text-gray-400 mt-2">
          AI-powered clinical evaluation system for early detection.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-10">

        <div className="lg:col-span-2 space-y-8">

          <MedicalCard title="Personal Information">
            <Input label="Age" name="age" handleChange={handleChange} />
            <Select
              label="Gender"
              name="gender"
              options={[
                { value: "1", label: "Male" },
                { value: "2", label: "Female" },
              ]}
              handleChange={handleChange}
            />
          </MedicalCard>

          <MedicalCard title="Clinical Measurements">
            <Input label="Height (cm)" name="height" handleChange={handleChange} />
            <Input label="Weight (kg)" name="weight" handleChange={handleChange} />
            <Input label="Systolic BP" name="ap_hi" handleChange={handleChange} />
            <Input label="Diastolic BP" name="ap_lo" handleChange={handleChange} />
          </MedicalCard>

          <MedicalCard title="Lifestyle & Laboratory Data">
            <Select label="Cholesterol Level" name="cholesterol"
              options={[
                { value: "1", label: "Normal" },
                { value: "2", label: "Above Normal" },
                { value: "3", label: "High" },
              ]}
              handleChange={handleChange}
            />
            <Select label="Glucose Level" name="gluc"
              options={[
                { value: "1", label: "Normal" },
                { value: "2", label: "Above Normal" },
                { value: "3", label: "High" },
              ]}
              handleChange={handleChange}
            />
            <Select label="Smoking Status" name="smoke"
              options={[
                { value: "0", label: "Non-Smoker" },
                { value: "1", label: "Current Smoker" },
              ]}
              handleChange={handleChange}
            />
            <Select label="Alcohol Consumption" name="alco"
              options={[
                { value: "0", label: "No" },
                { value: "1", label: "Yes" },
              ]}
              handleChange={handleChange}
            />
            <Select label="Physical Activity" name="active"
              options={[
                { value: "1", label: "Physically Active" },
                { value: "0", label: "Sedentary" },
              ]}
              handleChange={handleChange}
            />
          </MedicalCard>

          <button
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 
                       py-4 rounded-xl font-semibold 
                       transition shadow-lg"
          >
            {loading ? "Analyzing..." : "Generate Clinical Report"}
          </button>
        </div>

        <div className="bg-[#111827] border border-[#1F2937] rounded-2xl p-8 shadow-xl h-fit">

          <h3 className="text-xl font-semibold mb-6">
            Patient Summary
          </h3>

          <div className="space-y-3 text-sm text-gray-400">
            <p><strong>BMI:</strong> {bmi ?? "—"}</p>
            <p><strong>Age:</strong> {formData.age || "—"}</p>
            <p><strong>Systolic BP:</strong> {formData.ap_hi || "—"}</p>
            <p><strong>Diastolic BP:</strong> {formData.ap_lo || "—"}</p>
          </div>

          {result && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 space-y-6"
            >
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Risk Level</span>
                <span className={`px-4 py-1 rounded-full text-white text-sm ${getSeverity(result.probability).badge}`}>
                  {getSeverity(result.probability).label}
                </span>
              </div>

              <div>
                <p className={`text-4xl font-bold ${getSeverity(result.probability).color}`}>
                  {(result.probability * 100).toFixed(2)}%
                </p>
                <p className="text-sm text-gray-500">
                  Probability of cardiovascular disease
                </p>
              </div>

              <div className="bg-[#0F172A] border border-[#1F2937] p-6 rounded-xl space-y-4 text-sm text-gray-300">

                {result.probability < 0.3 && (
                  <>
                    <p><strong>Doctor Interpretation:</strong> Low probability of cardiovascular disease.</p>
                    <p><strong>Recommendation:</strong> Maintain healthy lifestyle and annual checkups.</p>
                    <p><strong>Medication:</strong> Not required unless physician advises.</p>
                  </>
                )}

                {result.probability >= 0.3 && result.probability < 0.7 && (
                  <>
                    <p><strong>Doctor Interpretation:</strong> Moderate cardiovascular risk detected.</p>
                    <p><strong>Recommendation:</strong> Physician consultation recommended. Lifestyle modification required.</p>
                    <p><strong>Possible Medicines (If Prescribed):</strong> BP control drugs, statins, glucose control medicines.</p>
                  </>
                )}

                {result.probability >= 0.7 && (
                  <>
                    <p><strong>Doctor Interpretation:</strong> High cardiovascular risk.</p>
                    <p><strong>Recommendation:</strong> Immediate cardiology evaluation required.</p>
                    <p><strong>Possible Medicines (Doctor Only):</strong> Statins, ACE inhibitors, beta blockers, blood sugar control medicines.</p>
                  </>
                )}

              </div>

              <div className="bg-red-900/30 border border-red-700 text-red-400 p-4 rounded-lg text-xs">
                ⚠️ This AI system provides risk prediction support only and does not replace professional medical diagnosis.
              </div>

            </motion.div>
          )}
        </div>
      </form>
    </div>
  );
}


function MedicalCard({ title, children }: any) {
  return (
    <div className="bg-[#111827] border border-[#1F2937] rounded-2xl p-8 shadow-lg">
      <h2 className="text-lg font-semibold mb-6">{title}</h2>
      <div className="grid md:grid-cols-2 gap-6">{children}</div>
    </div>
  );
}

function Input({ label, name, handleChange }: any) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2 text-gray-400">
        {label}
      </label>
      <input
        name={name}
        type="number"
        onChange={handleChange}
        required
        className="w-full bg-[#0F172A] border border-[#1F2937] 
                   rounded-lg p-3 text-white 
                   focus:ring-2 focus:ring-indigo-500 outline-none"
      />
    </div>
  );
}

function Select({ label, name, options, handleChange }: any) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2 text-gray-400">
        {label}
      </label>
      <select
        name={name}
        onChange={handleChange}
        className="w-full bg-[#0F172A] border border-[#1F2937] 
                   rounded-lg p-3 text-white 
                   focus:ring-2 focus:ring-indigo-500 outline-none"
      >
        {options.map((opt: any) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}