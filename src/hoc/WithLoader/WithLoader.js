import React, { useEffect, useMemo, useState } from 'react';
import './WithLoader.css';

const WithLoader = (WrappedComponent, axios) => {
    

    return function Comp(props) {
        let time;
        let intercept;
        const [loader, setLoader] = useState(false);

        intercept = useMemo(() => {
            // clearTimeout(time);
            axios.interceptors.request.use((req) => {
                    setLoader(true);

                    // Условие чтобы остановить спиннер если ответ не приходит, проверрить при других обстоятельствах
                time = setTimeout(() => {
                    if (req.maxBodyLength === -1) {
                        setLoader(false);
                    };
                },3500);


                    return req;
                });

            axios.interceptors.response.use(resp => {
                        setLoader(false);
                        return resp;
                });
            clearTimeout(time);
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

