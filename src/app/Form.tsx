'use client'

import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {PhoneInput} from 'react-international-phone';
import 'react-international-phone/style.css';
import {useEffect, useState} from "react";
import clsx from 'clsx'


export interface FormData {
    phone: string
}

type GeoState = {
    lat: string;
    lang: string;
};


export default function Form() {

    const [location, setLocation] = useState<any>({
        loaded: false,
        coordinates: {lat: "", lng: ""}
    });

    const onSuccess = (location: any) => {
        setLocation({
            loaded: true,
            coordinates: {
                lat: location.coords.latitude,
                lng: location.coords.longitude
            }
        });
    };


    const onError = (error: any) => {
        setLocation({
            loaded: true,
            error,
        });
    };


    useEffect(() => {
        if (!("geolocation" in navigator)) {
            onError({
                code: 0,
                message: "Геолокация не поддерживается вашим браузером"
            });
        }


    }, []);


    const checkGeoPosition = () => {
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }

    const {
        control,
        reset,
        handleSubmit,
        formState: {errors},
    } = useForm<FormData>()
    const onSubmit: SubmitHandler<FormData> = (data) => {
        const user = {...data, ...location.coordinates}
        console.log(user)
        reset()
        setLocation({
            loaded: false,
            coordinates: {lat: "", lng: ""}
        })
        alert(JSON.stringify(user))
    }

    const SEND_GEO: boolean = !location.loaded && location.coordinates?.lat === ''
    const ERROR_GEO: boolean = location.loaded && location.error
    const SUCCESS_GEO: boolean = location.loaded && location.coordinates?.lat !== '' && !location.error

    return <div className={' max-w-[400px] mt-4 w-full bg-white/70 rounded-md'}>
        <form onSubmit={handleSubmit(onSubmit)}
              className={'m-auto px-2 py-4 flex justify-start flex-col items-center rounded-md'}>
            <h2 className={'text-3xl font-bold text-black/80 '}>Телефон для связи</h2>
            <Controller
                control={control}
                name="phone"
                rules={{required: true, pattern: /^(\+375|80)(29|25|44|33)(\d{3})(\d{2})(\d{2})$/}}
                render={({field: {onChange, value}}) => (
                    <PhoneInput
                        className={'font-bold mt-5'}
                        inputClassName={'w-full'}
                        hideDropdown
                        disableFormatting
                        value={value}
                        onChange={onChange}
                        defaultCountry="by"
                        placeholder="Введите номер телефона"
                    />
                )}
            />
            {errors.phone &&
                <p className={'text-white max-w-[210px] text-[11px]  font-bold bg-red-500 mt-2 px-2 py-1 rounded-md flex items-center shadow-md'}>
                    <span className={'text-3xl mr-2'}>☝️</span>Проверьте номер телефона</p>
            }


            <div
                className={clsx('mt-3 max-w-[210px] w-full text-[13px] flex items-center p-1 rounded-md cursor-pointer font-bold', ERROR_GEO && 'bg-red-400', location.loaded && location.coordinates ? 'bg-green-600' : 'bg-orange-400')}
                onClick={checkGeoPosition}><span
                className={'text-3xl mr-2'}>
                {SEND_GEO && '🗺️'}
                {ERROR_GEO && '😔'}
                {SUCCESS_GEO && '👍'}
            </span>
                {ERROR_GEO && 'Не удалось определить'}
                {SEND_GEO && 'Отправить координаты'}
                {SUCCESS_GEO && 'Координаты получены'}
            </div>
            <span
                className={'text-black/40 underline text-[11px]'}>
                {SEND_GEO && 'необязательно'}
                {ERROR_GEO && 'отправьте только номер телефона'}
                {SUCCESS_GEO && 'незабудьте отправить форму'}
            </span>
            <div className={'mt-10'}>
                <button className={'w-[210px] bg-green-600 p-3 rounded-md shadow-lg font-bold'}
                        type={'submit'}>Отправить
                </button>
            </div>
        </form>
    </div>
}