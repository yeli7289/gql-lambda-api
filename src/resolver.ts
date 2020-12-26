import { getPolls } from "./poll/pollService";
import { getUserWithId, verifyAccount } from "./user/userService";

export const resolvers: any = {
    Query: {
      async getUserInfo(_: any, args: { id: string }) {
        return await getUserWithId(args.id);
      },

      async verifyAccount(_: any, args: { account: string, password: string }) {
        return await verifyAccount(args.account, args.password);
      },

      async getPolls(_:any, args: { ids: string[] }) {
        return await getPolls(args.ids);
      },

      async getPoll(_:any, args: { id: string }) {
        let polls = await getPolls([args.id]);
        return polls[0];
      }
    }
};