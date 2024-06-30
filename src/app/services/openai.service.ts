import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { OpenAI } from 'openai';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

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
      apiKey: environment.APIKEY,
      organization: environment.ORGANIZATION,
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

  public sendMessageObservable(api:string, message: string): Observable<any>
  {

    const url = 'https://api.openai.com/v1/chat/completions';
    const apiKey = api;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    });

    const body = {
      model: 'gpt-4o',
      messages: [{ role: 'user', content: message }]
    };

    return this.http.post<any>(url, body, { headers }).pipe(
      catchError(error => {
        console.error('Error con la APi de OpenAI:', error);
        return throwError(error);
      })
    );
  }

}
