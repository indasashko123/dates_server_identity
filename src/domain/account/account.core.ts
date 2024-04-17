/**
 * User account data
 */
export class Account {
    /**
     * Unique hash string 
    */
    id : string;
    email : string;
    password : string;
    isDeleted : boolean;
    isActivated : boolean;
}