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
                    <Typography id="LoginOauthGrant_p_1">
                        {client.name
                            ? msg("oauthGrantTitle", advancedMsgStr(client.name))
                            : msg("oauthGrantTitle", client.clientId)}
                    </Typography>
                </>
            }
        >
            <Box id="kc-oauth">
                <h3 id="LoginOauthGrant_h3_1">{msg("oauthGrantRequest")}</h3>
                <List id="LoginOauthGrant_ul_1">
                    {oauth.clientScopesRequested.map(clientScope => (
                        <ListItem
                            id="LoginOauthGrant_li_1"
                            key={clientScope.consentScreenText}
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
                                        id="LoginOauthGrant_a_1"
                                        href={client.attributes.tosUri}
                                        target="_blank"
                                    >
                                        {msg("oauthGrantTos")}
                                    </Link>
                                </>
                            )}
                            {client.attributes.policyUri && (
                                <>
                                    {msg("oauthGrantReview")}
                                    <Link
                                        id="LoginOauthGrant_a_2"
                                        href={client.attributes.policyUri}
                                        target="_blank"
                                    >
                                        {msg("oauthGrantPolicy")}
                                    </Link>
                                </>
                            )}
                        </h3>
                    ))}

                <Box
                    id="LoginOauthGrant_form_1"
                    action={url.oauthAction}
                    method="POST"
                    component="form"
                >
                    <TextField
                        id="LoginOauthGrant_input_1"
                        type="hidden"
                        name="code"
                        value={oauth.code}
                    />
                    <Box id="LoginOauthGrant_div_2">
                        <TextField
                            name="accept"
                            id="kc-login"
                            type="submit"
                            value={msgStr("doYes")}
                        />
                        <TextField
                            name="cancel"
                            id="kc-cancel"
                            type="submit"
                            value={msgStr("doNo")}
                        />
                    </Box>
                </Box>
                <Box id="LoginOauthGrant_div_7"></Box>
            </Box>
        </Template>
    );
}
