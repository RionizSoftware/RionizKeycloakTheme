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
        <Template
            id="LoginResetOtp_Template_1"
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={!messagesPerField.existsError("totp")}
            headerNode={msg("doLogIn")}
        >
            <Box
                id="kc-otp-reset-form"
                action={url.loginAction}
                method="post"
                component="form"
            >
                <Box id="LoginResetOtp_div_1">
                    <Typography id="kc-otp-reset-form-description">
                        {msg("otp-reset-description")}
                    </Typography>
                    {configuredOtpCredentials.userOtpCredentials.map(
                        (otpCredential, index) => (
                            <Box id="LoginResetOtp_Fragment_1" key={otpCredential.id}>
                                <TextField
                                    id={`kc-otp-credential-${index}`}
                                    type="radio"
                                    name="selectedCredentialId"
                                    value={otpCredential.id}
                                    defaultChecked={
                                        otpCredential.id ===
                                        configuredOtpCredentials.selectedCredentialId
                                    }
                                />
                                <FormLabel
                                    id="LoginResetOtp_label_1"
                                    htmlFor={`kc-otp-credential-${index}`}
                                    tabIndex={index}
                                >
                                    <span id="LoginResetOtp_span_1">
                                        <i id="LoginResetOtp_i_1" aria-hidden="true"></i>

                                        <span id="LoginResetOtp_span_3">
                                            {otpCredential.userLabel}
                                        </span>
                                    </span>
                                </FormLabel>
                            </Box>
                        )
                    )}
                    <Box id="LoginResetOtp_div_3">
                        <TextField
                            id="kc-otp-reset-form-submit"
                            type="submit"
                            value={msgStr("doSubmit")}
                        />
                    </Box>
                </Box>
            </Box>
        </Template>
    );
}
