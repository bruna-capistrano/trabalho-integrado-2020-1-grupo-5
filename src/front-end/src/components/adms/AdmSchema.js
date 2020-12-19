import {string, object, setLocale} from 'yup';
import { ptForm } from 'yup-locale-pt';
setLocale(ptForm)

export let admSchema = object().shape(
    {
        id: string(),
        nome: string().required().max(50),
        usuario: string().required().max(50),
        senha: string().required().min(8).max(50)
    }
)