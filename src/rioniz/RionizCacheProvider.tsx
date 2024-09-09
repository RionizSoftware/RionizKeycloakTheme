import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
import { ReactElement } from "react";
import { RionizConfigs } from "./RionizConfigs.ts";

// Create rtl cache
const cacheRtl = createCache({
    key: "muirtl",
    stylisPlugins: [prefixer, rtlPlugin]
});

export function RionizCacheProvider(props: { children: ReactElement }) {
    return RionizConfigs.languageDirection === "rtl" ? (
        <CacheProvider value={cacheRtl}>{props.children}</CacheProvider>
    ) : (
        <CacheProvider value={createCache({ key: "muiltr" })}>
            {props.children}
        </CacheProvider>
    );
}
