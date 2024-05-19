import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env['sk-proj-O5bz8wYl6UxWRSocDPV7T3BlbkFJKAw6z3eUWlVP6obcao55'],
});

async function main()
{
  const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: 'user', content: 'Say this is a test' }],
    model: 'gpt-3.5-turbo',
  });
}
