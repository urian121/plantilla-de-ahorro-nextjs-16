import { KeyboardEvent, ClipboardEvent, FormEvent } from 'react';

export const numericInputValidation = {
  handleKeyPress: (e: KeyboardEvent<HTMLInputElement>) => {
    // Permitir: números (0-9), backspace, delete, tab, escape, enter, teclas de navegación
    const allowedKeys = [
      'Backspace', 'Delete', 'Tab', 'Escape', 'Enter', 
      'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 
      'Home', 'End'
    ];
    
    if (allowedKeys.includes(e.key)) {
      return;
    }
    
    // Permitir números del 0-9
    if (e.key >= '0' && e.key <= '9') {
      return;
    }
    
    // Bloquear cualquier otra tecla
    e.preventDefault();
  },

  handlePaste: (e: ClipboardEvent<HTMLInputElement>) => {
    const pastedText = e.clipboardData.getData('text');
    // Solo permitir pegar si el contenido son solo números
    if (!/^\d*$/.test(pastedText)) {
      e.preventDefault();
    }
  },

  handleInput: (e: FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    // Remover cualquier carácter que no sea número
    target.value = target.value.replace(/[^0-9]/g, '');
  }
};