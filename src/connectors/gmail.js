const { google } = require('googleapis');

const oauth2Client = new google.auth.OAuth2(
  process.env.GMAIL_CLIENT_ID,
  process.env.GMAIL_CLIENT_SECRET,
  process.env.GMAIL_REDIRECT_URI
);

oauth2Client.setCredentials({
  refresh_token: process.env.GMAIL_REFRESH_TOKEN
});

const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

async function fetchThreads() {
  const res = await gmail.users.threads.list({
    userId: 'me',
    maxResults: 20
  });

  return res.data.threads || [];
}

async function fetchThreadMessages(threadId) {
  const res = await gmail.users.threads.get({
    userId: 'me',
    id: threadId
  });

  return res.data.messages;
}


module.exports = { fetchThreads, fetchThreadMessages };
