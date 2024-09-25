import { useState } from "react";
import { clsx } from "rionizkeycloakify/tools/clsx";
import { getKcClsx } from "rionizkeycloakify/login/lib/kcClsx";
import type { PageProps } from "rionizkeycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { PasswordWrapper } from "./PasswordWrapper";
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
import { styles } from "../styles/pages/LoginPassword.ts";
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
        <Template
            id="LoginPassword_Template_1"
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            headerNode={msg("doLogIn")}
            displayMessage={!messagesPerField.existsError("password")}
        >
            <Box id="kc-form">
                <Box
                    id="kc-form-login"
                    onSubmit={() => {
                        setIsLoginButtonDisabled(true);
                        return true;
                    }}
                    action={url.loginAction}
                    method="post"
                    component="form"
                >
                    <Box id="LoginPassword_div_3">
                        <hr id="LoginPassword_hr_1" />
                        <FormLabel id="LoginPassword_label_1" htmlFor="password">
                            {msg("password")}
                        </FormLabel>

                        <PasswordWrapper
                            id="LoginPassword_PasswordWrapper_1"
                            kcClsx={kcClsx}
                            i18n={i18n}
                            passwordInputId="password"
                        >
                            <TextField
                                tabIndex={2}
                                id="password"
                                name="password"
                                type="password"
                                autoFocus
                                autoComplete="on"
                                aria-invalid={messagesPerField.existsError(
                                    "username",
                                    "password"
                                )}
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
                    <Box id="LoginPassword_div_4">
                        {realm.resetPasswordAllowed && (
                            <span id="LoginPassword_span_2">
                                <Link
                                    id="LoginPassword_a_1"
                                    tabIndex={5}
                                    href={url.loginResetCredentialsUrl}
                                >
                                    {msg("doForgotPassword")}
                                </Link>
                            </span>
                        )}
                    </Box>
                    <Box id="kc-form-buttons">
                        <TextField
                            tabIndex={4}
                            name="login"
                            id="kc-login"
                            type="submit"
                            value={msgStr("doLogIn")}
                            disabled={isLoginButtonDisabled}
                        />
                    </Box>
                </Box>
            </Box>
        </Template>
    );
}
