import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  BookmarkIcon,
  ChevronLeftIcon,
  SearchIcon,
  FilterIcon,
  StarIcon,
  TrashIcon,
  BriefcaseIcon,
  ArrowUpIcon,
  MoonIcon,
  SunIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription } from "@/components/ui/alert";

const BookmarksPage = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState<string>("all");
  const [ratingFilter, setRatingFilter] = useState<string>("all");

  // Mock bookmarked employees data
  const [bookmarkedEmployees, setBookmarkedEmployees] = useState([
    {
      id: 1,
      name: "Jane Cooper",
      email: "jane.cooper@example.com",
      department: "Engineering",
      rating: 4,
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=jane",
    },
    {
      id: 2,
      name: "Robert Fox",
      email: "robert.fox@example.com",
      department: "Marketing",
      rating: 5,
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=robert",
    },
    {
      id: 3,
      name: "Esther Howard",
      email: "esther.howard@example.com",
      department: "HR",
      rating: 3,
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=esther",
    },
    {
      id: 4,
      name: "Cameron Williamson",
      email: "cameron.williamson@example.com",
      department: "Product",
      rating: 4,
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=cameron",
    },
  ]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const removeBookmark = (id: number) => {
    setBookmarkedEmployees(
      bookmarkedEmployees.filter((employee) => employee.id !== id),
    );
  };

  const assignToProject = (id: number) => {
    // This would open a modal or navigate to project assignment page in a real app
    console.log(`Assign employee ${id} to project`);
  };

  const promoteEmployee = (id: number) => {
    // This would trigger promotion workflow in a real app
    console.log(`Promote employee ${id}`);
  };

  // Filter employees based on search term and filters
  const filteredEmployees = bookmarkedEmployees.filter((employee) => {
    const matchesSearch =
      searchTerm === "" ||
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDepartment =
      departmentFilter === "all" || employee.department === departmentFilter;
    const matchesRating =
      ratingFilter === "all" || employee.rating === parseInt(ratingFilter);

    return matchesSearch && matchesDepartment && matchesRating;
  });

  return (
    <div
      className={`min-h-screen bg-background ${theme === "dark" ? "dark" : ""}`}
    >
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="outline" size="icon">
                <ChevronLeftIcon className="h-4 w-4" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <BookmarkIcon className="h-6 w-6 text-primary" />
              Bookmarked Employees
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              {theme === "light" ? "Light" : "Dark"} Mode
            </span>
            <Switch checked={theme === "dark"} onCheckedChange={toggleTheme} />
            {theme === "light" ? (
              <SunIcon className="h-5 w-5 text-yellow-500" />
            ) : (
              <MoonIcon className="h-5 w-5 text-blue-400" />
            )}
          </div>
        </header>

        {/* Search and Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, email or department..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Select
              value={departmentFilter}
              onValueChange={setDepartmentFilter}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="Engineering">Engineering</SelectItem>
                <SelectItem value="Marketing">Marketing</SelectItem>
                <SelectItem value="HR">HR</SelectItem>
                <SelectItem value="Product">Product</SelectItem>
              </SelectContent>
            </Select>
            <Select value={ratingFilter} onValueChange={setRatingFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Ratings</SelectItem>
                <SelectItem value="5">5 Stars</SelectItem>
                <SelectItem value="4">4 Stars</SelectItem>
                <SelectItem value="3">3 Stars</SelectItem>
                <SelectItem value="2">2 Stars</SelectItem>
                <SelectItem value="1">1 Star</SelectItem>
              </SelectContent>
            </Select>
            {(searchTerm || departmentFilter || ratingFilter) && (
              <Button
                variant="ghost"
                onClick={() => {
                  setSearchTerm("");
                  setDepartmentFilter("");
                  setRatingFilter("");
                }}
              >
                Clear
              </Button>
            )}
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="grid" className="mb-8">
          <TabsList>
            <TabsTrigger value="grid">Grid View</TabsTrigger>
            <TabsTrigger value="list">List View</TabsTrigger>
          </TabsList>

          {/* Grid View */}
          <TabsContent value="grid">
            {filteredEmployees.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredEmployees.map((employee) => (
                  <Card
                    key={employee.id}
                    className="overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage
                              src={employee.image}
                              alt={employee.name}
                            />
                            <AvatarFallback>
                              {employee.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-medium">{employee.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {employee.email}
                            </p>
                          </div>
                        </div>
                        <Badge
                          variant={
                            employee.rating >= 4
                              ? "default"
                              : employee.rating >= 3
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {employee.department}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <StarIcon
                            key={i}
                            className={`h-4 w-4 ${i < employee.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                          />
                        ))}
                        <span className="ml-2 text-sm text-muted-foreground">
                          {employee.rating}/5
                        </span>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between gap-2 pt-0">
                      <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="flex-1"
                      >
                        <Link to={`/employee/${employee.id}`}>View</Link>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => assignToProject(employee.id)}
                      >
                        <BriefcaseIcon className="h-4 w-4 mr-1" />
                        Assign
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => promoteEmployee(employee.id)}
                      >
                        <ArrowUpIcon className="h-4 w-4 mr-1" />
                        Promote
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={() => removeBookmark(employee.id)}
                      >
                        <TrashIcon className="h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <Alert className="bg-muted/50">
                <AlertDescription className="flex flex-col items-center justify-center py-10">
                  <BookmarkIcon className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">
                    No bookmarked employees found
                  </h3>
                  <p className="text-muted-foreground text-center max-w-md">
                    {searchTerm || departmentFilter || ratingFilter
                      ? "No employees match your current filters. Try adjusting your search criteria."
                      : "You haven't bookmarked any employees yet. Go to the dashboard to bookmark employees you want to track."}
                  </p>
                  {(searchTerm || departmentFilter || ratingFilter) && (
                    <Button
                      variant="outline"
                      className="mt-4"
                      onClick={() => {
                        setSearchTerm("");
                        setDepartmentFilter("");
                        setRatingFilter("");
                      }}
                    >
                      Clear Filters
                    </Button>
                  )}
                  {!searchTerm && !departmentFilter && !ratingFilter && (
                    <Button asChild className="mt-4">
                      <Link to="/">Go to Dashboard</Link>
                    </Button>
                  )}
                </AlertDescription>
              </Alert>
            )}
          </TabsContent>

          {/* List View */}
          <TabsContent value="list">
            {filteredEmployees.length > 0 ? (
              <div className="space-y-4">
                {filteredEmployees.map((employee) => (
                  <Card
                    key={employee.id}
                    className="overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 gap-4">
                      <div className="flex items-center gap-4">
                        <Avatar>
                          <AvatarImage
                            src={employee.image}
                            alt={employee.name}
                          />
                          <AvatarFallback>
                            {employee.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium">{employee.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {employee.email}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Badge
                          variant={
                            employee.rating >= 4
                              ? "default"
                              : employee.rating >= 3
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {employee.department}
                        </Badge>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <StarIcon
                              key={i}
                              className={`h-4 w-4 ${i < employee.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                            />
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 w-full sm:w-auto">
                        <Button asChild variant="outline" size="sm">
                          <Link to={`/employee/${employee.id}`}>View</Link>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => assignToProject(employee.id)}
                        >
                          <BriefcaseIcon className="h-4 w-4 mr-1" />
                          Assign
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => promoteEmployee(employee.id)}
                        >
                          <ArrowUpIcon className="h-4 w-4 mr-1" />
                          Promote
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                          onClick={() => removeBookmark(employee.id)}
                        >
                          <TrashIcon className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <Alert className="bg-muted/50">
                <AlertDescription className="flex flex-col items-center justify-center py-10">
                  <BookmarkIcon className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">
                    No bookmarked employees found
                  </h3>
                  <p className="text-muted-foreground text-center max-w-md">
                    {searchTerm || departmentFilter || ratingFilter
                      ? "No employees match your current filters. Try adjusting your search criteria."
                      : "You haven't bookmarked any employees yet. Go to the dashboard to bookmark employees you want to track."}
                  </p>
                  {(searchTerm || departmentFilter || ratingFilter) && (
                    <Button
                      variant="outline"
                      className="mt-4"
                      onClick={() => {
                        setSearchTerm("");
                        setDepartmentFilter("");
                        setRatingFilter("");
                      }}
                    >
                      Clear Filters
                    </Button>
                  )}
                  {!searchTerm && !departmentFilter && !ratingFilter && (
                    <Button asChild className="mt-4">
                      <Link to="/">Go to Dashboard</Link>
                    </Button>
                  )}
                </AlertDescription>
              </Alert>
            )}
          </TabsContent>
        </Tabs>

        {/* Stats Section */}
        {filteredEmployees.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Bookmark Statistics</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">
                      Total Bookmarks
                    </p>
                    <p className="text-3xl font-bold">
                      {bookmarkedEmployees.length}
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">
                      Average Rating
                    </p>
                    <p className="text-3xl font-bold">
                      {(
                        bookmarkedEmployees.reduce(
                          (sum, emp) => sum + emp.rating,
                          0,
                        ) / bookmarkedEmployees.length
                      ).toFixed(1)}
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">
                      Top Department
                    </p>
                    <p className="text-3xl font-bold">
                      {
                        Object.entries(
                          bookmarkedEmployees.reduce(
                            (acc, emp) => {
                              acc[emp.department] =
                                (acc[emp.department] || 0) + 1;
                              return acc;
                            },
                            {} as Record<string, number>,
                          ),
                        ).sort((a, b) => b[1] - a[1])[0][0]
                      }
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookmarksPage;
