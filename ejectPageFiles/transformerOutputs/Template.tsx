import { useEffect } from "react";
import { assert } from "keycloakify/tools/assert";
import { clsx } from "keycloakify/tools/clsx";
import type { TemplateProps } from "keycloakify/login/TemplateProps";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import { useSetClassName } from "keycloakify/tools/useSetClassName";
import { useStylesAndScripts } from "keycloakify/login/Template.useStylesAndScripts";
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
        <Box id="Box_1" sx={styles.Box_1}>
            {msg("loginTitleHtml", realm.displayNameHtml)}

            <header>
                {realm.internationalizationEnabled &&
                    (assert(locale !== undefined), locale.supported.length > 1) && (
                        <Box id="Box_2" sx={styles.Box_2}>
                            <Button
                                tabIndex={1}
                                aria-label={msgStr("languages")}
                                aria-haspopup="true"
                                aria-expanded="false"
                                aria-controls="language-switch1"
                                id="Button_1"
                                sx={styles.Button_1}
                            >
                                {labelBySupportedLanguageTag[currentLanguageTag]}
                            </Button>
                            <List
                                role="menu"
                                tabIndex={-1}
                                aria-labelledby="kc-current-locale-link"
                                aria-activedescendant=""
                                id="List_1"
                                sx={styles.List_1}
                            >
                                {locale.supported.map(({ languageTag }, i) => (
                                    <ListItem
                                        key={languageTag}
                                        role="none"
                                        id="ListItem_1"
                                        sx={styles.ListItem_1}
                                    >
                                        <Link
                                            role="menuitem"
                                            href={getChangeLocaleUrl(languageTag)}
                                            id="Link_1"
                                            sx={styles.Link_1}
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
                            id="Typography_1"
                            sx={styles.Typography_1}
                        >
                            {headerNode}
                        </Typography>
                    ) : (
                        <Box id="Box_3" sx={styles.Box_3}>
                            <FormLabel id="FormLabel_1" sx={styles.FormLabel_1}>
                                {auth.attemptedUsername}
                            </FormLabel>
                            <Link
                                href={url.loginRestartFlowUrl}
                                aria-label={msgStr("restartLoginTooltip")}
                                id="Link_2"
                                sx={styles.Link_2}
                            >
                                <Box id="Box_4" sx={styles.Box_4}>
                                    <i></i>
                                    <span>{msg("restartLoginTooltip")}</span>
                                </Box>
                            </Link>
                        </Box>
                    );
                    if (displayRequiredFields) {
                        return (
                            <Box id="Box_5" sx={styles.Box_5}>
                                *{msg("requiredFields")}
                                {node}
                            </Box>
                        );
                    }
                    return node;
                })()}
            </header>
            <Box id="Box_6" sx={styles.Box_6}>
                {/* App-initiated actions should not see warning messages about the need to complete the action during login. */}
                {displayMessage &&
                    message !== undefined &&
                    (message.type !== "warning" || !isAppInitiatedAction) && (
                        <Box id="Box_7" sx={styles.Box_7}>
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
                    <Box
                        action={url.loginAction}
                        method="post"
                        component="form"
                        id="Box_8"
                        sx={styles.Box_8}
                    >
                        <Box id="Box_9" sx={styles.Box_9}>
                            <TextField
                                type="hidden"
                                name="tryAnotherWay"
                                value="on"
                                id="TextField_1"
                                sx={styles.TextField_1}
                            />
                            <Link
                                href="#"
                                onClick={() => {
                                    document.forms[
                                        "kc-select-try-another-way-form" as never
                                    ].submit();
                                    return false;
                                }}
                                id="Link_3"
                                sx={styles.Link_3}
                            >
                                {msg("doTryAnotherWay")}
                            </Link>
                        </Box>
                    </Box>
                )}
                {socialProvidersNode}
                {displayInfo && (
                    <Box id="Box_10" sx={styles.Box_10}>
                        {infoNode}
                    </Box>
                )}
            </Box>
        </Box>
    );
}
