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
                    <ListItem id="LoginConfigTotp_li_1">
                        <Typography id="LoginConfigTotp_p_1">
                            {msg("loginTotpStep1")}
                        </Typography>

                        <List id="kc-totp-supported-apps">
                            {totp.supportedApplications.map(app => (
                                <ListItem id="LoginConfigTotp_li_2" key={app}>
                                    {advancedMsg(app)}
                                </ListItem>
                            ))}
                        </List>
                    </ListItem>

                    {mode == "manual" ? (
                        <>
                            <ListItem id="LoginConfigTotp_li_3">
                                <Typography id="LoginConfigTotp_p_2">
                                    {msg("loginTotpManualStep2")}
                                </Typography>
                                <Typography id="LoginConfigTotp_p_3">
                                    <span id="kc-totp-secret-key">
                                        {totp.totpSecretEncoded}
                                    </span>
                                </Typography>
                                <Typography id="LoginConfigTotp_p_4">
                                    <Link href={totp.qrUrl} id="mode-barcode">
                                        {msg("loginTotpScanBarcode")}
                                    </Link>
                                </Typography>
                            </ListItem>
                            <ListItem id="LoginConfigTotp_li_4">
                                <Typography id="LoginConfigTotp_p_5">
                                    {msg("loginTotpManualStep3")}
                                </Typography>
                                <Typography id="LoginConfigTotp_p_6">
                                    <List id="LoginConfigTotp_ul_2">
                                        <ListItem id="kc-totp-type">
                                            {msg("loginTotpType")}:{" "}
                                            {msg(`loginTotp.${totp.policy.type}`)}
                                        </ListItem>
                                        <ListItem id="kc-totp-algorithm">
                                            {msg("loginTotpAlgorithm")}:{" "}
                                            {totp.policy.getAlgorithmKey()}
                                        </ListItem>
                                        <ListItem id="kc-totp-digits">
                                            {msg("loginTotpDigits")}: {totp.policy.digits}
                                        </ListItem>
                                        {totp.policy.type === "totp" ? (
                                            <ListItem id="kc-totp-period">
                                                {msg("loginTotpInterval")}:{" "}
                                                {totp.policy.period}
                                            </ListItem>
                                        ) : (
                                            <ListItem id="kc-totp-counter">
                                                {msg("loginTotpCounter")}:{" "}
                                                {totp.policy.initialCounter}
                                            </ListItem>
                                        )}
                                    </List>
                                </Typography>
                            </ListItem>
                        </>
                    ) : (
                        <ListItem id="LoginConfigTotp_li_10">
                            <Typography id="LoginConfigTotp_p_7">
                                {msg("loginTotpStep2")}
                            </Typography>
                            <img
                                id="kc-totp-secret-qr-code"
                                src={`data:image/png;base64, ${totp.totpSecretQrCode}`}
                                alt="Figure: Barcode"
                            />
                            <br id="LoginConfigTotp_br_1" />
                            <Typography id="LoginConfigTotp_p_8">
                                <Link href={totp.manualUrl} id="mode-manual">
                                    {msg("loginTotpUnableToScan")}
                                </Link>
                            </Typography>
                        </ListItem>
                    )}
                    <ListItem id="LoginConfigTotp_li_11">
                        <Typography id="LoginConfigTotp_p_9">
                            {msg("loginTotpStep3")}
                        </Typography>
                        <Typography id="LoginConfigTotp_p_10">
                            {msg("loginTotpStep3DeviceName")}
                        </Typography>
                    </ListItem>
                </ol>

                <Box
                    action={url.loginAction}
                    id="kc-totp-settings-form"
                    method="post"
                    component="form"
                >
                    <Box id="LoginConfigTotp_div_1">
                        <FormLabel id="LoginConfigTotp_label_1" htmlFor="totp">
                            {msg("authenticatorCode")}
                        </FormLabel>{" "}
                        <span id="LoginConfigTotp_span_2">*</span>
                        <Box id="LoginConfigTotp_div_3">
                            <TextField
                                type="text"
                                id="totp"
                                name="totp"
                                autoComplete="off"
                                aria-invalid={messagesPerField.existsError("totp")}
                            />

                            {messagesPerField.existsError("totp") && (
                                <span
                                    id="input-error-otp-code"
                                    aria-live="polite"
                                    dangerouslySetInnerHTML={{
                                        __html: messagesPerField.get("totp")
                                    }}
                                />
                            )}
                        </Box>
                        <TextField
                            type="hidden"
                            id="totpSecret"
                            name="totpSecret"
                            value={totp.totpSecret}
                        />
                        {mode && <TextField type="hidden" id="mode" value={mode} />}
                    </Box>

                    <Box id="LoginConfigTotp_div_4">
                        <FormLabel id="LoginConfigTotp_label_2" htmlFor="userLabel">
                            {msg("loginTotpDeviceName")}
                        </FormLabel>{" "}
                        {totp.otpCredentials.length >= 1 && (
                            <span id="LoginConfigTotp_span_4">*</span>
                        )}
                        <Box id="LoginConfigTotp_div_6">
                            <TextField
                                type="text"
                                id="userLabel"
                                name="userLabel"
                                autoComplete="off"
                                aria-invalid={messagesPerField.existsError("userLabel")}
                            />
                            {messagesPerField.existsError("userLabel") && (
                                <span
                                    id="input-error-otp-label"
                                    aria-live="polite"
                                    dangerouslySetInnerHTML={{
                                        __html: messagesPerField.get("userLabel")
                                    }}
                                />
                            )}
                        </Box>
                    </Box>

                    <Box id="LoginConfigTotp_div_7">
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
                                id="saveTOTPBtn"
                                value={msgStr("doSubmit")}
                            />
                            <Button
                                type="submit"
                                id="cancelTOTPBtn"
                                name="cancel-aia"
                                value="true"
                            >
                                {msg("doCancel")}
                            </Button>
                        </>
                    ) : (
                        <TextField
                            type="submit"
                            id="saveTOTPBtn"
                            value={msgStr("doSubmit")}
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
        <Box id="kc-form-options">
            <FormLabel id="LoginConfigTotp_label_3">
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
