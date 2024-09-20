import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import { PageProps } from "keycloakify/login/pages/PageProps";
import { KcContext } from "../KcContext";
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
import { styles } from "./styles/LoginOauthGrant.ts";
export default function LoginOauthGrant(
    props: PageProps<
        Extract<
            KcContext,
            {
                pageId: "login-oauth-grant.ftl";
            }
        >,
        I18n
    >
) {
    const { kcContext, i18n, doUseDefaultCss, classes, Template } = props;
    const { url, oauth, client } = kcContext;
    const { msg, msgStr, advancedMsg, advancedMsgStr } = i18n;
    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });
    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            bodyClassName="oauth"
            headerNode={
                <>
                    {client.attributes.logoUri && <img src={client.attributes.logoUri} />}
                    <Typography id="Typography_1" sx={styles.Typography_1}>
                        {client.name
                            ? msg("oauthGrantTitle", advancedMsgStr(client.name))
                            : msg("oauthGrantTitle", client.clientId)}
                    </Typography>
                </>
            }
        >
            <Box id="Box_1" sx={styles.Box_1}>
                <h3>{msg("oauthGrantRequest")}</h3>
                <List id="List_1" sx={styles.List_1}>
                    {oauth.clientScopesRequested.map(clientScope => (
                        <ListItem
                            key={clientScope.consentScreenText}
                            id="ListItem_1"
                            sx={styles.ListItem_1}
                        >
                            <span>
                                {advancedMsg(clientScope.consentScreenText)}
                                {clientScope.dynamicScopeParameter && (
                                    <>
                                        : <b>{clientScope.dynamicScopeParameter}</b>
                                    </>
                                )}
                            </span>
                        </ListItem>
                    ))}
                </List>

                {client.attributes.policyUri ||
                    (client.attributes.tosUri && (
                        <h3>
                            {client.name
                                ? msg(
                                      "oauthGrantInformation",
                                      advancedMsgStr(client.name)
                                  )
                                : msg("oauthGrantInformation", client.clientId)}
                            {client.attributes.tosUri && (
                                <>
                                    {msg("oauthGrantReview")}
                                    <Link
                                        href={client.attributes.tosUri}
                                        target="_blank"
                                        id="Link_1"
                                        sx={styles.Link_1}
                                    >
                                        {msg("oauthGrantTos")}
                                    </Link>
                                </>
                            )}
                            {client.attributes.policyUri && (
                                <>
                                    {msg("oauthGrantReview")}
                                    <Link
                                        href={client.attributes.policyUri}
                                        target="_blank"
                                        id="Link_2"
                                        sx={styles.Link_2}
                                    >
                                        {msg("oauthGrantPolicy")}
                                    </Link>
                                </>
                            )}
                        </h3>
                    ))}

                <Box
                    action={url.oauthAction}
                    method="POST"
                    component="form"
                    id="Box_2"
                    sx={styles.Box_2}
                >
                    <TextField
                        type="hidden"
                        name="code"
                        value={oauth.code}
                        id="TextField_1"
                        sx={styles.TextField_1}
                    />
                    <Box id="Box_3" sx={styles.Box_3}>
                        <TextField
                            name="accept"
                            type="submit"
                            value={msgStr("doYes")}
                            id="TextField_2"
                            sx={styles.TextField_2}
                        />
                        <TextField
                            name="cancel"
                            type="submit"
                            value={msgStr("doNo")}
                            id="TextField_3"
                            sx={styles.TextField_3}
                        />
                    </Box>
                </Box>
                <Box id="Box_4" sx={styles.Box_4}></Box>
            </Box>
        </Template>
    );
}
