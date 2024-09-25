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
                id="kc-update-email-form"
                action={url.loginAction}
                method="post"
                component="form"
            >
                <UserProfileFormFields
                    id="UpdateEmail_UserProfileFormFields_1"
                    kcContext={kcContext}
                    i18n={i18n}
                    kcClsx={kcClsx}
                    onIsFormSubmittableValueChange={setIsFormSubmittable}
                    doMakeUserConfirmPassword={doMakeUserConfirmPassword}
                />

                <Box id="UpdateEmail_div_1">
                    <LogoutOtherSessions
                        id="UpdateEmail_LogoutOtherSessions_1"
                        kcClsx={kcClsx}
                        i18n={i18n}
                    />

                    <TextField
                        id="UpdateEmail_input_1"
                        disabled={!isFormSubmittable}
                        type="submit"
                        value={msgStr("doSubmit")}
                    />
                    {isAppInitiatedAction && (
                        <Button
                            id="UpdateEmail_button_1"
                            type="submit"
                            name="cancel-aia"
                            value="true"
                        >
                            {msg("doCancel")}
                        </Button>
                    )}
                </Box>
            </Box>
        </Template>
    );
}
function LogoutOtherSessions(props: { kcClsx: KcClsx; i18n: I18n }) {
    const { kcClsx, i18n } = props;
    const { msg } = i18n;
    return (
        <Box id="kc-form-options">
            <FormLabel id="UpdateEmail_label_1">
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
