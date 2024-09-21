import { getKcClsx } from "keycloakify/login/lib/kcClsx";
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
import { styles } from "./styles/LoginIdpLinkConfirm.ts";
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
        <Template id="LoginIdpLinkConfirm_Template_1">
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
                        className={kcClsx(
                            "kcButtonClass",
                            "kcButtonDefaultClass",
                            "kcButtonBlockClass",
                            "kcButtonLargeClass"
                        )}
                        name="submitAction"
                        value="updateProfile"
                        id="LoginIdpLinkConfirm_Button_1"
                        sx={styles.LoginIdpLinkConfirm_Button_1}
                    >
                        {msg("confirmLinkIdpReviewProfile")}
                    </Button>
                    <Button
                        type="submit"
                        className={kcClsx(
                            "kcButtonClass",
                            "kcButtonDefaultClass",
                            "kcButtonBlockClass",
                            "kcButtonLargeClass"
                        )}
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
