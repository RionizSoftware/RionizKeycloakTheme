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
        <Template
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
                id="Box_1"
                sx={styles.Box_1}
            >
                <Box
                    style={{ marginTop: "0", marginBottom: "30px" }}
                    id="Box_2"
                    sx={styles.Box_2}
                >
                    <span></span>
                    {msg("irreversibleAction")}
                </Box>
                <Typography id="Typography_1" sx={styles.Typography_1}>
                    {msg("deletingImplies")}
                </Typography>
                <List
                    style={{
                        color: "#72767b",
                        listStyle: "disc",
                        listStylePosition: "inside"
                    }}
                    id="List_1"
                    sx={styles.List_1}
                >
                    <ListItem id="ListItem_1" sx={styles.ListItem_1}>
                        {msg("loggingOutImmediately")}
                    </ListItem>
                    <ListItem id="ListItem_2" sx={styles.ListItem_2}>
                        {msg("errasingData")}
                    </ListItem>
                </List>
                <Typography id="Typography_2" sx={styles.Typography_2}>
                    {msg("finalDeletionConfirmation")}
                </Typography>
                <Box id="Box_3" sx={styles.Box_3}>
                    <TextField
                        type="submit"
                        value={msgStr("doConfirmDelete")}
                        id="TextField_1"
                        sx={styles.TextField_1}
                    />
                    {triggered_from_aia && (
                        <Button
                            style={{ marginLeft: "calc(100% - 220px)" }}
                            type="submit"
                            name="cancel-aia"
                            value="true"
                            id="Button_1"
                            sx={styles.Button_1}
                        >
                            {msgStr("doCancel")}
                        </Button>
                    )}
                </Box>
            </Box>
        </Template>
    );
}
