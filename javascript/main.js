let varnombreGrupo = ['A','B','C','D','E','F','G','H']
let vargrupo = [grupoA ,grupoB ,grupoC ,grupoD ,grupoE ,grupoF ,grupoG ,grupoH ]
let vargrupoIdent = ['grupoA' ,'grupoB' ,'grupoC' ,'grupoD' ,'grupoE' ,'grupoF' ,'grupoG' ,'grupoH' ]
let vargrupete = [partidosDeGrupoA ,partidosDeGrupoB ,partidosDeGrupoC ,partidosDeGrupoD ,partidosDeGrupoE ,partidosDeGrupoF ,partidosDeGrupoG ,partidosDeGrupoH ]

for (igroup = 0; igroup < 8; igroup++){
    nombreGrupo =  varnombreGrupo[igroup];
    grupo = vargrupo[igroup]
    grupoIdent = document.getElementById(vargrupoIdent[igroup])
    grupete = vargrupete[igroup]
    partidos();
    agregarPartidos();
}


/*-----------------------------------------------------------------------
            PROCESAMIENTO DE RESULTADOS PARTIDOS DE GRUPO
-----------------------------------------------------------------------*/

/*------
GRUPO A
------*/
document.getElementById('TablaA') && tablaInicial(grupoA, document.getElementById('TablaA'));
document.getElementById('resultados-A').addEventListener('click', () => rest(nombreGrupo = 'A', grupete = partidosDeGrupoA, grupo = grupoA))
document.getElementById('resultados-A').addEventListener('click', () => acomodarTabla(grNombre = 'TablaA', uno= 'a1', dos= 'a2'))

/*------
GRUPO B
------*/
document.getElementById('TablaB') && tablaInicial(grupoB, document.getElementById('TablaB'));
document.getElementById('resultados-B').addEventListener('click', () => rest(nombreGrupo = 'B', grupete = partidosDeGrupoA, grupo = grupoB))
document.getElementById('resultados-B').addEventListener('click', () => acomodarTabla(grNombre = 'TablaB', uno= 'b1', dos= 'b2'))

/*------
GRUPO C
------*/
document.getElementById('TablaC') && tablaInicial(grupoC, document.getElementById('TablaC'));
document.getElementById('resultados-C').addEventListener('click', () => rest(nombreGrupo = 'C', grupete = partidosDeGrupoA, grupo = grupoC))
document.getElementById('resultados-C').addEventListener('click', () => acomodarTabla(grNombre = 'TablaC', uno= 'c1', dos= 'c2'))

/*------
GRUPO D
------*/
document.getElementById('TablaD') && tablaInicial(grupoD, document.getElementById('TablaD'));
document.getElementById('resultados-D').addEventListener('click', () => rest(nombreGrupo = 'D', grupete = partidosDeGrupoA, grupo = grupoD))
document.getElementById('resultados-D').addEventListener('click', () => acomodarTabla(grNombre = 'TablaD', uno= 'd1', dos= 'd2'))

/*------
GRUPO E
------*/
document.getElementById('TablaE') && tablaInicial(grupoE, document.getElementById('TablaE'));
document.getElementById('resultados-E').addEventListener('click', () => rest(nombreGrupo = 'E', grupete = partidosDeGrupoA, grupo = grupoE))
document.getElementById('resultados-E').addEventListener('click', () => acomodarTabla(grNombre = 'TablaE', uno= 'e1', dos= 'e2'))

/*------
GRUPO F
------*/
document.getElementById('TablaF') && tablaInicial(grupoF, document.getElementById('TablaF'));
document.getElementById('resultados-F').addEventListener('click', () => rest(nombreGrupo = 'F', grupete = partidosDeGrupoA, grupo = grupoF))
document.getElementById('resultados-F').addEventListener('click', () => acomodarTabla(grNombre = 'TablaF', uno= 'f1', dos= 'f2'))

/*------
GRUPO G
------*/
document.getElementById('TablaG') && tablaInicial(grupoG, document.getElementById('TablaG'));
document.getElementById('resultados-G').addEventListener('click', () => rest(nombreGrupo = 'G', grupete = partidosDeGrupoA, grupo = grupoG))
document.getElementById('resultados-G').addEventListener('click', () => acomodarTabla(grNombre = 'TablaG', uno= 'g1', dos= 'g2'))

/*------
GRUPO H
------*/
document.getElementById('TablaH') && tablaInicial(grupoH, document.getElementById('TablaH'));
document.getElementById('resultados-H').addEventListener('click', () => rest(nombreGrupo = 'H', grupete = partidosDeGrupoA, grupo = grupoH))
document.getElementById('resultados-H').addEventListener('click', () => acomodarTabla(grNombre = 'TablaH', uno= 'h1', dos= 'h2'))

/*------
PLAY-OFF
------*/
document.getElementById('borrar').addEventListener('click', () => borrar())
document.getElementById('botonOctavos').addEventListener('click', () => octavosFinal())
document.getElementById('botonCuartos').addEventListener('click', () => cuartosFinal())
document.getElementById('botonSemis').addEventListener('click', () => semisFinal())
document.getElementById('botonFinal').addEventListener('click', () => tercerPuesto())
document.getElementById('botonFinal').addEventListener('click', () => finaldeFinales())
document.getElementById('botonFinal').addEventListener('click', () => podio())

cargarDatos();
puesto3[0] && final[0] && podio();
