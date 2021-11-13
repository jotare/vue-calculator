import { render, fireEvent } from "@testing-library/vue";
import Calculator from "@/components/Calculator.vue";

test("Insert operation", async () => {
    const { getByText } = render(Calculator);

    getByText("Operation: 0");
    getByText("Result:");

    const button_1 = getByText("1");
    const button_7 = getByText("7");
    const button_plus = getByText("+");
    const button_eq = getByText("=");

    await fireEvent.click(button_1);
    await fireEvent.click(button_plus);
    await fireEvent.click(button_1);
    await fireEvent.click(button_7);

    getByText("Operation: 1 + 17");
});

test("Operations", async () => {
    const { getByText } = render(Calculator);

    const button_3 = getByText("3");
    const button_5 = getByText("5");
    const button_plus = getByText("+");
    const button_minus = getByText("-");
    const button_mult = getByText("*");
    const button_div = getByText("/");
    const button_eq = getByText("=");

    getByText("Operation: 0");
    getByText("Result:");

    await fireEvent.click(button_3);
    await fireEvent.click(button_plus);
    await fireEvent.click(button_3);
    await fireEvent.click(button_5);
    await fireEvent.click(button_eq);
    getByText("Result: 38");

    await fireEvent.click(button_minus);
    await fireEvent.click(button_3);
    await fireEvent.click(button_eq);
    getByText("Result: 35");

    await fireEvent.click(button_mult);
    await fireEvent.click(button_3);
    await fireEvent.click(button_eq);
    getByText("Result: 105");

    await fireEvent.click(button_div);
    await fireEvent.click(button_5);
    await fireEvent.click(button_3);
    await fireEvent.click(button_eq);
    getByText("Result: 1.981");
});
