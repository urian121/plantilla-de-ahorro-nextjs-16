const STORAGE_KEY = 'ahorro-plantilla';

export interface AhorroData {
  dias: number;
  meta: number;
  valores: number[];
  completados: boolean[];
}

export const storage = {
  save: (data: AhorroData) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }
  },

  load: (): AhorroData | null => {
    if (typeof window !== 'undefined') {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : null;
    }
    return null;
  },

  clear: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
    }
  }
};