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
    ListItem,
    Checkbox,
    Radio
} from "@mui/material";
import { styles } from "../styles/pages/Terms.ts";
export default function Terms(
    props: PageProps<
        Extract<
            KcContext,
            {
                pageId: "terms.ftl";
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
    const { msg, msgStr } = i18n;
    const { url } = kcContext;
    return (
        <Template
            id="Terms_Template_1"
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={false}
            headerNode={msg("termsTitle")}
        >
            <Box id="Terms_Box_1" sx={styles.Terms_Box_1}>
                {msg("termsText")}
            </Box>
            <Box
                action={url.loginAction}
                method="POST"
                component="form"
                id="Terms_Box_2"
                sx={styles.Terms_Box_2}
            >
                <Button
                    name="accept"
                    type="submit"
                    value={msgStr("doAccept")}
                    fullWidth={true}
                    id="Terms_Button_1"
                    sx={styles.Terms_Button_1}
                />
                <Button
                    name="cancel"
                    type="submit"
                    value={msgStr("doDecline")}
                    fullWidth={true}
                    id="Terms_Button_2"
                    sx={styles.Terms_Button_2}
                />
            </Box>
        </Template>
    );
}
