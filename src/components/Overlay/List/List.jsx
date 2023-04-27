import React from 'react';
import PropTypes from 'prop-types';

export default function List({ list_items }) {
  return list_items.length ? (
    <ul className="list-outside list-disc pl-4 my-4">
      {list_items.slice(0, 5).map((list_item, index) => {
        return (
          <li
            className={`text-xs text-bold-dark ${!index && 'font-bold'}`}
            key={list_item}
          >
            {list_item}
          </li>
        );
      })}
    </ul>
  ) : null;
}

List.propTypes = {
  list_items: PropTypes.arrayOf(PropTypes.string),
};
List.defaultProps = {
  list_items: [],
};
