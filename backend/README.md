Users API

1. GET /api/user/:userName
   Description: Get the User by Username
   Returns:
   Success: A user object {Status: 200}
   Failed: {message: User (username) not found} {Status: 404}
   Body: No body needed

2. POST /api/user
   Description: Create a New User
   Returns:
   Success: The User Object created {Status:201}
   Failed: {message: 'A detailed error message here'}
   Body:
   {
   userName: String, //unique
   email: String, //unique
   role: ENUM('teacher', 'student') //[default: 'student']
   }

Class API

1. POST /api/class
   Description: Create a New Class
   Returns:
   Success: The Class Object created {Status:201}
   Failed: {message: 'A detailed error message here'}
   Body:
   {
   className: String,
   classCode: String, //unique
   teacherName: String //UserName
   }

2. PUT /api/class/:studentName
   Description: Add A Student to the Student Names Array
   Returns:
   Success: The Updated Class Object {Status:200}
   Failed: {message: 'A detailed Error message'}
   Body:
   {
   classCode: String
   }

Assignment API

1. POST /api/assignment
   Description: Create a New Assignment
   Returns:
   Success: The Assignment Object created {Status:201}
   Failed: {message: 'A detailed error message here'}
   Body:
   {
   clasId: String,
   title: String, //title
   teacherName: String //UserName
   description: String //description
   startDate: String //startDate
   endDate: String //endDate
   userId: String //Unique
   }


1. GET /api/assignment  
   Description: Returns All Assignment created
   Returns:
   Success: List Of all Assignment {Status:200}
   Failed: {message: 'A detailed error message here'}
   Body:[
     {
   clasId: String,
   title: String, //title
   teacherName: String //UserName
   description: String //description
   startDate: String //startDate
   endDate: String //endDate
   userId: String //Unique
   },
    {
   clasId: String,
   title: String, //title
   teacherName: String //UserName
   description: String //description
   startDate: String //startDate
   endDate: String //endDate
   userId: String //Unique
   }
   ]

3.     GET /api/assignment/      assignment:userId      
   Description: Returns user Assignment by userId
   Returns:
   Success: Retrieved User Assignment {Status:200}
   Failed: {message: 'A detailed error message here'}
   Body:
   {
   clasId: String,
   title: String, //title
   teacherName: String //UserName
   description: String //description
   startDate: String //startDate
   endDate: String //endDate
   userId: String //Unique
   }
    
4.     PUT /api/assignment/:assignmentiD
   Description: Returns user Assignment by userId
   Returns:
   Success: Assignment Updated Successfully {Status:200}
   Failed: {message: 'A detailed error message here'}
   Body:
   {
   clasId: String,
   title: String, //title
   teacherName: String //UserName
   description: String //description
   startDate: String //startDate
   endDate: String //endDate
   userId: String //Unique
   }
   
5.     DELETE /api/assignment/:assignmentId
   Description: Delete Assignment by an Id
   Returns:
   Success: Assignment Deleted Successfully {Status:200}
   Failed: {message: 'A detailed error message here'}
   msg:
   {
     Assignment Deleted Successfully
   }
   
6.     DELETE /api/assignment
   Description: Delete All Assignment 
   Returns:
   Success: Deleted All Assignments {Status:200}
   Failed: {message: 'A detailed error message here'}
   msg:
   {
    Deleted All Assignments
   }
