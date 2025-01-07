import { storage } from '@app/infra';
import { create } from 'zustand'

interface LoginStore {
  loading: boolean;
  error: boolean;
  remember: boolean;
  account: string;
  hideError: () => void;
  showError: () => void;
  showLoading: () => void;
  hideLoading: () => void;
}

export const useLoginStore = create<LoginStore>(set => ({
  loading: false,
  error: false,
  remember: storage.get('remember') ?? false,
  account: storage.get('account') ?? '',
  hideError: () => set(() => ({ error: false })),
  showError: () => set(() => ({ error: true })),
  showLoading: () => set(() => ({ loading: true })),
  hideLoading: () => set(() => ({ loading: false })),
}));