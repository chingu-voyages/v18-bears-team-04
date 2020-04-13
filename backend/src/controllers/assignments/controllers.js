import Assignment from "../../models/assignments";
import createError from "http-errors";
import User, { userRole } from "../../models/users";
import Class from "../../models/classes";

export const createAssignment = async (req, res, next) => {
  try {
    const { teacherName, classId } = req.body;

    //User validation
    const user = await User.findOne({ userName: teacherName });
    if (!user) throw createError(404, `Teacher ${teacherName} not found`);

    //Authorization Validation
    if (user.role != userRole.TEACHER) {
      throw createError(404, `User ${teacherName} is not a Teacher`);
    }

    //validate if class exist
    const existingClass = await Class.findById(classId);
    if (!existingClass)
      throw createError(404, `Claas ${classId} dose not exist`);

    //create a new Assignment
    const assignment = await Assignment.create(req.body);
    //response object
    res.status(201).json({
      msg: "Assignment created",
      assignment,
    });
  } catch (err) {
    next(err);
  }
};

export const getAllAssignment = async(_req, res, next) => {
    try {
    const assignments = await Assignment.find().lean();
    if(!assignments)throw err;
    res.status(200).json(assignments);
    } catch (err) {
    next(err)
    }
}
export const getAssignmentById = async (req, res, next) => {
    try {
      const { assignmentId } = req.params;
      const activeAssigment = await Assignment.findById(assignmentId);
      console.log(activeAssigment, 'active')
      if (!activeAssigment)
        throw createError(404, `Assignment with Id ${assignmentId} not found`);
      res.status(200).json(activeAssigment);
    } catch (err) {
      next(err);
    }
  };

  export const updateAssignment = async (req, res, next) =>{
      try {
        const { assignmentId } = req.params;
       
        //validate if assignment exist in DB
        const validateId = await Assignment.findById(assignmentId);

        if(!validateId) throw createError(404, `Assignment id ${assignmentId} does not exist`);

        //Update the existing assignment
        const newAssignment = await Assignment.insertMany(req.body);
        res.status(200).json({
            msg: 'Assignment Updated Successfully',
            newAssignment
        })
      } catch (err) {
          next(err)
      
      };
  }

  export const deleteSingleAssignmentById = async(req, res, next) =>{
      try {
        const { assignmentId } = req.params;

        //Validate if assignment exist in DB
        const validateId = await Assignment.findById(assignmentId);
        if(!validateId) throw createError(404, `Assignment Id ${assignmentId} does not exist`);

        //Delete assignment from DB
         await Assignment.deleteOne({_id: assignmentId});
         res.status(200).json({
             msg: `Assignment Deleted Successfully`
         })
      } catch (err) {
      next(err)
      }
     
  }
  