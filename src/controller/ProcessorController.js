const {Service} = require('../services/Service')

exports.get = async (req, res, next) => {
    var result = []
    try{
        let service = new Service();
    
        await service.getAllProcessors().then((promise_result) => {
            result = promise_result
        })

        res.status(200).send(result);
    }catch(err){
        res.status(500).send({ message: err});
    }
};
