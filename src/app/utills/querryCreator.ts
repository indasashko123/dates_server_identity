
export class QuerryCreator {
    static create (condition : any, querry? : any) {
        condition = {
            limit : 25,
            offset : 0,
            where : {}
        };
        if (!querry) {
            return condition;
        }
        if (querry.page) {
            condition.offset = (querry.page-1)*condition.limit;
        }
        if (querry.perPage) {
            condition.limit = querry.perPage;
        }
        return condition;
    }
}