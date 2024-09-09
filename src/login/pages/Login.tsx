import { useState, useEffect, useReducer } from "react";
import { assert } from "keycloakify/tools/assert";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Box, Button, TextField, Typography, IconButton } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export default function Login(props: PageProps<Extract<KcContext, { pageId: "login.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template } = props;
    const { social, realm, url, usernameHidden, login, auth, registrationDisabled, messagesPerField } = kcContext;
    const { msg, msgStr } = i18n;
    const [, setIsLoginButtonDisabled] = useState(false);

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            displayMessage={!messagesPerField.existsError("username", "password")}
            headerNode={msg("loginAccountTitle")}
            displayInfo={realm.password && realm.registrationAllowed && !registrationDisabled}
            infoNode={
                <Box id="kc-registration-container">
                    <Box id="kc-registration">
                        <Typography variant="body2">
                            {msg("noAccount")}{" "}
                            <a tabIndex={8} href={url.registrationUrl}>
                                {msg("doRegister")}
                            </a>
                        </Typography>
                    </Box>
                </Box>
            }
            socialProvidersNode={
                realm.password &&
                social &&
                social.providers &&
                social.providers?.length > 0 && (
                    <Box id="kc-social-providers">
                        <hr />
                        <Typography variant="h6">{msg("identity-provider-login-label")}</Typography>
                        <ul>
                            {social.providers.map(p => (
                                <li key={p.alias}>
                                    <a id={`social-${p.alias}`} href={p.loginUrl}>
                                        {p.iconClasses && <i aria-hidden="true"></i>}
                                        <span dangerouslySetInnerHTML={{ __html: p.displayName }}></span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </Box>
                )
            }
        >
            <Box id="kc-form">
                <Box id="kc-form-wrapper">
                    {realm.password && (
                        <form
                            id="kc-form-login"
                            onSubmit={() => {
                                setIsLoginButtonDisabled(true);
                                return true;
                            }}
                            action={url.loginAction}
                            method="post"
                        >
                            {!usernameHidden && (
                                <Box>
                                    <TextField
                                        id="username"
                                        name="username"
                                        label={
                                            !realm.loginWithEmailAllowed
                                                ? msg("username")
                                                : !realm.registrationEmailAsUsername
                                                  ? msg("usernameOrEmail")
                                                  : msg("email")
                                        }
                                        defaultValue={login.username ?? ""}
                                        type="text"
                                        autoFocus
                                        autoComplete="username"
                                        error={messagesPerField.existsError("username", "password")}
                                        fullWidth
                                        margin="normal"
                                    />
                                    {messagesPerField.existsError("username", "password") && (
                                        <Typography
                                            color="error"
                                            id="input-error"
                                            aria-live="polite"
                                            dangerouslySetInnerHTML={{
                                                __html: messagesPerField.getFirstError("username", "password")
                                            }}
                                        />
                                    )}
                                </Box>
                            )}

                            <Box>
                                <PasswordWrapper i18n={i18n} passwordInputId="password">
                                    <TextField
                                        id="password"
                                        name="password"
                                        label={msg("password")}
                                        type="password"
                                        autoComplete="current-password"
                                        error={messagesPerField.existsError("username", "password")}
                                        fullWidth
                                        margin="normal"
                                    />
                                </PasswordWrapper>
                                {usernameHidden && messagesPerField.existsError("username", "password") && (
                                    <Typography
                                        color="error"
                                        id="input-error"
                                        aria-live="polite"
                                        dangerouslySetInnerHTML={{
                                            __html: messagesPerField.getFirstError("username", "password")
                                        }}
                                    />
                                )}
                            </Box>

                            <Box id="kc-form-options" sx={{ display: "flex", justifyContent: "space-between", margin: "5px 0px 25px 0px" }}>
                                {realm.rememberMe && !usernameHidden && (
                                    <Box>
                                        <label>
                                            <input
                                                tabIndex={5}
                                                id="rememberMe"
                                                name="rememberMe"
                                                type="checkbox"
                                                defaultChecked={!!login.rememberMe}
                                            />{" "}
                                            {msg("rememberMe")}
                                        </label>
                                    </Box>
                                )}
                                {realm.resetPasswordAllowed && (
                                    <Typography>
                                        <a tabIndex={6} href={url.loginResetCredentialsUrl}>
                                            {msg("doForgotPassword")}
                                        </a>
                                    </Typography>
                                )}
                            </Box>

                            <Box id="kc-form-buttons">
                                <input type="hidden" name="credentialId" value={auth.selectedCredential} />
                                <Button
                                    sx={{ width: "100%", fontSize: 18 }}
                                    tabIndex={7}
                                    name="login"
                                    id="kc-login"
                                    type="submit"
                                    variant="contained"
                                >
                                    {msgStr("doLogIn")}
                                </Button>
                            </Box>
                        </form>
                    )}
                </Box>
            </Box>
        </Template>
    );
}

function PasswordWrapper({ i18n, passwordInputId, children }: { i18n: I18n; passwordInputId: string; children: JSX.Element }) {
    const { msgStr } = i18n;
    const [isPasswordRevealed, toggleIsPasswordRevealed] = useReducer(isPasswordRevealed => !isPasswordRevealed, false);

    useEffect(() => {
        const passwordInputElement = document.getElementById(passwordInputId);
        assert(passwordInputElement instanceof HTMLInputElement);
        passwordInputElement.type = isPasswordRevealed ? "text" : "password";
    }, [isPasswordRevealed]);

    return (
        <Box display="flex" alignItems="center" position="relative">
            {/* Wrap children in a Box to control padding and positioning */}
            {children}
            <IconButton
                onClick={toggleIsPasswordRevealed}
                aria-label={msgStr(isPasswordRevealed ? "hidePassword" : "showPassword")}
                aria-controls={passwordInputId}
                sx={{
                    position: "absolute",
                    right: 1, // Adjust as needed
                    zIndex: 1 // Ensure it's above the input
                }}
            >
                {isPasswordRevealed ? <VisibilityOff sx={{ fontSize: 25 }} /> : <Visibility sx={{ fontSize: 25 }} />}
            </IconButton>
        </Box>
    );
}
