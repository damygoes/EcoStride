import { climbs } from "@mock/climbs";
import type { Climb } from "@type-definitions/Climb";
import { create } from "zustand";

type ClimbStore = {
  climbs: Climb[];
  nearbyClimbs: Climb[];
  addClimb: (climb: Climb) => void;
  removeClimb: (climb: Climb) => void;
  updateClimb: (climb: Climb) => void;
  findClimb: (climbId: string) => Climb | undefined;
  setNearbyClimbs: (climbs: Climb[]) => void;
};

export const useClimbStore = create<ClimbStore>((set, get) => ({
  climbs: climbs,
  nearbyClimbs: [],

  addClimb: (climb) => {
    set((state) => {
      const climbToAdd = state.climbs.find((c) => c.id === climb.id);
      if (!climbToAdd) {
        return { climbs: [...state.climbs, climb] };
      }
      return state;
    });
  },

  removeClimb: (climb) => {
    set((state) => ({
      climbs: state.climbs.filter((c) => c.id !== climb.id),
    }));
  },

  updateClimb: (climb) => {
    set((state) => ({
      climbs: state.climbs.map((c) => (c.id === climb.id ? climb : c)),
    }));
  },

  findClimb: (climbId) => {
    return get().climbs.find((c) => c.id === climbId);
  },

  setNearbyClimbs: (climbs) => {
    set({ nearbyClimbs: climbs });
  },
}));

// export const useClimbStore = create<ClimbStore>()(
//   persist(
//     (set, get) => ({
//       climbs: climbs,
//       nearbyClimbs: [],
//       addClimb: (climb) => {
//         set((state) => {
//           const climbToAdd = state.climbs.find((c) => c.id === climb.id);
//           if (!climbToAdd) {
//             return { climbs: [...state.climbs, climb] };
//           }
//           return state;
//         });
//       },
//       removeClimb: (climb) =>
//         set((state) => ({
//           climbs: state.climbs.filter((c) => c.id !== climb.id),
//         })),
//       updateClimb: (climb) =>
//         set((state) => ({
//           climbs: state.climbs.map((c) => (c.id === climb.id ? climb : c)),
//         })),
//       findClimb: (climbId) => get().climbs.find((c) => c.id === climbId),
//       setNearbyClimbs: (climbs) => set({ nearbyClimbs: climbs }),
//       sortClimbs: (
//         sortKey: keyof Climb,
//         order: "asc" | "desc",
//         filters?: ClimbFilters,
//       ) => {
//         set((state) => {
//           // Explicitly declare the type of climbsToSort
//           let climbsToSort: Climb[] = state.climbs;

//           // Apply filters if provided
//           if (filters && Object.keys(filters).length !== 0) {
//             Object.entries(filters).forEach(([key, value]) => {
//               if (value) {
//                 climbsToSort = _.filter(climbsToSort, { [key]: value });
//               }
//             });
//           }
//           // Apply sorting
//           const sortedClimbs = _.orderBy(climbsToSort, [sortKey], [order]);
//           return { climbs: sortedClimbs };
//         });
//       },
//       filterClimbs: (filters) => {
//         set((state) => {
//           if (Object.keys(filters).length === 0) {
//             return { climbs: state.climbs };
//           }

//           let filteredClimbs = state.climbs;
//           Object.entries(filters).forEach(([key, value]) => {
//             if (value) {
//               filteredClimbs = _.filter(filteredClimbs, { [key]: value });
//             }
//           });

//           return { climbs: filteredClimbs };
//         });
//       },
//       getSortedAndFilteredClimbs: () => get().climbs,
//       resetFilters: () => set({ climbs: climbs }),
//     }),
//     {
//       name: "climbs-store",
//       version: 1,
//       partialize: (state) => {
//         // eslint-disable-next-line @typescript-eslint/no-unused-vars
//         const { nearbyClimbs, ...rest } = state;
//         return rest as Omit<typeof state, "nearbyClimbs">;
//       },
//     },
//   ),
//   // persist(
//   //   (set, get) => ({
//   //     climbs: climbs,
//   //     nearbyClimbs: [],
//   //     addClimb: (climb) => {
//   //       set((state) => {
//   //         const climbToAdd = state.climbs.find((c) => c.id === climb.id);
//   //         if (!climbToAdd) {
//   //           return { climbs: [...state.climbs, climb] };
//   //         }
//   //         return state;
//   //       });
//   //     },
//   //     removeClimb: (climb) =>
//   //       set((state) => ({
//   //         climbs: state.climbs.filter((c) => c.id !== climb.id),
//   //       })),
//   //     updateClimb: (climb) =>
//   //       set((state) => ({
//   //         climbs: state.climbs.map((c) => (c.id === climb.id ? climb : c)),
//   //       })),
//   //     findClimb: (climbId) => get().climbs.find((c) => c.id === climbId),
//   //     setNearbyClimbs: (climbs) => set({ nearbyClimbs: climbs }),
//   //     sortClimbs: (
//   //       sortKey: keyof Climb,
//   //       order: "asc" | "desc",
//   //       filters?: ClimbFilters,
//   //     ) => {
//   //       set((state) => {
//   //         // Explicitly declare the type of climbsToSort
//   //         let climbsToSort: Climb[] = state.climbs;

//   //         // Apply filters if provided
//   //         if (filters && Object.keys(filters).length !== 0) {
//   //           Object.entries(filters).forEach(([key, value]) => {
//   //             if (value) {
//   //               climbsToSort = _.filter(climbsToSort, { [key]: value });
//   //             }
//   //           });
//   //         }
//   //         // Apply sorting
//   //         const sortedClimbs = _.orderBy(climbsToSort, [sortKey], [order]);
//   //         return { climbs: sortedClimbs };
//   //       });
//   //     },
//   //     filterClimbs: (filters) => {
//   //       set((state) => {
//   //         if (Object.keys(filters).length === 0) {
//   //           return { climbs: state.climbs };
//   //         }

//   //         let filteredClimbs = state.climbs;
//   //         Object.entries(filters).forEach(([key, value]) => {
//   //           if (value) {
//   //             filteredClimbs = _.filter(filteredClimbs, { [key]: value });
//   //           }
//   //         });

//   //         return { climbs: filteredClimbs };
//   //       });
//   //     },
//   //     getSortedAndFilteredClimbs: () => get().climbs,
//   //     resetFilters: () => set({ climbs: climbs }),
//   //   }),
//   //   {
//   //     name: "climbs-store",
//   //     version: 1,
//   //     partialize: (state) => {
//   //       // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   //       const { nearbyClimbs, ...rest } = state;
//   //       return rest as Omit<typeof state, "nearbyClimbs">;
//   //     },
//   //   },
//   // ),
// );
