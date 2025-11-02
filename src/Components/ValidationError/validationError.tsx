import "./validationError.css";

type ValidationErrorProps = {
  errors: string[] | null;
};

const ValidationError = ({ errors }: ValidationErrorProps) => {
  if (errors) {
    return (
      <ol className="errorText">
        {errors.map(error => {
          return (
            <li key={error}>
              {error}
            </li>
          )
        })}
      </ol>
    );
  } else {
    return null
  }
};

export default ValidationError;
