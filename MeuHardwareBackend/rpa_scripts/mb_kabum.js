const puppeteer = require('puppeteer');
var mysql = require('mysql');

var connection = mysql.createConnection({
   host     : process.env.RDS_HOSTNAME,
   user     : process.env.RDS_USERNAME,
   password : process.env.RDS_PASSWORD,
   port     : process.env.RDS_PORT,
   database : process.env.RDS_DATABASE
 });

const setConnection = (data, href, id_data) => {
   connection.query(
      "INSERT INTO MotherBoard"
      +"(id_data, name, price, img_path, link, execution_date, store_name) VALUES"
      +"("+id_data+", '"+data.name+"', "+data.price+", '"+data.image+"', '"+href+"', NOW(), 'Kabum')"
   )
}


const getIdData = () => {
   return new Promise((resolve, reject) => {
      connection.query("Select Max(id_data) as id_data from MotherBoard where store_name like 'Kabum'",
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
   await page.goto('https://www.kabum.com.br/hardware/placas-mae?pagina=1');

   var hrefs = [];
   var i = 1;
   var productsAvailable = await page.evaluate(() => {
      return document.getElementsByClassName("sc-fznZeY jLtPVV")[0] == undefined
   })

   while ( productsAvailable ){
      const pageHrefs = await page.evaluate(() => {
         var link_list = [];
         var elements = document.getElementById("listagem-produtos")
         
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

      await page.goto('https://www.kabum.com.br/hardware/placas-mae?pagina=' + i)      
      i++

      productsAvailable = await page.evaluate(() => {
         return document.getElementsByClassName("sc-fznZeY jLtPVV")[0] == undefined
      })
   }

   console.log("Antes: " + hrefs.length)
   hrefs = await listFilter(hrefs)
   console.log("Depois: " + hrefs.length)

   for(var index in hrefs){
      await page.goto(hrefs[index])
      try {
         const pageValues = await page.evaluate(() => {      

            var price = ""         
            try {
               price = document.getElementsByClassName("preco_desconto_avista-cm")[0].innerText.replace("R$", "")
            } catch (error) {
               price = document.getElementsByClassName("preco_desconto")[0].getElementsByTagName("strong")[0].innerText.replace("R$", "")
            }

            price = price.replace(".", "")
            price = price.replace(",", ".")

            return {
               name: document.getElementsByClassName("titulo_det")[0].innerText, 
               image: document.getElementsByClassName("imagem_produto_descricao")[0].src,
               price: price.replace("R$", "")                 
            };
         });
         console.log(pageValues)
         setConnection(pageValues, hrefs[index], id_data)
      } catch (error) {
         console.log(error)
      }
      
   }
   
  await browser.close();
  connection.end();
})();