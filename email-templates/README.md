# Email setup (EmailJS)

The waitlist and contact forms work out of the box (they save to `server/data/`).
To also send real emails — a branded welcome email to new waitlist subscribers and
contact messages to your inbox — connect EmailJS. It's free for low volume and runs
entirely from the browser, so no SMTP secrets touch the repo.

## 1. Create an EmailJS account
Sign up at https://www.emailjs.com and add an **Email Service** (Gmail, Outlook, etc.).
Note the **Service ID**.

## 2. Create two templates
In **Email Templates**, create two templates using the markup in this folder:

| Template | File | Key settings |
| --- | --- | --- |
| Waitlist welcome | `waitlist-welcome.html` | To Email `{{to_email}}`, Subject `You're on the CodeBouncer waitlist 🎟️` |
| Contact message | `contact-message.html` | To Email = your inbox, Reply To `{{reply_to}}`, Subject `New CodeBouncer message from {{name}}` |

Paste each file's markup into the template's **Edit Content > Code** editor. Note each **Template ID**.

## 3. Grab your Public Key
**Account > General > Public Key**.

## 4. Wire it into the client
Copy `client/.env.example` to `client/.env` and fill in:

```
VITE_EMAILJS_PUBLIC_KEY=...
VITE_EMAILJS_SERVICE_ID=...
VITE_EMAILJS_WAITLIST_TEMPLATE_ID=...
VITE_EMAILJS_CONTACT_TEMPLATE_ID=...
```

Restart `npm run dev` (Vite only reads env vars at startup). Done — submitting the
waitlist form now emails the subscriber, and the contact form emails your inbox.

## Template variables
- Waitlist: `{{email}}`, `{{to_email}}`, `{{position}}`
- Contact: `{{name}}`, `{{email}}`, `{{reply_to}}`, `{{message}}`

> If `.env` is missing or blank, the forms still save signups/messages to the backend —
> they just skip the email step, so nothing breaks during local dev.
