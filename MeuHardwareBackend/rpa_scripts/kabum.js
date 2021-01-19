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

         await page.goto(storeUrl + '?pagina=' + i)      
         i++

         productsAvailable = await page.evaluate(() => {
            return document.getElementsByClassName("sc-fznZeY jLtPVV")[0] == undefined
         })
      }

      console.log("Antes: " + hrefs.length)
      hrefs = await this.listFilter(hrefs)
      console.log("Depois: " + hrefs.length)

      for(var index in hrefs){
         console.log(hrefs[index])
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

            var productData = {
               id_data: id_data,
               name: pageValues.name,
               image: pageValues.image,
               price: pageValues.price,
               link: hrefs[index],
               store_name: "Kabum",
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

         } catch (error) {
            console.log(error)
         }
         
      }
      
      await browser.close();
   }
}
