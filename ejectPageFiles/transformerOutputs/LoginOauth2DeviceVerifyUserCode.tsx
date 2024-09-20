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
                id="LoginOauth2DeviceVerifyUserCode_Box_1"
                sx={styles.LoginOauth2DeviceVerifyUserCode_Box_1}
            >
                <Box
                    id="LoginOauth2DeviceVerifyUserCode_Box_2"
                    sx={styles.LoginOauth2DeviceVerifyUserCode_Box_2}
                >
                    <FormLabel
                        htmlFor="device-user-code"
                        id="LoginOauth2DeviceVerifyUserCode_FormLabel_1"
                        sx={styles.LoginOauth2DeviceVerifyUserCode_FormLabel_1}
                    >
                        {msg("verifyOAuth2DeviceUserCode")}
                    </FormLabel>

                    <Box
                        id="LoginOauth2DeviceVerifyUserCode_Box_3"
                        sx={styles.LoginOauth2DeviceVerifyUserCode_Box_3}
                    >
                        <TextField
                            name="device_user_code"
                            autoComplete="off"
                            type="text"
                            autoFocus
                            id="LoginOauth2DeviceVerifyUserCode_TextField_1"
                            sx={styles.LoginOauth2DeviceVerifyUserCode_TextField_1}
                        />
                    </Box>
                </Box>

                <Box
                    id="LoginOauth2DeviceVerifyUserCode_Box_4"
                    sx={styles.LoginOauth2DeviceVerifyUserCode_Box_4}
                >
                    <TextField
                        type="submit"
                        value={msgStr("doSubmit")}
                        id="LoginOauth2DeviceVerifyUserCode_TextField_2"
                        sx={styles.LoginOauth2DeviceVerifyUserCode_TextField_2}
                    />
                </Box>
            </Box>
        </Template>
    );
}
