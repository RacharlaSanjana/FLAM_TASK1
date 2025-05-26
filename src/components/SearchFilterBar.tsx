import React, { useState } from "react";
import { Search, Filter, X } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Badge } from "./ui/badge";

interface SearchFilterBarProps {
  departments?: string[];
  onSearch?: (
    searchTerm: string,
    departments?: string[],
    ratings?: number[],
  ) => void;
  onFilterByDepartment?: (departments: string[]) => void;
  onFilterByRating?: (ratings: number[]) => void;
  onClearFilters?: () => void;
}

const SearchFilterBar = ({
  departments = [
    "Engineering",
    "Marketing",
    "Sales",
    "HR",
    "Finance",
    "Product",
    "Design",
    "Customer Support",
  ],
  onSearch = () => {},
  onFilterByDepartment = () => {},
  onFilterByRating = () => {},
  onClearFilters = () => {},
}: SearchFilterBarProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);

  // Ratings for filter dropdown
  const ratings = [1, 2, 3, 4, 5];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value, selectedDepartments, selectedRatings);
  };

  const handleDepartmentChange = (value: string) => {
    const updatedDepartments = selectedDepartments.includes(value)
      ? selectedDepartments.filter((dept) => dept !== value)
      : [...selectedDepartments, value];

    setSelectedDepartments(updatedDepartments);
    onFilterByDepartment(updatedDepartments);
    onSearch(searchTerm, updatedDepartments, selectedRatings);
  };

  const handleRatingChange = (value: string) => {
    const rating = parseInt(value, 10);
    const updatedRatings = selectedRatings.includes(rating)
      ? selectedRatings.filter((r) => r !== rating)
      : [...selectedRatings, rating];

    setSelectedRatings(updatedRatings);
    onFilterByRating(updatedRatings);
    onSearch(searchTerm, selectedDepartments, updatedRatings);
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedDepartments([]);
    setSelectedRatings([]);
    onClearFilters();
    onSearch("", [], []);
  };

  const removeDepartmentFilter = (department: string) => {
    const updatedDepartments = selectedDepartments.filter(
      (dept) => dept !== department,
    );
    setSelectedDepartments(updatedDepartments);
    onFilterByDepartment(updatedDepartments);
    onSearch(searchTerm, updatedDepartments, selectedRatings);
  };

  const removeRatingFilter = (rating: number) => {
    const updatedRatings = selectedRatings.filter((r) => r !== rating);
    setSelectedRatings(updatedRatings);
    onFilterByRating(updatedRatings);
    onSearch(searchTerm, selectedDepartments, updatedRatings);
  };

  const hasActiveFilters =
    searchTerm || selectedDepartments.length > 0 || selectedRatings.length > 0;

  return (
    <div className="w-full bg-background border rounded-lg p-4 shadow-sm">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search Input */}
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, email, or department..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="pl-9"
          />
        </div>

        {/* Department Filter */}
        <Select onValueChange={handleDepartmentChange}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Department" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {departments.map((department) => (
                <SelectItem key={department} value={department}>
                  {department}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        {/* Rating Filter */}
        <Select onValueChange={handleRatingChange}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Rating" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {ratings.map((rating) => (
                <SelectItem key={rating} value={rating.toString()}>
                  {rating} {rating === 1 ? "Star" : "Stars"}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        {/* Clear Filters Button */}
        {hasActiveFilters && (
          <Button
            variant="outline"
            onClick={handleClearFilters}
            className="whitespace-nowrap"
          >
            <X className="mr-2 h-4 w-4" />
            Clear Filters
          </Button>
        )}
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 mt-3">
          {selectedDepartments.map((department) => (
            <Badge
              key={department}
              variant="secondary"
              className="flex items-center gap-1"
            >
              {department}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => removeDepartmentFilter(department)}
              />
            </Badge>
          ))}
          {selectedRatings.map((rating) => (
            <Badge
              key={rating}
              variant="secondary"
              className="flex items-center gap-1"
            >
              {rating} {rating === 1 ? "Star" : "Stars"}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => removeRatingFilter(rating)}
              />
            </Badge>
          ))}
          {searchTerm && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Search: {searchTerm}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => {
                  setSearchTerm("");
                  onSearch("");
                }}
              />
            </Badge>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchFilterBar;
