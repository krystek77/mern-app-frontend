import React from 'react';
import PropTypes from 'prop-types';

export default function Tags({ arrayOfTags, title }) {
  return (
    <div className="mb-2">
      <span className="block text-black-dark text-xs font-medium">{title}</span>
      <div className="text-slate-500 text-xs py-2">
        {arrayOfTags.map((tag) => (
          <span
            className="border border-accent-dark bg-accent text-black-dark font-medium p-1 rounded-sm mr-1"
            key={tag}
          >{`#${tag.trim()} `}</span>
        ))}
      </div>
    </div>
  );
}
Tags.propTypes = {
  arrayOfTags: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string,
};
Tags.defaultProps = {
  arrayOfTags: [],
  title: '',
};
