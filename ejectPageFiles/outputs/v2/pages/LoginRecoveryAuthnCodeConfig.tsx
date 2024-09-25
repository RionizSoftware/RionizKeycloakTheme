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
            <Box id="LoginRecoveryAuthnCodeConfig_div_1" aria-label="Warning alert">
                <Box id="LoginRecoveryAuthnCodeConfig_div_2">
                    <i id="LoginRecoveryAuthnCodeConfig_i_1" aria-hidden="true" />
                </Box>
                <h4 id="LoginRecoveryAuthnCodeConfig_h4_1">
                    <span id="LoginRecoveryAuthnCodeConfig_span_1">Warning alert:</span>
                    {msg("recovery-code-config-warning-title")}
                </h4>
                <Box id="LoginRecoveryAuthnCodeConfig_div_3">
                    <Typography id="LoginRecoveryAuthnCodeConfig_p_1">
                        {msg("recovery-code-config-warning-message")}
                    </Typography>
                </Box>
            </Box>

            <ol id={olRecoveryCodesListId}>
                {recoveryAuthnCodesConfigBean.generatedRecoveryAuthnCodesList.map(
                    (code, index) => (
                        <ListItem id="LoginRecoveryAuthnCodeConfig_li_1" key={index}>
                            <span id="LoginRecoveryAuthnCodeConfig_span_2">
                                {index + 1}:
                            </span>{" "}
                            {code.slice(0, 4)}-{code.slice(4, 8)}-{code.slice(8)}
                        </ListItem>
                    )
                )}
            </ol>

            {/* actions */}
            <Box id="LoginRecoveryAuthnCodeConfig_div_4">
                <Button id="printRecoveryCodes" type="button">
                    <i id="LoginRecoveryAuthnCodeConfig_i_2" aria-hidden="true" />{" "}
                    {msg("recovery-codes-print")}
                </Button>
                <Button id="downloadRecoveryCodes" type="button">
                    <i id="LoginRecoveryAuthnCodeConfig_i_3" aria-hidden="true" />{" "}
                    {msg("recovery-codes-download")}
                </Button>
                <Button id="copyRecoveryCodes" type="button">
                    <i id="LoginRecoveryAuthnCodeConfig_i_4" aria-hidden="true" />{" "}
                    {msg("recovery-codes-copy")}
                </Button>
            </Box>

            {/* confirmation checkbox */}
            <Box id="LoginRecoveryAuthnCodeConfig_div_5">
                <TextField
                    type="checkbox"
                    id="kcRecoveryCodesConfirmationCheck"
                    name="kcRecoveryCodesConfirmationCheck"
                    onChange={function () {
                        //@ts-expect-error: This is code from the original theme, we trust it.
                        document.getElementById("saveRecoveryAuthnCodesBtn").disabled =
                            !this.checked;
                    }}
                />
                <FormLabel
                    id="LoginRecoveryAuthnCodeConfig_label_1"
                    htmlFor="kcRecoveryCodesConfirmationCheck"
                >
                    {msg("recovery-codes-confirmation-message")}
                </FormLabel>
            </Box>

            <Box
                action={kcContext.url.loginAction}
                id="kc-recovery-codes-settings-form"
                method="post"
                component="form"
            >
                <TextField
                    id="LoginRecoveryAuthnCodeConfig_input_2"
                    type="hidden"
                    name="generatedRecoveryAuthnCodes"
                    value={
                        recoveryAuthnCodesConfigBean.generatedRecoveryAuthnCodesAsString
                    }
                />
                <TextField
                    id="LoginRecoveryAuthnCodeConfig_input_3"
                    type="hidden"
                    name="generatedAt"
                    value={recoveryAuthnCodesConfigBean.generatedAt}
                />
                <TextField
                    type="hidden"
                    id="userLabel"
                    name="userLabel"
                    value={msgStr("recovery-codes-label-default")}
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
                            id="saveRecoveryAuthnCodesBtn"
                            value={msgStr("recovery-codes-action-complete")}
                            disabled
                        />
                        <Button
                            type="submit"
                            id="cancelRecoveryAuthnCodesBtn"
                            name="cancel-aia"
                            value="true"
                        >
                            {msg("recovery-codes-action-cancel")}
                        </Button>
                    </>
                ) : (
                    <TextField
                        type="submit"
                        id="saveRecoveryAuthnCodesBtn"
                        value={msgStr("recovery-codes-action-complete")}
                        disabled
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
        <Box id="kc-form-options">
            <FormLabel id="LoginRecoveryAuthnCodeConfig_label_2">
                <TextField
                    type="checkbox"
                    id="logout-sessions"
                    name="logout-sessions"
                    value="on"
                    defaultChecked={true}
                />
                {msg("logoutOtherSessions")}
            </FormLabel>
        </Box>
    );
}
