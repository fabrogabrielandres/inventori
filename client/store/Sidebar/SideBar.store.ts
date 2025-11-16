import { create, StateCreator } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface SideBarState {
  isSidebarCollapsed: boolean;
  isDarkMode: boolean;
}
interface SideBarActions {
  setIsSidebarCollapsed: () => void;
  setIsDarkMode: () => void;
}

export const SideBarSlice: StateCreator<
  SideBarState & SideBarActions,
  [["zustand/devtools", unknown], ["zustand/persist", unknown]]
> = (set, get) => ({
  isDarkMode: false,
  isSidebarCollapsed: true,
  setIsSidebarCollapsed: () => {
    set(
      { isSidebarCollapsed: !get().isSidebarCollapsed },
      false,
      "setIsSidebarCollapsed"
    );
  },
  setIsDarkMode: () => {
    set({ isDarkMode: !get().isDarkMode }, false, "setIsDarkMode");
  },
});

// export const useCartProductStore = create<SideBarState & SideBarActions>()(
//   devtools(
//     persist(SideBarSlice, {
//       name: "SideBarSlice",
//     })
//   )
// );

export const useSideBarStore = create<SideBarState & SideBarActions>()(
  devtools(
    persist(SideBarSlice, {
      name: "sidebar-storage",
    })
  )
);
