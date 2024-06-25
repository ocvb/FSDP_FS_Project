import { Box, Container } from "@mui/material";

import "./css/Courses.module.css";

export default function Courses() {
    return (
        <Box
            component={Container}
            maxWidth={true}>
            <Container>
                <div>
                    <h1>Courses</h1>
                    <h2>Ever wanted to learn a new skill or pick up a new hobby?</h2>
                    <h3>Then apply for one of our many courses to upgrade yourself!</h3>
                </div>
            </Container>
        </Box>
    );
}