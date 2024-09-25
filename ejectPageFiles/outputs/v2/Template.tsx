import { useEffect } from "react";
import { assert } from "rionizkeycloakify/tools/assert";
import { clsx } from "rionizkeycloakify/tools/clsx";
import type { TemplateProps } from "rionizkeycloakify/login/TemplateProps";
import { getKcClsx } from "rionizkeycloakify/login/lib/kcClsx";
import { useSetClassName } from "rionizkeycloakify/tools/useSetClassName";
import { useStylesAndScripts } from "rionizkeycloakify/login/Template.useStylesAndScripts";
import type { I18n } from "./i18n";
import type { KcContext } from "./KcContext";
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
import { styles } from "./styles/Template.ts";
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
        <Box id="Template_div_1">
            {msg("loginTitleHtml", realm.displayNameHtml)}

            <header id="Template_header_1">
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
                            <List
                                role="menu"
                                tabIndex={-1}
                                aria-labelledby="kc-current-locale-link"
                                aria-activedescendant=""
                                id="language-switch1"
                            >
                                {locale.supported.map(({ languageTag }, i) => (
                                    <ListItem
                                        id="Template_li_1"
                                        key={languageTag}
                                        role="none"
                                    >
                                        <Link
                                            role="menuitem"
                                            id={`language-${i + 1}`}
                                            href={getChangeLocaleUrl(languageTag)}
                                        >
                                            {labelBySupportedLanguageTag[languageTag]}
                                        </Link>
                                    </ListItem>
                                ))}
                            </List>
                        </Box>
                    )}
                {(() => {
                    const node = !(
                        auth !== undefined &&
                        auth.showUsername &&
                        !auth.showResetCredentials
                    ) ? (
                        <Typography id="kc-page-title" variant="h1" component="h1">
                            {headerNode}
                        </Typography>
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
                                <Box id="Template_div_9">
                                    <i id="Template_i_1"></i>
                                    <span id="Template_span_1">
                                        {msg("restartLoginTooltip")}
                                    </span>
                                </Box>
                            </Link>
                        </Box>
                    );
                    if (displayRequiredFields) {
                        return (
                            <Box id="Template_div_10">
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
                        <Box id="Template_div_15">
                            {message.type === "success" && (
                                <span id="Template_span_4"></span>
                            )}
                            {message.type === "warning" && (
                                <span id="Template_span_5"></span>
                            )}
                            {message.type === "error" && (
                                <span id="Template_span_6"></span>
                            )}
                            {message.type === "info" && (
                                <span id="Template_span_7"></span>
                            )}

                            <span
                                id="Template_span_8"
                                dangerouslySetInnerHTML={{
                                    __html: message.summary
                                }}
                            />
                        </Box>
                    )}
                {children}
                {auth !== undefined && auth.showTryAnotherWayLink && (
                    <Box
                        id="kc-select-try-another-way-form"
                        action={url.loginAction}
                        method="post"
                        component="form"
                    >
                        <Box id="Template_div_17">
                            <TextField
                                id="Template_input_1"
                                type="hidden"
                                name="tryAnotherWay"
                                value="on"
                            />
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
                    </Box>
                )}
                {socialProvidersNode}
                {displayInfo && <Box id="kc-info">{infoNode}</Box>}
            </Box>
        </Box>
    );
}
