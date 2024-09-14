import { Box, Button, Link, TextField, FormLabel } from "@mui/material";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
export default function Info(
    props: PageProps<
        Extract<
            KcContext,
            {
                pageId: "info.ftl";
            }
        >,
        I18n
    >
) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
    const { advancedMsgStr, msg } = i18n;
    const {
        messageHeader,
        message,
        requiredActions,
        skipLink,
        pageRedirectUri,
        actionUri,
        client
    } = kcContext;
    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={false}
            headerNode={
                <span
                    dangerouslySetInnerHTML={{
                        __html: messageHeader ?? message.summary
                    }}
                />
            }
        >
            <Box id="kc-info-message">
                <p
                    dangerouslySetInnerHTML={{
                        __html: (() => {
                            let html = message.summary;
                            if (requiredActions) {
                                html += "<b>";
                                html += requiredActions
                                    .map(requiredAction =>
                                        advancedMsgStr(`requiredAction.${requiredAction}`)
                                    )
                                    .join(", ");
                                html += "</b>";
                            }
                            return html;
                        })()
                    }}
                />
                {(() => {
                    if (skipLink) {
                        return null;
                    }
                    if (pageRedirectUri) {
                        return (
                            <p>
                                <Link href={pageRedirectUri}>
                                    {msg("backToApplication")}
                                </Link>
                            </p>
                        );
                    }
                    if (actionUri) {
                        return (
                            <p>
                                <Link href={actionUri}>{msg("proceedWithAction")}</Link>
                            </p>
                        );
                    }
                    if (client.baseUrl) {
                        return (
                            <p>
                                <Link href={client.baseUrl}>
                                    {msg("backToApplication")}
                                </Link>
                            </p>
                        );
                    }
                })()}
            </Box>
        </Template>
    );
}
