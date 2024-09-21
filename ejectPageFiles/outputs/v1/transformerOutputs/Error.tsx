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
        <Template id="Error_Template_1">
            <Box id="Error_Box_1" sx={styles.Error_Box_1}>
                <Typography id="Error_Typography_1" sx={styles.Error_Typography_1} />
                {!skipLink && client !== undefined && client.baseUrl !== undefined && (
                    <Typography id="Error_Typography_2" sx={styles.Error_Typography_2}>
                        <Link
                            href={client.baseUrl}
                            id="Error_Link_1"
                            sx={styles.Error_Link_1}
                        >
                            {msg("backToApplication")}
                        </Link>
                    </Typography>
                )}
            </Box>
        </Template>
    );
}
