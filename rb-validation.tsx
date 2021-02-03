// Can't be older than 120 	From Year must be <=120 years from date the identity is submitted.
export const VALIDATION_ERROR_YEAR_TOO_OLD =
  "Year of birth must be the same as or after (current year - 120)";

// Can't be born in the future 	From/To Year must be current year or earlier
export const VALIDATION_ERROR_FROM_YEAR_TOO_NEW =
  "From Year must be in the past";
export const VALIDATION_ERROR_TO_YEAR_TOO_NEW = "To Year must be in the past";

// Gap can't be more than 9 years 	To Year - From Year <= 9
export const VALIDATION_ERROR_RANGE_TOO_HIGH =
  "The difference in Range of Birth years must be 9 years or less";

// From Year must be earlier than To Year 	To Year - From Year <= 0
export const VALIDATION_ERROR_FROM_YEAR_AFTER_TO_YEAR =
  "The From Year must be before the To Year";

// Missing value 	Both or one of From Year/To Year has no value
export const VALIDATION_ERROR_RANGE_INCOMPLETE =
  "A complete Range of Birth must be provided";

// Invalid characters 	Non numeric characters used or either/both years do not contain 4 digits
export const VALIDATION_ERROR_FROM_YEAR_LENGTH =
  "Please enter a valid From Year";
export const VALIDATION_ERROR_TO_YEAR_LENGTH = "Please enter a valid To Year";

export const YEAR_RANGE_LIMIT = 120;
export const YEAR_LENGTH = 4;

export const dateRangeValidation = (
  fromName: string,
  toName: string,
  currentValidation: string,
  getValues: any
) => {
  if (currentValidation === "from") {
    return {
      yearsDifference: (value: number) =>
        value >= Number(getValues(toName)) - 9 ||
        VALIDATION_ERROR_RANGE_TOO_HIGH,
      fromBeforeTo: (value: number) =>
        value <= Number(getValues(toName)) ||
        VALIDATION_ERROR_FROM_YEAR_AFTER_TO_YEAR,
    };
  }
  // if not "from", "to"
  return {
    yearsDifference: (value: number) =>
      value <= Number(getValues(fromName)) + 9 ||
      VALIDATION_ERROR_RANGE_TOO_HIGH,
    fromBeforeTo: (value: number) =>
      value >= Number(getValues(fromName)) ||
      VALIDATION_ERROR_FROM_YEAR_AFTER_TO_YEAR,
  };
};
