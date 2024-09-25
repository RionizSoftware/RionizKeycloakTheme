import { getKcClsx, KcClsx } from "rionizkeycloakify/login/lib/kcClsx";
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
import { styles } from "../styles/pages/LoginConfigTotp.ts";
export default function LoginConfigTotp(
    props: PageProps<
        Extract<
            KcContext,
            {
                pageId: "login-config-totp.ftl";
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
    const { url, isAppInitiatedAction, totp, mode, messagesPerField } = kcContext;
    const { msg, msgStr, advancedMsg } = i18n;
    return (
        <Template
            id="LoginConfigTotp_Template_1"
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            headerNode={msg("loginTotpTitle")}
            displayMessage={!messagesPerField.existsError("totp", "userLabel")}
        >
            <>
                <ol id="kc-totp-settings">
                    <ListItem
                        id="LoginConfigTotp_ListItem_1"
                        sx={styles.LoginConfigTotp_ListItem_1}
                    >
                        <Typography
                            id="LoginConfigTotp_Typography_1"
                            sx={styles.LoginConfigTotp_Typography_1}
                        >
                            {msg("loginTotpStep1")}
                        </Typography>

                        <List
                            id="LoginConfigTotp_List_1"
                            sx={styles.LoginConfigTotp_List_1}
                        >
                            {totp.supportedApplications.map(app => (
                                <ListItem
                                    key={app}
                                    id="LoginConfigTotp_ListItem_2"
                                    sx={styles.LoginConfigTotp_ListItem_2}
                                >
                                    {advancedMsg(app)}
                                </ListItem>
                            ))}
                        </List>
                    </ListItem>

                    {mode == "manual" ? (
                        <>
                            <ListItem
                                id="LoginConfigTotp_ListItem_3"
                                sx={styles.LoginConfigTotp_ListItem_3}
                            >
                                <Typography
                                    id="LoginConfigTotp_Typography_2"
                                    sx={styles.LoginConfigTotp_Typography_2}
                                >
                                    {msg("loginTotpManualStep2")}
                                </Typography>
                                <Typography
                                    id="LoginConfigTotp_Typography_3"
                                    sx={styles.LoginConfigTotp_Typography_3}
                                >
                                    <span id="kc-totp-secret-key">
                                        {totp.totpSecretEncoded}
                                    </span>
                                </Typography>
                                <Typography
                                    id="LoginConfigTotp_Typography_4"
                                    sx={styles.LoginConfigTotp_Typography_4}
                                >
                                    <Link
                                        href={totp.qrUrl}
                                        id="LoginConfigTotp_Link_1"
                                        sx={styles.LoginConfigTotp_Link_1}
                                    >
                                        {msg("loginTotpScanBarcode")}
                                    </Link>
                                </Typography>
                            </ListItem>
                            <ListItem
                                id="LoginConfigTotp_ListItem_4"
                                sx={styles.LoginConfigTotp_ListItem_4}
                            >
                                <Typography
                                    id="LoginConfigTotp_Typography_5"
                                    sx={styles.LoginConfigTotp_Typography_5}
                                >
                                    {msg("loginTotpManualStep3")}
                                </Typography>
                                <Typography
                                    id="LoginConfigTotp_Typography_6"
                                    sx={styles.LoginConfigTotp_Typography_6}
                                >
                                    <List
                                        id="LoginConfigTotp_List_2"
                                        sx={styles.LoginConfigTotp_List_2}
                                    >
                                        <ListItem
                                            id="LoginConfigTotp_ListItem_5"
                                            sx={styles.LoginConfigTotp_ListItem_5}
                                        >
                                            {msg("loginTotpType")}:{" "}
                                            {msg(`loginTotp.${totp.policy.type}`)}
                                        </ListItem>
                                        <ListItem
                                            id="LoginConfigTotp_ListItem_6"
                                            sx={styles.LoginConfigTotp_ListItem_6}
                                        >
                                            {msg("loginTotpAlgorithm")}:{" "}
                                            {totp.policy.getAlgorithmKey()}
                                        </ListItem>
                                        <ListItem
                                            id="LoginConfigTotp_ListItem_7"
                                            sx={styles.LoginConfigTotp_ListItem_7}
                                        >
                                            {msg("loginTotpDigits")}: {totp.policy.digits}
                                        </ListItem>
                                        {totp.policy.type === "totp" ? (
                                            <ListItem
                                                id="LoginConfigTotp_ListItem_8"
                                                sx={styles.LoginConfigTotp_ListItem_8}
                                            >
                                                {msg("loginTotpInterval")}:{" "}
                                                {totp.policy.period}
                                            </ListItem>
                                        ) : (
                                            <ListItem
                                                id="LoginConfigTotp_ListItem_9"
                                                sx={styles.LoginConfigTotp_ListItem_9}
                                            >
                                                {msg("loginTotpCounter")}:{" "}
                                                {totp.policy.initialCounter}
                                            </ListItem>
                                        )}
                                    </List>
                                </Typography>
                            </ListItem>
                        </>
                    ) : (
                        <ListItem
                            id="LoginConfigTotp_ListItem_10"
                            sx={styles.LoginConfigTotp_ListItem_10}
                        >
                            <Typography
                                id="LoginConfigTotp_Typography_7"
                                sx={styles.LoginConfigTotp_Typography_7}
                            >
                                {msg("loginTotpStep2")}
                            </Typography>
                            <img
                                id="kc-totp-secret-qr-code"
                                src={`data:image/png;base64, ${totp.totpSecretQrCode}`}
                                alt="Figure: Barcode"
                            />
                            <br id="LoginConfigTotp_br_1" />
                            <Typography
                                id="LoginConfigTotp_Typography_8"
                                sx={styles.LoginConfigTotp_Typography_8}
                            >
                                <Link
                                    href={totp.manualUrl}
                                    id="LoginConfigTotp_Link_2"
                                    sx={styles.LoginConfigTotp_Link_2}
                                >
                                    {msg("loginTotpUnableToScan")}
                                </Link>
                            </Typography>
                        </ListItem>
                    )}
                    <ListItem
                        id="LoginConfigTotp_ListItem_11"
                        sx={styles.LoginConfigTotp_ListItem_11}
                    >
                        <Typography
                            id="LoginConfigTotp_Typography_9"
                            sx={styles.LoginConfigTotp_Typography_9}
                        >
                            {msg("loginTotpStep3")}
                        </Typography>
                        <Typography
                            id="LoginConfigTotp_Typography_10"
                            sx={styles.LoginConfigTotp_Typography_10}
                        >
                            {msg("loginTotpStep3DeviceName")}
                        </Typography>
                    </ListItem>
                </ol>

                <Box
                    action={url.loginAction}
                    className={kcClsx("kcFormClass")}
                    method="post"
                    component="form"
                    id="LoginConfigTotp_Box_1"
                    sx={styles.LoginConfigTotp_Box_1}
                >
                    <Box
                        className={kcClsx("kcFormGroupClass")}
                        id="LoginConfigTotp_Box_2"
                        sx={styles.LoginConfigTotp_Box_2}
                    >
                        <Box
                            className={kcClsx("kcInputWrapperClass")}
                            id="LoginConfigTotp_Box_3"
                            sx={styles.LoginConfigTotp_Box_3}
                        >
                            <FormLabel
                                htmlFor="totp"
                                className={kcClsx("kcLabelClass")}
                                id="LoginConfigTotp_FormLabel_1"
                                sx={styles.LoginConfigTotp_FormLabel_1}
                            >
                                {msg("authenticatorCode")}
                            </FormLabel>{" "}
                            <span id="LoginConfigTotp_span_2">*</span>
                        </Box>
                        <Box
                            className={kcClsx("kcInputWrapperClass")}
                            id="LoginConfigTotp_Box_4"
                            sx={styles.LoginConfigTotp_Box_4}
                        >
                            <TextField
                                type="text"
                                name="totp"
                                autoComplete="off"
                                className={kcClsx("kcInputClass")}
                                aria-invalid={messagesPerField.existsError("totp")}
                                id="LoginConfigTotp_TextField_1"
                                sx={styles.LoginConfigTotp_TextField_1}
                            />

                            {messagesPerField.existsError("totp") && (
                                <span
                                    id="input-error-otp-code"
                                    className={kcClsx("kcInputErrorMessageClass")}
                                    aria-live="polite"
                                    dangerouslySetInnerHTML={{
                                        __html: messagesPerField.get("totp")
                                    }}
                                />
                            )}
                        </Box>
                        <TextField
                            type="hidden"
                            name="totpSecret"
                            value={totp.totpSecret}
                            id="LoginConfigTotp_TextField_2"
                            sx={styles.LoginConfigTotp_TextField_2}
                        />
                        {mode && (
                            <TextField
                                type="hidden"
                                value={mode}
                                id="LoginConfigTotp_TextField_3"
                                sx={styles.LoginConfigTotp_TextField_3}
                            />
                        )}
                    </Box>

                    <Box
                        className={kcClsx("kcFormGroupClass")}
                        id="LoginConfigTotp_Box_5"
                        sx={styles.LoginConfigTotp_Box_5}
                    >
                        <Box
                            className={kcClsx("kcInputWrapperClass")}
                            id="LoginConfigTotp_Box_6"
                            sx={styles.LoginConfigTotp_Box_6}
                        >
                            <FormLabel
                                htmlFor="userLabel"
                                className={kcClsx("kcLabelClass")}
                                id="LoginConfigTotp_FormLabel_2"
                                sx={styles.LoginConfigTotp_FormLabel_2}
                            >
                                {msg("loginTotpDeviceName")}
                            </FormLabel>{" "}
                            {totp.otpCredentials.length >= 1 && (
                                <span id="LoginConfigTotp_span_4">*</span>
                            )}
                        </Box>
                        <Box
                            className={kcClsx("kcInputWrapperClass")}
                            id="LoginConfigTotp_Box_7"
                            sx={styles.LoginConfigTotp_Box_7}
                        >
                            <TextField
                                type="text"
                                name="userLabel"
                                autoComplete="off"
                                className={kcClsx("kcInputClass")}
                                aria-invalid={messagesPerField.existsError("userLabel")}
                                id="LoginConfigTotp_TextField_4"
                                sx={styles.LoginConfigTotp_TextField_4}
                            />
                            {messagesPerField.existsError("userLabel") && (
                                <span
                                    id="input-error-otp-label"
                                    className={kcClsx("kcInputErrorMessageClass")}
                                    aria-live="polite"
                                    dangerouslySetInnerHTML={{
                                        __html: messagesPerField.get("userLabel")
                                    }}
                                />
                            )}
                        </Box>
                    </Box>

                    <Box
                        className={kcClsx("kcFormGroupClass")}
                        id="LoginConfigTotp_Box_8"
                        sx={styles.LoginConfigTotp_Box_8}
                    >
                        <LogoutOtherSessions
                            id="LoginConfigTotp_LogoutOtherSessions_1"
                            kcClsx={kcClsx}
                            i18n={i18n}
                        />
                    </Box>

                    {isAppInitiatedAction ? (
                        <>
                            <TextField
                                type="submit"
                                className={kcClsx(
                                    "kcButtonClass",
                                    "kcButtonPrimaryClass",
                                    "kcButtonLargeClass"
                                )}
                                value={msgStr("doSubmit")}
                                id="LoginConfigTotp_TextField_5"
                                sx={styles.LoginConfigTotp_TextField_5}
                            />
                            <Button
                                type="submit"
                                className={kcClsx(
                                    "kcButtonClass",
                                    "kcButtonDefaultClass",
                                    "kcButtonLargeClass",
                                    "kcButtonLargeClass"
                                )}
                                name="cancel-aia"
                                value="true"
                                id="LoginConfigTotp_Button_1"
                                sx={styles.LoginConfigTotp_Button_1}
                            >
                                {msg("doCancel")}
                            </Button>
                        </>
                    ) : (
                        <TextField
                            type="submit"
                            className={kcClsx(
                                "kcButtonClass",
                                "kcButtonPrimaryClass",
                                "kcButtonLargeClass"
                            )}
                            value={msgStr("doSubmit")}
                            id="LoginConfigTotp_TextField_6"
                            sx={styles.LoginConfigTotp_TextField_6}
                        />
                    )}
                </Box>
            </>
        </Template>
    );
}
function LogoutOtherSessions(props: { kcClsx: KcClsx; i18n: I18n }) {
    const { kcClsx, i18n } = props;
    const { msg } = i18n;
    return (
        <Box
            className={kcClsx("kcFormOptionsClass")}
            id="LoginConfigTotp_Box_9"
            sx={styles.LoginConfigTotp_Box_9}
        >
            <Box
                className={kcClsx("kcFormOptionsWrapperClass")}
                id="LoginConfigTotp_Box_10"
                sx={styles.LoginConfigTotp_Box_10}
            >
                <Box id="LoginConfigTotp_Box_11" sx={styles.LoginConfigTotp_Box_11}>
                    <FormLabel
                        id="LoginConfigTotp_FormLabel_3"
                        sx={styles.LoginConfigTotp_FormLabel_3}
                    >
                        <TextField
                            type="checkbox"
                            name="logout-sessions"
                            value="on"
                            defaultChecked={true}
                            id="LoginConfigTotp_TextField_7"
                            sx={styles.LoginConfigTotp_TextField_7}
                        />
                        {msg("logoutOtherSessions")}
                    </FormLabel>
                </Box>
            </Box>
        </Box>
    );
}
