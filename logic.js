class CalculadoraBasica {

    constructor() {
        this.basicOperationShape = new RegExp("(([1-9][0-9]*|[0.])?[\-\+\*\/])");
        this.memoryRegister = 0;
    }

    printMemoryContents() {
        this.clearDisplay();
        this.writeToDisplay(this.memoryRegister);
    }

    subtractFromMemory() {
    }

    addToMemory() {
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
}
