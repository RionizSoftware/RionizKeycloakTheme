import { getKcClsx } from "rionizkeycloakify/login/lib/kcClsx";
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
import { styles } from "../styles/pages/LoginIdpLinkConfirmOverride.ts";
export default function LoginIdpLinkConfirmOverride(
    props: PageProps<
        Extract<
            KcContext,
            {
                pageId: "login-idp-link-confirm-override.ftl";
            }
        >,
        I18n
    >
) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });
    const { url, idpDisplayName } = kcContext;
    const { msg } = i18n;
    return (
        <Template
            id="LoginIdpLinkConfirmOverride_Template_1"
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            headerNode={msg("confirmOverrideIdpTitle")}
        >
            <Box
                id="kc-register-form"
                action={url.loginAction}
                method="post"
                component="form"
            >
                {msg("pageExpiredMsg1")}{" "}
                <Link id="loginRestartLink" href={url.loginRestartFlowUrl}>
                    {msg("doClickHere")}
                </Link>
                <br id="LoginIdpLinkConfirmOverride_br_1" />
                <br id="LoginIdpLinkConfirmOverride_br_2" />
                <Button
                    type="submit"
                    name="submitAction"
                    id="confirmOverride"
                    value="confirmOverride"
                >
                    {msg("confirmOverrideIdpContinue", idpDisplayName)}
                </Button>
            </Box>
        </Template>
    );
}
