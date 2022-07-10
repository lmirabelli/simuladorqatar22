
let partidos = () => {
    /*----------------
    PARTIDOS DEL GRUPO
    ------------------*/
    grupete.push(new partido(grupo[0], grupo[1]));
    grupete.push(new partido(grupo[2], grupo[3]));
    grupete.push(new partido(grupo[0], grupo[2]));
    grupete.push(new partido(grupo[1], grupo[3]));
    grupete.push(new partido(grupo[0], grupo[3]));
    grupete.push(new partido(grupo[1], grupo[2]));
    acomodador()
    contador()

    /*---------------------------------------------------  
    Acomoda tabla por puntos / Diferencia / goles a favor
    ---------------------------------------------------*/
    tabla.sort((a, b) => {
        a > b? 1 : a < b? -1 : 0
    }
    )

    //---------------------------------------------------
    primero = tabla[0].pais
    segundo = tabla[1].pais
    tabla = [];

}
/*-----------------------
TABLAS DE LOS GRUPOS EN 0
-----------------------*/

let tablaInicial = (grupo,cuadro) => {
    cuadro.innerHTML = `
        <div class="puesto">
            <div class="tabla-titulo pais">Pais</div>
            <div class="tabla-titulo stat">PG</div>
            <div class="tabla-titulo stat">PE</div>
            <div class="tabla-titulo stat">PP</div>
            <div class="tabla-titulo stat">GF</div>
            <div class="tabla-titulo stat">GC</div>
            <div class="tabla-titulo stat">PTS</div>
        </div>`
    for(i = 0; i < 4; i++){
        cuadro.innerHTML += `
        <div class="puesto">
            <div class="pais">${grupo[i]}</div>
            <div class="stat">0</div>
            <div class="stat">0</div>
            <div class="stat">0</div>
            <div class="stat">0</div>
            <div class="stat">0</div>
            <div class="stat">0</div>
        </div>
        `
    }
}

let acomodador = () => {

    /*----------------
    CALCULA QUIEN GANA
    ------------------*/

    grupete.forEach((pxp) => {

        isNaN(pxp.goles1) && (pxp.goles1 = 0);
        isNaN(pxp.goles2) && (pxp.goles2 = 0);

        pxp.goles1 > pxp.goles2?
            (pxp.victoria = pxp.equipo1, pxp.empate1 = "...", pxp.empate2 = "...", pxp.derrota = pxp.equipo2) :
        pxp.goles1 < pxp.goles2?
            (pxp.victoria = pxp.equipo2, pxp.empate1 = "...", pxp.empate2 = "...", pxp.derrota = pxp.equipo1) :
            (pxp.victoria = "...", pxp.empate1 = pxp.equipo1, pxp.empate2 = pxp.equipo2, pxp.derrota = "...")
    })
}

let contador = () => {
    for (i = 0; i < 4; i++) {

        /* ----------------------------------------------
        CUENTA LOS PARTIDOS GANADOS, EMPATADOS Y PERDIDOS
        ------------------------------------------------- */

        let victorias = grupete.filter(pg => pg.victoria.includes(grupo[i])).length;
        let empates = grupete.filter(pe => pe.empate1.includes(grupo[i])).length + grupete.filter(pe => pe.empate2.includes(grupo[i])).length;
        let derrotas = grupete.filter(pd => pd.derrota.includes(grupo[i])).length;
        let puntos = victorias * 3 + empates;

        /* ----------------------------------
        CALCULA LOS GOLES A FAVOR Y EN CONTRA
        ------------------------------------- */

        let filtro = grupete.filter(p => p.equipo1.includes(grupo[i]));
        filtro.forEach((pxp) => {
            gf = pxp.goles1;
            gc = pxp.goles2;
            golesaFavor.push(gf)
            golesenContra.push(gc)
        });
        filtro = grupete.filter(p => p.equipo2.includes(grupo[i]))
        filtro.forEach((pxp) => {
            gf = pxp.goles2
            gc = pxp.goles1
            golesaFavor.push(gf)
            golesenContra.push(gc)
        })
        let gFavor = golesaFavor.reduce((acc, el) => acc + el, 0);
        let gContra = golesenContra.reduce((acc, el) => acc + el, 0);
        let pos = puntos + (gFavor - gContra) / 100 + gFavor / 1000 + (i + 1) / 100000

        tabla.push(new posicion(grupo[i], victorias, empates, derrotas, gFavor, gContra, puntos, pos))
        golesaFavor = []
        golesenContra = []
    }
}

