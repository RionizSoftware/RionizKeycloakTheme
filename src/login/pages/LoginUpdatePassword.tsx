import { getKcClsx, type KcClsx } from "rionizkeycloakify/login/lib/kcClsx";
import { kcSanitize } from "rionizkeycloakify/lib/kcSanitize";
import type { PageProps } from "rionizkeycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { PasswordWrapper } from "./PasswordWrapper";
import { Box, Button, Link, TextField, FormLabel, Typography, List, ListItem, Checkbox, Radio } from "@mui/material";
import { styles } from "../styles/pages/LoginUpdatePassword.ts";
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
            id="LoginUpdatePassword_Template_1"
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={!messagesPerField.existsError("password", "password-confirm")}
            headerNode={msg("updatePasswordTitle")}
        >
            <Box action={url.loginAction} method="post" component="form" id="LoginUpdatePassword_Box_1" sx={styles.LoginUpdatePassword_Box_1}>
                <Box id="LoginUpdatePassword_Box_2" sx={styles.LoginUpdatePassword_Box_2}>
                    <FormLabel htmlFor="password-new" id="LoginUpdatePassword_FormLabel_1" sx={styles.LoginUpdatePassword_FormLabel_1}>
                        {msg("passwordNew")}
                    </FormLabel>

                    <Box id="LoginUpdatePassword_Box_3" sx={styles.LoginUpdatePassword_Box_3}>
                        <PasswordWrapper id="LoginUpdatePassword_PasswordWrapper_1" kcClsx={kcClsx} i18n={i18n} passwordInputId="password-new">
                            <TextField
                                type="password"
                                name="password-new"
                                autoFocus
                                autoComplete="new-password"
                                aria-invalid={messagesPerField.existsError("password", "password-confirm")}
                                fullWidth={true}
                                id="LoginUpdatePassword_TextField_1"
                                sx={styles.LoginUpdatePassword_TextField_1}
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
                </Box>

                <Box id="LoginUpdatePassword_Box_4" sx={styles.LoginUpdatePassword_Box_4}>
                    <FormLabel htmlFor="password-confirm" id="LoginUpdatePassword_FormLabel_2" sx={styles.LoginUpdatePassword_FormLabel_2}>
                        {msg("passwordConfirm")}
                    </FormLabel>

                    <Box id="LoginUpdatePassword_Box_5" sx={styles.LoginUpdatePassword_Box_5}>
                        <PasswordWrapper id="LoginUpdatePassword_PasswordWrapper_2" kcClsx={kcClsx} i18n={i18n} passwordInputId="password-confirm">
                            <TextField
                                type="password"
                                name="password-confirm"
                                autoFocus
                                autoComplete="new-password"
                                aria-invalid={messagesPerField.existsError("password", "password-confirm")}
                                fullWidth={true}
                                id="LoginUpdatePassword_TextField_2"
                                sx={styles.LoginUpdatePassword_TextField_2}
                            />
                        </PasswordWrapper>

                        {messagesPerField.existsError("password-confirm") && (
                            <span
                                id="input-error-password-confirm"
                                aria-live="polite"
                                dangerouslySetInnerHTML={{
                                    __html: kcSanitize(messagesPerField.get("password-confirm"))
                                }}
                            />
                        )}
                    </Box>
                </Box>
                <Box id="LoginUpdatePassword_Box_6" sx={styles.LoginUpdatePassword_Box_6}>
                    <LogoutOtherSessions id="LoginUpdatePassword_LogoutOtherSessions_1" kcClsx={kcClsx} i18n={i18n} />

                    <Button
                        type="submit"
                        value={msgStr("doSubmit")}
                        fullWidth={true}
                        id="LoginUpdatePassword_Button_1"
                        sx={styles.LoginUpdatePassword_Button_1}
                    />
                    {isAppInitiatedAction && (
                        <Button
                            type="submit"
                            name="cancel-aia"
                            value="true"
                            id="LoginUpdatePassword_Button_2"
                            sx={styles.LoginUpdatePassword_Button_2}
                        >
                            {msg("doCancel")}
                        </Button>
                    )}
                </Box>
            </Box>
        </Template>
    );
}
function LogoutOtherSessions(props: { id?: string; kcClsx: KcClsx; i18n: I18n }) {
    const { kcClsx, i18n } = props;
    const { msg } = i18n;
    return (
        <Box id="LoginUpdatePassword_Box_7" sx={styles.LoginUpdatePassword_Box_7}>
            <FormLabel id="LoginUpdatePassword_FormLabel_3" sx={styles.LoginUpdatePassword_FormLabel_3}>
                <Checkbox
                    name="logout-sessions"
                    value="on"
                    defaultChecked={true}
                    id="LoginUpdatePassword_Checkbox_1"
                    sx={styles.LoginUpdatePassword_Checkbox_1}
                />
                {msg("logoutOtherSessions")}
            </FormLabel>
        </Box>
    );
}
