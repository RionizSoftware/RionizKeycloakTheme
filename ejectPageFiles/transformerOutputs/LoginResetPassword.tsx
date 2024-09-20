import { getKcClsx } from "keycloakify/login/lib/kcClsx";
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
import { styles } from "./styles/LoginResetPassword.ts";
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
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayInfo
            displayMessage={!messagesPerField.existsError("username")}
            infoNode={
                realm.duplicateEmailsAllowed
                    ? msg("emailInstructionUsername")
                    : msg("emailInstruction")
            }
            headerNode={msg("emailForgotTitle")}
        >
            <Box
                action={url.loginAction}
                method="post"
                component="form"
                id="LoginResetPassword_Box_1"
                sx={styles.LoginResetPassword_Box_1}
            >
                <Box id="LoginResetPassword_Box_2" sx={styles.LoginResetPassword_Box_2}>
                    <FormLabel
                        htmlFor="username"
                        id="LoginResetPassword_FormLabel_1"
                        sx={styles.LoginResetPassword_FormLabel_1}
                    >
                        {!realm.loginWithEmailAllowed
                            ? msg("username")
                            : !realm.registrationEmailAsUsername
                              ? msg("usernameOrEmail")
                              : msg("email")}
                    </FormLabel>

                    <Box
                        id="LoginResetPassword_Box_3"
                        sx={styles.LoginResetPassword_Box_3}
                    >
                        <TextField
                            type="text"
                            name="username"
                            autoFocus
                            defaultValue={auth.attemptedUsername ?? ""}
                            aria-invalid={messagesPerField.existsError("username")}
                            id="LoginResetPassword_TextField_1"
                            sx={styles.LoginResetPassword_TextField_1}
                        />
                        {messagesPerField.existsError("username") && (
                            <span
                                id="input-error-username"
                                aria-live="polite"
                                dangerouslySetInnerHTML={{
                                    __html: messagesPerField.get("username")
                                }}
                            />
                        )}
                    </Box>
                </Box>
                <Box id="LoginResetPassword_Box_4" sx={styles.LoginResetPassword_Box_4}>
                    <Link
                        href={url.loginUrl}
                        id="LoginResetPassword_Link_1"
                        sx={styles.LoginResetPassword_Link_1}
                    >
                        {msg("backToLogin")}
                    </Link>

                    <Box
                        id="LoginResetPassword_Box_5"
                        sx={styles.LoginResetPassword_Box_5}
                    >
                        <TextField
                            type="submit"
                            value={msgStr("doSubmit")}
                            id="LoginResetPassword_TextField_2"
                            sx={styles.LoginResetPassword_TextField_2}
                        />
                    </Box>
                </Box>
            </Box>
        </Template>
    );
}
