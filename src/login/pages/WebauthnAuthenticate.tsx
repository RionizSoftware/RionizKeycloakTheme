import { Fragment } from "react";
import { clsx } from "rionizkeycloakify/tools/clsx";
import { getKcClsx } from "rionizkeycloakify/login/lib/kcClsx";
import { useScript } from "rionizkeycloakify/login/pages/WebauthnAuthenticate.useScript";
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
import { styles } from "../styles/pages/WebauthnAuthenticate.ts";
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
        <Template
            id="WebauthnAuthenticate_Template_1"
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayInfo={realm.registrationAllowed && !registrationDisabled}
            infoNode={
                <Box
                    id="WebauthnAuthenticate_Box_1"
                    sx={styles.WebauthnAuthenticate_Box_1}
                >
                    {msg("noAccount")}{" "}
                    <Link
                        tabIndex={6}
                        href={url.registrationUrl}
                        id="WebauthnAuthenticate_Link_1"
                        sx={styles.WebauthnAuthenticate_Link_1}
                    >
                        {msg("doRegister")}
                    </Link>
                </Box>
            }
            headerNode={msg("webauthn-login-title")}
        >
            <Box id="WebauthnAuthenticate_Box_2" sx={styles.WebauthnAuthenticate_Box_2}>
                <Box
                    action={url.loginAction}
                    method="post"
                    component="form"
                    id="WebauthnAuthenticate_Box_3"
                    sx={styles.WebauthnAuthenticate_Box_3}
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
                    id="WebauthnAuthenticate_Box_4"
                    sx={styles.WebauthnAuthenticate_Box_4}
                >
                    {authenticators && (
                        <>
                            <Box
                                component="form"
                                id="WebauthnAuthenticate_Box_5"
                                sx={styles.WebauthnAuthenticate_Box_5}
                            >
                                {authenticators.authenticators.map(authenticator => (
                                    <TextField
                                        type="hidden"
                                        name="authn_use_chk"
                                        value={authenticator.credentialId}
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
                                        id="WebauthnAuthenticate_Box_6"
                                        sx={styles.WebauthnAuthenticate_Box_6}
                                    >
                                        {authenticators.authenticators.map(
                                            (authenticator, i) => (
                                                <Box
                                                    key={i}
                                                    id="WebauthnAuthenticate_Box_7"
                                                    sx={styles.WebauthnAuthenticate_Box_7}
                                                >
                                                    <Box
                                                        id="WebauthnAuthenticate_Box_8"
                                                        sx={
                                                            styles.WebauthnAuthenticate_Box_8
                                                        }
                                                    >
                                                        <i id="WebauthnAuthenticate_i_1" />
                                                    </Box>
                                                    <Box
                                                        id="WebauthnAuthenticate_Box_9"
                                                        sx={
                                                            styles.WebauthnAuthenticate_Box_9
                                                        }
                                                    >
                                                        {advancedMsg(authenticator.label)}

                                                        {authenticator.transports
                                                            .displayNameProperties
                                                            ?.length && (
                                                            <Box
                                                                id="WebauthnAuthenticate_Box_10"
                                                                sx={
                                                                    styles.WebauthnAuthenticate_Box_10
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
                                                                                arr.length -
                                                                                    1
                                                                        })
                                                                    )
                                                                    .map(
                                                                        ({
                                                                            displayNameProperty,
                                                                            hasNext
                                                                        }) => (
                                                                            <Box
                                                                                key={
                                                                                    displayNameProperty
                                                                                }
                                                                                id="WebauthnAuthenticate_Box_11"
                                                                                sx={
                                                                                    styles.WebauthnAuthenticate_Box_11
                                                                                }
                                                                            >
                                                                                {advancedMsg(
                                                                                    displayNameProperty
                                                                                )}
                                                                                {hasNext && (
                                                                                    <span id="WebauthnAuthenticate_span_2">
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
                                                </Box>
                                            )
                                        )}
                                    </Box>
                                </>
                            )}
                        </>
                    )}

                    <TextField
                        type="button"
                        autoFocus
                        value={msgStr("webauthn-doAuthenticate")}
                        id="WebauthnAuthenticate_TextField_8"
                        sx={styles.WebauthnAuthenticate_TextField_8}
                    />
                </Box>
            </Box>
        </Template>
    );
}
