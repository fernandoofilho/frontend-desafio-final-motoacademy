import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { jsPDF } from 'jspdf';
import { Device } from '../../../shared/models/device.model';
import getSrc from '../../shared/functions/get_src';
import {
  extractColorsFromImage,
  getTopColors,
} from '../../shared/functions/colors';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { FormatTextPipe } from '../../shared/pipes/format-text.pipe';
import { Router } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-device-dialog',
  imports: [
    CommonModule,
    MatProgressBarModule,
    FormsModule,
    FormatTextPipe,
    MatTooltipModule,
    MatIconModule
  ],
  templateUrl: './device-dialog.component.html',
  styleUrl: './device-dialog.component.css',
})
export class DeviceDialogComponent implements OnInit {
  @ViewChild('phoneImage', { static: false }) imageElement!: ElementRef;
  @ViewChild('backgroundGradient', { static: false })
  dialogContainer!: ElementRef;
  pallette: string[] = [];
  dataSource: Device | undefined;
  loadingReport: boolean = false;
  mainTextColor: string = 'black';
  userQuestion: string = '';
  modelResponse: string = '';
  isLoading: boolean = false;
  id: string = '';
  reportResume: string = '';
  // intelligence
  placeholderText = '';
  private questions: string[] = [
    'Qual é a capacidade de memória RAM deste modelo?',
    'Qual o processador utilizado neste dispositivo?',
    'Quantos megapixels tem a câmera traseira?',
    'Este modelo suporta carregamento rápido?',
    'Qual o tamanho e resolução da tela?',
    'O celular tem certificação contra água e poeira?',
    'Este modelo possui suporte para cartão de memória?',
    'Ele suporta redes 5G?',
    'Este modelo já vem com Android atualizado?',
    'Ele é bom para jogos pesados?',
    'O celular esquenta ao rodar jogos?',
    'Possui estabilização óptica de imagem (OIS)?',
    'A bateria dura um dia inteiro com uso intenso?',
    'Ele tem suporte para Wi-Fi 6?',
    'Possui entrada para fone de ouvido (P2)?',
    'Quantos chips ele suporta?',
    'Tem leitor de digital na tela ou na lateral?',
  ];
  private typingSpeed = 50;
  private erasingSpeed = 30;
  private displayTime = 2000;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: Device,
    private renderer: Renderer2,
    private apiService: ApiService,
    private router: Router,
    private dialogRef: MatDialogRef<DeviceDialogComponent>
  ) {
    this.dataSource = { ...data };
  }

  private async cycleQuestions() {
    while (true) {
      const question = this.getRandomQuestion();
      await this.animateTextPlaceHolder(question);
      await this.delay(this.displayTime);
      await this.eraseText();
    }
  }
  private getRandomQuestion(): string {
    return this.questions[Math.floor(Math.random() * this.questions.length)];
  }
  private async animateTextPlaceHolder(newText: string) {
    for (let i = 0; i <= newText.length; i++) {
      this.placeholderText = newText.substring(0, i);
      await this.delay(this.typingSpeed);
    }
  }

  private async eraseText() {
    while (this.placeholderText.length > 0) {
      this.placeholderText = this.placeholderText.slice(0, -1);
      await this.delay(this.erasingSpeed);
    }
  }

  private delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  updateGradient() {
    if (!this.pallette || this.pallette.length === 0) return;

    const gradientColors = this.pallette.join(', ');
    const gradientStyle = `linear-gradient(45deg, ${gradientColors})`;

    const dialogContainer = document.querySelector(
      '.dialog-container'
    ) as HTMLElement;
    if (dialogContainer) {
      dialogContainer.style.backgroundImage = gradientStyle;
    }
  }
  createYouTubeQuery() {
    if (this.dataSource && this.dataSource.Model) {
      const modelQuery = this.dataSource.Model.split(' ').join('+');
      const query = `review+motorola+${modelQuery}`;
      
      return `https://www.youtube.com/results?search_query=${query}`;
    }
    return null;
  }

  getImageLink(path: string) {
    return getSrc(path);
  }

  generatePDF() {
    this.loadingReport = true;

    if (!this.dataSource) {
      this.loadingReport = false;
      return;
    }

    const pdf = new jsPDF('p', 'mm', 'a4');
    const imagePath = getSrc(this.dataSource.src);
    const imgWidth = 180;
    const imgHeight = 160;
    let y = 10;

    // Adiciona a imagem se necessário
    pdf.addImage(imagePath, 'PNG', 10, y, imgWidth, imgHeight);
    y += imgHeight + 10;

    pdf.setFontSize(18);
    pdf.text(this.dataSource.Model, 10, y);
    y += 10;

    pdf.setFontSize(12);

    this.apiService
      .askIntelligence(
        "faça um resumo deste telefone, mas não mande mensagens como 'Claro! aqui está...' etc. Mande só o resumo, evite usar ** ou * para negrito ou italico dessa vez, faça apenas texto",
        this.dataSource?.Model
      )
      .subscribe((response) => {
        const text = response.response;
        this.reportResume = text;
        if (this.reportResume) {
          pdf.setFont('helvetica', 'bold');
          pdf.setFontSize(18);
          pdf.text('Descrição', 10, y);
          pdf.setFont('helvetica', 'normal');
          pdf.setFontSize(12);
          y += 10;
          const textLines = pdf.splitTextToSize(this.reportResume, 180);
          pdf.text(textLines, 20, y);

          y += textLines.length * 6;

          this.reportResume = '';
        }
        const specifications = this.dataSource
          ? this.dataSource.specs
          : undefined;
        if (specifications) {
          pdf.setFont('helvetica', 'bold');
          pdf.setFontSize(18);
          pdf.text('Especificações:', 10, y);
          y += 10;

          pdf.setFont('helvetica', 'normal');
          pdf.setFontSize(12);
          y += 10;

          Object.entries(specifications).forEach(([key, value]) => {
            if (key.length > 0 && value) {
              if (y > 270) {
                pdf.addPage();
                y = 10;
              }
              pdf.text(`${key}: ${value}`, 10, y);
              y += 10;
            }
          });
        }

        setTimeout(() => {
          pdf.save(`${this.dataSource?.Model}.pdf`);
          this.loadingReport = false;
        }, 1000);
      });
  }

  async ngOnInit(): Promise<void> {
    const img = this.getImageLink(this.dataSource?.src || '');
    this.id = this.dataSource?._id || '';
    this.cycleQuestions();
    const colors = await extractColorsFromImage(img);
    this.pallette = getTopColors(colors, 25);
    // this.pallette = ["rgb(121 199 227)", "rgb(178 157 217)", "rgb(178 157 217)", "rgb(121 199 227)", ]
    this.mainTextColor = this.pallette[-1];
    this.updateGradient();
  }

  askQuestion() {
    if (this.userQuestion.trim() && this.dataSource) {
      this.isLoading = true;
      this.apiService
        .askIntelligence(this.userQuestion.trim(), this.dataSource?.Model)
        .subscribe((response) => {
          const text = response.response;
          this.animateTextChange(text);
        });
    }
  }

  animateTextChange(newText: string) {
    let currentText = this.modelResponse;
    let i = currentText.length;

    const eraseInterval = setInterval(() => {
      if (i > 0) {
        this.modelResponse = currentText.substring(0, i - 1);
        i--;
      } else {
        clearInterval(eraseInterval);

        let j = 0;
        const typeInterval = setInterval(() => {
          if (j < newText.length) {
            this.modelResponse += newText[j];
            j++;
          } else {
            clearInterval(typeInterval);
            this.isLoading = false;
          }
        }, 10);
      }
    }, 10);
  }

  navigateToDevicePage() {
    this.dialogRef.close();
    this.router.navigateByUrl(`/device/${this.id}`);
  }
}
