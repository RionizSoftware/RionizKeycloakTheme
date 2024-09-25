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
                    <Box
                        id="LoginPasskeysConditionalAuthenticate_Box_1"
                        sx={styles.LoginPasskeysConditionalAuthenticate_Box_1}
                    >
                        ${msg("noAccount")}{" "}
                        <Link
                            tabIndex={6}
                            href={url.registrationUrl}
                            id="LoginPasskeysConditionalAuthenticate_Link_1"
                            sx={styles.LoginPasskeysConditionalAuthenticate_Link_1}
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
                id="LoginPasskeysConditionalAuthenticate_Box_2"
                sx={styles.LoginPasskeysConditionalAuthenticate_Box_2}
            >
                <TextField
                    type="hidden"
                    name="clientDataJSON"
                    id="LoginPasskeysConditionalAuthenticate_TextField_1"
                    sx={styles.LoginPasskeysConditionalAuthenticate_TextField_1}
                />
                <TextField
                    type="hidden"
                    name="authenticatorData"
                    id="LoginPasskeysConditionalAuthenticate_TextField_2"
                    sx={styles.LoginPasskeysConditionalAuthenticate_TextField_2}
                />
                <TextField
                    type="hidden"
                    name="signature"
                    id="LoginPasskeysConditionalAuthenticate_TextField_3"
                    sx={styles.LoginPasskeysConditionalAuthenticate_TextField_3}
                />
                <TextField
                    type="hidden"
                    name="credentialId"
                    id="LoginPasskeysConditionalAuthenticate_TextField_4"
                    sx={styles.LoginPasskeysConditionalAuthenticate_TextField_4}
                />
                <TextField
                    type="hidden"
                    name="userHandle"
                    id="LoginPasskeysConditionalAuthenticate_TextField_5"
                    sx={styles.LoginPasskeysConditionalAuthenticate_TextField_5}
                />
                <TextField
                    type="hidden"
                    name="error"
                    id="LoginPasskeysConditionalAuthenticate_TextField_6"
                    sx={styles.LoginPasskeysConditionalAuthenticate_TextField_6}
                />
            </Box>

            <Box
                className={kcClsx("kcFormGroupClass")}
                no-bottom-margin="true"
                style={{ marginBottom: 0 }}
                id="LoginPasskeysConditionalAuthenticate_Box_3"
                sx={styles.LoginPasskeysConditionalAuthenticate_Box_3}
            >
                {authenticators !== undefined &&
                    Object.keys(authenticators).length !== 0 && (
                        <>
                            <Box
                                className={kcClsx("kcFormClass")}
                                component="form"
                                id="LoginPasskeysConditionalAuthenticate_Box_4"
                                sx={styles.LoginPasskeysConditionalAuthenticate_Box_4}
                            >
                                {authenticators.authenticators.map((authenticator, i) => (
                                    <TextField
                                        key={i}
                                        type="hidden"
                                        name="authn_use_chk"
                                        readOnly
                                        value={authenticator.credentialId}
                                        id="LoginPasskeysConditionalAuthenticate_TextField_7"
                                        sx={
                                            styles.LoginPasskeysConditionalAuthenticate_TextField_7
                                        }
                                    />
                                ))}
                            </Box>
                            {shouldDisplayAuthenticators && (
                                <>
                                    {authenticators.authenticators.length > 1 && (
                                        <Typography
                                            className={kcClsx(
                                                "kcSelectAuthListItemTitle"
                                            )}
                                            id="LoginPasskeysConditionalAuthenticate_Typography_1"
                                            sx={
                                                styles.LoginPasskeysConditionalAuthenticate_Typography_1
                                            }
                                        >
                                            {msg("passkey-available-authenticators")}
                                        </Typography>
                                    )}
                                    <Box
                                        className={kcClsx("kcFormClass")}
                                        id="LoginPasskeysConditionalAuthenticate_Box_5"
                                        sx={
                                            styles.LoginPasskeysConditionalAuthenticate_Box_5
                                        }
                                    >
                                        {authenticators.authenticators.map(
                                            (authenticator, i) => (
                                                <Box
                                                    key={i}
                                                    className={kcClsx(
                                                        "kcSelectAuthListItemClass"
                                                    )}
                                                    id="LoginPasskeysConditionalAuthenticate_Box_6"
                                                    sx={
                                                        styles.LoginPasskeysConditionalAuthenticate_Box_6
                                                    }
                                                >
                                                    <i
                                                        id="LoginPasskeysConditionalAuthenticate_i_1"
                                                        className={clsx(
                                                            (() => {
                                                                const className = kcClsx(
                                                                    authenticator
                                                                        .transports
                                                                        .iconClass as any
                                                                );
                                                                if (
                                                                    className ===
                                                                    authenticator
                                                                        .transports
                                                                        .iconClass
                                                                ) {
                                                                    return kcClsx(
                                                                        "kcWebAuthnDefaultIcon"
                                                                    );
                                                                }
                                                                return className;
                                                            })(),
                                                            kcClsx(
                                                                "kcSelectAuthListItemIconPropertyClass"
                                                            )
                                                        )}
                                                    />
                                                    <Box
                                                        className={kcClsx(
                                                            "kcSelectAuthListItemBodyClass"
                                                        )}
                                                        id="LoginPasskeysConditionalAuthenticate_Box_7"
                                                        sx={
                                                            styles.LoginPasskeysConditionalAuthenticate_Box_7
                                                        }
                                                    >
                                                        <Box
                                                            className={kcClsx(
                                                                "kcSelectAuthListItemHeadingClass"
                                                            )}
                                                            id="LoginPasskeysConditionalAuthenticate_Box_8"
                                                            sx={
                                                                styles.LoginPasskeysConditionalAuthenticate_Box_8
                                                            }
                                                        >
                                                            {advancedMsg(
                                                                authenticator.label
                                                            )}
                                                        </Box>
                                                        {authenticator.transports !==
                                                            undefined &&
                                                            authenticator.transports
                                                                .displayNameProperties !==
                                                                undefined &&
                                                            authenticator.transports
                                                                .displayNameProperties
                                                                .length !== 0 && (
                                                                <Box
                                                                    className={kcClsx(
                                                                        "kcSelectAuthListItemDescriptionClass"
                                                                    )}
                                                                    id="LoginPasskeysConditionalAuthenticate_Box_9"
                                                                    sx={
                                                                        styles.LoginPasskeysConditionalAuthenticate_Box_9
                                                                    }
                                                                >
                                                                    {authenticator.transports.displayNameProperties.map(
                                                                        (
                                                                            nameProperty,
                                                                            i,
                                                                            arr
                                                                        ) => (
                                                                            <Box
                                                                                key={i}
                                                                                id="LoginPasskeysConditionalAuthenticate_Box_10"
                                                                                sx={
                                                                                    styles.LoginPasskeysConditionalAuthenticate_Box_10
                                                                                }
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
                                                        <Box
                                                            className={kcClsx(
                                                                "kcSelectAuthListItemDescriptionClass"
                                                            )}
                                                            id="LoginPasskeysConditionalAuthenticate_Box_11"
                                                            sx={
                                                                styles.LoginPasskeysConditionalAuthenticate_Box_11
                                                            }
                                                        >
                                                            <span id="LoginPasskeysConditionalAuthenticate_span_4">
                                                                {msg(
                                                                    "passkey-createdAt-label"
                                                                )}
                                                            </span>
                                                            <span id="LoginPasskeysConditionalAuthenticate_span_5">
                                                                {authenticator.createdAt}
                                                            </span>
                                                        </Box>
                                                    </Box>
                                                    <Box
                                                        className={kcClsx(
                                                            "kcSelectAuthListItemFillClass"
                                                        )}
                                                        id="LoginPasskeysConditionalAuthenticate_Box_12"
                                                        sx={
                                                            styles.LoginPasskeysConditionalAuthenticate_Box_12
                                                        }
                                                    />
                                                </Box>
                                            )
                                        )}
                                    </Box>
                                </>
                            )}
                            <Box
                                id="LoginPasskeysConditionalAuthenticate_Box_13"
                                sx={styles.LoginPasskeysConditionalAuthenticate_Box_13}
                            >
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
                                        id="LoginPasskeysConditionalAuthenticate_Box_14"
                                        sx={
                                            styles.LoginPasskeysConditionalAuthenticate_Box_14
                                        }
                                    >
                                        {!usernameHidden && (
                                            <Box
                                                className={kcClsx("kcFormGroupClass")}
                                                id="LoginPasskeysConditionalAuthenticate_Box_15"
                                                sx={
                                                    styles.LoginPasskeysConditionalAuthenticate_Box_15
                                                }
                                            >
                                                <FormLabel
                                                    htmlFor="username"
                                                    className={kcClsx("kcLabelClass")}
                                                    id="LoginPasskeysConditionalAuthenticate_FormLabel_1"
                                                    sx={
                                                        styles.LoginPasskeysConditionalAuthenticate_FormLabel_1
                                                    }
                                                >
                                                    {msg("passkey-autofill-select")}
                                                </FormLabel>
                                                <TextField
                                                    tabIndex={1}
                                                    aria-invalid={messagesPerField.existsError(
                                                        "username"
                                                    )}
                                                    className={kcClsx("kcInputClass")}
                                                    name="username"
                                                    defaultValue={login.username ?? ""}
                                                    //autoComplete="username webauthn"
                                                    type="text"
                                                    autoFocus
                                                    autoComplete="off"
                                                    id="LoginPasskeysConditionalAuthenticate_TextField_8"
                                                    sx={
                                                        styles.LoginPasskeysConditionalAuthenticate_TextField_8
                                                    }
                                                />
                                                {messagesPerField.existsError(
                                                    "username"
                                                ) && (
                                                    <span
                                                        id="input-error-username"
                                                        className={kcClsx(
                                                            "kcInputErrorMessageClass"
                                                        )}
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
                                    className={kcClsx("kcFormButtonsClass")}
                                    style={{ display: "none" }}
                                    id="LoginPasskeysConditionalAuthenticate_Box_16"
                                    sx={
                                        styles.LoginPasskeysConditionalAuthenticate_Box_16
                                    }
                                >
                                    <TextField
                                        type="button"
                                        autoFocus
                                        value={msgStr("passkey-doAuthenticate")}
                                        className={kcClsx(
                                            "kcButtonClass",
                                            "kcButtonPrimaryClass",
                                            "kcButtonBlockClass",
                                            "kcButtonLargeClass"
                                        )}
                                        id="LoginPasskeysConditionalAuthenticate_TextField_9"
                                        sx={
                                            styles.LoginPasskeysConditionalAuthenticate_TextField_9
                                        }
                                    />
                                </Box>
                            </Box>
                        </>
                    )}
            </Box>
        </Template>
    );
}
