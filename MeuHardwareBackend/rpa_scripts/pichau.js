const puppeteer = require('puppeteer');
var mysql = require('mysql');

var connection = mysql.createConnection({
   host     : process.env.RDS_HOSTNAME,
   user     : process.env.RDS_USERNAME,
   password : process.env.RDS_PASSWORD,
   port     : process.env.RDS_PORT,
   database : process.env.RDS_DATABASE
 });

const setConnection = (data, href) => {
   connection.query(
      "INSERT INTO GraphicCard"
      +"(name, price, img_path, link, execution_date, store_name) VALUES"
      +"('"+data.name+"', "+data.price+", '"+data.image+"', '"+href+"', NOW(), 'Pichau')"
   )
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

   const browser = await puppeteer.launch({
     headless: false,
     defaultViewport: null, 
     args: ['--start-maximized'] 
   });

   const page = await browser.newPage();
   await page.goto('https://www.pichau.com.br/hardware/placa-de-video');

   var hrefs = [];
   var i = 1;
   var productsAvailable = await page.evaluate(() => {
      return document.getElementsByClassName("stock unavailable")[0] == undefined
   })

   while ( productsAvailable ){
      const pageHrefs = await page.evaluate(() => {
         var link_list = [];
         var elements = document.getElementsByClassName("products wrapper grid products-grid")[0]
         
         Array.from(elements.getElementsByTagName("a")).forEach((element) => {
            link_list.push(element.href);
         })               
         
         return {
            elements: link_list,      
         };
      });

      var resultList = await pageHrefs
      for(var result in resultList.elements){
         hrefs.push(resultList.elements[result])
      }

      await page.goto('https://www.pichau.com.br/hardware/placa-de-video?p=' + i)      
      i++

      productsAvailable = await page.evaluate(() => {
         return document.getElementsByClassName("stock unavailable")[0] == undefined
      })
   }

   console.log("Antes: " + hrefs.length)
   hrefs = await listFilter(hrefs)
   console.log("Depois: " + hrefs.length)

   for(var index in hrefs){
      await page.goto(hrefs[index])
      try {
         const pageValues = await page.evaluate(() => {      

            var price = document.getElementsByClassName("price-boleto")[0]
               .getElementsByTagName("span")[0].innerText.replace("à vista R$", "")

            price = price.replace(".", "")
            price = price.replace(",", ".")
   
            return {
               name: document.getElementsByClassName("product title")[0].getElementsByTagName("h1")[0].innerText, 
               image: document.getElementsByClassName("fotorama__img")[0].src,
               price: price               
            };

         });
         console.log(pageValues)
         setConnection(pageValues, hrefs[index])
      } catch (error) {
         console.log(error)
      }      
   }
   
  await browser.close();
  connection.end();
})();