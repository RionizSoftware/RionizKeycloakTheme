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
        <Template id="FrontchannelLogout_Template_1">
            <Typography
                id="FrontchannelLogout_Typography_1"
                sx={styles.FrontchannelLogout_Typography_1}
            >
                {msg("frontchannel-logout.message")}
            </Typography>
            <List id="FrontchannelLogout_List_1" sx={styles.FrontchannelLogout_List_1}>
                {logout.clients.map(client => (
                    <ListItem
                        id="FrontchannelLogout_ListItem_1"
                        sx={styles.FrontchannelLogout_ListItem_1}
                    >
                        {client.name}
                        <iframe id="FrontchannelLogout_iframe_1" />
                    </ListItem>
                ))}
            </List>
            {logout.logoutRedirectUri && (
                <Link
                    href={logout.logoutRedirectUri}
                    id="FrontchannelLogout_Link_1"
                    sx={styles.FrontchannelLogout_Link_1}
                >
                    {msg("doContinue")}
                </Link>
            )}
        </Template>
    );
}
