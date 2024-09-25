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
import { styles } from "../styles/pages/Error.ts";
export default function Error(
    props: PageProps<
        Extract<
            KcContext,
            {
                pageId: "error.ftl";
            }
        >,
        I18n
    >
) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
    const { message, client, skipLink } = kcContext;
    const { msg } = i18n;
    return (
        <Template
            id="Error_Template_1"
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={false}
            headerNode={msg("errorTitle")}
        >
            <Box id="kc-error-message">
                <Typography
                    id="Error_p_1"
                    dangerouslySetInnerHTML={{ __html: message.summary }}
                />
                {!skipLink && client !== undefined && client.baseUrl !== undefined && (
                    <Typography id="Error_p_2">
                        <Link id="backToApplication" href={client.baseUrl}>
                            {msg("backToApplication")}
                        </Link>
                    </Typography>
                )}
            </Box>
        </Template>
    );
}
