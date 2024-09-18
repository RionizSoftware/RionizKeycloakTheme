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
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayInfo={realm.registrationAllowed && !registrationDisabled}
            infoNode={
                <Box id="Box_1" sx={styles.Box_1}>
                    {msg("noAccount")}{" "}
                    <Link
                        tabIndex={6}
                        href={url.registrationUrl}
                        id="Link_1"
                        sx={styles.Link_1}
                    >
                        {msg("doRegister")}
                    </Link>
                </Box>
            }
            headerNode={msg("webauthn-login-title")}
        >
            <Box id="Box_2" sx={styles.Box_2}>
                <Box
                    action={url.loginAction}
                    method="post"
                    component="form"
                    id="Box_3"
                    sx={styles.Box_3}
                >
                    <TextField
                        type="hidden"
                        name="clientDataJSON"
                        id="TextField_1"
                        sx={styles.TextField_1}
                    />
                    <TextField
                        type="hidden"
                        name="authenticatorData"
                        id="TextField_2"
                        sx={styles.TextField_2}
                    />
                    <TextField
                        type="hidden"
                        name="signature"
                        id="TextField_3"
                        sx={styles.TextField_3}
                    />
                    <TextField
                        type="hidden"
                        name="credentialId"
                        id="TextField_4"
                        sx={styles.TextField_4}
                    />
                    <TextField
                        type="hidden"
                        name="userHandle"
                        id="TextField_5"
                        sx={styles.TextField_5}
                    />
                    <TextField
                        type="hidden"
                        name="error"
                        id="TextField_6"
                        sx={styles.TextField_6}
                    />
                </Box>
                <Box id="Box_4" sx={styles.Box_4}>
                    {authenticators && (
                        <>
                            <Box component="form" id="Box_5" sx={styles.Box_5}>
                                {authenticators.authenticators.map(authenticator => (
                                    <TextField
                                        type="hidden"
                                        name="authn_use_chk"
                                        value={authenticator.credentialId}
                                        id="TextField_7"
                                        sx={styles.TextField_7}
                                    />
                                ))}
                            </Box>

                            {shouldDisplayAuthenticators && (
                                <>
                                    {authenticators.authenticators.length > 1 && (
                                        <Typography
                                            id="Typography_1"
                                            sx={styles.Typography_1}
                                        >
                                            {msg("webauthn-available-authenticators")}
                                        </Typography>
                                    )}
                                    <Box id="Box_6" sx={styles.Box_6}>
                                        {authenticators.authenticators.map(
                                            (authenticator, i) => (
                                                <Box key={i} id="Box_7" sx={styles.Box_7}>
                                                    <Box id="Box_8" sx={styles.Box_8}>
                                                        <i />
                                                    </Box>
                                                    <Box id="Box_9" sx={styles.Box_9}>
                                                        {advancedMsg(authenticator.label)}

                                                        {authenticator.transports
                                                            .displayNameProperties
                                                            ?.length && (
                                                            <Box
                                                                id="Box_10"
                                                                sx={styles.Box_10}
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
                                                                                id="Box_11"
                                                                                sx={
                                                                                    styles.Box_11
                                                                                }
                                                                            >
                                                                                {advancedMsg(
                                                                                    displayNameProperty
                                                                                )}
                                                                                {hasNext && (
                                                                                    <span>
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
                        id="TextField_8"
                        sx={styles.TextField_8}
                    />
                </Box>
            </Box>
        </Template>
    );
}
