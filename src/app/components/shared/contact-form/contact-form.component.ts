import { UrlService } from 'src/app/url/url.service';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css'],
})
export class ContactFormComponent implements OnInit {
  @ViewChild('form', { static: false }) myForm: NgForm | any;
  errorMessage: string = '';
  sendingMessage: string = '';

  @Input() formProps: {
    formTitle: string;
    url: string;
    aboutSubjectToContactPicture?: string;
    aboutSubjectToContactName?: string;
  } = {
    formTitle: 'no name',
    url: 'no url',
  };

  constructor(private http: HttpClient, private urlService: UrlService) {}

  ngOnInit(): void {}
  onSubmit() {
    this.sendingMessage = 'Sending message';
    this.http.post(this.formProps?.url, this.myForm?.value).subscribe({
      next: (response) => {
        this.sendingMessage = 'Message sent';
      },
      error: (error) => {
        if (error) {
          this.sendingMessage = '';
          this.errorMessage = 'An error has occurred try again later';
        }
      },
      complete: () => {
        setTimeout(() => {
          this.sendingMessage = '';
        }, 1000);
        this.myForm.reset();
      },
    });
  }
}
