import {toCamelCase, toKebabCase, toSnakeCase} from "../stringUtils";

describe('stringUtils', () => {
    test("should convert to different cases", () => {
        const camelCase = "myVariableName";
        const kebabCase = "my-variable-name";
        const snakeCase = "my_variable_name";

        expect(toKebabCase(camelCase)).toBe("my-variable-name");
        expect(toSnakeCase(camelCase)).toBe("my_variable_name");
    })
})