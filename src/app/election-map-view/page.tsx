"use client";

import FilterComponent from "@/components/ElectionMapView/FilterComponent";
import FilterResult from "@/components/ElectionMapView/FilterResult";
import { MapViewFilterContextProvider } from "@/context/MapViewFilterContext";

export default function page() {
  return (
    <>
      <MapViewFilterContextProvider>
        <main id="election_map_view" className="w-full overflow-x-hidden">
          <FilterComponent />
          <FilterResult />
        </main>
      </MapViewFilterContextProvider>
    </>
  );
}
