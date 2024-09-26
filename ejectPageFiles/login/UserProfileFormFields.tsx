import { useEffect, useReducer, Fragment } from "react";
import { assert } from "rionizkeycloakify/tools/assert";
import type { KcClsx } from "rionizkeycloakify/login/lib/kcClsx";
import {
    useUserProfileForm,
    getButtonToDisplayForMultivaluedAttributeField,
    type FormAction,
    type FormFieldError
} from "rionizkeycloakify/login/lib/useUserProfileForm";
import type { UserProfileFormFieldsProps } from "rionizkeycloakify/login/UserProfileFormFieldsProps";
import type { Attribute } from "rionizkeycloakify/login/KcContext";
import type { KcContext } from "./KcContext";
import type { I18n } from "./i18n";
import { Box, Button, Link, TextField, FormLabel, Typography, List, ListItem, Checkbox, Radio } from "@mui/material";
import { styles } from "./styles/UserProfileFormFields.ts";
import { PasswordWrapper } from "./pages/PasswordWrapper.tsx";
export default function UserProfileFormFields(props: UserProfileFormFieldsProps<KcContext, I18n>) {
    const { kcContext, i18n, kcClsx, onIsFormSubmittableValueChange, doMakeUserConfirmPassword, BeforeField, AfterField } = props;
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
                    <Box key={attribute.name} id="UserProfileFormFields_Box_1" sx={styles.UserProfileFormFields_Box_1}>
                        <GroupLabel
                            id="UserProfileFormFields_GroupLabel_1"
                            attribute={attribute}
                            groupNameRef={groupNameRef}
                            i18n={i18n}
                            kcClsx={kcClsx}
                        />
                        {BeforeField !== undefined && (
                            <BeforeField
                                attribute={attribute}
                                dispatchFormAction={dispatchFormAction}
                                displayableErrors={displayableErrors}
                                valueOrValues={valueOrValues}
                                kcClsx={kcClsx}
                                i18n={i18n}
                            />
                        )}
                        <Box
                            style={{
                                display: attribute.name === "password-confirm" && !doMakeUserConfirmPassword ? "none" : undefined
                            }}
                            id="UserProfileFormFields_Box_2"
                            sx={styles.UserProfileFormFields_Box_2}
                        >
                            <Box id="UserProfileFormFields_Box_3" sx={styles.UserProfileFormFields_Box_3}>
                                <FormLabel
                                    htmlFor={attribute.name}
                                    id="UserProfileFormFields_FormLabel_1"
                                    sx={styles.UserProfileFormFields_FormLabel_1}
                                >
                                    {advancedMsg(attribute.displayName ?? "")}
                                </FormLabel>
                                {attribute.required && <> *</>}
                            </Box>
                            <Box id="UserProfileFormFields_Box_4" sx={styles.UserProfileFormFields_Box_4}>
                                {attribute.annotations.inputHelperTextBefore !== undefined && (
                                    <Box aria-live="polite" id="UserProfileFormFields_Box_5" sx={styles.UserProfileFormFields_Box_5}>
                                        {advancedMsg(attribute.annotations.inputHelperTextBefore)}
                                    </Box>
                                )}
                                <InputFieldByType
                                    id="UserProfileFormFields_InputFieldByType_1"
                                    attribute={attribute}
                                    valueOrValues={valueOrValues}
                                    displayableErrors={displayableErrors}
                                    dispatchFormAction={dispatchFormAction}
                                    kcClsx={kcClsx}
                                    i18n={i18n}
                                />
                                <FieldErrors
                                    id="UserProfileFormFields_FieldErrors_1"
                                    attribute={attribute}
                                    displayableErrors={displayableErrors}
                                    kcClsx={kcClsx}
                                    fieldIndex={undefined}
                                />
                                {attribute.annotations.inputHelperTextAfter !== undefined && (
                                    <Box aria-live="polite" id="UserProfileFormFields_Box_6" sx={styles.UserProfileFormFields_Box_6}>
                                        {advancedMsg(attribute.annotations.inputHelperTextAfter)}
                                    </Box>
                                )}

                                {AfterField !== undefined && (
                                    <AfterField
                                        attribute={attribute}
                                        dispatchFormAction={dispatchFormAction}
                                        displayableErrors={displayableErrors}
                                        valueOrValues={valueOrValues}
                                        kcClsx={kcClsx}
                                        i18n={i18n}
                                    />
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
    id: string;
}) {
    const { attribute, groupNameRef, i18n, kcClsx } = props;
    const { advancedMsg } = i18n;
    if (attribute.group?.name !== groupNameRef.current) {
        groupNameRef.current = attribute.group?.name ?? "";
        if (groupNameRef.current !== "") {
            assert(attribute.group !== undefined);
            return (
                <Box
                    {...Object.fromEntries(Object.entries(attribute.group.html5DataAnnotations).map(([key, value]) => [`data-${key}`, value]))}
                    id="UserProfileFormFields_Box_7"
                    sx={styles.UserProfileFormFields_Box_7}
                >
                    {(() => {
                        const groupDisplayHeader = attribute.group.displayHeader ?? "";
                        const groupHeaderText = groupDisplayHeader !== "" ? advancedMsg(groupDisplayHeader) : attribute.group.name;
                        return (
                            <Box id="UserProfileFormFields_Box_8" sx={styles.UserProfileFormFields_Box_8}>
                                <FormLabel id="UserProfileFormFields_FormLabel_2" sx={styles.UserProfileFormFields_FormLabel_2}>
                                    {groupHeaderText}
                                </FormLabel>
                            </Box>
                        );
                    })()}
                    {(() => {
                        const groupDisplayDescription = attribute.group.displayDescription ?? "";
                        if (groupDisplayDescription !== "") {
                            const groupDescriptionText = advancedMsg(groupDisplayDescription);
                            return (
                                <Box id="UserProfileFormFields_Box_9" sx={styles.UserProfileFormFields_Box_9}>
                                    <FormLabel id="UserProfileFormFields_FormLabel_3" sx={styles.UserProfileFormFields_FormLabel_3}>
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
    id: string;
    attribute: Attribute;
    displayableErrors: FormFieldError[];
    fieldIndex: number | undefined;
    kcClsx: KcClsx;
}) {
    const { attribute, fieldIndex, kcClsx } = props;
    const displayableErrors = props.displayableErrors.filter(error => error.fieldIndex === fieldIndex);
    if (displayableErrors.length === 0) {
        return null;
    }
    return (
        <span id={`input-error-${attribute.name}${fieldIndex === undefined ? "" : `-${fieldIndex}`}`} aria-live="polite">
            {displayableErrors
                .filter(error => error.fieldIndex === fieldIndex)
                .map(({ errorMessage }, i, arr) => (
                    <Box key={i} id="UserProfileFormFields_Box_10" sx={styles.UserProfileFormFields_Box_10}>
                        {errorMessage}
                        {arr.length - 1 !== i && <br id="UserProfileFormFields_br_1" />}
                    </Box>
                ))}
        </span>
    );
}
type InputFieldByTypeProps = {
    id: string;
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
            return <TextareaTag id="UserProfileFormFields_TextareaTag_1" {...props} />;
        case "select":
        case "multiselect":
            return <SelectTag id="UserProfileFormFields_SelectTag_1" {...props} />;
        case "select-radiobuttons":
        case "multiselect-checkboxes":
            return <InputTagSelects id="UserProfileFormFields_InputTagSelects_1" {...props} />;
        default: {
            if (valueOrValues instanceof Array) {
                return (
                    <>
                        {valueOrValues.map((...[, i]) => (
                            <InputTag id="UserProfileFormFields_InputTag_1" key={i} {...props} fieldIndex={i} />
                        ))}
                    </>
                );
            }
            const inputNode = <InputTag id="UserProfileFormFields_InputTag_2" {...props} fieldIndex={undefined} />;
            if (attribute.name === "password" || attribute.name === "password-confirm") {
                return (
                    <PasswordWrapper
                        id="UserProfileFormFields_PasswordWrapper_1"
                        kcClsx={props.kcClsx}
                        i18n={props.i18n}
                        passwordInputId={attribute.name}
                    >
                        {inputNode}
                    </PasswordWrapper>
                );
            }
            return inputNode;
        }
    }
}

function InputTag(
    props: InputFieldByTypeProps & {
        id: string;
        fieldIndex: number | undefined;
    }
) {
    const { attribute, fieldIndex, kcClsx, dispatchFormAction, valueOrValues, i18n, displayableErrors } = props;
    const { advancedMsgStr } = i18n;
    return (
        <>
            <input
                type={(() => {
                    const { inputType } = attribute.annotations;
                    if (inputType?.startsWith("html5-")) {
                        return inputType.slice(6);
                    }
                    return inputType ?? "text";
                })()}
                name={attribute.name}
                value={(() => {
                    if (fieldIndex !== undefined) {
                        assert(valueOrValues instanceof Array);
                        return valueOrValues[fieldIndex];
                    }
                    assert(typeof valueOrValues === "string");
                    return valueOrValues;
                })()}
                aria-invalid={displayableErrors.find(error => error.fieldIndex === fieldIndex) !== undefined}
                disabled={attribute.readOnly}
                autoComplete={attribute.autocomplete}
                placeholder={
                    attribute.annotations.inputTypePlaceholder === undefined ? undefined : advancedMsgStr(attribute.annotations.inputTypePlaceholder)
                }
                pattern={attribute.annotations.inputTypePattern}
                size={attribute.annotations.inputTypeSize === undefined ? undefined : parseInt(`${attribute.annotations.inputTypeSize}`)}
                maxLength={
                    attribute.annotations.inputTypeMaxlength === undefined ? undefined : parseInt(`${attribute.annotations.inputTypeMaxlength}`)
                }
                minLength={
                    attribute.annotations.inputTypeMinlength === undefined ? undefined : parseInt(`${attribute.annotations.inputTypeMinlength}`)
                }
                max={attribute.annotations.inputTypeMax}
                min={attribute.annotations.inputTypeMin}
                step={attribute.annotations.inputTypeStep}
                {...Object.fromEntries(Object.entries(attribute.html5DataAnnotations ?? {}).map(([key, value]) => [`data-${key}`, value]))}
                onChange={event =>
                    dispatchFormAction({
                        action: "update",
                        name: attribute.name,
                        valueOrValues: (() => {
                            if (fieldIndex !== undefined) {
                                assert(valueOrValues instanceof Array);
                                return valueOrValues.map((value, i) => {
                                    if (i === fieldIndex) {
                                        return event.target.value;
                                    }
                                    return value;
                                });
                            }
                            return event.target.value;
                        })()
                    })
                }
                onBlur={() =>
                    dispatchFormAction({
                        action: "focus lost",
                        name: attribute.name,
                        fieldIndex: fieldIndex
                    })
                }
                id="UserProfileFormFields_TextField_1"
            />
            {(() => {
                if (fieldIndex === undefined) {
                    return null;
                }
                assert(valueOrValues instanceof Array);
                const values = valueOrValues;
                return (
                    <>
                        <FieldErrors
                            id="UserProfileFormFields_FieldErrors_2"
                            attribute={attribute}
                            kcClsx={kcClsx}
                            displayableErrors={displayableErrors}
                            fieldIndex={fieldIndex}
                        />
                        <AddRemoveButtonsMultiValuedAttribute
                            id="UserProfileFormFields_AddRemoveButtonsMultiValuedAttribute_1"
                            attribute={attribute}
                            values={values}
                            fieldIndex={fieldIndex}
                            dispatchFormAction={dispatchFormAction}
                            i18n={i18n}
                        />
                    </>
                );
            })()}
        </>
    );
}
function AddRemoveButtonsMultiValuedAttribute(props: {
    id: string;
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
                        type="button"
                        onClick={() =>
                            dispatchFormAction({
                                action: "update",
                                name: attribute.name,
                                valueOrValues: values.filter((_, i) => i !== fieldIndex)
                            })
                        }
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
                    type="button"
                    onClick={() =>
                        dispatchFormAction({
                            action: "update",
                            name: attribute.name,
                            valueOrValues: [...values, ""]
                        })
                    }
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
        assert(inputType === "select-radiobuttons" || inputType === "multiselect-checkboxes");
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
                <Box key={option} id="UserProfileFormFields_Box_12" sx={styles.UserProfileFormFields_Box_12}>
                    <input
                        type={inputType}
                        name={attribute.name}
                        value={option}
                        aria-invalid={props.displayableErrors.length !== 0}
                        disabled={attribute.readOnly}
                        checked={valueOrValues instanceof Array ? valueOrValues.includes(option) : valueOrValues === option}
                        onChange={event =>
                            dispatchFormAction({
                                action: "update",
                                name: attribute.name,
                                valueOrValues: (() => {
                                    const isChecked = event.target.checked;
                                    if (valueOrValues instanceof Array) {
                                        const newValues = [...valueOrValues];
                                        if (isChecked) {
                                            newValues.push(option);
                                        } else {
                                            newValues.splice(newValues.indexOf(option), 1);
                                        }
                                        return newValues;
                                    }
                                    return event.target.checked ? option : "";
                                })()
                            })
                        }
                        onBlur={() =>
                            dispatchFormAction({
                                action: "focus lost",
                                name: attribute.name,
                                fieldIndex: undefined
                            })
                        }
                        id="UserProfileFormFields_TextField_2"
                    />
                    <FormLabel
                        htmlFor={`${attribute.name}-${option}`}
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
    const { attribute, dispatchFormAction, kcClsx, displayableErrors, valueOrValues } = props;
    assert(typeof valueOrValues === "string");
    const value = valueOrValues;
    return (
        <textarea
            id={attribute.name}
            name={attribute.name}
            aria-invalid={displayableErrors.length !== 0}
            disabled={attribute.readOnly}
            cols={attribute.annotations.inputTypeCols === undefined ? undefined : parseInt(`${attribute.annotations.inputTypeCols}`)}
            rows={attribute.annotations.inputTypeRows === undefined ? undefined : parseInt(`${attribute.annotations.inputTypeRows}`)}
            maxLength={attribute.annotations.inputTypeMaxlength === undefined ? undefined : parseInt(`${attribute.annotations.inputTypeMaxlength}`)}
            value={value}
            onChange={event =>
                dispatchFormAction({
                    action: "update",
                    name: attribute.name,
                    valueOrValues: event.target.value
                })
            }
            onBlur={() =>
                dispatchFormAction({
                    action: "focus lost",
                    name: attribute.name,
                    fieldIndex: undefined
                })
            }
        />
    );
}
function SelectTag(props: InputFieldByTypeProps) {
    const { attribute, dispatchFormAction, kcClsx, displayableErrors, i18n, valueOrValues } = props;
    const { advancedMsgStr } = i18n;
    const isMultiple = attribute.annotations.inputType === "multiselect";
    return (
        <select
            id={attribute.name}
            name={attribute.name}
            aria-invalid={displayableErrors.length !== 0}
            disabled={attribute.readOnly}
            multiple={isMultiple}
            size={attribute.annotations.inputTypeSize === undefined ? undefined : parseInt(`${attribute.annotations.inputTypeSize}`)}
            value={valueOrValues}
            onChange={event =>
                dispatchFormAction({
                    action: "update",
                    name: attribute.name,
                    valueOrValues: (() => {
                        if (isMultiple) {
                            return Array.from(event.target.selectedOptions).map(option => option.value);
                        }
                        return event.target.value;
                    })()
                })
            }
            onBlur={() =>
                dispatchFormAction({
                    action: "focus lost",
                    name: attribute.name,
                    fieldIndex: undefined
                })
            }
        >
            {!isMultiple && <option id="UserProfileFormFields_option_1" value=""></option>}
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
                    <option id="UserProfileFormFields_option_2" key={option} value={option}>
                        {(() => {
                            if (attribute.annotations.inputOptionLabels !== undefined) {
                                const { inputOptionLabels } = attribute.annotations;
                                return advancedMsgStr(inputOptionLabels[option] ?? option);
                            }
                            if (attribute.annotations.inputOptionLabelsI18nPrefix !== undefined) {
                                return advancedMsgStr(`${attribute.annotations.inputOptionLabelsI18nPrefix}.${option}`);
                            }
                            return option;
                        })()}
                    </option>
                ));
            })()}
        </select>
    );
}
