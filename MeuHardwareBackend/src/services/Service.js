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

    async insertProduct(product, productCode){
        try {
            let db = new DBConnection();
            db.openConnection();

            productTableName = ""
            switch (productCode) {
                case 0:
                    productTableName = "GraphicCard"
                    break;
                case 1:
                    productTableName = "Processor"
                    break;
                case 2:
                    productTableName = "MotherBoard"
                    break;
                case 3:
                    productTableName = "Memory"
                    break;
                default:
                    break;
            }
            
            var result = await db.execute(
                `INSERT INTO ` + productTableName
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

}