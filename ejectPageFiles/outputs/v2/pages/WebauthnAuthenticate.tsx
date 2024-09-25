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
                <Box id="kc-registration">
                    {msg("noAccount")}{" "}
                    <Link
                        id="WebauthnAuthenticate_a_1"
                        tabIndex={6}
                        href={url.registrationUrl}
                    >
                        {msg("doRegister")}
                    </Link>
                </Box>
            }
            headerNode={msg("webauthn-login-title")}
        >
            <Box id="kc-form-webauthn">
                <Box id="webauth" action={url.loginAction} method="post" component="form">
                    <TextField type="hidden" id="clientDataJSON" name="clientDataJSON" />
                    <TextField
                        type="hidden"
                        id="authenticatorData"
                        name="authenticatorData"
                    />
                    <TextField type="hidden" id="signature" name="signature" />
                    <TextField type="hidden" id="credentialId" name="credentialId" />
                    <TextField type="hidden" id="userHandle" name="userHandle" />
                    <TextField type="hidden" id="error" name="error" />
                </Box>
                <Box id="WebauthnAuthenticate_div_3">
                    {authenticators && (
                        <>
                            <Box id="authn_select" component="form">
                                {authenticators.authenticators.map(authenticator => (
                                    <TextField
                                        id="WebauthnAuthenticate_input_7"
                                        type="hidden"
                                        name="authn_use_chk"
                                        value={authenticator.credentialId}
                                    />
                                ))}
                            </Box>

                            {shouldDisplayAuthenticators && (
                                <>
                                    {authenticators.authenticators.length > 1 && (
                                        <Typography id="WebauthnAuthenticate_p_1">
                                            {msg("webauthn-available-authenticators")}
                                        </Typography>
                                    )}
                                    <Box id="WebauthnAuthenticate_div_4">
                                        {authenticators.authenticators.map(
                                            (authenticator, i) => (
                                                <Box
                                                    key={i}
                                                    id={`kc-webauthn-authenticator-item-${i}`}
                                                >
                                                    <Box id="WebauthnAuthenticate_div_6">
                                                        <i id="WebauthnAuthenticate_i_1" />
                                                    </Box>
                                                    <Box id="WebauthnAuthenticate_div_7">
                                                        {advancedMsg(authenticator.label)}

                                                        {authenticator.transports
                                                            .displayNameProperties
                                                            ?.length && (
                                                            <Box
                                                                id={`kc-webauthn-authenticator-transport-${i}`}
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
                                                                                id="WebauthnAuthenticate_Fragment_1"
                                                                                key={
                                                                                    displayNameProperty
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
                        id={authButtonId}
                        type="button"
                        autoFocus
                        value={msgStr("webauthn-doAuthenticate")}
                    />
                </Box>
            </Box>
        </Template>
    );
}
