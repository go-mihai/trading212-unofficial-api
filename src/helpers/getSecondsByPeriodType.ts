import { TIME_PERIOD } from "../types";

export default function getSecondsByPeriodType(period : TIME_PERIOD) {
    switch(period) {
        case 'ONE_MINUTE' : 
            return 1 * 60;
        case 'FIVE_MINUTES':
            return 1 * 60 * 5;
        case 'TEN_MINUTES' :
            return 1 * 60 * 10;
        case 'FIFTEEN_MINUTES':
            return 1 * 60 * 15;
        case 'THIRTY_MINUTES':
            return 1 * 60 * 30;
        case  'ONE_HOUR':
            return 1 * 60 * 60;
        case  'FOUR_HOURS':
            return 1 * 60 * 60 * 4;
        case  'ONE_DAY':
            return 1 * 60 * 60 * 24;
        case   'ONE_WEEK':
            return 1 * 60 * 60 * 24 * 7;
        case  'ONE_MONTH':
            return 1 * 60 * 60 * 24 * 31;
        default : 
            return 0;
    }
}