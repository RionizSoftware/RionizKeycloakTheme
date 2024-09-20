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
import { styles } from "./styles/Code.ts";
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
            <Box id="Code_Box_1" sx={styles.Code_Box_1}>
                {code.success ? (
                    <>
                        <Typography id="Code_Typography_1" sx={styles.Code_Typography_1}>
                            {msg("copyCodeInstruction")}
                        </Typography>
                        <TextField
                            defaultValue={code.code}
                            id="Code_TextField_1"
                            sx={styles.Code_TextField_1}
                        />
                    </>
                ) : (
                    <Typography id="Code_Typography_2" sx={styles.Code_Typography_2}>
                        {code.error}
                    </Typography>
                )}
            </Box>
        </Template>
    );
}
