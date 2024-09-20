import { Fragment } from "react";
import { clsx } from "keycloakify/tools/clsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import { useScript } from "keycloakify/login/pages/LoginPasskeysConditionalAuthenticate.useScript";
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
import { styles } from "./styles/LoginPasskeysConditionalAuthenticate.ts";
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
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            headerNode={msg("passkey-login-title")}
            infoNode={
                realm.registrationAllowed &&
                !registrationDisabled && (
                    <Box id="Box_1" sx={styles.Box_1}>
                        ${msg("noAccount")}{" "}
                        <Link
                            tabIndex={6}
                            href={url.registrationUrl}
                            id="Link_1"
                            sx={styles.Link_1}
                        >
                            {msg("doRegister")}
                        </Link>
                    </Box>
                )
            }
        >
            <Box
                action={url.loginAction}
                method="post"
                component="form"
                id="Box_2"
                sx={styles.Box_2}
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

            <Box
                no-bottom-margin="true"
                style={{ marginBottom: 0 }}
                id="Box_3"
                sx={styles.Box_3}
            >
                {authenticators !== undefined &&
                    Object.keys(authenticators).length !== 0 && (
                        <>
                            <Box component="form" id="Box_4" sx={styles.Box_4}>
                                {authenticators.authenticators.map((authenticator, i) => (
                                    <TextField
                                        key={i}
                                        type="hidden"
                                        name="authn_use_chk"
                                        readOnly
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
                                            {msg("passkey-available-authenticators")}
                                        </Typography>
                                    )}
                                    <Box id="Box_5" sx={styles.Box_5}>
                                        {authenticators.authenticators.map(
                                            (authenticator, i) => (
                                                <Box key={i} id="Box_6" sx={styles.Box_6}>
                                                    <i />
                                                    <Box id="Box_7" sx={styles.Box_7}>
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
                                                                    id="Box_8"
                                                                    sx={styles.Box_8}
                                                                >
                                                                    {authenticator.transports.displayNameProperties.map(
                                                                        (
                                                                            nameProperty,
                                                                            i,
                                                                            arr
                                                                        ) => (
                                                                            <Box
                                                                                key={i}
                                                                                id="Box_9"
                                                                                sx={
                                                                                    styles.Box_9
                                                                                }
                                                                            >
                                                                                <span
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
                                                                                    <span>
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
                            <Box id="Box_10" sx={styles.Box_10}>
                                {realm.password && (
                                    <Box
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
                                        id="Box_11"
                                        sx={styles.Box_11}
                                    >
                                        {!usernameHidden && (
                                            <Box id="Box_12" sx={styles.Box_12}>
                                                <FormLabel
                                                    htmlFor="username"
                                                    id="FormLabel_1"
                                                    sx={styles.FormLabel_1}
                                                >
                                                    {msg("passkey-autofill-select")}
                                                </FormLabel>
                                                <TextField
                                                    tabIndex={1}
                                                    aria-invalid={messagesPerField.existsError(
                                                        "username"
                                                    )}
                                                    name="username"
                                                    defaultValue={login.username ?? ""}
                                                    //autoComplete="username webauthn"
                                                    type="text"
                                                    autoFocus
                                                    autoComplete="off"
                                                    id="TextField_8"
                                                    sx={styles.TextField_8}
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
                                    style={{ display: "none" }}
                                    id="Box_13"
                                    sx={styles.Box_13}
                                >
                                    <TextField
                                        type="button"
                                        autoFocus
                                        value={msgStr("passkey-doAuthenticate")}
                                        id="TextField_9"
                                        sx={styles.TextField_9}
                                    />
                                </Box>
                            </Box>
                        </>
                    )}
            </Box>
        </Template>
    );
}
