import { CueRate } from '../models/cuerate.model';
export class Cue {
    id?: string;
    stackid?: string;
    userid?: string;
    question?: string;
    answer?: string;
    imageUrl?: string;
    timeStart?: string;
    rateAry?: Array<CueRate>;  
}
