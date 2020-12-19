import {string, object, setLocale, date} from 'yup';
import { ptForm } from 'yup-locale-pt';
setLocale(ptForm)

function formatDate(date) {
    return new Date(date).toLocaleDateString()
}

const today= new Date();
const mindate = "1900-01-01T00:00:00.000Z"

export let jogadorSchema = object().shape(
    {
        id: string(),
        data_nascimento: date()
            .min(mindate,({min}) => `O campo deve ser posterior a ${formatDate(mindate)}`, )
            .max(today,({max}) =>`O campo deve ser anterior ao dia de hoje!`,)
            .required(),
        nome: string().required().max(50)
    }
)