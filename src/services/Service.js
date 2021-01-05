const {DBConnection} = require('../../config/database')

export class Service {

    async getAllGraphicCard(){
        try {
            let db = new DBConnection();
            db.openConnection();
            
            var result = await db.execute(
                'SELECT gc.*'
                +' FROM GraphicCard as gc'
                +' INNER JOIN'
                +'     (SELECT MAX(id_data) AS max'
                +'     FROM GraphicCard) maxVal '
                +' ON gc.id_data = maxVal.max '
            );

            db.closeConnection();      

            return result;            
        } catch (error) {
            console.log(error)
        }
    }

    async getAllMotherBoard(){
        try {
            let db = new DBConnection();
            db.openConnection();
            
            var result = await db.execute(
                'SELECT gc.*'
                +' FROM MotherBoard as gc'
                +' INNER JOIN'
                +'     (SELECT MAX(id_data) AS max'
                +'     FROM MotherBoard) maxVal '
                +' ON gc.id_data = maxVal.max '
            );

            db.closeConnection();      

            return result;            
        } catch (error) {
            console.log(error)
        }
    }

    async getAllMemory(){
        try {
            let db = new DBConnection();
            db.openConnection();
            
            var result = await db.execute(
                'SELECT gc.*'
                +' FROM Memory as gc'
                +' INNER JOIN'
                +'     (SELECT MAX(id_data) AS max'
                +'     FROM Memory) maxVal '
                +' ON gc.id_data = maxVal.max '
            );

            db.closeConnection();      

            return result;            
        } catch (error) {
            console.log(error)
        }
    }

    async getAllProcessors(){
        try {
            let db = new DBConnection();
            db.openConnection();
            
            var result = await db.execute(
                'SELECT gc.*'
                +' FROM Processor as gc'
                +' INNER JOIN'
                +'     (SELECT MAX(id_data) AS max'
                +'     FROM Processor) maxVal '
                +' ON gc.id_data = maxVal.max '
            );

            db.closeConnection();      

            return result;            
        } catch (error) {
            console.log(error)
        }
    }

}