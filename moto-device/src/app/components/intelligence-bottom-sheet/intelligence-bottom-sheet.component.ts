import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { ApiService } from '../../services/api.service';
import { Device } from '../../../shared/models/device.model';
import { FormatTextPipe } from '../../shared/pipes/format-text.pipe';
import { Message } from '../../shared/interfaces/message.interface';

@Component({
  selector: 'app-intelligence-bottom-sheet',
  standalone: true,
  imports: [CommonModule, FormsModule, FormatTextPipe],
  templateUrl: './intelligence-bottom-sheet.component.html',
  styleUrl: './intelligence-bottom-sheet.component.css',
})
export class IntelligenceBottomSheetComponent implements OnInit {
  messages: Message[] = [];
  userInput: string = '';

  constructor(
    private apiService: ApiService,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: Device
  ) {}

  ngOnInit(): void {
    this.getGreetingText(this.data.Model);
  }

  getGreetingText(model: string) {
    this.messages.push({
      text: 'Em que posso ajudar você?',
      sender: 'bot',
    });
    setTimeout(() => {
      this.messages.push({
        text: 'Tire qualquer dúvida comigo.',
        sender: 'bot',
      });
    }, 2000);
  }

  sendMessage() {
    if (!this.userInput.trim()) return;

    const userMessage = this.userInput;
    this.messages.push({ text: userMessage, sender: 'user' });
    this.userInput = '';

    this.apiService
      .askIntelligence(userMessage, this.data.Model)
      .subscribe((res) => {
        this.messages.push({ text: res.response, sender: 'bot' });
      });
  }
}
