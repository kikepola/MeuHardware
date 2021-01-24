const {DBConnection} = require('../../config/database')

export class Service {

    async getAllGraphicCard(){
        try {
            let db = new DBConnection();
            db.openConnection();
            
            var result = await db.execute(
                'SELECT * FROM GraphicCardView'
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
                'SELECT * FROM MotherBoardView'
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
                'SELECT * FROM MemoryView'
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
                'SELECT * FROM ProcessorView'
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
                `Select Max(id_data) + 1 as id_data from GraphicCard`
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

            var productTableName = ""
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
                +`('${product.id_data}', '${product.name}',`
                +` '${product.price}', '${product.image}', `
                +` '${product.link}', NOW(), '${product.store_name}')`
            );

            db.closeConnection();      

            return result;            
        } catch (error) {
            console.log(error)
        }
    }

}