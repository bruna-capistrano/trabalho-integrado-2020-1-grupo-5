import {string, object, number, Image ,setLocale} from 'yup';
import { ptForm } from 'yup-locale-pt';

setLocale(ptForm)

export let timeSchema = object().shape(
    {
        id: number(),
        nome: string().required().max(50)
    }
)