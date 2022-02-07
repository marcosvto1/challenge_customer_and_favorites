import { Application } from 'express';
import { Server } from '@overnightjs/core';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';

import {createConnection} from "typeorm";
import { ormconfig } from "@/main/config/database";
import { makeCustomerControllers } from '@/main/factories/controllers/customer';
import { makeLoginController } from '@/main/factories/controllers/login';
import { makeWishlistControllers } from '@/main/factories/controllers/wishlist';

export class Startup extends Server {

  constructor(private port = 3000) {
    super();
  }
  
  public async init(): Promise<void> {
    this.setupExpress();
    this.setupControllers();
    await this.databaseSetup();
  }

  public setupExpress() {
    this.app.use(bodyParser.json())
    this.app.use(
      cors.default({
        origin: '*',
      })
    );
  }

  public setupControllers() {
    this.addControllers([
      ...makeWishlistControllers(),
      ...makeCustomerControllers(),
      makeLoginController(),
    ]);
       
  }

  public async databaseSetup() {
    await createConnection(ormconfig)
  }

  public start(): void {
    this.app.listen(this.port, () => {
      console.log('Server listening of port:' + this.port);
    });
  }

  public getApp(): Application {
    return this.app;
  }
}