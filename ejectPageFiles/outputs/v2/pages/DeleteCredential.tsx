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
import { styles } from "../styles/pages/DeleteCredential.ts";
export default function DeleteCredential(
    props: PageProps<
        Extract<
            KcContext,
            {
                pageId: "delete-credential.ftl";
            }
        >,
        I18n
    >
) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
    const { msgStr, msg } = i18n;
    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });
    const { url, credentialLabel } = kcContext;
    return (
        <Template
            id="DeleteCredential_Template_1"
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={false}
            headerNode={msg("deleteCredentialTitle", credentialLabel)}
        >
            <Box id="kc-delete-text">
                {msg("deleteCredentialMessage", credentialLabel)}
            </Box>
            <Box
                id="DeleteCredential_form_1"
                action={url.loginAction}
                method="POST"
                component="form"
            >
                <TextField
                    name="accept"
                    id="kc-accept"
                    type="submit"
                    value={msgStr("doConfirmDelete")}
                />
                <TextField
                    name="cancel-aia"
                    value={msgStr("doCancel")}
                    id="kc-decline"
                    type="submit"
                />
            </Box>
        </Template>
    );
}
