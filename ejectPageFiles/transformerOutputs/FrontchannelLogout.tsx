import { useEffect } from "react";
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
import { styles } from "./styles/FrontchannelLogout.ts";
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
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            documentTitle={msgStr("frontchannel-logout.title")}
            headerNode={msg("frontchannel-logout.title")}
        >
            <Typography id="Typography_1" sx={styles.Typography_1}>
                {msg("frontchannel-logout.message")}
            </Typography>
            <List id="List_1" sx={styles.List_1}>
                {logout.clients.map(client => (
                    <ListItem key={client.name} id="ListItem_1" sx={styles.ListItem_1}>
                        {client.name}
                        <iframe
                            src={client.frontChannelLogoutUrl}
                            style={{ display: "none" }}
                        />
                    </ListItem>
                ))}
            </List>
            {logout.logoutRedirectUri && (
                <Link href={logout.logoutRedirectUri} id="Link_1" sx={styles.Link_1}>
                    {msg("doContinue")}
                </Link>
            )}
        </Template>
    );
}
