import { Fragment } from "react";
import { clsx } from "keycloakify/tools/clsx";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import { useScript } from "keycloakify/login/pages/WebauthnAuthenticate.useScript";
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
import { styles } from "./styles/WebauthnAuthenticate.ts";
export default function WebauthnAuthenticate(
    props: PageProps<
        Extract<
            KcContext,
            {
                pageId: "webauthn-authenticate.ftl";
            }
        >,
        I18n
    >
) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
    const { kcClsx } = getKcClsx({ doUseDefaultCss, classes });
    const {
        url,
        realm,
        registrationDisabled,
        authenticators,
        shouldDisplayAuthenticators
    } = kcContext;
    const { msg, msgStr, advancedMsg } = i18n;
    const authButtonId = "authenticateWebAuthnButton";
    useScript({
        authButtonId,
        kcContext,
        i18n
    });
    return (
        <Template id="WebauthnAuthenticate_Template_1">
            <Box
                className={kcClsx("kcFormClass")}
                id="WebauthnAuthenticate_Box_1"
                sx={styles.WebauthnAuthenticate_Box_1}
            >
                <Box
                    action={url.loginAction}
                    method="post"
                    component="form"
                    id="WebauthnAuthenticate_Box_2"
                    sx={styles.WebauthnAuthenticate_Box_2}
                >
                    <TextField
                        type="hidden"
                        name="clientDataJSON"
                        id="WebauthnAuthenticate_TextField_1"
                        sx={styles.WebauthnAuthenticate_TextField_1}
                    />
                    <TextField
                        type="hidden"
                        name="authenticatorData"
                        id="WebauthnAuthenticate_TextField_2"
                        sx={styles.WebauthnAuthenticate_TextField_2}
                    />
                    <TextField
                        type="hidden"
                        name="signature"
                        id="WebauthnAuthenticate_TextField_3"
                        sx={styles.WebauthnAuthenticate_TextField_3}
                    />
                    <TextField
                        type="hidden"
                        name="credentialId"
                        id="WebauthnAuthenticate_TextField_4"
                        sx={styles.WebauthnAuthenticate_TextField_4}
                    />
                    <TextField
                        type="hidden"
                        name="userHandle"
                        id="WebauthnAuthenticate_TextField_5"
                        sx={styles.WebauthnAuthenticate_TextField_5}
                    />
                    <TextField
                        type="hidden"
                        name="error"
                        id="WebauthnAuthenticate_TextField_6"
                        sx={styles.WebauthnAuthenticate_TextField_6}
                    />
                </Box>
                <Box
                    id="WebauthnAuthenticate_Box_3"
                    sx={styles.WebauthnAuthenticate_Box_3}
                >
                    {authenticators && (
                        <>
                            <Box
                                className={kcClsx("kcFormClass")}
                                component="form"
                                id="WebauthnAuthenticate_Box_4"
                                sx={styles.WebauthnAuthenticate_Box_4}
                            >
                                {authenticators.authenticators.map(authenticator => (
                                    <TextField
                                        id="WebauthnAuthenticate_TextField_7"
                                        sx={styles.WebauthnAuthenticate_TextField_7}
                                    />
                                ))}
                            </Box>

                            {shouldDisplayAuthenticators && (
                                <>
                                    {authenticators.authenticators.length > 1 && (
                                        <Typography
                                            id="WebauthnAuthenticate_Typography_1"
                                            sx={styles.WebauthnAuthenticate_Typography_1}
                                        >
                                            {msg("webauthn-available-authenticators")}
                                        </Typography>
                                    )}
                                    <Box
                                        id="WebauthnAuthenticate_Box_5"
                                        sx={styles.WebauthnAuthenticate_Box_5}
                                    >
                                        {authenticators.authenticators.map(
                                            (authenticator, i) => (
                                                <Box
                                                    id="WebauthnAuthenticate_Box_6"
                                                    sx={styles.WebauthnAuthenticate_Box_6}
                                                >
                                                    <i id="WebauthnAuthenticate_i_1" />

                                                    {advancedMsg(authenticator.label)}

                                                    {authenticator.transports
                                                        .displayNameProperties
                                                        ?.length && (
                                                        <Box
                                                            id="WebauthnAuthenticate_Box_7"
                                                            sx={
                                                                styles.WebauthnAuthenticate_Box_7
                                                            }
                                                        >
                                                            {authenticator.transports.displayNameProperties
                                                                .map(
                                                                    (
                                                                        displayNameProperty,
                                                                        i,
                                                                        arr
                                                                    ) => ({
                                                                        displayNameProperty,
                                                                        hasNext:
                                                                            i !==
                                                                            arr.length - 1
                                                                    })
                                                                )
                                                                .map(
                                                                    ({
                                                                        displayNameProperty,
                                                                        hasNext
                                                                    }) => (
                                                                        <Box
                                                                            id="WebauthnAuthenticate_Box_8"
                                                                            sx={
                                                                                styles.WebauthnAuthenticate_Box_8
                                                                            }
                                                                        >
                                                                            {advancedMsg(
                                                                                displayNameProperty
                                                                            )}
                                                                            {hasNext && (
                                                                                <span id="WebauthnAuthenticate_span_1">
                                                                                    ,{" "}
                                                                                </span>
                                                                            )}
                                                                        </Box>
                                                                    )
                                                                )}
                                                        </Box>
                                                    )}

                                                    {msg("webauthn-createdAt-label")}

                                                    {authenticator.createdAt}
                                                </Box>
                                            )
                                        )}
                                    </Box>
                                </>
                            )}
                        </>
                    )}
                    <Box
                        className={kcClsx("kcFormButtonsClass")}
                        id="WebauthnAuthenticate_Box_9"
                        sx={styles.WebauthnAuthenticate_Box_9}
                    >
                        <TextField
                            id="WebauthnAuthenticate_TextField_8"
                            sx={styles.WebauthnAuthenticate_TextField_8}
                        />
                    </Box>
                </Box>
            </Box>
        </Template>
    );
}
