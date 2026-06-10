import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { FileService } from '../services/file.service';

@Component({
  standalone: true,
  selector: 'app-admin',
  imports: [CommonModule, MatCardModule, MatButtonModule, MatListModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  constructor(public filesSrv: FileService) {}

  onFiles(e: Event) {
    const input = e.target as HTMLInputElement;
    if (!input.files) return;
    Array.from(input.files).forEach((f) => this.filesSrv.add(f));
    input.value = '';
  }

  remove(i: number) {
    this.filesSrv.remove(i);
  }
}
