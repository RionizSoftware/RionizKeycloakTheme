import { getKcClsx } from "rionizkeycloakify/login/lib/kcClsx";
import type { PageProps } from "rionizkeycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Box, Button, Link, TextField, FormLabel, Typography, List, ListItem, Checkbox, Radio } from "@mui/material";
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
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            headerNode={msg("auth-recovery-code-header")}
            displayMessage={!messagesPerField.existsError("recoveryCodeInput")}
        >
            <Box
                action={url.loginAction}
                method="post"
                component="form"
                id="LoginRecoveryAuthnCodeInput_Box_1"
                sx={styles.LoginRecoveryAuthnCodeInput_Box_1}
            >
                <Box id="LoginRecoveryAuthnCodeInput_Box_2" sx={styles.LoginRecoveryAuthnCodeInput_Box_2}>
                    <FormLabel
                        htmlFor="recoveryCodeInput"
                        id="LoginRecoveryAuthnCodeInput_FormLabel_1"
                        sx={styles.LoginRecoveryAuthnCodeInput_FormLabel_1}
                    >
                        {msg("auth-recovery-code-prompt", `${recoveryAuthnCodesInputBean.codeNumber}`)}
                    </FormLabel>

                    <Box id="LoginRecoveryAuthnCodeInput_Box_3" sx={styles.LoginRecoveryAuthnCodeInput_Box_3}>
                        <TextField
                            tabIndex={1}
                            name="recoveryCodeInput"
                            aria-invalid={messagesPerField.existsError("recoveryCodeInput")}
                            autoComplete="off"
                            type="text"
                            autoFocus
                            fullWidth={true}
                            id="LoginRecoveryAuthnCodeInput_TextField_1"
                            sx={styles.LoginRecoveryAuthnCodeInput_TextField_1}
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

                <Box id="LoginRecoveryAuthnCodeInput_Box_4" sx={styles.LoginRecoveryAuthnCodeInput_Box_4}>
                    <Button
                        name="login"
                        type="submit"
                        value={msgStr("doLogIn")}
                        fullWidth={true}
                        id="LoginRecoveryAuthnCodeInput_Button_1"
                        sx={styles.LoginRecoveryAuthnCodeInput_Button_1}
                    />
                </Box>
            </Box>
        </Template>
    );
}
