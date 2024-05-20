import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';
import { OpenAIService } from 'src/app/services/openai.service';


@Component({
  selector: 'basic-page',
  templateUrl: './basic-page.component.html',
  styleUrls: ['./basic-page.component.css'],
})
export class BasicPageComponent
{
  @ViewChild('userInput')
  userInput!: ElementRef;

  constructor
  (
    private openAIService: OpenAIService
  )
  {

  }

  public logTextCalcular(text: string): void
  {
    console.log(text);

    let sendMessage: string =
    `
    Necesito que crees un listado sobre Funciones de datos (ILF, EIF) y Transaccionales (EO, EI, EQ) de la técnica FPA de IFPUG que encuentres en este enunciado: "${text}".
    Devuelve tu respuesta en formato JSON siguiendo este ejemplo:
    {
      "Resultado": {
        "Personas": {
          "Nombre": "Personas",
          "Tipo": "ILF",
          "FuncionesTransaccionales": [
            {
              "Nombre": "Envio",
              "Tipo": "EI"
            },
            {
              "Nombre": "Envio sumado",
              "Tipo": "EO"
            }
          ]
        },
        "Productos": {
          "Nombre": "Productos",
          "Tipo": "ILF",
          "FuncionesTransaccionales": [
            {
              "Nombre": "Recepción",
              "Tipo": "EI"
            },
            {
              "Nombre": "Actualización",
              "Tipo": "EO"
            }
          ]
        },
        "Pedidos": {
          "Nombre": "Pedidos",
          "Tipo": "EIF",
          "FuncionesTransaccionales": [
            {
              "Nombre": "Consulta",
              "Tipo": "EQ"
            },
            {
              "Nombre": "Modificación",
              "Tipo": "EQ"
            }
          ]
        }
      }
    }
    `;

    this.openAIService.sendMessageFetch(sendMessage)
      .then(response => {
        if (response)
        {
          console.log('Respuesta de OpenAI:', response);
          this.userInput.nativeElement.value = response;
        }
        else
        {
          console.warn('Recivido null desde OpenAI');
        }
      })
      .catch(error => {
        console.error('Error recibido por OpenAI:', error);
      });
  }

