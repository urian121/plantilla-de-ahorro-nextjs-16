import Image from "next/image";
import { PrintableTemplateProps } from "../types/interfaces";

export default function PrintableTemplate({ title, valores, meta, completados }: PrintableTemplateProps) {

  return (
    <>
      <div className="w-full max-w-4xl mx-auto p-8 bg-white" style={{ fontFamily: 'Arial, sans-serif' }}>
        {/* Header con cerdo a la izquierda y título centrado */}
        <div className="flex items-center mb-8 border-b-2 border-gray-300 pb-6">
          {/* Cerdo a la izquierda */}
          <div className="shrink-0 mr-6">
            <Image 
              src="/cerdo.svg" 
              alt="Cerdo de ahorro" 
              width={80} 
              height={80}
              className="object-contain"
            />
          </div>
          
          {/* Título y meta centrados */}
          <div className="flex-1 text-center">
            <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
            <p className="text-gray-600 mt-2">Meta: ${meta.toLocaleString()}</p>
          </div>
          
          {/* Espacio vacío a la derecha para balance */}
          <div className="shrink-0 w-[40px]"></div>
        </div>

        {/* Grid de ahorro - 5 columnas */}
        <div className="grid grid-cols-5 gap-3 mb-8">
          {valores.map((valor, index) => (
            <div 
              key={index}
              className={`
                relative border-2 rounded-lg p-4 text-center min-h-[80px] flex flex-col items-center justify-center
                ${completados[index] 
                  ? 'bg-green-50 border-green-300' 
                  : 'bg-gray-50 border-gray-300'
                }
              `}
            >
              <div className="font-bold text-lg text-gray-800">
                ${valor.toLocaleString()}
              </div>
              {completados[index] && (
                <div className="text-green-600 text-xl mt-1">✓</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Footer motivacional */}
      <div className="mt-12 text-center bg-gray-100 p-6 rounded-lg border border-gray-300">
          <h3 className="text-xl font-bold text-gray-800 mb-2">¡Tú puedes lograrlo! 🐷💰</h3>
        <p className="text-gray-600">
          Cada día que ahorres te acerca más a tu meta. ¡Marca cada casilla con orgullo!
        </p>
      </div>
    </>
  );
}