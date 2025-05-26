import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Star,
  StarHalf,
  Mail,
  Phone,
  MapPin,
  Building,
  Calendar,
} from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import EmployeeTabs from "@/components/EmployeeTabs";

interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  age: number;
  image: string;
  address: {
    address: string;
    city: string;
    state: string;
    postalCode: string;
  };
  company: {
    name: string;
    department: string;
    title: string;
  };
  rating: number;
  joinDate: string;
  bio: string;
}

const EmployeeDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        setLoading(true);
        // Fetch employee data from API
        const response = await fetch(`https://dummyjson.com/users/${id}`);
        if (!response.ok) {
          throw new Error("Employee not found");
        }

        const userData = await response.json();

        // Enhance the user data with additional fields
        const enhancedData: Employee = {
          ...userData,
          company: {
            name: userData.company?.name || "FLAMAPP Inc.",
            department:
              userData.company?.department ||
              ["HR", "Engineering", "Marketing", "Sales", "Finance"][
                Math.floor(Math.random() * 5)
              ],
            title:
              userData.company?.title ||
              ["Manager", "Director", "Associate", "Lead", "Specialist"][
                Math.floor(Math.random() * 5)
              ],
          },
          rating: userData.rating || Math.floor(Math.random() * 5) + 1,
          joinDate:
            userData.joinDate ||
            new Date(
              Date.now() -
                Math.floor(Math.random() * 5 * 365 * 24 * 60 * 60 * 1000),
            )
              .toISOString()
              .split("T")[0],
          bio:
            userData.bio ||
            "A dedicated professional with expertise in their field. Committed to delivering high-quality work and collaborating effectively with team members.",
        };

        setEmployee(enhancedData);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch employee data",
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchEmployee();
    }
  }, [id]);

  const handleBack = () => {
    navigate("/");
  };

  const renderRatingStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star
          key={`star-${i}`}
          className="h-5 w-5 fill-yellow-400 text-yellow-400"
        />,
      );
    }

    if (hasHalfStar) {
      stars.push(
        <StarHalf
          key="half-star"
          className="h-5 w-5 fill-yellow-400 text-yellow-400"
        />,
      );
    }

    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star key={`empty-star-${i}`} className="h-5 w-5 text-gray-300" />,
      );
    }

    return stars;
  };

  const getRatingBadgeColor = (rating: number) => {
    if (rating >= 4.5) return "bg-green-500 text-white";
    if (rating >= 3.5) return "bg-blue-500 text-white";
    if (rating >= 2.5) return "bg-yellow-500 text-white";
    if (rating >= 1.5) return "bg-orange-500 text-white";
    return "bg-red-500 text-white";
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6 bg-background">
        <div className="flex items-center mb-6">
          <Skeleton className="h-10 w-24 mr-4" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <Skeleton className="h-24 w-24 rounded-full mx-auto" />
                <Skeleton className="h-8 w-48 mx-auto mt-4" />
                <Skeleton className="h-4 w-32 mx-auto mt-2" />
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <Skeleton className="h-8 w-32" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-64 w-full" />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6 bg-background">
        <Card className="p-6 text-center">
          <CardTitle className="text-red-500 mb-4">Error</CardTitle>
          <p>{error}</p>
          <Button onClick={handleBack} className="mt-4">
            Back to Dashboard
          </Button>
        </Card>
      </div>
    );
  }

  if (!employee) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto p-6 bg-background"
    >
      <div className="flex items-center mb-6">
        <Button
          variant="outline"
          onClick={handleBack}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Employee Profile Card */}
        <div className="lg:col-span-1">
          <Card className="bg-card">
            <CardHeader className="text-center">
              <Avatar className="h-24 w-24 mx-auto">
                <AvatarImage
                  src={employee.image}
                  alt={`${employee.firstName} ${employee.lastName}`}
                />
                <AvatarFallback>
                  {employee.firstName[0]}
                  {employee.lastName[0]}
                </AvatarFallback>
              </Avatar>
              <CardTitle className="mt-4">
                {employee.firstName} {employee.lastName}
              </CardTitle>
              <div className="text-sm text-muted-foreground">
                {employee.company.title} - {employee.company.department}
              </div>
              <div className="flex justify-center mt-2">
                {renderRatingStars(employee.rating)}
              </div>
              <Badge className={`mt-2 ${getRatingBadgeColor(employee.rating)}`}>
                {employee.rating.toFixed(1)} Rating
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{employee.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{employee.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>
                    {employee.address.address}, {employee.address.city},{" "}
                    {employee.address.state} {employee.address.postalCode}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  <span>{employee.company.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Joined: {employee.joinDate}</span>
                </div>
              </div>
              <div className="mt-6">
                <h3 className="font-medium mb-2">Bio</h3>
                <p className="text-sm text-muted-foreground">{employee.bio}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabbed Content */}
        <div className="lg:col-span-2">
          <Card className="bg-card">
            <CardContent className="pt-6">
              <EmployeeTabs
                employee={{
                  id: employee.id,
                  firstName: employee.firstName,
                  lastName: employee.lastName,
                  email: employee.email,
                  phone: employee.phone,
                  address: employee.address,
                  department: employee.company.department,
                  position: employee.company.title,
                  hireDate: employee.joinDate,
                  bio: employee.bio,
                  skills: [
                    "React",
                    "TypeScript",
                    "UI/UX Design",
                    "API Development",
                    "Node.js",
                  ],
                  rating: employee.rating,
                  performanceHistory: [
                    {
                      date: "2023-01-15",
                      rating: 4,
                      notes: "Excellent work on the dashboard project.",
                    },
                    {
                      date: "2022-07-10",
                      rating: 4,
                      notes: "Successfully led the API redesign initiative.",
                    },
                    {
                      date: "2022-01-20",
                      rating: 3,
                      notes: "Good performance, but missed some deadlines.",
                    },
                    {
                      date: "2021-07-05",
                      rating: 4,
                      notes: "Excellent mentorship of junior developers.",
                    },
                  ],
                }}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
};

export default EmployeeDetailsPage;
