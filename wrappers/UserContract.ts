import { Address, beginCell, Cell, Contract, contractAddress, ContractProvider, Sender, SendMode } from '@ton/core';

export type UserContractConfig = {};

export function userContractConfigToCell(config: UserContractConfig): Cell {
    return beginCell().endCell();
}

export class UserContract implements Contract {
    constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {}

    static createFromAddress(address: Address) {
        return new UserContract(address);
    }

    static createFromConfig(config: UserContractConfig, code: Cell, workchain = 0) {
        const data = userContractConfigToCell(config);
        const init = { code, data };
        return new UserContract(contractAddress(workchain, init), init);
    }

    async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell().endCell(),
        });
    }
}
