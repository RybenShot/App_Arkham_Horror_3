import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '../i18n/translate.pipe';

const CONTACT_EMAIL = 'sebastianjimenezroman@hotmail.com';
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xjvjozqd';

type SubmitState = 'idle' | 'sending' | 'sent' | 'error';

@Component({
  selector: 'app-footer',
  imports: [FormsModule, TranslatePipe],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  senderName = '';
  senderEmail = '';
  message = '';
  state: SubmitState = 'idle';

  readonly contactEmail = CONTACT_EMAIL;

  /** Envía el formulario a Formspree por fetch, sin salir de la página. */
  async onSubmit(): Promise<void> {
    if (!this.message.trim() || this.state === 'sending') return;
    this.state = 'sending';

    const data = new FormData();
    data.append('name', this.senderName.trim() || 'Visitante');
    data.append('email', this.senderEmail.trim());
    data.append('message', this.message.trim());

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });
      if (!response.ok) throw new Error(`Formspree respondió ${response.status}`);
      this.state = 'sent';
      this.senderName = '';
      this.senderEmail = '';
      this.message = '';
    } catch {
      this.state = 'error';
    }
  }
}
