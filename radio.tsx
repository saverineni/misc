import React from "react";
import includes from "lodash/includes";
import { FieldData } from "../../features/createRecord/dataOwner/redux/model";

type RadioProps = {
  defaultValue?: string;
  name: string;
  onChange?: any;
  reference: any;
  typeNamesArray: FieldData[];
};

const selectRadioFromState = (value: string, defaultData: string): boolean =>
  includes(defaultData, value);

const renderRadios = (
  defaultValue: string,
  typeNamesArray: FieldData[],
  reference: any,
  onChange: any
) =>
  typeNamesArray.map(({ id, typeName, value }) => (
    <div key={id} className={`govuk-radio-item ${value}`}>
      <input
        aria-label={`radio input for ${value}`}
        className={`govuk-radio ${value}`}
        id={id}
        name={typeName}
        ref={reference}
        type="radio"
        value={value}
        onChange={onChange ? (e) => onChange(e) : undefined}
        defaultChecked={selectRadioFromState(value, defaultValue)}
      />
      <label className={`govuk-radio-label ${value}`} htmlFor={id}>
        {value}
      </label>
    </div>
  ));

export const Radio = ({
  defaultValue = "",
  name,
  reference,
  typeNamesArray,
  onChange,
}: RadioProps) => (
  <div className={`govuk-radios-container ${name}`}>
    {renderRadios(defaultValue, typeNamesArray, reference, onChange)}
  </div>
);

export default Radio;
