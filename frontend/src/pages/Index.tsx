import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "../components/ui/carousel";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { useFetch } from "../hooks/use-fetch";

const Index = () => {
  const currentYear = new Date().getFullYear();

  const courses = useFetch();
  const recentCourses = courses.slice(-3);

  return (
    <div className="min-h-screen bg-gradient-to-b from-accent to-white flex flex-col">
      <div className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
          <h1 className="text-4xl font-bold text-primary sm:text-5xl md:text-6xl">
            Learn and Grow with Our Courses
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Access high-quality courses taught by industry experts. Start your
            learning journey today!
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <div className="rounded-md shadow">
              <Link to="/courses">
                <Button size="lg" className="w-full">
                  Browse Courses
                </Button>
              </Link>
            </div>
            <div className="mt-3 sm:mt-0 sm:ml-3">
              <Link to="/signup">
                <Button size="lg" variant="outline" className="w-full">
                  Sign Up Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold text-primary mb-8 text-center">
            Recent Courses
          </h2>
          <Carousel className="w-full max-w-5xl mx-auto">
            <CarouselContent>
              {recentCourses.map(
                (course: {
                  _id: string;
                  imageUrl: string;
                  title: string;
                  level: string;
                  description: string;
                  creatorId: {
                    firstName: string;
                  };
                  duration: string;
                  price: string;
                }) => (
                  <CarouselItem
                    key={course._id}
                    className="md:basis-1/2 lg:basis-1/3"
                  >
                    <div className="p-1">
                      <Card className="flex flex-col h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:bg-accent/5">
                        <div className="aspect-video w-full overflow-hidden rounded-t-lg">
                          <img
                            src={course.imageUrl}
                            alt={course.title}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                        <CardHeader>
                          <div className="flex justify-between items-start">
                            <CardTitle className="text-xl">
                              {course.title}
                            </CardTitle>
                            <Badge variant="secondary">{course.level}</Badge>
                          </div>
                          <CardDescription>
                            {course.description}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <span>By {course.creatorId.firstName}</span>
                            <span>{course.duration}</span>
                          </div>
                        </CardContent>
                        <CardFooter className="mt-auto">
                          <div className="flex items-center justify-between w-full">
                            <span className="text-lg font-bold">
                              ₹{course.price}
                            </span>
                            <Link to={`/courses/${course._id}`}>
                              <Button>Learn More</Button>
                            </Link>
                          </div>
                        </CardFooter>
                      </Card>
                    </div>
                  </CarouselItem>
                )
              )}
            </CarouselContent>
          </Carousel>
        </div>
      </div>

      <footer className="bg-primary text-primary-foreground py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between">
            <p>&copy; {currentYear} TechCourses.</p>
            <p>All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
