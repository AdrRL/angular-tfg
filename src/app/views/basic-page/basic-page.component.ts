import { Component, ElementRef, ViewChild } from '@angular/core';
import { ApiResponse } from 'src/app/interfaces/result.interface';
import { sendMessages } from 'src/app/models/send.model';
import { OpenAIService } from 'src/app/services/openai.service';

@Component({
  selector: 'basic-page',
  templateUrl: './basic-page.component.html',
  styleUrls: ['./basic-page.component.css'],
})
export class BasicPageComponent
{
  @ViewChild('userInput')
  public userInput!: ElementRef;
  public result: ApiResponse | null = null;
  public selectedAction: 'calcular' | 'complejidad' | null = null;
  public isLoading: boolean = false;

  constructor
  (
    private openAIService: OpenAIService
  )
  {

  }

  public logTextCalcular(text: string): void
  {
    console.log('Texto escrito: ' + text);
    let sendMessage = sendMessages.calcular.replace('{text}', text);
    console.log('Texto enviado: ' + text);

    this.isLoading = true;
    this.openAIService.sendMessageObservable(sendMessage)
      .subscribe(
        response => {
          if (response && response.choices && response.choices.length > 0)
          {
            try
            {
              console.log('Respuesta de OpenAI:', response);
              const content = response.choices[0].message.content;
              const jsonResponse = this.extractJson(content);
              this.result = JSON.parse(jsonResponse);
              this.selectedAction = 'calcular';
            }
            catch (error)
            {
              console.error('Error con el JSON recibido:', error);
            }
          }
          else
          {
            console.warn('La estructura no cumple el formato esperado');
          }
          this.isLoading = false;
      },
      error => {
        console.error('Error con la API de OpenAI:', error);
        this.isLoading = false;
      }
    );

  }

  public logTextComplejidad(text: string): void
  {
    console.log('Texto escrito: ' + text);
    let sendMessage = sendMessages.complejidad.replace('{text}', text);
    console.log('Texto enviado: ' + text);

    this.isLoading = true;
    this.openAIService.sendMessageObservable(sendMessage)
      .subscribe(
        response => {
          if (response && response.choices && response.choices.length > 0)
          {
            try
            {
              console.log('Respuesta de OpenAI:', response);
              const content = response.choices[0].message.content;
              const jsonResponse = this.extractJson(content);
              this.result = JSON.parse(jsonResponse);
              this.selectedAction = 'complejidad';
            }
            catch (error)
            {
              console.error('Error con el JSON recibido:', error);
            }
          }
          else
          {
            console.warn('La estructura no cumple el formato esperado');
          }
          this.isLoading = false;
      },
      error => {
        console.error('Error con la API de OpenAI:', error);
        this.isLoading = false;
      }
    );

  }

  public extractJson(response: string): string
  {
    let jsonStartIndex = response.indexOf('{');
    let jsonEndIndex = response.lastIndexOf('}');

    if (jsonStartIndex !== -1 && jsonEndIndex !== -1)
    {
      return response.substring(jsonStartIndex, jsonEndIndex + 1);
    }

    throw new Error('JSON no válido');
  }

  public getFormattedJson(): string
  {
    return JSON.stringify(this.result, null, 2);
  }

  public getFunctions(entity: any): string
  {
    return entity.FuncionesTransaccionales.map((func: any) => `${func.Nombre} (${func.Tipo})`).join(', ');
  }

  public getObjectKeys(obj: any): string[]
  {
    return Object.keys(obj);
  }

}
