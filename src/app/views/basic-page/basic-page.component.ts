import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ApiResponse, Entity, TransactionalFunction } from 'src/app/interfaces/result.interface';
import { sendMessages } from 'src/app/models/send.model';
import { OpenAIService } from 'src/app/services/openai.service';
import { productivityTable } from 'src/app/models/hours.model';
import { complexityILFEIF, complexityEI, complexityEOEQ, Data } from 'src/app/models/comparison.model';

@Component({
  selector: 'basic-page',
  templateUrl: './basic-page.component.html',
  styleUrls: ['./basic-page.component.css'],
})
export class BasicPageComponent implements AfterViewInit
{
  @ViewChild('userInput')
  public userInput!: ElementRef;
  public result: ApiResponse | null = null;
  public selectedAction: 'calcular' | 'complejidad' | null = null;
  public isLoading: boolean = false;
  public isModalOpen: boolean = false;
  public FP: [number, number] = [0, 0];
  public languages = productivityTable;

  public selectedLanguage: any = null;
  public selectedLanguageId: any = null;
  public selectedProductivity: any = null;
  public estimatedHours: number = 0;


  constructor
  (
    private openAIService: OpenAIService
  )
  {

  }

  public ngAfterViewInit():void
  {
    this.adjustTextareaHeight();
    this.userInput.nativeElement.addEventListener('input', () => this.adjustTextareaHeight());
  }

  private adjustTextareaHeight(): void
  {
    const textarea = this.userInput.nativeElement;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  }

  public logTextCalcular(text: string): void
  {
    this.selectedAction = 'calcular';
    this.sendMessage(text, sendMessages.calcular);
  }

  public logTextComplejidad(text: string): void
  {
    this.selectedAction = 'complejidad';
    this.sendMessage(text, sendMessages.complejidad);
  }

  private sendMessage(text: string, messageTemplate: string): void
  {
    console.log('Texto escrito: ' + text);
    let sendMessage = messageTemplate.replace('{text}', text);
    console.log('Texto enviado: ' + text);

    this.isLoading = true;
    this.openAIService.sendMessageObservable(sendMessage).subscribe(
      response => {
        if (response && response.choices && response.choices.length > 0)
        {
          try
          {
            console.log('Respuesta de OpenAI:', response);
            const content = response.choices[0].message.content;
            const jsonResponse = this.extractJson(content);
            this.result = JSON.parse(jsonResponse);
            if (this.result)
              this.result = this.assignComplexity(this.result);

            if ( this.selectedAction == 'complejidad' && this.result)
            {
              this.FP = this.sumFunctionPoints(this.result);
            }

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

  public openModal(): void
  {
    this.isModalOpen = true;
  }

  public closeModal(): void
  {
    this.isModalOpen = false;
  }

  public sumFunctionPoints(apiResponse: ApiResponse): [number, number]
  {
    let totalPoints:[number, number] = [0, 0];

    for (const key in apiResponse.Resultado)
    {
      if (apiResponse.Resultado.hasOwnProperty(key))
        {
        const entity: Entity = apiResponse.Resultado[key];

        if (entity.PuntosFuncion)
          totalPoints[0] += entity.PuntosFuncion;


        entity.FuncionesTransaccionales.forEach((func: TransactionalFunction) => {
          if (func.PuntosFuncion)
            totalPoints[1] += func.PuntosFuncion;
        });
      }
    }

    return totalPoints;
  }

  public showLanguage(event: Event)
  {
    const selectedId = +(event.target as HTMLSelectElement).value;
    this.selectedLanguage = this.languages.find(lang => lang.id === selectedId);
    if (this.selectedLanguage)
    {
      console.log(`Número de la lenguaje ${this.selectedLanguage.language}: ${this.selectedLanguage.id}`);
      this.selectedLanguageId = selectedId;
    }
    this.calculateEstimatedHours();
  }

  public showProductivity(event: any)
  {
    this.selectedProductivity = event.target.value;
    console.log(`Productividad ${this.selectedProductivity}`);
    this.calculateEstimatedHours();
  }

  public calculateEstimatedHours()
  {
    if (this.selectedLanguage && this.selectedProductivity)
    {
      const totalFP = this.FP[0] + this.FP[1];
      this.estimatedHours = totalFP * this.selectedLanguage[this.selectedProductivity];
    }

  }

  public getComplexity(det: number, ret: number, mappings: Data[]): string
  {
    for (const mapping of mappings)
    {
      if (det >= mapping.minDET && det <= mapping.maxDET && ret >= mapping.minRET && ret <= mapping.maxRET)
      {
        return mapping.result;
      }
    }
    return 'unknown';
  }

  public assignComplexity(apiResponse: ApiResponse): ApiResponse
  {
    const result = apiResponse.Resultado;

    for (const key in result) {
      if (result.hasOwnProperty(key))
      {
        const entity = result[key];

        if (entity.Tipo === 'ILF' || entity.Tipo === 'EIF')
        {
          if (entity.ComplejidadDET !== undefined && entity.ComplejidadRET !== undefined)
          {
            entity.Complejidad = this.getComplexity(entity.ComplejidadDET, entity.ComplejidadRET, complexityILFEIF);
          }
        }

        entity.FuncionesTransaccionales.forEach(func => {
          if (func.Tipo === 'EI')
          {
            if (func.ComplejidadDET !== undefined && func.ComplejidadFTR !== undefined)
              func.Complejidad = this.getComplexity(func.ComplejidadDET, func.ComplejidadFTR, complexityEI);
          }
          else if (func.Tipo === 'EO' || func.Tipo === 'EQ')
          {
            if (func.ComplejidadDET !== undefined && func.ComplejidadFTR !== undefined)
              func.Complejidad = this.getComplexity(func.ComplejidadDET, func.ComplejidadFTR, complexityEOEQ);
          }
        });
      }
    }

    return apiResponse;
  }

  public saveResult(): void
  {
    // Lógica para guardar el resultado, por ejemplo, descargando un archivo JSON
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.result, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "result.json");
    document.body.appendChild(downloadAnchorNode); // Requiere para Firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  }

}
