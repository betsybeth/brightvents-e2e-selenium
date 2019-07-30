require( "dotenv" ).config();
require("chromedriver")
const { Builder,By, until } = require("selenium-webdriver")
const { expect } = require("chai")


const { DASHBOARD_URL,LOGIN_URL,USERNAME,
    EMAIL,
    PASSWORD, MAIN_URL } = process.env 

describe("login", () => {
  
   const driver = new Builder().forBrowser("chrome").build() 

   after( async () => {
    await driver.quit()
  }) 
 const login = async() => {     
    await driver.get(LOGIN_URL)
    await driver.wait(until.titleIs('Bright Events'), 1000);
    await driver.findElement(By.name("username")).sendKeys(EMAIL);
    await driver.findElement(By.name("password")).sendKeys(PASSWORD);
    await driver.findElement(By.xpath("/html[1]/body[1]/div[1]/div[1]/div[1]/main[1]/div[1]/div[1]/form[1]/div[3]/button[1]")).click()
    await driver.sleep(5000)
}
    it("unregistered user should be able to click on the sidenav", async() => {
    await driver.get(MAIN_URL)
    await driver.findElement(By.xpath("/html[1]/body[1]/div[1]/div[1]/div[1]/div[1]/header[1]/div[1]/button[1]/span[1]/*")).click()
    await driver.sleep(1000)
    await driver.findElement(By.xpath("//h3[contains(text(),'Login/Signup')]")).click()
    const dashboardUrl = await driver.wait(until.urlIs(LOGIN_URL)) 
    expect(dashboardUrl).to.equal(true)
    })

   it("user should register into the application", async() => {
       await driver.get(LOGIN_URL)
       await driver.findElement(By.xpath(" //a[contains(text(),'Sign up')]")).click()
       await driver.findElement(By.name("email")).sendKeys(EMAIL)
       await driver.findElement(By.xpath("//input[@placeholder='Full Name']")).sendKeys(USERNAME)
       await driver.findElement(By.xpath("//input[contains(@placeholder,'Strong Password')]")).sendKeys("jigsaw") 
       await driver.findElement(By.xpath("//button[@class='ui fluid primary button']")).click()
       const loginUrl = await driver.wait(until.urlIs(LOGIN_URL)) 
       expect(loginUrl ).to.equal(true)
       


   })
   
   it("user should login into the application", async() => {
    await driver.wait(until.titleIs('Bright Events'), 1000);
    await driver.findElement(By.name("username")).sendKeys("bethwambuimuniu@gmail.com");
    await driver.findElement(By.name("password")).sendKeys("jigsawing");
    await driver.findElement(By.xpath("/html[1]/body[1]/div[1]/div[1]/div[1]/main[1]/div[1]/div[1]/form[1]/div[3]/button[1]")).click()
    await driver.sleep(2000)
    const dashboardUrl = await driver.wait(until.urlIs(DASHBOARD_URL)) 
    expect(dashboardUrl ).to.equal(true)
   })
  
   
   //  identify why driver is not closing on this last test  
   it("user should logout the application", async() => {
    await login()
    await driver.findElement(By.xpath("/html[1]/body[1]/div[1]/div[1]/div[1]/div[1]/header[1]/div[1]/button[2]/span[1]/*")).click()
    await driver.findElement(By.xpath("//li[contains(text(),'Logout')]")).click()  
    await driver.sleep(2000)
    const dashboardUrl = await driver.wait(until.urlIs(MAIN_URL)) 
    expect(dashboardUrl).to.equal(true)
})
    
})

