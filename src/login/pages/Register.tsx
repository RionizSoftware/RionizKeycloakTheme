import { useState } from "react";
import type { LazyOrNot } from "rionizkeycloakify/tools/LazyOrNot";
import { getKcClsx, type KcClsx } from "rionizkeycloakify/login/lib/kcClsx";
import { clsx } from "rionizkeycloakify/tools/clsx";
import type { UserProfileFormFieldsProps } from "rionizkeycloakify/login/UserProfileFormFieldsProps";
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
import { styles } from "../styles/pages/Register.ts";
type RegisterProps = PageProps<
    Extract<
        KcContext,
        {
            pageId: "register.ftl";
        }
    >,
    I18n
> & {
    UserProfileFormFields: LazyOrNot<(props: UserProfileFormFieldsProps) => JSX.Element>;
    doMakeUserConfirmPassword: boolean;
};
export default function Register(props: RegisterProps) {
    const {
        kcContext,
        i18n,
        doUseDefaultCss,
        Template,
        classes,
        UserProfileFormFields,
        doMakeUserConfirmPassword
    } = props;
    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });
    const {
        messageHeader,
        url,
        messagesPerField,
        recaptchaRequired,
        recaptchaVisible,
        recaptchaSiteKey,
        recaptchaAction,
        termsAcceptanceRequired
    } = kcContext;
    const { msg, msgStr, advancedMsg } = i18n;
    const [isFormSubmittable, setIsFormSubmittable] = useState(false);
    const [areTermsAccepted, setAreTermsAccepted] = useState(false);
    return (
        <Template
            id="Register_Template_1"
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            headerNode={
                messageHeader !== undefined
                    ? advancedMsg(messageHeader)
                    : msg("registerTitle")
            }
            displayMessage={messagesPerField.exists("global")}
            displayRequiredFields
        >
            <Box
                className={kcClsx("kcFormClass")}
                action={url.registrationAction}
                method="post"
                component="form"
                id="Register_Box_1"
                sx={styles.Register_Box_1}
            >
                <UserProfileFormFields
                    id="Register_UserProfileFormFields_1"
                    kcContext={kcContext}
                    i18n={i18n}
                    kcClsx={kcClsx}
                    onIsFormSubmittableValueChange={setIsFormSubmittable}
                    doMakeUserConfirmPassword={doMakeUserConfirmPassword}
                />
                {termsAcceptanceRequired && (
                    <TermsAcceptance
                        id="Register_TermsAcceptance_1"
                        i18n={i18n}
                        kcClsx={kcClsx}
                        messagesPerField={messagesPerField}
                        areTermsAccepted={areTermsAccepted}
                        onAreTermsAcceptedValueChange={setAreTermsAccepted}
                    />
                )}
                {recaptchaRequired &&
                    (recaptchaVisible || recaptchaAction === undefined) && (
                        <Box id="Register_Box_2" sx={styles.Register_Box_2}>
                            <Box
                                className={kcClsx("kcInputWrapperClass")}
                                id="Register_Box_3"
                                sx={styles.Register_Box_3}
                            >
                                <Box
                                    data-size="compact"
                                    data-sitekey={recaptchaSiteKey}
                                    data-action={recaptchaAction}
                                    id="Register_Box_4"
                                    sx={styles.Register_Box_4}
                                ></Box>
                            </Box>
                        </Box>
                    )}
                <Box
                    className={kcClsx("kcFormGroupClass")}
                    id="Register_Box_5"
                    sx={styles.Register_Box_5}
                >
                    <Box
                        className={kcClsx("kcFormOptionsClass")}
                        id="Register_Box_6"
                        sx={styles.Register_Box_6}
                    >
                        <Box
                            className={kcClsx("kcFormOptionsWrapperClass")}
                            id="Register_Box_7"
                            sx={styles.Register_Box_7}
                        >
                            <span id="Register_span_1">
                                <Link
                                    href={url.loginUrl}
                                    id="Register_Link_1"
                                    sx={styles.Register_Link_1}
                                >
                                    {msg("backToLogin")}
                                </Link>
                            </span>
                        </Box>
                    </Box>

                    {recaptchaRequired &&
                    !recaptchaVisible &&
                    recaptchaAction !== undefined ? (
                        <Box
                            className={kcClsx("kcFormButtonsClass")}
                            id="Register_Box_8"
                            sx={styles.Register_Box_8}
                        >
                            <Button
                                className={clsx(
                                    kcClsx(
                                        "kcButtonClass",
                                        "kcButtonPrimaryClass",
                                        "kcButtonBlockClass",
                                        "kcButtonLargeClass"
                                    ),
                                    "g-recaptcha"
                                )}
                                data-sitekey={recaptchaSiteKey}
                                data-callback={() => {
                                    (
                                        document.getElementById(
                                            "kc-register-form"
                                        ) as HTMLFormElement
                                    ).submit();
                                }}
                                data-action={recaptchaAction}
                                type="submit"
                                id="Register_Button_1"
                                sx={styles.Register_Button_1}
                            >
                                {msg("doRegister")}
                            </Button>
                        </Box>
                    ) : (
                        <Box
                            className={kcClsx("kcFormButtonsClass")}
                            id="Register_Box_9"
                            sx={styles.Register_Box_9}
                        >
                            <TextField
                                disabled={
                                    !isFormSubmittable ||
                                    (termsAcceptanceRequired && !areTermsAccepted)
                                }
                                className={kcClsx(
                                    "kcButtonClass",
                                    "kcButtonPrimaryClass",
                                    "kcButtonBlockClass",
                                    "kcButtonLargeClass"
                                )}
                                type="submit"
                                value={msgStr("doRegister")}
                                id="Register_TextField_1"
                                sx={styles.Register_TextField_1}
                            />
                        </Box>
                    )}
                </Box>
            </Box>
        </Template>
    );
}
function TermsAcceptance(props: {
    i18n: I18n;
    kcClsx: KcClsx;
    messagesPerField: Pick<KcContext["messagesPerField"], "existsError" | "get">;
    areTermsAccepted: boolean;
    onAreTermsAcceptedValueChange: (areTermsAccepted: boolean) => void;
}) {
    const {
        i18n,
        kcClsx,
        messagesPerField,
        areTermsAccepted,
        onAreTermsAcceptedValueChange
    } = props;
    const { msg } = i18n;
    return (
        <>
            <Box id="Register_Box_10" sx={styles.Register_Box_10}>
                <Box
                    className={kcClsx("kcInputWrapperClass")}
                    id="Register_Box_11"
                    sx={styles.Register_Box_11}
                >
                    {msg("termsTitle")}
                    <Box id="Register_Box_12" sx={styles.Register_Box_12}>
                        {msg("termsText")}
                    </Box>
                </Box>
            </Box>
            <Box id="Register_Box_13" sx={styles.Register_Box_13}>
                <Box
                    className={kcClsx("kcLabelWrapperClass")}
                    id="Register_Box_14"
                    sx={styles.Register_Box_14}
                >
                    <TextField
                        type="checkbox"
                        name="termsAccepted"
                        className={kcClsx("kcCheckboxInputClass")}
                        checked={areTermsAccepted}
                        onChange={e => onAreTermsAcceptedValueChange(e.target.checked)}
                        aria-invalid={messagesPerField.existsError("termsAccepted")}
                        id="Register_TextField_2"
                        sx={styles.Register_TextField_2}
                    />
                    <FormLabel
                        htmlFor="termsAccepted"
                        className={kcClsx("kcLabelClass")}
                        id="Register_FormLabel_1"
                        sx={styles.Register_FormLabel_1}
                    >
                        {msg("acceptTerms")}
                    </FormLabel>
                </Box>
                {messagesPerField.existsError("termsAccepted") && (
                    <Box
                        className={kcClsx("kcLabelWrapperClass")}
                        id="Register_Box_15"
                        sx={styles.Register_Box_15}
                    >
                        <span
                            id="input-error-terms-accepted"
                            className={kcClsx("kcInputErrorMessageClass")}
                            aria-live="polite"
                            dangerouslySetInnerHTML={{
                                __html: messagesPerField.get("termsAccepted")
                            }}
                        />
                    </Box>
                )}
            </Box>
        </>
    );
}
