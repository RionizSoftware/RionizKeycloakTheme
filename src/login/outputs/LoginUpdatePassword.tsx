import { useEffect, useReducer } from "react";
import { assert } from "keycloakify/tools/assert";
import { getKcClsx, type KcClsx } from "keycloakify/login/lib/kcClsx";
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
                <Box>
                    <FormLabel htmlFor="password-new">{msg("passwordNew")}</FormLabel>

                    <Box>
                        <PasswordWrapper
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

                <Box>
                    <FormLabel htmlFor="password-confirm">
                        {msg("passwordConfirm")}
                    </FormLabel>

                    <Box>
                        <PasswordWrapper
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
                <Box>
                    <LogoutOtherSessions kcClsx={kcClsx} i18n={i18n} />

                    <TextField type="submit" value={msgStr("doSubmit")} />
                    {isAppInitiatedAction && (
                        <Button type="submit" name="cancel-aia" value="true">
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
            <FormLabel>
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
        <Box>
            {children}
            <Button
                type="button"
                aria-label={msgStr(isPasswordRevealed ? "hidePassword" : "showPassword")}
                aria-controls={passwordInputId}
                onClick={toggleIsPasswordRevealed}
            >
                <i aria-hidden />
            </Button>
        </Box>
    );
}
