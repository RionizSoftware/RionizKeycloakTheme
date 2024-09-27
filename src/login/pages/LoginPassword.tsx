import { useState } from "react";
import { clsx } from "rionizkeycloakify/tools/clsx";
import { getKcClsx } from "rionizkeycloakify/login/lib/kcClsx";
import type { PageProps } from "rionizkeycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { PasswordWrapper } from "./PasswordWrapper";
import { kcSanitize } from "rionizkeycloakify/lib/kcSanitize";
import { Box, Button, Link, TextField, FormLabel, Typography, List, ListItem, Checkbox, Radio } from "@mui/material";
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
                        <FormLabel htmlFor="password" id="LoginPassword_FormLabel_1" sx={styles.LoginPassword_FormLabel_1}>
                            {msg("password")}
                        </FormLabel>

                        <PasswordWrapper id="LoginPassword_PasswordWrapper_1" kcClsx={kcClsx} i18n={i18n} passwordInputId="LoginPassword_TextField_1">
                            <TextField
                                tabIndex={2}
                                name="password"
                                type="password"
                                autoFocus
                                autoComplete="on"
                                aria-invalid={messagesPerField.existsError("username", "password")}
                                fullWidth={true}
                                id="LoginPassword_TextField_1"
                                sx={styles.LoginPassword_TextField_1}
                            />
                        </PasswordWrapper>

                        {messagesPerField.existsError("password") && (
                            <span
                                id="input-error-password"
                                aria-live="polite"
                                dangerouslySetInnerHTML={{
                                    __html: kcSanitize(messagesPerField.get("password"))
                                }}
                            />
                        )}
                    </Box>
                    <Box id="LoginPassword_Box_4" sx={styles.LoginPassword_Box_4}>
                        {realm.resetPasswordAllowed && (
                            <span id="LoginPassword_span_2">
                                <Link tabIndex={5} href={url.loginResetCredentialsUrl} id="LoginPassword_Link_1" sx={styles.LoginPassword_Link_1}>
                                    {msg("doForgotPassword")}
                                </Link>
                            </span>
                        )}
                    </Box>
                    <Box id="LoginPassword_Box_5" sx={styles.LoginPassword_Box_5}>
                        <Button
                            tabIndex={4}
                            name="login"
                            type="submit"
                            value={msgStr("doLogIn")}
                            disabled={isLoginButtonDisabled}
                            fullWidth={true}
                            id="LoginPassword_Button_1"
                            sx={styles.LoginPassword_Button_1}
                        />
                    </Box>
                </Box>
            </Box>
        </Template>
    );
}
