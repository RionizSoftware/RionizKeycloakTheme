import { useEffect } from "react";
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
import { styles } from "../styles/pages/FrontchannelLogout.ts";
export default function FrontchannelLogout(
    props: PageProps<
        Extract<
            KcContext,
            {
                pageId: "frontchannel-logout.ftl";
            }
        >,
        I18n
    >
) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
    const { logout } = kcContext;
    const { msg, msgStr } = i18n;
    useEffect(() => {
        if (logout.logoutRedirectUri) {
            window.location.replace(logout.logoutRedirectUri);
        }
    }, []);
    return (
        <Template
            id="FrontchannelLogout_Template_1"
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            documentTitle={msgStr("frontchannel-logout.title")}
            headerNode={msg("frontchannel-logout.title")}
        >
            <Typography id="FrontchannelLogout_p_1">
                {msg("frontchannel-logout.message")}
            </Typography>
            <List id="FrontchannelLogout_ul_1">
                {logout.clients.map(client => (
                    <ListItem id="FrontchannelLogout_li_1" key={client.name}>
                        {client.name}
                        <iframe
                            id="FrontchannelLogout_iframe_1"
                            src={client.frontChannelLogoutUrl}
                            style={{ display: "none" }}
                        />
                    </ListItem>
                ))}
            </List>
            {logout.logoutRedirectUri && (
                <Link id="continue" href={logout.logoutRedirectUri}>
                    {msg("doContinue")}
                </Link>
            )}
        </Template>
    );
}
