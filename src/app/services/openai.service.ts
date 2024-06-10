import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { OpenAI } from 'openai';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OpenAIService
{
  private openai: OpenAI;

  constructor
  (
    private http: HttpClient
  )
  {
    this.openai = new OpenAI({
      apiKey: 'sk-proj-O5bz8wYl6UxWRSocDPV7T3BlbkFJKAw6z3eUWlVP6obcao55',
      organization: 'org-zktg4MwzjJLmUxYn54HRNzf7',
      dangerouslyAllowBrowser: true
    });
  }

  public async sendMessage(message: string): Promise<any>
  {
    try
    {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: message }]
      });

      if (response && response.choices && response.choices.length > 0)
      {
        return response.choices[0].message.content;
      }
      else
      {
        console.warn('La estructura no cumple el formato:', response);
        return null;
      }
    }
    catch (error)
    {
      console.error('Error con la API de OpenAI:', error);
      throw error;
    }
  }


  public async sendMessageFetch(message: string): Promise<any>
  {
    const url = 'https://api.openai.com/v1/chat/completions';
    const apiKey = 'sk-proj-O5bz8wYl6UxWRSocDPV7T3BlbkFJKAw6z3eUWlVP6obcao55';

    const headers =
    {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    };

    const body = JSON.stringify({
      //model: 'gpt-3.5-turbo',
      model: 'gpt-4o',
      messages: [{ role: 'user', content: message }]
    });

    try
    {
      const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: body
      });

      const data = await response.json();

      if (data && data.choices && data.choices.length > 0)
      {
        return data.choices[0].message.content;
      }
      else
      {
        console.warn('La estructura no cumple el formato: (fetch) ', data);
        return null;
      }
    }
    catch (error)
    {
      console.error('Error con la API de OpenAI: (fetch) ', error);
      throw error;
    }
  }

  public sendMessageObservable(message: string): Observable<any>
  {

    const url = 'https://api.openai.com/v1/chat/completions';
    const apiKey = 'sk-proj-O5bz8wYl6UxWRSocDPV7T3BlbkFJKAw6z3eUWlVP6obcao55';

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    });

    const body = {
      model: 'gpt-4o',
      messages: [{ role: 'user', content: message }]
    };

    return this.http.post<any>(url, body, { headers });
  }

}
