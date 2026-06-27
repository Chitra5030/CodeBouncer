// A curated list of high-popularity packages used as typosquat reference targets.
// In production this would be sourced from registry download rankings and refreshed
// regularly; this static set is enough to demonstrate the detection logic.

export const POPULAR = {
  npm: [
    "react", "react-dom", "lodash", "axios", "express", "chalk", "commander",
    "dayjs", "moment", "dotenv", "next", "vue", "webpack", "vite", "eslint",
    "typescript", "jest", "mocha", "uuid", "request", "node-fetch", "cors",
    "body-parser", "socket.io", "redux", "rxjs", "tailwindcss", "prettier",
    "babel-core", "@babel/core", "zod", "prisma", "mongoose", "pg", "mysql2",
    "jsonwebtoken", "bcrypt", "passport", "nodemailer", "winston", "ws",
  ],
  pypi: [
    "requests", "numpy", "pandas", "flask", "django", "fastapi", "pytest",
    "scipy", "matplotlib", "scikit-learn", "tensorflow", "torch", "pillow",
    "beautifulsoup4", "sqlalchemy", "pydantic", "celery", "boto3", "click",
    "urllib3", "certifi", "setuptools", "wheel", "pyyaml", "jinja2", "aiohttp",
    "openai", "anthropic", "transformers", "langchain", "redis", "psycopg2",
    "cryptography", "python-dateutil", "tqdm", "rich", "typer", "uvicorn",
  ],
};
