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
        <Box
            className={kcClsx("kcLoginClass")}
            id="Template_Box_1"
            sx={styles.Template_Box_1}
        >
            <Box
                className={kcClsx("kcHeaderClass")}
                id="Template_Box_2"
                sx={styles.Template_Box_2}
            >
                <Box
                    className={kcClsx("kcHeaderWrapperClass")}
                    id="Template_Box_3"
                    sx={styles.Template_Box_3}
                >
                    {msg("loginTitleHtml", realm.displayNameHtml)}
                </Box>
            </Box>

            <Box
                className={kcClsx("kcFormCardClass")}
                id="Template_Box_4"
                sx={styles.Template_Box_4}
            >
                <header id="Template_header_1" className={kcClsx("kcFormHeaderClass")}>
                    {realm.internationalizationEnabled &&
                        (assert(locale !== undefined), locale.supported.length > 1) && (
                            <Box
                                className={kcClsx("kcLocaleMainClass")}
                                id="Template_Box_5"
                                sx={styles.Template_Box_5}
                            >
                                <Box
                                    className={kcClsx("kcLocaleWrapperClass")}
                                    id="Template_Box_6"
                                    sx={styles.Template_Box_6}
                                >
                                    <Box
                                        className={clsx(
                                            "menu-button-links",
                                            kcClsx("kcLocaleDropDownClass")
                                        )}
                                        id="Template_Box_7"
                                        sx={styles.Template_Box_7}
                                    >
                                        <Button
                                            tabIndex={1}
                                            aria-label={msgStr("languages")}
                                            aria-haspopup="true"
                                            aria-expanded="false"
                                            aria-controls="language-switch1"
                                            id="Template_Button_1"
                                            sx={styles.Template_Button_1}
                                        >
                                            {
                                                labelBySupportedLanguageTag[
                                                    currentLanguageTag
                                                ]
                                            }
                                        </Button>
                                        <List
                                            role="menu"
                                            tabIndex={-1}
                                            aria-labelledby="kc-current-locale-link"
                                            aria-activedescendant=""
                                            className={kcClsx("kcLocaleListClass")}
                                            id="Template_List_1"
                                            sx={styles.Template_List_1}
                                        >
                                            {locale.supported.map(
                                                ({ languageTag }, i) => (
                                                    <ListItem
                                                        key={languageTag}
                                                        className={kcClsx(
                                                            "kcLocaleListItemClass"
                                                        )}
                                                        role="none"
                                                        id="Template_ListItem_1"
                                                        sx={styles.Template_ListItem_1}
                                                    >
                                                        <Link
                                                            role="menuitem"
                                                            className={kcClsx(
                                                                "kcLocaleItemClass"
                                                            )}
                                                            href={getChangeLocaleUrl(
                                                                languageTag
                                                            )}
                                                            id="Template_Link_1"
                                                            sx={styles.Template_Link_1}
                                                        >
                                                            {
                                                                labelBySupportedLanguageTag[
                                                                    languageTag
                                                                ]
                                                            }
                                                        </Link>
                                                    </ListItem>
                                                )
                                            )}
                                        </List>
                                    </Box>
                                </Box>
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
                            <Box
                                className={kcClsx("kcFormGroupClass")}
                                id="Template_Box_8"
                                sx={styles.Template_Box_8}
                            >
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
                                    <Box id="Template_Box_9" sx={styles.Template_Box_9}>
                                        <i
                                            id="Template_i_1"
                                            className={kcClsx("kcResetFlowIcon")}
                                        ></i>
                                        <span id="Template_span_1">
                                            {msg("restartLoginTooltip")}
                                        </span>
                                    </Box>
                                </Link>
                            </Box>
                        );
                        if (displayRequiredFields) {
                            return (
                                <Box
                                    className={kcClsx("kcContentWrapperClass")}
                                    id="Template_Box_10"
                                    sx={styles.Template_Box_10}
                                >
                                    <Box
                                        className={clsx(
                                            kcClsx("kcLabelWrapperClass"),
                                            "subtitle"
                                        )}
                                        id="Template_Box_11"
                                        sx={styles.Template_Box_11}
                                    >
                                        <span id="Template_span_2">
                                            *{msg("requiredFields")}
                                        </span>
                                    </Box>
                                    <Box id="Template_Box_12" sx={styles.Template_Box_12}>
                                        {node}
                                    </Box>
                                </Box>
                            );
                        }
                        return node;
                    })()}
                </header>
                <Box id="Template_Box_13" sx={styles.Template_Box_13}>
                    {/* App-initiated actions should not see warning messages about the need to complete the action during login. */}
                    {displayMessage &&
                        message !== undefined &&
                        (message.type !== "warning" || !isAppInitiatedAction) && (
                            <Box
                                className={clsx(
                                    `alert-${message.type}`,
                                    kcClsx("kcAlertClass"),
                                    `pf-m-${message?.type === "error" ? "danger" : message.type}`
                                )}
                                id="Template_Box_14"
                                sx={styles.Template_Box_14}
                            >
                                <Box id="Template_Box_15" sx={styles.Template_Box_15}>
                                    {message.type === "success" && (
                                        <span
                                            id="Template_span_4"
                                            className={kcClsx("kcFeedbackSuccessIcon")}
                                        ></span>
                                    )}
                                    {message.type === "warning" && (
                                        <span
                                            id="Template_span_5"
                                            className={kcClsx("kcFeedbackWarningIcon")}
                                        ></span>
                                    )}
                                    {message.type === "error" && (
                                        <span
                                            id="Template_span_6"
                                            className={kcClsx("kcFeedbackErrorIcon")}
                                        ></span>
                                    )}
                                    {message.type === "info" && (
                                        <span
                                            id="Template_span_7"
                                            className={kcClsx("kcFeedbackInfoIcon")}
                                        ></span>
                                    )}
                                </Box>
                                <span
                                    id="Template_span_8"
                                    className={kcClsx("kcAlertTitleClass")}
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
                            id="Template_Box_16"
                            sx={styles.Template_Box_16}
                        >
                            <Box
                                className={kcClsx("kcFormGroupClass")}
                                id="Template_Box_17"
                                sx={styles.Template_Box_17}
                            >
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
                        <Box
                            className={kcClsx("kcSignUpClass")}
                            id="Template_Box_18"
                            sx={styles.Template_Box_18}
                        >
                            <Box
                                className={kcClsx("kcInfoAreaWrapperClass")}
                                id="Template_Box_19"
                                sx={styles.Template_Box_19}
                            >
                                {infoNode}
                            </Box>
                        </Box>
                    )}
                </Box>
            </Box>
        </Box>
    );
}