let octavosFinal = () => {
    octavos = []
    octavos.push(new playoff(a1, b2, parseInt(document.getElementById('octavosA1').value), parseInt(document.getElementById('octavosB1').value)));
    octavos.push(new playoff(c1, d2, parseInt(document.getElementById('octavosA2').value), parseInt(document.getElementById('octavosB2').value)));
    octavos.push(new playoff(e1, f2, parseInt(document.getElementById('octavosA3').value), parseInt(document.getElementById('octavosB3').value)));
    octavos.push(new playoff(g1, h2, parseInt(document.getElementById('octavosA4').value), parseInt(document.getElementById('octavosB4').value)));
    octavos.push(new playoff(a2, b1, parseInt(document.getElementById('octavosA5').value), parseInt(document.getElementById('octavosB5').value)));
    octavos.push(new playoff(c2, d1, parseInt(document.getElementById('octavosA6').value), parseInt(document.getElementById('octavosB6').value)));
    octavos.push(new playoff(e2, f1, parseInt(document.getElementById('octavosA7').value), parseInt(document.getElementById('octavosB7').value)));
    octavos.push(new playoff(g2, h1, parseInt(document.getElementById('octavosA8').value), parseInt(document.getElementById('octavosB8').value)));

    for (i = 0; i < 8; i = i + 2) {
        isNaN(octavos[i].golesA) && (octavos[i].golesA = 0);
        isNaN(octavos[i].golesB) &&  (octavos[i].golesB = 0);
        isNaN(octavos[i + 1].golesA) && (octavos[i + 1].golesA = 0);
        isNaN(octavos[i + 1].golesB) &&  (octavos[i + 1].golesB = 0);
        
        octavos[i].golesA >= octavos[i].golesB? cuartosA = octavos[i].equipoA : cuartosA = octavos[i].equipoB;
        octavos[i + 1].golesA >= octavos[i + 1].golesB? cuartosB = octavos[i + 1].equipoA : cuartosB = octavos[i + 1].equipoB;
        
        i == 0? (cuartos1 = cuartosA, cuartos2 = cuartosB) :
        i == 2? (cuartos3 = cuartosA, cuartos4 = cuartosB) :
        i == 4? (cuartos5 = cuartosA, cuartos6 = cuartosB) :
        i == 6? (cuartos7 = cuartosA, cuartos8 = cuartosB) : alert('algo anda mal')

        typeof cuartosA == "object" && (cuartosA = "Falta Equipo")
        typeof cuartosB == "object" && (cuartosB = "Falta Equipo")

        document.getElementById(`cuartos-${i + 1}`).innerText = cuartosA;
        document.getElementById(`cuartos-${i + 2}`).innerText = cuartosB;

        /*-------------------------------
        GUARDADO DE DATOS EN LOCALSTORAGE
        -------------------------------*/

        localStorage.setItem(`confirmOctavos`,'si')
        let partxpart = {
            'goalA': document.querySelector(`#octavosA${i + 1}`).value,
            'goalB': document.querySelector(`#octavosB${i + 1 }`).value,
            'goalC': document.querySelector(`#octavosA${i + 2}`).value,
            'goalD': document.querySelector(`#octavosB${i + 2}`).value,
            'team1': cuartosA,
            'team2': cuartosB
        }
        let rxp = `resultxOctavos${i}`;
        let gog = JSON.stringify(partxpart);
        localStorage.setItem(rxp , gog);

    }


    


}

