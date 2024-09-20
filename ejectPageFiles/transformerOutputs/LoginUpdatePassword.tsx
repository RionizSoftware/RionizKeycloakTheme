import { useEffect, useReducer } from "react";
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
import { styles } from "./styles/LoginUpdatePassword.ts";
export default function LoginUpdatePassword(
    props: PageProps<
        Extract<
            KcContext,
            {
                pageId: "login-update-password.ftl";
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
    const { msg, msgStr } = i18n;
    const { url, messagesPerField, isAppInitiatedAction } = kcContext;
    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={!messagesPerField.existsError("password", "password-confirm")}
            headerNode={msg("updatePasswordTitle")}
        >
            <Box
                action={url.loginAction}
                method="post"
                component="form"
                id="LoginUpdatePassword_Box_1"
                sx={styles.LoginUpdatePassword_Box_1}
            >
                <Box id="LoginUpdatePassword_Box_2" sx={styles.LoginUpdatePassword_Box_2}>
                    <FormLabel
                        htmlFor="password-new"
                        id="LoginUpdatePassword_FormLabel_1"
                        sx={styles.LoginUpdatePassword_FormLabel_1}
                    >
                        {msg("passwordNew")}
                    </FormLabel>

                    <Box
                        id="LoginUpdatePassword_Box_3"
                        sx={styles.LoginUpdatePassword_Box_3}
                    >
                        <PasswordWrapper
                            kcClsx={kcClsx}
                            i18n={i18n}
                            passwordInputId="password-new"
                        >
                            <TextField
                                type="password"
                                name="password-new"
                                autoFocus
                                autoComplete="new-password"
                                aria-invalid={messagesPerField.existsError(
                                    "password",
                                    "password-confirm"
                                )}
                                id="LoginUpdatePassword_TextField_1"
                                sx={styles.LoginUpdatePassword_TextField_1}
                            />
                        </PasswordWrapper>

                        {messagesPerField.existsError("password") && (
                            <span
                                id="input-error-password"
                                aria-live="polite"
                                dangerouslySetInnerHTML={{
                                    __html: messagesPerField.get("password")
                                }}
                            />
                        )}
                    </Box>
                </Box>

                <Box id="LoginUpdatePassword_Box_4" sx={styles.LoginUpdatePassword_Box_4}>
                    <FormLabel
                        htmlFor="password-confirm"
                        id="LoginUpdatePassword_FormLabel_2"
                        sx={styles.LoginUpdatePassword_FormLabel_2}
                    >
                        {msg("passwordConfirm")}
                    </FormLabel>

                    <Box
                        id="LoginUpdatePassword_Box_5"
                        sx={styles.LoginUpdatePassword_Box_5}
                    >
                        <PasswordWrapper
                            kcClsx={kcClsx}
                            i18n={i18n}
                            passwordInputId="password-confirm"
                        >
                            <TextField
                                type="password"
                                name="password-confirm"
                                autoFocus
                                autoComplete="new-password"
                                aria-invalid={messagesPerField.existsError(
                                    "password",
                                    "password-confirm"
                                )}
                                id="LoginUpdatePassword_TextField_2"
                                sx={styles.LoginUpdatePassword_TextField_2}
                            />
                        </PasswordWrapper>

                        {messagesPerField.existsError("password-confirm") && (
                            <span
                                id="input-error-password-confirm"
                                aria-live="polite"
                                dangerouslySetInnerHTML={{
                                    __html: messagesPerField.get("password-confirm")
                                }}
                            />
                        )}
                    </Box>
                </Box>
                <Box id="LoginUpdatePassword_Box_6" sx={styles.LoginUpdatePassword_Box_6}>
                    <LogoutOtherSessions kcClsx={kcClsx} i18n={i18n} />

                    <TextField
                        type="submit"
                        value={msgStr("doSubmit")}
                        id="LoginUpdatePassword_TextField_3"
                        sx={styles.LoginUpdatePassword_TextField_3}
                    />
                    {isAppInitiatedAction && (
                        <Button
                            type="submit"
                            name="cancel-aia"
                            value="true"
                            id="LoginUpdatePassword_Button_1"
                            sx={styles.LoginUpdatePassword_Button_1}
                        >
                            {msg("doCancel")}
                        </Button>
                    )}
                </Box>
            </Box>
        </Template>
    );
}
function LogoutOtherSessions(props: { kcClsx: KcClsx; i18n: I18n }) {
    const { kcClsx, i18n } = props;
    const { msg } = i18n;
    return (
        <Box id="LoginUpdatePassword_Box_7" sx={styles.LoginUpdatePassword_Box_7}>
            <FormLabel
                id="LoginUpdatePassword_FormLabel_3"
                sx={styles.LoginUpdatePassword_FormLabel_3}
            >
                <TextField
                    type="checkbox"
                    name="logout-sessions"
                    value="on"
                    defaultChecked={true}
                    id="LoginUpdatePassword_TextField_4"
                    sx={styles.LoginUpdatePassword_TextField_4}
                />
                {msg("logoutOtherSessions")}
            </FormLabel>
        </Box>
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
        <Box id="LoginUpdatePassword_Box_8" sx={styles.LoginUpdatePassword_Box_8}>
            {children}
            <Button
                type="button"
                aria-label={msgStr(isPasswordRevealed ? "hidePassword" : "showPassword")}
                aria-controls={passwordInputId}
                onClick={toggleIsPasswordRevealed}
                id="LoginUpdatePassword_Button_2"
                sx={styles.LoginUpdatePassword_Button_2}
            >
                <i aria-hidden />
            </Button>
        </Box>
    );
}
