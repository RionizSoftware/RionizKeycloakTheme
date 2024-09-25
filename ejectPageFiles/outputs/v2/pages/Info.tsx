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
import { styles } from "../styles/pages/Info.ts";
export default function Info(
    props: PageProps<
        Extract<
            KcContext,
            {
                pageId: "info.ftl";
            }
        >,
        I18n
    >
) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
    const { advancedMsgStr, msg } = i18n;
    const {
        messageHeader,
        message,
        requiredActions,
        skipLink,
        pageRedirectUri,
        actionUri,
        client
    } = kcContext;
    return (
        <Template id="Info_Template_1">
            <Box id="Info_Box_1" sx={styles.Info_Box_1}>
                <Typography id="Info_Typography_1" sx={styles.Info_Typography_1} />
                {(() => {
                    if (skipLink) {
                        return null;
                    }
                    if (pageRedirectUri) {
                        return (
                            <Typography
                                id="Info_Typography_2"
                                sx={styles.Info_Typography_2}
                            >
                                <Link id="Info_Link_1" sx={styles.Info_Link_1}>
                                    {msg("backToApplication")}
                                </Link>
                            </Typography>
                        );
                    }
                    if (actionUri) {
                        return (
                            <Typography
                                id="Info_Typography_3"
                                sx={styles.Info_Typography_3}
                            >
                                <Link id="Info_Link_2" sx={styles.Info_Link_2}>
                                    {msg("proceedWithAction")}
                                </Link>
                            </Typography>
                        );
                    }
                    if (client.baseUrl) {
                        return (
                            <Typography
                                id="Info_Typography_4"
                                sx={styles.Info_Typography_4}
                            >
                                <Link id="Info_Link_3" sx={styles.Info_Link_3}>
                                    {msg("backToApplication")}
                                </Link>
                            </Typography>
                        );
                    }
                })()}
            </Box>
        </Template>
    );
}
