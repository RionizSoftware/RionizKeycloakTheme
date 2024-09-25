import { useState } from "react";
import type { LazyOrNot } from "rionizkeycloakify/tools/LazyOrNot";
import { getKcClsx, type KcClsx } from "rionizkeycloakify/login/lib/kcClsx";
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
import { styles } from "../styles/pages/UpdateEmail.ts";
type UpdateEmailProps = PageProps<
    Extract<
        KcContext,
        {
            pageId: "update-email.ftl";
        }
    >,
    I18n
> & {
    UserProfileFormFields: LazyOrNot<(props: UserProfileFormFieldsProps) => JSX.Element>;
    doMakeUserConfirmPassword: boolean;
};
export default function UpdateEmail(props: UpdateEmailProps) {
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
    const { msg, msgStr } = i18n;
    const [isFormSubmittable, setIsFormSubmittable] = useState(false);
    const { url, messagesPerField, isAppInitiatedAction } = kcContext;
    return (
        <Template
            id="UpdateEmail_Template_1"
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={messagesPerField.exists("global")}
            displayRequiredFields
            headerNode={msg("updateEmailTitle")}
        >
            <Box
                className={kcClsx("kcFormClass")}
                action={url.loginAction}
                method="post"
                component="form"
                id="UpdateEmail_Box_1"
                sx={styles.UpdateEmail_Box_1}
            >
                <UserProfileFormFields
                    id="UpdateEmail_UserProfileFormFields_1"
                    kcContext={kcContext}
                    i18n={i18n}
                    kcClsx={kcClsx}
                    onIsFormSubmittableValueChange={setIsFormSubmittable}
                    doMakeUserConfirmPassword={doMakeUserConfirmPassword}
                />

                <Box
                    className={kcClsx("kcFormGroupClass")}
                    id="UpdateEmail_Box_2"
                    sx={styles.UpdateEmail_Box_2}
                >
                    <Box
                        className={kcClsx("kcFormOptionsClass")}
                        id="UpdateEmail_Box_3"
                        sx={styles.UpdateEmail_Box_3}
                    >
                        <Box
                            className={kcClsx("kcFormOptionsWrapperClass")}
                            id="UpdateEmail_Box_4"
                            sx={styles.UpdateEmail_Box_4}
                        />
                    </Box>

                    <LogoutOtherSessions
                        id="UpdateEmail_LogoutOtherSessions_1"
                        kcClsx={kcClsx}
                        i18n={i18n}
                    />

                    <Box
                        className={kcClsx("kcFormButtonsClass")}
                        id="UpdateEmail_Box_5"
                        sx={styles.UpdateEmail_Box_5}
                    >
                        <TextField
                            disabled={!isFormSubmittable}
                            className={kcClsx(
                                "kcButtonClass",
                                "kcButtonPrimaryClass",
                                isAppInitiatedAction && "kcButtonBlockClass",
                                "kcButtonLargeClass"
                            )}
                            type="submit"
                            value={msgStr("doSubmit")}
                            id="UpdateEmail_TextField_1"
                            sx={styles.UpdateEmail_TextField_1}
                        />
                        {isAppInitiatedAction && (
                            <Button
                                className={kcClsx(
                                    "kcButtonClass",
                                    "kcButtonDefaultClass",
                                    "kcButtonLargeClass"
                                )}
                                type="submit"
                                name="cancel-aia"
                                value="true"
                                id="UpdateEmail_Button_1"
                                sx={styles.UpdateEmail_Button_1}
                            >
                                {msg("doCancel")}
                            </Button>
                        )}
                    </Box>
                </Box>
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
            id="UpdateEmail_Box_6"
            sx={styles.UpdateEmail_Box_6}
        >
            <Box
                className={kcClsx("kcFormOptionsWrapperClass")}
                id="UpdateEmail_Box_7"
                sx={styles.UpdateEmail_Box_7}
            >
                <Box id="UpdateEmail_Box_8" sx={styles.UpdateEmail_Box_8}>
                    <FormLabel
                        id="UpdateEmail_FormLabel_1"
                        sx={styles.UpdateEmail_FormLabel_1}
                    >
                        <TextField
                            type="checkbox"
                            name="logout-sessions"
                            value="on"
                            defaultChecked={true}
                            id="UpdateEmail_TextField_2"
                            sx={styles.UpdateEmail_TextField_2}
                        />
                        {msg("logoutOtherSessions")}
                    </FormLabel>
                </Box>
            </Box>
        </Box>
    );
}
