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
        <Template
            id="LoginUpdatePassword_Template_1"
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={!messagesPerField.existsError("password", "password-confirm")}
            headerNode={msg("updatePasswordTitle")}
        >
            <Box
                id="kc-passwd-update-form"
                action={url.loginAction}
                method="post"
                component="form"
            >
                <Box id="LoginUpdatePassword_div_1">
                    <FormLabel id="LoginUpdatePassword_label_1" htmlFor="password-new">
                        {msg("passwordNew")}
                    </FormLabel>

                    <Box id="LoginUpdatePassword_div_3">
                        <PasswordWrapper
                            id="LoginUpdatePassword_PasswordWrapper_1"
                            kcClsx={kcClsx}
                            i18n={i18n}
                            passwordInputId="password-new"
                        >
                            <TextField
                                type="password"
                                id="password-new"
                                name="password-new"
                                autoFocus
                                autoComplete="new-password"
                                aria-invalid={messagesPerField.existsError(
                                    "password",
                                    "password-confirm"
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
                </Box>

                <Box id="LoginUpdatePassword_div_4">
                    <FormLabel
                        id="LoginUpdatePassword_label_2"
                        htmlFor="password-confirm"
                    >
                        {msg("passwordConfirm")}
                    </FormLabel>

                    <Box id="LoginUpdatePassword_div_6">
                        <PasswordWrapper
                            id="LoginUpdatePassword_PasswordWrapper_2"
                            kcClsx={kcClsx}
                            i18n={i18n}
                            passwordInputId="password-confirm"
                        >
                            <TextField
                                type="password"
                                id="password-confirm"
                                name="password-confirm"
                                autoFocus
                                autoComplete="new-password"
                                aria-invalid={messagesPerField.existsError(
                                    "password",
                                    "password-confirm"
                                )}
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
                <Box id="LoginUpdatePassword_div_7">
                    <LogoutOtherSessions
                        id="LoginUpdatePassword_LogoutOtherSessions_1"
                        kcClsx={kcClsx}
                        i18n={i18n}
                    />

                    <TextField
                        id="LoginUpdatePassword_input_3"
                        type="submit"
                        value={msgStr("doSubmit")}
                    />
                    {isAppInitiatedAction && (
                        <Button
                            id="LoginUpdatePassword_button_1"
                            type="submit"
                            name="cancel-aia"
                            value="true"
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
        <Box id="kc-form-options">
            <FormLabel id="LoginUpdatePassword_label_3">
                <TextField
                    type="checkbox"
                    id="logout-sessions"
                    name="logout-sessions"
                    value="on"
                    defaultChecked={true}
                />
                {msg("logoutOtherSessions")}
            </FormLabel>
        </Box>
    );
}
