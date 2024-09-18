import { useState, useEffect, useReducer } from "react";
import { assert } from "keycloakify/tools/assert";
import { clsx } from "keycloakify/tools/clsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { getKcClsx, type KcClsx } from "keycloakify/login/lib/kcClsx";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Box, Button, Link, TextField, FormLabel, Typography, List, ListItem } from "@mui/material";
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
    const { social, realm, url, usernameHidden, login, auth, registrationDisabled, messagesPerField } = kcContext;
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
            displayInfo={realm.password && realm.registrationAllowed && !registrationDisabled}
            infoNode={
                <Box id="Box_1" sx={styles.Box_1}>
                    {msg("noAccount")}{" "}
                    <Link tabIndex={8} href={url.registrationUrl} id="Link_1" sx={styles.Link_1}>
                        {msg("doRegister")}
                    </Link>
                </Box>
            }
        >
            <Box id="Box_3" sx={styles.Box_3}>
                {realm.password && (
                    <Box
                        onSubmit={() => {
                            setIsLoginButtonDisabled(true);
                            return true;
                        }}
                        action={url.loginAction}
                        method="post"
                        component="form"
                        id="Box_4"
                        sx={styles.Box_4}
                    >
                        <Box id="Box_6" sx={styles.Box_6}>
                            <FormLabel htmlFor="password" id="FormLabel_2" sx={styles.FormLabel_2}>
                                {msg("password")}
                            </FormLabel>
                            <PasswordWrapper kcClsx={kcClsx} i18n={i18n} passwordInputId="password">
                                <TextField
                                    tabIndex={3}
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    aria-invalid={messagesPerField.existsError("username", "password")}
                                    id="TextField_2"
                                    sx={styles.TextField_2}
                                />
                            </PasswordWrapper>
                        </Box>

                        <Box id="Box_7" sx={styles.Box_7}>
                            {realm.rememberMe && !usernameHidden && (
                                <Box id="Box_8" sx={styles.Box_8}>
                                    <FormLabel id="FormLabel_3" sx={styles.FormLabel_3}>
                                        <TextField
                                            tabIndex={5}
                                            name="rememberMe"
                                            type="checkbox"
                                            defaultChecked={!!login.rememberMe}
                                            id="TextField_3"
                                            sx={styles.TextField_3}
                                        />{" "}
                                        {msg("rememberMe")}
                                    </FormLabel>
                                </Box>
                            )}

                            {realm.resetPasswordAllowed && (
                                <span>
                                    <Link tabIndex={6} href={url.loginResetCredentialsUrl} id="Link_3" sx={styles.Link_3}>
                                        {msg("doForgotPassword")}
                                    </Link>
                                </span>
                            )}
                        </Box>

                        <Box id="Box_9" sx={styles.Box_9}>
                            <TextField type="hidden" name="credentialId" value={auth.selectedCredential} id="TextField_4" sx={styles.TextField_4} />
                            <TextField
                                tabIndex={7}
                                disabled={isLoginButtonDisabled}
                                name="login"
                                type="submit"
                                value={msgStr("doLogIn")}
                                id="TextField_5"
                                sx={styles.TextField_5}
                            />
                        </Box>
                    </Box>
                )}
            </Box>
        </Template>
    );
}
function PasswordWrapper(props: { kcClsx: KcClsx; i18n: I18n; passwordInputId: string; children: JSX.Element }) {
    const { kcClsx, i18n, passwordInputId, children } = props;
    const { msgStr } = i18n;
    const [isPasswordRevealed, toggleIsPasswordRevealed] = useReducer((isPasswordRevealed: boolean) => !isPasswordRevealed, false);

    return <Box id="Box_10" sx={styles.Box_10}></Box>;
}
