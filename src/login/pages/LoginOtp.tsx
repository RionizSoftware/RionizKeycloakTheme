import { Box, Button, Link, TextField } from "@mui/material";
import { Fragment } from "react";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
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
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={!messagesPerField.existsError("totp")}
            headerNode={msg("doLogIn")}
        >
            <form id="kc-otp-login-form" action={url.loginAction} method="post">
                {otpLogin.userOtpCredentials.length > 1 && (
                    <Box>
                        {otpLogin.userOtpCredentials.map((otpCredential, index) => (
                            <Fragment key={index}>
                                <TextField
                                    id={`kc-otp-credential-${index}`}
                                    type="radio"
                                    name="selectedCredentialId"
                                    value={otpCredential.id}
                                    defaultChecked={
                                        otpCredential.id === otpLogin.selectedCredentialId
                                    }
                                />
                                <label
                                    htmlFor={`kc-otp-credential-${index}`}
                                    tabIndex={index}
                                >
                                    <span>
                                        <i aria-hidden="true"></i>

                                        <span>{otpCredential.userLabel}</span>
                                    </span>
                                </label>
                            </Fragment>
                        ))}
                    </Box>
                )}

                <Box>
                    <label htmlFor="otp">{msg("loginOtpOneTime")}</label>

                    <Box>
                        <TextField
                            id="otp"
                            name="otp"
                            autoComplete="off"
                            type="text"
                            autoFocus
                            aria-invalid={messagesPerField.existsError("totp")}
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

                <Box>
                    <TextField
                        name="login"
                        id="kc-login"
                        type="submit"
                        value={msgStr("doLogIn")}
                    />
                </Box>
            </form>
        </Template>
    );
}
