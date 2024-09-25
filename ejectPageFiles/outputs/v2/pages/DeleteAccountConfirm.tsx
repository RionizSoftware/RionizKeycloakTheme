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
import { styles } from "../styles/pages/DeleteAccountConfirm.ts";
export default function DeleteAccountConfirm(
    props: PageProps<
        Extract<
            KcContext,
            {
                pageId: "delete-account-confirm.ftl";
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
    const { url, triggered_from_aia } = kcContext;
    const { msg, msgStr } = i18n;
    return (
        <Template
            id="DeleteAccountConfirm_Template_1"
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            headerNode={msg("deleteAccountConfirm")}
        >
            <Box
                id="DeleteAccountConfirm_form_1"
                action={url.loginAction}
                method="post"
                component="form"
            >
                <Box
                    id="DeleteAccountConfirm_div_1"
                    style={{ marginTop: "0", marginBottom: "30px" }}
                >
                    <span id="DeleteAccountConfirm_span_1"></span>
                    {msg("irreversibleAction")}
                </Box>
                <Typography id="DeleteAccountConfirm_p_1">
                    {msg("deletingImplies")}
                </Typography>
                <List
                    id="DeleteAccountConfirm_ul_1"
                    style={{
                        color: "#72767b",
                        listStyle: "disc",
                        listStylePosition: "inside"
                    }}
                >
                    <ListItem id="DeleteAccountConfirm_li_1">
                        {msg("loggingOutImmediately")}
                    </ListItem>
                    <ListItem id="DeleteAccountConfirm_li_2">
                        {msg("errasingData")}
                    </ListItem>
                </List>
                <Typography id="DeleteAccountConfirm_p_2">
                    {msg("finalDeletionConfirmation")}
                </Typography>
                <Box id="kc-form-buttons">
                    <TextField
                        id="DeleteAccountConfirm_input_1"
                        type="submit"
                        value={msgStr("doConfirmDelete")}
                    />
                    {triggered_from_aia && (
                        <Button
                            id="DeleteAccountConfirm_button_1"
                            style={{ marginLeft: "calc(100% - 220px)" }}
                            type="submit"
                            name="cancel-aia"
                            value="true"
                        >
                            {msgStr("doCancel")}
                        </Button>
                    )}
                </Box>
            </Box>
        </Template>
    );
}
