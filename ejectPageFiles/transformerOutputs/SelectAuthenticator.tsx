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
import { styles } from "./styles/SelectAuthenticator.ts";
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
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayInfo={false}
            headerNode={msg("loginChooseAuthenticator")}
        >
            <Box
                action={url.loginAction}
                method="post"
                component="form"
                id="SelectAuthenticator_Box_1"
                sx={styles.SelectAuthenticator_Box_1}
            >
                <Box id="SelectAuthenticator_Box_2" sx={styles.SelectAuthenticator_Box_2}>
                    {auth.authenticationSelections.map((authenticationSelection, i) => (
                        <Button
                            key={i}
                            type="submit"
                            name="authenticationExecution"
                            value={authenticationSelection.authExecId}
                            id="SelectAuthenticator_Button_1"
                            sx={styles.SelectAuthenticator_Button_1}
                        >
                            <Box
                                id="SelectAuthenticator_Box_3"
                                sx={styles.SelectAuthenticator_Box_3}
                            >
                                <i />
                            </Box>
                            <Box
                                id="SelectAuthenticator_Box_4"
                                sx={styles.SelectAuthenticator_Box_4}
                            >
                                {advancedMsg(authenticationSelection.displayName)}
                                {advancedMsg(authenticationSelection.helpText)}
                            </Box>

                            <Box
                                id="SelectAuthenticator_Box_5"
                                sx={styles.SelectAuthenticator_Box_5}
                            >
                                <i />
                            </Box>
                        </Button>
                    ))}
                </Box>
            </Box>
        </Template>
    );
}
