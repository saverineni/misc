import { ErrorMessage } from "@hookform/error-message";
import { isEmpty } from "lodash";
import startCase from "lodash/startCase";
import React from "react";
import { Label } from "../label";
import { TextInput } from "../textInput";
import {
  dateRangeValidation,
  VALIDATION_ERROR_FROM_YEAR_LENGTH,
  VALIDATION_ERROR_FROM_YEAR_TOO_NEW,
  VALIDATION_ERROR_RANGE_INCOMPLETE,
  VALIDATION_ERROR_TO_YEAR_LENGTH,
  VALIDATION_ERROR_TO_YEAR_TOO_NEW,
  VALIDATION_ERROR_YEAR_TOO_OLD,
  YEAR_LENGTH,
  YEAR_RANGE_LIMIT,
} from "./validation";

export type DateTypes = {
  fromYear: string;
  toYear: string;
};

type RangeOfBirthProps = {
  yearLabel: string;
  labelClass: string;
  operatorLabelClass: string;
  fromClass: string;
  fromReference: any;
  fromName: string;
  fromDefaultValue: string;
  toLabel: string;
  toClass: string;
  toReference: any;
  toName: string;
  toDefaultValue: string;
  getValues: any;
  errors: any;
};

const currentYear = new Date().getFullYear();
const fromOrToDate = { from: "from", to: "to" };

const showErrorMessages = (fromName: string, toName: string, errors: any) => (
  <div className="error-message-group-range-of-birth">
    <ErrorMessage
      errors={errors}
      name={fromName}
      render={({ messages }) =>
        messages &&
        Object.entries(messages).map(([type, message]) => (
          <span className={`govuk-error-message ${fromName}`} key={type}>
            {message}
          </span>
        ))
      }
    />
    <ErrorMessage
      errors={errors}
      name={toName}
      render={({ messages }) =>
        messages &&
        Object.entries(messages).map(([type, message]) => (
          <span className={`govuk-error-message ${toName}`} key={type}>
            {message}
          </span>
        ))
      }
    />
  </div>
);

const areFieldsOfThisComponentExist = (errors: any, inputNames: DateTypes) => {
  if (!isEmpty(errors)) {
    const errorFieldNames = Object.keys(errors);
    const fieldNames = Object.keys(inputNames);

    return errorFieldNames.some((errorFieldName) =>
      fieldNames.includes(errorFieldName)
    );
  }
  return false;
};

export const RangeOfBirth = ({
  yearLabel,
  labelClass,
  operatorLabelClass,
  fromClass,
  fromReference,
  fromName,
  fromDefaultValue,
  toLabel,
  toClass,
  toReference,
  toName,
  toDefaultValue,
  getValues,
  errors,
}: RangeOfBirthProps): JSX.Element => {
  const errorsExist = areFieldsOfThisComponentExist(errors, {
    fromYear: "fromYear",
    toYear: "toYear",
  });
  return (
    <div
      className={`govuk-range-of-birth-component ${
        errorsExist ? "govuk-error-message-group" : ""
      }`}
    >
      {!isEmpty(errors) && showErrorMessages(fromName, toName, errors)}
      <div
        className={`govuk-range-of-birth ${
          !isEmpty(errors) ? "birth-fields-margin" : ""
        }`}
      >
        <div className={fromClass}>
          <Label name={startCase(yearLabel)} cssClass={labelClass} />
          <TextInput
            name={fromName}
            reference={fromReference({
              min: {
                value: currentYear - YEAR_RANGE_LIMIT,
                message: VALIDATION_ERROR_YEAR_TOO_OLD,
              },
              max: {
                value: currentYear,
                message: VALIDATION_ERROR_FROM_YEAR_TOO_NEW,
              },
              validate: dateRangeValidation(
                fromName,
                toName,
                fromOrToDate.from,
                getValues
              ),
              required: VALIDATION_ERROR_RANGE_INCOMPLETE,
              minLength: {
                value: YEAR_LENGTH,
                message: VALIDATION_ERROR_FROM_YEAR_LENGTH,
              },
              maxLength: {
                value: YEAR_LENGTH,
                message: VALIDATION_ERROR_FROM_YEAR_LENGTH,
              },
            })}
            type="number"
            defaultValue={fromDefaultValue}
          />
          <Label name={startCase(toLabel)} cssClass={operatorLabelClass} />
        </div>
        <div className={toClass}>
          <Label name={startCase(yearLabel)} cssClass={labelClass} />
          <TextInput
            name={toName}
            reference={toReference({
              min: {
                value: currentYear - YEAR_RANGE_LIMIT,
                message: VALIDATION_ERROR_YEAR_TOO_OLD,
              },
              max: {
                value: currentYear,
                message: VALIDATION_ERROR_TO_YEAR_TOO_NEW,
              },
              validate: dateRangeValidation(
                fromName,
                toName,
                fromOrToDate.to,
                getValues
              ),
              required: VALIDATION_ERROR_RANGE_INCOMPLETE,
              minLength: {
                value: YEAR_LENGTH,
                message: VALIDATION_ERROR_TO_YEAR_LENGTH,
              },
              maxLength: {
                value: YEAR_LENGTH,
                message: VALIDATION_ERROR_TO_YEAR_LENGTH,
              },
            })}
            type="number"
            defaultValue={toDefaultValue}
          />
        </div>
      </div>
    </div>
  );
};
export default RangeOfBirth;
