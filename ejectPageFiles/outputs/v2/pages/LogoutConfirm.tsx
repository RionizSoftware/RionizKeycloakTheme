import { getKcClsx } from "rionizkeycloakify/login/lib/kcClsx";
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
import { styles } from "../styles/pages/LogoutConfirm.ts";
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
            id="LogoutConfirm_Template_1"
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            headerNode={msg("logoutConfirmTitle")}
        >
            <Box id="LogoutConfirm_Box_1" sx={styles.LogoutConfirm_Box_1}>
                <Typography
                    id="LogoutConfirm_Typography_1"
                    sx={styles.LogoutConfirm_Typography_1}
                >
                    {msg("logoutConfirmHeader")}
                </Typography>
                <Box
                    action={url.logoutConfirmAction}
                    method="POST"
                    component="form"
                    id="LogoutConfirm_Box_2"
                    sx={styles.LogoutConfirm_Box_2}
                >
                    <TextField
                        type="hidden"
                        name="session_code"
                        value={logoutConfirm.code}
                        id="LogoutConfirm_TextField_1"
                        sx={styles.LogoutConfirm_TextField_1}
                    />
                    <Box
                        className={kcClsx("kcFormGroupClass")}
                        id="LogoutConfirm_Box_3"
                        sx={styles.LogoutConfirm_Box_3}
                    >
                        <Box id="LogoutConfirm_Box_4" sx={styles.LogoutConfirm_Box_4}>
                            <Box
                                className={kcClsx("kcFormOptionsWrapperClass")}
                                id="LogoutConfirm_Box_5"
                                sx={styles.LogoutConfirm_Box_5}
                            ></Box>
                        </Box>
                        <Box
                            className={kcClsx("kcFormGroupClass")}
                            id="LogoutConfirm_Box_6"
                            sx={styles.LogoutConfirm_Box_6}
                        >
                            <TextField
                                tabIndex={4}
                                className={kcClsx(
                                    "kcButtonClass",
                                    "kcButtonPrimaryClass",
                                    "kcButtonBlockClass",
                                    "kcButtonLargeClass"
                                )}
                                name="confirmLogout"
                                type="submit"
                                value={msgStr("doLogout")}
                                id="LogoutConfirm_TextField_2"
                                sx={styles.LogoutConfirm_TextField_2}
                            />
                        </Box>
                    </Box>
                </Box>
                <Box id="LogoutConfirm_Box_7" sx={styles.LogoutConfirm_Box_7}>
                    {!logoutConfirm.skipLink && client.baseUrl && (
                        <Typography
                            id="LogoutConfirm_Typography_2"
                            sx={styles.LogoutConfirm_Typography_2}
                        >
                            <Link
                                href={client.baseUrl}
                                id="LogoutConfirm_Link_1"
                                sx={styles.LogoutConfirm_Link_1}
                            >
                                {msg("backToApplication")}
                            </Link>
                        </Typography>
                    )}
                </Box>
            </Box>
        </Template>
    );
}
