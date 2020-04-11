Users API

1. GET /api/users/:userName
   Description: Get the User by Username
   Returns:
   Success: A user object {Status: 200}
   Failed: {message: User (username) not found} {Status: 404}
   Body: No body needed

2. POST /api/users
   Description: Create a New User
   Returns:
   Success: The User Object created {Status:201}
   Failed: {message: 'A detailed error message here'}
   Body:
   {
   userName: String,
   email: String,
   role: ENUM('teacher', 'student') //[default: 'student']
   }
