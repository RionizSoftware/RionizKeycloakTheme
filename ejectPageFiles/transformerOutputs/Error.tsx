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
import { styles } from "./styles/Error.ts";
export default function Error(
    props: PageProps<
        Extract<
            KcContext,
            {
                pageId: "error.ftl";
            }
        >,
        I18n
    >
) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
    const { message, client, skipLink } = kcContext;
    const { msg } = i18n;
    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={false}
            headerNode={msg("errorTitle")}
        >
            <Box id="Box_1" sx={styles.Box_1}>
                <Typography
                    dangerouslySetInnerHTML={{ __html: message.summary }}
                    id="Typography_1"
                    sx={styles.Typography_1}
                />
                {!skipLink && client !== undefined && client.baseUrl !== undefined && (
                    <Typography id="Typography_2" sx={styles.Typography_2}>
                        <Link href={client.baseUrl} id="Link_1" sx={styles.Link_1}>
                            {msg("backToApplication")}
                        </Link>
                    </Typography>
                )}
            </Box>
        </Template>
    );
}
