<template>
  <div class="calculator">

    <div>
      <p>Operation: {{ current_operation }}</p>
    </div>

    <div>
      <p>Result: {{ result }}</p>
    </div>

    <div> <!-- operands -->
      <button
        v-for="n in 10" :key="n"
        @click="add_operand(n-1)">
        {{ n - 1 }}
      </button>
    </div>

    <div> <!-- operators -->
      <button
        v-for="(operator, index) in operators" :key="index"
        @click="add_operator(operator)">
        {{ operator }}
      </button>

      <button @click="calculate">=</button>
    </div>
  </div>
</template>

<script>
export default {
    name: "Calculator",
    data() {
        return {
            result: null,
            operation: ["0"],
            operators: ["+", "-", "*", "/"],
        };
    },
    computed: {
        current_operation() {
            let operation = "";
            for (let i = 0; i < this.operation.length; i++) {
                operation = `${operation} ${this.operation[i]}`;
            }
            return operation;
        },
    },
    methods: {
        add_operand(operand) {
            if (!this.operation.length) {
                this.operation.push(operand.toString());
            } else {
                const last = this.operation[this.operation.length - 1];
                if (this.operators.includes(last)) {
                    this.operation.push(operand.toString());
                } else {
                    const digits = this.operation.pop();
                    if (digits === "0") {
                        this.operation.push(operand.toString());
                    } else {
                        this.operation.push(`${digits}${operand}`);
                    }
                }
            }
        },

        add_operator(operator) {
            if (!this.operation.length) return;

            const last = this.operation[this.operation.length - 1];
            if (this.operators.includes(last)) {
                this.operation.pop();
                this.operation.push(operator);
            } else {
                this.operation.push(operator);
            }
        },

        calculate() {
            let result = 0;

            if (this.operation.length) {
                let operator = "";
                let step = "operator";
                result = Number(this.operation[0]);

                for (let i = 1; i < this.operation.length; i++) {
                    if (step === "operator") {
                        operator = this.operation[i];
                        step = "second";
                    } else if (step === "second") {
                        const n = Number(this.operation[i]);
                        switch (operator) {
                        case "+":
                            result += n;
                            break;
                        case "-":
                            result -= n;
                            break;
                        case "*":
                            result *= n;
                            break;
                        case "/":
                            result /= n;
                            break;
                        default:
                            //
                        }
                        step = "operator";
                    }
                }
            }
            if (Math.floor(result) !== result) {
                result = result.toFixed(3);
            }
            this.result = result;
            this.operation = [result.toString()];
        },
    },
};
</script>

<style scoped>

</style>
