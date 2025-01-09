import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { BACKEND_URL } from "../../config";
import axios from "axios";

const useFetch = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const getCourses = async () => {
      const response = await axios.get(
        `${BACKEND_URL}/api/v1/admin/course/bulk`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      setCourses(response.data.courses);
    };
    getCourses();
  }, []);

  return courses;
};

const AdminDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const courses = useFetch();

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-accent/50 to-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-primary">Admin Dashboard</h1>
          <Link to="/admin/courses/create">
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Create Course
            </Button>
          </Link>
        </div>

        <div className="bg-card rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">All Courses</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4">Title</th>
                  <th className="text-left p-4">Instructor</th>
                  <th className="text-left p-4">Level</th>
                  <th className="text-left p-4">Price</th>
                  <th className="text-left p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {courses.map(
                  ({
                    _id,
                    title,
                    creatorId,
                    level,
                    price,
                  }: {
                    _id: string;
                    title: string;
                    creatorId: {
                      firstName: string;
                    };
                    level: string;
                    price: string;
                  }) => (
                    <tr key={_id} className="border-b hover:bg-accent/5">
                      <td className="p-4">{title}</td>
                      <td className="p-4">{creatorId.firstName}</td>
                      <td className="p-4">{level}</td>
                      <td className="p-4">${price}</td>
                      <td className="p-4">
                        <Link to={`/admin/courses/edit/${_id}`}>
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
