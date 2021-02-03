import { ErrorMessage } from "@hookform/error-message";
import { isEmpty } from "lodash";
import * as React from "react";
import { Label } from "../label";
import { TextInput } from "../textInput";
import {
  ageIsBeforeCurrentDate,
  ageIsUnderOrEqualTo120,
  dateIsReal,
} from "./validation";

export type DateTypes = {
  day: string;
  month: string;
  year: string;
};

type DateInputProps = {
  reference: any;
  getValues: any;
  inputNames: DateTypes;
  id: string;
  labels: DateTypes;
  defaultValue: DateTypes;
  dateInputClass: string;
  dayClass: string;
  dayLabelClass: string;
  dayInputClass: string;
  monthClass: string;
  monthLabelClass: string;
  monthInputClass: string;
  yearClass: string;
  yearLabelClass: string;
  yearInputClass: string;
  errors: any;
};

const requiredText = (name: string) => `The field ${name} is required`;

const showErrorMessages = (inputNames: DateTypes, errors: any) => (
  <div className="error-message-group-date-of-birth">
    <ErrorMessage
      errors={errors}
      name={inputNames.day}
      render={({ messages }) =>
        messages &&
        Object.entries(messages).map(([type, message]) => (
          <span className={`govuk-error-message ${inputNames.day}`} key={type}>
            {message}
          </span>
        ))
      }
    />
    <ErrorMessage
      errors={errors}
      name={inputNames.month}
      render={({ messages }) =>
        messages &&
        Object.entries(messages).map(([type, message]) => (
          <span
            className={`govuk-error-message ${inputNames.month}`}
            key={type}
          >
            {message}
          </span>
        ))
      }
    />
    <ErrorMessage
      errors={errors}
      name={inputNames.year}
      render={({ messages }) =>
        messages &&
        Object.entries(messages).map(([type, message]) => (
          <span className={`govuk-error-message ${inputNames.year}`} key={type}>
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

const DateInput = ({
  dateInputClass,
  dayClass,
  dayLabelClass,
  dayInputClass,
  monthClass,
  monthLabelClass,
  monthInputClass,
  yearClass,
  yearLabelClass,
  yearInputClass,
  reference,
  getValues,
  inputNames,
  id,
  labels,
  defaultValue,
  errors,
}: DateInputProps): JSX.Element => {
  const validateDate = () =>
    dateIsReal(
      getValues(inputNames.year),
      getValues(inputNames.month),
      getValues(inputNames.day)
    );
  const validateDatePast = () =>
    ageIsBeforeCurrentDate(
      getValues(inputNames.year),
      getValues(inputNames.month),
      getValues(inputNames.day)
    );
  const errorsExist = areFieldsOfThisComponentExist(errors, inputNames);
  return (
    <div
      className={`${dateInputClass}-component ${
        errorsExist ? "govuk-error-message-group" : ""
      }`}
    >
      {!isEmpty(errors) && showErrorMessages(inputNames, errors)}
      <div
        className={`${dateInputClass} ${
          errorsExist ? "birth-fields-margin" : ""
        }`}
      >
        <div className={dayClass}>
          <Label cssClass={dayLabelClass} name={labels.day} />
          <TextInput
            className={dayInputClass}
            name={inputNames.day}
            reference={reference({
              required: requiredText(inputNames.day),
            })}
            type="number"
            defaultValue={defaultValue.day}
          />
        </div>

        <div className={monthClass}>
          <Label cssClass={monthLabelClass} name={labels.month} />
          <TextInput
            className={monthInputClass}
            name={inputNames.month}
            reference={reference({
              required: requiredText(inputNames.month),
            })}
            type="number"
            defaultValue={defaultValue.month}
          />
        </div>

        <div className={yearClass}>
          <Label cssClass={yearLabelClass} name={labels.year} />
          <TextInput
            className={yearInputClass}
            name={inputNames.year}
            reference={reference({
              required: requiredText(inputNames.year),
              validate: {
                ageIsUnderOrEqualTo120,
                validateDate,
                validateDatePast,
              },
            })}
            type="number"
            defaultValue={defaultValue.year}
          />
        </div>
      </div>
    </div>
  );
};
export default DateInput;
