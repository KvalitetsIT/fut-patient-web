import { FetchArgs } from "@reduxjs/toolkit/dist/query";

class propsStuff {
    body?: any
}

export default function HandleQuery(args: FetchArgs & propsStuff): FetchArgs {
    args.body = JSON.stringify(args.body)

    return args;
}
