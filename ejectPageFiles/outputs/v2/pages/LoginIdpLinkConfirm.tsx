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
import { styles } from "../styles/pages/LoginIdpLinkConfirm.ts";
export default function LoginIdpLinkConfirm(
    props: PageProps<
        Extract<
            KcContext,
            {
                pageId: "login-idp-link-confirm.ftl";
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
    const { url, idpAlias } = kcContext;
    const { msg } = i18n;
    return (
        <Template
            id="LoginIdpLinkConfirm_Template_1"
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            headerNode={msg("confirmLinkIdpTitle")}
        >
            <Box
                id="kc-register-form"
                action={url.loginAction}
                method="post"
                component="form"
            >
                <Box id="LoginIdpLinkConfirm_div_1">
                    <Button
                        type="submit"
                        name="submitAction"
                        id="updateProfile"
                        value="updateProfile"
                    >
                        {msg("confirmLinkIdpReviewProfile")}
                    </Button>
                    <Button
                        type="submit"
                        name="submitAction"
                        id="linkAccount"
                        value="linkAccount"
                    >
                        {msg("confirmLinkIdpContinue", idpAlias)}
                    </Button>
                </Box>
            </Box>
        </Template>
    );
}
