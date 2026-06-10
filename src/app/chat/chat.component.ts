import { Component, ViewChild, ElementRef, AfterViewChecked, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../services/auth.service';
import { MatIconModule } from '@angular/material/icon';

type Message = { text: string; sender: string; time: string };

@Component({
  standalone: true,
  selector: 'app-chat',
  imports: [CommonModule, FormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements AfterViewChecked {
  @ViewChild('messagesArea') messagesArea: ElementRef | undefined;

  draft = '';
  messages: WritableSignal<Message[]> = signal([]);
  isReplying = false;

  constructor(public auth: AuthService) {}

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  private scrollToBottom() {
    if (this.messagesArea) {
      this.messagesArea.nativeElement.scrollTop = this.messagesArea.nativeElement.scrollHeight;
    }
  }

  send() {
    const prompt = this.draft.trim();
    if (!prompt) return;

    this.messages.update((current) => [
      ...current,
      {
        text: prompt,
        sender: this.auth.user() || 'You',
        time: new Date().toLocaleTimeString()
      }
    ]);

    this.draft = '';
    this.requestAgentReply(prompt);
  }

  private requestAgentReply(prompt: string) {
    this.isReplying = true;
    setTimeout(() => {
      this.messages.update((current) => [
        ...current,
        {
          text: this.generateAgentReply(prompt),
          sender: 'AI Agent',
          time: new Date().toLocaleTimeString()
        }
      ]);
      this.isReplying = false;
    }, 900);
  }

  private generateAgentReply(prompt: string) {
    const trimmed = prompt.trim();
    if (!trimmed) {
      return 'I’m here whenever you are ready to ask something.';
    }

    if (trimmed.length < 40) {
      return `Nice question! Here’s a concise response to “${trimmed}”. Feel free to ask for more details.`;
    }

    return `Thanks for your message. I’ve got a good idea of what you’re asking, and I can give you a helpful answer or a shorter summary.`;
  }
}
