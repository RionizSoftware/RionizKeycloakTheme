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
import { styles } from "../styles/pages/WebauthnError.ts";
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
            id="WebauthnError_Template_1"
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage
            headerNode={msg("webauthn-error-title")}
        >
            <Box
                id="kc-error-credential-form"
                action={url.loginAction}
                method="post"
                component="form"
            >
                <TextField
                    type="hidden"
                    id="executionValue"
                    name="authenticationExecution"
                />
                <TextField type="hidden" id="isSetRetry" name="isSetRetry" />
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
                id="kc-try-again"
                value={msgStr("doTryAgain")}
            />
            {isAppInitiatedAction && (
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
                        {msgStr("doCancel")}
                    </Button>
                </Box>
            )}
        </Template>
    );
}
