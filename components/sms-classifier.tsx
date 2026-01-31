"use client";

import { useState } from "react";
import { MessageInput } from "./message-input";
import { ClassificationResult } from "./classification-result";
import { Shield, Activity, Database, Cpu } from "lucide-react";
import axios from 'axios';
import { API_BASE_URL } from "@/config";

interface ClassificationResultType {
  accuracy: number;
  confidence: number;
  label: "ham" | "spam";
  probabilities: {
    ham: number;
    spam: number;
  };
  raw_prediction: "ham" | "spam";
  text_length: number;
}

async function classifyMessageAPI(
  message: string
): Promise<ClassificationResultType> {
  const response = await axios.post<ClassificationResultType>(
    `${API_BASE_URL}/predict`,
    { text: message }
  );

  return response.data;
}

export function SMSClassifier() {
  const [message, setMessage] = useState("");
  const [result, setResult] = useState<ClassificationResultType | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const smsSuggestions = [
    "Urgent ! Votre compte sera suspendu. Cliquez ici pour vérifier.",
    "Félicitations 🎉 Vous avez gagné un prix. Réclamez-le maintenant.",
    "Votre colis est en attente. Confirmez vos informations.",
    "Salut, on se voit demain pour la réunion ?",
    "Merci pour ton aide aujourd’hui, à très vite.",
  ];
  const handleScan = async () => {
    if (!message.trim()) return;
  
    try {
      setIsAnalyzing(true);
      setResult(null);
  
      const classificationResult = await classifyMessageAPI(message);
      console.log("Réponse du backend : ", classificationResult);
      setResult(classificationResult);
    } catch (error) {
      console.error("Erreur lors de la classification :", error);
    } finally {
      setIsAnalyzing(false);
    }
  };
  

  const handleClear = () => {
    setMessage("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />

        {/* Gradient orbs */}
        <div
          className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(0, 212, 255, 0.3), transparent)",
          }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(0, 230, 118, 0.3), transparent)",
          }}
        />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-border/50 backdrop-blur-xl bg-card/30">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/20 rounded-xl blur-xl" />
                  <div className="relative flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 border border-primary/20">
                    <Shield className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-foreground tracking-tight">
                    Chill Shield<span className="text-primary">AI</span>
                  </h1>
                  <p className="text-xs text-muted-foreground">
                    Intelligent Message Classification
                  </p>
                </div>
              </div>

              {/* Status indicators */}
              <div className="hidden sm:flex items-center gap-4">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/50 border border-border">
                  <div className="w-2 h-2 rounded-full bg-[#00e676] animate-pulse" />
                  <span className="text-xs text-muted-foreground">
                    System Online
                  </span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-6xl mx-auto px-6 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* SMS Suggestions */}
            <div className="relative p-6 rounded-2xl bg-card/50 backdrop-blur-xl border border-border">
              <h3 className="text-sm font-semibold text-foreground mb-4">
                Suggestions de SMS
              </h3>

              <div className="flex flex-col gap-3">
                {smsSuggestions.map((sms, index) => (
                  <button
                    key={index}
                    onClick={() => setMessage(sms)}
                    className="text-left text-sm p-3 rounded-xl border border-border
                   bg-secondary/40 hover:bg-secondary transition"
                  >
                    {sms}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Panel */}
            <div className="relative w-full h-full">
              <div
                className="absolute -inset-1 rounded-2xl opacity-50"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(0, 212, 255, 0.1), transparent)",
                }}
              />

              <div className="relative w-full h-full p-6 rounded-2xl bg-card/50 backdrop-blur-xl border border-border">
                <MessageInput
                  message={message}
                  setMessage={setMessage}
                  onScan={handleScan}
                  onClear={handleClear}
                  isAnalyzing={isAnalyzing}
                />
              </div>
            </div>

            {/* Result Panel */}
            <div className="relative w-full h-full">
              <div
                className="absolute -inset-1 rounded-2xl opacity-50 transition-all duration-500"
                style={{
                  background: result
                    ? result.label === "spam"
                      ? "linear-gradient(135deg, rgba(255, 71, 87, 0.15), transparent)"
                      : "linear-gradient(135deg, rgba(0, 230, 118, 0.15), transparent)"
                    : "linear-gradient(135deg, rgba(255, 255, 255, 0.05), transparent)",
                }}
              />

              <div className="relative w-full h-full p-6 rounded-2xl bg-card/50 backdrop-blur-xl border border-border">
                <ClassificationResult
                  result={result}
                  isAnalyzing={isAnalyzing}
                />
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { icon: Activity, label: "Accuracy Rate", value: "99.2%" },
              { icon: Database, label: "Messages Analyzed", value: "2.4M+" },
              { icon: Cpu, label: "AI Model", value: "v4.2" },
              { icon: Shield, label: "Threats Blocked", value: "847K" },
            ].map((stat, i) => (
              <div
                key={i}
                className="p-4 rounded-xl bg-card/30 backdrop-blur-md border border-border"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <stat.icon className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-foreground font-mono">
                      {stat.value}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {stat.label}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-border/50 mt-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-muted-foreground">
                Powered by advanced machine learning algorithms
              </p>
              <div className="flex items-center gap-4">
                <span className="text-xs text-muted-foreground">
                  Response time: {"<"}100ms
                </span>
                <span className="text-xs text-muted-foreground">|</span>
                <span className="text-xs text-muted-foreground">
                  Last updated: Jan 2026
                </span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
