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
import { styles } from "../styles/pages/LoginRecoveryAuthnCodeInput.ts";
export default function LoginRecoveryAuthnCodeInput(
    props: PageProps<
        Extract<
            KcContext,
            {
                pageId: "login-recovery-authn-code-input.ftl";
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
    const { url, messagesPerField, recoveryAuthnCodesInputBean } = kcContext;
    const { msg, msgStr } = i18n;
    return (
        <Template
            id="LoginRecoveryAuthnCodeInput_Template_1"
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            headerNode={msg("auth-recovery-code-header")}
            displayMessage={!messagesPerField.existsError("recoveryCodeInput")}
        >
            <Box
                id="kc-recovery-code-login-form"
                action={url.loginAction}
                method="post"
                component="form"
            >
                <Box id="LoginRecoveryAuthnCodeInput_div_1">
                    <FormLabel
                        id="LoginRecoveryAuthnCodeInput_label_1"
                        htmlFor="recoveryCodeInput"
                    >
                        {msg(
                            "auth-recovery-code-prompt",
                            `${recoveryAuthnCodesInputBean.codeNumber}`
                        )}
                    </FormLabel>

                    <Box id="LoginRecoveryAuthnCodeInput_div_3">
                        <TextField
                            tabIndex={1}
                            id="recoveryCodeInput"
                            name="recoveryCodeInput"
                            aria-invalid={messagesPerField.existsError(
                                "recoveryCodeInput"
                            )}
                            autoComplete="off"
                            type="text"
                            autoFocus
                        />
                        {messagesPerField.existsError("recoveryCodeInput") && (
                            <span
                                id="input-error"
                                aria-live="polite"
                                dangerouslySetInnerHTML={{
                                    __html: messagesPerField.get("recoveryCodeInput")
                                }}
                            />
                        )}
                    </Box>
                </Box>

                <Box id="LoginRecoveryAuthnCodeInput_div_4">
                    <TextField
                        name="login"
                        id="kc-login"
                        type="submit"
                        value={msgStr("doLogIn")}
                    />
                </Box>
            </Box>
        </Template>
    );
}
