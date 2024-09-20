import { getKcClsx, KcClsx } from "keycloakify/login/lib/kcClsx";
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
import { styles } from "./styles/LoginConfigTotp.ts";
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
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            headerNode={msg("loginTotpTitle")}
            displayMessage={!messagesPerField.existsError("totp", "userLabel")}
        >
            <>
                <ol id="kc-totp-settings">
                    <ListItem id="ListItem_1" sx={styles.ListItem_1}>
                        <Typography id="Typography_1" sx={styles.Typography_1}>
                            {msg("loginTotpStep1")}
                        </Typography>

                        <List id="List_1" sx={styles.List_1}>
                            {totp.supportedApplications.map(app => (
                                <ListItem
                                    key={app}
                                    id="ListItem_2"
                                    sx={styles.ListItem_2}
                                >
                                    {advancedMsg(app)}
                                </ListItem>
                            ))}
                        </List>
                    </ListItem>

                    {mode == "manual" ? (
                        <>
                            <ListItem id="ListItem_3" sx={styles.ListItem_3}>
                                <Typography id="Typography_2" sx={styles.Typography_2}>
                                    {msg("loginTotpManualStep2")}
                                </Typography>
                                <Typography id="Typography_3" sx={styles.Typography_3}>
                                    <span id="kc-totp-secret-key">
                                        {totp.totpSecretEncoded}
                                    </span>
                                </Typography>
                                <Typography id="Typography_4" sx={styles.Typography_4}>
                                    <Link
                                        href={totp.qrUrl}
                                        id="Link_1"
                                        sx={styles.Link_1}
                                    >
                                        {msg("loginTotpScanBarcode")}
                                    </Link>
                                </Typography>
                            </ListItem>
                            <ListItem id="ListItem_4" sx={styles.ListItem_4}>
                                <Typography id="Typography_5" sx={styles.Typography_5}>
                                    {msg("loginTotpManualStep3")}
                                </Typography>
                                <Typography id="Typography_6" sx={styles.Typography_6}>
                                    <List id="List_2" sx={styles.List_2}>
                                        <ListItem id="ListItem_5" sx={styles.ListItem_5}>
                                            {msg("loginTotpType")}:{" "}
                                            {msg(`loginTotp.${totp.policy.type}`)}
                                        </ListItem>
                                        <ListItem id="ListItem_6" sx={styles.ListItem_6}>
                                            {msg("loginTotpAlgorithm")}:{" "}
                                            {totp.policy.getAlgorithmKey()}
                                        </ListItem>
                                        <ListItem id="ListItem_7" sx={styles.ListItem_7}>
                                            {msg("loginTotpDigits")}: {totp.policy.digits}
                                        </ListItem>
                                        {totp.policy.type === "totp" ? (
                                            <ListItem
                                                id="ListItem_8"
                                                sx={styles.ListItem_8}
                                            >
                                                {msg("loginTotpInterval")}:{" "}
                                                {totp.policy.period}
                                            </ListItem>
                                        ) : (
                                            <ListItem
                                                id="ListItem_9"
                                                sx={styles.ListItem_9}
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
                        <ListItem id="ListItem_10" sx={styles.ListItem_10}>
                            <Typography id="Typography_7" sx={styles.Typography_7}>
                                {msg("loginTotpStep2")}
                            </Typography>
                            <img
                                id="kc-totp-secret-qr-code"
                                src={`data:image/png;base64, ${totp.totpSecretQrCode}`}
                                alt="Figure: Barcode"
                            />
                            <br />
                            <Typography id="Typography_8" sx={styles.Typography_8}>
                                <Link
                                    href={totp.manualUrl}
                                    id="Link_2"
                                    sx={styles.Link_2}
                                >
                                    {msg("loginTotpUnableToScan")}
                                </Link>
                            </Typography>
                        </ListItem>
                    )}
                    <ListItem id="ListItem_11" sx={styles.ListItem_11}>
                        <Typography id="Typography_9" sx={styles.Typography_9}>
                            {msg("loginTotpStep3")}
                        </Typography>
                        <Typography id="Typography_10" sx={styles.Typography_10}>
                            {msg("loginTotpStep3DeviceName")}
                        </Typography>
                    </ListItem>
                </ol>

                <Box
                    action={url.loginAction}
                    method="post"
                    component="form"
                    id="Box_1"
                    sx={styles.Box_1}
                >
                    <Box id="Box_2" sx={styles.Box_2}>
                        <FormLabel
                            htmlFor="totp"
                            id="FormLabel_1"
                            sx={styles.FormLabel_1}
                        >
                            {msg("authenticatorCode")}
                        </FormLabel>{" "}
                        <span>*</span>
                        <Box id="Box_3" sx={styles.Box_3}>
                            <TextField
                                type="text"
                                name="totp"
                                autoComplete="off"
                                aria-invalid={messagesPerField.existsError("totp")}
                                id="TextField_1"
                                sx={styles.TextField_1}
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
                            name="totpSecret"
                            value={totp.totpSecret}
                            id="TextField_2"
                            sx={styles.TextField_2}
                        />
                        {mode && (
                            <TextField
                                type="hidden"
                                value={mode}
                                id="TextField_3"
                                sx={styles.TextField_3}
                            />
                        )}
                    </Box>

                    <Box id="Box_4" sx={styles.Box_4}>
                        <FormLabel
                            htmlFor="userLabel"
                            id="FormLabel_2"
                            sx={styles.FormLabel_2}
                        >
                            {msg("loginTotpDeviceName")}
                        </FormLabel>{" "}
                        {totp.otpCredentials.length >= 1 && <span>*</span>}
                        <Box id="Box_5" sx={styles.Box_5}>
                            <TextField
                                type="text"
                                name="userLabel"
                                autoComplete="off"
                                aria-invalid={messagesPerField.existsError("userLabel")}
                                id="TextField_4"
                                sx={styles.TextField_4}
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

                    <Box id="Box_6" sx={styles.Box_6}>
                        <LogoutOtherSessions kcClsx={kcClsx} i18n={i18n} />
                    </Box>

                    {isAppInitiatedAction ? (
                        <>
                            <TextField
                                type="submit"
                                value={msgStr("doSubmit")}
                                id="TextField_5"
                                sx={styles.TextField_5}
                            />
                            <Button
                                type="submit"
                                name="cancel-aia"
                                value="true"
                                id="Button_1"
                                sx={styles.Button_1}
                            >
                                {msg("doCancel")}
                            </Button>
                        </>
                    ) : (
                        <TextField
                            type="submit"
                            value={msgStr("doSubmit")}
                            id="TextField_6"
                            sx={styles.TextField_6}
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
        <Box id="Box_7" sx={styles.Box_7}>
            <FormLabel id="FormLabel_3" sx={styles.FormLabel_3}>
                <TextField
                    type="checkbox"
                    name="logout-sessions"
                    value="on"
                    defaultChecked={true}
                    id="TextField_7"
                    sx={styles.TextField_7}
                />
                {msg("logoutOtherSessions")}
            </FormLabel>
        </Box>
    );
}
