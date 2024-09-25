import type { PageProps } from "rionizkeycloakify/login/pages/PageProps";
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
import { styles } from "../styles/pages/Info.ts";
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
            id="Info_Template_1"
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={false}
            headerNode={
                <span
                    id="Info_span_1"
                    dangerouslySetInnerHTML={{
                        __html: messageHeader ?? message.summary
                    }}
                />
            }
        >
            <Box id="kc-info-message">
                <Typography
                    id="Info_p_1"
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
                            <Typography id="Info_p_2">
                                <Link id="Info_a_1" href={pageRedirectUri}>
                                    {msg("backToApplication")}
                                </Link>
                            </Typography>
                        );
                    }
                    if (actionUri) {
                        return (
                            <Typography id="Info_p_3">
                                <Link id="Info_a_2" href={actionUri}>
                                    {msg("proceedWithAction")}
                                </Link>
                            </Typography>
                        );
                    }
                    if (client.baseUrl) {
                        return (
                            <Typography id="Info_p_4">
                                <Link id="Info_a_3" href={client.baseUrl}>
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
