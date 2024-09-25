import { useState } from "react";
import { clsx } from "rionizkeycloakify/tools/clsx";
import { getKcClsx } from "rionizkeycloakify/login/lib/kcClsx";
import type { PageProps } from "rionizkeycloakify/login/pages/PageProps";
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
import { styles } from "../styles/pages/LoginUsername.ts";
export default function LoginUsername(
    props: PageProps<
        Extract<
            KcContext,
            {
                pageId: "login-username.ftl";
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
        registrationDisabled,
        messagesPerField
    } = kcContext;
    const { msg, msgStr } = i18n;
    const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);
    return (
        <Template
            id="LoginUsername_Template_1"
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={!messagesPerField.existsError("username")}
            displayInfo={
                realm.password && realm.registrationAllowed && !registrationDisabled
            }
            infoNode={
                <Box id="kc-registration">
                    {msg("noAccount")}
                    <Link id="LoginUsername_a_1" tabIndex={6} href={url.registrationUrl}>
                        {msg("doRegister")}
                    </Link>
                </Box>
            }
            headerNode={msg("doLogIn")}
            socialProvidersNode={
                <>
                    {realm.password &&
                        social?.providers !== undefined &&
                        social.providers.length !== 0 && (
                            <Box id="kc-social-providers">
                                <hr id="LoginUsername_hr_1" />
                                <Typography
                                    id="LoginUsername_h2_1"
                                    variant="h2"
                                    component="h2"
                                >
                                    {msg("identity-provider-login-label")}
                                </Typography>
                                <List id="LoginUsername_ul_1">
                                    {social.providers.map((...[p, , providers]) => (
                                        <ListItem id="LoginUsername_li_1" key={p.alias}>
                                            <Link
                                                id={`social-${p.alias}`}
                                                type="button"
                                                href={p.loginUrl}
                                            >
                                                {p.iconClasses && (
                                                    <i
                                                        id="LoginUsername_i_1"
                                                        aria-hidden="true"
                                                    ></i>
                                                )}
                                                <span id="LoginUsername_span_2">
                                                    {p.displayName}
                                                </span>
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
                            <Box id="LoginUsername_div_5">
                                <FormLabel id="LoginUsername_label_1" htmlFor="username">
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
                                    autoComplete="off"
                                    aria-invalid={messagesPerField.existsError(
                                        "username"
                                    )}
                                />
                                {messagesPerField.existsError("username") && (
                                    <span id="input-error" aria-live="polite">
                                        {messagesPerField.getFirstError("username")}
                                    </span>
                                )}
                            </Box>
                        )}

                        <Box id="LoginUsername_div_6">
                            {realm.rememberMe && !usernameHidden && (
                                <Box id="LoginUsername_div_8">
                                    <FormLabel id="LoginUsername_label_2">
                                        <TextField
                                            tabIndex={3}
                                            id="rememberMe"
                                            name="rememberMe"
                                            type="checkbox"
                                            defaultChecked={!!login.rememberMe}
                                        />{" "}
                                        {msg("rememberMe")}
                                    </FormLabel>
                                </Box>
                            )}
                        </Box>

                        <Box id="kc-form-buttons">
                            <TextField
                                tabIndex={4}
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
