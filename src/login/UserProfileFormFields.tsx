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
import { Box, Button, Link, TextField, FormLabel, Typography, List, ListItem } from "@mui/material";
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
                    <Box key={attribute.name}>
                        <GroupLabel attribute={attribute} groupNameRef={groupNameRef} i18n={i18n} kcClsx={kcClsx} />
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
                        >
                            <Box>
                                <FormLabel htmlFor={attribute.name}>{advancedMsg(attribute.displayName ?? "")}</FormLabel>
                                {attribute.required && <> *</>}
                            </Box>
                            <Box>
                                {attribute.annotations.inputHelperTextBefore !== undefined && (
                                    <Box id={`form-help-text-before-${attribute.name}`} aria-live="polite">
                                        {advancedMsg(attribute.annotations.inputHelperTextBefore)}
                                    </Box>
                                )}
                                <InputFieldByType
                                    attribute={attribute}
                                    valueOrValues={valueOrValues}
                                    displayableErrors={displayableErrors}
                                    dispatchFormAction={dispatchFormAction}
                                    kcClsx={kcClsx}
                                    i18n={i18n}
                                />
                                <FieldErrors attribute={attribute} displayableErrors={displayableErrors} kcClsx={kcClsx} fieldIndex={undefined} />
                                {attribute.annotations.inputHelperTextAfter !== undefined && (
                                    <Box id={`form-help-text-after-${attribute.name}`} aria-live="polite">
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
}) {
    const { attribute, groupNameRef, i18n, kcClsx } = props;
    const { advancedMsg } = i18n;
    if (attribute.group?.name !== groupNameRef.current) {
        groupNameRef.current = attribute.group?.name ?? "";
        if (groupNameRef.current !== "") {
            assert(attribute.group !== undefined);
            return (
                <Box {...Object.fromEntries(Object.entries(attribute.group.html5DataAnnotations).map(([key, value]) => [`data-${key}`, value]))}>
                    {(() => {
                        const groupDisplayHeader = attribute.group.displayHeader ?? "";
                        const groupHeaderText = groupDisplayHeader !== "" ? advancedMsg(groupDisplayHeader) : attribute.group.name;
                        return (
                            <Box>
                                <FormLabel id={`header-${attribute.group.name}`}>{groupHeaderText}</FormLabel>
                            </Box>
                        );
                    })()}
                    {(() => {
                        const groupDisplayDescription = attribute.group.displayDescription ?? "";
                        if (groupDisplayDescription !== "") {
                            const groupDescriptionText = advancedMsg(groupDisplayDescription);
                            return (
                                <Box>
                                    <FormLabel id={`description-${attribute.group.name}`}>{groupDescriptionText}</FormLabel>
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
function FieldErrors(props: { attribute: Attribute; displayableErrors: FormFieldError[]; fieldIndex: number | undefined; kcClsx: KcClsx }) {
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
                    <Box key={i}>
                        {errorMessage}
                        {arr.length - 1 !== i && <br />}
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
            return <TextareaTag {...props} />;
        case "select":
        case "multiselect":
            return <SelectTag {...props} />;
        case "select-radiobuttons":
        case "multiselect-checkboxes":
            return <InputTagSelects {...props} />;
        default: {
            if (valueOrValues instanceof Array) {
                return (
                    <>
                        {valueOrValues.map((...[, i]) => (
                            <InputTag key={i} {...props} fieldIndex={i} />
                        ))}
                    </>
                );
            }
            const inputNode = <InputTag {...props} fieldIndex={undefined} />;
            if (attribute.name === "password" || attribute.name === "password-confirm") {
                return (
                    <PasswordWrapper kcClsx={props.kcClsx} i18n={props.i18n} passwordInputId={attribute.name}>
                        {inputNode}
                    </PasswordWrapper>
                );
            }
            return inputNode;
        }
    }
}
function PasswordWrapper(props: { kcClsx: KcClsx; i18n: I18n; passwordInputId: string; children: JSX.Element }) {
    const { kcClsx, i18n, passwordInputId, children } = props;
    const { msgStr } = i18n;
    const [isPasswordRevealed, toggleIsPasswordRevealed] = useReducer((isPasswordRevealed: boolean) => !isPasswordRevealed, false);
    useEffect(() => {
        const passwordInputElement = document.getElementById(passwordInputId);
        assert(passwordInputElement instanceof HTMLInputElement);
        passwordInputElement.type = isPasswordRevealed ? "text" : "password";
    }, [isPasswordRevealed]);
    return (
        <Box>
            {children}
            <Button
                type="button"
                aria-label={msgStr(isPasswordRevealed ? "hidePassword" : "showPassword")}
                aria-controls={passwordInputId}
                onClick={toggleIsPasswordRevealed}
            >
                <i aria-hidden />
            </Button>
        </Box>
    );
}
function InputTag(
    props: InputFieldByTypeProps & {
        fieldIndex: number | undefined;
    }
) {
    const { attribute, fieldIndex, kcClsx, dispatchFormAction, valueOrValues, i18n, displayableErrors } = props;
    const { advancedMsgStr } = i18n;
    return (
        <>
            <TextField
                type={(() => {
                    const { inputType } = attribute.annotations;
                    if (inputType?.startsWith("html5-")) {
                        return inputType.slice(6);
                    }
                    return inputType ?? "text";
                })()}
                id={attribute.name}
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
            />
            {(() => {
                if (fieldIndex === undefined) {
                    return null;
                }
                assert(valueOrValues instanceof Array);
                const values = valueOrValues;
                return (
                    <>
                        <FieldErrors attribute={attribute} kcClsx={kcClsx} displayableErrors={displayableErrors} fieldIndex={fieldIndex} />
                        <AddRemoveButtonsMultiValuedAttribute
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
                        id={`kc-remove${idPostfix}`}
                        type="button"
                        onClick={() =>
                            dispatchFormAction({
                                action: "update",
                                name: attribute.name,
                                valueOrValues: values.filter((_, i) => i !== fieldIndex)
                            })
                        }
                    >
                        {msg("remove")}
                    </Button>
                    {hasAdd ? <>&nbsp;|&nbsp;</> : null}
                </>
            )}
            {hasAdd && (
                <Button
                    id={`kc-add${idPostfix}`}
                    type="button"
                    onClick={() =>
                        dispatchFormAction({
                            action: "update",
                            name: attribute.name,
                            valueOrValues: [...values, ""]
                        })
                    }
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
                <Box key={option}>
                    <TextField
                        type={inputType}
                        id={`${attribute.name}-${option}`}
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
                    />
                    <FormLabel htmlFor={`${attribute.name}-${option}`}>{advancedMsg(option)}</FormLabel>
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
            {!isMultiple && <option value=""></option>}
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
                    <option key={option} value={option}>
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
