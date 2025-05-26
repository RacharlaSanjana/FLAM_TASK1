import React from "react";
import { Link } from "react-router-dom";
import {
  Star,
  StarHalf,
  Bookmark,
  BookmarkCheck,
  Eye,
  ArrowUp,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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

interface EmployeeCardProps {
  employee: Employee;
  onView?: (id: number) => void;
  onBookmark?: (id: number) => void;
  onPromote?: (id: number) => void;
}

const EmployeeCard = ({
  employee,
  onView = () => {},
  onBookmark = () => {},
  onPromote = () => {},
}: EmployeeCardProps) => {
  // Return a placeholder if employee is undefined
  if (!employee) {
    return (
      <Card className="w-full max-w-[350px] h-[220px] overflow-hidden hover:shadow-md transition-shadow bg-card flex items-center justify-center">
        <p className="text-muted-foreground">Employee data not available</p>
      </Card>
    );
  }

  const {
    id,
    firstName,
    lastName,
    email,
    department,
    performanceRating,
    image,
    isBookmarked,
  } = employee;
  const name = `${firstName} ${lastName}`;
  const rating = performanceRating;
  // Generate initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  };

  // Render stars based on rating
  const renderRating = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star
          key={`star-${i}`}
          className="h-4 w-4 fill-yellow-400 text-yellow-400"
        />,
      );
    }

    if (hasHalfStar) {
      stars.push(
        <StarHalf
          key="half-star"
          className="h-4 w-4 fill-yellow-400 text-yellow-400"
        />,
      );
    }

    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star key={`empty-star-${i}`} className="h-4 w-4 text-gray-300" />,
      );
    }

    return stars;
  };

  // Get department color
  const getDepartmentColor = (department: string) => {
    const colors: Record<string, string> = {
      Engineering: "bg-blue-100 text-blue-800",
      Marketing: "bg-green-100 text-green-800",
      Sales: "bg-purple-100 text-purple-800",
      HR: "bg-pink-100 text-pink-800",
      Finance: "bg-amber-100 text-amber-800",
      Product: "bg-indigo-100 text-indigo-800",
      Design: "bg-rose-100 text-rose-800",
      Operations: "bg-cyan-100 text-cyan-800",
    };

    return colors[department] || "bg-gray-100 text-gray-800";
  };

  return (
    <Card className="w-full max-w-[350px] h-[220px] overflow-hidden hover:shadow-md transition-shadow bg-card">
      <CardHeader className="p-4 pb-2 flex flex-row items-center space-x-4">
        <Avatar className="h-12 w-12 border-2 border-primary/10">
          <AvatarImage
            src={
              image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`
            }
            alt={name}
          />
          <AvatarFallback>{getInitials(name)}</AvatarFallback>
        </Avatar>
        <div className="flex-1 overflow-hidden">
          <h3 className="font-medium text-base truncate">{name}</h3>
          <p className="text-sm text-muted-foreground truncate">{email}</p>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-2 pb-2">
        <div className="flex justify-between items-center mb-2">
          <Badge className={`${getDepartmentColor(department)}`}>
            {department}
          </Badge>
          <div className="flex">{renderRating(rating)}</div>
        </div>
        <div className="mt-4 text-sm text-muted-foreground">
          <p>Performance Score: {rating}/5</p>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-2 flex justify-between gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={() => onView(id)}
                asChild
              >
                <Link to={`/employee/${id}`}>
                  <Eye className="h-4 w-4 mr-1" /> View
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>View employee details</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={() => onBookmark(id)}
              >
                {isBookmarked ? (
                  <>
                    <BookmarkCheck className="h-4 w-4 mr-1 fill-primary" />{" "}
                    Saved
                  </>
                ) : (
                  <>
                    <Bookmark className="h-4 w-4 mr-1" /> Save
                  </>
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>
                {isBookmarked ? "Remove from bookmarks" : "Add to bookmarks"}
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="default"
                size="sm"
                className="flex-1"
                onClick={() => onPromote(id)}
              >
                <ArrowUp className="h-4 w-4 mr-1" /> Promote
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Promote this employee</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardFooter>
    </Card>
  );
};

export default EmployeeCard;
