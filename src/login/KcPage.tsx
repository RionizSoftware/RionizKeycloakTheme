import { Suspense, lazy } from "react";
import type { ClassKey } from "keycloakify/login";
import type { KcContext } from "./KcContext";
import { useI18n } from "./i18n";
import DefaultPage from "keycloakify/login/DefaultPage";
import Template from "./Template";
import { RionizRoot } from "../rioniz/RionizRoot.tsx";
const Register = lazy(() => import("./pages/Register"));
const LoginResetPassword = lazy(() => import("./pages/LoginResetPassword"));
const LoginVerifyEmail = lazy(() => import("./pages/LoginVerifyEmail"));
const UserProfileFormFields = lazy(
    () => import("keycloakify/login/UserProfileFormFields")
);
const Login = lazy(() => import("./pages/Login"));
const LoginUpdatePassword = lazy(() => import("./pages/LoginUpdatePassword"));
const UpdateEmail = lazy(() => import("./pages/UpdateEmail"));
const LoginOtp = lazy(() => import("./pages/LoginOtp"));
const Info = lazy(() => import("./pages/Info"));
const Error = lazy(() => import("./pages/Error"));
const Code = lazy(() => import("./pages/Code"));
const doMakeUserConfirmPassword = true;

export default function KcPage(props: { kcContext: KcContext }) {
    const { kcContext } = props;

    const { i18n } = useI18n({ kcContext });

    return (
        <Suspense>
            <RionizRoot>
                {(() => {
                    switch (kcContext.pageId) {
                        case "login.ftl":
                            return (
                                <Login
                                    {...{ kcContext, i18n, classes }}
                                    Template={Template}
                                    doUseDefaultCss={true}
                                />
                            );
                        case "register.ftl":
                            return (
                                <Register
                                    {...{ kcContext, i18n, classes }}
                                    Template={Template}
                                    doUseDefaultCss={true}
                                    UserProfileFormFields={UserProfileFormFields}
                                    doMakeUserConfirmPassword={doMakeUserConfirmPassword}
                                />
                            );
                        case "login-reset-password.ftl":
                            return (
                                <LoginResetPassword
                                    {...{ kcContext, i18n, classes }}
                                    Template={Template}
                                    doUseDefaultCss={true}
                                />
                            );
                        case "login-verify-email.ftl":
                            return (
                                <LoginVerifyEmail
                                    {...{ kcContext, i18n, classes }}
                                    Template={Template}
                                    doUseDefaultCss={true}
                                />
                            );
                        case "login-update-password.ftl":
                            return (
                                <LoginUpdatePassword
                                    {...{ kcContext, i18n, classes }}
                                    Template={Template}
                                    doUseDefaultCss={true}
                                />
                            );
                        case "update-email.ftl":
                            return (
                                <UpdateEmail
                                    {...{ kcContext, i18n, classes }}
                                    Template={Template}
                                    doUseDefaultCss={true}
                                    UserProfileFormFields={UserProfileFormFields}
                                    doMakeUserConfirmPassword={doMakeUserConfirmPassword}
                                />
                            );
                        case "login-otp.ftl":
                            return (
                                <LoginOtp
                                    {...{ kcContext, i18n, classes }}
                                    Template={Template}
                                    doUseDefaultCss={true}
                                />
                            );
                        case "info.ftl":
                            return (
                                <Info
                                    {...{ kcContext, i18n, classes }}
                                    Template={Template}
                                    doUseDefaultCss={true}
                                />
                            );
                        case "error.ftl":
                            return (
                                <Error
                                    {...{ kcContext, i18n, classes }}
                                    Template={Template}
                                    doUseDefaultCss={true}
                                />
                            );
                        case "code.ftl":
                            return (
                                <Code
                                    {...{ kcContext, i18n, classes }}
                                    Template={Template}
                                    doUseDefaultCss={true}
                                />
                            );
                        default:
                            return (
                                <DefaultPage
                                    kcContext={kcContext}
                                    i18n={i18n}
                                    classes={classes}
                                    Template={Template}
                                    doUseDefaultCss={true}
                                    UserProfileFormFields={UserProfileFormFields}
                                    doMakeUserConfirmPassword={doMakeUserConfirmPassword}
                                />
                            );
                    }
                })()}
            </RionizRoot>
        </Suspense>
    );
}

const classes = { kcHtmlClass: "", kcBodyClass: "" } satisfies {
    [key in ClassKey]?: string;
};
