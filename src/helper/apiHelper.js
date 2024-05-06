import JobList from "../utils/listing.json";
import appList from "../utils/application.json";
import TodoList from "../utils/todo.json";

export const getJobList = async () => {
  try {
    const data = JobList;
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return false;
  }
};

export const getJobDetail = async (_id) => {
  try {
    const id = _id ? _id - 1 : _id;
    const data = JobList.jobList[id];
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return false;
  }
};

export const getApplicationStatus = async () => {
  try {
    const data = appList;
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return false;
  }
};
export const getTodoList = async () => {
  try {
    const data = TodoList;
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return false;
  }
};
