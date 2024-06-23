
// Components
import { Box, Container } from "@mui/material";
import Button from "@/components/Button/CustomButton.module";

import Editor from "./Modal/Editor/Editor";

import styles from "./Admin.module.css";

export default function Admin() {

    const tabs = [
        { name: "Editor", },
        { name: "Analytics", },
        { name: "Account", }
    ]

    const InputStyle = {
        width: '100%',
        padding: '0.5rem',
        borderRadius: '5px',
        outline: 'none',
        fontSize: '1rem',
        color: 'black',
        justifyContent: 'start',
    }

    return (
        <Container maxWidth="true" sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'start',
            alignItems: 'start',
            padding: '0 !important',
            backgroundColor: 'lightgrey',
            height: 'calc(100vh - 64px)',
        }}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'start',
                alignItems: 'start',
                maxWidth: '200px',
                padding: '1rem',
                height: '100%',
                backgroundColor: 'white',
            }}>
                {/* TODO: EVERYTHing ;) */}
                <div className={styles.tabs}>
                    {tabs && tabs.map((tab, index) => {
                        return (
                            <div key={index} className={styles.tab}>
                                <Button sx={InputStyle} text={tab.name}></Button>
                            </div>
                        );
                    })}
                </div>
            </Box>
            <Box maxWidth={true} sx={{
                position: 'relative',
                padding: '1rem',
                width: '100%',
                gap: '1rem',

            }}>
                <Editor />

            </Box>
        </Container>
    );
}