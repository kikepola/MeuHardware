const {DBConnection} = require('../../config/database')

export class Service {

    async getAll(){
        try {
            let db = new DBConnection();
            db.openConnection();
            
            var result = await db.execute(
                'SELECT * FROM GraphicCard'
            );

            db.closeConnection();      

            return result;            
        } catch (error) {
            console.log(error)
        }
    }

}