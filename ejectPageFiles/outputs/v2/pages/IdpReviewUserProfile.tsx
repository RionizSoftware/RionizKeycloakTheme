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
                action={url.loginAction}
                method="post"
                component="form"
                id="IdpReviewUserProfile_Box_1"
                sx={styles.IdpReviewUserProfile_Box_1}
            >
                <UserProfileFormFields
                    id="IdpReviewUserProfile_UserProfileFormFields_1"
                    kcContext={kcContext}
                    i18n={i18n}
                    onIsFormSubmittableValueChange={setIsFomSubmittable}
                    kcClsx={kcClsx}
                    doMakeUserConfirmPassword={doMakeUserConfirmPassword}
                />
                <Box
                    id="IdpReviewUserProfile_Box_2"
                    sx={styles.IdpReviewUserProfile_Box_2}
                >
                    <TextField
                        type="submit"
                        value={msgStr("doSubmit")}
                        disabled={!isFomSubmittable}
                        id="IdpReviewUserProfile_TextField_1"
                        sx={styles.IdpReviewUserProfile_TextField_1}
                    />
                </Box>
            </Box>
        </Template>
    );
}
