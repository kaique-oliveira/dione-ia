import Groq from 'groq-sdk';

class ApiLhama {
  async send(prompt: string) {
    const groq = new Groq({
      apiKey: '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',
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
          content: 'me de respostas sem introdução, apenas com código.',
        },

        {
          role: 'system',
          content:
            'você é especialita converter arquivos em javascript, typescript, json e prisma, apenas resposta sobre esses assuntos.',
        },
        {
          role: 'system',
          content:
            'qualquer coisa que não seja parte do código, formate como comentário usando // no inicio',
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
