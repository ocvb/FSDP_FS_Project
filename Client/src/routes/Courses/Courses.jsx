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
                    <p>Ever wanted to learn a new skill or pick up a new hobby?</p>
                </div>
            </Container>
        </Box>
    );
}