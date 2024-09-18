import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { ReactElement } from "react";
import { theme } from "./RionizTheme.tsx";
import { RionizConfigs } from "./RionizConfigs.ts";
import { RionizCacheProvider } from "./RionizCacheProvider.tsx";

export function RionizRoot(props: { children: ReactElement }) {
    return (
        <Box dir={RionizConfigs.languageDirection}>
            <RionizCacheProvider>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    {props.children}
                </ThemeProvider>
            </RionizCacheProvider>
        </Box>
    );
}
