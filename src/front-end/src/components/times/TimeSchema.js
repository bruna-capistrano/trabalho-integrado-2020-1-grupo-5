import {string, object, setLocale} from 'yup';
import { ptForm } from 'yup-locale-pt';

setLocale(ptForm)

export let timeSchema = object().shape(
    {
        id: string(),
        nome: string().required().max(50)
    }
)