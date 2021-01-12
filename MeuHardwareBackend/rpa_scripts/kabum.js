const puppeteer = require('puppeteer');

module.exports = class Kabum{

   async run(link){

      const browser = await puppeteer.launch({
      headless: false,
      defaultViewport: null, 
      args: ['--start-maximized'] 
      });

      const page = await browser.newPage();
      await page.goto(link + '?pagina=1');

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

         await page.goto(link + '?pagina=' + i)      
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
            //setConnection(pageValues, hrefs[index], id_data)
         } catch (error) {
            console.log(error)
         }
         
      }
      
   await browser.close();
   connection.end();
   }
}
