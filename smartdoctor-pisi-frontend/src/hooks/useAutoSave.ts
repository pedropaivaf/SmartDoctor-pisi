import { useEffect, useRef, useState } from 'react';
import { debounce } from '../lib/utils';

interface UseAutoSaveOptions<T> {
  data: T;
  onSave: (data: T) => Promise<void>;
  delay?: number; // milliseconds
  enabled?: boolean;
}

export function useAutoSave<T>({ data, onSave, delay = 30000, enabled = true }: UseAutoSaveOptions<T>) {
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [error, setError] = useState<string | null>(null);
  const previousData = useRef<T>(data);

  const saveData = async (dataToSave: T) => {
    if (!enabled) return;

    try {
      setIsSaving(true);
      setError(null);
      await onSave(dataToSave);
      setLastSaved(new Date());
    } catch (err: any) {
      console.error('Auto-save error:', err);
      setError(err.message || 'Erro ao salvar automaticamente');
    } finally {
      setIsSaving(false);
    }
  };

  // Debounced save function
  const debouncedSave = useRef(
    debounce((dataToSave: T) => {
      saveData(dataToSave);
    }, delay)
  ).current;

  useEffect(() => {
    // Only auto-save if data has changed
    if (enabled && JSON.stringify(data) !== JSON.stringify(previousData.current)) {
      debouncedSave(data);
      previousData.current = data;
    }
  }, [data, enabled, debouncedSave]);

  const forceSave = async () => {
    await saveData(data);
  };

  const getStatusMessage = (): string => {
    if (isSaving) return 'Salvando...';
    if (error) return `Erro: ${error}`;
    if (lastSaved) {
      const now = new Date();
      const diffMinutes = Math.floor((now.getTime() - lastSaved.getTime()) / 60000);
      if (diffMinutes === 0) return `Salvo agora`;
      if (diffMinutes === 1) return `Salvo há 1 minuto`;
      return `Salvo há ${diffMinutes} minutos`;
    }
    return 'Não salvo';
  };

  return {
    isSaving,
    lastSaved,
    error,
    forceSave,
    statusMessage: getStatusMessage(),
  };
}

export default useAutoSave;
