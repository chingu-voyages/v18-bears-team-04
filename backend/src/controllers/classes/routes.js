import { Router } from "express";
import {
  createClass,
  addStudentToClass,
  getAllClasses,
  getClassFromId,
  getClassesByUserName,
  deleteStudentFromClass,
  updateClassName,
  //getAllStudentsInClass
} from "./controllers";
const router = Router();

router.get("/all", getAllClasses);

router.get("/:classId", getClassFromId);

router.get("/user/:userName", getClassesByUserName);

//The Request Body must contain className and teacherName
router.post("", createClass);

//The Request Params must contain classId and studentId
//Example Request:
//http://localhost:5000/api/class/student/?classId=5ea401ea13455e72b16c8b13&studentId=5ea3f7321fc0296afd2fdaa5
router.put("/student", addStudentToClass);

//The Request Params must contain classId and studentId
router.delete("/student", deleteStudentFromClass);

router.put("/:classId", updateClassName);

//Routes to Add:
//1) Delete all students in a given class. Cascading change to Students must be made
//2) Delete A Class by its id. Cascading change to the Students must be made
//3) Update ClassName
//4) Update TeacherName. Cascading change must be made to Teacher

export default router;
