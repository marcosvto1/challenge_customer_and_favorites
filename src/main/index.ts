import './config/module-alias';
import "reflect-metadata";
import { Startup } from "@/main/startup";



(async() => {
  try {
    const startup = new Startup(3000);
 //   console.log(startup)

    await startup.init();
    startup.start();
   // console.log('sdsdasdas')

  } catch (error) {
    console.log(error)
  }
})();