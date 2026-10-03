export type SkillGroup = { name: string; items: string[] };

export const skills: SkillGroup[] = [
  { name: "Languages", items: ["Python", "TypeScript", "JavaScript", "Java", "C", "C++", "SQL", "MATLAB", "VBA", "Assembly", "Verilog HDL"] },
  { name: "Web & Backend", items: ["Next.js", "React", "Node.js", "Flask", "FastAPI", "REST APIs", "SQLAlchemy", "MySQL", "MongoDB", "Postgres (Supabase)", "Oracle APEX"] },
  { name: "AI & Data", items: ["LangGraph", "LangChain", "Gemini API", "Ollama", "Pandas", "NumPy", "Dash", "SAP Analytics Cloud", "Predictive modelling"] },
  { name: "Controls & Embedded", items: ["PLC ladder logic", "WAGO e!COCKPIT", "Siemens TIA Portal V17", "PIC16F18877", "Arduino", "Raspberry Pi Pico", "FPGA / Quartus", "Industry 4.0"] },
  { name: "Blockchain", items: ["Starknet", "Polkadot", "Radix", "Stellar SDK", "Solidity"] },
  { name: "Tools", items: ["Git", "SAP", "Excel / VBA", "Fusion 360", "LabVIEW", "PSPICE / OrCAD", "MPLAB X", "UML"] },
];
