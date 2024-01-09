import { useClimbStore } from "@features/climb/utils/climb-store";
import type { Climb } from "@type-definitions/Climb";
import React, { useState } from "react";

// Define a type for the sort key that matches the keys in your Climb type
type SortKey = keyof Climb; // Replace '...' with actual keys as needed

const SortingComponent: React.FC = () => {
  const sortClimbs = useClimbStore((state) => state.sortClimbs);

  const [sortKey, setSortKey] = useState<SortKey>("name"); // Assuming 'name' is a valid key
  const [order, setOrder] = useState<"asc" | "desc" | null>(null); // Initially null

  const handleSort = () => {
    if (order) {
      // Only call sortClimbs if order is not null
      sortClimbs(sortKey, order);
    }
  };

  return (
    <div>
      {/* Sort Key Selection */}
      <select
        value={sortKey}
        onChange={(e) => setSortKey(e.target.value as SortKey)}
      >
        {/* Add options for each sort key */}
        <option value="name">Name</option> {/* Repeat for other valid keys */}
        {/* ... other options */}
      </select>

      {/* Order Selection */}
      <select
        value={order ?? undefined} // Use undefined to allow the default option to show
        onChange={(e) => setOrder(e.target.value as "asc" | "desc" | null)}
      >
        <option value="" disabled>
          Select Order
        </option>{" "}
        {/* Default option */}
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>

      <button onClick={handleSort}>Apply Sorting</button>
    </div>
  );
};

export default SortingComponent;
