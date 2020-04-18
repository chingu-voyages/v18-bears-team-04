Users API

1. GET /api/user/name/:userName
   Description: Get the User by Username
   Returns:
   Success: A user object {Status: 200}
   Failed: {message: User (username) not found} {Status: 404}
   Body: No body needed

2. GET /api/user
   Description: Get All Users
   Returns:
   Success: An array of User Object {Status:200}
   Failed: {message: 'A detailed error message'}
   Body: No Body needed

3) POST /api/user
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

4) DELETE /api/user/is/:userId
   Description: Delete the user by User Id
   Success: Deleted user Object {Status: 200}
   Failed: {message: User with Id (userId) not found} {Status:404}

Class API

1. POST /api/class
   Description: Create a New Class
   Returns:
   Success: The Class Object created {Status:201}
   Failed: {message: 'A detailed error message here'}
   Body:
   {
   className: String,
   teacherName: String //UserName
   }

2. PUT /api/class/:studentName
   Description: Add A Student to the Student Names Array
   Returns:
   Success: The Updated Class Object {Status:200}
   Failed: {message: 'A detailed Error message'}
   Body:
   {
   classId: String
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

1)  GET /api/assignment  
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

2)      GET /api/assignment/      assignment:userId
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
3)      PUT /api/assignment/:assignmentiD

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

4)      DELETE /api/assignment/:assignmentId

    Description: Delete Assignment by an Id
    Returns:
    Success: Assignment Deleted Successfully {Status:200}
    Failed: {message: 'A detailed error message here'}
    msg:
    {
    Assignment Deleted Successfully
    }

5)      DELETE /api/assignment
    Description: Delete All Assignment
    Returns:
    Success: Deleted All Assignments {Status:200}
    Failed: {message: 'A detailed error message here'}
    msg:
    {
    Deleted All Assignments
    }
