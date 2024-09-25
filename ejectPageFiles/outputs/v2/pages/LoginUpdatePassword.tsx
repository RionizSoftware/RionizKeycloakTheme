import { getKcClsx, type KcClsx } from "rionizkeycloakify/login/lib/kcClsx";
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
        <Template id="LoginUpdatePassword_Template_1">
            <Box
                className={kcClsx("kcFormClass")}
                action={url.loginAction}
                method="post"
                component="form"
                id="LoginUpdatePassword_Box_1"
                sx={styles.LoginUpdatePassword_Box_1}
            >
                <Box id="LoginUpdatePassword_Box_2" sx={styles.LoginUpdatePassword_Box_2}>
                    <FormLabel
                        id="LoginUpdatePassword_FormLabel_1"
                        sx={styles.LoginUpdatePassword_FormLabel_1}
                    >
                        {msg("passwordNew")}
                    </FormLabel>

                    <Box
                        id="LoginUpdatePassword_Box_3"
                        sx={styles.LoginUpdatePassword_Box_3}
                    >
                        <PasswordWrapper id="LoginUpdatePassword_PasswordWrapper_1">
                            <TextField
                                type="password"
                                name="password-new"
                                className={kcClsx("kcInputClass")}
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
                                className={kcClsx("kcInputErrorMessageClass")}
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
                        id="LoginUpdatePassword_FormLabel_2"
                        sx={styles.LoginUpdatePassword_FormLabel_2}
                    >
                        {msg("passwordConfirm")}
                    </FormLabel>

                    <Box
                        id="LoginUpdatePassword_Box_5"
                        sx={styles.LoginUpdatePassword_Box_5}
                    >
                        <PasswordWrapper id="LoginUpdatePassword_PasswordWrapper_2">
                            <TextField
                                type="password"
                                name="password-confirm"
                                className={kcClsx("kcInputClass")}
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
                                className={kcClsx("kcInputErrorMessageClass")}
                                aria-live="polite"
                                dangerouslySetInnerHTML={{
                                    __html: messagesPerField.get("password-confirm")
                                }}
                            />
                        )}
                    </Box>
                </Box>
                <Box id="LoginUpdatePassword_Box_6" sx={styles.LoginUpdatePassword_Box_6}>
                    <LogoutOtherSessions id="LoginUpdatePassword_LogoutOtherSessions_1" />
                    <Box
                        className={kcClsx("kcFormButtonsClass")}
                        id="LoginUpdatePassword_Box_7"
                        sx={styles.LoginUpdatePassword_Box_7}
                    >
                        <TextField
                            id="LoginUpdatePassword_TextField_3"
                            sx={styles.LoginUpdatePassword_TextField_3}
                        />
                        {isAppInitiatedAction && (
                            <Button
                                id="LoginUpdatePassword_Button_1"
                                sx={styles.LoginUpdatePassword_Button_1}
                            >
                                {msg("doCancel")}
                            </Button>
                        )}
                    </Box>
                </Box>
            </Box>
        </Template>
    );
}
function LogoutOtherSessions(props: { kcClsx: KcClsx; i18n: I18n }) {
    const { kcClsx, i18n } = props;
    const { msg } = i18n;
    return (
        <Box
            className={kcClsx("kcFormOptionsClass")}
            id="LoginUpdatePassword_Box_8"
            sx={styles.LoginUpdatePassword_Box_8}
        >
            <Box id="LoginUpdatePassword_Box_9" sx={styles.LoginUpdatePassword_Box_9}>
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
        </Box>
    );
}
