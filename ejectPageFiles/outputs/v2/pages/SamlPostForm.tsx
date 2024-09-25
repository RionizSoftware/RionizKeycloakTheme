import { useEffect, useState } from "react";
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
import { styles } from "../styles/pages/SamlPostForm.ts";
export default function SamlPostForm(
    props: PageProps<
        Extract<
            KcContext,
            {
                pageId: "saml-post-form.ftl";
            }
        >,
        I18n
    >
) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
    const { msgStr, msg } = i18n;
    const { samlPost } = kcContext;
    const [htmlFormElement, setHtmlFormElement] = useState<HTMLFormElement | null>(null);
    useEffect(() => {
        if (htmlFormElement === null) {
            return;
        }
        // Storybook
        if (samlPost.url === "#") {
            alert("In a real Keycloak the user would be redirected immediately");
            return;
        }
        htmlFormElement.submit();
    }, [htmlFormElement]);
    return (
        <Template
            id="SamlPostForm_Template_1"
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            headerNode={msg("saml.post-form.title")}
        >
            <Typography
                id="SamlPostForm_Typography_1"
                sx={styles.SamlPostForm_Typography_1}
            >
                {msg("saml.post-form.message")}
            </Typography>
            <Box
                name="saml-post-binding"
                method="post"
                action={samlPost.url}
                ref={setHtmlFormElement}
                component="form"
                id="SamlPostForm_Box_1"
                sx={styles.SamlPostForm_Box_1}
            >
                {samlPost.SAMLRequest && (
                    <TextField
                        type="hidden"
                        name="SAMLRequest"
                        value={samlPost.SAMLRequest}
                        id="SamlPostForm_TextField_1"
                        sx={styles.SamlPostForm_TextField_1}
                    />
                )}
                {samlPost.SAMLResponse && (
                    <TextField
                        type="hidden"
                        name="SAMLResponse"
                        value={samlPost.SAMLResponse}
                        id="SamlPostForm_TextField_2"
                        sx={styles.SamlPostForm_TextField_2}
                    />
                )}
                {samlPost.relayState && (
                    <TextField
                        type="hidden"
                        name="RelayState"
                        value={samlPost.relayState}
                        id="SamlPostForm_TextField_3"
                        sx={styles.SamlPostForm_TextField_3}
                    />
                )}
                <noscript id="SamlPostForm_noscript_1">
                    <Typography
                        id="SamlPostForm_Typography_2"
                        sx={styles.SamlPostForm_Typography_2}
                    >
                        {msg("saml.post-form.js-disabled")}
                    </Typography>
                    <TextField
                        type="submit"
                        value={msgStr("doContinue")}
                        id="SamlPostForm_TextField_4"
                        sx={styles.SamlPostForm_TextField_4}
                    />
                </noscript>
            </Box>
        </Template>
    );
}
