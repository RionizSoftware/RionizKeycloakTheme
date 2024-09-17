import type { PageProps } from "keycloakify/login/pages/PageProps";
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
                <Typography
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
                            <Typography>
                                <Link href={pageRedirectUri}>
                                    {msg("backToApplication")}
                                </Link>
                            </Typography>
                        );
                    }
                    if (actionUri) {
                        return (
                            <Typography>
                                <Link href={actionUri}>{msg("proceedWithAction")}</Link>
                            </Typography>
                        );
                    }
                    if (client.baseUrl) {
                        return (
                            <Typography>
                                <Link href={client.baseUrl}>
                                    {msg("backToApplication")}
                                </Link>
                            </Typography>
                        );
                    }
                })()}
            </Box>
        </Template>
    );
}
