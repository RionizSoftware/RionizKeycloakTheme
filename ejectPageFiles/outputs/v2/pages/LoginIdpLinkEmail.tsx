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
import { styles } from "../styles/pages/LoginIdpLinkEmail.ts";
export default function LoginIdpLinkEmail(
    props: PageProps<
        Extract<
            KcContext,
            {
                pageId: "login-idp-link-email.ftl";
            }
        >,
        I18n
    >
) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
    const { url, realm, brokerContext, idpAlias } = kcContext;
    const { msg } = i18n;
    return (
        <Template id="LoginIdpLinkEmail_Template_1">
            <Typography
                id="LoginIdpLinkEmail_Typography_1"
                sx={styles.LoginIdpLinkEmail_Typography_1}
            >
                {msg(
                    "emailLinkIdp1",
                    idpAlias,
                    brokerContext.username,
                    realm.displayName
                )}
            </Typography>
            <Typography
                id="LoginIdpLinkEmail_Typography_2"
                sx={styles.LoginIdpLinkEmail_Typography_2}
            >
                {msg("emailLinkIdp2")}{" "}
                <Link id="LoginIdpLinkEmail_Link_1" sx={styles.LoginIdpLinkEmail_Link_1}>
                    {msg("doClickHere")}
                </Link>{" "}
                {msg("emailLinkIdp3")}
            </Typography>
            <Typography
                id="LoginIdpLinkEmail_Typography_3"
                sx={styles.LoginIdpLinkEmail_Typography_3}
            >
                {msg("emailLinkIdp4")}{" "}
                <Link id="LoginIdpLinkEmail_Link_2" sx={styles.LoginIdpLinkEmail_Link_2}>
                    {msg("doClickHere")}
                </Link>{" "}
                {msg("emailLinkIdp5")}
            </Typography>
        </Template>
    );
}
