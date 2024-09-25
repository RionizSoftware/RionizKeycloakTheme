import { getKcClsx, type KcClsx } from "rionizkeycloakify/login/lib/kcClsx";
import { useScript } from "rionizkeycloakify/login/pages/WebauthnRegister.useScript";
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
import { styles } from "../styles/pages/WebauthnRegister.ts";
export default function WebauthnRegister(
    props: PageProps<
        Extract<
            KcContext,
            {
                pageId: "webauthn-register.ftl";
            }
        >,
        I18n
    >
) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
    const { kcClsx } = getKcClsx({ doUseDefaultCss, classes });
    const { url, isSetRetry, isAppInitiatedAction } = kcContext;
    const { msg, msgStr } = i18n;
    const authButtonId = "authenticateWebAuthnButton";
    useScript({
        authButtonId,
        kcContext,
        i18n
    });
    return (
        <Template
            id="WebauthnRegister_Template_1"
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            headerNode={
                <>
                    <span
                        id="WebauthnRegister_span_1"
                        className={kcClsx("kcWebAuthnKeyIcon")}
                    />
                    {msg("webauthn-registration-title")}
                </>
            }
        >
            <Box
                className={kcClsx("kcFormClass")}
                action={url.loginAction}
                method="post"
                component="form"
                id="WebauthnRegister_Box_1"
                sx={styles.WebauthnRegister_Box_1}
            >
                <Box
                    className={kcClsx("kcFormGroupClass")}
                    id="WebauthnRegister_Box_2"
                    sx={styles.WebauthnRegister_Box_2}
                >
                    <TextField
                        type="hidden"
                        name="clientDataJSON"
                        id="WebauthnRegister_TextField_1"
                        sx={styles.WebauthnRegister_TextField_1}
                    />
                    <TextField
                        type="hidden"
                        name="attestationObject"
                        id="WebauthnRegister_TextField_2"
                        sx={styles.WebauthnRegister_TextField_2}
                    />
                    <TextField
                        type="hidden"
                        name="publicKeyCredentialId"
                        id="WebauthnRegister_TextField_3"
                        sx={styles.WebauthnRegister_TextField_3}
                    />
                    <TextField
                        type="hidden"
                        name="authenticatorLabel"
                        id="WebauthnRegister_TextField_4"
                        sx={styles.WebauthnRegister_TextField_4}
                    />
                    <TextField
                        type="hidden"
                        name="transports"
                        id="WebauthnRegister_TextField_5"
                        sx={styles.WebauthnRegister_TextField_5}
                    />
                    <TextField
                        type="hidden"
                        name="error"
                        id="WebauthnRegister_TextField_6"
                        sx={styles.WebauthnRegister_TextField_6}
                    />
                    <LogoutOtherSessions
                        id="WebauthnRegister_LogoutOtherSessions_1"
                        kcClsx={kcClsx}
                        i18n={i18n}
                    />
                </Box>
            </Box>
            <TextField
                type="submit"
                className={kcClsx(
                    "kcButtonClass",
                    "kcButtonPrimaryClass",
                    "kcButtonBlockClass",
                    "kcButtonLargeClass"
                )}
                value={msgStr("doRegisterSecurityKey")}
                id="WebauthnRegister_TextField_7"
                sx={styles.WebauthnRegister_TextField_7}
            />

            {!isSetRetry && isAppInitiatedAction && (
                <Box
                    action={url.loginAction}
                    className={kcClsx("kcFormClass")}
                    method="post"
                    component="form"
                    id="WebauthnRegister_Box_3"
                    sx={styles.WebauthnRegister_Box_3}
                >
                    <Button
                        type="submit"
                        className={kcClsx(
                            "kcButtonClass",
                            "kcButtonDefaultClass",
                            "kcButtonBlockClass",
                            "kcButtonLargeClass"
                        )}
                        name="cancel-aia"
                        value="true"
                        id="WebauthnRegister_Button_1"
                        sx={styles.WebauthnRegister_Button_1}
                    >
                        {msg("doCancel")}
                    </Button>
                </Box>
            )}
        </Template>
    );
}
function LogoutOtherSessions(props: { kcClsx: KcClsx; i18n: I18n }) {
    const { kcClsx, i18n } = props;
    const { msg } = i18n;
    return (
        <Box
            className={kcClsx("kcFormOptionsClass")}
            id="WebauthnRegister_Box_4"
            sx={styles.WebauthnRegister_Box_4}
        >
            <Box
                className={kcClsx("kcFormOptionsWrapperClass")}
                id="WebauthnRegister_Box_5"
                sx={styles.WebauthnRegister_Box_5}
            >
                <Box id="WebauthnRegister_Box_6" sx={styles.WebauthnRegister_Box_6}>
                    <FormLabel
                        id="WebauthnRegister_FormLabel_1"
                        sx={styles.WebauthnRegister_FormLabel_1}
                    >
                        <TextField
                            type="checkbox"
                            name="logout-sessions"
                            value="on"
                            defaultChecked={true}
                            id="WebauthnRegister_TextField_8"
                            sx={styles.WebauthnRegister_TextField_8}
                        />
                        {msg("logoutOtherSessions")}
                    </FormLabel>
                </Box>
            </Box>
        </Box>
    );
}
