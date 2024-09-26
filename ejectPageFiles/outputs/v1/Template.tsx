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
    ListItem,
    Checkbox,
    Radio
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
        <Box id="Template_Box_1" sx={styles.Template_Box_1}>
            {msg("loginTitleHtml", realm.displayNameHtml)}

            <header id="Template_header_1">
                {realm.internationalizationEnabled &&
                    (assert(locale !== undefined), locale.supported.length > 1) && (
                        <Box id="Template_Box_2" sx={styles.Template_Box_2}>
                            <Button
                                tabIndex={1}
                                aria-label={msgStr("languages")}
                                aria-haspopup="true"
                                aria-expanded="false"
                                aria-controls="language-switch1"
                                id="Template_Button_1"
                                sx={styles.Template_Button_1}
                            >
                                {labelBySupportedLanguageTag[currentLanguageTag]}
                            </Button>
                            <List
                                role="menu"
                                tabIndex={-1}
                                aria-labelledby="kc-current-locale-link"
                                aria-activedescendant=""
                                id="Template_List_1"
                                sx={styles.Template_List_1}
                            >
                                {locale.supported.map(({ languageTag }, i) => (
                                    <ListItem
                                        key={languageTag}
                                        role="none"
                                        id="Template_ListItem_1"
                                        sx={styles.Template_ListItem_1}
                                    >
                                        <Link
                                            role="menuitem"
                                            href={getChangeLocaleUrl(languageTag)}
                                            id="Template_Link_1"
                                            sx={styles.Template_Link_1}
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
                        <Typography
                            variant="h1"
                            component="h1"
                            id="Template_Typography_1"
                            sx={styles.Template_Typography_1}
                        >
                            {headerNode}
                        </Typography>
                    ) : (
                        <Box id="Template_Box_3" sx={styles.Template_Box_3}>
                            <FormLabel
                                id="Template_FormLabel_1"
                                sx={styles.Template_FormLabel_1}
                            >
                                {auth.attemptedUsername}
                            </FormLabel>
                            <Link
                                href={url.loginRestartFlowUrl}
                                aria-label={msgStr("restartLoginTooltip")}
                                id="Template_Link_2"
                                sx={styles.Template_Link_2}
                            >
                                <Box id="Template_Box_4" sx={styles.Template_Box_4}>
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
                            <Box id="Template_Box_5" sx={styles.Template_Box_5}>
                                *{msg("requiredFields")}
                                {node}
                            </Box>
                        );
                    }
                    return node;
                })()}
            </header>
            <Box id="Template_Box_6" sx={styles.Template_Box_6}>
                {/* App-initiated actions should not see warning messages about the need to complete the action during login. */}
                {displayMessage &&
                    message !== undefined &&
                    (message.type !== "warning" || !isAppInitiatedAction) && (
                        <Box id="Template_Box_7" sx={styles.Template_Box_7}>
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
                        action={url.loginAction}
                        method="post"
                        component="form"
                        id="Template_Box_8"
                        sx={styles.Template_Box_8}
                    >
                        <Box id="Template_Box_9" sx={styles.Template_Box_9}>
                            <TextField
                                type="hidden"
                                name="tryAnotherWay"
                                value="on"
                                id="Template_TextField_1"
                                sx={styles.Template_TextField_1}
                            />
                            <Link
                                href="#"
                                onClick={() => {
                                    document.forms[
                                        "kc-select-try-another-way-form" as never
                                    ].submit();
                                    return false;
                                }}
                                id="Template_Link_3"
                                sx={styles.Template_Link_3}
                            >
                                {msg("doTryAnotherWay")}
                            </Link>
                        </Box>
                    </Box>
                )}
                {socialProvidersNode}
                {displayInfo && (
                    <Box id="Template_Box_10" sx={styles.Template_Box_10}>
                        {infoNode}
                    </Box>
                )}
            </Box>
        </Box>
    );
}
