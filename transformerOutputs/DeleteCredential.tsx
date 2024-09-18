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
import { styles } from "./styles/DeleteCredential.ts";
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
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={false}
            headerNode={msg("deleteCredentialTitle", credentialLabel)}
        >
            <Box id="Box_1" sx={styles.Box_1}>
                {msg("deleteCredentialMessage", credentialLabel)}
            </Box>
            <Box
                action={url.loginAction}
                method="POST"
                component="form"
                id="Box_2"
                sx={styles.Box_2}
            >
                <TextField
                    name="accept"
                    type="submit"
                    value={msgStr("doConfirmDelete")}
                    id="TextField_1"
                    sx={styles.TextField_1}
                />
                <TextField
                    name="cancel-aia"
                    value={msgStr("doCancel")}
                    type="submit"
                    id="TextField_2"
                    sx={styles.TextField_2}
                />
            </Box>
        </Template>
    );
}
