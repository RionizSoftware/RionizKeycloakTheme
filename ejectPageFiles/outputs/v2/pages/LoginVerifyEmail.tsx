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
import { styles } from "../styles/pages/LoginVerifyEmail.ts";
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
        <Template id="LoginVerifyEmail_Template_1">
            <Typography
                id="LoginVerifyEmail_Typography_1"
                sx={styles.LoginVerifyEmail_Typography_1}
            >
                {msg("emailVerifyInstruction1", user?.email ?? "")}
            </Typography>
        </Template>
    );
}
