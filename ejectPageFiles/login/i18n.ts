import { createUseI18n } from "rionizkeycloakify/login";

export const { useI18n, ofTypeI18n } = createUseI18n({});

export type I18n = typeof ofTypeI18n;
