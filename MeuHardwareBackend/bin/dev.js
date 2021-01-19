const Kabum = require('../rpa_scripts/kabum');
const Pichau = require('../rpa_scripts/pichau');
const Terabyte = require('../rpa_scripts/terabyte');

require('dotenv/config')


const kabum = new Kabum();
kabum.run(
    'https://www.kabum.com.br/hardware/processadores',
    'http://localhost:8080/processor'
)

//const pichau = new Pichau()
//pichau.run('https://www.pichau.com.br/hardware/placa-m-e') 

//const terabyte = new Terabyte()
//terabyte.run('https://www.terabyteshop.com.br/hardware/placas-mae') 

//require('./../rpa_scripts/gpu_kabum')
//require('./../rpa_scripts/gpu_pichau')

//require('./../rpa_scripts/cpu_kabum')
//require('./../rpa_scripts/cpu_pichau')

//require('./../rpa_scripts/mb_kabum')
//require('./../rpa_scripts/mb_pichau')

//require('./../rpa_scripts/memory_kabum')
//require('./../rpa_scripts/memory_pichau')

