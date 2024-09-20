import { useEffect, useState } from "react";
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
import { styles } from "./styles/SamlPostForm.ts";
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
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            headerNode={msg("saml.post-form.title")}
        >
            <Typography id="Typography_1" sx={styles.Typography_1}>
                {msg("saml.post-form.message")}
            </Typography>
            <Box
                name="saml-post-binding"
                method="post"
                action={samlPost.url}
                ref={setHtmlFormElement}
                component="form"
                id="Box_1"
                sx={styles.Box_1}
            >
                {samlPost.SAMLRequest && (
                    <TextField
                        type="hidden"
                        name="SAMLRequest"
                        value={samlPost.SAMLRequest}
                        id="TextField_1"
                        sx={styles.TextField_1}
                    />
                )}
                {samlPost.SAMLResponse && (
                    <TextField
                        type="hidden"
                        name="SAMLResponse"
                        value={samlPost.SAMLResponse}
                        id="TextField_2"
                        sx={styles.TextField_2}
                    />
                )}
                {samlPost.relayState && (
                    <TextField
                        type="hidden"
                        name="RelayState"
                        value={samlPost.relayState}
                        id="TextField_3"
                        sx={styles.TextField_3}
                    />
                )}
                <noscript>
                    <Typography id="Typography_2" sx={styles.Typography_2}>
                        {msg("saml.post-form.js-disabled")}
                    </Typography>
                    <TextField
                        type="submit"
                        value={msgStr("doContinue")}
                        id="TextField_4"
                        sx={styles.TextField_4}
                    />
                </noscript>
            </Box>
        </Template>
    );
}
