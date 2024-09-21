import { useState, useEffect, useReducer } from "react";
import { clsx } from "keycloakify/tools/clsx";
import { assert } from "keycloakify/tools/assert";
import { getKcClsx, type KcClsx } from "keycloakify/login/lib/kcClsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
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
import { styles } from "./styles/LoginPassword.ts";
export default function LoginPassword(
    props: PageProps<
        Extract<
            KcContext,
            {
                pageId: "login-password.ftl";
            }
        >,
        I18n
    >
) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });
    const { realm, url, messagesPerField } = kcContext;
    const { msg, msgStr } = i18n;
    const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);
    return (
        <Template id="LoginPassword_Template_1">
            <Box id="LoginPassword_Box_1" sx={styles.LoginPassword_Box_1}>
                <Box
                    onSubmit={() => {
                        setIsLoginButtonDisabled(true);
                        return true;
                    }}
                    action={url.loginAction}
                    method="post"
                    component="form"
                    id="LoginPassword_Box_2"
                    sx={styles.LoginPassword_Box_2}
                >
                    <Box id="LoginPassword_Box_3" sx={styles.LoginPassword_Box_3}>
                        <hr id="LoginPassword_hr_1" />
                        <FormLabel
                            id="LoginPassword_FormLabel_1"
                            sx={styles.LoginPassword_FormLabel_1}
                        >
                            {msg("password")}
                        </FormLabel>

                        <PasswordWrapper id="LoginPassword_PasswordWrapper_1">
                            <TextField
                                tabIndex={2}
                                className={kcClsx("kcInputClass")}
                                name="password"
                                type="password"
                                autoFocus
                                autoComplete="on"
                                aria-invalid={messagesPerField.existsError(
                                    "username",
                                    "password"
                                )}
                                id="LoginPassword_TextField_1"
                                sx={styles.LoginPassword_TextField_1}
                            />
                        </PasswordWrapper>

                        {messagesPerField.existsError("password") && (
                            <span
                                id="input-error-password"
                                className={kcClsx("kcInputErrorMessageClass")}
                                aria-live="polite"
                                dangerouslySetInnerHTML={{
                                    __html: messagesPerField.get("password")
                                }}
                            />
                        )}
                    </Box>
                    <Box id="LoginPassword_Box_4" sx={styles.LoginPassword_Box_4}>
                        {realm.resetPasswordAllowed && (
                            <span id="LoginPassword_span_2">
                                <Link
                                    id="LoginPassword_Link_1"
                                    sx={styles.LoginPassword_Link_1}
                                >
                                    {msg("doForgotPassword")}
                                </Link>
                            </span>
                        )}
                    </Box>
                    <Box
                        className={kcClsx("kcFormGroupClass")}
                        id="LoginPassword_Box_5"
                        sx={styles.LoginPassword_Box_5}
                    >
                        <TextField
                            tabIndex={4}
                            className={kcClsx(
                                "kcButtonClass",
                                "kcButtonPrimaryClass",
                                "kcButtonBlockClass",
                                "kcButtonLargeClass"
                            )}
                            name="login"
                            type="submit"
                            value={msgStr("doLogIn")}
                            disabled={isLoginButtonDisabled}
                            id="LoginPassword_TextField_2"
                            sx={styles.LoginPassword_TextField_2}
                        />
                    </Box>
                </Box>
            </Box>
        </Template>
    );
}
function PasswordWrapper(props: {
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
        <Box id="LoginPassword_Box_6" sx={styles.LoginPassword_Box_6}>
            {children}
            <Button id="LoginPassword_Button_1" sx={styles.LoginPassword_Button_1}>
                <i id="LoginPassword_i_1" />
            </Button>
        </Box>
    );
}
