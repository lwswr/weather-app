import * as React from "react";

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
    <form
      action="submit"
      onSubmit={(event) => {
        event.preventDefault();
        submit({ city: newSearch });
        setNewSearch("");
      }}
    >
      <input
        type="text"
        placeholder="What's the weather like in..."
        value={newSearch}
        onChange={(event) => setNewSearch(event.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
};
