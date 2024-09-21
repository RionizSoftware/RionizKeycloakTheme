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
import { styles } from "./styles/Terms.ts";
export default function Terms(
    props: PageProps<
        Extract<
            KcContext,
            {
                pageId: "terms.ftl";
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
    const { msg, msgStr } = i18n;
    const { url } = kcContext;
    return (
        <Template id="Terms_Template_1">
            <Box id="Terms_Box_1" sx={styles.Terms_Box_1}>
                {msg("termsText")}
            </Box>
            <Box component="form" id="Terms_Box_2" sx={styles.Terms_Box_2}>
                <TextField
                    className={kcClsx(
                        "kcButtonClass",
                        "kcButtonClass",
                        "kcButtonClass",
                        "kcButtonPrimaryClass",
                        "kcButtonLargeClass"
                    )}
                    name="accept"
                    type="submit"
                    value={msgStr("doAccept")}
                    id="Terms_TextField_1"
                    sx={styles.Terms_TextField_1}
                />
                <TextField
                    className={kcClsx(
                        "kcButtonClass",
                        "kcButtonDefaultClass",
                        "kcButtonLargeClass"
                    )}
                    name="cancel"
                    type="submit"
                    value={msgStr("doDecline")}
                    id="Terms_TextField_2"
                    sx={styles.Terms_TextField_2}
                />
            </Box>
        </Template>
    );
}
