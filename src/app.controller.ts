import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    //   @Get()
    //   getHello(): string {
    //     return this.appService.getHello();
    //   }

    @Get('/wallet')
    createWallet(): any {
        return this.appService.createWallet();
    }

    @Get('/balance')
    balance(): any {
        return this.appService.balance();
    }

    @Get('/airDrop')
    airDrop(): any {
        return this.appService.airDropSol();
    }

    @Get('/transfer')
    transfer(): any {
        return this.appService.transfer();
    }

    @Get('/accounts')
    getAccounts(): any {
        return this.appService.getAccount();
    }
}
