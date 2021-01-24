const Kabum = require('../rpa_scripts/kabum');
const Pichau = require('../rpa_scripts/pichau');
const Terabyte = require('../rpa_scripts/terabyte');
const fetch = require("node-fetch");

require('dotenv/config')
var baseUrl = 'http://localhost:8080'

const runKabum = async (id_data) => {
    const kabum = new Kabum();
    
    await kabum.run(
        'https://www.kabum.com.br/hardware/processadores',
        baseUrl + '/processor',
        id_data
    )

    await kabum.run(
        'https://www.kabum.com.br/hardware/placa-de-video-vga',
        baseUrl + '/graphiccard',
        id_data
    )

    await kabum.run(
        'https://www.kabum.com.br/hardware/placas-mae',
        baseUrl + '/motherboard',
        id_data
    )

    await kabum.run(
        'https://www.kabum.com.br/hardware/memoria-ram',
        baseUrl + '/memory',
        id_data
    )
}

const runPichau = async (id_data) => {
    const pichau = new Pichau()
    /*
    await pichau.run(
        'https://www.pichau.com.br/hardware/placa-m-e', 
        baseUrl + '/motherboard',
        id_data
    )

    await pichau.run(
        'https://www.pichau.com.br/hardware/processadores', 
        baseUrl + '/processor',
        id_data
    ) 
    */
    await pichau.run(
        'https://www.pichau.com.br/hardware/placa-de-video', 
        baseUrl + '/graphiccard',
        id_data
    ) 
    /*
    await pichau.run(
        'https://www.pichau.com.br/hardware/memorias', 
        baseUrl + '/memory',
        id_data
    ) 
    */
}

const runTerabyte = async (id_data) => {
    const terabyte = new Terabyte()

    await terabyte.run(
        'https://www.terabyteshop.com.br/hardware/placas-mae',
        baseUrl + '/motherboard',
        id_data
    ) 

    await terabyte.run(
        'https://www.terabyteshop.com.br/hardware/placas-de-video',
        baseUrl + '/graphiccard',
        id_data
    ) 

    await terabyte.run(
        'https://www.terabyteshop.com.br/hardware/processadores',
        baseUrl + '/processor',
        id_data
    ) 

    await terabyte.run(
        'https://www.terabyteshop.com.br/hardware/memorias',
        baseUrl + '/memory',
        id_data
    ) 
}


const run = async () => {  
    var id_data = 0

    await fetch(baseUrl + '/id')
    .then((response) => response.json())
    .then((result) => {
        id_data = result.id_data
    }).catch((error) => {
        console.log(error)
    })

    //runKabum(id_data)
    runPichau(id_data)
    //runTerabyte(id_data)
}

run()



