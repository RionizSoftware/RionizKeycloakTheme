import { useState } from "react";
import { clsx } from "rionizkeycloakify/tools/clsx";
import { getKcClsx } from "rionizkeycloakify/login/lib/kcClsx";
import type { PageProps } from "rionizkeycloakify/login/pages/PageProps";
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
import { styles } from "../styles/pages/LoginUsername.ts";
export default function LoginUsername(
    props: PageProps<
        Extract<
            KcContext,
            {
                pageId: "login-username.ftl";
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
        registrationDisabled,
        messagesPerField
    } = kcContext;
    const { msg, msgStr } = i18n;
    const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);
    return (
        <Template id="LoginUsername_Template_1">
            <Box id="LoginUsername_Box_1" sx={styles.LoginUsername_Box_1}>
                {realm.password && (
                    <Box
                        onSubmit={() => {
                            setIsLoginButtonDisabled(true);
                            return true;
                        }}
                        action={url.loginAction}
                        method="post"
                        component="form"
                        id="LoginUsername_Box_2"
                        sx={styles.LoginUsername_Box_2}
                    >
                        {!usernameHidden && (
                            <Box id="LoginUsername_Box_3" sx={styles.LoginUsername_Box_3}>
                                <FormLabel
                                    id="LoginUsername_FormLabel_1"
                                    sx={styles.LoginUsername_FormLabel_1}
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
                                    autoComplete="off"
                                    aria-invalid={messagesPerField.existsError(
                                        "username"
                                    )}
                                    id="LoginUsername_TextField_1"
                                    sx={styles.LoginUsername_TextField_1}
                                />
                                {messagesPerField.existsError("username") && (
                                    <span
                                        id="input-error"
                                        className={kcClsx("kcInputErrorMessageClass")}
                                        aria-live="polite"
                                    >
                                        {messagesPerField.getFirstError("username")}
                                    </span>
                                )}
                            </Box>
                        )}

                        <Box id="LoginUsername_Box_4" sx={styles.LoginUsername_Box_4}>
                            {realm.rememberMe && !usernameHidden && (
                                <Box
                                    id="LoginUsername_Box_5"
                                    sx={styles.LoginUsername_Box_5}
                                >
                                    <FormLabel
                                        id="LoginUsername_FormLabel_2"
                                        sx={styles.LoginUsername_FormLabel_2}
                                    >
                                        <TextField
                                            tabIndex={3}
                                            name="rememberMe"
                                            type="checkbox"
                                            defaultChecked={!!login.rememberMe}
                                            id="LoginUsername_TextField_2"
                                            sx={styles.LoginUsername_TextField_2}
                                        />{" "}
                                        {msg("rememberMe")}
                                    </FormLabel>
                                </Box>
                            )}
                        </Box>

                        <Box
                            className={kcClsx("kcFormGroupClass")}
                            id="LoginUsername_Box_6"
                            sx={styles.LoginUsername_Box_6}
                        >
                            <TextField
                                tabIndex={4}
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
                                id="LoginUsername_TextField_3"
                                sx={styles.LoginUsername_TextField_3}
                            />
                        </Box>
                    </Box>
                )}
            </Box>
        </Template>
    );
}
