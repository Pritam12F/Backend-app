## Backend for a course selling website

- Admins and users are two types of users on this website
- Courses are the third table in the database which contains the entries for all the courses on the website
- Admins can sign up, sign in, view all courses, and create a new course
- Users can sign up, sign in, view all courses, purchase a course, and view all purchased courses
- Admins and Users get Json Web Token (JWT) when they sign in which will be used as the authentication method for viewing courses, adding courses for admin, purchasing courses, viewing all courses, and viewing all purchased courses for user
