import { useResturantStore } from "@/store/useResturantStore";
import { Button } from "../ui/button"
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

export type FilterOption = {
  id: number;
  name: string;
}

const filterOptions: FilterOption[] = [
  { id: 1, name: "All" },
  { id: 2, name: "Burger" },
  { id: 3, name: "Pizza" },
  { id: 4, name: "Sushi" },
  { id: 5, name: "Pasta" },
  { id: 6, name: "Sandwich" },
]

const FilterPage = () => {
  const { setAppliedFilter, appliedFilter, resetAppliedFilter } = useResturantStore();
  const filterOptionsHandle = (value: string) => {
    setAppliedFilter(value);
  };

  return (
    <div className="flex flex-col gap-4 w-full md:w-72 py-4">
      <div className="flex items-center justify-between gap-2">
        <h1 className="font-medium">Filter By Category</h1>
        <Button variant="outline" className="text-xs cursor-pointer" onClick={resetAppliedFilter}> Clear All</Button>
      </div>
      <div className="flex flex-col">
        {
          filterOptions.map((option) => (
            <div key={option.id} className="flex items-center gap-2 mb-2 w-full">
              <Checkbox
                checked={appliedFilter.includes(option.name)}
                onClick={() => filterOptionsHandle(option.name)}
                id={`filter-${option.id}`} className="h-4 w-4 cursor-pointer"
              />
              <Label htmlFor={`filter-${option.id}`} className="text-sm cursor-pointer w-full">{option.name}</Label>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default FilterPage
