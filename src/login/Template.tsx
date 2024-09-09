import { useEffect } from "react";
import { assert } from "keycloakify/tools/assert";
import type { TemplateProps } from "keycloakify/login/TemplateProps";
import { useInsertScriptTags } from "keycloakify/tools/useInsertScriptTags";
import { useInsertLinkTags } from "keycloakify/tools/useInsertLinkTags";
import type { I18n } from "./i18n";
import type { KcContext } from "./KcContext";
import { Box, Typography } from "@mui/material";

export default function Template(props: TemplateProps<KcContext, I18n>) {
    const {
        displayInfo = false,
        displayMessage = true,
        displayRequiredFields = false,
        headerNode,
        socialProvidersNode = null,
        infoNode = null,
        documentTitle,
        kcContext,
        i18n,
        doUseDefaultCss,
        children
    } = props;

    const { msg, msgStr, getChangeLocaleUrl, labelBySupportedLanguageTag, currentLanguageTag } = i18n;
    const { realm, locale, auth, url, message, isAppInitiatedAction, authenticationSession, scripts } = kcContext;

    useEffect(() => {
        document.title = documentTitle ?? msgStr("loginTitle", kcContext.realm.displayName);
    }, []);

    useEffect(() => {
        const { currentLanguageTag } = locale ?? {};
        if (!currentLanguageTag) return;
        const html = document.querySelector("html");
        assert(html !== null);
        html.lang = currentLanguageTag;
    }, []);

    const { areAllStyleSheetsLoaded } = useInsertLinkTags({
        componentOrHookName: "Template",
        hrefs: doUseDefaultCss ? [`${url.resourcesPath}/css/login.css`] : []
    });

    const { insertScriptTags } = useInsertScriptTags({
        componentOrHookName: "Template",
        scriptTags: [
            {
                type: "module",
                src: `${url.resourcesPath}/js/menu-button-links.js`
            },
            ...(authenticationSession
                ? [
                      {
                          type: "module",
                          textContent: `
                              import { checkCookiesAndSetTimer } from "${url.resourcesPath}/js/authChecker.js";
                              checkCookiesAndSetTimer("${authenticationSession.authSessionId}", "${authenticationSession.tabId}", "${url.ssoLoginInOtherTabsUrl}");
                          `
                      }
                  ]
                : []),
            ...scripts.map(script => ({ type: "text/javascript", src: script }))
        ]
    });

    useEffect(() => {
        if (areAllStyleSheetsLoaded) insertScriptTags();
    }, [areAllStyleSheetsLoaded]);

    if (!areAllStyleSheetsLoaded) return null;

    return (
        <Box>
            <Typography variant={"h1"} id="kc-header-wrapper">
                {msg("loginTitleHtml", realm.displayNameHtml)}
            </Typography>

            <Box>
                <header>
                    {realm.internationalizationEnabled && locale?.supported.length > 1 && (
                        <Box id="kc-locale">
                            <button id="kc-current-locale-link">{labelBySupportedLanguageTag[currentLanguageTag]}</button>
                            <ul id="language-switch1">
                                {locale.supported.map(({ languageTag }, i) => (
                                    <li key={languageTag}>
                                        <a href={getChangeLocaleUrl(languageTag)}>{labelBySupportedLanguageTag[languageTag]}</a>
                                    </li>
                                ))}
                            </ul>
                        </Box>
                    )}
                    {auth?.showUsername && !auth.showResetCredentials ? (
                        <Box id="kc-username">
                            <label>{auth.attemptedUsername}</label>
                            <a id="reset-login" href={url.loginRestartFlowUrl}>
                                <span>{msg("restartLoginTooltip")}</span>
                            </a>
                        </Box>
                    ) : (
                        <Typography variant="h1" id="kc-page-title">
                            {headerNode}
                        </Typography>
                    )}
                </header>

                <Box id="kc-content">
                    {displayMessage && message && (message.type !== "warning" || !isAppInitiatedAction) && (
                        <Box>
                            <span dangerouslySetInnerHTML={{ __html: message.summary }} />
                        </Box>
                    )}

                    {children}

                    {auth?.showTryAnotherWayLink && (
                        <form id="kc-select-try-another-way-form" action={url.loginAction} method="post">
                            <input type="hidden" name="tryAnotherWay" value="on" />
                            <a onClick={() => document.forms["kc-select-try-another-way-form"].submit()}>{msg("doTryAnotherWay")}</a>
                        </form>
                    )}

                    {socialProvidersNode}

                    {displayInfo && infoNode && <Box id="kc-info">{infoNode}</Box>}
                </Box>
            </Box>
        </Box>
    );
}
