import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { courses } from "../data/courses";

const Courses = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-accent/50 to-background p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-primary mb-8">
          Available Courses
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Card
              key={course.id}
              className="flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:bg-accent/5"
            >
              <div className="aspect-video w-full overflow-hidden rounded-t-lg">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl">{course.title}</CardTitle>
                  <Badge
                    variant="secondary"
                    className="transition-colors duration-300 group-hover:bg-secondary group-hover:text-secondary-foreground"
                  >
                    {course.level}
                  </Badge>
                </div>
                <CardDescription>{course.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>By {course.instructor}</span>
                  <span>{course.duration}</span>
                </div>
              </CardContent>
              <CardFooter className="mt-auto">
                <div className="flex items-center justify-between w-full">
                  <span className="text-lg font-bold">${course.price}</span>
                  <Button className="transition-all duration-300 hover:scale-105">
                    Enroll Now
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;
