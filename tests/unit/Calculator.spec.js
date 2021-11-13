import { render } from "@testing-library/vue";
import Calculator from "@/components/Calculator.vue";

test("Dummy test", () => {
    const { getByText } = render(Calculator);

    getByText("Calculator :)", {exact: false});
});
