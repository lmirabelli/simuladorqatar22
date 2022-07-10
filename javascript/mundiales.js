
const allGames = document.querySelector('#allGames');
const cajaBuscadora = document.getElementById('cajaBuscar');
const cajaBuscadoraRival = document.getElementById('cajaBuscarRival');
let historia = [];
class historiaPartidos {
    constructor(mundial, ronda, equipo1, equipo2, goles1, goles2, victoria, empate1, empate2, derrota) {

        this.mundial = mundial,
            this.ronda = ronda,
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

let filtrado;
let rival;


let llamandoInfo = () => {
    fetch('../javascript/partidos.json')
        .then(response => response.json())
        .then(data => {
            for (partido of data) {


                partido.goles1 > partido.goles2 && (partido.victoria = partido.equipo1,
                    partido.derrota = partido.equipo2,
                    partido.empate1 = "...",
                    partido.empate2 = "...")

                partido.goles1 < partido.goles2 && (partido.victoria = partido.equipo2,
                    partido.derrota = partido.equipo1,
                    partido.empate1 = "...",
                    partido.empate2 = "...")

                partido.goles1 < partido.goles2 && (partido.victoria = "...",
                    partido.derrota = "...",
                    partido.empate1 = partido.equipo1,
                    partido.empate2 = partido.equipo2)

                const mundial = document.createElement('div');
                const ronda = document.createElement('div');
                const renglon = document.createElement('div');
                const equipoA = document.createElement('div');
                const equipoB = document.createElement('div');
                const golesA = document.createElement('div');
                const golesB = document.createElement('div');
                mundial.className = 'mundial-anio'
                ronda.className = 'mundial-anio'
                renglon.className = 'renglon';
                equipoA.className = 'encuentro';
                equipoB.className = 'encuentro';
                golesA.className = 'goles';
                golesB.className = 'goles';
                mundial.innerText = partido.anio;
                ronda.innerText = partido.fase;
                equipoA.innerText = partido.equipo1;
                equipoB.innerText = partido.equipo2;
                golesA.innerText = partido.goles1;
                golesB.innerText = partido.goles2;
                renglon.append(mundial, ronda, equipoA, equipoB, golesA, golesB);
                allGames.append(renglon)

                historia.push(new historiaPartidos(partido.anio, partido.fase, partido.equipo1, partido.equipo2, partido.goles1, partido.goles2, partido.victoria, partido.empate1, partido.empate2, partido.derrota))
            } 
        }
        )
        .catch(err => alert('algo fallo'))  
}



let partidosFiltrados = () => {
    allGames.innerHTML = '';
    let mayusc = cajaBuscadora.value.toUpperCase()
    let mayuscRival = cajaBuscadoraRival.value.toUpperCase()

    // CHECOSLOVAQUIA ---> REPUBLICA CHECA
    mayusc.includes('REP') || mayusc.includes('CHECO') || mayusc.includes('CHECA') ? (mayusc = 'CHEC') : mayusc = cajaBuscadora.value.toUpperCase();
    mayuscRival.includes('REP') || mayuscRival.includes('CHECO') || mayuscRival.includes('CHECA') ? (mayuscRival = 'CHEC') : mayuscRival = cajaBuscadoraRival.value.toUpperCase();
    // -----------------------------------

    filtrado = historia.filter(p => p.equipo1.toUpperCase().includes(mayusc) && p.equipo2.toUpperCase().includes(mayuscRival) ||
        p.equipo2.toUpperCase().includes(mayusc) && p.equipo1.toUpperCase().includes(mayuscRival));

    //SERBIA ---> YUGOSLAVIA
    (mayusc.includes('YU') || mayusc.includes('SER')) &&
        (filtrado = historia.filter(p => p.equipo1.toUpperCase().includes('YU') && p.equipo2.toUpperCase().includes(mayuscRival) ||
            p.equipo2.toUpperCase().includes('YU') && p.equipo1.toUpperCase().includes(mayuscRival) ||
            p.equipo1.toUpperCase().includes('SER') && p.equipo2.toUpperCase().includes(mayuscRival) ||
            p.equipo2.toUpperCase().includes('SER') && p.equipo1.toUpperCase().includes(mayuscRival)));

    (mayuscRival.includes('YU') || mayuscRival.includes('SER')) &&
        (filtrado = historia.filter(p => p.equipo1.toUpperCase().includes(mayusc) && p.equipo2.toUpperCase().includes('RUS') ||
            p.equipo2.toUpperCase().includes(mayusc) && p.equipo1.toUpperCase().includes('YU') ||
            p.equipo1.toUpperCase().includes(mayusc) && p.equipo2.toUpperCase().includes('SER') ||
            p.equipo2.toUpperCase().includes(mayusc) && p.equipo1.toUpperCase().includes('SER')));
    //-----------------------------------------------------------------------------------------
    //URSS ---> RUSIA
    (mayusc.includes('UNIO') || mayusc.includes('RUS')) &&
        (filtrado = historia.filter(p => p.equipo1.toUpperCase().includes('UNIO') && p.equipo2.toUpperCase().includes(mayuscRival) ||
            p.equipo2.toUpperCase().includes('UNIO') && p.equipo1.toUpperCase().includes(mayuscRival) ||
            p.equipo1.toUpperCase().includes('RUS') && p.equipo2.toUpperCase().includes(mayuscRival) ||
            p.equipo2.toUpperCase().includes('RUS') && p.equipo1.toUpperCase().includes(mayuscRival)));

    (mayuscRival.includes('UNIO') || mayuscRival.includes('RUS')) &&
        (filtrado = historia.filter(p => p.equipo1.toUpperCase().includes(mayusc) && p.equipo2.toUpperCase().includes('UNIO') ||
            p.equipo2.toUpperCase().includes(mayusc) && p.equipo1.toUpperCase().includes('UNIO') ||
            p.equipo1.toUpperCase().includes(mayusc) && p.equipo2.toUpperCase().includes('RUS') ||
            p.equipo2.toUpperCase().includes(mayusc) && p.equipo1.toUpperCase().includes('RUS')));
    //-----------------------------------------------------------------------------------------
    // ALEMANIA FEDERAL ---> ALEMANIA
    (mayusc.includes('ALEMANIA F') || mayusc == 'ALEMANIA') &&
        (filtrado = historia.filter(p => p.equipo1.toUpperCase().includes('ALEMANIA F') && p.equipo2.toUpperCase().includes(mayuscRival) ||
            p.equipo2.toUpperCase().includes('ALEMANIA F') && p.equipo1.toUpperCase().includes(mayuscRival) ||
            p.equipo1.toUpperCase() == 'ALEMANIA' && p.equipo2.toUpperCase().includes(mayuscRival) ||
            p.equipo2.toUpperCase() == 'ALEMANIA' && p.equipo1.toUpperCase().includes(mayuscRival)));

    mayuscRival.includes('ALEMANIA F') || mayuscRival == 'ALEMANIA' &&
        (filtrado = historia.filter(p => p.equipo1.toUpperCase().includes(mayusc) && p.equipo2.toUpperCase().includes('ALEMANIA F') ||
            p.equipo2.toUpperCase().includes(mayusc) && p.equipo1.toUpperCase().includes('ALEMANIA F') ||
            p.equipo1.toUpperCase().includes(mayusc) && p.equipo2.toUpperCase() == 'ALEMANIA' ||
            p.equipo2.toUpperCase().includes(mayusc) && p.equipo1.toUpperCase() == 'ALEMANIA'));
    //-----------------------------------------------------------------------------------------
    // IRLANDA ---> EIRE
    mayusc == 'IRLANDA' &&
        (filtrado = historia.filter(p => p.equipo1.toUpperCase().includes('EIRE') && p.equipo2.toUpperCase().includes(mayuscRival) ||
            p.equipo2.toUpperCase().includes('EIRE') && p.equipo1.toUpperCase().includes(mayuscRival)));


    for (partido of filtrado) {

        const mundial = document.createElement('div');
        const ronda = document.createElement('div');
        const renglon = document.createElement('div');
        const equipoA = document.createElement('div');
        const equipoB = document.createElement('div');
        const golesA = document.createElement('div');
        const golesB = document.createElement('div');
        mundial.className = 'mundial-anio'
        ronda.className = 'mundial-anio'
        renglon.className = 'renglon';
        equipoA.className = 'encuentro';
        equipoB.className = 'encuentro';
        golesA.className = 'goles';
        golesB.className = 'goles';
        mundial.innerText = partido.mundial;
        ronda.innerText = partido.ronda;
        equipoA.innerText = partido.equipo1;
        equipoB.innerText = partido.equipo2;
        golesA.innerText = partido.goles1;
        golesB.innerText = partido.goles2;
        renglon.append(mundial, ronda, equipoA, equipoB, golesA, golesB);
        allGames.append(renglon)
    }

}

allGames && llamandoInfo();
cajaBuscadora.addEventListener('keyup', () => partidosFiltrados())
cajaBuscadoraRival.addEventListener('keyup', () => partidosFiltrados())
