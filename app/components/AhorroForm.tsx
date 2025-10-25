"use client";

import { useState, useEffect, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { RotateCcw } from "lucide-react";
import AhorroGrid from "./AhorroGrid";
import InputField from "./InputField";
import PrintableTemplate from "./PrintableTemplate";
import { storage, AhorroData } from "../utils/localStorage";
import { formatCurrency } from "../utils/currency";

export default function AhorroForm() {
  // Estado para controlar la hidratación
  const [isHydrated, setIsHydrated] = useState(false);
  
  // Referencia para el PDF
  const printRef = useRef<HTMLDivElement>(null);
  
  // Cargar datos desde localStorage al inicializar
  const [dias, setDias] = useState<number>(() => {
    if (typeof window === 'undefined') return 30;
    const saved = storage.load();
    return saved?.dias || 30;
  });
  
  const [meta, setMeta] = useState<number>(() => {
    if (typeof window === 'undefined') return 1000;
    const saved = storage.load();
    return saved?.meta || 1000;
  });
  
  const [valores, setValores] = useState<number[]>(() => {
    if (typeof window === 'undefined') return [];
    const saved = storage.load();
    return saved?.valores || [];
  });

  const [completados, setCompletados] = useState<boolean[]>(() => {
    if (typeof window === 'undefined') return [];
    const saved = storage.load();
    return saved?.completados || [];
  });
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  // Efecto para marcar como hidratado después del primer render
  useEffect(() => {
    const timer = setTimeout(() => setIsHydrated(true), 0);
    return () => clearTimeout(timer);
  }, []);

  // Guardar automáticamente cuando cambian los valores
  useEffect(() => {
    if (valores.length > 0) {
      const data: AhorroData = { dias, meta, valores, completados };
      storage.save(data);
    }
  }, [dias, meta, valores, completados]);

  const nuevaPlantilla = () => {
    storage.clear();
    setDias(100);
    setMeta(5000000);
    setValores([]);
    setCompletados([]);
  };

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
    setCompletados(new Array(ajustado.length).fill(false));
    setIsGenerating(false);
  };



  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: "Mi Plan de Ahorro",
    pageStyle: `
      @page {
        size: A4;
        margin: 20mm;
      }
      @media print {
        body { -webkit-print-color-adjust: exact; }
      }
    `
  });

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

              <div className="pt-2 space-y-3 flex justify-center">
                <button 
                  onClick={generar} 
                  disabled={isGenerating}
                  className="bg-linear-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-2 px-6 text-base shadow-lg transition-all duration-200 transform hover:scale-[1.02] rounded-lg"
                >
                  {isGenerating ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Generando...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2 hover:cursor-pointer">
                      <span className="text-xl">✨</span>
                      Generar Desafío
                    </div>
                  )}
                </button>
              </div>

              {isHydrated && valores.length > 0 && (
                <div className="pt-4 border-t border-amber-200">
                  <div className="text-center space-y-2">
                    <div className="bg-amber-50 rounded-lg p-3">
                      <p className="text-lg text-amber-600 font-medium">
                        Promedio diario
                      </p>
                      <p className="text-2xl font-bold text-amber-800">
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
          {isHydrated && valores.length > 0 && (
            <AhorroGrid 
              valores={valores} 
              meta={meta} 
              completados={completados}
              setCompletados={setCompletados}
              onDownloadPDF={handlePrint}
              onNuevaPlantilla={nuevaPlantilla}
            />
          )}
        </div>
      </div>

      {/* Componente oculto para imprimir */}
      {isHydrated && (
        <div style={{ display: 'none' }}>
          <div ref={printRef}>
            <PrintableTemplate 
              title="Mi Plan de Ahorro"
              valores={valores}
              meta={meta}
              completados={completados}
            />
          </div>
        </div>
      )}
    </div>
  );
}