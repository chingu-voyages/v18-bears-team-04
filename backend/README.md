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
