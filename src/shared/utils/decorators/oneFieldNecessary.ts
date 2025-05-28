import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function AtLeastOneField(fields: string[], validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'atLeastOneField',
      target: object.constructor,
      propertyName,
      constraints: fields,
      options: validationOptions,
      validator: {
        validate(_: any, args: ValidationArguments) {
          const object = args.object as any;

          return fields.some(field => !!object[field]);
        },
        defaultMessage(args: ValidationArguments) {
          return `At least one of the following fields must be provided: ${fields.join(', ')}`;
        },
      },
    });
  };
}
