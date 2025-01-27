import { useAuth } from "../contexts/AuthContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Clock, GraduationCap } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

export default function Dashboard() {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const response = await axios.get(`${BACKEND_URL}/api/v1/user/purchases`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      setCourses(response.data.purchases);
      setLoading(false);
    };
    getData();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          My Learning Dashboard
        </h1>
        <p className="text-gray-600 mt-2">Welcome back, {user?.email}</p>
      </div>
      {loading ? (
        <div className="flex justify-center items-center">Loading...</div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {courses.map(
            (course: {
              _id: string;
              imageUrl: string;
              title: string;
              duration: string;
              level: string;
              creatorName: string;
            }) => (
              <Card
                key={course._id}
                className="hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <div className="aspect-video relative rounded-t-lg overflow-hidden">
                    <img
                      src={course.imageUrl}
                      alt={course.title}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <CardTitle className="mt-4">{course.title}</CardTitle>
                  <CardDescription>{course.creatorName}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <GraduationCap className="w-4 h-4" />
                      <span>{course.level}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Continue Learning</Button>
                </CardFooter>
              </Card>
            )
          )}
        </div>
      )}
    </div>
  );
}
