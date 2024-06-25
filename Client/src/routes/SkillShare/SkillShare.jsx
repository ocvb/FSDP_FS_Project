import { Box, Container } from "@mui/material";
import Button from "@/components/Button/CustomButton.module";

import "./SkillShare.module.css";

export default function SkillShare() {
    return (
        <Box
            component={Container}
            maxWidth={true}>
            <Container>
                <h1>Thousands of creative classes!</h1>
                <h2>Request Skills Post</h2>
                <p>Explore new skills, deepen existing passions, and get lost in creativity. What you find just might surprise and inspire you.</p>
                <Button text="Post a request" />
            </Container>
        </Box>
    );
}