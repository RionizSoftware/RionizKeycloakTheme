import { useState } from "react";
import type { LazyOrNot } from "rionizkeycloakify/tools/LazyOrNot";
import { getKcClsx, type KcClsx } from "rionizkeycloakify/login/lib/kcClsx";
import { clsx } from "rionizkeycloakify/tools/clsx";
import type { UserProfileFormFieldsProps } from "rionizkeycloakify/login/UserProfileFormFieldsProps";
import type { PageProps } from "rionizkeycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Box, Button, Link, TextField, FormLabel, Typography, List, ListItem, Checkbox, Radio } from "@mui/material";
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
    const { kcContext, i18n, doUseDefaultCss, Template, classes, UserProfileFormFields, doMakeUserConfirmPassword } = props;
    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });
    const { messageHeader, url, messagesPerField, recaptchaRequired, recaptchaVisible, recaptchaSiteKey, recaptchaAction, termsAcceptanceRequired } =
        kcContext;
    const { msg, msgStr, advancedMsg } = i18n;
    const [isFormSubmittable, setIsFormSubmittable] = useState(false);
    const [areTermsAccepted, setAreTermsAccepted] = useState(false);
    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            headerNode={messageHeader !== undefined ? advancedMsg(messageHeader) : msg("registerTitle")}
            displayMessage={messagesPerField.exists("global")}
            displayRequiredFields
        >
            <Box action={url.registrationAction} method="post" component="form" id="Register_Box_1" sx={styles.Register_Box_1}>
                <UserProfileFormFields
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
                {recaptchaRequired && (recaptchaVisible || recaptchaAction === undefined) && (
                    <Box id="Register_Box_2" sx={styles.Register_Box_2}>
                        <Box
                            data-size="compact"
                            data-sitekey={recaptchaSiteKey}
                            data-action={recaptchaAction}
                            id="Register_Box_3"
                            sx={styles.Register_Box_3}
                        ></Box>
                    </Box>
                )}
                <Box id="Register_Box_4" sx={styles.Register_Box_4}>
                    <Link href={url.loginUrl} id="Register_Link_1" sx={styles.Register_Link_1}>
                        {msg("backToLogin")}
                    </Link>

                    {recaptchaRequired && !recaptchaVisible && recaptchaAction !== undefined ? (
                        <Box id="Register_Box_5" sx={styles.Register_Box_5}>
                            <Button
                                data-sitekey={recaptchaSiteKey}
                                data-callback={() => {
                                    (document.getElementById("kc-register-form") as HTMLFormElement).submit();
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
                        <Box id="Register_Box_6" sx={styles.Register_Box_6}>
                            <Button
                                disabled={!isFormSubmittable || (termsAcceptanceRequired && !areTermsAccepted)}
                                type="submit"
                                value={msgStr("doRegister")}
                                fullWidth={true}
                                id="Register_Button_2"
                                sx={styles.Register_Button_2}
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
    id: string;
}) {
    const { i18n, kcClsx, messagesPerField, areTermsAccepted, onAreTermsAcceptedValueChange } = props;
    const { msg } = i18n;
    return (
        <>
            <Box id="Register_Box_7" sx={styles.Register_Box_7}>
                {msg("termsTitle")}
                {msg("termsText")}
            </Box>
            <Box id="Register_Box_8" sx={styles.Register_Box_8}>
                <Checkbox
                    name="termsAccepted"
                    checked={areTermsAccepted}
                    onChange={e => onAreTermsAcceptedValueChange(e.target.checked)}
                    aria-invalid={messagesPerField.existsError("termsAccepted")}
                    id="Register_Checkbox_1"
                    sx={styles.Register_Checkbox_1}
                />
                <FormLabel htmlFor="termsAccepted" id="Register_FormLabel_1" sx={styles.Register_FormLabel_1}>
                    {msg("acceptTerms")}
                </FormLabel>

                {messagesPerField.existsError("termsAccepted") && (
                    <Box id="Register_Box_9" sx={styles.Register_Box_9}>
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
