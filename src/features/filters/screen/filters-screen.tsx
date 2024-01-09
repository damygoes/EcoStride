import FiltersScene from "../scene/filters-scene";
import SortingScene from "../scene/sorting-scene";

function FiltersScreen() {
  return (
    <div className="w-full h-full text-text-color">
      <FiltersScene />
      <SortingScene />
    </div>
  );
}

export default FiltersScreen;
