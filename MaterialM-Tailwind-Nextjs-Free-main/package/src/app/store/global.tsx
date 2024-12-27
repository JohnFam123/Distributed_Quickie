import { create } from "zustand";

interface DashboardStore {
    diemQuanTrac: number;
}

interface DashboardStoreActions {
    setDiemQuanTrac: (v: number) => void;
}

export const useDashboardStore = create<DashboardStore & DashboardStoreActions>()((set) => ({
    diemQuanTrac: 2,
    setDiemQuanTrac: (v) => set({ diemQuanTrac: v }),
}));
