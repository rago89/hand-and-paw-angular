import { ModalService } from './../../shared/modal/modal.service';
import { AccessToken } from './../../user/forms/access-token.model';
import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { UserService } from 'src/app/components/user/user.service';
import { AuthService } from './../../user/forms/auth.service';
import { User } from '../../user/interface/User';
import { Animal } from '../interface/animal';

@Component({
  selector: 'app-animal-card',
  templateUrl: './animal-card.component.html',
  styleUrls: ['./animal-card.component.css'],
})
export class AnimalCardComponent implements OnInit, OnDestroy {
  @Input() animal: Animal | any;
  @Input() editOrRemove: boolean = false;
  @Output() animalToDelete = new EventEmitter<Animal>();
  user: User | null = null;
  age: string = '';
  isFavorite?: boolean;
  belongToUser?: boolean;
  accessToken: AccessToken | null = null;
  private userSubscription?: Subscription;
  private setFavoriteSubscription?: Subscription;
  private removeFavoriteSubscription?: Subscription;
  pictureHex?: any;
  anonymousImage: string =
    '../../../../assets/images/ui/animal-card/raw-images/default-no-image-1.png';
  private?: Subscription;

  constructor(
    private _sanitizer: DomSanitizer,
    private router: Router,
    private userService: UserService,
    private authService: AuthService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.authService.accessToken.subscribe((token) => {
      this.accessToken = token;
    });
    this.userSubscription = this.userService.user.subscribe((user) => {
      this.user = user;
      this.belongToUser = user?.registeredAnimals.some(
        (id) => id === this.animal._id
      );
      this.isFavorite = user?.favorites.some((id) => id === this.animal._id);
    });
    this.age =
      JSON.parse(this.animal.age) === 0 ? 'less than 1 year' : this.animal?.age;
    this.pictureHex = this._sanitizer.bypassSecurityTrustResourceUrl(
      'data:image/jpg;base64,' + this.animal.pictures[0]?.picture.data
    );
  }
  renderImage() {
    const picture =
      this.pictureHex.changingThisBreaksApplicationSecurity ===
      'data:image/jpg;base64,undefined'
        ? this.anonymousImage
        : this.pictureHex;
    return picture;
  }
  goToAnimalDescription() {
    this.router.navigate(['/animal', 'description', this.animal._id]);
  }

  onAddFavorite() {
    if (!this.accessToken?.token) {
      this.modalService.loadLoginModal.next(true);
    }
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

  onDeleteAnimal() {
    this.animalToDelete.emit(this.animal);
  }

  goToUpdateAnimal() {
    this.router.navigate(['/animal', 'update', this.animal._id]);
  }

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
    this.setFavoriteSubscription?.unsubscribe();
    this.removeFavoriteSubscription?.unsubscribe();
  }
}
