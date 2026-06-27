# Single-image build: install everything, build the React client, run the Express server
# (which serves both the API and the built client).
FROM node:20-alpine

WORKDIR /app
COPY . .

# EmailJS keys are inlined into the client at build time, so pass them as build args:
#   docker build --build-arg VITE_EMAILJS_PUBLIC_KEY=... -t codebouncer .
ARG VITE_EMAILJS_PUBLIC_KEY
ARG VITE_EMAILJS_SERVICE_ID
ARG VITE_EMAILJS_WAITLIST_TEMPLATE_ID
ARG VITE_EMAILJS_CONTACT_TEMPLATE_ID
ENV VITE_EMAILJS_PUBLIC_KEY=$VITE_EMAILJS_PUBLIC_KEY \
    VITE_EMAILJS_SERVICE_ID=$VITE_EMAILJS_SERVICE_ID \
    VITE_EMAILJS_WAITLIST_TEMPLATE_ID=$VITE_EMAILJS_WAITLIST_TEMPLATE_ID \
    VITE_EMAILJS_CONTACT_TEMPLATE_ID=$VITE_EMAILJS_CONTACT_TEMPLATE_ID

RUN npm run deploy:build

ENV PORT=5001
EXPOSE 5001
CMD ["npm", "start"]
