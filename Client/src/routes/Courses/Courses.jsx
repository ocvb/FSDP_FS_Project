import { Box, Container } from "@mui/material";


import "./Courses.module.css";

export default function Courses() {
    return (
        <Box
            component={Container}
            maxWidth={true}>
            <Container>
                <div>
                    <h1>Courses</h1>
                </div>
            </Container>
        </Box>
    );
}