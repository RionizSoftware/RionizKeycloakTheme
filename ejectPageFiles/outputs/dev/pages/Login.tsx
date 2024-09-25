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
                                            <i id="Login_i_1" aria-hidden="true"></i>
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
    <Box id="kc-form"></Box>
</Template>;
