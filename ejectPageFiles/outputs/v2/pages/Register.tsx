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
                id="kc-register-form"
                action={url.registrationAction}
                method="post"
                component="form"
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
                        <Box id="Register_div_1">
                            <Box
                                id="Register_div_3"
                                data-size="compact"
                                data-sitekey={recaptchaSiteKey}
                                data-action={recaptchaAction}
                            ></Box>
                        </Box>
                    )}
                <Box id="Register_div_4">
                    <Link id="Register_a_1" href={url.loginUrl}>
                        {msg("backToLogin")}
                    </Link>

                    {recaptchaRequired &&
                    !recaptchaVisible &&
                    recaptchaAction !== undefined ? (
                        <Box id="kc-form-buttons">
                            <Button
                                id="Register_button_1"
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
                            >
                                {msg("doRegister")}
                            </Button>
                        </Box>
                    ) : (
                        <Box id="kc-form-buttons">
                            <TextField
                                id="Register_input_1"
                                disabled={
                                    !isFormSubmittable ||
                                    (termsAcceptanceRequired && !areTermsAccepted)
                                }
                                type="submit"
                                value={msgStr("doRegister")}
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
            <Box id="Register_div_9">
                {msg("termsTitle")}
                {msg("termsText")}
            </Box>
            <Box id="Register_div_12">
                <TextField
                    type="checkbox"
                    id="termsAccepted"
                    name="termsAccepted"
                    checked={areTermsAccepted}
                    onChange={e => onAreTermsAcceptedValueChange(e.target.checked)}
                    aria-invalid={messagesPerField.existsError("termsAccepted")}
                />
                <FormLabel id="Register_label_1" htmlFor="termsAccepted">
                    {msg("acceptTerms")}
                </FormLabel>

                {messagesPerField.existsError("termsAccepted") && (
                    <Box id="Register_div_14">
                        <span
                            id="input-error-terms-accepted"
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
