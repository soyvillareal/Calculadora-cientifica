class CalculadoraBasica {

    constructor() {
        this.basicOperationShape = new RegExp("(([1-9][0-9]*|[0.])(.[0-9]*[1-9])?[\-\+\*\/])(([1-9][0-9]*|[0.])(.[0-9]*[1-9])?)");
        this.memoryRegister = 0;
    }

    printMemoryContents() {
        this.clearDisplay();
        this.writeToDisplay(this.memoryRegister);
    }

    subtractFromMemory() {
        this.memoryRegister -= this.solveOperation();
    }

    addToMemory() {
        this.memoryRegister += this.solveOperation();
    }

    writeToDisplay(data) {
        let legacy = document.getElementById("displayBox").value;
        if (data == ".") {
            legacy += data;
        } else {
            legacy = legacy == "0" ? data : legacy += data;
        }
        document.getElementById("displayBox").value = legacy;
    }

    writeOperatorToDisplay(operator) {
        let legacy = document.getElementById("displayBox").value;
        if (this.basicOperationShape.test(legacy)) {
            this.solveOperation();
        }
        this.writeToDisplay(operator);
    }

    clearDisplay() {
        document.getElementById("displayBox").value = "0";
    }

    solveOperation() {
        let operation = document.getElementById("displayBox").value;
        let result = 0;
        try {
            result = eval(operation == "" ? 0 : operation);
        } catch (err) {
            alert("Syntax error");
            this.clearDisplay();
        }
        document.getElementById("displayBox").value = result;
        return result;
    }

}

class CalculadoraCientifica extends CalculadoraBasica {

    constructor() {
        super();
        this.inputList = new Array();
        this.operationString = "";
        this.justSolved = false;
        this.operationMap = {
            "sin(": "Math.sin(",
            "cos(": "Math.cos(",
            "tan(": "Math.tan(",
            "log(": "Math.log10(",
            "ln(": "Math.log(",
            "sqrt(": "Math.sqrt(",
            "PI": "Math.PI",
            "e": "Math.E"
        };
    }

    writeToDisplay(data) {
        if (document.getElementById("displayBox").value == "Syntax Error") {
            super.clearDisplay();
        }
        super.writeToDisplay(data);
        this.operationString += data;
        this.inputList.push(data);
    }

    writeOperatorToDisplay(operator) {
        if (document.getElementById("displayBox").value == "Syntax Error") {
            super.clearDisplay();
        }
        this.operationString += operator;
        super.writeToDisplay(operator);
        this.inputList.push(operator);
    }

    solveOperation() {
        let result = 0;
        try {
            result = eval(this.operationString == "" || this.operationString == "Syntax Error" ? 0 : this.operationString);
        } catch (err) {
            result = "Syntax Error";
        }
        document.getElementById("displayBox").value = result;
        this.operationString = "";
        this.operationString += result;
        this.justSolved = true;
        return result;
    }

    clearDisplay() {
        super.clearDisplay();
        this.operationString = "";
    }

    toggleSign() {
        var displayBox = document.getElementById("displayBox");
        var displayContents = displayBox.value;
        if (displayContents == "Syntax Error") {
            super.clearDisplay();
        }
        if (displayContents == "0") {
            displayBox.value = "-";
            this.operationString += "-";
        } else {
            displayBox.value = "-" + displayBox.value;
            this.operationString = "-" + this.operationString;
        }
    }

    clearMemory() {
        super.subtractFromMemory(this.memoryRegister);
    }

}

const calculadora = new CalculadoraCientifica();
