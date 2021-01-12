const puppeteer = require('puppeteer');
var mysql = require('mysql');

var connection = mysql.createConnection({
   host     : process.env.RDS_HOSTNAME,
   user     : process.env.RDS_USERNAME,
   password : process.env.RDS_PASSWORD,
   port     : process.env.RDS_PORT,
   database : process.env.RDS_DATABASE
 });

const setConnection = (data, id_data) => {
   connection.query(
      "INSERT INTO Processor"
      +"(id_data, name, price, img_path, link, execution_date, store_name) VALUES"
      +"("+id_data+", '"+data.name+"', "+data.price+", '"+data.image+"', '"+data.href+"', NOW(), 'Terabyte')"
   )
}


const getIdData = () => {
   return new Promise((resolve, reject) => {
      connection.query("Select IFNULL(Max(id_data), 0) as id_data from Processor where store_name like 'Terabyte'",
       (err, res) => {
       err ? reject(err) : resolve(res)
     })
   })
 }

const listFilter = (list) => {
   return list.sort().filter(function(item, pos, ary) {
      return !pos || item != ary[pos - 1];
  });
}

(async () => {
   connection.connect(function(err) {
      if (err) {
         console.error('Database connection failed: ' + err.stack);
         return;
      }

      console.log('Connected to database.');
   });

   var id_data = 0;
   await getIdData().then((value) => {
      if(value[0].id_data != 0){
         id_data = value[0].id_data + 1
      }
   })

   const browser = await puppeteer.launch({
     headless: false,
     defaultViewport: null, 
     args: ['--start-maximized'] 
   });

   const page = await browser.newPage();
   await page.goto('https://www.terabyteshop.com.br/hardware/processadores');

   var products = await page.evaluate(() => {
      var productsList = []
      var elements = document.getElementById("prodarea").getElementsByClassName("commerce_columns_item_inner")

      Array.from(elements).forEach((element) => {
         if(element.getElementsByClassName("tbt_esgotado")[0] == undefined){

            var price = element.getElementsByClassName("prod-new-price")[0]
            .getElementsByTagName("span")[0].innerText.replace("R$", "")

            price = price.replace(".", "")
            price = price.replace(",", ".")
            price = price.replace(" ", "")

            productsList.push(
               {               
                  name: element.getElementsByTagName("a")[0].title.replace(",", ""), 
                  image: element.getElementsByTagName("img")[0].src,
                  price: price,
                  href: element.getElementsByTagName("a")[0].href             
               }
            )
         }        
      }) 

      return productsList
   });
   
   var result = await products

   result.forEach((product) => {
      setConnection(product, id_data)
      console.log(product)
   });

   await browser.close();
})();