let cuartosFinal = () => {
    cuartos = []
    cuartos.push(new playoff(cuartos1, cuartos2, parseInt(document.getElementById('cuartosA1').value), parseInt(document.getElementById('cuartosB1').value)))
    cuartos.push(new playoff(cuartos3, cuartos4, parseInt(document.getElementById('cuartosA2').value), parseInt(document.getElementById('cuartosB2').value)))
    cuartos.push(new playoff(cuartos5, cuartos6, parseInt(document.getElementById('cuartosA3').value), parseInt(document.getElementById('cuartosB3').value)))
    cuartos.push(new playoff(cuartos7, cuartos8, parseInt(document.getElementById('cuartosA4').value), parseInt(document.getElementById('cuartosB4').value)))

    for (i = 0; i < 4; i = i + 2) {
        isNaN(cuartos[i].golesA) && (cuartos[i].golesA = 0)
        isNaN(cuartos[i].golesB) && (cuartos[i].golesB = 0)
        isNaN(cuartos[i + 1].golesA) && (cuartos[i + 1].golesA = 0)
        isNaN(cuartos[i + 1].golesB) && (cuartos[i + 1].golesB = 0)
        

        cuartos[i].golesA >= cuartos[i].golesB? semisA = cuartos[i].equipoA : semisA = cuartos[i].equipoB
        cuartos[i + 1].golesA >= cuartos[i + 1].golesB? semisB = cuartos[i + 1].equipoA : semisB = cuartos[i + 1].equipoB

        i == 0? (semis1 = semisA, semis2 = semisB) :
        i == 2? (semis3 = semisA, semis4 = semisB) : alert('algo anda mal (SEMIS)')

        document.getElementById(`semis-${i + 1}`).innerText = semisA;
        document.getElementById(`semis-${i + 2}`).innerText = semisB;

        /*-------------------------------
        GUARDADO DE DATOS EN LOCALSTORAGE
        -------------------------------*/

        localStorage.setItem(`confirmCuartos`,'si')
        let partxpart = {
            'goalA': document.querySelector(`#cuartosA${i + 1}`).value,
            'goalB': document.querySelector(`#cuartosB${i + 1 }`).value,
            'goalC': document.querySelector(`#cuartosA${i + 2}`).value,
            'goalD': document.querySelector(`#cuartosB${i + 2}`).value,
            'team1': semisA,
            'team2': semisB
        }
        let rxp = `resultxCuartos${i}`;
        let gog = JSON.stringify(partxpart);
        localStorage.setItem(rxp , gog);

    }
}

let semisFinal = () => {
    semi = []
    semi.push(new playoff(semis1, semis2, parseInt(document.getElementById('semisA1').value), parseInt(document.getElementById('semisB1').value)))
    semi.push(new playoff(semis3, semis4, parseInt(document.getElementById('semisA2').value), parseInt(document.getElementById('semisB2').value)))

    isNaN(semi[0].golesA) && (semi[0].golesA = 0);
    isNaN(semi[0].golesB) && (semi[0].golesB = 0);
    isNaN(semi[1].golesA) && (semi[1].golesA = 0);
    isNaN(semi[1].golesB) && (semi[1].golesB = 0);

    semi[0].golesA >= semi[0].golesB? (finalA = semi[0].equipoA, tercerA = semi[0].equipoB) : (finalA = semi[0].equipoB, tercerA = semi[0].equipoA)
    semi[1].golesA >= semi[1].golesB? (finalB = semi[1].equipoA, tercerB = semi[1].equipoB) : (finalB = semi[1].equipoB, tercerB = semi[1].equipoA)

    document.getElementById(`final-1`).innerText = finalA;
    document.getElementById(`final-2`).innerText = finalB;
    document.getElementById(`tercer-1`).innerText = tercerA;
    document.getElementById(`tercer-2`).innerText = tercerB;

    localStorage.setItem(`confirmSemis`,'si');
    let partxpart = {
        'goalA': document.querySelector(`#semisA1`).value,
        'goalB': document.querySelector(`#semisB1`).value,
        'goalC': document.querySelector(`#semisA2`).value,
        'goalD': document.querySelector(`#semisB2`).value,
        'team1': finalA,
        'team2': finalB,
        'team3': tercerA,
        'team4': tercerB
    }
    let rxp = `resultxSemis`;
    let gog = JSON.stringify(partxpart);
    localStorage.setItem(rxp , gog);

}

