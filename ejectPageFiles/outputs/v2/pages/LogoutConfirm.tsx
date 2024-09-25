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
            <Box id="kc-logout-confirm">
                <Typography id="LogoutConfirm_p_1">
                    {msg("logoutConfirmHeader")}
                </Typography>
                <Box
                    id="LogoutConfirm_form_1"
                    action={url.logoutConfirmAction}
                    method="POST"
                    component="form"
                >
                    <TextField
                        id="LogoutConfirm_input_1"
                        type="hidden"
                        name="session_code"
                        value={logoutConfirm.code}
                    />
                    <Box id="LogoutConfirm_div_2">
                        <TextField
                            tabIndex={4}
                            name="confirmLogout"
                            id="kc-logout"
                            type="submit"
                            value={msgStr("doLogout")}
                        />
                    </Box>
                </Box>
                <Box id="kc-info-message">
                    {!logoutConfirm.skipLink && client.baseUrl && (
                        <Typography id="LogoutConfirm_p_2">
                            <Link id="LogoutConfirm_a_1" href={client.baseUrl}>
                                {msg("backToApplication")}
                            </Link>
                        </Typography>
                    )}
                </Box>
            </Box>
        </Template>
    );
}
