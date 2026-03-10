import {add, subtract, divide, multiply} from "../mathUtils"

describe('mathsUtils',() => {
    test('should add 2 numbers correctly', ()=>{
        expect(add(2,3)).toBe(5);
        expect(add(-1,1)).toBe(0);
    });

    test('should subtract 2 numbers correctly', ()=>{
        expect(subtract(5,3)).toBe(2);
        expect(subtract(3,5)).toBe(-2);
    });

    test('should divide and throw error', ()=>{
        expect(divide(10,2)).toBe(5);
        expect(() => 
        divide(5,0)).toThrow("Cannot divide by zero");
        
    });
})