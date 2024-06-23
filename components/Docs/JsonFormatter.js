// components/JsonFormatter.js
import React from "react";

const JsonFormatter = ({ children }) => {
  let formattedJson;

  try {
    formattedJson = JSON.stringify(JSON.parse(children), null, 2);
  } catch (e) {
    formattedJson = "Invalid JSON";
  }

  return (
    <pre className="overflow-auto rounded bg-gray-900 p-4 font-mono text-sm text-white">
      <code>{formattedJson}</code>
    </pre>
  );
};

export default JsonFormatter;
