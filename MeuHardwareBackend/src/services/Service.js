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

    async insertGraphicCard(graphiccard){
        try {
            let db = new DBConnection();
            db.openConnection();
            
            var result = await db.execute(
                `INSERT INTO GraphicCard`
                +`  (id_data, name,`
                +`   price, img_path,`
                +`    link, execution_date,`
                +`    store_name) `
                +`VALUES `
                +`('${graphiccard.id_data}', '${graphiccard.name}',`
                +` '${graphiccard.price}', '${graphiccard.image}', `
                +` '${graphiccard.link}', NOW(), '${graphiccard.store_name}')`
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

    async insertMotherBoard(motherboard){
        try {
            let db = new DBConnection();
            db.openConnection();
            
            var result = await db.execute(
                `INSERT INTO MotherBoard`
                +`  (id_data, name,`
                +`   price, img_path,`
                +`    link, execution_date,`
                +`    store_name) `
                +`VALUES `
                +`('${motherboard.id_data}', '${motherboard.name}',`
                +` '${motherboard.price}', '${motherboard.image}', `
                +` '${motherboard.link}', NOW(), '${motherboard.store_name}')`
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

    async insertMemory(memory){
        try {
            let db = new DBConnection();
            db.openConnection();
            
            var result = await db.execute(
                `INSERT INTO Memory`
                +`  (id_data, name,`
                +`   price, img_path,`
                +`    link, execution_date,`
                +`    store_name) `
                +`VALUES `
                +`('${memory.id_data}', '${memory.name}',`
                +` '${memory.price}', '${memory.image}', `
                +` '${memory.link}', NOW(), '${memory.store_name}')`
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

    async insertProcessors(processor){
        try {
            let db = new DBConnection();
            db.openConnection();
            
            var result = await db.execute(
                `INSERT INTO Memory`
                +`  (id_data, name,`
                +`   price, img_path,`
                +`    link, execution_date,`
                +`    store_name) `
                +`VALUES `
                +`('${processor.id_data}', '${processor.name}',`
                +` '${processor.price}', '${processor.image}', `
                +` '${processor.link}', NOW(), '${processor.store_name}')`
            );

            db.closeConnection();      

            return result;            
        } catch (error) {
            console.log(error)
        }
    }

    async getIdData(){
        try {
            let db = new DBConnection();
            db.openConnection();
            
            var result = await db.execute(
                `Select Max(id_data) as id_data from GraphicCard `
                +`where store_name like 'Kabum'`
            );

            db.closeConnection();      

            return result;            
        } catch (error) {
            console.log(error)
        }
    }

}