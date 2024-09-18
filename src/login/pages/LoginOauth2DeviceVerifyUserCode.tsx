import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import { PageProps } from "keycloakify/login/pages/PageProps";
import { KcContext } from "../KcContext";
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
import { styles } from "./styles/LoginOauth2DeviceVerifyUserCode.ts";
export default function LoginOauth2DeviceVerifyUserCode(
    props: PageProps<
        Extract<
            KcContext,
            {
                pageId: "login-oauth2-device-verify-user-code.ftl";
            }
        >,
        I18n
    >
) {
    const { kcContext, i18n, doUseDefaultCss, classes, Template } = props;
    const { url } = kcContext;
    const { msg, msgStr } = i18n;
    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });
    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            headerNode={msg("oauth2DeviceVerificationTitle")}
        >
            <Box
                action={url.oauth2DeviceVerificationAction}
                method="post"
                component="form"
                id="Box_1"
                sx={styles.Box_1}
            >
                <Box id="Box_2" sx={styles.Box_2}>
                    <FormLabel
                        htmlFor="device-user-code"
                        id="FormLabel_1"
                        sx={styles.FormLabel_1}
                    >
                        {msg("verifyOAuth2DeviceUserCode")}
                    </FormLabel>

                    <Box id="Box_3" sx={styles.Box_3}>
                        <TextField
                            name="device_user_code"
                            autoComplete="off"
                            type="text"
                            autoFocus
                            id="TextField_1"
                            sx={styles.TextField_1}
                        />
                    </Box>
                </Box>

                <Box id="Box_4" sx={styles.Box_4}>
                    <TextField
                        type="submit"
                        value={msgStr("doSubmit")}
                        id="TextField_2"
                        sx={styles.TextField_2}
                    />
                </Box>
            </Box>
        </Template>
    );
}
