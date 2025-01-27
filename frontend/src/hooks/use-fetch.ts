import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const useFetch = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(`${BACKEND_URL}/api/v1/course/preview`);
      setCourses(response.data.courses);
      setLoading(false);
    };
    getData();
  }, []);
  return {
    courses,
    loading,
  };
};
