export class InvalidFieldError extends Error {
  constructor () {
    super('Valor inválido')
    this.message = 'InvalidFieldError'
  }
}
