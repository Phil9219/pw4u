import { useState } from "react";

function Form() {
  const [inputValue, setInputValue] = useState("");
  return (
    <form>
      <input
        type="text"
        placeholder="search"
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
        required={true}
      />
    </form>
  );
}

export default Form;
