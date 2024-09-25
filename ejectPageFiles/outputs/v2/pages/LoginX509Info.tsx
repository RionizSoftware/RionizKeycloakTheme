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
                id="kc-x509-login-info"
                action={url.loginAction}
                method="post"
                component="form"
            >
                <Box id="LoginX509Info_div_1">
                    <FormLabel id="LoginX509Info_label_1" htmlFor="certificate_subjectDN">
                        {msg("clientCertificate")}
                    </FormLabel>

                    {x509.formData.subjectDN ? (
                        <Box id="LoginX509Info_div_3">
                            <FormLabel id="certificate_subjectDN">
                                {x509.formData.subjectDN}
                            </FormLabel>
                        </Box>
                    ) : (
                        <Box id="LoginX509Info_div_4">
                            <FormLabel id="certificate_subjectDN">
                                {msg("noCertificate")}
                            </FormLabel>
                        </Box>
                    )}
                </Box>
                <Box id="LoginX509Info_div_5">
                    {x509.formData.isUserEnabled && (
                        <>
                            <Box id="LoginX509Info_div_6">
                                <FormLabel id="LoginX509Info_label_4" htmlFor="username">
                                    {msg("doX509Login")}
                                </FormLabel>
                            </Box>
                            <Box id="LoginX509Info_div_7">
                                <FormLabel id="username">
                                    {x509.formData.username}
                                </FormLabel>
                            </Box>
                        </>
                    )}
                </Box>
                <Box id="LoginX509Info_div_8">
                    <TextField
                        name="login"
                        id="kc-login"
                        type="submit"
                        value={msgStr("doContinue")}
                    />
                    {x509.formData.isUserEnabled && (
                        <TextField
                            name="cancel"
                            id="kc-cancel"
                            type="submit"
                            value={msgStr("doIgnore")}
                        />
                    )}
                </Box>
            </Box>
        </Template>
    );
}
