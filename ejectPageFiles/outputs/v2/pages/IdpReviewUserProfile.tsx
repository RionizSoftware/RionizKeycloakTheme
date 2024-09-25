import { useState } from "react";
import type { LazyOrNot } from "rionizkeycloakify/tools/LazyOrNot";
import { getKcClsx } from "rionizkeycloakify/login/lib/kcClsx";
import type { PageProps } from "rionizkeycloakify/login/pages/PageProps";
import type { UserProfileFormFieldsProps } from "rionizkeycloakify/login/UserProfileFormFieldsProps";
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
import { styles } from "../styles/pages/IdpReviewUserProfile.ts";
type IdpReviewUserProfileProps = PageProps<
    Extract<
        KcContext,
        {
            pageId: "idp-review-user-profile.ftl";
        }
    >,
    I18n
> & {
    UserProfileFormFields: LazyOrNot<(props: UserProfileFormFieldsProps) => JSX.Element>;
    doMakeUserConfirmPassword: boolean;
};
export default function IdpReviewUserProfile(props: IdpReviewUserProfileProps) {
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
    const { url, messagesPerField } = kcContext;
    const [isFomSubmittable, setIsFomSubmittable] = useState(false);
    return (
        <Template
            id="IdpReviewUserProfile_Template_1"
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={messagesPerField.exists("global")}
            displayRequiredFields
            headerNode={msg("loginIdpReviewProfileTitle")}
        >
            <Box
                id="kc-idp-review-profile-form"
                action={url.loginAction}
                method="post"
                component="form"
            >
                <UserProfileFormFields
                    id="IdpReviewUserProfile_UserProfileFormFields_1"
                    kcContext={kcContext}
                    i18n={i18n}
                    onIsFormSubmittableValueChange={setIsFomSubmittable}
                    kcClsx={kcClsx}
                    doMakeUserConfirmPassword={doMakeUserConfirmPassword}
                />
                <Box id="IdpReviewUserProfile_div_1">
                    <TextField
                        id="IdpReviewUserProfile_input_1"
                        type="submit"
                        value={msgStr("doSubmit")}
                        disabled={!isFomSubmittable}
                    />
                </Box>
            </Box>
        </Template>
    );
}
