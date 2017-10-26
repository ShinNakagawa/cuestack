import { StackStatus } from '../models/stackstatus.model';
export class Stack {
    id?: string;
    title?: string;
    description?: string;
    imageUrl?: string;
    userid?: string;
    timeStart?: string; 
    shareflag?: boolean;
    statusAry?: Array<StackStatus>;  
}
