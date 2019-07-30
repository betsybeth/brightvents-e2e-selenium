

//work on invalid token 
require("chromedriver")
const login  = require("../Login/login")
const { Builder, By } = require("selenium-webdriver")
describe("dashboard", () => {
   const driver = new Builder().forBrowser("chrome").build()
   after(async () => {
    await driver.quit()
   })

   it("should add an event", async() => {
    console.log("fkjfjfd",login )
       await driver.findElement(By.xpath("//button[@class='ui labeled icon right floated button']")).click()
   })
    
})