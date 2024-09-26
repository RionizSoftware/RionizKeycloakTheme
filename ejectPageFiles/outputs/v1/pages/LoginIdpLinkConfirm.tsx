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
    ListItem,
    Checkbox,
    Radio
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
                action={url.loginAction}
                method="post"
                component="form"
                id="LoginIdpLinkConfirm_Box_1"
                sx={styles.LoginIdpLinkConfirm_Box_1}
            >
                <Box id="LoginIdpLinkConfirm_Box_2" sx={styles.LoginIdpLinkConfirm_Box_2}>
                    <Button
                        type="submit"
                        name="submitAction"
                        value="updateProfile"
                        id="LoginIdpLinkConfirm_Button_1"
                        sx={styles.LoginIdpLinkConfirm_Button_1}
                    >
                        {msg("confirmLinkIdpReviewProfile")}
                    </Button>
                    <Button
                        type="submit"
                        name="submitAction"
                        value="linkAccount"
                        id="LoginIdpLinkConfirm_Button_2"
                        sx={styles.LoginIdpLinkConfirm_Button_2}
                    >
                        {msg("confirmLinkIdpContinue", idpAlias)}
                    </Button>
                </Box>
            </Box>
        </Template>
    );
}
