import React from 'react';

export default function GenreTag(props) {
  console.log(props);
  return (
      <kbd className="px-2 py-1.5 mb-2 font-semibold text-white bg-neutral-600 border rounded-full text-sm">
        {props.props}
      </kbd>

  );
}