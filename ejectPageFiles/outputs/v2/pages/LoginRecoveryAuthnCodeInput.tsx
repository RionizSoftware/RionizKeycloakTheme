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
        <Template id="LoginRecoveryAuthnCodeInput_Template_1">
            <Box
                className={kcClsx("kcFormClass")}
                action={url.loginAction}
                method="post"
                component="form"
                id="LoginRecoveryAuthnCodeInput_Box_1"
                sx={styles.LoginRecoveryAuthnCodeInput_Box_1}
            >
                <Box
                    id="LoginRecoveryAuthnCodeInput_Box_2"
                    sx={styles.LoginRecoveryAuthnCodeInput_Box_2}
                >
                    <FormLabel
                        id="LoginRecoveryAuthnCodeInput_FormLabel_1"
                        sx={styles.LoginRecoveryAuthnCodeInput_FormLabel_1}
                    >
                        {msg(
                            "auth-recovery-code-prompt",
                            `${recoveryAuthnCodesInputBean.codeNumber}`
                        )}
                    </FormLabel>

                    <Box
                        id="LoginRecoveryAuthnCodeInput_Box_3"
                        sx={styles.LoginRecoveryAuthnCodeInput_Box_3}
                    >
                        <TextField
                            tabIndex={1}
                            name="recoveryCodeInput"
                            aria-invalid={messagesPerField.existsError(
                                "recoveryCodeInput"
                            )}
                            autoComplete="off"
                            type="text"
                            className={kcClsx("kcInputClass")}
                            autoFocus
                            id="LoginRecoveryAuthnCodeInput_TextField_1"
                            sx={styles.LoginRecoveryAuthnCodeInput_TextField_1}
                        />
                        {messagesPerField.existsError("recoveryCodeInput") && (
                            <span
                                id="input-error"
                                className={kcClsx("kcInputErrorMessageClass")}
                                aria-live="polite"
                                dangerouslySetInnerHTML={{
                                    __html: messagesPerField.get("recoveryCodeInput")
                                }}
                            />
                        )}
                    </Box>
                </Box>

                <Box
                    id="LoginRecoveryAuthnCodeInput_Box_4"
                    sx={styles.LoginRecoveryAuthnCodeInput_Box_4}
                >
                    <Box
                        className={kcClsx("kcFormOptionsWrapperClass")}
                        id="LoginRecoveryAuthnCodeInput_Box_5"
                        sx={styles.LoginRecoveryAuthnCodeInput_Box_5}
                    ></Box>
                    <Box
                        className={kcClsx("kcFormButtonsClass")}
                        id="LoginRecoveryAuthnCodeInput_Box_6"
                        sx={styles.LoginRecoveryAuthnCodeInput_Box_6}
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
                            id="LoginRecoveryAuthnCodeInput_TextField_2"
                            sx={styles.LoginRecoveryAuthnCodeInput_TextField_2}
                        />
                    </Box>
                </Box>
            </Box>
        </Template>
    );
}
