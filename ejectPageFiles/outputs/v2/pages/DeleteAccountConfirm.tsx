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
                action={url.loginAction}
                method="post"
                component="form"
                id="DeleteAccountConfirm_Box_1"
                sx={styles.DeleteAccountConfirm_Box_1}
            >
                <Box
                    style={{ marginTop: "0", marginBottom: "30px" }}
                    id="DeleteAccountConfirm_Box_2"
                    sx={styles.DeleteAccountConfirm_Box_2}
                >
                    <span id="DeleteAccountConfirm_span_1"></span>
                    {msg("irreversibleAction")}
                </Box>
                <Typography
                    id="DeleteAccountConfirm_Typography_1"
                    sx={styles.DeleteAccountConfirm_Typography_1}
                >
                    {msg("deletingImplies")}
                </Typography>
                <List
                    style={{
                        color: "#72767b",
                        listStyle: "disc",
                        listStylePosition: "inside"
                    }}
                    id="DeleteAccountConfirm_List_1"
                    sx={styles.DeleteAccountConfirm_List_1}
                >
                    <ListItem
                        id="DeleteAccountConfirm_ListItem_1"
                        sx={styles.DeleteAccountConfirm_ListItem_1}
                    >
                        {msg("loggingOutImmediately")}
                    </ListItem>
                    <ListItem
                        id="DeleteAccountConfirm_ListItem_2"
                        sx={styles.DeleteAccountConfirm_ListItem_2}
                    >
                        {msg("errasingData")}
                    </ListItem>
                </List>
                <Typography
                    id="DeleteAccountConfirm_Typography_2"
                    sx={styles.DeleteAccountConfirm_Typography_2}
                >
                    {msg("finalDeletionConfirmation")}
                </Typography>
                <Box
                    id="DeleteAccountConfirm_Box_3"
                    sx={styles.DeleteAccountConfirm_Box_3}
                >
                    <TextField
                        type="submit"
                        value={msgStr("doConfirmDelete")}
                        id="DeleteAccountConfirm_TextField_1"
                        sx={styles.DeleteAccountConfirm_TextField_1}
                    />
                    {triggered_from_aia && (
                        <Button
                            style={{ marginLeft: "calc(100% - 220px)" }}
                            type="submit"
                            name="cancel-aia"
                            value="true"
                            id="DeleteAccountConfirm_Button_1"
                            sx={styles.DeleteAccountConfirm_Button_1}
                        >
                            {msgStr("doCancel")}
                        </Button>
                    )}
                </Box>
            </Box>
        </Template>
    );
}
