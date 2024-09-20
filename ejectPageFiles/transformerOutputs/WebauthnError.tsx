import { getKcClsx } from "keycloakify/login/lib/kcClsx";
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
import { styles } from "./styles/WebauthnError.ts";
export default function WebauthnError(
    props: PageProps<
        Extract<
            KcContext,
            {
                pageId: "webauthn-error.ftl";
            }
        >,
        I18n
    >
) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
    const { url, isAppInitiatedAction } = kcContext;
    const { msg, msgStr } = i18n;
    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });
    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage
            headerNode={msg("webauthn-error-title")}
        >
            <Box
                action={url.loginAction}
                method="post"
                component="form"
                id="WebauthnError_Box_1"
                sx={styles.WebauthnError_Box_1}
            >
                <TextField
                    type="hidden"
                    name="authenticationExecution"
                    id="WebauthnError_TextField_1"
                    sx={styles.WebauthnError_TextField_1}
                />
                <TextField
                    type="hidden"
                    name="isSetRetry"
                    id="WebauthnError_TextField_2"
                    sx={styles.WebauthnError_TextField_2}
                />
            </Box>
            <TextField
                tabIndex={4}
                onClick={() => {
                    // @ts-expect-error: Trusted Keycloak's code
                    document.getElementById("isSetRetry").value = "retry";
                    // @ts-expect-error: Trusted Keycloak's code
                    document.getElementById("executionValue").value = "${execution}";
                    // @ts-expect-error: Trusted Keycloak's code
                    document.getElementById("kc-error-credential-form").submit();
                }}
                type="button"
                name="try-again"
                value={msgStr("doTryAgain")}
                id="WebauthnError_TextField_3"
                sx={styles.WebauthnError_TextField_3}
            />
            {isAppInitiatedAction && (
                <Box
                    action={url.loginAction}
                    method="post"
                    component="form"
                    id="WebauthnError_Box_2"
                    sx={styles.WebauthnError_Box_2}
                >
                    <Button
                        type="submit"
                        name="cancel-aia"
                        value="true"
                        id="WebauthnError_Button_1"
                        sx={styles.WebauthnError_Button_1}
                    >
                        {msgStr("doCancel")}
                    </Button>
                </Box>
            )}
        </Template>
    );
}