  public logTextComplejidad(text: string): void
  {
    console.log(text);

    let sendMessage: string =
    `
    Te paso las tablas de PF según la cantidad de DET, RET o FTR encuentre en cada una de las funciones. Primero deberás calcular si es Low, Average, o High (con su matriz de complejidad) y luego asignarle los puntos función que les corresponden (con su traducción de complejidad puntos funcción).
    Complejidad para ILF y EIF:
    Si se encuentra entre 1-19 DETs y 1 RET = Low
    Si se encuentra entre 1-19 DETs y 2-5 RETs = Low
    Si se encuentra entre 1-19 DETs y >5 RETs = Average
    Si se encuentra entre 20-50 DETs y 1 RET = Low
    Si se encuentra entre 20-50 DETs y 2-5 RETs = Average
    Si se encuentra entre 20-50 DETs y >5 RETs = High
    Si se encuentra entre >50 DETs y 1 RET = Average
    Si se encuentra entre >50 DETs y 2-5 RETs = High
    Si se encuentra entre >50 DETs y >5 RETs = High

    Traducción de complejidad Puntos Función del ILF:
    Low = 7FP
    Average = 10FP
    High = 15FP
    Traducción de complejidad Puntos Función del EIF:
    Low = 5FP
    Average = 7FP
    High = 10FP

    Complejidad para EI:
    Si se encuentra entre 1-4 DETs y 0-1 FTRs = Low
    Si se encuentra entre 1-4 DETs y 2 FTRs = Low
    Si se encuentra entre 1-4 DETs y >2 FTRs = Average
    Si se encuentra entre 5-15 DETs y 0-1 FTRs = Low
    Si se encuentra entre 5-15 DETs y 2 FTRs = Average
    Si se encuentra entre 5-15 DETs y >2 FTRs = High
    Si se encuentra entre >15 DETs y 0-1 FTRs = Average
    Si se encuentra entre >15 DETs y 2 FTRs = High
    Si se encuentra entre >15 DETs y >2 FTRs = High

    Complejidad para  EO y EQ:
    Si se encuentra entre 1-5 DETs y 0-1 FTRs = Low
    Si se encuentra entre 1-5 DETs y 2-3 FTRs = Low
    Si se encuentra entre 1-5 DETs y >3 FTRs = Average
    Si se encuentra entre 6-19 DETs y 0-1 FTRs = Low
    Si se encuentra entre 6-19 DETs y 2-3 FTRs = Average
    Si se encuentra entre 6-19 DETs y >3 FTRs = High
    Si se encuentra entre >19 DETs y 0-1 FTRs = Average
    Si se encuentra entre >19 DETs y 2-3 FTRs = High
    Si se encuentra entre >19 DETs y >3 FTRs = High

    Traducción de complejidad Puntos Función de EI y EQ:
    Low = 3
    Average = 4
    High = 6
    Traducción de complejidad Puntos Función del EO:
    Low = 4
    Average = 5
    High = 7

    -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.

    Ahora teniendo la información anterior, debes analizar el siguiente enunciado: "${text}". Necesito que crees un listado sobre Funciones de datos (ILF, EIF) y Transaccionales (EO, EI, EQ) de la técnica FPA de IFPUG. También escribe su complejidad mediante sus DET y RET (funciones de datos), o DET y FTR (funciones transaccionales ).
    No pongas ningún dato a Null, por ejemplo, el mínimo de FTR si no detectas nada que sume complejidad es 1. Calcula "PuntosFuncion" según los apartados correspondientes de “Complejidad DET”, “Complejidad RET”, “Complejidad FTR”.
    Ten en cuenta de que las funciones Transaccionales (EO, EI, EQ) solo pueden estar dentro de EIF o ILF, en su apartado “FuncionesTransaccionales”.
    Devuelve tu respuesta en formato JSON siguiendo este ejemplo:
    {
      "Resultado": {
        "Personas": {
          "Nombre": "Personas",
          "Tipo": "ILF",
          "Complejidad DET": 6,
          "Complejidad RET": 2,
          "PuntosFuncion": 7,
          "FuncionesTransaccionales": [
            {
              "Nombre": "Envio",
              "Tipo": "EI",
              "Complejidad DET": 3,
              "Complejidad FTR": 1,
              "PuntosFuncion": 3
            },
            {
              "Nombre": "Envio sumado",
              "Tipo": "EO",
              "Complejidad DET": 3,
              "Complejidad FTR": 1,
              "PuntosFuncion": 4
            }
          ]
        },
        "Productos": {
          "Nombre": "Productos",
          "Tipo": "ILF",
          "Complejidad DET": 6,
          "Complejidad RET": 2,
          "PuntosFuncion": 7,
          "FuncionesTransaccionales": [
            {
              "Nombre": "Recepción",
              "Tipo": "EI",
              "Complejidad DET": 3,
              "Complejidad FTR": 1,
              "PuntosFuncion": 3
            },
            {
              "Nombre": "Actualización",
              "Tipo": "EO",
              "Complejidad DET": 3,
              "Complejidad FTR": 1,
              "PuntosFuncion": 4
            }
          ]
        },
        "Pedidos": {
          "Nombre": "Pedidos",
          "Tipo": "EIF",
          "Complejidad DET": 6,
          "Complejidad RET": 2,
          "PuntosFuncion": 5,
          "FuncionesTransaccionales": [
            {
              "Nombre": "Consulta",
              "Tipo": "EQ",
              "Complejidad DET": 3,
              "Complejidad FTR": 1
              "PuntosFuncion": 3
            },
            {
              "Nombre": "Modificación",
              "Tipo": "EQ",
              "Complejidad DET": 3,
              "Complejidad FTR": 1,
              "PuntosFuncion": 3
            }
          ]
        }
      }
    }
    `;

    this.openAIService.sendMessageFetch(sendMessage)
      .then(response => {
        if (response)
        {
          console.log('Respuesta de OpenAI:', response);
          this.userInput.nativeElement.value = response;
        }
        else
        {
          console.warn('Recivido null desde OpenAI');
        }
      })
      .catch(error => {
        console.error('Error recibido por OpenAI:', error);
      });

  }

}
