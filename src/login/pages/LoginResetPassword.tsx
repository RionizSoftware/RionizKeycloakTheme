import { getKcClsx } from "rionizkeycloakify/login/lib/kcClsx";
import { kcSanitize } from "rionizkeycloakify/lib/kcSanitize";
import type { PageProps } from "rionizkeycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Box, Button, Link, TextField, FormLabel, Typography, List, ListItem, Checkbox, Radio } from "@mui/material";
import { styles } from "../styles/pages/LoginResetPassword.ts";
export default function LoginResetPassword(
    props: PageProps<
        Extract<
            KcContext,
            {
                pageId: "login-reset-password.ftl";
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
    const { url, realm, auth, messagesPerField } = kcContext;
    const { msg, msgStr } = i18n;
    return (
        <Template
            id="LoginResetPassword_Template_1"
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayInfo
            displayMessage={!messagesPerField.existsError("username")}
            infoNode={realm.duplicateEmailsAllowed ? msg("emailInstructionUsername") : msg("emailInstruction")}
            headerNode={msg("emailForgotTitle")}
        >
            <Box action={url.loginAction} method="post" component="form" id="LoginResetPassword_Box_1" sx={styles.LoginResetPassword_Box_1}>
                <Box id="LoginResetPassword_Box_2" sx={styles.LoginResetPassword_Box_2}>
                    <Box id="LoginResetPassword_Box_3" sx={styles.LoginResetPassword_Box_3}>
                        <TextField
                            type="text"
                            name="username"
                            autoFocus
                            defaultValue={auth.attemptedUsername ?? ""}
                            aria-invalid={messagesPerField.existsError("username")}
                            fullWidth={true}
                            id="LoginResetPassword_TextField_1"
                            label={
                                !realm.loginWithEmailAllowed
                                    ? msg("username")
                                    : !realm.registrationEmailAsUsername
                                      ? msg("usernameOrEmail")
                                      : msg("email")
                            }
                            sx={styles.LoginResetPassword_TextField_1}
                        />
                        {messagesPerField.existsError("username") && (
                            <span
                                id="input-error-username"
                                aria-live="polite"
                                dangerouslySetInnerHTML={{
                                    __html: kcSanitize(messagesPerField.get("username"))
                                }}
                            />
                        )}
                    </Box>
                </Box>
                <Box id="LoginResetPassword_Box_4" sx={styles.LoginResetPassword_Box_4}>
                    <Link href={url.loginUrl} id="LoginResetPassword_Link_1" sx={styles.LoginResetPassword_Link_1}>
                        {msg("backToLogin")}
                    </Link>

                    <Box id="LoginResetPassword_Box_5" sx={styles.LoginResetPassword_Box_5}>
                        <Button
                            type="submit"
                            value={msgStr("doSubmit")}
                            fullWidth={true}
                            id="LoginResetPassword_Button_1"
                            sx={styles.LoginResetPassword_Button_1}
                        >
                            {msgStr("doSubmit")}
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Template>
    );
}
