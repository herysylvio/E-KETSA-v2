import { useEffect, useState } from 'react';
import type { RequestCategory } from '../types/map';

type Status = 'idle' | 'submitting' | 'success';

const DEFAULT_BUDGET = 20000;

export function useRequestForm() {
  const [category, setCategory] = useState<RequestCategory>('demenagement');
  const [description, setDescription] = useState('');
  const [budget, setBudget] = useState(DEFAULT_BUDGET);
  const [error, setError] = useState<string | undefined>();
  const [status, setStatus] = useState<Status>('idle');

  useEffect(() => {
    if (status !== 'success') return;
    const t = setTimeout(() => setStatus('idle'), 3500);
    return () => clearTimeout(t);
  }, [status]);

  const updateDescription = (value: string) => {
    setDescription(value);
    if (error && value.trim().length >= 10) setError(undefined);
  };

  const addToBudget = (amount: number) => setBudget((b) => b + amount);
  const resetBudget = () => setBudget(DEFAULT_BUDGET);

  const submit = (): Promise<boolean> => {
    if (description.trim().length < 10) {
      setError('Décrivez votre besoin en au moins 10 caractères.');
      return Promise.resolve(false);
    }
    setStatus('submitting');
    return new Promise((resolve) => {
      setTimeout(() => {
        setStatus('success');
        setDescription('');
        setBudget(DEFAULT_BUDGET);
        resolve(true);
      }, 1200);
    });
  };

  return {
    category,
    setCategory,
    description,
    updateDescription,
    budget,
    addToBudget,
    resetBudget,
    error,
    status,
    submit
  };
}