import { axiosClient } from "@services/axios/axios-client";
import { useQuery } from "@tanstack/react-query";
import type { Climb } from "@type-definitions/Climb";
import { create } from "zustand";

export type CLIMBS_VIEW_MODE = "grid" | "list";

type ClimbStore = {
  climbsViewMode: CLIMBS_VIEW_MODE;
  setClimbsViewMode: (view: "grid" | "list") => void;
};

const useClimbStore = create<ClimbStore>((set) => ({
  climbsViewMode: "grid",
  setClimbsViewMode: (view) => {
    set({ climbsViewMode: view });
  },
}));

type UseClimbProps = {
  query?: {
    city?: string;
    slug?: string;
  };
};

export const useClimb = ({ query }: UseClimbProps = { query: {} }) => {
  const { climbsViewMode, setClimbsViewMode } = useClimbStore();

  const cityQuery = query?.city;
  const climbSlug = query?.slug;

  const fetchClimbs = useQuery({
    queryKey: ["climbs", cityQuery],
    queryFn: async () => {
      // Conditionally create the URL based on the presence of query
      const url = cityQuery ? `/climbs?city=${cityQuery}` : "/climbs";
      const response = await axiosClient.get(url);
      return response.data as Climb[];
    },
  });

  const fetchClimb = useQuery({
    queryKey: ["climb", climbSlug],
    queryFn: async () => {
      const response = await axiosClient.get(`/climbs/${climbSlug}`);
      return response.data as Climb;
    },
  });

  return {
    climbsViewMode,
    setClimbsViewMode,
    fetchClimbs,
    fetchClimb,
  };
};
