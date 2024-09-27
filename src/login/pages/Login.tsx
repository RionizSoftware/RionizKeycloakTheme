import { useState } from "react";
import { kcSanitize } from "rionizkeycloakify/lib/kcSanitize";
import { clsx } from "rionizkeycloakify/tools/clsx";
import type { PageProps } from "rionizkeycloakify/login/pages/PageProps";
import { getKcClsx } from "rionizkeycloakify/login/lib/kcClsx";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { PasswordWrapper } from "./PasswordWrapper";
import { Box, Button, Link, TextField, FormLabel, Typography, List, ListItem, Checkbox, Radio } from "@mui/material";
import { styles } from "../styles/pages/Login.ts";
import { FacebookLoginButton, GoogleLoginButton, InstagramLoginButton, LinkedInLoginButton, TwitterLoginButton } from "react-social-login-buttons";
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
    const { social, realm, url, usernameHidden, login, auth, registrationDisabled, messagesPerField } = kcContext;
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
            displayInfo={realm.password && realm.registrationAllowed && !registrationDisabled}
            infoNode={
                <Box id="Login_Box_1" sx={styles.Login_Box_1}>
                    {msg("noAccount")}{" "}
                    <Link tabIndex={8} href={url.registrationUrl} id="Login_Link_1" sx={styles.Login_Link_1}>
                        {msg("doRegister")}
                    </Link>
                </Box>
            }
            socialProvidersNode={
                <>
                    {realm.password && social?.providers !== undefined && social.providers.length !== 0 && (
                        <Box id="Login_Box_2" sx={styles.Login_Box_2}>
                            <hr id="Login_hr_1" />
                            <Typography variant="h2" component="h2" id="Login_Typography_1" sx={styles.Login_Typography_1}>
                                {msg("identity-provider-login-label")}
                            </Typography>
                            <List id="Login_List_1" sx={styles.Login_List_1}>
                                {social.providers.map((...[p, , providers]) => {
                                    const id = "Login_ListItem_" + p.providerId;
                                    switch (p.providerId) {
                                        case "google":
                                            return (
                                                <ListItem key={p.alias} id={id} sx={styles.Login_ListItem_1}>
                                                    <GoogleLoginButton
                                                        onClick={() => {
                                                            window.location.href = p.loginUrl;
                                                        }}
                                                    >
                                                        <Typography sx={styles.Login_Add_Identity_Typography}>{kcSanitize(p.displayName)}</Typography>
                                                    </GoogleLoginButton>
                                                </ListItem>
                                            );
                                        case "instagram":
                                            return (
                                                <ListItem key={p.alias} id={id} sx={styles.Login_ListItem_1}>
                                                    <InstagramLoginButton
                                                        onClick={() => {
                                                            window.location.href = p.loginUrl;
                                                        }}
                                                    >
                                                        <Typography sx={styles.Login_Add_Identity_Typography}>{kcSanitize(p.displayName)}</Typography>
                                                    </InstagramLoginButton>
                                                </ListItem>
                                            );
                                        case "twitter":
                                            return (
                                                <ListItem key={p.alias} id={id} sx={styles.Login_ListItem_1}>
                                                    <TwitterLoginButton
                                                        onClick={() => {
                                                            window.location.href = p.loginUrl;
                                                        }}
                                                    >
                                                        <Typography sx={styles.Login_Add_Identity_Typography}>{kcSanitize(p.displayName)}</Typography>
                                                    </TwitterLoginButton>
                                                </ListItem>
                                            );
                                        case "facebook":
                                            return (
                                                <ListItem key={p.alias} id={id} sx={styles.Login_ListItem_1}>
                                                    <FacebookLoginButton
                                                        onClick={() => {
                                                            window.location.href = p.loginUrl;
                                                        }}
                                                    >
                                                        <Typography sx={styles.Login_Add_Identity_Typography}>{kcSanitize(p.displayName)}</Typography>
                                                    </FacebookLoginButton>
                                                </ListItem>
                                            );
                                        case "linkedin":
                                            return (
                                                <ListItem key={p.alias} id={id} sx={styles.Login_ListItem_1}>
                                                    <LinkedInLoginButton
                                                        onClick={() => {
                                                            window.location.href = p.loginUrl;
                                                        }}
                                                    >
                                                        <Typography sx={styles.Login_Add_Identity_Typography}>{kcSanitize(p.displayName)}</Typography>
                                                    </LinkedInLoginButton>
                                                </ListItem>
                                            );
                                        default:
                                            return (
                                                <ListItem key={p.alias} id={id} sx={styles.Login_ListItem_1}>
                                                    <Typography sx={styles.Login_Add_Identity_Typography}>{kcSanitize(p.displayName)}</Typography>
                                                </ListItem>
                                            );
                                    }
                                })}
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
                                <TextField
                                    tabIndex={2}
                                    name="username"
                                    defaultValue={login.username ?? ""}
                                    type="text"
                                    autoFocus
                                    autoComplete="username"
                                    aria-invalid={messagesPerField.existsError("username", "password")}
                                    fullWidth={true}
                                    id="Login_TextField_1"
                                    sx={styles.Login_TextField_1}
                                    //added
                                    label={
                                        !realm.loginWithEmailAllowed
                                            ? msg("username")
                                            : !realm.registrationEmailAsUsername
                                              ? msg("usernameOrEmail")
                                              : msg("email")
                                    }
                                />
                                {messagesPerField.existsError("username", "password") && (
                                    <span
                                        id="input-error"
                                        aria-live="polite"
                                        dangerouslySetInnerHTML={{
                                            __html: kcSanitize(messagesPerField.getFirstError("username", "password"))
                                        }}
                                    />
                                )}
                            </Box>
                        )}

                        <Box id="Login_Box_6" sx={styles.Login_Box_6}>
                            <PasswordWrapper id="Login_PasswordWrapper_1" kcClsx={kcClsx} i18n={i18n} passwordInputId="Login_TextField_2">
                                <TextField
                                    tabIndex={3}
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    aria-invalid={messagesPerField.existsError("username", "password")}
                                    fullWidth={true}
                                    label={msg("password")}
                                    id="Login_TextField_2"
                                    sx={styles.Login_TextField_2}
                                />
                            </PasswordWrapper>
                            {usernameHidden && messagesPerField.existsError("username", "password") && (
                                <span
                                    id="input-error"
                                    aria-live="polite"
                                    dangerouslySetInnerHTML={{
                                        __html: kcSanitize(messagesPerField.getFirstError("username", "password"))
                                    }}
                                />
                            )}
                        </Box>

                        <Box id="Login_Box_7" sx={styles.Login_Box_7}>
                            {realm.rememberMe && !usernameHidden && (
                                <Box id="Login_Box_8" sx={styles.Login_Box_8}>
                                    <FormLabel id="Login_FormLabel_3" sx={styles.Login_FormLabel_3}>
                                        <Checkbox
                                            tabIndex={5}
                                            name="rememberMe"
                                            defaultChecked={!!login.rememberMe}
                                            id="Login_Checkbox_1"
                                            sx={styles.Login_Checkbox_1}
                                        />{" "}
                                        {msg("rememberMe")}
                                    </FormLabel>
                                </Box>
                            )}

                            {realm.resetPasswordAllowed && (
                                <span id="Login_span_5">
                                    <Link tabIndex={6} href={url.loginResetCredentialsUrl} id="Login_Link_3" sx={styles.Login_Link_3}>
                                        {msg("doForgotPassword")}
                                    </Link>
                                </span>
                            )}
                        </Box>

                        <Box id="Login_Box_9" sx={styles.Login_Box_9}>
                            <input type="hidden" id="id-hidden-input" name="credentialId" value={auth.selectedCredential} />
                            <Button
                                tabIndex={7}
                                disabled={isLoginButtonDisabled}
                                name="login"
                                type="submit"
                                fullWidth={true}
                                id="Login_Button_1"
                                sx={styles.Login_Button_1}
                            >
                                {msgStr("doLogIn")}
                            </Button>
                        </Box>
                    </Box>
                )}
            </Box>
        </Template>
    );
}
