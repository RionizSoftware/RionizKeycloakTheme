import { useState } from "react";
import { clsx } from "rionizkeycloakify/tools/clsx";
import type { PageProps } from "rionizkeycloakify/login/pages/PageProps";
import { getKcClsx } from "rionizkeycloakify/login/lib/kcClsx";
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
import { styles } from "../styles/pages/Login.ts";
export default function Login(
    props: PageProps<
        Extract<
            KcContext,
            {
                pageId: "login.ftl";
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
    const {
        social,
        realm,
        url,
        usernameHidden,
        login,
        auth,
        registrationDisabled,
        messagesPerField
    } = kcContext;
    const { msg, msgStr } = i18n;
    const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);
    return (
        <Template
            id="Login_Template_1"
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={!messagesPerField.existsError("username", "password")}
            headerNode={msg("loginAccountTitle")}
            displayInfo={
                realm.password && realm.registrationAllowed && !registrationDisabled
            }
            infoNode={
                <Box id="kc-registration-container">
                    {msg("noAccount")}{" "}
                    <Link id="Login_a_1" tabIndex={8} href={url.registrationUrl}>
                        {msg("doRegister")}
                    </Link>
                </Box>
            }
            socialProvidersNode={
                <>
                    {realm.password &&
                        social?.providers !== undefined &&
                        social.providers.length !== 0 && (
                            <Box id="kc-social-providers">
                                <hr id="Login_hr_1" />
                                <Typography id="Login_h2_1" variant="h2" component="h2">
                                    {msg("identity-provider-login-label")}
                                </Typography>
                                <List id="Login_ul_1">
                                    {social.providers.map((...[p, , providers]) => (
                                        <ListItem id="Login_li_1" key={p.alias}>
                                            <Link
                                                id={`social-${p.alias}`}
                                                type="button"
                                                href={p.loginUrl}
                                            >
                                                {p.iconClasses && (
                                                    <i
                                                        id="Login_i_1"
                                                        aria-hidden="true"
                                                    ></i>
                                                )}
                                                <span
                                                    id="Login_span_2"
                                                    dangerouslySetInnerHTML={{
                                                        __html: p.displayName
                                                    }}
                                                ></span>
                                            </Link>
                                        </ListItem>
                                    ))}
                                </List>
                            </Box>
                        )}
                </>
            }
        >
            <Box id="kc-form">
                {realm.password && (
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
                        {!usernameHidden && (
                            <Box id="Login_div_6">
                                <FormLabel id="Login_label_1" htmlFor="username">
                                    {!realm.loginWithEmailAllowed
                                        ? msg("username")
                                        : !realm.registrationEmailAsUsername
                                          ? msg("usernameOrEmail")
                                          : msg("email")}
                                </FormLabel>
                                <TextField
                                    tabIndex={2}
                                    id="username"
                                    name="username"
                                    defaultValue={login.username ?? ""}
                                    type="text"
                                    autoFocus
                                    autoComplete="username"
                                    aria-invalid={messagesPerField.existsError(
                                        "username",
                                        "password"
                                    )}
                                />
                                {messagesPerField.existsError("username", "password") && (
                                    <span
                                        id="input-error"
                                        aria-live="polite"
                                        dangerouslySetInnerHTML={{
                                            __html: messagesPerField.getFirstError(
                                                "username",
                                                "password"
                                            )
                                        }}
                                    />
                                )}
                            </Box>
                        )}

                        <Box id="Login_div_7">
                            <FormLabel id="Login_label_2" htmlFor="password">
                                {msg("password")}
                            </FormLabel>
                            <PasswordWrapper
                                id="Login_PasswordWrapper_1"
                                kcClsx={kcClsx}
                                i18n={i18n}
                                passwordInputId="password"
                            >
                                <TextField
                                    tabIndex={3}
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    aria-invalid={messagesPerField.existsError(
                                        "username",
                                        "password"
                                    )}
                                />
                            </PasswordWrapper>
                            {usernameHidden &&
                                messagesPerField.existsError("username", "password") && (
                                    <span
                                        id="input-error"
                                        aria-live="polite"
                                        dangerouslySetInnerHTML={{
                                            __html: messagesPerField.getFirstError(
                                                "username",
                                                "password"
                                            )
                                        }}
                                    />
                                )}
                        </Box>

                        <Box id="Login_div_8">
                            {realm.rememberMe && !usernameHidden && (
                                <Box id="Login_div_10">
                                    <FormLabel id="Login_label_3">
                                        <TextField
                                            tabIndex={5}
                                            id="rememberMe"
                                            name="rememberMe"
                                            type="checkbox"
                                            defaultChecked={!!login.rememberMe}
                                        />{" "}
                                        {msg("rememberMe")}
                                    </FormLabel>
                                </Box>
                            )}

                            {realm.resetPasswordAllowed && (
                                <span id="Login_span_5">
                                    <Link
                                        id="Login_a_3"
                                        tabIndex={6}
                                        href={url.loginResetCredentialsUrl}
                                    >
                                        {msg("doForgotPassword")}
                                    </Link>
                                </span>
                            )}
                        </Box>

                        <Box id="kc-form-buttons">
                            <TextField
                                type="hidden"
                                id="id-hidden-input"
                                name="credentialId"
                                value={auth.selectedCredential}
                            />
                            <TextField
                                tabIndex={7}
                                disabled={isLoginButtonDisabled}
                                name="login"
                                id="kc-login"
                                type="submit"
                                value={msgStr("doLogIn")}
                            />
                        </Box>
                    </Box>
                )}
            </Box>
        </Template>
    );
}
