import { useState } from "react";
import type { LazyOrNot } from "keycloakify/tools/LazyOrNot";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { UserProfileFormFieldsProps } from "keycloakify/login/UserProfileFormFieldsProps";
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
import { styles } from "./styles/IdpReviewUserProfile.ts";
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
        <Template id="IdpReviewUserProfile_Template_1">
            <Box
                className={kcClsx("kcFormClass")}
                action={url.loginAction}
                method="post"
                component="form"
                id="IdpReviewUserProfile_Box_1"
                sx={styles.IdpReviewUserProfile_Box_1}
            >
                <UserProfileFormFields id="IdpReviewUserProfile_UserProfileFormFields_1" />
                <Box
                    id="IdpReviewUserProfile_Box_2"
                    sx={styles.IdpReviewUserProfile_Box_2}
                >
                    <Box
                        className={kcClsx("kcFormOptionsClass")}
                        id="IdpReviewUserProfile_Box_3"
                        sx={styles.IdpReviewUserProfile_Box_3}
                    ></Box>
                    <Box
                        className={kcClsx("kcFormButtonsClass")}
                        id="IdpReviewUserProfile_Box_4"
                        sx={styles.IdpReviewUserProfile_Box_4}
                    >
                        <TextField
                            id="IdpReviewUserProfile_TextField_1"
                            sx={styles.IdpReviewUserProfile_TextField_1}
                        />
                    </Box>
                </Box>
            </Box>
        </Template>
    );
}
