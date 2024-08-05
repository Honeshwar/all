import Filters from "@/components/Filters/Filters";
import MapViewAndResult from "@/components/MapAndResults/MapViewAndResult";
import Result from "@/components/MapAndResults/Result";

import { FilterContextProvider } from "@/context/FilterContext";
export default function FilterAndMapResult() {
  return (
    <FilterContextProvider>
      <Filters />
      <div className="hidden sm:block lg:hidden">
        <Result />
      </div>

      <MapViewAndResult />
    </FilterContextProvider>
  );
}

// last change is overlow issue resolve by seting width decreasing
