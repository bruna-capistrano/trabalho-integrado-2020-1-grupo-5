import {string, object, number, setLocale, date} from 'yup';
import { ptForm } from 'yup-locale-pt';
setLocale(ptForm)

function formatDate(date) {
    return new Date(date).toLocaleDateString()
}

const today= new Date();
const mindate = "2000-01-01T00:00:00.000Z"

export let partidaSchema = object().shape(
    { 
        id: number(),
        data: date()
            .min(mindate,({min}) => `O campo deve ser posterior a ${formatDate(mindate)}`, )
            .max(today,({max}) =>`O campo deve ser anterior ao dia de hoje!`,)
            .required(),
        arbitro: string().required().max(50),
        local: string().required().max(50),
        id_time_A: string().required(),
        gols_time_A: number().required().min(0).max(99),
        id_time_B: string().required(),
        gols_time_B: number().required().min(0).max(99),
    }
)