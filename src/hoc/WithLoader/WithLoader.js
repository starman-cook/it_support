import React, { useEffect, useMemo, useState } from 'react';
import './WithLoader.css';

const WithLoader = (WrappedComponent, axios) => {
    

    return function Comp(props) {
        let intercept;
        const [loader, setLoader] = useState(false);

        intercept = useMemo(() => {
            axios.interceptors.request.use((req) => {
                    setLoader(true);
                    return req;
                });
            axios.interceptors.response.use(resp => {
                    setLoader(false);
                    return resp;
                });
        }, []);



        useEffect(() => {
            return axios.interceptors.request.eject(intercept);
        }, []);
        useEffect(() => {
            return axios.interceptors.response.eject(intercept);
        }, []);

        return    (
            <>
                {!!loader ? <div> <div className='Hoc_loaderBG' /><div className='Hoc_loader' /></div> : null}
                <WrappedComponent {...props} />
            </>
        )
    }
};

export default WithLoader;

