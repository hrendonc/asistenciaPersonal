let registro = []

const btnRegistro = document.getElementById('btnRegistro')
const tBody = document.getElementById('regs')
const template = document.getElementById('template').content
const fragment = document.createDocumentFragment()

document.addEventListener('DOMContentLoaded', ()=>{
    if (localStorage.getItem('misRegistros')) {
        registro = JSON.parse(localStorage.getItem('misRegistros'))
    }
    pintarRegs()
})

const pintarRegs = ()=>{
    tBody.innerHTML=''
    
    registro.map(dato=>{
        const clone = template.cloneNode(true)

        clone.querySelector('th').textContent = `${dato.fecha}`
        clone.querySelectorAll('td')[0].textContent = `${dato.entrada ? dato.entrada : "SIN REGISTRAR!"}`
        clone.querySelectorAll('td')[1].textContent = `${dato.salida ? dato.salida : "SIN REGISTRAR!"}`
        
        fragment.appendChild(clone)
     })
     tBody.appendChild(fragment)
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

    addFecha=addFecha+2
    
    registro.map(x=>{
        if (x.fecha == addFecha) { //Si ya existe un registro en el día actual
            existe = true
            if (!x.salida && (data.hora == 9) && (data.minuto >= 54 && data.minuto <= 54)) { //Salida: 15:30-59
                x.salida = addHora
                alert('Se registró la Salida!')
            }else{
                if(x.entrada){
                    if (data.hora == 9 && (data.minuto >= 58 && data.minuto <= 58)) { //Entrada: 8:0-30
                        alert('Su Entrada ya está registrada!')
                        return
                    }
                }
                 if(x.salida) {
                    alert('Ya está registrada su salida!')
                 }else{
                    alert('El registro de SALIDA está fuera de tiempo!')
                }

            }         
        }        
    })

    if (!existe) {  // Si no existe un registro en el día actual
        let addEntrada = {
            fecha: addFecha,
            entrada: addHora
        }

        let addSalida = {
            fecha: addFecha,
            salida: addHora
        }

        if (data.hora == 9 && (data.minuto >= 58 && data.minuto <= 58)) { //Entrada: 8:0-30
            registro.push(addEntrada)
            alert('Se registró la Entrada!')
            return
        }else{
            alert('El registro de ENTRADA está fuera de tiempo!')

        }

        if (data.hora == 9 && (data.minuto >= 54 && data.minuto <= 54)) { //Salida: 15:30-59
            registro.push(addSalida)
            alert('Se registró la Salida, pero NO la Entrada!')
        }else{
            alert('El registro de SALIDA está fuera de tiempo!')
        }
    }    
}
