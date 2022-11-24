export class CrudRoutesFactory {
    protected options: MergedCrudOptions;

    protected swaggerModels: any = {};

    constructor(protected target: any, options: CrudOptions) {
        this.options = options;
        this.create();
    }
}