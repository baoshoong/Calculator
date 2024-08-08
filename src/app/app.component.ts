import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import {add, subtract, multiply, divide} from "./action/calculator.action";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'my-calculator';
  numbers = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0];
  displayValue = '0';
  private currentValue = '';
  private operator = '';
  private previousValue = '';
  theme = 'dark';

  count$?: Observable<number>;

  constructor(private store: Store<{ calculator: number }>) {
    this.count$ = this.store.select('calculator');
  }

  onNumberClick(number: number) {
    this.currentValue += number;
    this.displayValue = this.currentValue;
  }

  onOperatorClick(operator: string) {
    this.operator = operator;
    this.previousValue = this.currentValue;
    this.currentValue = '';
    this.updateDisplay();
  }

  onEqualsClick() {
    const num1 = parseFloat(this.previousValue);
    const num2 = parseFloat(this.currentValue);

    switch (this.operator) {
      case '+':
        this.store.dispatch(add({num1, num2}));
        break;
      case '-':
        this.store.dispatch(subtract({num1, num2}));
        break;
      case '*':
        this.store.dispatch(multiply({num1, num2}));
        break;
      case '/':
        this.store.dispatch(divide({num1, num2}));
        break;
      default:
        return;
    }

    this.store.select('calculator').subscribe(result => {
      this.displayValue = result.toString();
      this.currentValue = result.toString();
      this.operator = '';
      this.previousValue = '';
    });
  }

  onClearClick() {
    this.currentValue = '';
    this.previousValue = '';
    this.operator = '';
    this.displayValue = '0';
  }

  onPercentClick() {
    if (this.currentValue) {
      this.currentValue = (parseFloat(this.currentValue) / 100).toString();
      this.displayValue = this.currentValue;
    }
  }

  onPlusMinusClick() {
    if (this.currentValue) {
      this.currentValue = (parseFloat(this.currentValue) * -1).toString();
      this.displayValue = this.currentValue;
    }
  }

  onDoubleZeroClick() {
    this.currentValue += '00';
    this.displayValue = this.currentValue;
  }

  onDotClick() {
    if (!this.currentValue.includes('.')) {
      this.currentValue += '.';
      this.displayValue = this.currentValue;
    }
  }

  toggleTheme() {
    this.theme = this.theme === 'dark' ? 'light' : 'dark';
  }

  updateDisplay() {
    this.displayValue = `${this.previousValue} ${this.operator} ${this.currentValue}`;
  }
}
