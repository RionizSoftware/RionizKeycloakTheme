import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Box, Button, Link, TextField, FormLabel } from "@mui/material";
export default function LoginVerifyEmail(
    props: PageProps<
        Extract<
            KcContext,
            {
                pageId: "login-verify-email.ftl";
            }
        >,
        I18n
    >
) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
    const { msg } = i18n;
    const { url, user } = kcContext;
    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayInfo
            headerNode={msg("emailVerifyTitle")}
            infoNode={
                <p>
                    {msg("emailVerifyInstruction2")}
                    <br />
                    <Link href={url.loginAction}>{msg("doClickHere")}</Link>
                    &nbsp;
                    {msg("emailVerifyInstruction3")}
                </p>
            }
        >
            <p>{msg("emailVerifyInstruction1", user?.email ?? "")}</p>
        </Template>
    );
}
