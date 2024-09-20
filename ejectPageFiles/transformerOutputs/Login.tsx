import { useState, useEffect, useReducer } from "react";
import { assert } from "keycloakify/tools/assert";
import { clsx } from "keycloakify/tools/clsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { getKcClsx, type KcClsx } from "keycloakify/login/lib/kcClsx";
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
import { styles } from "./styles/Login.ts";
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
                <Box id="Login_Box_1" sx={styles.Login_Box_1}>
                    {msg("noAccount")}{" "}
                    <Link
                        tabIndex={8}
                        href={url.registrationUrl}
                        id="Login_Link_1"
                        sx={styles.Login_Link_1}
                    >
                        {msg("doRegister")}
                    </Link>
                </Box>
            }
            socialProvidersNode={
                <>
                    {realm.password &&
                        social?.providers !== undefined &&
                        social.providers.length !== 0 && (
                            <Box id="Login_Box_2" sx={styles.Login_Box_2}>
                                <hr />
                                <Typography
                                    variant="h2"
                                    component="h2"
                                    id="Login_Typography_1"
                                    sx={styles.Login_Typography_1}
                                >
                                    {msg("identity-provider-login-label")}
                                </Typography>
                                <List id="Login_List_1" sx={styles.Login_List_1}>
                                    {social.providers.map((...[p, , providers]) => (
                                        <ListItem
                                            key={p.alias}
                                            id="Login_ListItem_1"
                                            sx={styles.Login_ListItem_1}
                                        >
                                            <Link
                                                type="button"
                                                href={p.loginUrl}
                                                id="Login_Link_2"
                                                sx={styles.Login_Link_2}
                                            >
                                                {p.iconClasses && (
                                                    <i aria-hidden="true"></i>
                                                )}
                                                <span
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
            <Box id="Login_Box_3" sx={styles.Login_Box_3}>
                {realm.password && (
                    <Box
                        onSubmit={() => {
                            setIsLoginButtonDisabled(true);
                            return true;
                        }}
                        action={url.loginAction}
                        method="post"
                        component="form"
                        id="Login_Box_4"
                        sx={styles.Login_Box_4}
                    >
                        {!usernameHidden && (
                            <Box id="Login_Box_5" sx={styles.Login_Box_5}>
                                <FormLabel
                                    htmlFor="username"
                                    id="Login_FormLabel_1"
                                    sx={styles.Login_FormLabel_1}
                                >
                                    {!realm.loginWithEmailAllowed
                                        ? msg("username")
                                        : !realm.registrationEmailAsUsername
                                          ? msg("usernameOrEmail")
                                          : msg("email")}
                                </FormLabel>
                                <TextField
                                    tabIndex={2}
                                    name="username"
                                    defaultValue={login.username ?? ""}
                                    type="text"
                                    autoFocus
                                    autoComplete="username"
                                    aria-invalid={messagesPerField.existsError(
                                        "username",
                                        "password"
                                    )}
                                    id="Login_TextField_1"
                                    sx={styles.Login_TextField_1}
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

                        <Box id="Login_Box_6" sx={styles.Login_Box_6}>
                            <FormLabel
                                htmlFor="password"
                                id="Login_FormLabel_2"
                                sx={styles.Login_FormLabel_2}
                            >
                                {msg("password")}
                            </FormLabel>
                            <PasswordWrapper
                                kcClsx={kcClsx}
                                i18n={i18n}
                                passwordInputId="password"
                            >
                                <TextField
                                    tabIndex={3}
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    aria-invalid={messagesPerField.existsError(
                                        "username",
                                        "password"
                                    )}
                                    id="Login_TextField_2"
                                    sx={styles.Login_TextField_2}
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

                        <Box id="Login_Box_7" sx={styles.Login_Box_7}>
                            {realm.rememberMe && !usernameHidden && (
                                <Box id="Login_Box_8" sx={styles.Login_Box_8}>
                                    <FormLabel
                                        id="Login_FormLabel_3"
                                        sx={styles.Login_FormLabel_3}
                                    >
                                        <TextField
                                            tabIndex={5}
                                            name="rememberMe"
                                            type="checkbox"
                                            defaultChecked={!!login.rememberMe}
                                            id="Login_TextField_3"
                                            sx={styles.Login_TextField_3}
                                        />{" "}
                                        {msg("rememberMe")}
                                    </FormLabel>
                                </Box>
                            )}

                            {realm.resetPasswordAllowed && (
                                <span>
                                    <Link
                                        tabIndex={6}
                                        href={url.loginResetCredentialsUrl}
                                        id="Login_Link_3"
                                        sx={styles.Login_Link_3}
                                    >
                                        {msg("doForgotPassword")}
                                    </Link>
                                </span>
                            )}
                        </Box>

                        <Box id="Login_Box_9" sx={styles.Login_Box_9}>
                            <TextField
                                type="hidden"
                                name="credentialId"
                                value={auth.selectedCredential}
                                id="Login_TextField_4"
                                sx={styles.Login_TextField_4}
                            />
                            <TextField
                                tabIndex={7}
                                disabled={isLoginButtonDisabled}
                                name="login"
                                type="submit"
                                value={msgStr("doLogIn")}
                                id="Login_TextField_5"
                                sx={styles.Login_TextField_5}
                            />
                        </Box>
                    </Box>
                )}
            </Box>
        </Template>
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
        <Box id="Login_Box_10" sx={styles.Login_Box_10}>
            {children}
            <Button
                type="button"
                aria-label={msgStr(isPasswordRevealed ? "hidePassword" : "showPassword")}
                aria-controls={passwordInputId}
                onClick={toggleIsPasswordRevealed}
                id="Login_Button_1"
                sx={styles.Login_Button_1}
            >
                <i aria-hidden />
            </Button>
        </Box>
    );
}