let tercerPuesto = () => {
    puesto3 = []
    puesto3.push(new playoff(tercerA, tercerB, parseInt(document.getElementById('tercerA1').value), parseInt(document.getElementById('tercerB1').value)))

    localStorage.setItem(`confirmTercer`,'si')

    let partxpart = {
        'goalA': document.querySelector('#tercerA1').value,
        'goalB': document.querySelector('#tercerB1').value,
        'tercero': tercero
    }
    let rxp = `resultxTercero`;
    let gog = JSON.stringify(partxpart);
    localStorage.setItem(rxp , gog);

}

let finaldeFinales = () => {
    final = []
    final.push(new playoff(finalA, finalB, parseInt(document.getElementById('finalA1').value), parseInt(document.getElementById('finalB1').value)))
    localStorage.setItem(`confirmFinal`,'si')

    let partxpart = {
        'goalA': document.querySelector('#finalA1').value,
        'goalB': document.querySelector('#finalB1').value,
    }
    let rxp = `resultxFinal`;
    let gog = JSON.stringify(partxpart);
    localStorage.setItem(rxp , gog);


}

let agregarPartidos = () => {

    /*-------------------------------
    AGREGA LOS PARTIDOS DE LOS GRUPOS
    -------------------------------*/
    i = 0
    for (part of grupete) {
        
        let crearRenglon = document.createElement('div');
        let crearEquipoA = document.createElement('p');
        let crearEquipoB = document.createElement('p');
        let crearGolA = document.createElement('input');
        let crearGolB = document.createElement('input');

        crearRenglon.className = 'renglon';
        crearEquipoA.className = 'pais-juegos';
        crearEquipoB.className = 'pais-juegos';
        crearGolA.id = `${nombreGrupo}golA${i}`;
        crearGolB.id = `${nombreGrupo}golB${i}`;

        crearEquipoA.innerText = part.equipo1;
        crearEquipoB.innerText = part.equipo2;

        crearRenglon.append(crearEquipoA, crearEquipoB, crearGolA, crearGolB)
        grupoIdent.append(crearRenglon);
        i++;
    }
    let crearBoton = document.createElement('button');
    crearBoton.id = `resultados-${nombreGrupo}`
    crearBoton.innerText = 'Procesar Resultados'

    grupoIdent.append(crearBoton);

}

let rest = () => {

    /*----------------
    PARTIDOS DEL GRUPO
    ------------------*/
    grupete = [];
    grupete.push(new partido(grupo[0], grupo[1], parseInt(document.getElementById(`${nombreGrupo}golA0`).value), parseInt(document.getElementById(`${nombreGrupo}golB0`).value)));
    grupete.push(new partido(grupo[2], grupo[3], parseInt(document.getElementById(`${nombreGrupo}golA1`).value), parseInt(document.getElementById(`${nombreGrupo}golB1`).value)));
    grupete.push(new partido(grupo[0], grupo[2], parseInt(document.getElementById(`${nombreGrupo}golA2`).value), parseInt(document.getElementById(`${nombreGrupo}golB2`).value)));
    grupete.push(new partido(grupo[1], grupo[3], parseInt(document.getElementById(`${nombreGrupo}golA3`).value), parseInt(document.getElementById(`${nombreGrupo}golB3`).value)));
    grupete.push(new partido(grupo[0], grupo[3], parseInt(document.getElementById(`${nombreGrupo}golA4`).value), parseInt(document.getElementById(`${nombreGrupo}golB4`).value)));
    grupete.push(new partido(grupo[1], grupo[2], parseInt(document.getElementById(`${nombreGrupo}golA5`).value), parseInt(document.getElementById(`${nombreGrupo}golB5`).value)));
    acomodador()
    contador()

    /*-------------------------------
    GUARDADO DE DATOS EN LOCALSTORAGE
    -------------------------------*/

    localStorage.setItem(`confirm${nombreGrupo}`,'si')
    for (i = 0 ; i < 6 ; i++){
        let partxpart = {
            'goalA': document.querySelector(`#${nombreGrupo}golA${i}`).value,
            'goalB': document.querySelector(`#${nombreGrupo}golB${i}`).value
        }
        let rxp = `resultxPart${nombreGrupo}${i}`;
        let gog = JSON.stringify(partxpart);
        localStorage.setItem(rxp , gog);
    }

    /*---------------------------------------------------  
    Acomoda tabla por puntos / Diferencia / goles a favor
    ---------------------------------------------------*/
    tabla.sort((a, b) => {
        if (a.pos < b.pos) {
            return 1;
        }
        if (a.pos > b.pos) {
            return -1
        }
        return 0
    }
    )

    //---------------------------------------------------

    primero = tabla[0].pais
    segundo = tabla[1].pais


}

