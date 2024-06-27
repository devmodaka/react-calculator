import React from 'react';
import './Display.css';

const Display = ({ value }) => {
  return (
    <div className="display" id="display">
      {value}
    </div>
  );
};

export {Display};