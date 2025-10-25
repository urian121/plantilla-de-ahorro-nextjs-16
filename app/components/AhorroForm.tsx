"use client";

import { useState } from "react";
import AhorroGrid from "./AhorroGrid";
import InputField from "./InputField";

export default function AhorroForm() {
  const [dias, setDias] = useState<number>(100);
  const [meta, setMeta] = useState<number>(5000000);
  const [valores, setValores] = useState<number[]>([]);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const generar = async (): Promise<void> => {
    // Validar que los días sean al menos 1
    if (dias < 1) {
      alert('Los días deben ser al menos 1');
      return;
    }
    
    setIsGenerating(true);
    
    // Simular un pequeño delay para mejor UX
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const montos: number[] = [];
    
    // Generar montos aleatorios redondeados a múltiplos de 50
    for (let i = 0; i < dias; i++) {
      const baseAmount = Math.random() * (meta / dias * 2);
      // Redondear a múltiplos de 50 para tener cantidades más limpias
      const roundedAmount = Math.round(baseAmount / 50) * 50;
      // Asegurar que sea al menos 50
      const monto = Math.max(50, roundedAmount);
      montos.push(monto);
    }
    
    // Ajustar total al monto meta manteniendo múltiplos de 50
    const totalGenerated = montos.reduce((a, b) => a + b, 0);
    const factor = meta / totalGenerated;
    const ajustado = montos.map(v => {
      const adjusted = v * factor;
      // Redondear a múltiplos de 50
      return Math.max(50, Math.round(adjusted / 50) * 50);
    });
    
    setValores(ajustado);
    setIsGenerating(false);
  };

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(Math.round(value));
  };

  return (
    <div className="w-full max-w-none space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-4">
          <div className="backdrop-blur-sm bg-white/90 border border-amber-200 shadow-xl rounded-lg h-fit sticky top-6">
            <div className="text-center pb-4 p-6">
              <h2 className="text-xl font-bold text-amber-800 flex items-center justify-center gap-2 mb-2">
                Configurar tu plan de Ahorro
              </h2>
            </div>
            
            <div className="space-y-6 p-6 pt-0">
              <InputField
                label="Días del desafío"
                value={dias}
                onChange={setDias}
                placeholder="100"
                min={1}
              />

              <InputField
                label="Meta total"
                value={meta}
                onChange={setMeta}
                placeholder="5000000"
              />

              <div className="pt-2">
                <button 
                  onClick={generar} 
                  disabled={isGenerating}
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 px-4 text-base shadow-lg transition-all duration-200 transform hover:scale-[1.02] rounded-lg"
                >
                  {isGenerating ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Generando...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-xl">✨</span>
                      Generar Desafío
                    </div>
                  )}
                </button>
              </div>

              {valores.length > 0 && (
                <div className="pt-4 border-t border-amber-200">
                  <div className="text-center space-y-2">
                    <div className="bg-amber-50 rounded-lg p-3">
                      <p className="text-xs text-amber-600 font-medium">
                        Promedio diario
                      </p>
                      <p className="text-sm font-bold text-amber-800">
                        {formatCurrency(Math.round(meta / dias))}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Grid de ahorro - ocupa 8/12 del espacio (equivalente a col-8 de Bootstrap) */}
        <div className="lg:col-span-8">
          {valores.length > 0 && <AhorroGrid valores={valores} meta={meta} />}
        </div>
      </div>
    </div>
  );
}