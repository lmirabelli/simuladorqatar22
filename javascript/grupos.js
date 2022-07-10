class partido {
    constructor(equipo1, equipo2, goles1, goles2, victoria, empate1, empate2, derrota) {
        this.equipo1 = equipo1,
            this.equipo2 = equipo2,
            this.goles1 = goles1,
            this.goles2 = goles2,
            this.victoria = victoria,
            this.empate1 = empate1,
            this.empate2 = empate2,
            this.derrota = derrota
    }
}
class posicion {
    constructor(pais, ganados, empatados, perdidos, aFavor, enContra, puntos, pos) {
        this.pais = pais,
            this.ganados = ganados,
            this.empatados = empatados,
            this.perdidos = perdidos,
            this.aFavor = aFavor,
            this.enContra = enContra,
            this.puntos = puntos;
        this.pos = pos
    }
}
class playoff {
    constructor(equipoA, equipoB, golesA, golesB) {
        this.equipoA = equipoA,
            this.equipoB = equipoB,
            this.golesA = golesA,
            this.golesB = golesB
    }
}

class flag {
    constructor(nacion,escudo){
        this.nacion = nacion,
        this.escudo = escudo
    }
}
/*-----------------
 GRUPOS DEL MUNDIAL
 ------------------*/

let grupoA = ['Qatar', 'Ecuador', 'Senegal', 'Paises Bajos'];
let grupoB = ['Inglaterra', 'Iran', 'U. S. A.', 'Gales'];
let grupoC = ['Argentina', 'Arabia Saudi', 'Mexico', 'Polonia'];
let grupoD = ['Francia', 'Australia', 'Dinamarca', 'Tunez'];
let grupoE = ['España', 'Costa Rica', 'Alemania', 'Japon'];
let grupoF = ['Belgica', 'Canada', 'Marruecos', 'Croacia'];
let grupoG = ['Brasil', 'Serbia', 'Suiza', 'Camerun'];
let grupoH = ['Portugal', 'Ghana', 'Uruguay', 'Corea del Sur'];

let banderas = [...grupoA,...grupoB,...grupoC,...grupoD,...grupoE,...grupoF,...grupoG,...grupoH]
let numId = 1;
for (bandera of banderas){
    escudosPaises.push(new flag(bandera,`./img/${numId}.png`));
    numId++
}