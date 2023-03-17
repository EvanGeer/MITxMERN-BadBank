import { Validation } from "./Validation";

it('should validate overdraft', () => {
    // arrange
    const balance = 100;
    const overdraft = 120;
    const validEqual = 100;
    const validLessThan = 90;

    // act
    const actualOverdraft = Validation.wontOverdraft(overdraft, balance)
    const actualValidEqual = Validation.wontOverdraft(validEqual, balance)
    const actualValidLessThan = Validation.wontOverdraft(validLessThan, balance)

    // assert
    expect(actualOverdraft).toEqual({passes: false, message: Validation.msg_insufficientFunds})
    expect(actualValidEqual).toEqual({passes: true, message: ""})
    expect(actualValidLessThan).toEqual({passes: true, message: ""})
}) 

it('should validate multiples of twenty', () => {
    // arrange
    const invalid = 30;
    const valid = 120;

    // act
    const actualInvalid = Validation.isIncrementOfTwenty(invalid);
    const actualValid = Validation.isIncrementOfTwenty(valid);

    // assert
    expect(actualInvalid).toEqual({passes: false, message: Validation.msg_notMultipleOfTwenty});
    expect(actualValid).toEqual({passes: true, message: ""});
}) 


it('should validate greater than zero', () => {
    // arrange
    const invalid = -0.000001;
    const valid = 0.00000001;

    // act
    const actualInvalid = Validation.isGreaterThenZero(invalid);
    const actualValid = Validation.isGreaterThenZero(valid);

    // assert
    expect(actualInvalid).toEqual({passes: false, message: Validation.msg_notGreaterThanZero});
    expect(actualValid).toEqual({passes: true, message: ""});
}) 