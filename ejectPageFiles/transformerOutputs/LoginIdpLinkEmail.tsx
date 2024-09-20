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
import { styles } from "./styles/LoginIdpLinkEmail.ts";
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
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            headerNode={msg("emailLinkIdpTitle", idpAlias)}
        >
            <Typography id="Typography_1" sx={styles.Typography_1}>
                {msg(
                    "emailLinkIdp1",
                    idpAlias,
                    brokerContext.username,
                    realm.displayName
                )}
            </Typography>
            <Typography id="Typography_2" sx={styles.Typography_2}>
                {msg("emailLinkIdp2")}{" "}
                <Link href={url.loginAction} id="Link_1" sx={styles.Link_1}>
                    {msg("doClickHere")}
                </Link>{" "}
                {msg("emailLinkIdp3")}
            </Typography>
            <Typography id="Typography_3" sx={styles.Typography_3}>
                {msg("emailLinkIdp4")}{" "}
                <Link href={url.loginAction} id="Link_2" sx={styles.Link_2}>
                    {msg("doClickHere")}
                </Link>{" "}
                {msg("emailLinkIdp5")}
            </Typography>
        </Template>
    );
}
