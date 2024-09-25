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
        <Template id="LoginOauthGrant_Template_1">
            <Box id="LoginOauthGrant_Box_1" sx={styles.LoginOauthGrant_Box_1}>
                <h3 id="LoginOauthGrant_h3_1">{msg("oauthGrantRequest")}</h3>
                <List id="LoginOauthGrant_List_1" sx={styles.LoginOauthGrant_List_1}>
                    {oauth.clientScopesRequested.map(clientScope => (
                        <ListItem
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
                    component="form"
                    id="LoginOauthGrant_Box_2"
                    sx={styles.LoginOauthGrant_Box_2}
                >
                    <TextField
                        id="LoginOauthGrant_TextField_1"
                        sx={styles.LoginOauthGrant_TextField_1}
                    />
                    <Box id="LoginOauthGrant_Box_3" sx={styles.LoginOauthGrant_Box_3}>
                        <TextField
                            className={kcClsx(
                                "kcButtonClass",
                                "kcButtonPrimaryClass",
                                "kcButtonLargeClass"
                            )}
                            name="accept"
                            type="submit"
                            value={msgStr("doYes")}
                            id="LoginOauthGrant_TextField_2"
                            sx={styles.LoginOauthGrant_TextField_2}
                        />
                        <TextField
                            className={kcClsx(
                                "kcButtonClass",
                                "kcButtonDefaultClass",
                                "kcButtonLargeClass"
                            )}
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
