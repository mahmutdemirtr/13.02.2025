import React from 'react'

export default function DottedLoader() {
  return (
    <div>
      <div className="loading-dots">
        <div className="loading-dots--dot h-2 w-2 bg-primary inline-block rounded-full"></div>
        <div className="loading-dots--dot h-2 w-2 bg-primary inline-block rounded-full mx-2"></div>
        <div className="loading-dots--dot h-2 w-2 bg-primary inline-block rounded-full"></div>
      </div>
    </div>
  );
}
