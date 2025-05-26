import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  CalendarIcon,
  CheckCircle2Icon,
  ClockIcon,
  FileTextIcon,
  MessageSquareIcon,
  StarIcon,
  TrendingUpIcon,
} from "lucide-react";

interface Project {
  id: string;
  name: string;
  status: "completed" | "in-progress" | "planned";
  completion: number;
  dueDate: string;
  role: string;
}

interface Feedback {
  id: string;
  from: string;
  role: string;
  date: string;
  rating: number;
  comment: string;
  avatar?: string;
}

interface EmployeeTabsProps {
  employee?: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: {
      address: string;
      city: string;
      state: string;
      postalCode: string;
    };
    department: string;
    position: string;
    hireDate: string;
    bio: string;
    skills: string[];
    rating: number;
    performanceHistory: Array<{
      date: string;
      rating: number;
      notes: string;
    }>;
  };
}

const EmployeeTabs = ({
  employee = {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "(555) 123-4567",
    address: {
      address: "123 Main St",
      city: "Anytown",
      state: "CA",
      postalCode: "12345",
    },
    department: "Engineering",
    position: "Senior Developer",
    hireDate: "2020-03-15",
    bio: "Experienced developer with a passion for creating efficient and scalable applications. Specializes in frontend development and UI/UX design.",
    skills: [
      "React",
      "TypeScript",
      "Node.js",
      "UI/UX Design",
      "API Development",
    ],
    rating: 4,
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
  },
}: EmployeeTabsProps) => {
  const [activeTab, setActiveTab] = useState("overview");

  // Mock projects data
  const projects: Project[] = [
    {
      id: "p1",
      name: "Dashboard Redesign",
      status: "completed",
      completion: 100,
      dueDate: "2023-03-15",
      role: "Lead Developer",
    },
    {
      id: "p2",
      name: "API Integration",
      status: "in-progress",
      completion: 65,
      dueDate: "2023-06-30",
      role: "Backend Developer",
    },
    {
      id: "p3",
      name: "Mobile App Development",
      status: "planned",
      completion: 0,
      dueDate: "2023-09-01",
      role: "Frontend Developer",
    },
    {
      id: "p4",
      name: "Performance Optimization",
      status: "in-progress",
      completion: 40,
      dueDate: "2023-07-15",
      role: "Technical Lead",
    },
  ];

  // Mock feedback data
  const feedback: Feedback[] = [
    {
      id: "f1",
      from: "Sarah Johnson",
      role: "Project Manager",
      date: "2023-02-10",
      rating: 5,
      comment:
        "Excellent work on the dashboard project. John consistently delivered high-quality code ahead of schedule.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    },
    {
      id: "f2",
      from: "Michael Chen",
      role: "Senior Developer",
      date: "2023-01-15",
      rating: 4,
      comment:
        "Great collaboration on the API integration. Very knowledgeable about best practices.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
    },
    {
      id: "f3",
      from: "Emily Rodriguez",
      role: "UX Designer",
      date: "2022-11-20",
      rating: 5,
      comment:
        "John was very receptive to design feedback and implemented UI changes quickly and accurately.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
    },
  ];

  // Helper function to render stars based on rating
  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <StarIcon
          key={i}
          className={`h-4 w-4 ${i < rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
        />
      ));
  };

  // Helper function to get status badge color
  const getStatusColor = (status: Project["status"]) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "in-progress":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "planned":
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
      default:
        return "";
    }
  };

  return (
    <div className="w-full bg-background">
      <Tabs
        defaultValue="overview"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="overview">
            <FileTextIcon className="mr-2 h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="projects">
            <TrendingUpIcon className="mr-2 h-4 w-4" />
            Projects
          </TabsTrigger>
          <TabsTrigger value="feedback">
            <MessageSquareIcon className="mr-2 h-4 w-4" />
            Feedback
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Employee Profile</CardTitle>
              <CardDescription>
                Comprehensive information about {employee.firstName}{" "}
                {employee.lastName}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">
                      Contact Information
                    </h3>
                    <div className="mt-2 space-y-2">
                      <p>
                        <span className="font-medium">Email:</span>{" "}
                        {employee.email}
                      </p>
                      <p>
                        <span className="font-medium">Phone:</span>{" "}
                        {employee.phone}
                      </p>
                      <p>
                        <span className="font-medium">Address:</span>{" "}
                        {employee.address.address}, {employee.address.city},{" "}
                        {employee.address.state} {employee.address.postalCode}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">
                      Employment Details
                    </h3>
                    <div className="mt-2 space-y-2">
                      <p>
                        <span className="font-medium">Department:</span>{" "}
                        {employee.department}
                      </p>
                      <p>
                        <span className="font-medium">Position:</span>{" "}
                        {employee.position}
                      </p>
                      <p>
                        <span className="font-medium">Hire Date:</span>{" "}
                        {employee.hireDate}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">
                      Bio
                    </h3>
                    <p className="mt-2">{employee.bio}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">
                      Skills
                    </h3>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {employee.skills.map((skill, index) => (
                        <Badge key={index} variant="outline">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">
                      Performance Rating
                    </h3>
                    <div className="mt-2 flex items-center">
                      {renderStars(employee.rating)}
                      <span className="ml-2 text-sm">{employee.rating}/5</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Performance History</CardTitle>
              <CardDescription>Past performance evaluations</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Notes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {employee.performanceHistory.map((history, index) => (
                    <TableRow key={index}>
                      <TableCell>{history.date}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          {renderStars(history.rating)}
                        </div>
                      </TableCell>
                      <TableCell>{history.notes}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Projects Tab */}
        <TabsContent value="projects" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Project Assignments</CardTitle>
              <CardDescription>Current and past projects</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {projects.map((project) => (
                  <div key={project.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium">{project.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          Role: {project.role}
                        </p>
                      </div>
                      <Badge className={getStatusColor(project.status)}>
                        {project.status === "completed" && (
                          <CheckCircle2Icon className="mr-1 h-3 w-3" />
                        )}
                        {project.status === "in-progress" && (
                          <ClockIcon className="mr-1 h-3 w-3" />
                        )}
                        {project.status === "planned" && (
                          <CalendarIcon className="mr-1 h-3 w-3" />
                        )}
                        {project.status.charAt(0).toUpperCase() +
                          project.status.slice(1).replace("-", " ")}
                      </Badge>
                    </div>
                    <div className="mt-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Completion</span>
                        <span>{project.completion}%</span>
                      </div>
                      <Progress value={project.completion} className="h-2" />
                    </div>
                    <div className="mt-4 text-sm">
                      <span className="text-muted-foreground">Due date: </span>
                      <span>{project.dueDate}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Feedback Tab */}
        <TabsContent value="feedback" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Peer Feedback</CardTitle>
              <CardDescription>
                Feedback from colleagues and managers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {feedback.map((item) => (
                  <div key={item.id} className="border rounded-lg p-4">
                    <div className="flex items-start gap-4">
                      <Avatar>
                        <AvatarImage src={item.avatar} alt={item.from} />
                        <AvatarFallback>
                          {item.from
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="font-medium">{item.from}</h3>
                            <p className="text-sm text-muted-foreground">
                              {item.role}
                            </p>
                          </div>
                          <div className="flex items-center">
                            {renderStars(item.rating)}
                          </div>
                        </div>
                        <p className="mt-2">{item.comment}</p>
                        <p className="mt-2 text-sm text-muted-foreground">
                          {item.date}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EmployeeTabs;
