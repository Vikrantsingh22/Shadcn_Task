import { Link, useNavigate } from "react-router-dom";

import { List, MoreHorizontal, Notebook, PlusCircle } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";
import { ModeToggle } from "./ui/Darkmode";

export function Dashboard() {
  const [task, setTask] = useState([]);

  // Fetching the task from the server
  useEffect(() => {
    // I am using IIFE to call the async function
    (async () => {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        const res = await axios.get("http://localhost:3543/tasks", config);

        setTask(res.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    })();
  }, []);
  const navigate = useNavigate();

  // Button to navigate between pages
  const EditTask = (task) => {
    sessionStorage.setItem("task", JSON.stringify(task));

    navigate("/edit");
  };
  const DeleteTask = async (task) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.delete(
        `http://localhost:3543/tasks/${task?.id}`,
        config
      );

      if (res.status === 204) {
        window.location.reload();
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };
  const addTask = () => {
    navigate("/add");
  };
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <Link to={"/"} className="flex items-center gap-2">
            <Notebook />
          </Link>
          <Breadcrumb className="hidden md:flex">
            <BreadcrumbList>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>All Task</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="relative ml-auto flex-1 md:grow-0"></div>
          <ModeToggle />
        </header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Tabs defaultValue="all">
            <div className="flex items-center">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
              </TabsList>
              <div className="ml-auto flex items-center gap-2">
                <Button size="sm" className="h-8 gap-1 " onClick={addTask}>
                  <PlusCircle className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Add Task
                  </span>
                </Button>
              </div>
            </div>
            <TabsContent value="all">
              <Card x-chunk="dashboard-06-chunk-0">
                <CardHeader>
                  <CardTitle>Task</CardTitle>
                  <CardDescription>View and Manage your task .</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="hidden w-[100px] sm:table-cell">
                          <span className="sr-only">Image</span>
                        </TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="hidden md:table-cell">
                          Description
                        </TableHead>

                        <TableHead className="hidden md:table-cell">
                          Due date
                        </TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {task.map((task) => (
                        <TableRow key={task?.id}>
                          <TableCell className="hidden sm:table-cell">
                            {task?.id}
                          </TableCell>
                          <TableCell className="font-medium">
                            {task?.title}
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{task?.status}</Badge>
                          </TableCell>

                          <TableCell className="hidden md:table-cell">
                            {task?.description}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {format(new Date(task?.dueDate), "PPP")}
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  aria-haspopup="true"
                                  size="icon"
                                  variant="ghost"
                                >
                                  {/* <MoreHorizontal className="h-4 w-4" /> */}
                                  <List className="h-4 w-4" />
                                  <span className="sr-only">Toggle menu</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem>
                                  <Button
                                    variant={"ghost"}
                                    className="h-6"
                                    onClick={() => EditTask(task)}
                                  >
                                    Edit
                                  </Button>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  {" "}
                                  <Button
                                    variant={"ghost"}
                                    className="h-6"
                                    onClick={() => DeleteTask(task)}
                                  >
                                    Delete
                                  </Button>
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter>
                  <div className="text-xs text-muted-foreground"></div>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}
