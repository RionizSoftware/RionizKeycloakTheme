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
import { styles } from "../styles/pages/LoginResetOtp.ts";
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
        <Template id="LoginResetOtp_Template_1">
            <Box
                className={kcClsx("kcFormClass")}
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
                            <Box id="LoginResetOtp_Box_3" sx={styles.LoginResetOtp_Box_3}>
                                <TextField
                                    id="LoginResetOtp_TextField_1"
                                    sx={styles.LoginResetOtp_TextField_1}
                                />
                                <FormLabel
                                    id="LoginResetOtp_FormLabel_1"
                                    sx={styles.LoginResetOtp_FormLabel_1}
                                >
                                    <span id="LoginResetOtp_span_1">
                                        <i id="LoginResetOtp_i_1"></i>

                                        <span id="LoginResetOtp_span_3">
                                            {otpCredential.userLabel}
                                        </span>
                                    </span>
                                </FormLabel>
                            </Box>
                        )
                    )}
                    <Box id="LoginResetOtp_Box_4" sx={styles.LoginResetOtp_Box_4}>
                        <Box
                            className={kcClsx("kcFormButtonsClass")}
                            id="LoginResetOtp_Box_5"
                            sx={styles.LoginResetOtp_Box_5}
                        >
                            <TextField
                                className={kcClsx(
                                    "kcButtonClass",
                                    "kcButtonPrimaryClass",
                                    "kcButtonBlockClass",
                                    "kcButtonLargeClass"
                                )}
                                type="submit"
                                value={msgStr("doSubmit")}
                                id="LoginResetOtp_TextField_2"
                                sx={styles.LoginResetOtp_TextField_2}
                            />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Template>
    );
}
