let registro = [
    {
        fecha: 2022228,
        entrada: "8:00",
        salida: "15:30"
    }
]

const btnRegistro = document.getElementById('btnRegistro')
const tBody = document.getElementById('regs')

document.addEventListener('DOMContentLoaded', ()=>{
    if (localStorage.getItem('misRegistros')) {
        registro = JSON.parse(localStorage.getItem('misRegistros'))
    }
    pintarRegs()
})

const pintarRegs = ()=>{
    tBody.innerHTML=''
    
    registro.map(dato=>{
        if(dato.salida == undefined) dato.salida="Sin registrar"
        const lista = document.createElement('tr')
        const dato1 = document.createTextNode(`${dato.fecha}`)
        const dato2 = document.createTextNode(`${dato.entrada}`)
        const dato3 = document.createTextNode(`${dato.salida}`)
        const item1 = document.createElement('td')
        const item2 = document.createElement('td')
        const item3 = document.createElement('td')
        item1.appendChild(dato1)
        item2.appendChild(dato2)
        item3.appendChild(dato3)
        lista.appendChild(item1)
        lista.appendChild(item2)
        lista.appendChild(item3)
        tBody.appendChild(lista)        
     })
}

btnRegistro.addEventListener('click', e=>{
    e.preventDefault()
       
    addRegistro()
    localStorage.setItem('misRegistros', JSON.stringify(registro))
    pintarRegs()

    e.stopPropagation()
})

const addRegistro = ()=>{
    const fecha = new Date()
    const data = {
        año : fecha.getFullYear(),
        mes : fecha.getMonth() +1,
        dia : fecha.getDate(),
        hora : fecha.getHours(),
        minuto : fecha.getMinutes(),
        segundo : fecha.getSeconds()
    }
    let addFecha = (`${data.año}${data.mes}${data.dia}`)
    let addHora = (`${data.hora}:${data.minuto}:${data.segundo}`)
    let existe = false
    
    registro.map(x=>{
        if (x.fecha == addFecha) {
            existe = true
            if (!x.salida && (data.hora == 15) && (data.minuto >= 30 && data.minuto <= 59)) { //Salida: 15:30-59
                x.salida = addHora
                alert('Se registro la Salida!')
            }else{
                if(x.entrada){
                    if (data.hora == 8 && (data.minuto >= 0 && data.minuto <= 30)) { //Entrada: 8:0-30
                        alert('Su Entrada ya está registrada!')
                        return
                    }
                }
                if(x.salida != "Sin registrar") {
                    alert('Ya está registrada su salida!')
                }else{
                    alert('El registro de SALIDA está fuera de tiempo!')
                }

            }         
        }
    })

    if (!existe) {
        let addEntrada = {
            fecha: addFecha,
            entrada: addHora
        }

        let addSalida = {
            fecha: addFecha,
            salida: addHora
        }

        if (data.hora == 8 && (data.minuto >= 0 && data.minuto <= 30)) { //Entrada: 8:0-30
            registro.push(addEntrada)
            alert('Se registro la Entrada!')
            return
        }else{
            alert('El registro de ENTRADA está fuera de tiempo!')
        }

        if (data.hora == 15 && (data.minuto >= 30 && data.minuto <= 59)) { //Salida: 15:30-59
            registro.push(addSalida)
            alert('Se registró la Salida, pero no la Entrada!')
        }else{
            alert('El registro de SALIDA está fuera de tiempo!')
        }
    }
}
