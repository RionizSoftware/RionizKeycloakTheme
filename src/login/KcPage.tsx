import { Suspense } from "react";
import type { ClassKey } from "rionizkeycloakify/login";
import type { KcContext } from "./KcContext";
import { useI18n } from "./i18n";
import DefaultPage from "rionizkeycloakify/login/DefaultPage";
import UserProfileFormFields from "rionizkeycloakify/login/UserProfileFormFields";
import Template from "rionizkeycloakify/login/Template";

const doMakeUserConfirmPassword = true;
export default function KcPage(props: { kcContext: KcContext }) {
    const { kcContext } = props;
    const { i18n } = useI18n({ kcContext });
    return (
        <Suspense>
            {(() => {
                switch (kcContext.pageId) {
                    default:
                        return (
                            <DefaultPage
                                kcContext={kcContext}
                                i18n={i18n}
                                classes={classes}
                                Template={Template}
                                doUseDefaultCss={false}
                                UserProfileFormFields={UserProfileFormFields}
                                doMakeUserConfirmPassword={doMakeUserConfirmPassword}
                            />
                        );
                }
            })()}
        </Suspense>
    );
}
const classes = {} satisfies {
    [key in ClassKey]?: string;
};
