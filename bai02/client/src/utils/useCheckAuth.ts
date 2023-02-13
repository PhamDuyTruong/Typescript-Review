import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useMeQuery } from '../generated/graphql';
export const useChekAuth = () => {
    const router = useRouter();
    const {data, loading} = useMeQuery();
    useEffect(() => {
        if(!loading && data?.me && (router.route === '/Login' || router.route === "/Register")){
            router.replace('/');
        }
    }, [data, loading, router]);

    return {data, loading};
}