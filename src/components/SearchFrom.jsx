import React, { useEffect } from "react";
import { Form, useSubmit, useNavigation, useNavigate } from "react-router-dom";

export default function SearchFrom({ queryTitle }) {
  const submit = useSubmit();
  const navigation = useNavigation();
  const navigate = useNavigate();

  useEffect(() => {
    document.getElementById("title").value = queryTitle;
  }, [queryTitle]);

  const isSearching = navigation.location && new URLSearchParams(navigation.location.search).has(queryTitle);

  return (
    <div className='w-full md:max-w-2xl relative'>
      <Form className='w-full' id='search-form' role='search' action='/wyposazenie-pralni-przemyslowej/szukaj'>
        <input
          className='form-input w-full rounded-md border-2 border-primary-dark py-2 px-4 text-sm focus:outline-none focus:ring-0 focus:border-2 focus:border-accent-dark'
          type='search'
          placeholder='szukaj przemysłowych urządzeń pralniczych'
          name='title'
          id='title'
          aria-label='look for the products by category'
          defaultValue={queryTitle}
          onFocus={() => navigate("/wyposazenie-pralni-przemyslowej/szukaj")}
          onChange={(event) => {
            const isFirstSearch = queryTitle === null;
            submit(event.currentTarget.form, { replace: !isFirstSearch });
          }}
        />
      </Form>
      <div hidden={!isSearching}>Szukanie...</div>
    </div>
  );
}
