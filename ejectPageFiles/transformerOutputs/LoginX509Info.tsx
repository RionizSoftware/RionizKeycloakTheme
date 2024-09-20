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
import { styles } from "./styles/LoginX509Info.ts";
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
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            headerNode={msg("doLogIn")}
        >
            <Box
                action={url.loginAction}
                method="post"
                component="form"
                id="Box_1"
                sx={styles.Box_1}
            >
                <Box id="Box_2" sx={styles.Box_2}>
                    <FormLabel
                        htmlFor="certificate_subjectDN"
                        id="FormLabel_1"
                        sx={styles.FormLabel_1}
                    >
                        {msg("clientCertificate")}
                    </FormLabel>

                    {x509.formData.subjectDN ? (
                        <Box id="Box_3" sx={styles.Box_3}>
                            <FormLabel id="FormLabel_2" sx={styles.FormLabel_2}>
                                {x509.formData.subjectDN}
                            </FormLabel>
                        </Box>
                    ) : (
                        <Box id="Box_4" sx={styles.Box_4}>
                            <FormLabel id="FormLabel_3" sx={styles.FormLabel_3}>
                                {msg("noCertificate")}
                            </FormLabel>
                        </Box>
                    )}
                </Box>
                <Box id="Box_5" sx={styles.Box_5}>
                    {x509.formData.isUserEnabled && (
                        <>
                            <Box id="Box_6" sx={styles.Box_6}>
                                <FormLabel
                                    htmlFor="username"
                                    id="FormLabel_4"
                                    sx={styles.FormLabel_4}
                                >
                                    {msg("doX509Login")}
                                </FormLabel>
                            </Box>
                            <Box id="Box_7" sx={styles.Box_7}>
                                <FormLabel id="FormLabel_5" sx={styles.FormLabel_5}>
                                    {x509.formData.username}
                                </FormLabel>
                            </Box>
                        </>
                    )}
                </Box>
                <Box id="Box_8" sx={styles.Box_8}>
                    <TextField
                        name="login"
                        type="submit"
                        value={msgStr("doContinue")}
                        id="TextField_1"
                        sx={styles.TextField_1}
                    />
                    {x509.formData.isUserEnabled && (
                        <TextField
                            name="cancel"
                            type="submit"
                            value={msgStr("doIgnore")}
                            id="TextField_2"
                            sx={styles.TextField_2}
                        />
                    )}
                </Box>
            </Box>
        </Template>
    );
}
