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
import { styles } from "../styles/pages/LoginX509Info.ts";
export default function LoginX509Info(
    props: PageProps<
        Extract<
            KcContext,
            {
                pageId: "login-x509-info.ftl";
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
    const { url, x509 } = kcContext;
    const { msg, msgStr } = i18n;
    return (
        <Template
            id="LoginX509Info_Template_1"
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            headerNode={msg("doLogIn")}
        >
            <Box
                className={kcClsx("kcFormClass")}
                action={url.loginAction}
                method="post"
                component="form"
                id="LoginX509Info_Box_1"
                sx={styles.LoginX509Info_Box_1}
            >
                <Box
                    className={kcClsx("kcFormGroupClass")}
                    id="LoginX509Info_Box_2"
                    sx={styles.LoginX509Info_Box_2}
                >
                    <Box
                        className={kcClsx("kcLabelWrapperClass")}
                        id="LoginX509Info_Box_3"
                        sx={styles.LoginX509Info_Box_3}
                    >
                        <FormLabel
                            htmlFor="certificate_subjectDN"
                            className={kcClsx("kcLabelClass")}
                            id="LoginX509Info_FormLabel_1"
                            sx={styles.LoginX509Info_FormLabel_1}
                        >
                            {msg("clientCertificate")}
                        </FormLabel>
                    </Box>
                    {x509.formData.subjectDN ? (
                        <Box
                            className={kcClsx("kcLabelWrapperClass")}
                            id="LoginX509Info_Box_4"
                            sx={styles.LoginX509Info_Box_4}
                        >
                            <FormLabel
                                className={kcClsx("kcLabelClass")}
                                id="LoginX509Info_FormLabel_2"
                                sx={styles.LoginX509Info_FormLabel_2}
                            >
                                {x509.formData.subjectDN}
                            </FormLabel>
                        </Box>
                    ) : (
                        <Box
                            className={kcClsx("kcLabelWrapperClass")}
                            id="LoginX509Info_Box_5"
                            sx={styles.LoginX509Info_Box_5}
                        >
                            <FormLabel
                                className={kcClsx("kcLabelClass")}
                                id="LoginX509Info_FormLabel_3"
                                sx={styles.LoginX509Info_FormLabel_3}
                            >
                                {msg("noCertificate")}
                            </FormLabel>
                        </Box>
                    )}
                </Box>
                <Box
                    className={kcClsx("kcFormGroupClass")}
                    id="LoginX509Info_Box_6"
                    sx={styles.LoginX509Info_Box_6}
                >
                    {x509.formData.isUserEnabled && (
                        <>
                            <Box
                                className={kcClsx("kcLabelWrapperClass")}
                                id="LoginX509Info_Box_7"
                                sx={styles.LoginX509Info_Box_7}
                            >
                                <FormLabel
                                    htmlFor="username"
                                    className={kcClsx("kcLabelClass")}
                                    id="LoginX509Info_FormLabel_4"
                                    sx={styles.LoginX509Info_FormLabel_4}
                                >
                                    {msg("doX509Login")}
                                </FormLabel>
                            </Box>
                            <Box
                                className={kcClsx("kcLabelWrapperClass")}
                                id="LoginX509Info_Box_8"
                                sx={styles.LoginX509Info_Box_8}
                            >
                                <FormLabel
                                    className={kcClsx("kcLabelClass")}
                                    id="LoginX509Info_FormLabel_5"
                                    sx={styles.LoginX509Info_FormLabel_5}
                                >
                                    {x509.formData.username}
                                </FormLabel>
                            </Box>
                        </>
                    )}
                </Box>
                <Box
                    className={kcClsx("kcFormGroupClass")}
                    id="LoginX509Info_Box_9"
                    sx={styles.LoginX509Info_Box_9}
                >
                    <Box
                        className={kcClsx("kcFormOptionsClass")}
                        id="LoginX509Info_Box_10"
                        sx={styles.LoginX509Info_Box_10}
                    >
                        <Box
                            className={kcClsx("kcFormOptionsWrapperClass")}
                            id="LoginX509Info_Box_11"
                            sx={styles.LoginX509Info_Box_11}
                        />
                    </Box>
                    <Box
                        className={kcClsx("kcFormButtonsClass")}
                        id="LoginX509Info_Box_12"
                        sx={styles.LoginX509Info_Box_12}
                    >
                        <Box
                            className={kcClsx("kcFormButtonsWrapperClass")}
                            id="LoginX509Info_Box_13"
                            sx={styles.LoginX509Info_Box_13}
                        >
                            <TextField
                                className={kcClsx(
                                    "kcButtonClass",
                                    "kcButtonPrimaryClass",
                                    "kcButtonLargeClass"
                                )}
                                name="login"
                                type="submit"
                                value={msgStr("doContinue")}
                                id="LoginX509Info_TextField_1"
                                sx={styles.LoginX509Info_TextField_1}
                            />
                            {x509.formData.isUserEnabled && (
                                <TextField
                                    className={kcClsx(
                                        "kcButtonClass",
                                        "kcButtonDefaultClass",
                                        "kcButtonLargeClass"
                                    )}
                                    name="cancel"
                                    type="submit"
                                    value={msgStr("doIgnore")}
                                    id="LoginX509Info_TextField_2"
                                    sx={styles.LoginX509Info_TextField_2}
                                />
                            )}
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Template>
    );
}
