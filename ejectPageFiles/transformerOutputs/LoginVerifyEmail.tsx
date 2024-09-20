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
import { styles } from "./styles/LoginVerifyEmail.ts";
export default function LoginVerifyEmail(
    props: PageProps<
        Extract<
            KcContext,
            {
                pageId: "login-verify-email.ftl";
            }
        >,
        I18n
    >
) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
    const { msg } = i18n;
    const { url, user } = kcContext;
    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayInfo
            headerNode={msg("emailVerifyTitle")}
            infoNode={
                <Typography id="Typography_1" sx={styles.Typography_1}>
                    {msg("emailVerifyInstruction2")}
                    <br />
                    <Link href={url.loginAction} id="Link_1" sx={styles.Link_1}>
                        {msg("doClickHere")}
                    </Link>
                    &nbsp;
                    {msg("emailVerifyInstruction3")}
                </Typography>
            }
        >
            <Typography id="Typography_2" sx={styles.Typography_2}>
                {msg("emailVerifyInstruction1", user?.email ?? "")}
            </Typography>
        </Template>
    );
}
