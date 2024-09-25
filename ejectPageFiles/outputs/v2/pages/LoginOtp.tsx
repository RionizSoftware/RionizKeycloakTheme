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
    ListItem
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
        <Template id="LoginOtp_Template_1">
            <Box
                className={kcClsx("kcFormClass")}
                action={url.loginAction}
                method="post"
                component="form"
                id="LoginOtp_Box_1"
                sx={styles.LoginOtp_Box_1}
            >
                {otpLogin.userOtpCredentials.length > 1 && (
                    <Box id="LoginOtp_Box_2" sx={styles.LoginOtp_Box_2}>
                        {otpLogin.userOtpCredentials.map((otpCredential, index) => (
                            <Box id="LoginOtp_Box_3" sx={styles.LoginOtp_Box_3}>
                                <TextField
                                    id="LoginOtp_TextField_1"
                                    sx={styles.LoginOtp_TextField_1}
                                />
                                <FormLabel
                                    id="LoginOtp_FormLabel_1"
                                    sx={styles.LoginOtp_FormLabel_1}
                                >
                                    <span id="LoginOtp_span_1">
                                        <i id="LoginOtp_i_1"></i>

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
                    <FormLabel id="LoginOtp_FormLabel_2" sx={styles.LoginOtp_FormLabel_2}>
                        {msg("loginOtpOneTime")}
                    </FormLabel>

                    <Box id="LoginOtp_Box_5" sx={styles.LoginOtp_Box_5}>
                        <TextField
                            name="otp"
                            autoComplete="off"
                            type="text"
                            className={kcClsx("kcInputClass")}
                            autoFocus
                            aria-invalid={messagesPerField.existsError("totp")}
                            id="LoginOtp_TextField_2"
                            sx={styles.LoginOtp_TextField_2}
                        />
                        {messagesPerField.existsError("totp") && (
                            <span
                                id="input-error-otp-code"
                                className={kcClsx("kcInputErrorMessageClass")}
                                aria-live="polite"
                                dangerouslySetInnerHTML={{
                                    __html: messagesPerField.get("totp")
                                }}
                            />
                        )}
                    </Box>
                </Box>

                <Box id="LoginOtp_Box_6" sx={styles.LoginOtp_Box_6}>
                    <Box
                        className={kcClsx("kcFormOptionsClass")}
                        id="LoginOtp_Box_7"
                        sx={styles.LoginOtp_Box_7}
                    >
                        <Box id="LoginOtp_Box_8" sx={styles.LoginOtp_Box_8}></Box>
                    </Box>
                    <Box
                        className={kcClsx("kcFormButtonsClass")}
                        id="LoginOtp_Box_9"
                        sx={styles.LoginOtp_Box_9}
                    >
                        <TextField
                            className={kcClsx(
                                "kcButtonClass",
                                "kcButtonPrimaryClass",
                                "kcButtonBlockClass",
                                "kcButtonLargeClass"
                            )}
                            name="login"
                            type="submit"
                            value={msgStr("doLogIn")}
                            id="LoginOtp_TextField_3"
                            sx={styles.LoginOtp_TextField_3}
                        />
                    </Box>
                </Box>
            </Box>
        </Template>
    );
}
