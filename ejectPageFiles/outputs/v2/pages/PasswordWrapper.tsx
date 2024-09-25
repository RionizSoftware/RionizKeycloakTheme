import { type KcClsx } from "rionizkeycloakify/login/lib/kcClsx";
import type { I18n } from "rionizkeycloakify/login/i18n";
import { useEffect, useReducer } from "react";
import { assert } from "rionizkeycloakify/tools/assert";
import {
    Box,
    Button,
    Link,
    TextField,
    FormLabel,
    Typography,
    List,
    ListItem
} from "@mui/material";
import { styles } from "../styles/pages/PasswordWrapper.ts";
export function PasswordWrapper(props: {
    kcClsx: KcClsx;
    i18n: I18n;
    passwordInputId: string;
    children: JSX.Element;
}) {
    const { kcClsx, i18n, passwordInputId, children } = props;
    const { msgStr } = i18n;
    const [isPasswordRevealed, toggleIsPasswordRevealed] = useReducer(
        (isPasswordRevealed: boolean) => !isPasswordRevealed,
        false
    );
    useEffect(() => {
        const passwordInputElement = document.getElementById(passwordInputId);
        assert(passwordInputElement instanceof HTMLInputElement);
        passwordInputElement.type = isPasswordRevealed ? "text" : "password";
    }, [isPasswordRevealed]);
    return (
        <Box id="PasswordWrapper_div_1">
            {children}
            <Button
                id="PasswordWrapper_button_1"
                type="button"
                aria-label={msgStr(isPasswordRevealed ? "hidePassword" : "showPassword")}
                aria-controls={passwordInputId}
                onClick={toggleIsPasswordRevealed}
            >
                <i id="PasswordWrapper_i_1" aria-hidden />
            </Button>
        </Box>
    );
}
