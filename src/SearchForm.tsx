import * as React from "react";
import styled from "styled-components";

const Form = styled.form`
  margin: 20px 20px;
`;

const SubmitButton = styled.button`
  font-size: 30px;
  font-weight: 100;
  border-radius: 15px;
  border: 2px solid white;
  padding: 7px 14px;
  background: #49515e;
  color: white;
  transition: 0.2s ease-in-out;
  &:hover {
    background: white;
    color: #49515e;
  }
`;

const InputField = styled.input`
  font-size: 30px;
  font-weight: 100;
  padding: 7px 14px;
  margin: 0px 20px;
  width: 500px;
  color: white;
  background: #49515e;
  outline: none;
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 2px solid white;
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
        onChange={(event) => setNewSearch(event.target.value)}
      />
      <SubmitButton type="submit">Search</SubmitButton>
    </Form>
  );
};
