# 💰 Plantilla de Ahorro - Desafío de Ahorro Interactivo

Una aplicación web moderna para crear y gestionar desafíos de ahorro personalizados. Genera automáticamente montos diarios aleatorios que suman tu meta total.

## ✨ Características

- **Generación automática**: Crea desafíos con montos aleatorios que suman exactamente tu meta
- **Interfaz intuitiva**: Diseño moderno y responsivo con animaciones suaves
- **Seguimiento visual**: Progreso en tiempo real con estadísticas detalladas
- **Montos redondeados**: Cantidades múltiplos de 50 para facilitar el ahorro
- **Experiencia móvil**: Optimizado para todos los dispositivos

## 🚀 Tecnologías

- **Next.js 16** - Framework React de última generación
- **TypeScript** - Tipado estático para mayor confiabilidad
- **Tailwind CSS** - Estilos utilitarios modernos
- **Componentes modulares** - Arquitectura escalable y mantenible

## 📱 Funcionalidades

### Configuración del Desafío
- Define la duración (días del desafío)
- Establece tu meta de ahorro total
- Genera montos automáticamente

### Panel de Control
- Visualiza estadísticas en tiempo real
- Barra de progreso animada
- Resumen de días completados y pendientes

### Grid Interactivo
- Botones para cada día del desafío
- Marca días como completados con un clic
- Animaciones visuales de confirmación
- Scroll vertical para desafíos largos

## 🎯 Uso

1. Ingresa los días del desafío (mínimo 1)
2. Define tu meta total de ahorro
3. Haz clic en "Generar Desafío"
4. Marca cada día como completado al ahorrar el monto

## 🏗️ Estructura

```
app/
├── components/          # Componentes reutilizables
│   ├── AhorroForm.tsx  # Formulario principal
│   ├── AhorroGrid.tsx  # Grid de días
│   ├── DayButton.tsx   # Botón individual de día
│   ├── StatsCard.tsx   # Tarjetas de estadísticas
│   ├── ProgressBar.tsx # Barra de progreso
│   └── InputField.tsx  # Campo de entrada
├── types/              # Definiciones de tipos
│   └── interfaces.ts   # Interfaces TypeScript
└── page.tsx           # Página principal
```

Desarrollado con ❤️ para hacer el ahorro más divertido y organizado.