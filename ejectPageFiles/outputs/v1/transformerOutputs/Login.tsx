import { useState, useEffect, useReducer } from "react";
import { assert } from "keycloakify/tools/assert";
import { clsx } from "keycloakify/tools/clsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { getKcClsx, type KcClsx } from "keycloakify/login/lib/kcClsx";
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
import { styles } from "./styles/Login.ts";
export default function Login(
    props: PageProps<
        Extract<
            KcContext,
            {
                pageId: "login.ftl";
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
    const {
        social,
        realm,
        url,
        usernameHidden,
        login,
        auth,
        registrationDisabled,
        messagesPerField
    } = kcContext;
    const { msg, msgStr } = i18n;
    const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);
    return (
        <Template id="Login_Template_1">
            <Box id="Login_Box_1" sx={styles.Login_Box_1}>
                {realm.password && (
                    <Box
                        onSubmit={() => {
                            setIsLoginButtonDisabled(true);
                            return true;
                        }}
                        action={url.loginAction}
                        method="post"
                        component="form"
                        id="Login_Box_2"
                        sx={styles.Login_Box_2}
                    >
                        {!usernameHidden && (
                            <Box id="Login_Box_3" sx={styles.Login_Box_3}>
                                <FormLabel
                                    id="Login_FormLabel_1"
                                    sx={styles.Login_FormLabel_1}
                                >
                                    {!realm.loginWithEmailAllowed
                                        ? msg("username")
                                        : !realm.registrationEmailAsUsername
                                          ? msg("usernameOrEmail")
                                          : msg("email")}
                                </FormLabel>
                                <TextField
                                    tabIndex={2}
                                    className={kcClsx("kcInputClass")}
                                    name="username"
                                    defaultValue={login.username ?? ""}
                                    type="text"
                                    autoFocus
                                    autoComplete="username"
                                    aria-invalid={messagesPerField.existsError(
                                        "username",
                                        "password"
                                    )}
                                    id="Login_TextField_1"
                                    sx={styles.Login_TextField_1}
                                />
                                {messagesPerField.existsError("username", "password") && (
                                    <span
                                        id="input-error"
                                        className={kcClsx("kcInputErrorMessageClass")}
                                        aria-live="polite"
                                        dangerouslySetInnerHTML={{
                                            __html: messagesPerField.getFirstError(
                                                "username",
                                                "password"
                                            )
                                        }}
                                    />
                                )}
                            </Box>
                        )}

                        <Box id="Login_Box_4" sx={styles.Login_Box_4}>
                            <FormLabel
                                id="Login_FormLabel_2"
                                sx={styles.Login_FormLabel_2}
                            >
                                {msg("password")}
                            </FormLabel>
                            <PasswordWrapper id="Login_PasswordWrapper_1">
                                <TextField
                                    tabIndex={3}
                                    className={kcClsx("kcInputClass")}
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    aria-invalid={messagesPerField.existsError(
                                        "username",
                                        "password"
                                    )}
                                    id="Login_TextField_2"
                                    sx={styles.Login_TextField_2}
                                />
                            </PasswordWrapper>
                            {usernameHidden &&
                                messagesPerField.existsError("username", "password") && (
                                    <span
                                        id="input-error"
                                        className={kcClsx("kcInputErrorMessageClass")}
                                        aria-live="polite"
                                        dangerouslySetInnerHTML={{
                                            __html: messagesPerField.getFirstError(
                                                "username",
                                                "password"
                                            )
                                        }}
                                    />
                                )}
                        </Box>

                        <Box id="Login_Box_5" sx={styles.Login_Box_5}>
                            {realm.rememberMe && !usernameHidden && (
                                <Box id="Login_Box_6" sx={styles.Login_Box_6}>
                                    <FormLabel
                                        id="Login_FormLabel_3"
                                        sx={styles.Login_FormLabel_3}
                                    >
                                        <TextField
                                            tabIndex={5}
                                            name="rememberMe"
                                            type="checkbox"
                                            defaultChecked={!!login.rememberMe}
                                            id="Login_TextField_3"
                                            sx={styles.Login_TextField_3}
                                        />{" "}
                                        {msg("rememberMe")}
                                    </FormLabel>
                                </Box>
                            )}

                            {realm.resetPasswordAllowed && (
                                <span id="Login_span_3">
                                    <Link id="Login_Link_1" sx={styles.Login_Link_1}>
                                        {msg("doForgotPassword")}
                                    </Link>
                                </span>
                            )}
                        </Box>

                        <Box
                            className={kcClsx("kcFormGroupClass")}
                            id="Login_Box_7"
                            sx={styles.Login_Box_7}
                        >
                            <TextField
                                type="hidden"
                                name="credentialId"
                                value={auth.selectedCredential}
                                id="Login_TextField_4"
                                sx={styles.Login_TextField_4}
                            />
                            <TextField
                                tabIndex={7}
                                disabled={isLoginButtonDisabled}
                                className={kcClsx(
                                    "kcButtonClass",
                                    "kcButtonPrimaryClass",
                                    "kcButtonBlockClass",
                                    "kcButtonLargeClass"
                                )}
                                name="login"
                                type="submit"
                                value={msgStr("doLogIn")}
                                id="Login_TextField_5"
                                sx={styles.Login_TextField_5}
                            />
                        </Box>
                    </Box>
                )}
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
        <Box id="Login_Box_8" sx={styles.Login_Box_8}>
            {children}
            <Button id="Login_Button_1" sx={styles.Login_Button_1}>
                <i id="Login_i_1" />
            </Button>
        </Box>
    );
}
