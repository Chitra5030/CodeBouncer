// Preset "AI assistant" responses used to demonstrate real-time interception.
// Each scenario mimics something a coding agent might suggest, mixing safe
// packages with a hallucinated name and/or a typosquat.

export const SCENARIOS = [
  {
    id: "jwt-auth",
    title: "“Add JWT auth to my Express API”",
    agent:
      "Sure! Install these dependencies first:\n\n  npm install express jsonwebtoken bcrypt express-jwt-helper\n\nThen wire up the middleware...",
  },
  {
    id: "data-science",
    title: "“Set up a Python data pipeline”",
    agent:
      "Great — let's install the core libraries:\n\n  pip install pandas numpy requestz fast-dataframe\n\nThen import them in your script.",
  },
  {
    id: "typosquat",
    title: "“Speed up my React app”",
    agent:
      "You'll want a few helpers:\n\n  npm install react reactdom loadash axios\n\nThese cover rendering and HTTP calls.",
  },
];
