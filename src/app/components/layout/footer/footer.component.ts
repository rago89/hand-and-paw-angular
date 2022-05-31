import { UrlService } from 'src/app/url/url.service';
import { ModalService } from './../../shared/modal/modal.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit, OnDestroy {
  loadContactUs: boolean = false;
  contactFormArgs: {
    formTitle: string;
    url: string;
    aboutSubjectToContactPicture?: string;
    aboutSubjectToContactName?: string;
  } = {
    formTitle: 'Contact us',
    url: this.urlService.contactUs,
  };
  private modalSubscription?: Subscription;

  constructor(
    private modalService: ModalService,
    private urlService: UrlService
  ) {}

  ngOnInit(): void {
    this.modalSubscription = this.modalService.loadContactUsModal.subscribe(
      (value) => {
        this.loadContactUs = value;
      }
    );
  }

  renderContactUs() {
    this.modalService.loadContactUsModal.next(true);
  }

  ngOnDestroy(): void {
    this.modalSubscription?.unsubscribe();
  }
}
