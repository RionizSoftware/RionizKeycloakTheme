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
        <Template
            id="LoginIdpLinkEmail_Template_1"
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            headerNode={msg("emailLinkIdpTitle", idpAlias)}
        >
            <Typography id="instruction1">
                {msg(
                    "emailLinkIdp1",
                    idpAlias,
                    brokerContext.username,
                    realm.displayName
                )}
            </Typography>
            <Typography id="instruction2">
                {msg("emailLinkIdp2")}{" "}
                <Link id="LoginIdpLinkEmail_a_1" href={url.loginAction}>
                    {msg("doClickHere")}
                </Link>{" "}
                {msg("emailLinkIdp3")}
            </Typography>
            <Typography id="instruction3">
                {msg("emailLinkIdp4")}{" "}
                <Link id="LoginIdpLinkEmail_a_2" href={url.loginAction}>
                    {msg("doClickHere")}
                </Link>{" "}
                {msg("emailLinkIdp5")}
            </Typography>
        </Template>
    );
}
