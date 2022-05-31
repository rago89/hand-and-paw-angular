import { UrlService } from 'src/app/url/url.service';
import { AnimalDescriptionService } from './animal-description.service';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, pairwise } from 'rxjs/operators';
import { User } from '../../user/interface/User';
import { UserService } from '../../user/user.service';
import { AnimalService } from '../animal.service';
import { Animal } from '../interface/animal';
import { ModalService } from '../../shared/modal/modal.service';

@Component({
  selector: 'app-animal-description',
  templateUrl: './animal-description.component.html',
  styleUrls: ['./animal-description.component.css'],
})
export class AnimalDescriptionComponent implements OnInit, OnDestroy {
  @Input() animal: Animal | any;
  user: User | null = null;
  pictureHex?: any;
  isFavorite?: boolean;
  belongToUser?: boolean;
  anonymousImage: string =
    '../../../../assets/images/ui/animal-card/raw-images/default-no-image-1.png';
  private userSubscription?: Subscription;
  private routeEventSubscription?: Subscription;
  private animalSubscription?: Subscription;
  private modalSubscription?: Subscription;
  private setFavoriteSubscription?: Subscription;
  private removeFavoriteSubscription?: Subscription;
  previousUrl: any;
  backToPage: string = '';
  loadContactOwner: boolean = false;

  contactFormArgs: {
    formTitle: string;
    url: string;
    aboutSubjectToContactPicture?: string;
    aboutSubjectToContactName?: string;
  } = {
    formTitle: 'Get in touch',
    url: this.urlService.contactGiver,
  };

  constructor(
    private currentRoute: ActivatedRoute,
    private router: Router,
    private animalService: AnimalService,
    private _sanitizer: DomSanitizer,
    private userService: UserService,
    private animalDescriptionService: AnimalDescriptionService,
    private urlService: UrlService,
    private modalService: ModalService
  ) {
    this.router.events
      .pipe(
        filter((e) => e instanceof NavigationEnd),
        pairwise()
      )
      .subscribe((x: NavigationEnd | any) => {
        this.previousUrl = x[0].url;
        this.animalDescriptionService.previousPageButtonText.next(
          this.previousUrl.includes('/animal/find')
            ? 'Back to find animal'
            : this.previousUrl.includes('/user/favorites-animals')
            ? 'Back to favorites'
            : this.previousUrl.includes('/user/my-animals')
            ? 'Back to my animals'
            : 'z'
        );
      });
  }

  ngOnInit(): void {
    this.currentRoute.params.subscribe((params: Params) => {
      this.animalService.getAnimal(params['id']).subscribe((animal) => {
        this.animal = animal[0];
        this.pictureHex = this._sanitizer.bypassSecurityTrustResourceUrl(
          'data:image/jpg;base64,' + this.animal?.pictures[0]?.picture.data
        );
        this.contactFormArgs.aboutSubjectToContactName = animal[0].name;
        this.contactFormArgs.aboutSubjectToContactPicture =
          this.pictureHex || this.anonymousImage;

        this.userSubscription = this.userService.user.subscribe((user) => {
          this.user = user;
          this.belongToUser = user?.registeredAnimals.some(
            (id) => id === this.animal._id
          );
          this.isFavorite = user?.favorites.some(
            (id) => id === this.animal._id
          );
        });
      });
    });
    this.animalSubscription =
      this.animalDescriptionService.previousPageButtonText.subscribe(
        (value) => {
          this.backToPage = value;
        }
      );

    this.modalSubscription = this.modalService.loadContactOwner.subscribe(
      (value) => {
        this.loadContactOwner = value;
      }
    );
  }

  renderImage() {
    const picture =
      this.pictureHex?.changingThisBreaksApplicationSecurity ===
      'data:image/jpg;base64,undefined'
        ? this.anonymousImage
        : this.pictureHex;
    return picture;
  }

  onLoadContactOwner() {
    this.modalService.loadContactOwner.next(true);
  }

  onAddFavorite() {
    this.setFavoriteSubscription = this.userService
      .setFavoriteAnimal(this.animal._id, this.user?.id)
      .subscribe({
        next: (response) => {},
        error: (response) => {},
        complete: () => {
          this.user?.favorites.push(this.animal._id);
          this.userService.user.next(this.user);
          this.isFavorite = true;
        },
      });
  }

  onRemoveFavorite() {
    this.removeFavoriteSubscription = this.userService
      .removeFavoriteAnimal(this.animal._id, this.user?.id)
      .subscribe({
        next: (response) => {},
        error: (response) => {},
        complete: () => {
          if (this.user?.favorites) {
            this.user.favorites = this.user?.favorites.filter(
              (id) => id !== this.animal._id
            );
            this.userService.user.next(this.user);
          }
          this.isFavorite = false;
        },
      });
  }
  onNavigateTo = ($event: Event) => {
    const target: HTMLButtonElement | any = event?.target;

    if (target.innerText.includes('Back to find animal')) {
      this.router.navigate(['/animal', 'find']);
    }
    if (target.innerText.includes('Back to favorites')) {
      this.router.navigate(['/user', 'favorites-animals', this.user?.id]);
    }
    if (target.innerText.includes('Back to my animals')) {
      this.router.navigate(['/user', 'my-animals', this.user?.id]);
    }
  };

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
    this.routeEventSubscription?.unsubscribe();
    this.animalSubscription?.unsubscribe();
    this.modalSubscription?.unsubscribe();
    this.setFavoriteSubscription?.unsubscribe();
    this.removeFavoriteSubscription?.unsubscribe();
  }
}
