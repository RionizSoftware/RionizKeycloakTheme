import { getKcClsx, type KcClsx } from "keycloakify/login/lib/kcClsx";
import { useScript } from "keycloakify/login/pages/WebauthnRegister.useScript";
import type { PageProps } from "keycloakify/login/pages/PageProps";
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
import { styles } from "./styles/WebauthnRegister.ts";
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
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            headerNode={<>{msg("webauthn-registration-title")}</>}
        >
            <Box
                action={url.loginAction}
                method="post"
                component="form"
                id="Box_1"
                sx={styles.Box_1}
            >
                <Box id="Box_2" sx={styles.Box_2}>
                    <TextField
                        type="hidden"
                        name="clientDataJSON"
                        id="TextField_1"
                        sx={styles.TextField_1}
                    />
                    <TextField
                        type="hidden"
                        name="attestationObject"
                        id="TextField_2"
                        sx={styles.TextField_2}
                    />
                    <TextField
                        type="hidden"
                        name="publicKeyCredentialId"
                        id="TextField_3"
                        sx={styles.TextField_3}
                    />
                    <TextField
                        type="hidden"
                        name="authenticatorLabel"
                        id="TextField_4"
                        sx={styles.TextField_4}
                    />
                    <TextField
                        type="hidden"
                        name="transports"
                        id="TextField_5"
                        sx={styles.TextField_5}
                    />
                    <TextField
                        type="hidden"
                        name="error"
                        id="TextField_6"
                        sx={styles.TextField_6}
                    />
                    <LogoutOtherSessions kcClsx={kcClsx} i18n={i18n} />
                </Box>
            </Box>
            <TextField
                type="submit"
                value={msgStr("doRegisterSecurityKey")}
                id="TextField_7"
                sx={styles.TextField_7}
            />

            {!isSetRetry && isAppInitiatedAction && (
                <Box
                    action={url.loginAction}
                    method="post"
                    component="form"
                    id="Box_3"
                    sx={styles.Box_3}
                >
                    <Button
                        type="submit"
                        name="cancel-aia"
                        value="true"
                        id="Button_1"
                        sx={styles.Button_1}
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
        <Box id="Box_4" sx={styles.Box_4}>
            <FormLabel id="FormLabel_1" sx={styles.FormLabel_1}>
                <TextField
                    type="checkbox"
                    name="logout-sessions"
                    value="on"
                    defaultChecked={true}
                    id="TextField_8"
                    sx={styles.TextField_8}
                />
                {msg("logoutOtherSessions")}
            </FormLabel>
        </Box>
    );
}
