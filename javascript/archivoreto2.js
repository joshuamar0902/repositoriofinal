function Suma() {
    const input=document.getElementById("unInput1");
    const valor1=Number(input.value);
    const input2=document.getElementById("unInput2");
    const valor=Number(input2.value);
    var suma = valor1 + valor;
    alert("El valor del input es: "+suma);
}
function Resta() {
    const input=document.getElementById("unInput1");
    const valor1=Number(input.value);
    const input2=document.getElementById("unInput2");
    const valor=Number(input2.value);
    var resta = valor1 - valor;
    alert("El valor del input es: "+resta);
}
function Multiplicacion() {
    const input=document.getElementById("unInput1");
    const valor1=Number(input.value);
    const input2=document.getElementById("unInput2");
    const valor=Number(input2.value);
    var multiplicacion = valor1 * valor;
    alert("El valor del input es: "+multiplicacion);
}
function Division() {
    const input=document.getElementById("unInput1");
    const valor1=Number(input.value);
    const input2=document.getElementById("unInput2");
    const valor=Number(input2.value);
    var division = valor1 / valor;
    alert("El valor del input es: "+division);
}