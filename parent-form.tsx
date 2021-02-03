import { isEmpty, startCase } from "lodash";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../../../components/button";
import DateOptionSelector from "../../../../components/DateOptionSelector";
import { Label } from "../../../../components/label";
import { Select } from "../../../../components/select";
import { TextArea } from "../../../../components/textarea";
import { TextInput } from "../../../../components/textInput";
import fetchLookUpRequired from "../../../../globals/stateLookUp";
import store, { RootState } from "../../../../store";
import { CreateIdentityAction, GetNationalityAction } from "./redux/action";
import { IIdentity } from "./redux/model";
import ErrorSummary from "../../../../components/errorSummary";

const inputNames = {
  fullName: "fullName",
  nationality: "nationality",
  identityDateOfBirthOrRange: "identityDateOfBirthOrRange",
  identityComments: "identityComments",
};

const buttonNames = {
  submit: "Add identity",
  clear: "Clear form",
};

const formClasses = {
  formItem: "form-item",
  dateOptionSelector: "date-option-selector",
  dateOptionSelectorRadioLabel: "date-option-selector-radio-label",
  label: "label",
};

export default function IdentityForm(props: any) {
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    errors,
  } = useForm<IIdentity>({
    criteriaMode: "all",
    reValidateMode: "onSubmit",
    shouldUnregister: true,
  });
  const dispatch = useDispatch();

  const dateOfBirthProps = {
    id: "DateOfBirth",
    dateInputClass: "govuk-date-input",
    dayClass: "govuk-date-input__item",
    dayLabelClass: "govuk-label govuk-date-input__label",
    dayInputClass: "govuk-input govuk-date-input__input govuk-input--width-1",
    monthClass: "govuk-date-input__item",
    monthLabelClass: "govuk-label govuk-date-input__label",
    monthInputClass: "govuk-input govuk-date-input__input govuk-input--width-1",
    yearClass: "govuk-date-input__item",
    yearLabelClass: "govuk-label govuk-date-input__label",
    yearInputClass: "govuk-input govuk-date-input__input govuk-input--width-2",
    inputNames: { day: "day", month: "month", year: "year" },
    labels: { day: "Day", month: "Month", year: "Year" },
    getValues,
    errors,
  };

  const rangeOfBirthProps = {
    yearLabel: "Year",
    labelClass: "govuk-label",
    operatorLabelClass: "range-of-birth-operator-label",
    fromClass: "range-of-birth-left",
    fromName: "fromYear",
    toLabel: "To",
    toClass: "range-of-birth-right",
    toName: "toYear",
    getValues,
    errors,
  };

  const nationalityState = store.getState().FetchIdentityFormDataReducer
    .nationality.payload.nationality;

  useEffect(() => {
    if (fetchLookUpRequired(nationalityState)) {
      dispatch(GetNationalityAction());
    }
  }, [dispatch]);

  const onSubmit = handleSubmit((data: IIdentity) => {
    const identity: IIdentity = {
      DateOptionSelector: data.DateOptionSelector,
      day: data.day,
      month: data.month,
      year: data.year,
      fromYear: data.fromYear,
      toYear: data.toYear,
      fullName: data.fullName,
      nationality: data.nationality,
      identityComments: data.identityComments,
    };
    dispatch(CreateIdentityAction(identity));
    reset({ DateOptionSelector: data.DateOptionSelector });
  });

  const { nationalityStateData } = useSelector((state: RootState) => ({
    nationalityStateData: state.FetchIdentityFormDataReducer.nationality,
  }));

  return (
    <form onSubmit={onSubmit}>
      <>
        {!isEmpty(errors) && <ErrorSummary errors={errors} />}
        <div className="identity-form">
          <div className={`${formClasses.formItem}`}>
            <Label name={startCase(inputNames.fullName)} />
            <TextInput
              name={inputNames.fullName}
              reference={register}
              className={inputNames.fullName}
            />
          </div>
          <div
            className={`${formClasses.formItem} 
        ${inputNames.identityDateOfBirthOrRange}`}
          >
            <DateOptionSelector
              dateOptionSelectorClass={`${formClasses.dateOptionSelector}`}
              dateClass={inputNames.identityDateOfBirthOrRange}
              radioClass={inputNames.identityDateOfBirthOrRange}
              radioLabelClass={`${formClasses.label} ${formClasses.dateOptionSelectorRadioLabel}`}
              typeName={inputNames.identityDateOfBirthOrRange}
              dateOfBirthProps={dateOfBirthProps}
              rangeOfBirthProps={rangeOfBirthProps}
              reference={register}
            />
          </div>
          <div className={`${formClasses.formItem} ${inputNames.nationality}`}>
            <Label name={startCase(inputNames.nationality)} />
            <Select
              name={inputNames.nationality}
              reference={register}
              options={nationalityStateData.payload.nationality}
            />
          </div>
          <div className={`${formClasses.formItem}`}>
            <Label name={startCase(inputNames.identityComments)} />
            <TextArea
              id={inputNames.identityComments}
              name={inputNames.identityComments}
              reference={register}
              className={inputNames.identityComments}
            />
          </div>
          <div className="buttons">
            <Button
              className="govuk-button--secondary"
              name={buttonNames.submit}
              onClick={onSubmit}
              type="submit"
            />
            <Button
              className="button-secondary"
              name={buttonNames.clear}
              onClick={() => {
                reset({ DateOptionSelector: getValues().DateOptionSelector });
              }}
              type="button"
            />
          </div>
        </div>
      </>
    </form>
  );
}
