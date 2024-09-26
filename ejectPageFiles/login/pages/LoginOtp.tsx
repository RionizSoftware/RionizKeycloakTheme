import { Fragment } from "react";
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
    ListItem,
    Checkbox,
    Radio
} from "@mui/material";
import { styles } from "../styles/pages/LoginOtp.ts";
export default function LoginOtp(
    props: PageProps<
        Extract<
            KcContext,
            {
                pageId: "login-otp.ftl";
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
    const { otpLogin, url, messagesPerField } = kcContext;
    const { msg, msgStr } = i18n;
    return (
        <Template
            id="LoginOtp_Template_1"
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
                id="LoginOtp_Box_1"
                sx={styles.LoginOtp_Box_1}
            >
                {otpLogin.userOtpCredentials.length > 1 && (
                    <Box id="LoginOtp_Box_2" sx={styles.LoginOtp_Box_2}>
                        {otpLogin.userOtpCredentials.map((otpCredential, index) => (
                            <Box
                                key={index}
                                id="LoginOtp_Box_3"
                                sx={styles.LoginOtp_Box_3}
                            >
                                <Radio
                                    type="radio"
                                    name="selectedCredentialId"
                                    value={otpCredential.id}
                                    defaultChecked={
                                        otpCredential.id === otpLogin.selectedCredentialId
                                    }
                                    id="LoginOtp_Radio_1"
                                    sx={styles.LoginOtp_Radio_1}
                                />
                                <FormLabel
                                    htmlFor={`kc-otp-credential-${index}`}
                                    tabIndex={index}
                                    id="LoginOtp_FormLabel_1"
                                    sx={styles.LoginOtp_FormLabel_1}
                                >
                                    <span id="LoginOtp_span_1">
                                        <i id="LoginOtp_i_1" aria-hidden="true"></i>

                                        <span id="LoginOtp_span_3">
                                            {otpCredential.userLabel}
                                        </span>
                                    </span>
                                </FormLabel>
                            </Box>
                        ))}
                    </Box>
                )}

                <Box id="LoginOtp_Box_4" sx={styles.LoginOtp_Box_4}>
                    <FormLabel
                        htmlFor="otp"
                        id="LoginOtp_FormLabel_2"
                        sx={styles.LoginOtp_FormLabel_2}
                    >
                        {msg("loginOtpOneTime")}
                    </FormLabel>

                    <Box id="LoginOtp_Box_5" sx={styles.LoginOtp_Box_5}>
                        <TextField
                            name="otp"
                            autoComplete="off"
                            type="text"
                            autoFocus
                            aria-invalid={messagesPerField.existsError("totp")}
                            fullWidth={true}
                            id="LoginOtp_TextField_1"
                            sx={styles.LoginOtp_TextField_1}
                        />
                        {messagesPerField.existsError("totp") && (
                            <span
                                id="input-error-otp-code"
                                aria-live="polite"
                                dangerouslySetInnerHTML={{
                                    __html: messagesPerField.get("totp")
                                }}
                            />
                        )}
                    </Box>
                </Box>

                <Box id="LoginOtp_Box_6" sx={styles.LoginOtp_Box_6}>
                    <Button
                        name="login"
                        type="submit"
                        value={msgStr("doLogIn")}
                        fullWidth={true}
                        id="LoginOtp_Button_1"
                        sx={styles.LoginOtp_Button_1}
                    />
                </Box>
            </Box>
        </Template>
    );
}
