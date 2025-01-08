export interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  instructor: string;
  image: string;
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced";
}

export const courses: Course[] = [
  {
    id: "1",
    title: "Web Development Fundamentals",
    description:
      "Learn the basics of HTML, CSS, and JavaScript to build modern websites.",
    price: 49.99,
    instructor: "Sarah Johnson",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    duration: "8 weeks",
    level: "Beginner",
  },
  {
    id: "2",
    title: "Advanced React Development",
    description:
      "Master React.js with advanced concepts, hooks, and state management.",
    price: 79.99,
    instructor: "Michael Chen",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    duration: "10 weeks",
    level: "Advanced",
  },
  {
    id: "3",
    title: "Full Stack JavaScript",
    description:
      "Build complete applications with Node.js, Express, and MongoDB.",
    price: 89.99,
    instructor: "David Smith",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
    duration: "12 weeks",
    level: "Intermediate",
  },
  {
    id: "4",
    title: "Python for Data Science",
    description:
      "Learn Python programming for data analysis and machine learning.",
    price: 69.99,
    instructor: "Emily Zhang",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
    duration: "10 weeks",
    level: "Intermediate",
  },
  {
    id: "5",
    title: "UI/UX Design Principles",
    description:
      "Master the fundamentals of user interface and experience design.",
    price: 59.99,
    instructor: "Alex Turner",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5",
    duration: "6 weeks",
    level: "Beginner",
  },
  {
    id: "6",
    title: "Mobile App Development",
    description:
      "Create cross-platform mobile applications using React Native.",
    price: 84.99,
    instructor: "Jessica Lee",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c",
    duration: "12 weeks",
    level: "Advanced",
  },
  {
    id: "7",
    title: "Cloud Computing Essentials",
    description: "Learn AWS, Azure, and cloud infrastructure management.",
    price: 94.99,
    instructor: "Robert Wilson",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa",
    duration: "10 weeks",
    level: "Intermediate",
  },
  {
    id: "8",
    title: "Cybersecurity Fundamentals",
    description:
      "Understanding basic concepts of network security and ethical hacking.",
    price: 79.99,
    instructor: "Lisa Anderson",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b",
    duration: "8 weeks",
    level: "Beginner",
  },
];