let acomodarTabla = () => {
    let nombreTabla = document.getElementById(grNombre)
    while (nombreTabla.children[1]) {
        nombreTabla.removeChild(nombreTabla.children[1])
    }
    psc = 0
    for (pos of tabla) {

        let crearPuesto = document.createElement('div');
        let crearPais = document.createElement('div');
        let crearPG = document.createElement('div');
        let crearPE = document.createElement('div');
        let crearPP = document.createElement('div');
        let crearGF = document.createElement('div');
        let crearGC = document.createElement('div');
        let crearPTS = document.createElement('div');

        crearPuesto.className = 'puesto';
        crearPais.className = 'pais';
        crearPG.className = 'stat';
        crearPE.className = 'stat';
        crearPP.className = 'stat';
        crearGF.className = 'stat';
        crearGC.className = 'stat';
        crearPTS.className = 'stat';

        crearPais.innerText = tabla[psc].pais;
        crearPG.innerText = tabla[psc].ganados;
        crearPE.innerText = tabla[psc].empatados;
        crearPP.innerText = tabla[psc].perdidos;
        crearGF.innerText = tabla[psc].aFavor;
        crearGC.innerText = tabla[psc].enContra;
        crearPTS.innerText = tabla[psc].puntos;

        crearPuesto.append(crearPais, crearPG, crearPE, crearPP, crearGF, crearGC, crearPTS)
        nombreTabla.append(crearPuesto);
        psc++
    }
    document.getElementById(uno).innerText = primero;
    document.getElementById(dos).innerText = segundo;
    grNombre == 'TablaA'? (a1 = primero, a2 = segundo) :
    grNombre == 'TablaB'? (b1 = primero, b2 = segundo) :
    grNombre == 'TablaC'? (c1 = primero, c2 = segundo) :
    grNombre == 'TablaD'? (d1 = primero, d2 = segundo) :
    grNombre == 'TablaE'? (e1 = primero, e2 = segundo) :
    grNombre == 'TablaF'? (f1 = primero, f2 = segundo) :
    grNombre == 'TablaG'? (g1 = primero, g2 = segundo) :
    grNombre == 'TablaH'? (h1 = primero, h2 = segundo) : alert('en algo le erraste capo')

    tabla = []

}


/*---------------------------
POSICIONAR PAISES EN EL PODIO
---------------------------*/


let podio = () => {

    //TOMA DATOS DE tercerPuesto()  --- LINEA 334 ---

    puesto3[0] && isNaN(puesto3[0].golesA) && (puesto3[0].golesA = 0 , document.getElementById('tercerA1').value = 0)

    puesto3[0] && isNaN(puesto3[0].golesB) && (puesto3[0].golesB = 0 , document.getElementById('tercerB1').value = 0)

    puesto3[0] && puesto3[0].golesA >= puesto3[0].golesB? equipoTercero = puesto3[0].equipoA : equipoTercero = puesto3[0].equipoB;

    document.getElementById('tercero').innerHTML = `Tercero: ${equipoTercero}`


    //TOMA DATOS DE finaldeFinales() --- LINEA 351 ---
    
    final[0] && isNaN(final[0].golesA) && (final[0].golesA = 0 , document.getElementById('finalA1').value = 0)

    final[0] && isNaN(final[0].golesB) && (final[0].golesB = 0 , document.getElementById('finalB1').value = 0)

    final[0] && final[0].golesA >= final[0].golesB?
        (equipoCampeon = final[0].equipoA, equipoSubcampeon = final[0].equipoB) :
        (equipoCampeon = final[0].equipoB, equipoSubcampeon = final[0].equipoA);

    document.getElementById('campeon').innerHTML = `Campeon: ${equipoCampeon}`;
    document.getElementById('subcampeon').innerHTML = `Subcampeon: ${equipoSubcampeon}`;

    let buscandoEscudo = escudosPaises.filter(p => p.nacion.includes(equipoCampeon));
        buscandoEscudo.forEach((eqxeq) => {
        banderita = eqxeq.escudo
        });
    Swal.fire({
        title: equipoCampeon,
        text: 'Campeon',
        imageUrl: banderita,
        imageWidth: 90,
        confirmButtonText: 'OK'
        })
    
}
/*----------------------
CARGAR DATOS DEL STORAGE
----------------------*/


