import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Calculadora Angular';

  // VALOR QUE SE MUESTRA POR PANTALLA EN LA CALCULADORA
  displayValue: number = 0;

  // OPERADOR ACTUAL SELECCIONADO
  currentOperator: string = 'NoOperator';

  // NUMERO ACTUAL INGRESADO COMO CADENA
  currentNumberString: string = '0';

  // OPERANDOS PARA REALIZAR OPERACIONES
  firstOperand: number = 0;
  secondOperand: number = 0;

  // EVENTOS DE CLICK DE LA CALCULADORA
  handleButtonClick(value: string, type: string) {
    if (type === 'number') {
      this.handleNumberClick(value);
    } else if (type === 'operator') {
      this.handleOperatorClick(value);
    }
  }

  // EVENTOS DE CLICK EN LOS BOTONES NUMÉRICOS
  handleNumberClick(value: string) {
    if (this.currentNumberString === '0') {
      this.currentNumberString = value;
    } else {
      this.currentNumberString += value;
    }
    this.displayValue = parseFloat(this.currentNumberString);
  }

  // EVENTOS DE CLICK EN LOS BOTONES DE OPERADORES
  handleOperatorClick(operator: string) {
    if (operator === 'ac') {
      this.clearAll();
    } else if (this.currentOperator === 'NoOperator') {
      this.firstOperand = this.displayValue;
      this.displayValue = 0;
      this.currentNumberString = '0';
      this.currentOperator = operator;
    } else if (this.currentOperator !== 'NoOperator') {
      this.secondOperand = this.displayValue;
      this.calculateResult(operator);
    }
  }

  // CALCULA EL RESULTADO DE LA OPERACIÓN
  calculateResult(operator: string) {
    let result: number;
    switch (this.currentOperator) {
      case '+':
        result = this.firstOperand + this.secondOperand;
        break;
      case '-':
        result = this.firstOperand - this.secondOperand;
        break;
      case '*':
        result = this.firstOperand * this.secondOperand;
        break;
      case '/':
        result = this.firstOperand / this.secondOperand;
        break;
      case '%':
        result = (this.firstOperand * this.secondOperand) / 100;
        break;
      default:
        result = 0;
    }
    this.updateValuesAfterCalculation(result, operator);
  }

  // ACTUALIZA LOS VALORES DESPUÉS DE REALIZAR EL CÁLCULO
  updateValuesAfterCalculation(result: number, operator: string) {
    this.displayValue = result;
    this.firstOperand = result;
    this.secondOperand = 0;
    this.currentNumberString = '0';
    this.currentOperator = operator;
    if (operator === '=') {
      this.handleEqualClick();
    }
  }

  // MANEJA EL EVENTO CLICK EN EL BOTÓN IGUAL
  handleEqualClick() {
    this.firstOperand = 0;
    this.secondOperand = 0;
    this.currentOperator = 'NoOperator';
    this.currentNumberString = '0';
  }

  // MANEJA EL EVENTO CLICK DEL BOTÓN BORRADO
  handleBackspaceClick() {
    this.currentNumberString = this.currentNumberString.slice(0, -1);
    if (this.currentNumberString === '') {
      this.currentNumberString = '0';
    }
    this.displayValue = parseFloat(this.currentNumberString);
  }

  // BORRA TODOS LOS VALORES Y RESTABLECE LA CALCULADORA
  clearAll() {
    this.firstOperand = 0;
    this.secondOperand = 0;
    this.displayValue = 0;
    this.currentOperator = 'NoOperator';
    this.currentNumberString = '0';
  }
}