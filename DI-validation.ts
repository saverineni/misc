const currentDate = new Date();

export const ageIsUnderOrEqualTo120 = (year: string | number) =>
  currentDate.getFullYear() - Number(year) <= 120 ||
  "Year of birth must be the same as or after (current year - 120)";

export const ageIsBeforeCurrentDate = (
  year: string,
  month: string,
  day: string
) =>
  new Date(Number(year), Number(month) - 1, Number(day)).getTime() <=
    currentDate.getTime() || "Date of birth must be in the past";

export const dateIsReal = (
  year: string,
  month: string,
  day: string
): boolean | string => {
  // Number(month) - 1 is necessary as month is zero-based
  const comparisonDate = new Date(Number(year), Number(month) - 1, Number(day));
  return (
    (comparisonDate.getDate() === Number(day) &&
      comparisonDate.getMonth() === Number(month) - 1) ||
    "Date of birth must be a real date"
  );
};
