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
                            <Box
                                className={kcClsx("kcFormSocialAccountSectionClass")}
                                id="Login_Box_2"
                                sx={styles.Login_Box_2}
                            >
                                <hr id="Login_hr_1" />
                                <Typography
                                    variant="h2"
                                    component="h2"
                                    id="Login_Typography_1"
                                    sx={styles.Login_Typography_1}
                                >
                                    {msg("identity-provider-login-label")}
                                </Typography>
                                <List
                                    className={kcClsx(
                                        "kcFormSocialAccountListClass",
                                        social.providers.length > 3 &&
                                            "kcFormSocialAccountListGridClass"
                                    )}
                                    id="Login_List_1"
                                    sx={styles.Login_List_1}
                                >
                                    {social.providers.map((...[p, , providers]) => (
                                        <ListItem
                                            key={p.alias}
                                            id="Login_ListItem_1"
                                            sx={styles.Login_ListItem_1}
                                        >
                                            <Link
                                                className={kcClsx(
                                                    "kcFormSocialAccountListButtonClass",
                                                    providers.length > 3 &&
                                                        "kcFormSocialAccountGridItem"
                                                )}
                                                type="button"
                                                href={p.loginUrl}
                                                id="Login_Link_2"
                                                sx={styles.Login_Link_2}
                                            >
                                                {p.iconClasses && (
                                                    <i
                                                        id="Login_i_1"
                                                        className={clsx(
                                                            kcClsx("kcCommonLogoIdP"),
                                                            p.iconClasses
                                                        )}
                                                        aria-hidden="true"
                                                    ></i>
                                                )}
                                                <span
                                                    id="Login_span_2"
                                                    className={clsx(
                                                        kcClsx(
                                                            "kcFormSocialAccountNameClass"
                                                        ),
                                                        p.iconClasses &&
                                                            "kc-social-icon-text"
                                                    )}
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
                            <Box
                                className={kcClsx("kcFormGroupClass")}
                                id="Login_Box_5"
                                sx={styles.Login_Box_5}
                            >
                                <FormLabel
                                    htmlFor="username"
                                    className={kcClsx("kcLabelClass")}
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
                                    className={kcClsx("kcInputClass")}
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
                                        className={kcClsx("kcInputErrorMessageClass")}
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

                        <Box
                            className={kcClsx("kcFormGroupClass")}
                            id="Login_Box_6"
                            sx={styles.Login_Box_6}
                        >
                            <FormLabel
                                htmlFor="password"
                                className={kcClsx("kcLabelClass")}
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
                                    className={kcClsx("kcInputClass")}
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
                                        className={kcClsx("kcInputErrorMessageClass")}
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

                        <Box
                            className={kcClsx("kcFormGroupClass", "kcFormSettingClass")}
                            id="Login_Box_7"
                            sx={styles.Login_Box_7}
                        >
                            <Box id="Login_Box_8" sx={styles.Login_Box_8}>
                                {realm.rememberMe && !usernameHidden && (
                                    <Box id="Login_Box_9" sx={styles.Login_Box_9}>
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
                            </Box>
                            <Box
                                className={kcClsx("kcFormOptionsWrapperClass")}
                                id="Login_Box_10"
                                sx={styles.Login_Box_10}
                            >
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
                        </Box>

                        <Box
                            className={kcClsx("kcFormGroupClass")}
                            id="Login_Box_11"
                            sx={styles.Login_Box_11}
                        >
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
                                className={kcClsx(
                                    "kcButtonClass",
                                    "kcButtonPrimaryClass",
                                    "kcButtonBlockClass",
                                    "kcButtonLargeClass"
                                )}
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
