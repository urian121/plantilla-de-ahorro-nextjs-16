"use client";

import { useState } from "react";
import { Download, Plus } from "lucide-react";
import StatsCard from "./StatsCard";
import ProgressBar from "./ProgressBar";
import DayButton from "./DayButton";
import { AhorroGridProps } from "../types/interfaces";
import { formatCurrency } from "../utils/currency";

export default function AhorroGrid({ valores, meta, completados, setCompletados, onDownloadPDF, onNuevaPlantilla }: AhorroGridProps) {
  const [animatingDay, setAnimatingDay] = useState<number | null>(null);

  const toggleDay = async (dayIndex: number): Promise<void> => {
    setAnimatingDay(dayIndex);
    
    // Pequeño delay para la animación
    await new Promise(resolve => setTimeout(resolve, 150));
    
    const newCompletados = [...completados];
    newCompletados[dayIndex] = !newCompletados[dayIndex];
    setCompletados(newCompletados);
    
    setAnimatingDay(null);
  };

  const totalSaved = valores
    .filter((_, index) => completados[index])
    .reduce((sum, value) => sum + value, 0);

  const completedCount = completados.filter(Boolean).length;
  const progress = (completedCount / valores.length) * 100;

  return (
    <div className="backdrop-blur-sm bg-white/90 border border-amber-200 shadow-xl rounded-lg overflow-hidden flex flex-col h-[90vh]">
      {/* Header con estadísticas */}
      <div className="bg-linear-to-r from-amber-50 to-orange-50 border-b border-amber-200 p-6 shrink-0">
        <div className="text-center mb-6 relative">
          <h2 className="text-2xl font-bold text-amber-800 flex items-center justify-center gap-3 mb-2">
            <span className="text-3xl">💎</span>
            Tu Desafío de Ahorro
          </h2>
          
          {/* Botones en la esquina superior derecha */}
          <div className="absolute top-0 right-0 flex gap-2">
            {onNuevaPlantilla && (
              <button
                onClick={onNuevaPlantilla}
                className="bg-gray-500 hover:bg-gray-600 text-white p-2 rounded-lg shadow-md transition-all duration-200 transform hover:scale-105 hover:cursor-pointer"
                title="Nueva Plantilla"
              >
                <Plus size={20} />
              </button>
            )}
            
            {onDownloadPDF && (
              <button
                onClick={onDownloadPDF}
                className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg shadow-md transition-all duration-200 transform hover:scale-105"
                title="Descargar PDF"
              >
                <Download size={20} />
              </button>
            )}
          </div>
          
          <p className="text-amber-600 font-medium">
            Haz clic en cada día para marcarlo como completado
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatsCard 
            label="Meta Total" 
            value={formatCurrency(meta)} 
            color="amber" 
          />
          <StatsCard 
            label="Ahorrado" 
            value={formatCurrency(totalSaved)} 
            color="green" 
          />
          <StatsCard 
            label="Días Completados" 
            value={`${completedCount}/${valores.length}`} 
            color="blue" 
          />
          <StatsCard 
            label="Progreso" 
            value={`${Math.round(progress)}%`} 
            color="purple" 
          />
        </div>

        <ProgressBar progress={progress} />
      </div>

      {/* Grid de días con scroll */}
      <div className="p-6 flex-1 overflow-y-auto">
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-4">
          {valores.map((valor, index) => (
            <DayButton
              key={index}
              value={valor}
              isCompleted={completados[index] || false}
              isAnimating={animatingDay === index}
              onClick={() => toggleDay(index)}
              formatCurrency={formatCurrency}
            />
          ))}
        </div>
      </div>

      {/* Mensaje motivacional mejorado */}
      <div className="bg-linear-to-r from-amber-50 to-orange-50 border-t border-amber-200 p-6">
        <div className="text-center">
          {progress === 0 && (
            <div className="space-y-2">
              <p className="text-lg font-bold text-amber-800">🚀 ¡Comienza tu desafío!</p>
              <p className="text-sm text-amber-600">Haz clic en el primer día para empezar a ahorrar</p>
            </div>
          )}
          
          {progress > 0 && progress < 25 && (
            <div className="space-y-2">
              <p className="text-lg font-bold text-blue-700">💪 ¡Excelente inicio!</p>
              <p className="text-sm text-blue-600">Cada día cuenta, sigue así</p>
            </div>
          )}
          
          {progress >= 25 && progress < 50 && (
            <div className="space-y-2">
              <p className="text-lg font-bold text-purple-700">🔥 ¡Vas por buen camino!</p>
              <p className="text-sm text-purple-600">Ya llevas un cuarto del desafío completado</p>
            </div>
          )}
          
          {progress >= 50 && progress < 75 && (
            <div className="space-y-2">
              <p className="text-lg font-bold text-orange-700">⭐ ¡Increíble progreso!</p>
              <p className="text-sm text-orange-600">¡Ya pasaste la mitad del camino!</p>
            </div>
          )}
          
          {progress >= 75 && progress < 100 && (
            <div className="space-y-2">
              <p className="text-lg font-bold text-red-700">🎯 ¡Casi lo logras!</p>
              <p className="text-sm text-red-600">Estás muy cerca de completar tu desafío</p>
            </div>
          )}
          
          {progress === 100 && (
            <div className="space-y-3">
              <p className="text-xl font-bold text-green-700">🎉 ¡FELICITACIONES!</p>
              <p className="text-sm text-green-600 font-medium">Has completado tu desafío de ahorro</p>
              <div className="bg-green-100 rounded-lg p-3 mt-3">
                <p className="text-sm font-bold text-green-800">
                  Total ahorrado: {formatCurrency(totalSaved)}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}