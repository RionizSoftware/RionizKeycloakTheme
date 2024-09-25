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
                className={kcClsx("kcFormClass")}
                action={url.loginAction}
                method="post"
                component="form"
                id="SelectAuthenticator_Box_1"
                sx={styles.SelectAuthenticator_Box_1}
            >
                <Box
                    className={kcClsx("kcSelectAuthListClass")}
                    id="SelectAuthenticator_Box_2"
                    sx={styles.SelectAuthenticator_Box_2}
                >
                    {auth.authenticationSelections.map((authenticationSelection, i) => (
                        <Button
                            key={i}
                            className={kcClsx("kcSelectAuthListItemClass")}
                            type="submit"
                            name="authenticationExecution"
                            value={authenticationSelection.authExecId}
                            id="SelectAuthenticator_Button_1"
                            sx={styles.SelectAuthenticator_Button_1}
                        >
                            <Box
                                className={kcClsx("kcSelectAuthListItemIconClass")}
                                id="SelectAuthenticator_Box_3"
                                sx={styles.SelectAuthenticator_Box_3}
                            >
                                <i
                                    id="SelectAuthenticator_i_1"
                                    className={kcClsx(
                                        "kcSelectAuthListItemIconPropertyClass",
                                        authenticationSelection.iconCssClass
                                    )}
                                />
                            </Box>
                            <Box
                                className={kcClsx("kcSelectAuthListItemBodyClass")}
                                id="SelectAuthenticator_Box_4"
                                sx={styles.SelectAuthenticator_Box_4}
                            >
                                <Box
                                    className={kcClsx("kcSelectAuthListItemHeadingClass")}
                                    id="SelectAuthenticator_Box_5"
                                    sx={styles.SelectAuthenticator_Box_5}
                                >
                                    {advancedMsg(authenticationSelection.displayName)}
                                </Box>
                                <Box
                                    className={kcClsx(
                                        "kcSelectAuthListItemDescriptionClass"
                                    )}
                                    id="SelectAuthenticator_Box_6"
                                    sx={styles.SelectAuthenticator_Box_6}
                                >
                                    {advancedMsg(authenticationSelection.helpText)}
                                </Box>
                            </Box>
                            <Box
                                className={kcClsx("kcSelectAuthListItemFillClass")}
                                id="SelectAuthenticator_Box_7"
                                sx={styles.SelectAuthenticator_Box_7}
                            />
                            <Box
                                className={kcClsx("kcSelectAuthListItemArrowClass")}
                                id="SelectAuthenticator_Box_8"
                                sx={styles.SelectAuthenticator_Box_8}
                            >
                                <i
                                    id="SelectAuthenticator_i_2"
                                    className={kcClsx(
                                        "kcSelectAuthListItemArrowIconClass"
                                    )}
                                />
                            </Box>
                        </Button>
                    ))}
                </Box>
            </Box>
        </Template>
    );
}
