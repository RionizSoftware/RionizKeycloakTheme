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
                className={kcClsx("kcFormClass")}
                action={url.oauth2DeviceVerificationAction}
                method="post"
                component="form"
                id="LoginOauth2DeviceVerifyUserCode_Box_1"
                sx={styles.LoginOauth2DeviceVerifyUserCode_Box_1}
            >
                <Box
                    className={kcClsx("kcFormGroupClass")}
                    id="LoginOauth2DeviceVerifyUserCode_Box_2"
                    sx={styles.LoginOauth2DeviceVerifyUserCode_Box_2}
                >
                    <Box
                        className={kcClsx("kcLabelWrapperClass")}
                        id="LoginOauth2DeviceVerifyUserCode_Box_3"
                        sx={styles.LoginOauth2DeviceVerifyUserCode_Box_3}
                    >
                        <FormLabel
                            htmlFor="device-user-code"
                            className={kcClsx("kcLabelClass")}
                            id="LoginOauth2DeviceVerifyUserCode_FormLabel_1"
                            sx={styles.LoginOauth2DeviceVerifyUserCode_FormLabel_1}
                        >
                            {msg("verifyOAuth2DeviceUserCode")}
                        </FormLabel>
                    </Box>

                    <Box
                        className={kcClsx("kcInputWrapperClass")}
                        id="LoginOauth2DeviceVerifyUserCode_Box_4"
                        sx={styles.LoginOauth2DeviceVerifyUserCode_Box_4}
                    >
                        <TextField
                            name="device_user_code"
                            autoComplete="off"
                            type="text"
                            className={kcClsx("kcInputClass")}
                            autoFocus
                            id="LoginOauth2DeviceVerifyUserCode_TextField_1"
                            sx={styles.LoginOauth2DeviceVerifyUserCode_TextField_1}
                        />
                    </Box>
                </Box>

                <Box
                    className={kcClsx("kcFormGroupClass")}
                    id="LoginOauth2DeviceVerifyUserCode_Box_5"
                    sx={styles.LoginOauth2DeviceVerifyUserCode_Box_5}
                >
                    <Box
                        className={kcClsx("kcFormOptionsClass")}
                        id="LoginOauth2DeviceVerifyUserCode_Box_6"
                        sx={styles.LoginOauth2DeviceVerifyUserCode_Box_6}
                    >
                        <Box
                            className={kcClsx("kcFormOptionsWrapperClass")}
                            id="LoginOauth2DeviceVerifyUserCode_Box_7"
                            sx={styles.LoginOauth2DeviceVerifyUserCode_Box_7}
                        ></Box>
                    </Box>

                    <Box
                        className={kcClsx("kcFormButtonsClass")}
                        id="LoginOauth2DeviceVerifyUserCode_Box_8"
                        sx={styles.LoginOauth2DeviceVerifyUserCode_Box_8}
                    >
                        <Box
                            className={kcClsx("kcFormButtonsWrapperClass")}
                            id="LoginOauth2DeviceVerifyUserCode_Box_9"
                            sx={styles.LoginOauth2DeviceVerifyUserCode_Box_9}
                        >
                            <TextField
                                className={kcClsx(
                                    "kcButtonClass",
                                    "kcButtonPrimaryClass",
                                    "kcButtonLargeClass"
                                )}
                                type="submit"
                                value={msgStr("doSubmit")}
                                id="LoginOauth2DeviceVerifyUserCode_TextField_2"
                                sx={styles.LoginOauth2DeviceVerifyUserCode_TextField_2}
                            />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Template>
    );
}
