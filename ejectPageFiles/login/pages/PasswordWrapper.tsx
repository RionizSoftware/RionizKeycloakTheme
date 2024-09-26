import { type KcClsx } from "rionizkeycloakify/login/lib/kcClsx";
import type { I18n } from "rionizkeycloakify/login/i18n";
import { useEffect, useReducer } from "react";
import { assert } from "rionizkeycloakify/tools/assert";
import { Box, Button, Link, TextField, FormLabel, Typography, List, ListItem, Checkbox, Radio, IconButton } from "@mui/material";
import { styles } from "../styles/pages/PasswordWrapper.ts";
import { Visibility, VisibilityOff } from "@mui/icons-material";

//Add Changed completely
export function PasswordWrapper(props: { id: string; kcClsx: KcClsx; i18n: I18n; passwordInputId: string; children: JSX.Element }) {
    const { kcClsx, i18n, passwordInputId, children } = props;
    const { msgStr } = i18n;
    const [isPasswordRevealed, toggleIsPasswordRevealed] = useReducer((isPasswordRevealed: boolean) => !isPasswordRevealed, false);
    useEffect(() => {
        const passwordInputElement = document.getElementById(passwordInputId);
        assert(passwordInputElement instanceof HTMLInputElement);
        passwordInputElement.type = isPasswordRevealed ? "text" : "password";
    }, [isPasswordRevealed]);
    return (
        <Box id="PasswordWrapper_Box_1" sx={styles.PasswordWrapper_Box_1}>
            {children}
            <IconButton
                type="button"
                aria-label={msgStr(isPasswordRevealed ? "hidePassword" : "showPassword")}
                aria-controls={passwordInputId}
                onClick={toggleIsPasswordRevealed}
                id="PasswordWrapper_Button_1"
                sx={styles.PasswordWrapper_Button_1}
            >
                {isPasswordRevealed ? <VisibilityOff sx={{ fontSize: 25 }} /> : <Visibility sx={{ fontSize: 25 }} />}
            </IconButton>
        </Box>
    );
}
