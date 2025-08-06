import { PipeTransform } from '@nestjs/common';

export class OptionalParseEnumPipe implements PipeTransform {
    transform(value: string) {
        if (typeof value === 'undefined') {
            return undefined;
        }
        return value;
    }
}
