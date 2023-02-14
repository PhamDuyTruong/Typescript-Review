import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useMeQuery } from '../generated/graphql';
export const useCheckAuth = () => {
    const router = useRouter();
    const {data, loading} = useMeQuery();
    useEffect(() => {
        if(!loading && data?.me && (router.route === '/Login' || router.route === "/Register")){
            router.replace('/');
        }else if(!data?.me){
            router.replace("/login");
        }
    }, [data, loading, router]);

    return {data, loading};
}