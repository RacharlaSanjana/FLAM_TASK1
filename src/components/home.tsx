import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Sun, Moon, BarChart3, BookmarkIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { Switch } from "./ui/switch";
import { Separator } from "./ui/separator";
import SearchFilterBar from "./SearchFilterBar";
import EmployeeCard from "./EmployeeCard";

interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
  department: string;
  performanceRating: number;
  isBookmarked: boolean;
}

const Home = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Mock departments
  const departments = [
    "Engineering",
    "Marketing",
    "Sales",
    "HR",
    "Finance",
    "Product",
    "Design",
  ];

  useEffect(() => {
    const fetchEmployees = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("https://dummyjson.com/users?limit=20");
        if (!response.ok) {
          throw new Error("Failed to fetch employees");
        }
        const data = await response.json();

        // Transform the data to include department and performance rating
        const transformedData = data.users.map((user: any) => ({
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          image: user.image,
          department:
            departments[Math.floor(Math.random() * departments.length)],
          performanceRating: Math.floor(Math.random() * 5) + 1, // 1-5 rating
          isBookmarked: false,
        }));

        setEmployees(transformedData);
        setFilteredEmployees(transformedData);
      } catch (err) {
        setError("Failed to load employees. Please try again later.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const handleSearch = (
    searchTerm: string,
    departmentFilters: string[] = [],
    ratingFilters: number[] = [],
  ) => {
    let filtered = [...employees];

    // Apply search term filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (employee) =>
          employee.firstName.toLowerCase().includes(term) ||
          employee.lastName.toLowerCase().includes(term) ||
          employee.email.toLowerCase().includes(term) ||
          employee.department.toLowerCase().includes(term),
      );
    }

    // Apply department filters
    if (departmentFilters.length > 0) {
      filtered = filtered.filter((employee) =>
        departmentFilters.includes(employee.department),
      );
    }

    // Apply rating filters
    if (ratingFilters.length > 0) {
      filtered = filtered.filter((employee) =>
        ratingFilters.includes(employee.performanceRating),
      );
    }

    setFilteredEmployees(filtered);
  };

  const toggleBookmark = (id: number) => {
    const updatedEmployees = employees.map((employee) =>
      employee.id === id
        ? { ...employee, isBookmarked: !employee.isBookmarked }
        : employee,
    );
    setEmployees(updatedEmployees);

    // Update filtered employees as well
    const updatedFiltered = filteredEmployees.map((employee) =>
      employee.id === id
        ? { ...employee, isBookmarked: !employee.isBookmarked }
        : employee,
    );
    setFilteredEmployees(updatedFiltered);
  };

  const handlePromote = (id: number) => {
    // In a real app, this would call an API to promote the employee
    // For now, we'll just show a console message
    console.log(`Employee ${id} promoted!`);

    // Optionally update the UI to reflect the promotion
    const updatedEmployees = employees.map((employee) =>
      employee.id === id
        ? {
            ...employee,
            performanceRating: Math.min(5, employee.performanceRating + 1),
          }
        : employee,
    );
    setEmployees(updatedEmployees);

    // Update filtered employees as well
    const updatedFiltered = filteredEmployees.map((employee) =>
      employee.id === id
        ? {
            ...employee,
            performanceRating: Math.min(5, employee.performanceRating + 1),
          }
        : employee,
    );
    setFilteredEmployees(updatedFiltered);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // In a real app, this would update the theme in the document
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className={`min-h-screen bg-background ${isDarkMode ? "dark" : ""}`}>
      <header className="sticky top-0 z-10 bg-background border-b border-border p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-foreground">HR Dashboard</h1>

          <div className="flex items-center space-x-4">
            <div className="hidden md:flex gap-2">
              <Button variant="ghost" asChild>
                <Link to="/" className="flex items-center">
                  Dashboard
                </Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link to="/bookmarks" className="flex items-center">
                  <BookmarkIcon className="mr-2 h-4 w-4" />
                  Bookmarks
                </Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link to="/analytics" className="flex items-center">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Analytics
                </Link>
              </Button>
            </div>

            <div className="flex items-center space-x-2">
              <Sun className="h-4 w-4" />
              <Switch checked={isDarkMode} onCheckedChange={toggleDarkMode} />
              <Moon className="h-4 w-4" />
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4">
        <div className="mb-6">
          <SearchFilterBar departments={departments} onSearch={handleSearch} />
        </div>

        <Separator className="my-6" />

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <Card key={index} className="h-[220px] animate-pulse">
                <CardContent className="p-6">
                  <div className="h-4 bg-muted rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-muted rounded w-1/2 mb-4"></div>
                  <div className="h-4 bg-muted rounded w-2/3 mb-4"></div>
                  <div className="h-8 bg-muted rounded w-full mt-6"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : error ? (
          <div className="text-center p-8">
            <p className="text-destructive text-lg">{error}</p>
            <Button onClick={() => window.location.reload()} className="mt-4">
              Retry
            </Button>
          </div>
        ) : filteredEmployees.length === 0 ? (
          <div className="text-center p-8">
            <p className="text-muted-foreground text-lg">
              No employees match your search criteria.
            </p>
            <Button
              onClick={() => setFilteredEmployees(employees)}
              className="mt-4"
            >
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredEmployees.map((employee) => (
              <EmployeeCard
                key={employee.id}
                employee={employee}
                onBookmark={() => toggleBookmark(employee.id)}
                onPromote={() => handlePromote(employee.id)}
                onView={() => console.log(`View employee ${employee.id}`)}
              />
            ))}
          </div>
        )}
      </main>

      <footer className="border-t border-border p-4 mt-8">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} HR Performance Dashboard</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
