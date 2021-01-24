const puppeteer = require('puppeteer');
const fetch = require("node-fetch");


module.exports = class Pichau{

   listFilter(list){
      return list.sort().filter(function(item, pos, ary) {
         return !pos || item != ary[pos - 1];
      });
   }

   async run(storeUrl, productUrl, id_data){
      const browser = await puppeteer.launch({
      headless: false,
      defaultViewport: null, 
      args: ['--start-maximized'] 
      });

      const page = await browser.newPage();
      await page.goto(storeUrl);

      var hrefs = [];
      var i = 1;
      var productsAvailable = true;

      while ( productsAvailable ){
         const productsList = await page.evaluate(() => {
            var products = [];
            var elements = document.getElementsByClassName("products wrapper grid products-grid")[0].getElementsByClassName("item product product-item")

            Array.from(elements).forEach((element) => {
               if(element.getElementsByClassName("stock unavailable")[0] == undefined){
                  var price = element.getElementsByClassName("price-boleto")[0].getElementsByTagName("span")[0].innerText;
                  price = price.replace(".", "")
                  price = price.replace(",", ".")
                  price = price.replace("à vista R$", "")

                  products.push(
                     {
                        name: element.getElementsByTagName("a")[1].innerText,
                        image: element.getElementsByTagName("img")[0].src,
                        price: price,
                        link: element.getElementsByTagName("a")[0].href,                     
                     }
                  );
               }               
            })               
            
            return products;
         });

         var resultList = await productsList
         console.log(resultList)
         for(var result in resultList){
            var pageValues = resultList[result]

            var productData = {
               id_data: id_data,
               name: pageValues.name,
               image: pageValues.image,
               price: pageValues.price,
               link: pageValues.link,
               store_name: "Pichau",
            }
            
            await fetch(productUrl, {
               method: 'POST',
               headers: {
                 'Accept': 'application/json',
                 'Content-Type': 'application/json'
               },
               body: JSON.stringify(productData)
            }).then(() => console.log("OK!"))
            .catch((error) => console.log(error))

         }

         await page.goto(storeUrl + '?p=' + i)      
         i++

         productsAvailable = await page.evaluate(() => {
            return document.getElementsByClassName("stock unavailable")[0] == undefined
         })
      }

      await browser.close();
   }
}