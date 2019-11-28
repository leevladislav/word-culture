import {Component, Input} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-validator-message',
  templateUrl: './validator-message.component.html',
  styleUrls: ['./validator-message.component.scss']
})
export class ValidatorMessageComponent {
  @Input() field: FormControl;

  constructor() {

  }

  public validatorMessages(): any {
    const field = this.field;

    if (!field || !field.errors) {
      return false;
    }

    const errors = [];
    const config = {
      required: 'Field is required',
      requiredTrue: 'Value should be positive',
      email: 'Field should contain e-mail',
      pattern: 'Invalid',
    };

    Object.keys(field.errors).forEach((error: string) => {
      if (error === 'pattern') {
        const curPattern = field.errors.pattern.requiredPattern;

        for (const key in field.parent.controls) {
          if (field.parent.controls.hasOwnProperty(key)) {
            const obj = field.parent.controls[key];

            if (obj.errors && obj.errors.pattern && obj.errors.pattern.requiredPattern === curPattern) {

              if (key === 'UserPassword1' || key === 'password') {
                errors.push(this.invalidPasswordMessage(obj.errors.pattern.actualValue));
                break;
              }
              errors.push(`${config[error]} ${this.handlePatternNames(key)}`);
              break;
            }
          }
        }
      } else {
        errors.push(config[error]);
      }
    });

    return errors;
  }


  private handlePatternNames(key) {
    let str = '';

    if (key === 'phone') {
      str = 'phone number';
    } else {
      str = key;
    }

    return str;
  }

  private invalidPasswordMessage(text) {
    if (!/(?=.*[a-z])/.test(text)) {
      return 'The password must contain at least 1 lowercase alphabetical character';
    }

    if (!/(?=.*[A-Z])/.test(text)) {
      return 'The password must contain at least 1 uppercase alphabetical character';
    }

    if (!/(?=.*[0-9])/.test(text)) {
      return 'The password must contain at least 1 numeric character';
    }

    return 'Invalid password';
  }
}
