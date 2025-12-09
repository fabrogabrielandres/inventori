import { QueryClient, isServer } from "@tanstack/react-query"


function MakeQueryClient() {
    return new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 1000 * 60 * 5,
                refetchOnWindowFocus: false,
            },
        }
    });

}

let queryClient: QueryClient | undefined = undefined;

export const getQueryClient = () => {
    if (isServer) {
        return MakeQueryClient();
    } else {
        if (!queryClient) queryClient = MakeQueryClient();
        return queryClient;
    }

}