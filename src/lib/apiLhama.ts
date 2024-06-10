import Groq from 'groq-sdk';

class ApiLhama {
  async send(prompt: string) {
    const groq = new Groq({
      apiKey: import.meta.env.VITE_API_KEY_GROQ as string,
      dangerouslyAllowBrowser: true,
    });

    const response = await this.getGroqChatCompletion(groq, prompt);

    return response.choices[0].message?.content as string;
  }
  getGroqChatCompletion(groq: Groq, prompt: string) {
    return groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'me de respostas sem introdução.',
        },
        {
          role: 'system',
          content: 'se a resposta for um objeto json, formate como json.',
        },
        {
          role: 'system',
          content:
            'você é especialita converter arquivos em javascript, typescript, json e prisma, apenas resposta sobre esses assuntos.',
        },
        {
          role: 'system',
          content:
            'qualquer coisa que não seja parte do código, formate como comentário do javascript',
        },

        {
          role: 'user',
          content: prompt as string,
        },
      ],
      model: 'llama3-8b-8192',
    });
  }
}

export default new ApiLhama();
