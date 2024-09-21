import { useState } from "react";
import type { LazyOrNot } from "keycloakify/tools/LazyOrNot";
import { getKcClsx, type KcClsx } from "keycloakify/login/lib/kcClsx";
import type { UserProfileFormFieldsProps } from "keycloakify/login/UserProfileFormFieldsProps";
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
import { styles } from "./styles/UpdateEmail.ts";
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
        <Template id="UpdateEmail_Template_1">
            <Box
                className={kcClsx("kcFormClass")}
                action={url.loginAction}
                method="post"
                component="form"
                id="UpdateEmail_Box_1"
                sx={styles.UpdateEmail_Box_1}
            >
                <UserProfileFormFields id="UpdateEmail_UserProfileFormFields_1" />

                <Box id="UpdateEmail_Box_2" sx={styles.UpdateEmail_Box_2}>
                    <Box
                        className={kcClsx("kcFormOptionsClass")}
                        id="UpdateEmail_Box_3"
                        sx={styles.UpdateEmail_Box_3}
                    ></Box>

                    <LogoutOtherSessions id="UpdateEmail_LogoutOtherSessions_1" />

                    <Box
                        className={kcClsx("kcFormButtonsClass")}
                        id="UpdateEmail_Box_4"
                        sx={styles.UpdateEmail_Box_4}
                    >
                        <TextField
                            id="UpdateEmail_TextField_1"
                            sx={styles.UpdateEmail_TextField_1}
                        />
                        {isAppInitiatedAction && (
                            <Button
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
            id="UpdateEmail_Box_5"
            sx={styles.UpdateEmail_Box_5}
        >
            <Box id="UpdateEmail_Box_6" sx={styles.UpdateEmail_Box_6}>
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
    );
}
