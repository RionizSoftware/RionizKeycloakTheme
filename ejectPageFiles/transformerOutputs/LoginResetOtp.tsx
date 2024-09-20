import { Fragment } from "react";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
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
import { styles } from "./styles/LoginResetOtp.ts";
export default function LoginResetOtp(
    props: PageProps<
        Extract<
            KcContext,
            {
                pageId: "login-reset-otp.ftl";
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
    const { url, messagesPerField, configuredOtpCredentials } = kcContext;
    const { msg, msgStr } = i18n;
    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={!messagesPerField.existsError("totp")}
            headerNode={msg("doLogIn")}
        >
            <Box
                action={url.loginAction}
                method="post"
                component="form"
                id="LoginResetOtp_Box_1"
                sx={styles.LoginResetOtp_Box_1}
            >
                <Box id="LoginResetOtp_Box_2" sx={styles.LoginResetOtp_Box_2}>
                    <Typography
                        id="LoginResetOtp_Typography_1"
                        sx={styles.LoginResetOtp_Typography_1}
                    >
                        {msg("otp-reset-description")}
                    </Typography>
                    {configuredOtpCredentials.userOtpCredentials.map(
                        (otpCredential, index) => (
                            <Box
                                key={otpCredential.id}
                                id="LoginResetOtp_Box_3"
                                sx={styles.LoginResetOtp_Box_3}
                            >
                                <TextField
                                    type="radio"
                                    name="selectedCredentialId"
                                    value={otpCredential.id}
                                    defaultChecked={
                                        otpCredential.id ===
                                        configuredOtpCredentials.selectedCredentialId
                                    }
                                    id="LoginResetOtp_TextField_1"
                                    sx={styles.LoginResetOtp_TextField_1}
                                />
                                <FormLabel
                                    htmlFor={`kc-otp-credential-${index}`}
                                    tabIndex={index}
                                    id="LoginResetOtp_FormLabel_1"
                                    sx={styles.LoginResetOtp_FormLabel_1}
                                >
                                    <span>
                                        <i aria-hidden="true"></i>

                                        <span>{otpCredential.userLabel}</span>
                                    </span>
                                </FormLabel>
                            </Box>
                        )
                    )}
                    <Box id="LoginResetOtp_Box_4" sx={styles.LoginResetOtp_Box_4}>
                        <TextField
                            type="submit"
                            value={msgStr("doSubmit")}
                            id="LoginResetOtp_TextField_2"
                            sx={styles.LoginResetOtp_TextField_2}
                        />
                    </Box>
                </Box>
            </Box>
        </Template>
    );
}
