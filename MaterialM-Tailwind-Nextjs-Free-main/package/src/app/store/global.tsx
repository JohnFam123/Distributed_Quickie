import { create } from "zustand";

interface DashboardStore {
    diemQuanTrac: string;
    tinh: string;
    huyen: string;
}

interface DashboardStoreActions {
    setDiemQuanTrac: (v: string) => void;
    setTinh: (v: string) => void;
    setHuyen: (v: string) => void;
}

export const useDashboardStore = create<DashboardStore & DashboardStoreActions>()((set) => ({
    diemQuanTrac: "",
    tinh: "",
    huyen: "",
    setDiemQuanTrac: (v) => set({ diemQuanTrac: v }),
    setTinh: (v) => set({ tinh: v }),
    setHuyen: (v) => set({ huyen: v }),
}));