const cargarDatos = () => {
    if(localStorage.confirmA){
        for(i = 0; i < 6 ; i++)
        {
            let match = JSON.parse(localStorage.getItem(`resultxPartA${i}`))
    
            document.querySelector(`#AgolA${i}`).value = match.goalA;
            document.querySelector(`#AgolB${i}`).value = match.goalB;
        }
        grNombre = 'TablaA'
        rest(nombreGrupo = 'A', grupete = partidosDeGrupoA, grupo = grupoA)
        acomodarTabla(grNombre, uno= 'a1', dos= 'a2')
    }
    if(localStorage.confirmB){
        for(i = 0; i < 6 ; i++)
        {
            let match = JSON.parse(localStorage.getItem(`resultxPartB${i}`))
    
            document.querySelector(`#BgolA${i}`).value = match.goalA;
            document.querySelector(`#BgolB${i}`).value = match.goalB;
        }
        grNombre = 'TablaB'
        rest(nombreGrupo = 'B', grupete = partidosDeGrupoB, grupo = grupoB)
        acomodarTabla(grNombre, uno= 'b1', dos= 'b2')
    }
    if(localStorage.confirmC){
        for(i = 0; i < 6 ; i++)
        {
            let match = JSON.parse(localStorage.getItem(`resultxPartC${i}`))
    
            document.querySelector(`#CgolA${i}`).value = match.goalA;
            document.querySelector(`#CgolB${i}`).value = match.goalB;
        }
        grNombre = 'TablaC'
        rest(nombreGrupo = 'C', grupete = partidosDeGrupoC, grupo = grupoC)
        acomodarTabla(grNombre, uno= 'c1', dos= 'c2')
    }
    if(localStorage.confirmD){
        for(i = 0; i < 6 ; i++)
        {
            let match = JSON.parse(localStorage.getItem(`resultxPartD${i}`))
    
            document.querySelector(`#DgolA${i}`).value = match.goalA;
            document.querySelector(`#DgolB${i}`).value = match.goalB;
        }
        grNombre = 'TablaD'
        rest(nombreGrupo = 'D', grupete = partidosDeGrupoD, grupo = grupoD)
        acomodarTabla(grNombre, uno= 'd1', dos= 'd2')
    }
    if(localStorage.confirmE){
        for(i = 0; i < 6 ; i++)
        {
            let match = JSON.parse(localStorage.getItem(`resultxPartE${i}`))
    
            document.querySelector(`#EgolA${i}`).value = match.goalA;
            document.querySelector(`#EgolB${i}`).value = match.goalB;
        }
        grNombre = 'TablaE'
        rest(nombreGrupo = 'E', grupete = partidosDeGrupoE, grupo = grupoE)
        acomodarTabla(grNombre, uno= 'e1', dos= 'e2')
    }
    if(localStorage.confirmF){
        for(i = 0; i < 6 ; i++)
        {
            let match = JSON.parse(localStorage.getItem(`resultxPartF${i}`))
    
            document.querySelector(`#FgolA${i}`).value = match.goalA;
            document.querySelector(`#FgolB${i}`).value = match.goalB;
        }
        grNombre = 'TablaF'
        rest(nombreGrupo = 'F', grupete = partidosDeGrupoF, grupo = grupoF)
        acomodarTabla(grNombre, uno= 'f1', dos= 'f2')
    }
    if(localStorage.confirmG){
        for(i = 0; i < 6 ; i++)
        {
            let match = JSON.parse(localStorage.getItem(`resultxPartG${i}`))
    
            document.querySelector(`#GgolA${i}`).value = match.goalA;
            document.querySelector(`#GgolB${i}`).value = match.goalB;
        }
        grNombre = 'TablaG'
        rest(nombreGrupo = 'G', grupete = partidosDeGrupoG, grupo = grupoG)
        acomodarTabla(grNombre, uno= 'g1', dos= 'g2')
    }
    if(localStorage.confirmH){
        for(i = 0; i < 6 ; i++)
        {
            let match = JSON.parse(localStorage.getItem(`resultxPartH${i}`))
    
            document.querySelector(`#HgolA${i}`).value = match.goalA;
            document.querySelector(`#HgolB${i}`).value = match.goalB;
        }
        grNombre = 'TablaH'
        rest(nombreGrupo = 'H', grupete = partidosDeGrupoH, grupo = grupoH)
        acomodarTabla(grNombre, uno= 'h1', dos= 'h2')
    }
    if(localStorage.confirmOctavos){
        for(i = 0; i < 8 ; i = i + 2)
        {
            let match = JSON.parse(localStorage.getItem(`resultxOctavos${i}`))
    
            document.querySelector(`#octavosA${i + 1}`).value = match.goalA;
            document.querySelector(`#octavosB${i + 1}`).value = match.goalB;
            document.querySelector(`#octavosA${i + 2}`).value = match.goalC;
            document.querySelector(`#octavosB${i + 2}`).value = match.goalD;

            document.querySelector(`#cuartos-${i + 1}`).innerText = match.team1;
            document.querySelector(`#cuartos-${i + 2}`).innerText = match.team2;

        }
        octavosFinal()
    }
    if(localStorage.confirmCuartos){
        for(i = 0; i < 4 ; i = i + 2)
        {
            let match = JSON.parse(localStorage.getItem(`resultxCuartos${i}`))
    
            document.querySelector(`#cuartosA${i + 1}`).value = match.goalA;
            document.querySelector(`#cuartosB${i + 1}`).value = match.goalB;
            document.querySelector(`#cuartosA${i + 2}`).value = match.goalC;
            document.querySelector(`#cuartosB${i + 2}`).value = match.goalD;

            document.querySelector(`#semis-${i + 1}`).innerText = match.team1;
            document.querySelector(`#semis-${i + 2}`).innerText = match.team2;
        }
        cuartosFinal()
    }
    if(localStorage.confirmSemis){
            let match = JSON.parse(localStorage.getItem(`resultxSemis`))
    
            document.querySelector(`#semisA1`).value = match.goalA;
            document.querySelector(`#semisB1`).value = match.goalB;
            document.querySelector(`#semisA2`).value = match.goalC;
            document.querySelector(`#semisB2`).value = match.goalD;

            document.querySelector(`#final-1`).innerText = match.team1;
            document.querySelector(`#final-2`).innerText = match.team2;
            document.querySelector(`#tercer-1`).innerText = match.team3;
            document.querySelector(`#tercer-2`).innerText = match.team4;

        semisFinal()
    }

    if(localStorage.confirmTercer){
        let match = JSON.parse(localStorage.getItem(`resultxTercero`))

        document.querySelector(`#tercerA1`).value = parseInt(match.goalA);
        document.querySelector(`#tercerB1`).value = parseInt(match.goalB);
        puesto3.push(new playoff(tercerA, tercerB, parseInt(match.goalA), parseInt(match.goalB)))


    
}
if(localStorage.confirmFinal){
    let match = JSON.parse(localStorage.getItem(`resultxFinal`))

    document.querySelector(`#finalA1`).value = parseInt(match.goalA);
    document.querySelector(`#finalB1`).value = parseInt(match.goalB);
    final = []
    final.push(new playoff(finalA, finalB, parseInt(match.goalA), parseInt(match.goalB)))




}

}
/*---------------
BORRAR SIMULACION
---------------*/
let borrar = () => {
    localStorage.clear();
    location.reload();
}
