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
import { styles } from "./styles/DeleteAccountConfirm.ts";
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
        <Template id="DeleteAccountConfirm_Template_1">
            <Box
                component="form"
                id="DeleteAccountConfirm_Box_1"
                sx={styles.DeleteAccountConfirm_Box_1}
            >
                <Box
                    id="DeleteAccountConfirm_Box_2"
                    sx={styles.DeleteAccountConfirm_Box_2}
                >
                    {msg("irreversibleAction")}
                </Box>
                <Typography
                    id="DeleteAccountConfirm_Typography_1"
                    sx={styles.DeleteAccountConfirm_Typography_1}
                >
                    {msg("deletingImplies")}
                </Typography>
                <List
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
                        id="DeleteAccountConfirm_TextField_1"
                        sx={styles.DeleteAccountConfirm_TextField_1}
                    />
                    {triggered_from_aia && (
                        <Button
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
