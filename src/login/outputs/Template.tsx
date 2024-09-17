import { useEffect } from "react";
import { assert } from "keycloakify/tools/assert";
import { clsx } from "keycloakify/tools/clsx";
import type { TemplateProps } from "keycloakify/login/TemplateProps";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import { useSetClassName } from "keycloakify/tools/useSetClassName";
import { useStylesAndScripts } from "keycloakify/login/Template.useStylesAndScripts";
import type { I18n } from "./i18n";
import type { KcContext } from "./KcContext";
import { Box, Button, Link, TextField, FormLabel } from "@mui/material";
export default function Template(props: TemplateProps<KcContext, I18n>) {
    const {
        displayInfo = false,
        displayMessage = true,
        displayRequiredFields = false,
        headerNode,
        socialProvidersNode = null,
        infoNode = null,
        documentTitle,
        bodyClassName,
        kcContext,
        i18n,
        doUseDefaultCss,
        classes,
        children
    } = props;
    const { kcClsx } = getKcClsx({ doUseDefaultCss, classes });
    const {
        msg,
        msgStr,
        getChangeLocaleUrl,
        labelBySupportedLanguageTag,
        currentLanguageTag
    } = i18n;
    const { realm, locale, auth, url, message, isAppInitiatedAction } = kcContext;
    useEffect(() => {
        document.title =
            documentTitle ?? msgStr("loginTitle", kcContext.realm.displayName);
    }, []);
    useSetClassName({
        qualifiedName: "html",
        className: kcClsx("kcHtmlClass")
    });
    useSetClassName({
        qualifiedName: "body",
        className: bodyClassName ?? kcClsx("kcBodyClass")
    });
    const { isReadyToRender } = useStylesAndScripts({ kcContext, doUseDefaultCss });
    if (!isReadyToRender) {
        return null;
    }
    return (
        <Box>
            {msg("loginTitleHtml", realm.displayNameHtml)}

            <header>
                {realm.internationalizationEnabled &&
                    (assert(locale !== undefined), locale.supported.length > 1) && (
                        <Box id="kc-locale">
                            <Button
                                tabIndex={1}
                                id="kc-current-locale-link"
                                aria-label={msgStr("languages")}
                                aria-haspopup="true"
                                aria-expanded="false"
                                aria-controls="language-switch1"
                            >
                                {labelBySupportedLanguageTag[currentLanguageTag]}
                            </Button>
                            <ul
                                role="menu"
                                tabIndex={-1}
                                aria-labelledby="kc-current-locale-link"
                                aria-activedescendant=""
                                id="language-switch1"
                            >
                                {locale.supported.map(({ languageTag }, i) => (
                                    <li key={languageTag} role="none">
                                        <Link
                                            role="menuitem"
                                            id={`language-${i + 1}`}
                                            href={getChangeLocaleUrl(languageTag)}
                                        >
                                            {labelBySupportedLanguageTag[languageTag]}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </Box>
                    )}
                {(() => {
                    const node = !(
                        auth !== undefined &&
                        auth.showUsername &&
                        !auth.showResetCredentials
                    ) ? (
                        <h1 id="kc-page-title">{headerNode}</h1>
                    ) : (
                        <Box id="kc-username">
                            <FormLabel id="kc-attempted-username">
                                {auth.attemptedUsername}
                            </FormLabel>
                            <Link
                                id="reset-login"
                                href={url.loginRestartFlowUrl}
                                aria-label={msgStr("restartLoginTooltip")}
                            >
                                <Box>
                                    <i></i>
                                    <span>{msg("restartLoginTooltip")}</span>
                                </Box>
                            </Link>
                        </Box>
                    );
                    if (displayRequiredFields) {
                        return (
                            <Box>
                                *{msg("requiredFields")}
                                {node}
                            </Box>
                        );
                    }
                    return node;
                })()}
            </header>
            <Box id="kc-content">
                {/* App-initiated actions should not see warning messages about the need to complete the action during login. */}
                {displayMessage &&
                    message !== undefined &&
                    (message.type !== "warning" || !isAppInitiatedAction) && (
                        <Box>
                            {message.type === "success" && <span></span>}
                            {message.type === "warning" && <span></span>}
                            {message.type === "error" && <span></span>}
                            {message.type === "info" && <span></span>}

                            <span
                                dangerouslySetInnerHTML={{
                                    __html: message.summary
                                }}
                            />
                        </Box>
                    )}
                {children}
                {auth !== undefined && auth.showTryAnotherWayLink && (
                    <form
                        id="kc-select-try-another-way-form"
                        action={url.loginAction}
                        method="post"
                    >
                        <Box>
                            <TextField type="hidden" name="tryAnotherWay" value="on" />
                            <Link
                                href="#"
                                id="try-another-way"
                                onClick={() => {
                                    document.forms[
                                        "kc-select-try-another-way-form" as never
                                    ].submit();
                                    return false;
                                }}
                            >
                                {msg("doTryAnotherWay")}
                            </Link>
                        </Box>
                    </form>
                )}
                {socialProvidersNode}
                {displayInfo && <Box id="kc-info">{infoNode}</Box>}
            </Box>
        </Box>
    );
}
