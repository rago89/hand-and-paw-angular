import { AbstractControl } from '@angular/forms';

export class CustomFormValidation {
  validPhone() {
    const phoneRegExp =
      /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{4}[-\s.]?[0-9]{4,6}$/im;
    return (
      control: AbstractControl | any
    ): { [key: string]: boolean } | null => {
      if (!control.parent) {
        return null;
      }

      if (!control.value) {
        return null;
      }

      if (
        control.value?.match(phoneRegExp) &&
        (control.value.length === 12 || control.value.length === 13)
      ) {
        return null;
      }
      return {
        invalidPhoneNumber: true,
      };
    };
  }

  validUrl() {
    const urlRegExp =
      /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;

    return (
      control: AbstractControl | any
    ): { [key: string]: boolean } | null => {
      if (!control.parent) {
        return null;
      }

      if (!control.value) {
        return null;
      }

      if (urlRegExp.test(control.value.trim())) {
        return null;
      }
      return {
        invalidUrl: true,
      };
    };
  }

  matchInputs(otherControlName: string) {
    return (
      control: AbstractControl | any
    ): { [key: string]: boolean } | null => {
      if (!control.parent) {
        return null; // Control is not yet associated with a parent.
      }
      const thisValue = control.value;
      const otherValue = control.parent.get(otherControlName).value;
      if (thisValue === otherValue) {
        return null;
      }

      return {
        inputsNotMatch: true,
      };
    };
  }

  passwordInputContentValidation() {
    const regExpSymbol = /.*\W.*/;
    const regExpLetters = /[a-z]/i;
    return (
      control: AbstractControl | any
    ): { [key: string]: boolean } | null => {
      if (!control.parent) {
        return null; // Control is not yet associated with a parent.
      }
      if (
        control.value?.length > 7 &&
        control.value?.length < 15 &&
        control.value?.match(regExpSymbol) &&
        control.value?.match(regExpLetters)
      ) {
        return null;
      }
      return {
        invalidInput: true,
      };
    };
  }
}
