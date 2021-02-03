import { ErrorMessage } from "@hookform/error-message";
import React from "react";
import { FieldErrors } from "react-hook-form";

type ErrorSummaryProps<T> = {
  errors: FieldErrors<T>;
};

function ErrorSummary<T>({ errors }: ErrorSummaryProps<T>) {
  if (Object.keys(errors).length === 0) {
    return null;
  }
  return (
    <div className="govuk-error-summary">
      <h2 className="govuk-error-summary__title" id="error-summary-heading">
        There is a problem
      </h2>

      <ul className="govuk-list govuk-error-summary__list">
        {Object.keys(errors).map((fieldName) => (
          <ErrorMessage
            errors={errors}
            name={fieldName as any}
            key={fieldName}
            render={({ messages }) =>
              messages &&
              Object.entries(messages).map(([type, message]) => (
                <li key={type}>
                  <span
                    className={`govuk-error-message ${fieldName}`}
                    key={`${fieldName}-${type}`}
                  >
                    <a href={`#${fieldName}`}>{message}</a>
                  </span>
                </li>
              ))
            }
          />
        ))}
      </ul>
    </div>
  );
}

export default ErrorSummary;
