const puppeteer = require('puppeteer');
const fetch = require("node-fetch");

module.exports = class Kabum{

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
      await page.goto(storeUrl + '?pagina=1');

      var i = 1;
      var productsAvailable = await page.evaluate(() => {
         return document.getElementsByClassName("sc-fznZeY jLtPVV")[0] == undefined
      })

      while ( productsAvailable ){
         const products = await page.evaluate(() => {
            var products = [];
            var elements = document.getElementById("listagem-produtos")
            
            Array.from(elements.getElementsByClassName("sc-fzqARJ eITELq")).forEach((element) => {               
               var price = element.getElementsByClassName("sc-fznWqX qatGF")[0].innerText
               
               price = price.replace(".", "")
               price = price.replace(",", ".")
               price = price.replace("R$ ", "")
               
               products.push({
                  name: element.getElementsByClassName("sc-fzoLsD gnrNhT item-nome")[0].innerText,
                  image: element.getElementsByTagName("img")[0].src,
                  price: price,
                  link: element.getElementsByTagName("a")[0].href,
               })
            })               
            
            return products
         });

         var resultList = await products
         for(var index in resultList){

            console.log(id_data)

            var productData = {
               id_data: id_data,
               name: resultList[index].name,
               image: resultList[index].image,
               price: resultList[index].price,
               link: resultList[index].link,
               store_name: "Kabum",
            }
            console.log(productData)
            
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
         await page.goto(storeUrl + '?pagina=' + i)      
         i++

         productsAvailable = await page.evaluate(() => {
            return document.getElementsByClassName("sc-fznZeY jLtPVV")[0] == undefined
         })
      }
      
      await browser.close();
   }
}
