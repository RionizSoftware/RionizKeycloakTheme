import { useEffect, useReducer, Fragment } from "react";
import { assert } from "keycloakify/tools/assert";
import type { KcClsx } from "keycloakify/login/lib/kcClsx";
import {
    useUserProfileForm,
    getButtonToDisplayForMultivaluedAttributeField,
    type FormAction,
    type FormFieldError
} from "keycloakify/login/lib/useUserProfileForm";
import type { UserProfileFormFieldsProps } from "keycloakify/login/UserProfileFormFieldsProps";
import type { Attribute } from "keycloakify/login/KcContext";
import type { KcContext } from "./KcContext";
import type { I18n } from "./i18n";
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
import { styles } from "./styles/UserProfileFormFields.ts";
export default function UserProfileFormFields(
    props: UserProfileFormFieldsProps<KcContext, I18n>
) {
    const {
        kcContext,
        i18n,
        kcClsx,
        onIsFormSubmittableValueChange,
        doMakeUserConfirmPassword,
        BeforeField,
        AfterField
    } = props;
    const { advancedMsg } = i18n;
    const {
        formState: { formFieldStates, isFormSubmittable },
        dispatchFormAction
    } = useUserProfileForm({
        kcContext,
        i18n,
        doMakeUserConfirmPassword
    });
    useEffect(() => {
        onIsFormSubmittableValueChange(isFormSubmittable);
    }, [isFormSubmittable]);
    const groupNameRef = { current: "" };
    return (
        <>
            {formFieldStates.map(({ attribute, displayableErrors, valueOrValues }) => {
                return (
                    <Box
                        id="UserProfileFormFields_Box_1"
                        sx={styles.UserProfileFormFields_Box_1}
                    >
                        <GroupLabel id="UserProfileFormFields_GroupLabel_1" />
                        {BeforeField !== undefined && (
                            <BeforeField id="UserProfileFormFields_BeforeField_1" />
                        )}
                        <Box
                            id="UserProfileFormFields_Box_2"
                            sx={styles.UserProfileFormFields_Box_2}
                        >
                            <FormLabel
                                id="UserProfileFormFields_FormLabel_1"
                                sx={styles.UserProfileFormFields_FormLabel_1}
                            >
                                {advancedMsg(attribute.displayName ?? "")}
                            </FormLabel>
                            {attribute.required && <> *</>}

                            <Box
                                id="UserProfileFormFields_Box_3"
                                sx={styles.UserProfileFormFields_Box_3}
                            >
                                {attribute.annotations.inputHelperTextBefore !==
                                    undefined && (
                                    <Box
                                        id="UserProfileFormFields_Box_4"
                                        sx={styles.UserProfileFormFields_Box_4}
                                    >
                                        {advancedMsg(
                                            attribute.annotations.inputHelperTextBefore
                                        )}
                                    </Box>
                                )}
                                <InputFieldByType id="UserProfileFormFields_InputFieldByType_1" />
                                <FieldErrors id="UserProfileFormFields_FieldErrors_1" />
                                {attribute.annotations.inputHelperTextAfter !==
                                    undefined && (
                                    <Box
                                        id="UserProfileFormFields_Box_5"
                                        sx={styles.UserProfileFormFields_Box_5}
                                    >
                                        {advancedMsg(
                                            attribute.annotations.inputHelperTextAfter
                                        )}
                                    </Box>
                                )}

                                {AfterField !== undefined && (
                                    <AfterField id="UserProfileFormFields_AfterField_1" />
                                )}
                                {/* NOTE: Downloading of html5DataAnnotations scripts is done in the useUserProfileForm hook */}
                            </Box>
                        </Box>
                    </Box>
                );
            })}
        </>
    );
}
function GroupLabel(props: {
    attribute: Attribute;
    groupNameRef: {
        current: string;
    };
    i18n: I18n;
    kcClsx: KcClsx;
}) {
    const { attribute, groupNameRef, i18n, kcClsx } = props;
    const { advancedMsg } = i18n;
    if (attribute.group?.name !== groupNameRef.current) {
        groupNameRef.current = attribute.group?.name ?? "";
        if (groupNameRef.current !== "") {
            assert(attribute.group !== undefined);
            return (
                <Box
                    id="UserProfileFormFields_Box_6"
                    sx={styles.UserProfileFormFields_Box_6}
                >
                    {(() => {
                        const groupDisplayHeader = attribute.group.displayHeader ?? "";
                        const groupHeaderText =
                            groupDisplayHeader !== ""
                                ? advancedMsg(groupDisplayHeader)
                                : attribute.group.name;
                        return (
                            <Box
                                id="UserProfileFormFields_Box_7"
                                sx={styles.UserProfileFormFields_Box_7}
                            >
                                <FormLabel
                                    id="UserProfileFormFields_FormLabel_2"
                                    sx={styles.UserProfileFormFields_FormLabel_2}
                                >
                                    {groupHeaderText}
                                </FormLabel>
                            </Box>
                        );
                    })()}
                    {(() => {
                        const groupDisplayDescription =
                            attribute.group.displayDescription ?? "";
                        if (groupDisplayDescription !== "") {
                            const groupDescriptionText = advancedMsg(
                                groupDisplayDescription
                            );
                            return (
                                <Box
                                    id="UserProfileFormFields_Box_8"
                                    sx={styles.UserProfileFormFields_Box_8}
                                >
                                    <FormLabel
                                        id="UserProfileFormFields_FormLabel_3"
                                        sx={styles.UserProfileFormFields_FormLabel_3}
                                    >
                                        {groupDescriptionText}
                                    </FormLabel>
                                </Box>
                            );
                        }
                        return null;
                    })()}
                </Box>
            );
        }
    }
    return null;
}
function FieldErrors(props: {
    attribute: Attribute;
    displayableErrors: FormFieldError[];
    fieldIndex: number | undefined;
    kcClsx: KcClsx;
}) {
    const { attribute, fieldIndex, kcClsx } = props;
    const displayableErrors = props.displayableErrors.filter(
        error => error.fieldIndex === fieldIndex
    );
    if (displayableErrors.length === 0) {
        return null;
    }
    return (
        <span id="UserProfileFormFields_span_1">
            {displayableErrors
                .filter(error => error.fieldIndex === fieldIndex)
                .map(({ errorMessage }, i, arr) => (
                    <Box
                        id="UserProfileFormFields_Box_9"
                        sx={styles.UserProfileFormFields_Box_9}
                    >
                        {errorMessage}
                        {arr.length - 1 !== i && <br id="UserProfileFormFields_br_1" />}
                    </Box>
                ))}
        </span>
    );
}
type InputFieldByTypeProps = {
    attribute: Attribute;
    valueOrValues: string | string[];
    displayableErrors: FormFieldError[];
    dispatchFormAction: React.Dispatch<FormAction>;
    i18n: I18n;
    kcClsx: KcClsx;
};
function InputFieldByType(props: InputFieldByTypeProps) {
    const { attribute, valueOrValues } = props;
    switch (attribute.annotations.inputType) {
        case "textarea":
            return <TextareaTag id="UserProfileFormFields_TextareaTag_1" />;
        case "select":
        case "multiselect":
            return <SelectTag id="UserProfileFormFields_SelectTag_1" />;
        case "select-radiobuttons":
        case "multiselect-checkboxes":
            return <InputTagSelects id="UserProfileFormFields_InputTagSelects_1" />;
        default: {
            if (valueOrValues instanceof Array) {
                return (
                    <>
                        {valueOrValues.map((...[, i]) => (
                            <InputTag id="UserProfileFormFields_InputTag_1" />
                        ))}
                    </>
                );
            }
            const inputNode = <InputTag id="UserProfileFormFields_InputTag_2" />;
            if (attribute.name === "password" || attribute.name === "password-confirm") {
                return (
                    <PasswordWrapper id="UserProfileFormFields_PasswordWrapper_1">
                        {inputNode}
                    </PasswordWrapper>
                );
            }
            return inputNode;
        }
    }
}
function PasswordWrapper(props: {
    kcClsx: KcClsx;
    i18n: I18n;
    passwordInputId: string;
    children: JSX.Element;
}) {
    const { kcClsx, i18n, passwordInputId, children } = props;
    const { msgStr } = i18n;
    const [isPasswordRevealed, toggleIsPasswordRevealed] = useReducer(
        (isPasswordRevealed: boolean) => !isPasswordRevealed,
        false
    );
    useEffect(() => {
        const passwordInputElement = document.getElementById(passwordInputId);
        assert(passwordInputElement instanceof HTMLInputElement);
        passwordInputElement.type = isPasswordRevealed ? "text" : "password";
    }, [isPasswordRevealed]);
    return (
        <Box id="UserProfileFormFields_Box_10" sx={styles.UserProfileFormFields_Box_10}>
            {children}
            <Button
                id="UserProfileFormFields_Button_1"
                sx={styles.UserProfileFormFields_Button_1}
            >
                <i id="UserProfileFormFields_i_1" />
            </Button>
        </Box>
    );
}
function InputTag(
    props: InputFieldByTypeProps & {
        fieldIndex: number | undefined;
    }
) {
    const {
        attribute,
        fieldIndex,
        kcClsx,
        dispatchFormAction,
        valueOrValues,
        i18n,
        displayableErrors
    } = props;
    const { advancedMsgStr } = i18n;
    return (
        <>
            <TextField
                id="UserProfileFormFields_TextField_1"
                sx={styles.UserProfileFormFields_TextField_1}
            />
            {(() => {
                if (fieldIndex === undefined) {
                    return null;
                }
                assert(valueOrValues instanceof Array);
                const values = valueOrValues;
                return (
                    <>
                        <FieldErrors id="UserProfileFormFields_FieldErrors_2" />
                        <AddRemoveButtonsMultiValuedAttribute id="UserProfileFormFields_AddRemoveButtonsMultiValuedAttribute_1" />
                    </>
                );
            })()}
        </>
    );
}
function AddRemoveButtonsMultiValuedAttribute(props: {
    attribute: Attribute;
    values: string[];
    fieldIndex: number;
    dispatchFormAction: React.Dispatch<
        Extract<
            FormAction,
            {
                action: "update";
            }
        >
    >;
    i18n: I18n;
}) {
    const { attribute, values, fieldIndex, dispatchFormAction, i18n } = props;
    const { msg } = i18n;
    const { hasAdd, hasRemove } = getButtonToDisplayForMultivaluedAttributeField({
        attribute,
        values,
        fieldIndex
    });
    const idPostfix = `-${attribute.name}-${fieldIndex + 1}`;
    return (
        <>
            {hasRemove && (
                <>
                    <Button
                        id="UserProfileFormFields_Button_2"
                        sx={styles.UserProfileFormFields_Button_2}
                    >
                        {msg("remove")}
                    </Button>
                    {hasAdd ? <>&nbsp;|&nbsp;</> : null}
                </>
            )}
            {hasAdd && (
                <Button
                    id="UserProfileFormFields_Button_3"
                    sx={styles.UserProfileFormFields_Button_3}
                >
                    {msg("addValue")}
                </Button>
            )}
        </>
    );
}
function InputTagSelects(props: InputFieldByTypeProps) {
    const { attribute, dispatchFormAction, kcClsx, valueOrValues } = props;
    const { advancedMsg } = props.i18n;
    const { classDiv, classInput, classLabel, inputType } = (() => {
        const { inputType } = attribute.annotations;
        assert(
            inputType === "select-radiobuttons" || inputType === "multiselect-checkboxes"
        );
        switch (inputType) {
            case "select-radiobuttons":
                return {
                    inputType: "radio",
                    classDiv: kcClsx("kcInputClassRadio"),
                    classInput: kcClsx("kcInputClassRadioInput"),
                    classLabel: kcClsx("kcInputClassRadioLabel")
                };
            case "multiselect-checkboxes":
                return {
                    inputType: "checkbox",
                    classDiv: kcClsx("kcInputClassCheckbox"),
                    classInput: kcClsx("kcInputClassCheckboxInput"),
                    classLabel: kcClsx("kcInputClassCheckboxLabel")
                };
        }
    })();
    const options = (() => {
        walk: {
            const { inputOptionsFromValidation } = attribute.annotations;
            if (inputOptionsFromValidation === undefined) {
                break walk;
            }
            const validator = (
                attribute.validators as Record<
                    string,
                    {
                        options?: string[];
                    }
                >
            )[inputOptionsFromValidation];
            if (validator === undefined) {
                break walk;
            }
            if (validator.options === undefined) {
                break walk;
            }
            return validator.options;
        }
        return attribute.validators.options?.options ?? [];
    })();
    return (
        <>
            {options.map(option => (
                <Box
                    id="UserProfileFormFields_Box_11"
                    sx={styles.UserProfileFormFields_Box_11}
                >
                    <TextField
                        id="UserProfileFormFields_TextField_2"
                        sx={styles.UserProfileFormFields_TextField_2}
                    />
                    <FormLabel
                        id="UserProfileFormFields_FormLabel_4"
                        sx={styles.UserProfileFormFields_FormLabel_4}
                    >
                        {advancedMsg(option)}
                    </FormLabel>
                </Box>
            ))}
        </>
    );
}
function TextareaTag(props: InputFieldByTypeProps) {
    const { attribute, dispatchFormAction, kcClsx, displayableErrors, valueOrValues } =
        props;
    assert(typeof valueOrValues === "string");
    const value = valueOrValues;
    return <textarea id="UserProfileFormFields_textarea_1" />;
}
function SelectTag(props: InputFieldByTypeProps) {
    const {
        attribute,
        dispatchFormAction,
        kcClsx,
        displayableErrors,
        i18n,
        valueOrValues
    } = props;
    const { advancedMsgStr } = i18n;
    const isMultiple = attribute.annotations.inputType === "multiselect";
    return (
        <select id="UserProfileFormFields_select_1">
            {!isMultiple && <option id="UserProfileFormFields_option_1"></option>}
            {(() => {
                const options = (() => {
                    walk: {
                        const { inputOptionsFromValidation } = attribute.annotations;
                        if (inputOptionsFromValidation === undefined) {
                            break walk;
                        }
                        assert(typeof inputOptionsFromValidation === "string");
                        const validator = (
                            attribute.validators as Record<
                                string,
                                {
                                    options?: string[];
                                }
                            >
                        )[inputOptionsFromValidation];
                        if (validator === undefined) {
                            break walk;
                        }
                        if (validator.options === undefined) {
                            break walk;
                        }
                        return validator.options;
                    }
                    return attribute.validators.options?.options ?? [];
                })();
                return options.map(option => (
                    <option id="UserProfileFormFields_option_2">
                        {(() => {
                            if (attribute.annotations.inputOptionLabels !== undefined) {
                                const { inputOptionLabels } = attribute.annotations;
                                return advancedMsgStr(
                                    inputOptionLabels[option] ?? option
                                );
                            }
                            if (
                                attribute.annotations.inputOptionLabelsI18nPrefix !==
                                undefined
                            ) {
                                return advancedMsgStr(
                                    `${attribute.annotations.inputOptionLabelsI18nPrefix}.${option}`
                                );
                            }
                            return option;
                        })()}
                    </option>
                ));
            })()}
        </select>
    );
}
