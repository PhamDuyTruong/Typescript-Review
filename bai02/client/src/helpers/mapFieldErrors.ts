import { FieldError } from '../generated/graphql';
export const mapFieldError = (errors: FieldError[]) => {
    return errors.reduce((accumulatedErrorObj, error) => {
        return {
            ...accumulatedErrorObj,
            [error.field]: error.message
        }
    }, {})
}