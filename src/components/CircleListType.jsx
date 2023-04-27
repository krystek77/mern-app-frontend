import React from 'react';

export default function CircleListType({ size, top, left, classes }) {
  return (
    <div
      style={{ top, left, width: size, height: size }}
      className={`absolute -translate-y-1/2 selection:border border-primary-dark bg-primary rounded-full ${classes}`}
    ></div>
  );
}
