import { Address, beginCell, Cell, Contract, contractAddress, ContractProvider, Sender, SendMode } from '@ton/core';

export type UserContractConfig = {
    owner_address: Address;
    parent_address: Address;
    campaign_id: number;
    public_key: bigint;
};

export function userContractConfigToCell(config: UserContractConfig): Cell {
    return beginCell()
                .storeBit(0)
                .storeAddress(config.owner_address)
                .storeAddress(config.parent_address)
                .storeUint(config.campaign_id, 32)
                .storeUint(config.public_key, 256)
                .storeBit(0)
            .endCell();
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
