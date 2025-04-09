//MODULOS
function sayHello(nombre){
    return `Hola ${nombre}`;
}
function sayHelloWorld(){
    return `Hola Mundo`;
}
//module.exports.saludo = sayHello;
//module.exports.saludo2 = sayHelloWorld;

module.exports = {
    sayHello : sayHello,
    sayHelloWorld : sayHelloWorld
};