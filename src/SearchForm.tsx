import * as React from "react";
import styled from "styled-components";

const Form = styled.form`
  margin: 25px auto;
  width: 50%;
  padding: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const SubmitButton = styled.button`
  font-size: 20px;
  letter-spacing: 5px;
  font-weight: 100;
  border-radius: 15px;
  border: 2px solid white;
  padding: 12px 20px;
  background: rgb(38, 53, 64, 0.7);
  color: white;
  transition: 0.2s ease-in-out;
  &:hover {
    background: white;
    color: rgb(38, 53, 64);
  }
`;

const InputField = styled.input`
  font-size: 30px;
  font-weight: 100;
  padding: 7px 14px;
  margin: 0px 20px;
  width: inherit;
  color: white;
  background: rgb(38, 53, 64, 0.7);
  outline: none;
  border-radius: 15px;
  border: none;
`;

export type SearchProps = {
  city: string;
};

export const SearchForm = ({
  submit,
}: {
  submit: (city: SearchProps) => void;
}) => {
  const [newSearch, setNewSearch] = React.useState("");

  return (
    <Form
      action="submit"
      onSubmit={(event) => {
        event.preventDefault();
        submit({ city: newSearch });
        setNewSearch("");
      }}
    >
      <InputField
        type="text"
        placeholder="What's the weather like in..."
        value={newSearch}
        onChange={(e) => setNewSearch(e.target.value)}
      />
      <SubmitButton type="submit">SEARCH</SubmitButton>
    </Form>
  );
};
