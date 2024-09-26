import { getKcClsx } from "rionizkeycloakify/login/lib/kcClsx";
import type { PageProps } from "rionizkeycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Box, Button, Link, TextField, FormLabel, Typography, List, ListItem, Checkbox, Radio } from "@mui/material";
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
        <Template kcContext={kcContext} i18n={i18n} doUseDefaultCss={doUseDefaultCss} classes={classes} headerNode={msg("doLogIn")}>
            <Box action={url.loginAction} method="post" component="form" id="LoginX509Info_Box_1" sx={styles.LoginX509Info_Box_1}>
                <Box id="LoginX509Info_Box_2" sx={styles.LoginX509Info_Box_2}>
                    <FormLabel htmlFor="certificate_subjectDN" id="LoginX509Info_FormLabel_1" sx={styles.LoginX509Info_FormLabel_1}>
                        {msg("clientCertificate")}
                    </FormLabel>

                    {x509.formData.subjectDN ? (
                        <Box id="LoginX509Info_Box_3" sx={styles.LoginX509Info_Box_3}>
                            <FormLabel id="LoginX509Info_FormLabel_2" sx={styles.LoginX509Info_FormLabel_2}>
                                {x509.formData.subjectDN}
                            </FormLabel>
                        </Box>
                    ) : (
                        <Box id="LoginX509Info_Box_4" sx={styles.LoginX509Info_Box_4}>
                            <FormLabel id="LoginX509Info_FormLabel_3" sx={styles.LoginX509Info_FormLabel_3}>
                                {msg("noCertificate")}
                            </FormLabel>
                        </Box>
                    )}
                </Box>
                <Box id="LoginX509Info_Box_5" sx={styles.LoginX509Info_Box_5}>
                    {x509.formData.isUserEnabled && (
                        <>
                            <Box id="LoginX509Info_Box_6" sx={styles.LoginX509Info_Box_6}>
                                <FormLabel htmlFor="username" id="LoginX509Info_FormLabel_4" sx={styles.LoginX509Info_FormLabel_4}>
                                    {msg("doX509Login")}
                                </FormLabel>
                            </Box>
                            <Box id="LoginX509Info_Box_7" sx={styles.LoginX509Info_Box_7}>
                                <FormLabel id="LoginX509Info_FormLabel_5" sx={styles.LoginX509Info_FormLabel_5}>
                                    {x509.formData.username}
                                </FormLabel>
                            </Box>
                        </>
                    )}
                </Box>
                <Box id="LoginX509Info_Box_8" sx={styles.LoginX509Info_Box_8}>
                    <Button
                        name="login"
                        type="submit"
                        value={msgStr("doContinue")}
                        fullWidth={true}
                        id="LoginX509Info_Button_1"
                        sx={styles.LoginX509Info_Button_1}
                    />
                    {x509.formData.isUserEnabled && (
                        <Button
                            name="cancel"
                            type="submit"
                            value={msgStr("doIgnore")}
                            fullWidth={true}
                            id="LoginX509Info_Button_2"
                            sx={styles.LoginX509Info_Button_2}
                        />
                    )}
                </Box>
            </Box>
        </Template>
    );
}
