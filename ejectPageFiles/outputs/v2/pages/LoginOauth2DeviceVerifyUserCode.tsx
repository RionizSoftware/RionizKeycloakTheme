import { getKcClsx } from "rionizkeycloakify/login/lib/kcClsx";
import { PageProps } from "rionizkeycloakify/login/pages/PageProps";
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
import { styles } from "../styles/pages/LoginOauth2DeviceVerifyUserCode.ts";
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
            id="LoginOauth2DeviceVerifyUserCode_Template_1"
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            headerNode={msg("oauth2DeviceVerificationTitle")}
        >
            <Box
                id="kc-user-verify-device-user-code-form"
                action={url.oauth2DeviceVerificationAction}
                method="post"
                component="form"
            >
                <Box id="LoginOauth2DeviceVerifyUserCode_div_1">
                    <FormLabel
                        id="LoginOauth2DeviceVerifyUserCode_label_1"
                        htmlFor="device-user-code"
                    >
                        {msg("verifyOAuth2DeviceUserCode")}
                    </FormLabel>

                    <Box id="LoginOauth2DeviceVerifyUserCode_div_3">
                        <TextField
                            id="device-user-code"
                            name="device_user_code"
                            autoComplete="off"
                            type="text"
                            autoFocus
                        />
                    </Box>
                </Box>

                <Box id="LoginOauth2DeviceVerifyUserCode_div_4">
                    <TextField
                        id="LoginOauth2DeviceVerifyUserCode_input_2"
                        type="submit"
                        value={msgStr("doSubmit")}
                    />
                </Box>
            </Box>
        </Template>
    );
}
