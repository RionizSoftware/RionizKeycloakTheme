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
                                                kcClsx("kcFormSocialAccountNameClass"),
                                                p.iconClasses && "kc-social-icon-text"
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
    <Box id="Login_Box_3" sx={styles.Login_Box_3}></Box>
</Template>;
