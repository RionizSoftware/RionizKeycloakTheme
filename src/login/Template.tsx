import { useEffect, useState } from "react";
import { assert } from "keycloakify/tools/assert";
import type { TemplateProps } from "keycloakify/login/TemplateProps";
import { useInsertScriptTags } from "keycloakify/tools/useInsertScriptTags";
import { useInsertLinkTags } from "keycloakify/tools/useInsertLinkTags";
import type { I18n } from "./i18n";
import type { KcContext } from "./KcContext";
import { Box, Button, Card, CardContent, Menu, MenuItem, Typography } from "@mui/material";

export default function Template(props: TemplateProps<KcContext, I18n>) {
    const {
        displayInfo = false,
        displayMessage = true,
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
    const [languageMenuAnchor, setLanguageMenuAnchor] = useState<EventTarget & HTMLButtonElement>();

    useEffect(() => {
        document.title = documentTitle ?? msgStr("loginTitle", kcContext.realm.displayName);
    }, []);

    useEffect(() => {
        const { currentLanguageTag } = locale ?? {};

        if (currentLanguageTag === undefined) {
            return;
        }

        const html = document.querySelector("html");
        assert(html !== null);
        html.lang = currentLanguageTag;
    }, []);

    const { areAllStyleSheetsLoaded } = useInsertLinkTags({
        componentOrHookName: "Template",
        hrefs: !doUseDefaultCss ? [] : []
    });

    const { insertScriptTags } = useInsertScriptTags({
        componentOrHookName: "Template",
        scriptTags: [
            {
                type: "module",
                src: `${url.resourcesPath}/js/menu-button-links.js`
            },
            ...(authenticationSession === undefined
                ? []
                : [
                      {
                          type: "module",
                          textContent: [
                              `import { checkCookiesAndSetTimer } from "${url.resourcesPath}/js/authChecker.js";`,
                              ``,
                              `checkCookiesAndSetTimer(`,
                              `  "${authenticationSession.authSessionId}",`,
                              `  "${authenticationSession.tabId}",`,
                              `  "${url.ssoLoginInOtherTabsUrl}"`,
                              `);`
                          ].join("\n")
                      } as const
                  ]),
            ...scripts.map(
                script =>
                    ({
                        type: "text/javascript",
                        src: script
                    }) as const
            )
        ]
    });

    useEffect(() => {
        if (areAllStyleSheetsLoaded) {
            insertScriptTags();
        }
    }, [areAllStyleSheetsLoaded]);

    if (!areAllStyleSheetsLoaded) {
        return null;
    }

    return (
        <Box display="flex" justifyContent="center" alignItems="center" marginTop={5}>
            <Card elevation={3} sx={{ padding: 1, minWidth: 380 }}>
                <CardContent>
                    <Typography variant={"h6"} id="kc-header-wrapper" align="center">
                        {msg("loginTitleHtml", realm.displayNameHtml)}
                    </Typography>
                    <Box sx={{ margin: "20px 0" }}>
                        <Box display="flex" flexDirection="row" justifyContent="space-between">
                            <Box>
                                {auth?.showUsername && !auth.showResetCredentials ? (
                                    <Box id="kc-username" textAlign="center">
                                        <label>{auth.attemptedUsername}</label>
                                        <a id="reset-login" href={url.loginRestartFlowUrl}>
                                            <span>{msg("restartLoginTooltip")}</span>
                                        </a>
                                    </Box>
                                ) : (
                                    <Typography variant="h6" id="kc-page-title" align="center">
                                        {headerNode}
                                    </Typography>
                                )}
                            </Box>
                            <Box>
                                {realm.internationalizationEnabled && locale?.supported && locale?.supported.length > 1 && (
                                    <Box id="kc-locale" display="flex" justifyContent="center">
                                        <Button id="kc-current-locale-link" onClick={event => setLanguageMenuAnchor(event.currentTarget)}>
                                            {labelBySupportedLanguageTag[currentLanguageTag]}
                                        </Button>
                                        <Menu
                                            id="language-switch1"
                                            anchorEl={languageMenuAnchor}
                                            open={Boolean(languageMenuAnchor)}
                                            onClose={() => setLanguageMenuAnchor(undefined)}
                                        >
                                            {locale?.supported.map(({ languageTag }) => (
                                                <MenuItem
                                                    key={languageTag}
                                                    onClick={() => {
                                                        window.location.href = getChangeLocaleUrl(languageTag);
                                                        setLanguageMenuAnchor(undefined);
                                                    }}
                                                >
                                                    {labelBySupportedLanguageTag[languageTag]}
                                                </MenuItem>
                                            ))}
                                        </Menu>
                                    </Box>
                                )}
                            </Box>
                        </Box>

                        <Box id="kc-content" textAlign="center" sx={{ marginTop: 2 }}>
                            {displayMessage && message && (message.type !== "warning" || !isAppInitiatedAction) && (
                                <Box>
                                    <span dangerouslySetInnerHTML={{ __html: message.summary }} />
                                </Box>
                            )}

                            {children}
                            <Box sx={{ marginTop: 2 }}>
                                {auth?.showTryAnotherWayLink && (
                                    <form id="kc-select-try-another-way-form" action={url.loginAction} method="post">
                                        <input type="hidden" name="tryAnotherWay" value="on" />
                                        <a onClick={() => document.forms.namedItem("kc-select-try-another-way-form")?.submit()}>
                                            {msg("doTryAnotherWay")}
                                        </a>
                                    </form>
                                )}

                                {socialProvidersNode}

                                {displayInfo && infoNode && <Box id="kc-info">{infoNode}</Box>}
                            </Box>
                        </Box>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
}
