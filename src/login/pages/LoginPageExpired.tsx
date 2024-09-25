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
import { styles } from "../styles/pages/LoginPageExpired.ts";
export default function LoginPageExpired(
    props: PageProps<
        Extract<
            KcContext,
            {
                pageId: "login-page-expired.ftl";
            }
        >,
        I18n
    >
) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
    const { url } = kcContext;
    const { msg } = i18n;
    return (
        <Template
            id="LoginPageExpired_Template_1"
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            headerNode={msg("pageExpiredTitle")}
        >
            <Typography
                id="LoginPageExpired_Typography_1"
                sx={styles.LoginPageExpired_Typography_1}
            >
                {msg("pageExpiredMsg1")}
                <Link
                    href={url.loginRestartFlowUrl}
                    id="LoginPageExpired_Link_1"
                    sx={styles.LoginPageExpired_Link_1}
                >
                    {msg("doClickHere")}
                </Link>{" "}
                .<br id="LoginPageExpired_br_1" />
                {msg("pageExpiredMsg2")}{" "}
                <Link
                    href={url.loginAction}
                    id="LoginPageExpired_Link_2"
                    sx={styles.LoginPageExpired_Link_2}
                >
                    {msg("doClickHere")}
                </Link>{" "}
                .
            </Typography>
        </Template>
    );
}
