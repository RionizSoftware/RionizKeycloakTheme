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
            headerNode={<>{msg("webauthn-registration-title")}</>}
        >
            <Box id="register" action={url.loginAction} method="post" component="form">
                <Box id="WebauthnRegister_div_1">
                    <TextField type="hidden" id="clientDataJSON" name="clientDataJSON" />
                    <TextField
                        type="hidden"
                        id="attestationObject"
                        name="attestationObject"
                    />
                    <TextField
                        type="hidden"
                        id="publicKeyCredentialId"
                        name="publicKeyCredentialId"
                    />
                    <TextField
                        type="hidden"
                        id="authenticatorLabel"
                        name="authenticatorLabel"
                    />
                    <TextField type="hidden" id="transports" name="transports" />
                    <TextField type="hidden" id="error" name="error" />
                    <LogoutOtherSessions
                        id="WebauthnRegister_LogoutOtherSessions_1"
                        kcClsx={kcClsx}
                        i18n={i18n}
                    />
                </Box>
            </Box>
            <TextField
                type="submit"
                id={authButtonId}
                value={msgStr("doRegisterSecurityKey")}
            />

            {!isSetRetry && isAppInitiatedAction && (
                <Box
                    action={url.loginAction}
                    id="kc-webauthn-settings-form"
                    method="post"
                    component="form"
                >
                    <Button
                        type="submit"
                        id="cancelWebAuthnAIA"
                        name="cancel-aia"
                        value="true"
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
        <Box id="kc-form-options">
            <FormLabel id="WebauthnRegister_label_1">
                <TextField
                    type="checkbox"
                    id="logout-sessions"
                    name="logout-sessions"
                    value="on"
                    defaultChecked={true}
                />
                {msg("logoutOtherSessions")}
            </FormLabel>
        </Box>
    );
}
