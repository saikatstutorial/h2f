import { Injectable, signal } from '@angular/core';

export type UploadedFile = { name: string; size: number; uploadedAt: string };

@Injectable({ providedIn: 'root' })
export class FileService {
  files = signal<UploadedFile[]>([]);

  add(file: File) {
    const list = this.files();
    this.files.set([
      ...list,
      { name: file.name, size: file.size, uploadedAt: new Date().toISOString() }
    ]);
  }

  remove(index: number) {
    this.files.set(this.files().filter((_, i) => i !== index));
  }
}
