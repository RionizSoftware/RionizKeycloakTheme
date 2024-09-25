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
                <Box id="LoginUsername_Box_1" sx={styles.LoginUsername_Box_1}>
                    {msg("noAccount")}
                    <Link
                        tabIndex={6}
                        href={url.registrationUrl}
                        id="LoginUsername_Link_1"
                        sx={styles.LoginUsername_Link_1}
                    >
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
                            <Box
                                className={kcClsx("kcFormSocialAccountSectionClass")}
                                id="LoginUsername_Box_2"
                                sx={styles.LoginUsername_Box_2}
                            >
                                <hr id="LoginUsername_hr_1" />
                                <Typography
                                    variant="h2"
                                    component="h2"
                                    id="LoginUsername_Typography_1"
                                    sx={styles.LoginUsername_Typography_1}
                                >
                                    {msg("identity-provider-login-label")}
                                </Typography>
                                <List
                                    className={kcClsx(
                                        "kcFormSocialAccountListClass",
                                        social.providers.length > 3 &&
                                            "kcFormSocialAccountListGridClass"
                                    )}
                                    id="LoginUsername_List_1"
                                    sx={styles.LoginUsername_List_1}
                                >
                                    {social.providers.map((...[p, , providers]) => (
                                        <ListItem
                                            key={p.alias}
                                            id="LoginUsername_ListItem_1"
                                            sx={styles.LoginUsername_ListItem_1}
                                        >
                                            <Link
                                                className={kcClsx(
                                                    "kcFormSocialAccountListButtonClass",
                                                    providers.length > 3 &&
                                                        "kcFormSocialAccountGridItem"
                                                )}
                                                type="button"
                                                href={p.loginUrl}
                                                id="LoginUsername_Link_2"
                                                sx={styles.LoginUsername_Link_2}
                                            >
                                                {p.iconClasses && (
                                                    <i
                                                        id="LoginUsername_i_1"
                                                        className={clsx(
                                                            kcClsx("kcCommonLogoIdP"),
                                                            p.iconClasses
                                                        )}
                                                        aria-hidden="true"
                                                    ></i>
                                                )}
                                                <span
                                                    id="LoginUsername_span_2"
                                                    className={clsx(
                                                        kcClsx(
                                                            "kcFormSocialAccountNameClass"
                                                        ),
                                                        p.iconClasses &&
                                                            "kc-social-icon-text"
                                                    )}
                                                >
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
            <Box id="LoginUsername_Box_3" sx={styles.LoginUsername_Box_3}>
                {realm.password && (
                    <Box
                        onSubmit={() => {
                            setIsLoginButtonDisabled(true);
                            return true;
                        }}
                        action={url.loginAction}
                        method="post"
                        component="form"
                        id="LoginUsername_Box_4"
                        sx={styles.LoginUsername_Box_4}
                    >
                        {!usernameHidden && (
                            <Box
                                className={kcClsx("kcFormGroupClass")}
                                id="LoginUsername_Box_5"
                                sx={styles.LoginUsername_Box_5}
                            >
                                <FormLabel
                                    htmlFor="username"
                                    className={kcClsx("kcLabelClass")}
                                    id="LoginUsername_FormLabel_1"
                                    sx={styles.LoginUsername_FormLabel_1}
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
                                    autoComplete="off"
                                    aria-invalid={messagesPerField.existsError(
                                        "username"
                                    )}
                                    id="LoginUsername_TextField_1"
                                    sx={styles.LoginUsername_TextField_1}
                                />
                                {messagesPerField.existsError("username") && (
                                    <span
                                        id="input-error"
                                        className={kcClsx("kcInputErrorMessageClass")}
                                        aria-live="polite"
                                    >
                                        {messagesPerField.getFirstError("username")}
                                    </span>
                                )}
                            </Box>
                        )}

                        <Box
                            className={kcClsx("kcFormGroupClass", "kcFormSettingClass")}
                            id="LoginUsername_Box_6"
                            sx={styles.LoginUsername_Box_6}
                        >
                            <Box id="LoginUsername_Box_7" sx={styles.LoginUsername_Box_7}>
                                {realm.rememberMe && !usernameHidden && (
                                    <Box
                                        id="LoginUsername_Box_8"
                                        sx={styles.LoginUsername_Box_8}
                                    >
                                        <FormLabel
                                            id="LoginUsername_FormLabel_2"
                                            sx={styles.LoginUsername_FormLabel_2}
                                        >
                                            <TextField
                                                tabIndex={3}
                                                name="rememberMe"
                                                type="checkbox"
                                                defaultChecked={!!login.rememberMe}
                                                id="LoginUsername_TextField_2"
                                                sx={styles.LoginUsername_TextField_2}
                                            />{" "}
                                            {msg("rememberMe")}
                                        </FormLabel>
                                    </Box>
                                )}
                            </Box>
                        </Box>

                        <Box
                            className={kcClsx("kcFormGroupClass")}
                            id="LoginUsername_Box_9"
                            sx={styles.LoginUsername_Box_9}
                        >
                            <TextField
                                tabIndex={4}
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
                                id="LoginUsername_TextField_3"
                                sx={styles.LoginUsername_TextField_3}
                            />
                        </Box>
                    </Box>
                )}
            </Box>
        </Template>
    );
}
