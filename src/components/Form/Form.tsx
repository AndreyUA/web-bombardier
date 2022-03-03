import { FC, ChangeEvent } from "react";

interface FormProps {
  handleSubmit: (e: ChangeEvent<HTMLFormElement>) => void;
  url: string;
  handleUrlChange: (e: ChangeEvent<HTMLInputElement>) => void;
  isSubmit: boolean;
}

const Form: FC<FormProps> = ({
  handleSubmit,
  url,
  handleUrlChange,
  isSubmit,
}) => {
  return (
    <form className="App_form" onSubmit={handleSubmit}>
      <input
        value={url}
        onChange={handleUrlChange}
        type="text"
        placeholder="enter your URL!"
      />
      <input
        disabled={!url.length}
        type="submit"
        value={isSubmit ? "STOP" : "START"}
      />
    </form>
  );
};

export default Form;
