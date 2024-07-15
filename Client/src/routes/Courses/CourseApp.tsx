import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Courses from './Courses'; // Adjust the import path as needed
import CourseDetails from './CourseDetails'; // Adjust the import path as needed

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/" Component={Courses} />
                <Route path="/courses/:id" Component={CourseDetails} />
                {/* Add more routes as needed */}
            </Switch>
        </Router>
    );
}

export default App;
