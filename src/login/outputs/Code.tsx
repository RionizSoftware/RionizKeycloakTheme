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
export default function Code(
    props: PageProps<
        Extract<
            KcContext,
            {
                pageId: "code.ftl";
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
    const { code } = kcContext;
    const { msg } = i18n;
    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            headerNode={
                code.success ? msg("codeSuccessTitle") : msg("codeErrorTitle", code.error)
            }
        >
            <Box id="kc-code">
                {code.success ? (
                    <>
                        <Typography>{msg("copyCodeInstruction")}</Typography>
                        <TextField id="code" defaultValue={code.code} />
                    </>
                ) : (
                    <Typography id="error">{code.error}</Typography>
                )}
            </Box>
        </Template>
    );
}
