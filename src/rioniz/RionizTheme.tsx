import { createTheme } from "@mui/material/styles";
import { RionizConfigs } from "./RionizConfigs.ts";

export const theme = createTheme({
    direction: RionizConfigs.languageDirection,
    palette: {
        background: {
            default: "#f9eaff",
            paper: "#ffffff"
        }
    }
});
