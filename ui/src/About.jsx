import React from 'react';
import store from './store.js';

export default function About() {
  return (
    <div className="text-center">
      <h3>{store.data ? store.data.about : 'unknown'}</h3>
    </div>
  );
}
