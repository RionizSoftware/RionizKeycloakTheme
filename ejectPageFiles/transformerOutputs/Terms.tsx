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
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={false}
            headerNode={msg("termsTitle")}
        >
            <Box id="Box_1" sx={styles.Box_1}>
                {msg("termsText")}
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
                    value={msgStr("doAccept")}
                    id="TextField_1"
                    sx={styles.TextField_1}
                />
                <TextField
                    name="cancel"
                    type="submit"
                    value={msgStr("doDecline")}
                    id="TextField_2"
                    sx={styles.TextField_2}
                />
            </Box>
        </Template>
    );
}
