import { getKcClsx } from "rionizkeycloakify/login/lib/kcClsx";
import { PageProps } from "rionizkeycloakify/login/pages/PageProps";
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
import { styles } from "../styles/pages/LoginOauthGrant.ts";
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
            id="LoginOauthGrant_Template_1"
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            bodyClassName="oauth"
            headerNode={
                <>
                    {client.attributes.logoUri && (
                        <img id="LoginOauthGrant_img_1" src={client.attributes.logoUri} />
                    )}
                    <Typography
                        id="LoginOauthGrant_Typography_1"
                        sx={styles.LoginOauthGrant_Typography_1}
                    >
                        {client.name
                            ? msg("oauthGrantTitle", advancedMsgStr(client.name))
                            : msg("oauthGrantTitle", client.clientId)}
                    </Typography>
                </>
            }
        >
            <Box id="LoginOauthGrant_Box_1" sx={styles.LoginOauthGrant_Box_1}>
                <h3 id="LoginOauthGrant_h3_1">{msg("oauthGrantRequest")}</h3>
                <List id="LoginOauthGrant_List_1" sx={styles.LoginOauthGrant_List_1}>
                    {oauth.clientScopesRequested.map(clientScope => (
                        <ListItem
                            key={clientScope.consentScreenText}
                            id="LoginOauthGrant_ListItem_1"
                            sx={styles.LoginOauthGrant_ListItem_1}
                        >
                            <span id="LoginOauthGrant_span_1">
                                {advancedMsg(clientScope.consentScreenText)}
                                {clientScope.dynamicScopeParameter && (
                                    <>
                                        :{" "}
                                        <b id="LoginOauthGrant_b_1">
                                            {clientScope.dynamicScopeParameter}
                                        </b>
                                    </>
                                )}
                            </span>
                        </ListItem>
                    ))}
                </List>

                {client.attributes.policyUri ||
                    (client.attributes.tosUri && (
                        <h3 id="LoginOauthGrant_h3_2">
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
                                        id="LoginOauthGrant_Link_1"
                                        sx={styles.LoginOauthGrant_Link_1}
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
                                        id="LoginOauthGrant_Link_2"
                                        sx={styles.LoginOauthGrant_Link_2}
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
                    id="LoginOauthGrant_Box_2"
                    sx={styles.LoginOauthGrant_Box_2}
                >
                    <TextField
                        type="hidden"
                        name="code"
                        value={oauth.code}
                        id="LoginOauthGrant_TextField_1"
                        sx={styles.LoginOauthGrant_TextField_1}
                    />
                    <Box id="LoginOauthGrant_Box_3" sx={styles.LoginOauthGrant_Box_3}>
                        <TextField
                            name="accept"
                            type="submit"
                            value={msgStr("doYes")}
                            id="LoginOauthGrant_TextField_2"
                            sx={styles.LoginOauthGrant_TextField_2}
                        />
                        <TextField
                            name="cancel"
                            type="submit"
                            value={msgStr("doNo")}
                            id="LoginOauthGrant_TextField_3"
                            sx={styles.LoginOauthGrant_TextField_3}
                        />
                    </Box>
                </Box>
                <Box id="LoginOauthGrant_Box_4" sx={styles.LoginOauthGrant_Box_4}></Box>
            </Box>
        </Template>
    );
}
