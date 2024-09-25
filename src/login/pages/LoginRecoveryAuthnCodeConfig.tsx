import { clsx } from "rionizkeycloakify/tools/clsx";
import { getKcClsx, type KcClsx } from "rionizkeycloakify/login/lib/kcClsx";
import { useScript } from "rionizkeycloakify/login/pages/LoginRecoveryAuthnCodeConfig.useScript";
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
import { styles } from "../styles/pages/LoginRecoveryAuthnCodeConfig.ts";
export default function LoginRecoveryAuthnCodeConfig(
    props: PageProps<
        Extract<
            KcContext,
            {
                pageId: "login-recovery-authn-code-config.ftl";
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
    const { recoveryAuthnCodesConfigBean, isAppInitiatedAction } = kcContext;
    const { msg, msgStr } = i18n;
    const olRecoveryCodesListId = "kc-recovery-codes-list";
    useScript({ olRecoveryCodesListId, i18n });
    return (
        <Template
            id="LoginRecoveryAuthnCodeConfig_Template_1"
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            headerNode={msg("recovery-code-config-header")}
        >
            <Box
                className={clsx(
                    "pf-c-alert",
                    "pf-m-warning",
                    "pf-m-inline",
                    kcClsx("kcRecoveryCodesWarning")
                )}
                aria-label="Warning alert"
                id="LoginRecoveryAuthnCodeConfig_Box_1"
                sx={styles.LoginRecoveryAuthnCodeConfig_Box_1}
            >
                <Box
                    id="LoginRecoveryAuthnCodeConfig_Box_2"
                    sx={styles.LoginRecoveryAuthnCodeConfig_Box_2}
                >
                    <i
                        id="LoginRecoveryAuthnCodeConfig_i_1"
                        className="pficon-warning-triangle-o"
                        aria-hidden="true"
                    />
                </Box>
                <h4 id="LoginRecoveryAuthnCodeConfig_h4_1">
                    <span id="LoginRecoveryAuthnCodeConfig_span_1">Warning alert:</span>
                    {msg("recovery-code-config-warning-title")}
                </h4>
                <Box
                    id="LoginRecoveryAuthnCodeConfig_Box_3"
                    sx={styles.LoginRecoveryAuthnCodeConfig_Box_3}
                >
                    <Typography
                        id="LoginRecoveryAuthnCodeConfig_Typography_1"
                        sx={styles.LoginRecoveryAuthnCodeConfig_Typography_1}
                    >
                        {msg("recovery-code-config-warning-message")}
                    </Typography>
                </Box>
            </Box>

            <ol
                id="LoginRecoveryAuthnCodeConfig_ol_1"
                className={kcClsx("kcRecoveryCodesList")}
            >
                {recoveryAuthnCodesConfigBean.generatedRecoveryAuthnCodesList.map(
                    (code, index) => (
                        <ListItem
                            key={index}
                            id="LoginRecoveryAuthnCodeConfig_ListItem_1"
                            sx={styles.LoginRecoveryAuthnCodeConfig_ListItem_1}
                        >
                            <span id="LoginRecoveryAuthnCodeConfig_span_2">
                                {index + 1}:
                            </span>{" "}
                            {code.slice(0, 4)}-{code.slice(4, 8)}-{code.slice(8)}
                        </ListItem>
                    )
                )}
            </ol>

            {/* actions */}
            <Box
                className={kcClsx("kcRecoveryCodesActions")}
                id="LoginRecoveryAuthnCodeConfig_Box_4"
                sx={styles.LoginRecoveryAuthnCodeConfig_Box_4}
            >
                <Button
                    className={clsx("pf-c-button", "pf-m-link")}
                    type="button"
                    id="LoginRecoveryAuthnCodeConfig_Button_1"
                    sx={styles.LoginRecoveryAuthnCodeConfig_Button_1}
                >
                    <i
                        id="LoginRecoveryAuthnCodeConfig_i_2"
                        className="pficon-print"
                        aria-hidden="true"
                    />{" "}
                    {msg("recovery-codes-print")}
                </Button>
                <Button
                    className={clsx("pf-c-button", "pf-m-link")}
                    type="button"
                    id="LoginRecoveryAuthnCodeConfig_Button_2"
                    sx={styles.LoginRecoveryAuthnCodeConfig_Button_2}
                >
                    <i
                        id="LoginRecoveryAuthnCodeConfig_i_3"
                        className="pficon-save"
                        aria-hidden="true"
                    />{" "}
                    {msg("recovery-codes-download")}
                </Button>
                <Button
                    className={clsx("pf-c-button", "pf-m-link")}
                    type="button"
                    id="LoginRecoveryAuthnCodeConfig_Button_3"
                    sx={styles.LoginRecoveryAuthnCodeConfig_Button_3}
                >
                    <i
                        id="LoginRecoveryAuthnCodeConfig_i_4"
                        className="pficon-blueprint"
                        aria-hidden="true"
                    />{" "}
                    {msg("recovery-codes-copy")}
                </Button>
            </Box>

            {/* confirmation checkbox */}
            <Box
                className={kcClsx("kcFormOptionsClass")}
                id="LoginRecoveryAuthnCodeConfig_Box_5"
                sx={styles.LoginRecoveryAuthnCodeConfig_Box_5}
            >
                <TextField
                    className={kcClsx("kcCheckInputClass")}
                    type="checkbox"
                    name="kcRecoveryCodesConfirmationCheck"
                    onChange={function () {
                        //@ts-expect-error: This is code from the original theme, we trust it.
                        document.getElementById("saveRecoveryAuthnCodesBtn").disabled =
                            !this.checked;
                    }}
                    id="LoginRecoveryAuthnCodeConfig_TextField_1"
                    sx={styles.LoginRecoveryAuthnCodeConfig_TextField_1}
                />
                <FormLabel
                    htmlFor="kcRecoveryCodesConfirmationCheck"
                    id="LoginRecoveryAuthnCodeConfig_FormLabel_1"
                    sx={styles.LoginRecoveryAuthnCodeConfig_FormLabel_1}
                >
                    {msg("recovery-codes-confirmation-message")}
                </FormLabel>
            </Box>

            <Box
                action={kcContext.url.loginAction}
                className={kcClsx("kcFormGroupClass")}
                method="post"
                component="form"
                id="LoginRecoveryAuthnCodeConfig_Box_6"
                sx={styles.LoginRecoveryAuthnCodeConfig_Box_6}
            >
                <TextField
                    type="hidden"
                    name="generatedRecoveryAuthnCodes"
                    value={
                        recoveryAuthnCodesConfigBean.generatedRecoveryAuthnCodesAsString
                    }
                    id="LoginRecoveryAuthnCodeConfig_TextField_2"
                    sx={styles.LoginRecoveryAuthnCodeConfig_TextField_2}
                />
                <TextField
                    type="hidden"
                    name="generatedAt"
                    value={recoveryAuthnCodesConfigBean.generatedAt}
                    id="LoginRecoveryAuthnCodeConfig_TextField_3"
                    sx={styles.LoginRecoveryAuthnCodeConfig_TextField_3}
                />
                <TextField
                    type="hidden"
                    name="userLabel"
                    value={msgStr("recovery-codes-label-default")}
                    id="LoginRecoveryAuthnCodeConfig_TextField_4"
                    sx={styles.LoginRecoveryAuthnCodeConfig_TextField_4}
                />

                <LogoutOtherSessions
                    id="LoginRecoveryAuthnCodeConfig_LogoutOtherSessions_1"
                    kcClsx={kcClsx}
                    i18n={i18n}
                />

                {isAppInitiatedAction ? (
                    <>
                        <TextField
                            type="submit"
                            className={kcClsx(
                                "kcButtonClass",
                                "kcButtonPrimaryClass",
                                "kcButtonLargeClass"
                            )}
                            value={msgStr("recovery-codes-action-complete")}
                            disabled
                            id="LoginRecoveryAuthnCodeConfig_TextField_5"
                            sx={styles.LoginRecoveryAuthnCodeConfig_TextField_5}
                        />
                        <Button
                            type="submit"
                            className={kcClsx(
                                "kcButtonClass",
                                "kcButtonDefaultClass",
                                "kcButtonLargeClass"
                            )}
                            name="cancel-aia"
                            value="true"
                            id="LoginRecoveryAuthnCodeConfig_Button_4"
                            sx={styles.LoginRecoveryAuthnCodeConfig_Button_4}
                        >
                            {msg("recovery-codes-action-cancel")}
                        </Button>
                    </>
                ) : (
                    <TextField
                        type="submit"
                        className={kcClsx(
                            "kcButtonClass",
                            "kcButtonPrimaryClass",
                            "kcButtonBlockClass",
                            "kcButtonLargeClass"
                        )}
                        value={msgStr("recovery-codes-action-complete")}
                        disabled
                        id="LoginRecoveryAuthnCodeConfig_TextField_6"
                        sx={styles.LoginRecoveryAuthnCodeConfig_TextField_6}
                    />
                )}
            </Box>
        </Template>
    );
}
function LogoutOtherSessions(props: { kcClsx: KcClsx; i18n: I18n }) {
    const { kcClsx, i18n } = props;
    const { msg } = i18n;
    return (
        <Box
            className={kcClsx("kcFormOptionsClass")}
            id="LoginRecoveryAuthnCodeConfig_Box_7"
            sx={styles.LoginRecoveryAuthnCodeConfig_Box_7}
        >
            <Box
                className={kcClsx("kcFormOptionsWrapperClass")}
                id="LoginRecoveryAuthnCodeConfig_Box_8"
                sx={styles.LoginRecoveryAuthnCodeConfig_Box_8}
            >
                <Box
                    id="LoginRecoveryAuthnCodeConfig_Box_9"
                    sx={styles.LoginRecoveryAuthnCodeConfig_Box_9}
                >
                    <FormLabel
                        id="LoginRecoveryAuthnCodeConfig_FormLabel_2"
                        sx={styles.LoginRecoveryAuthnCodeConfig_FormLabel_2}
                    >
                        <TextField
                            type="checkbox"
                            name="logout-sessions"
                            value="on"
                            defaultChecked={true}
                            id="LoginRecoveryAuthnCodeConfig_TextField_7"
                            sx={styles.LoginRecoveryAuthnCodeConfig_TextField_7}
                        />
                        {msg("logoutOtherSessions")}
                    </FormLabel>
                </Box>
            </Box>
        </Box>
    );
}
