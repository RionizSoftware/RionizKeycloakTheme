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
import { styles } from "./styles/LogoutConfirm.ts";
export default function LogoutConfirm(
    props: PageProps<
        Extract<
            KcContext,
            {
                pageId: "logout-confirm.ftl";
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
    const { url, client, logoutConfirm } = kcContext;
    const { msg, msgStr } = i18n;
    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            headerNode={msg("logoutConfirmTitle")}
        >
            <Box id="Box_1" sx={styles.Box_1}>
                <Typography id="Typography_1" sx={styles.Typography_1}>
                    {msg("logoutConfirmHeader")}
                </Typography>
                <Box
                    action={url.logoutConfirmAction}
                    method="POST"
                    component="form"
                    id="Box_2"
                    sx={styles.Box_2}
                >
                    <TextField
                        type="hidden"
                        name="session_code"
                        value={logoutConfirm.code}
                        id="TextField_1"
                        sx={styles.TextField_1}
                    />
                    <Box id="Box_3" sx={styles.Box_3}>
                        <TextField
                            tabIndex={4}
                            name="confirmLogout"
                            type="submit"
                            value={msgStr("doLogout")}
                            id="TextField_2"
                            sx={styles.TextField_2}
                        />
                    </Box>
                </Box>
                <Box id="Box_4" sx={styles.Box_4}>
                    {!logoutConfirm.skipLink && client.baseUrl && (
                        <Typography id="Typography_2" sx={styles.Typography_2}>
                            <Link href={client.baseUrl} id="Link_1" sx={styles.Link_1}>
                                {msg("backToApplication")}
                            </Link>
                        </Typography>
                    )}
                </Box>
            </Box>
        </Template>
    );
}
