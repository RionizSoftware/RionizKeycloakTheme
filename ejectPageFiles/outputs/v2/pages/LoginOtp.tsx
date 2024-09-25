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
                className={kcClsx("kcFormClass")}
                action={url.loginAction}
                method="post"
                component="form"
                id="LoginOtp_Box_1"
                sx={styles.LoginOtp_Box_1}
            >
                {otpLogin.userOtpCredentials.length > 1 && (
                    <Box
                        className={kcClsx("kcFormGroupClass")}
                        id="LoginOtp_Box_2"
                        sx={styles.LoginOtp_Box_2}
                    >
                        <Box
                            className={kcClsx("kcInputWrapperClass")}
                            id="LoginOtp_Box_3"
                            sx={styles.LoginOtp_Box_3}
                        >
                            {otpLogin.userOtpCredentials.map((otpCredential, index) => (
                                <Box
                                    key={index}
                                    id="LoginOtp_Box_4"
                                    sx={styles.LoginOtp_Box_4}
                                >
                                    <TextField
                                        className={kcClsx("kcLoginOTPListInputClass")}
                                        type="radio"
                                        name="selectedCredentialId"
                                        value={otpCredential.id}
                                        defaultChecked={
                                            otpCredential.id ===
                                            otpLogin.selectedCredentialId
                                        }
                                        id="LoginOtp_TextField_1"
                                        sx={styles.LoginOtp_TextField_1}
                                    />
                                    <FormLabel
                                        htmlFor={`kc-otp-credential-${index}`}
                                        className={kcClsx("kcLoginOTPListClass")}
                                        tabIndex={index}
                                        id="LoginOtp_FormLabel_1"
                                        sx={styles.LoginOtp_FormLabel_1}
                                    >
                                        <span
                                            id="LoginOtp_span_1"
                                            className={kcClsx(
                                                "kcLoginOTPListItemHeaderClass"
                                            )}
                                        >
                                            <span
                                                id="LoginOtp_span_2"
                                                className={kcClsx(
                                                    "kcLoginOTPListItemIconBodyClass"
                                                )}
                                            >
                                                <i
                                                    id="LoginOtp_i_1"
                                                    className={kcClsx(
                                                        "kcLoginOTPListItemIconClass"
                                                    )}
                                                    aria-hidden="true"
                                                ></i>
                                            </span>
                                            <span
                                                id="LoginOtp_span_3"
                                                className={kcClsx(
                                                    "kcLoginOTPListItemTitleClass"
                                                )}
                                            >
                                                {otpCredential.userLabel}
                                            </span>
                                        </span>
                                    </FormLabel>
                                </Box>
                            ))}
                        </Box>
                    </Box>
                )}

                <Box
                    className={kcClsx("kcFormGroupClass")}
                    id="LoginOtp_Box_5"
                    sx={styles.LoginOtp_Box_5}
                >
                    <Box
                        className={kcClsx("kcLabelWrapperClass")}
                        id="LoginOtp_Box_6"
                        sx={styles.LoginOtp_Box_6}
                    >
                        <FormLabel
                            htmlFor="otp"
                            className={kcClsx("kcLabelClass")}
                            id="LoginOtp_FormLabel_2"
                            sx={styles.LoginOtp_FormLabel_2}
                        >
                            {msg("loginOtpOneTime")}
                        </FormLabel>
                    </Box>
                    <Box
                        className={kcClsx("kcInputWrapperClass")}
                        id="LoginOtp_Box_7"
                        sx={styles.LoginOtp_Box_7}
                    >
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

                <Box
                    className={kcClsx("kcFormGroupClass")}
                    id="LoginOtp_Box_8"
                    sx={styles.LoginOtp_Box_8}
                >
                    <Box
                        className={kcClsx("kcFormOptionsClass")}
                        id="LoginOtp_Box_9"
                        sx={styles.LoginOtp_Box_9}
                    >
                        <Box
                            className={kcClsx("kcFormOptionsWrapperClass")}
                            id="LoginOtp_Box_10"
                            sx={styles.LoginOtp_Box_10}
                        ></Box>
                    </Box>
                    <Box
                        className={kcClsx("kcFormButtonsClass")}
                        id="LoginOtp_Box_11"
                        sx={styles.LoginOtp_Box_11}
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
