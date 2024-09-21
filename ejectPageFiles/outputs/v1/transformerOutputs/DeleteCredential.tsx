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
        <Template id="DeleteCredential_Template_1">
            <Box id="DeleteCredential_Box_1" sx={styles.DeleteCredential_Box_1}>
                {msg("deleteCredentialMessage", credentialLabel)}
            </Box>
            <Box
                component="form"
                id="DeleteCredential_Box_2"
                sx={styles.DeleteCredential_Box_2}
            >
                <TextField
                    className={kcClsx(
                        "kcButtonClass",
                        "kcButtonPrimaryClass",
                        "kcButtonLargeClass"
                    )}
                    name="accept"
                    type="submit"
                    value={msgStr("doConfirmDelete")}
                    id="DeleteCredential_TextField_1"
                    sx={styles.DeleteCredential_TextField_1}
                />
                <TextField
                    className={kcClsx(
                        "kcButtonClass",
                        "kcButtonDefaultClass",
                        "kcButtonLargeClass"
                    )}
                    name="cancel-aia"
                    value={msgStr("doCancel")}
                    type="submit"
                    id="DeleteCredential_TextField_2"
                    sx={styles.DeleteCredential_TextField_2}
                />
            </Box>
        </Template>
    );
}
