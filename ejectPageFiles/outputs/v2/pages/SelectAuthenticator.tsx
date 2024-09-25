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
import { styles } from "../styles/pages/SelectAuthenticator.ts";
export default function SelectAuthenticator(
    props: PageProps<
        Extract<
            KcContext,
            {
                pageId: "select-authenticator.ftl";
            }
        >,
        I18n
    >
) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
    const { url, auth } = kcContext;
    const { kcClsx } = getKcClsx({ doUseDefaultCss, classes });
    const { msg, advancedMsg } = i18n;
    return (
        <Template
            id="SelectAuthenticator_Template_1"
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayInfo={false}
            headerNode={msg("loginChooseAuthenticator")}
        >
            <Box
                id="kc-select-credential-form"
                action={url.loginAction}
                method="post"
                component="form"
            >
                <Box id="SelectAuthenticator_div_1">
                    {auth.authenticationSelections.map((authenticationSelection, i) => (
                        <Button
                            id="SelectAuthenticator_button_1"
                            key={i}
                            type="submit"
                            name="authenticationExecution"
                            value={authenticationSelection.authExecId}
                        >
                            <Box id="SelectAuthenticator_div_2">
                                <i id="SelectAuthenticator_i_1" />
                            </Box>
                            <Box id="SelectAuthenticator_div_3">
                                {advancedMsg(authenticationSelection.displayName)}
                                {advancedMsg(authenticationSelection.helpText)}
                            </Box>

                            <Box id="SelectAuthenticator_div_7">
                                <i id="SelectAuthenticator_i_2" />
                            </Box>
                        </Button>
                    ))}
                </Box>
            </Box>
        </Template>
    );
}
