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
        <Template id="LoginResetPassword_Template_1">
            <Box
                className={kcClsx("kcFormClass")}
                action={url.loginAction}
                method="post"
                component="form"
                id="LoginResetPassword_Box_1"
                sx={styles.LoginResetPassword_Box_1}
            >
                <Box id="LoginResetPassword_Box_2" sx={styles.LoginResetPassword_Box_2}>
                    <FormLabel
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
                            className={kcClsx("kcInputClass")}
                            autoFocus
                            defaultValue={auth.attemptedUsername ?? ""}
                            aria-invalid={messagesPerField.existsError("username")}
                            id="LoginResetPassword_TextField_1"
                            sx={styles.LoginResetPassword_TextField_1}
                        />
                        {messagesPerField.existsError("username") && (
                            <span
                                id="input-error-username"
                                className={kcClsx("kcInputErrorMessageClass")}
                                aria-live="polite"
                                dangerouslySetInnerHTML={{
                                    __html: messagesPerField.get("username")
                                }}
                            />
                        )}
                    </Box>
                </Box>
                <Box id="LoginResetPassword_Box_4" sx={styles.LoginResetPassword_Box_4}>
                    <Box
                        className={kcClsx("kcFormOptionsClass")}
                        id="LoginResetPassword_Box_5"
                        sx={styles.LoginResetPassword_Box_5}
                    >
                        <Box
                            id="LoginResetPassword_Box_6"
                            sx={styles.LoginResetPassword_Box_6}
                        >
                            <Link
                                id="LoginResetPassword_Link_1"
                                sx={styles.LoginResetPassword_Link_1}
                            >
                                {msg("backToLogin")}
                            </Link>
                        </Box>
                    </Box>

                    <Box
                        className={kcClsx("kcFormButtonsClass")}
                        id="LoginResetPassword_Box_7"
                        sx={styles.LoginResetPassword_Box_7}
                    >
                        <TextField
                            id="LoginResetPassword_TextField_2"
                            sx={styles.LoginResetPassword_TextField_2}
                        />
                    </Box>
                </Box>
            </Box>
        </Template>
    );
}
