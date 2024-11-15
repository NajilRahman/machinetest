Set up and run
---------------

use npm i to install all node_module packages

npm run dev to start front end 

use cd server and run 
start json server using 'json-server --watch db.json --port 3001'


application ready to run



Core Features
_______________
This application lets users:

1. **Create, View, Edit, and Delete Posts** (CRUD operations).
2. **Search Posts** by title and body.
3. **Show Notifications** for actions like creating, updating, or deleting posts.
4. **Show a Loading Spinner** while waiting for API requests (like fetching or saving posts).

 How it Works:
- **Create Post:** Users can add new posts by entering a title and body.
- **View Posts:** Users can see a list of all posts.
- **Edit Post:** Users can update the title or body of existing posts.
- **Delete Post:** Users can remove posts they no longer need.
- **Search:** Users can search for posts by title or body content.
- **Notifications:** After creating, editing, or deleting a post, a notification appears to confirm the action.
- **Loading Spinner:** A spinner shows while the app is waiting for data from the server.

In short, it’s a simple app for managing posts with basic actions (CRUD), search, and helpful visual cues like notifications and a loading spinner.
