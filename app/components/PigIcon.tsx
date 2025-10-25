import { PigIconProps } from "../types/interfaces";

export default function PigIcon({ size = 24, className = "" }: PigIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Cuerpo del cerdo */}
      <ellipse cx="50" cy="60" rx="35" ry="25" fill="#FFB6C1" stroke="#FF69B4" strokeWidth="2"/>
      
      {/* Cabeza */}
      <circle cx="50" cy="35" r="20" fill="#FFB6C1" stroke="#FF69B4" strokeWidth="2"/>
      
      {/* Orejas */}
      <ellipse cx="42" cy="20" rx="4" ry="8" fill="#FFB6C1" stroke="#FF69B4" strokeWidth="1.5" transform="rotate(-20 42 20)"/>
      <ellipse cx="58" cy="20" rx="4" ry="8" fill="#FFB6C1" stroke="#FF69B4" strokeWidth="1.5" transform="rotate(20 58 20)"/>
      
      {/* Ojos */}
      <circle cx="45" cy="32" r="3" fill="#000"/>
      <circle cx="55" cy="32" r="3" fill="#000"/>
      <circle cx="46" cy="31" r="1" fill="#FFF"/>
      <circle cx="56" cy="31" r="1" fill="#FFF"/>
      
      {/* Hocico */}
      <ellipse cx="50" cy="40" rx="6" ry="4" fill="#FF69B4"/>
      <circle cx="48" cy="40" r="1.5" fill="#000"/>
      <circle cx="52" cy="40" r="1.5" fill="#000"/>
      
      {/* Patas */}
      <rect x="35" y="80" width="6" height="12" fill="#FFB6C1" stroke="#FF69B4" strokeWidth="1.5" rx="3"/>
      <rect x="45" y="80" width="6" height="12" fill="#FFB6C1" stroke="#FF69B4" strokeWidth="1.5" rx="3"/>
      <rect x="55" y="80" width="6" height="12" fill="#FFB6C1" stroke="#FF69B4" strokeWidth="1.5" rx="3"/>
      <rect x="65" y="80" width="6" height="12" fill="#FFB6C1" stroke="#FF69B4" strokeWidth="1.5" rx="3"/>
      
      {/* Cola */}
      <path d="M 15 55 Q 10 50 15 45 Q 20 40 15 35" stroke="#FF69B4" strokeWidth="3" fill="none" strokeLinecap="round"/>
      
      {/* Símbolo de dinero en la panza */}
      <text x="50" y="65" textAnchor="middle" fontSize="16" fill="#228B22" fontWeight="bold">$</text>
    </svg>
  );
}