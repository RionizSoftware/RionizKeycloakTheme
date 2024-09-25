import { Fragment } from "react";
import { clsx } from "rionizkeycloakify/tools/clsx";
import type { PageProps } from "rionizkeycloakify/login/pages/PageProps";
import { getKcClsx } from "rionizkeycloakify/login/lib/kcClsx";
import { useScript } from "rionizkeycloakify/login/pages/LoginPasskeysConditionalAuthenticate.useScript";
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
import { styles } from "../styles/pages/LoginPasskeysConditionalAuthenticate.ts";
export default function LoginPasskeysConditionalAuthenticate(
    props: PageProps<
        Extract<
            KcContext,
            {
                pageId: "login-passkeys-conditional-authenticate.ftl";
            }
        >,
        I18n
    >
) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
    const {
        messagesPerField,
        login,
        url,
        usernameHidden,
        shouldDisplayAuthenticators,
        authenticators,
        registrationDisabled,
        realm
    } = kcContext;
    const { msg, msgStr, advancedMsg } = i18n;
    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });
    const authButtonId = "authenticateWebAuthnButton";
    useScript({ authButtonId, kcContext, i18n });
    return (
        <Template
            id="LoginPasskeysConditionalAuthenticate_Template_1"
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            headerNode={msg("passkey-login-title")}
            infoNode={
                realm.registrationAllowed &&
                !registrationDisabled && (
                    <Box id="kc-registration">
                        ${msg("noAccount")}{" "}
                        <Link
                            id="LoginPasskeysConditionalAuthenticate_a_1"
                            tabIndex={6}
                            href={url.registrationUrl}
                        >
                            {msg("doRegister")}
                        </Link>
                    </Box>
                )
            }
        >
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

            <Box
                id="LoginPasskeysConditionalAuthenticate_div_2"
                no-bottom-margin="true"
                style={{ marginBottom: 0 }}
            >
                {authenticators !== undefined &&
                    Object.keys(authenticators).length !== 0 && (
                        <>
                            <Box id="authn_select" component="form">
                                {authenticators.authenticators.map((authenticator, i) => (
                                    <TextField
                                        id="LoginPasskeysConditionalAuthenticate_input_7"
                                        key={i}
                                        type="hidden"
                                        name="authn_use_chk"
                                        readOnly
                                        value={authenticator.credentialId}
                                    />
                                ))}
                            </Box>
                            {shouldDisplayAuthenticators && (
                                <>
                                    {authenticators.authenticators.length > 1 && (
                                        <Typography id="LoginPasskeysConditionalAuthenticate_p_1">
                                            {msg("passkey-available-authenticators")}
                                        </Typography>
                                    )}
                                    <Box id="LoginPasskeysConditionalAuthenticate_div_3">
                                        {authenticators.authenticators.map(
                                            (authenticator, i) => (
                                                <Box
                                                    key={i}
                                                    id={`kc-webauthn-authenticator-item-${i}`}
                                                >
                                                    <i id="LoginPasskeysConditionalAuthenticate_i_1" />
                                                    <Box id="LoginPasskeysConditionalAuthenticate_div_5">
                                                        {advancedMsg(authenticator.label)}

                                                        {authenticator.transports !==
                                                            undefined &&
                                                            authenticator.transports
                                                                .displayNameProperties !==
                                                                undefined &&
                                                            authenticator.transports
                                                                .displayNameProperties
                                                                .length !== 0 && (
                                                                <Box
                                                                    id={`kc-webauthn-authenticator-transport-${i}`}
                                                                >
                                                                    {authenticator.transports.displayNameProperties.map(
                                                                        (
                                                                            nameProperty,
                                                                            i,
                                                                            arr
                                                                        ) => (
                                                                            <Box
                                                                                id="LoginPasskeysConditionalAuthenticate_Fragment_1"
                                                                                key={i}
                                                                            >
                                                                                <span
                                                                                    id="LoginPasskeysConditionalAuthenticate_span_2"
                                                                                    key={
                                                                                        i
                                                                                    }
                                                                                >
                                                                                    {" "}
                                                                                    {advancedMsg(
                                                                                        nameProperty
                                                                                    )}{" "}
                                                                                </span>
                                                                                {i !==
                                                                                    arr.length -
                                                                                        1 && (
                                                                                    <span id="LoginPasskeysConditionalAuthenticate_span_3">
                                                                                        ,{" "}
                                                                                    </span>
                                                                                )}
                                                                            </Box>
                                                                        )
                                                                    )}
                                                                </Box>
                                                            )}

                                                        {msg("passkey-createdAt-label")}
                                                        {authenticator.createdAt}
                                                    </Box>
                                                </Box>
                                            )
                                        )}
                                    </Box>
                                </>
                            )}
                            <Box id="kc-form">
                                {realm.password && (
                                    <Box
                                        id="kc-form-passkey"
                                        action={url.loginAction}
                                        method="post"
                                        style={{ display: "none" }}
                                        onSubmit={event => {
                                            try {
                                                // @ts-expect-error
                                                event.target.login.disabled = true;
                                            } catch {}
                                            return true;
                                        }}
                                        component="form"
                                    >
                                        {!usernameHidden && (
                                            <Box id="LoginPasskeysConditionalAuthenticate_div_12">
                                                <FormLabel
                                                    id="LoginPasskeysConditionalAuthenticate_label_1"
                                                    htmlFor="username"
                                                >
                                                    {msg("passkey-autofill-select")}
                                                </FormLabel>
                                                <TextField
                                                    tabIndex={1}
                                                    id="username"
                                                    aria-invalid={messagesPerField.existsError(
                                                        "username"
                                                    )}
                                                    name="username"
                                                    defaultValue={login.username ?? ""}
                                                    //autoComplete="username webauthn"
                                                    type="text"
                                                    autoFocus
                                                    autoComplete="off"
                                                />
                                                {messagesPerField.existsError(
                                                    "username"
                                                ) && (
                                                    <span
                                                        id="input-error-username"
                                                        aria-live="polite"
                                                    >
                                                        {messagesPerField.get("username")}
                                                    </span>
                                                )}
                                            </Box>
                                        )}
                                    </Box>
                                )}
                                <Box
                                    id="kc-form-passkey-button"
                                    style={{ display: "none" }}
                                >
                                    <TextField
                                        id={authButtonId}
                                        type="button"
                                        autoFocus
                                        value={msgStr("passkey-doAuthenticate")}
                                    />
                                </Box>
                            </Box>
                        </>
                    )}
            </Box>
        </Template>
    );
}
