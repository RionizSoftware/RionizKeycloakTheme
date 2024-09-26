import { useState } from "react";
import type { LazyOrNot } from "rionizkeycloakify/tools/LazyOrNot";
import { getKcClsx } from "rionizkeycloakify/login/lib/kcClsx";
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
    ListItem,
    Checkbox,
    Radio
} from "@mui/material";
import { styles } from "../styles/pages/LoginUpdateProfile.ts";
type LoginUpdateProfileProps = PageProps<
    Extract<
        KcContext,
        {
            pageId: "login-update-profile.ftl";
        }
    >,
    I18n
> & {
    id?: string;
    UserProfileFormFields: LazyOrNot<(props: UserProfileFormFieldsProps) => JSX.Element>;
    doMakeUserConfirmPassword: boolean;
};
export default function LoginUpdateProfile(props: LoginUpdateProfileProps) {
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
    const { messagesPerField, url, isAppInitiatedAction } = kcContext;
    const { msg, msgStr } = i18n;
    const [isFormSubmittable, setIsFormSubmittable] = useState(false);
    return (
        <Template
            id="LoginUpdateProfile_Template_1"
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayRequiredFields
            headerNode={msg("loginProfileTitle")}
            displayMessage={messagesPerField.exists("global")}
        >
            <Box
                action={url.loginAction}
                method="post"
                component="form"
                id="LoginUpdateProfile_Box_1"
                sx={styles.LoginUpdateProfile_Box_1}
            >
                <UserProfileFormFields
                    id="LoginUpdateProfile_UserProfileFormFields_1"
                    kcContext={kcContext}
                    i18n={i18n}
                    kcClsx={kcClsx}
                    onIsFormSubmittableValueChange={setIsFormSubmittable}
                    doMakeUserConfirmPassword={doMakeUserConfirmPassword}
                />
                <Box id="LoginUpdateProfile_Box_2" sx={styles.LoginUpdateProfile_Box_2}>
                    <Button
                        disabled={!isFormSubmittable}
                        type="submit"
                        value={msgStr("doSubmit")}
                        fullWidth={true}
                        id="LoginUpdateProfile_Button_1"
                        sx={styles.LoginUpdateProfile_Button_1}
                    />
                    {isAppInitiatedAction && (
                        <Button
                            type="submit"
                            name="cancel-aia"
                            value="true"
                            formNoValidate
                            id="LoginUpdateProfile_Button_2"
                            sx={styles.LoginUpdateProfile_Button_2}
                        >
                            {msg("doCancel")}
                        </Button>
                    )}
                </Box>
            </Box>
        </Template>
    );
}
