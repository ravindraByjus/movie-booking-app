import React from "react";
import { InputGroup, Input, Button } from "reactstrap";
import { Link } from "react-router-dom";

export default function SearchSection(props) {
  const { onChangeSearchValue, onKeyPressSearchValue, onClickSearch } = props;

  return (
    <section className="search-section">
      <InputGroup>
        <Input
          placeholder=" Search movie name..."
          onChange={onChangeSearchValue}
          onKeyPress={onKeyPressSearchValue}
        />
        <Button color="success" onClick={onClickSearch}>
          Search
        </Button>
        <Link to={'/add-movie'} className='btn btn-primary'>
          Add Movie
        </Link>
      </InputGroup>
    </section>
  );
}
