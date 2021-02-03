import { startCase } from "lodash";
import React, { useEffect, useState } from "react";
import DateInput, { DateTypes } from "../DateInput";
import { Label } from "../label";
import { Radio } from "../radio";
import { RangeOfBirth } from "../rangeOfBirth";

type DateInputPropTypes = {
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
  inputNames: DateTypes;
  id: string;
  labels: DateTypes;
  getValues: any;
  errors: any;
};

type RangeOfBirthPropTypes = {
  yearLabel: string;
  labelClass: string;
  operatorLabelClass: string;
  fromClass: string;
  fromName: string;
  toLabel: string;
  toClass: string;
  toName: string;
  getValues: any;
  errors: any;
};

type DateOptionSelectorTypes = {
  dateOptionSelectorClass: string;
  dateClass: string;
  radioClass: string;
  radioLabelClass: string;
  typeName: string;
  reference: any;
  dateOfBirthProps: DateInputPropTypes;
  rangeOfBirthProps: RangeOfBirthPropTypes;
};

const dateOptions = {
  dateOfBirth: "Date of birth",
  rangeOfBirth: "Range of birth",
};

const identitytypeNames = [
  {
    id: "DoB",
    typeName: "DateOptionSelector",
    value: dateOptions.dateOfBirth,
  },
  {
    id: "RoB",
    typeName: "DateOptionSelector",
    value: dateOptions.rangeOfBirth,
  },
];

const DateOptionSelector = ({
  dateOptionSelectorClass,
  dateClass,
  radioClass,
  radioLabelClass,
  typeName,
  reference,
  dateOfBirthProps,
  rangeOfBirthProps,
}: DateOptionSelectorTypes) => {
  const [currentOption, setCurrentOption]: any = useState(
    dateOptions.dateOfBirth
  );

  const dateOptionSwitch = (option: string) => {
    switch (option) {
      case dateOptions.dateOfBirth:
        return setCurrentOption(
          <DateInput
            reference={reference}
            getValues={dateOfBirthProps.getValues}
            id={dateOfBirthProps.id}
            dateInputClass={dateOfBirthProps.dateInputClass}
            dayClass={dateOfBirthProps.dayClass}
            dayLabelClass={dateOfBirthProps.dayLabelClass}
            dayInputClass={dateOfBirthProps.dayInputClass}
            monthClass={dateOfBirthProps.monthClass}
            monthLabelClass={dateOfBirthProps.monthLabelClass}
            monthInputClass={dateOfBirthProps.monthInputClass}
            yearClass={dateOfBirthProps.yearClass}
            yearLabelClass={dateOfBirthProps.yearLabelClass}
            yearInputClass={dateOfBirthProps.yearInputClass}
            inputNames={dateOfBirthProps.inputNames}
            labels={dateOfBirthProps.labels}
            defaultValue={{ day: "", month: "", year: "" }}
            errors={dateOfBirthProps.errors}
          />
        );

      case dateOptions.rangeOfBirth:
        return setCurrentOption(
          <RangeOfBirth
            yearLabel={rangeOfBirthProps.yearLabel}
            labelClass={rangeOfBirthProps.labelClass}
            operatorLabelClass={rangeOfBirthProps.operatorLabelClass}
            fromClass={rangeOfBirthProps.fromClass}
            fromReference={reference}
            fromName={rangeOfBirthProps.fromName}
            fromDefaultValue=""
            toLabel={rangeOfBirthProps.toLabel}
            toClass={rangeOfBirthProps.toClass}
            toReference={reference}
            toName={rangeOfBirthProps.toName}
            toDefaultValue=""
            getValues={rangeOfBirthProps.getValues}
            errors={rangeOfBirthProps.errors}
          />
        );
      default:
        return setCurrentOption(
          <DateInput
            reference={reference}
            id={dateOfBirthProps.id}
            dateInputClass={dateOfBirthProps.dateInputClass}
            dayClass={dateOfBirthProps.dayClass}
            dayLabelClass={dateOfBirthProps.dayLabelClass}
            dayInputClass={dateOfBirthProps.dayInputClass}
            monthClass={dateOfBirthProps.monthClass}
            monthLabelClass={dateOfBirthProps.monthLabelClass}
            monthInputClass={dateOfBirthProps.monthInputClass}
            yearClass={dateOfBirthProps.yearClass}
            yearLabelClass={dateOfBirthProps.yearLabelClass}
            yearInputClass={dateOfBirthProps.yearInputClass}
            inputNames={dateOfBirthProps.inputNames}
            labels={dateOfBirthProps.labels}
            defaultValue={{ day: "", month: "", year: "" }}
            errors={dateOfBirthProps.errors}
            getValues={dateOfBirthProps.getValues}
          />
        );
    }
  };

  useEffect(() => {
    dateOptionSwitch(currentOption);
  }, []);

  const onChange = (event: any) => {
    if (event.target.value === dateOptions.dateOfBirth) {
      dateOptionSwitch(dateOptions.dateOfBirth);
    }
    if (event.target.value === dateOptions.rangeOfBirth) {
      dateOptionSwitch(dateOptions.rangeOfBirth);
    }
  };

  return (
    <div className={dateOptionSelectorClass}>
      <div className={radioClass}>
        <Label name={startCase(typeName)} cssClass={radioLabelClass} />
        <Radio
          name="DateOptionSelector"
          reference={reference}
          typeNamesArray={identitytypeNames}
          onChange={onChange}
          defaultValue={currentOption}
        />
      </div>
      <div className={dateClass}>{currentOption}</div>
    </div>
  );
};

export default DateOptionSelector;
