import { useState } from "react";
import { kcSanitize } from "rionizkeycloakify/lib/kcSanitize";
import { clsx } from "rionizkeycloakify/tools/clsx";
import type { PageProps } from "rionizkeycloakify/login/pages/PageProps";
import { getKcClsx } from "rionizkeycloakify/login/lib/kcClsx";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { PasswordWrapper } from "pages/PasswordWrapper";
import {
    Box,
    Button,
    Link,
    TextField,
    FormLabel,
    Typography,
    List,
    ListItem,
    Checkbox,
    Radio
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
                                <hr id="Login_hr_1" />
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
                                                    <i
                                                        id="Login_i_1"
                                                        aria-hidden="true"
                                                    ></i>
                                                )}
                                                <span
                                                    id="Login_span_2"
                                                    dangerouslySetInnerHTML={{
                                                        __html: kcSanitize(p.displayName)
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
                                    fullWidth={true}
                                    id="Login_TextField_1"
                                    sx={styles.Login_TextField_1}
                                />
                                {messagesPerField.existsError("username", "password") && (
                                    <span
                                        id="input-error"
                                        aria-live="polite"
                                        dangerouslySetInnerHTML={{
                                            __html: kcSanitize(
                                                messagesPerField.getFirstError(
                                                    "username",
                                                    "password"
                                                )
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
                                id="Login_PasswordWrapper_1"
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
                                    fullWidth={true}
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
                                            __html: kcSanitize(
                                                messagesPerField.getFirstError(
                                                    "username",
                                                    "password"
                                                )
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
                            <input
                                type="hidden"
                                id="id-hidden-input"
                                name="credentialId"
                                value={auth.selectedCredential}
                            />
                            <Button
                                tabIndex={7}
                                disabled={isLoginButtonDisabled}
                                name="login"
                                type="submit"
                                value={msgStr("doLogIn")}
                                fullWidth={true}
                                id="Login_Button_1"
                                sx={styles.Login_Button_1}
                            />
                        </Box>
                    </Box>
                )}
            </Box>
        </Template>
    );
}
