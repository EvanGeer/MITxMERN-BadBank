import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import Deposit from "../pages/Deposit";
import { TestWrapper as TestWrapper } from "../testing/TestWrapper";
import { AtmMenu } from "../pages/AtmMenu";
import { Withdrawal } from "../pages/Withdrawal";

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

const balanceElement = () => screen.getByTestId("account-balance-header");

beforeAll(() => {});
beforeEach(() => {});
afterEach(() => {});

// it("should withdrawal Fast Cash $80 from main menu page", () => {
//   // arrange
//   render(
//     <TestWrapper startingBalance={100}>
//       <AtmMenu />
//     </TestWrapper>
//   );
//   const fastCashButton = screen.getByTestId("quick-cash-80");

//   // act
//   act(() => userEvent.click(fastCashButton));

//   // assert
//   expect(fastCashButton).toBeDisabled();
//   expect(balanceElement()).toHaveTextContent("$20.00");
// });

// it("should deposit $75", () => {
//   // arrange
//   render(
//     <TestWrapper startingBalance={100}>
//       <Deposit />
//     </TestWrapper>
//   );

//   const transactInput = screen.getByTestId("transaction-amount-input");
//   const okay = screen.getByTestId("Okay");
//   expect(balanceElement()).toHaveTextContent("$100.00");

//   // act
//   act(() => {
//     userEvent.type(transactInput, "75");
//     userEvent.click(okay);
//   });

//   // assert
//   expect(transactInput).toHaveValue(75);
//   expect(okay).toBeEnabled();
//   expect(balanceElement()).toHaveTextContent("$175.00");
// });

// it("should withdrawal $60", () => {
//   // arrange
//   render(
//     <TestWrapper startingBalance={100}>
//       <Withdrawal />
//     </TestWrapper>
//   );

//   const transactInput = screen.getByTestId("transaction-amount-input");
//   const okay = screen.getByTestId("Okay");
//   expect(balanceElement()).toHaveTextContent("$100.00");

//   const expectedEnabled = [
//     "quick-cash-20", 
//     "quick-cash-40"
//   ];
//   const expectedDisabled = [
//     "quick-cash-60",
//     "quick-cash-80",
//     "quick-cash-100",
//     "quick-cash-200",
//   ];

//   // act
//   act(() => {
//     userEvent.type(transactInput, "60");
//     expect(okay).toBeEnabled();
//     userEvent.click(okay);
//   });

//   // assert
//   // transaction basics
//   expect(transactInput).toHaveValue(60);
//   expect(balanceElement()).toHaveTextContent("$40.00");

//   // enabled/disabled controls
//   expectedDisabled.forEach((element) => {
//     expect(screen.getByTestId(element)).toBeDisabled();
//   })
//   expectedEnabled.forEach((element) => {
//     expect(screen.getByTestId(element)).toBeEnabled();
//   })
// });
