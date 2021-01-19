const {Service} = require('../services/Service')

exports.get = async (req, res, next) => {
    var result = []
    try{
        let service = new Service();
    
        await service.getAllGraphicCard().then((promise_result) => {
            result = promise_result
        })

        res.status(200).send(result);
    }catch(err){
        res.status(500).send({ message: err});
    }
};

exports.post = async (req, res, next) => {

    let service = new Service();
    
    await service.insertProduct(req.body, 0).then(() => {
        res.status(200).send(result);
    }).catch((error) => {
        res.status(500).send({ message: error});
    })
        
};
